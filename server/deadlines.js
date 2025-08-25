const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Example: Fetch public holidays as deadlines
    const response = await axios.get('https://date.nager.at/api/v3/PublicHolidays/2025/IN');
    // Map to a simplified format
    const deadlines = response.data.map(item => ({
      id: item.date,
      name: item.localName,
      date: item.date
    }));
    res.json(deadlines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deadlines' });
  }
});

module.exports = router;