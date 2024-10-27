const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/statistics', (req, res) => {
    const { month } = req.query;
    if (!month) return res.status(400).send("Month is required");

    // Query for total sales, sold items, and unsold items
    const statsQuery = `
        SELECT 
            SUM(price) AS totalSales,
            COUNT(CASE WHEN sold = 1 THEN 1 END) AS soldItems,
            COUNT(CASE WHEN sold = 0 THEN 1 END) AS notSoldItems
        FROM transactions
        WHERE MONTHNAME(dateOfSale) = ?
    `;

    // Query for price range data
    const priceRangeQuery = `
        SELECT 
            CASE
                WHEN price BETWEEN 0 AND 100 THEN '$0-100'
                WHEN price BETWEEN 101 AND 200 THEN '$101-200'
                WHEN price BETWEEN 201 AND 300 THEN '$201-300'
                ELSE 'Over $300'
            END AS priceRange,
            COUNT(*) AS itemCount
        FROM transactions
        WHERE MONTHNAME(dateOfSale) = ?
        GROUP BY priceRange
    `;

    // Execute both queries
    db.query(statsQuery, [month], (err, statsResults) => {
        if (err) return res.status(500).json({ error: 'Error fetching statistics data' });

        db.query(priceRangeQuery, [month], (err, rangeResults) => {
            if (err) return res.status(500).json({ error: 'Error fetching price range data' });

            // Respond with combined results
            res.json({
                totalSales: statsResults[0].totalSales,
                soldItems: statsResults[0].soldItems,
                notSoldItems: statsResults[0].notSoldItems,
                priceRanges: rangeResults, // Price range data for bar chart
            });
        });
    });
});

module.exports = router;
