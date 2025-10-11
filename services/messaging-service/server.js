const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 8080;

// AWS SDK Configuration
const awsRegion = process.env.AWS_REGION || 'us-east-1';
AWS.config.update({ region: awsRegion });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// This is the crucial part for sending messages back through the WebSocket API
// The endpoint is passed in as an environment variable by Kubernetes.
const apiGatewayManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: process.env.WEBSOCKET_API_ENDPOINT,
});

app.use(express.json());
app.use(cors());

const MESSAGES_TABLE = process.env.MESSAGES_TABLE_NAME || 'SkillBridgeMessages';
const CONNECTIONS_TABLE = process.env.CONNECTIONS_TABLE_NAME || 'SkillBridgeConnections';

app.get('/health', (req, res) => res.status(200).json({ status: 'UP' }));

/**
 * Handles sending a message.
 */
app.post('/messages', async (req, res) => {
    const { senderEmail, recipientEmail, message } = req.body;
    if (!senderEmail || !recipientEmail || !message) {
        return res.status(400).json({ error: 'Missing required message fields.' });
    }

    const messageId = uuidv4();
    const timestamp = new Date().toISOString();

    const messageItem = {
        messageId,
        senderEmail,
        recipientEmail,
        message,
        timestamp,
    };

    try {
        // 1. Save the message to the database
        await dynamoDb.put({ TableName: MESSAGES_TABLE, Item: messageItem }).promise();
        console.log(`Message saved to DynamoDB with ID: ${messageId}`);

        // 2. Find the recipient's connection ID
        const connectionParams = {
            TableName: CONNECTIONS_TABLE,
            FilterExpression: "email = :email",
            ExpressionAttributeValues: { ":email": recipientEmail }
        };
        const connectionData = await dynamoDb.scan(connectionParams).promise();

        // 3. If the recipient is connected, send the message via WebSocket
        if (connectionData.Items.length > 0) {
            const postCalls = connectionData.Items.map(async ({ connectionId }) => {
                try {
                    await apiGatewayManagementApi.postToConnection({
                        ConnectionId: connectionId,
                        Data: JSON.stringify(messageItem),
                    }).promise();
                    console.log(`Message sent to recipient ${recipientEmail} on connection ${connectionId}`);
                } catch (e) {
                    // This can happen if the connection is stale.
                    if (e.statusCode === 410) {
                        console.log(`Found stale connection, deleting ${connectionId}`);
                        await dynamoDb.delete({ TableName: CONNECTIONS_TABLE, Key: { connectionId } }).promise();
                    } else {
                        throw e;
                    }
                }
            });
            await Promise.all(postCalls);
        } else {
            console.log(`Recipient ${recipientEmail} is not online.`);
        }

        res.status(201).json(messageItem);
    } catch (error) {
        console.error("Error processing message:", error);
        res.status(500).json({ error: 'Could not process message.' });
    }
});

app.listen(port, () => {
    console.log(`Messaging Service listening at http://localhost:${port}`);
});
