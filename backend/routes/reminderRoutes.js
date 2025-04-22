// server.js
const express = require('express');
const app = express();
const reminderRoute = require('./routes/reminderRoute');  // Import the reminder route
const port = 4000;

// Middleware to parse JSON data
app.use(express.json());

// Use the reminder route for /reminder endpoint
app.use('/reminder', reminderRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
