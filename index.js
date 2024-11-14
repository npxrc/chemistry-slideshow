const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve your presentation files (index.html, CSS, JS, etc.)
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected');

    // Example: broadcasting slide change
    socket.on('changeSlide', (slideNumber) => {
        io.emit('updateSlide', slideNumber);
    });
    
    // Example: broadcasting captions
    socket.on('caption', (text) => {
        io.emit('caption', text);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 443;
server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
