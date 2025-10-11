const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// In-memory store for rooms. A more robust solution would use Redis.
const rooms = {};

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

wss.on('connection', (ws, req) => {
    const parameters = url.parse(req.url, true);
    const roomId = parameters.query.roomId;

    if (!roomId) {
        ws.close(1008, "Room ID is required");
        return;
    }

    if (!rooms[roomId]) {
        rooms[roomId] = new Set();
    }
    
    const room = rooms[roomId];
    room.add(ws);
    console.log(`Client connected to room ${roomId}. Total clients: ${room.size}`);

    ws.on('message', (message) => {
        // Broadcast the message to all other clients in the same room
        room.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
        console.log(`Message relayed in room ${roomId}`);
    });

    ws.on('close', () => {
        room.delete(ws);
        console.log(`Client disconnected from room ${roomId}. Total clients: ${room.size}`);
        if (room.size === 0) {
            delete rooms[roomId]; // Clean up empty rooms
            console.log(`Room ${roomId} is empty and has been closed.`);
        }
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error in room ${roomId}:`, error);
    });
});

server.listen(port, () => {
    console.log(`WebRTC Signaling Service listening at http://localhost:${port}`);
});

