// app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const signInroutes = require('./routes/authRoute');
const questionsRoute = require('./routes/questionsRoute');
const amswerRoute = require('./routes/answerRoute');

// Configuring dotenv file
dotenv.config();

// Connecting to the database
connectDB();

// Creating Express app
const app = express();

// Creating HTTP server
const server = http.createServer(app);

// Creating Socket.IO instance and passing the HTTP server
const io = socketIo(server);
io.on('connection', (socket) => {
  // Event handler for when a user submits a question
  socket.on('submitQuestion', (questionId) => {
    // Broadcast the submitted question to all connected clients
    io.emit('newQuestion', questionId);
  });

  // Event handler for when a user disconnects
  socket.on('disconnect', () => {});
});

// Middleware
app.use(express.json());

// Mounting routes
app.use('/api/v1', signInroutes);
app.use('/api/v1', questionsRoute);
app.use('/api/v1', amswerRoute);

// Basic route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to admin presentation server!!!</h1>');
});

// Defining the port
const PORT = process.env.PORT || 8080;

// Starting the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
