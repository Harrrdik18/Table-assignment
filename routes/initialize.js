// routes/initialize.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const axios = require('axios');

router.get('/initializeDatabase', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        const insertQuery = `INSERT INTO transactions (title, description, price, dateOfSale, sold, category) VALUES ?`;
        const values = transactions.map(transaction => [
            transaction.title,
            transaction.description,
            transaction.price,
            transaction.dateOfSale,
            transaction.sold,
            transaction.category
        ]);

        db.query(insertQuery, [values], (err) => {
            if (err) throw err;
            res.send("Database initialized with seed data");
        });
    } catch (error) {
        res.status(500).send("Error initializing database");
    }
});

module.exports = router;
