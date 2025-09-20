const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Load college data directly as an array
const collegeData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../database/colleges_500.json'), 'utf-8')
);

// Get top colleges (first 10 for demo)
router.get('/top', (req, res) => {
  res.json(collegeData.slice(0, 10));
});

// Search colleges by name or location
router.get('/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  if (!query) return res.json([]);
  const results = collegeData.filter(college =>
    college.name.toLowerCase().includes(query) ||
    (college.location && college.location.toLowerCase().includes(query))
  );
  res.json(results.slice(0, 10)); // Limit results for dropdown
});

module.exports = router;
