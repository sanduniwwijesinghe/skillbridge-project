const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// Database connection configuration using environment variables
// These are securely passed in by the Kubernetes deployment from the 'db-credentials' secret
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/**
 * Initializes the database by creating the 'bookings' table if it doesn't exist.
 * This makes the service self-contained and easy to deploy.
 */
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        mentee_email VARCHAR(255) NOT NULL,
        mentor_id VARCHAR(255) NOT NULL,
        time_slot TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Database initialized: 'bookings' table is ready.");
  } catch (err) {
    console.error("Error initializing database:", err);
    // Exit if we can't create the table, as the service will be non-functional
    process.exit(1);
  } finally {
    client.release();
  }
}

/**
 * Health check endpoint.
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

/**
 * Creates a new booking.
 */
app.post('/bookings', async (req, res) => {
  const { menteeEmail, mentorId, timeSlot } = req.body;

  if (!menteeEmail || !mentorId || !timeSlot) {
    return res.status(400).json({ error: 'Missing required booking information.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO bookings (mentee_email, mentor_id, time_slot) VALUES ($1, $2, $3) RETURNING *',
      [menteeEmail, mentorId, timeSlot]
    );
    console.log(`Booking created successfully for ${menteeEmail} with mentor ${mentorId}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: 'Could not create booking.' });
  }
});

/**
 * Start the server after ensuring the database is ready.
 */
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Booking Service listening at http://localhost:${port}`);
  });
});

