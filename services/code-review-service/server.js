const express = require('express');
const { Pool } = require('pg');
const AWS = require('aws-sdk');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // To generate unique file keys

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// Configure AWS SDK
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' });
const s3 = new AWS.S3();

// Database connection using environment variables from Kubernetes secrets
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const S3_BUCKET = process.env.S3_BUCKET_NAME;

/**
 * Initializes the database by creating the 'code_reviews' table.
 */
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS code_reviews (
        id SERIAL PRIMARY KEY,
        requester_email VARCHAR(255) NOT NULL,
        mentor_id VARCHAR(255) NOT NULL,
        s3_key VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Database initialized: 'code_reviews' table is ready.");
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1);
  } finally {
    client.release();
  }
}

app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));

/**
 * Generates a pre-signed URL for uploading a file to S3.
 */
app.post('/reviews/generate-upload-url', (req, res) => {
  const { fileName } = req.body;
  if (!fileName) {
    return res.status(400).json({ error: 'fileName is required.' });
  }

  const fileKey = `${uuidv4()}-${fileName}`;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileKey,
    Expires: 60, // URL expires in 60 seconds
    ContentType: 'application/zip', // Assuming zip files, adjust if needed
  };

  try {
    const uploadUrl = s3.getSignedUrl('putObject', s3Params);
    console.log(`Generated pre-signed URL for ${fileKey}`);
    res.status(200).json({ uploadUrl, key: fileKey });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).json({ error: 'Could not create upload URL.' });
  }
});

/**
 * Creates a record of the code review request in the database.
 * This should be called after the file has been uploaded to S3.
 */
app.post('/reviews', async (req, res) => {
  const { requesterEmail, mentorId, s3Key } = req.body;

  if (!requesterEmail || !mentorId || !s3Key) {
    return res.status(400).json({ error: 'Missing required review information.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO code_reviews (requester_email, mentor_id, s3_key) VALUES ($1, $2, $3) RETURNING *',
      [requesterEmail, mentorId, s3Key]
    );
    console.log(`Code review record created for ${requesterEmail} with key ${s3Key}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating code review record:", error);
    res.status(500).json({ error: 'Could not create code review record.' });
  }
});


initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Code Review Service listening at http://localhost:${port}`);
  });
});

