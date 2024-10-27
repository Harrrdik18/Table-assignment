// app.js
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


// Load routes
const initializeRoute = require('./routes/initialize');
const transactionsRoute = require('./routes/transactions');
const statisticsRoute = require('./routes/statistics');

// Middleware
app.use(express.json());
app.use(cors());

// Register routes
app.use('/api', initializeRoute);
app.use('/api', transactionsRoute);
app.use('/api', statisticsRoute);

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

