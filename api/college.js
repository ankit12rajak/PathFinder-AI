const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Cache for college data
let cachedColleges = null;

// Load college data from JSON file
function getCollegeData() {
  if (cachedColleges) {
    return cachedColleges;
  }

  try {
    // Try loading from public/data first
    const publicPath = path.join(__dirname, '../public/data/colleges_500.json');
    if (fs.existsSync(publicPath)) {
      const data = fs.readFileSync(publicPath, 'utf8');
      cachedColleges = JSON.parse(data);
      console.log(`✅ Loaded ${cachedColleges.length} colleges from public/data`);
      return cachedColleges;
    }

    // Try loading from database folder
    const dbPath = path.join(__dirname, '../database/colleges_500.json');
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      cachedColleges = JSON.parse(data);
      console.log(`✅ Loaded ${cachedColleges.length} colleges from database`);
      return cachedColleges;
    }

    console.warn('⚠️ College data file not found, using fallback data');
    return getFallbackData();
  } catch (error) {
    console.error('❌ Error loading college data:', error);
    return getFallbackData();
  }
}

function getFallbackData() {
  return [
    {
      id: 1,
      name: "IIT Delhi",
      location: "New Delhi",
      type: "Government",
      category: "Engineering",
      ranking: 1,
      fees: "₹2.5 LPA",
      averagePlacement: "₹18 LPA",
      highestPlacement: "₹45 LPA",
      placementRate: 95,
      rating: 4.8,
      infrastructure: 4.9,
      faculty: 4.8,
      placements: 4.9,
      campusLife: 4.7,
      courses: ["B.Tech CSE", "B.Tech Mechanical", "B.Tech Electrical"],
      topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs"],
      website: "https://home.iitd.ac.in",
      applyLink: "https://josaa.nic.in"
    },
    {
      id: 2,
      name: "AIIMS Delhi",
      location: "New Delhi",
      type: "Government",
      category: "Medical",
      ranking: 1,
      fees: "₹5,000/year",
      averagePlacement: "₹15 LPA",
      highestPlacement: "₹25 LPA",
      placementRate: 100,
      rating: 4.9,
      infrastructure: 4.8,
      faculty: 4.9,
      placements: 5.0,
      campusLife: 4.6,
      courses: ["MBBS", "MD", "MS"],
      topRecruiters: ["AIIMS", "Max Hospital", "Apollo", "Fortis"],
      website: "https://www.aiims.edu",
      applyLink: "https://www.nta.ac.in/neet"
    },
    {
      id: 3,
      name: "IIT Bombay",
      location: "Mumbai",
      type: "Government",
      category: "Engineering",
      ranking: 2,
      fees: "₹2.5 LPA",
      averagePlacement: "₹20 LPA",
      highestPlacement: "₹1.8 Cr",
      placementRate: 96,
      rating: 4.8,
      infrastructure: 4.9,
      faculty: 4.9,
      placements: 4.9,
      campusLife: 4.8,
      courses: ["B.Tech CSE", "B.Tech Mechanical", "B.Tech Chemical"],
      topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Apple"],
      website: "https://www.iitb.ac.in",
      applyLink: "https://josaa.nic.in"
    }
  ];
}

// GET /api/colleges (with query parameters)
router.get('/', (req, res) => {
  try {
    const collegeData = getCollegeData();

    // Handle ?type=top
    if (req.query.type === 'top') {
      const topColleges = collegeData.slice(0, 10);
      return res.json({
        success: true,
        count: topColleges.length,
        data: topColleges
      });
    }

    // Handle ?q=search_query
    if (req.query.q) {
      const query = req.query.q.toLowerCase();
      const results = collegeData.filter(college =>
        college.name.toLowerCase().includes(query) ||
        (college.location && college.location.toLowerCase().includes(query)) ||
        (college.category && college.category.toLowerCase().includes(query))
      );
      return res.json({
        success: true,
        count: results.length,
        data: results.slice(0, 10)
      });
    }

    // Handle pagination ?page=1&limit=50
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = collegeData.slice(startIndex, endIndex);

    res.json({
      success: true,
      total: collegeData.length,
      page,
      limit,
      count: paginatedData.length,
      data: paginatedData
    });
  } catch (error) {
    console.error('❌ Error in /api/colleges:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch colleges',
      message: error.message 
    });
  }
});

// GET /api/colleges/top (alternative endpoint)
router.get('/top', (req, res) => {
  try {
    const collegeData = getCollegeData();
    const topColleges = collegeData.slice(0, 10);
    res.json({
      success: true,
      count: topColleges.length,
      data: topColleges
    });
  } catch (error) {
    console.error('❌ Error in /api/colleges/top:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch top colleges',
      message: error.message 
    });
  }
});

// GET /api/colleges/search (alternative endpoint)
router.get('/search', (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const collegeData = getCollegeData();
    const results = collegeData.filter(college =>
      college.name.toLowerCase().includes(query.toLowerCase()) ||
      (college.location && college.location.toLowerCase().includes(query.toLowerCase())) ||
      (college.category && college.category.toLowerCase().includes(query.toLowerCase()))
    );

    res.json({
      success: true,
      count: results.length,
      data: results.slice(0, 10)
    });
  } catch (error) {
    console.error('❌ Error in /api/colleges/search:', error);
    res.status(500).json({ 
      success: false,
      error: 'Search failed',
      message: error.message 
    });
  }
});

module.exports = router;