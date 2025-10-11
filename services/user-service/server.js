const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
const port = 8080;

// Configure AWS SDK
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(express.json());
app.use(cors());

const USERS_TABLE = process.env.USERS_TABLE_NAME || 'SkillBridgeUsers';

/**
 * Health check endpoint to confirm the service is running.
 */
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

/**
 * Fetches all users from the DynamoDB table.
 * In a real-world application, this should be paginated.
 */
app.get('/users', async (req, res) => {
    const params = {
        TableName: USERS_TABLE,
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        console.log(`Successfully fetched ${data.Items.length} users.`);
        res.status(200).json(data.Items);
    } catch (error) {
        console.error("Error fetching users from DynamoDB:", error);
        res.status(500).json({ error: 'Could not fetch users' });
    }
});

app.listen(port, () => {
    console.log(`User Service listening at http://localhost:${port}`);
});

