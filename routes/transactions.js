// routes/transactions.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/transactions', (req, res) => {
    const { search = '', page = 1, perPage = 10 } = req.query;
    const offset = (page - 1) * perPage;

    let query = `SELECT * FROM transactions WHERE title LIKE ? OR description LIKE ? OR price LIKE ? LIMIT ? OFFSET ?`;
    const searchQuery = `%${search}%`;
    db.query(query, [searchQuery, searchQuery, searchQuery, +perPage, +offset], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

module.exports = router;
