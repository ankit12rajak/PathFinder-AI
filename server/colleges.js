const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

let cachedColleges = null;

function getCollegeData() {
  if (cachedColleges) {
    return cachedColleges;
  }

  try {
    // Try public/data first
    const publicPath = path.join(__dirname, '../public/data/colleges_500.json');
    if (fs.existsSync(publicPath)) {
      const data = fs.readFileSync(publicPath, 'utf8');
      cachedColleges = JSON.parse(data);
      console.log(`✅ Loaded ${cachedColleges.length} colleges from public/data`);
      return cachedColleges;
    }

    // Try database folder
    const dbPath = path.join(__dirname, '../database/colleges_500.json');
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      cachedColleges = JSON.parse(data);
      console.log(`✅ Loaded ${cachedColleges.length} colleges from database`);
      return cachedColleges;
    }

    console.warn('⚠️ College data file not found, using fallback');
    return getFallbackData();
  } catch (error) {
    console.error('❌ Error loading colleges:', error);
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

// Main route: GET /api/colleges
router.get('/', (req, res) => {
  try {
    console.log('📍 GET /api/colleges called with query:', req.query);
    
    const collegeData = getCollegeData();

    // Handle ?type=top
    if (req.query.type === 'top') {
      const topColleges = collegeData.slice(0, 10);
      console.log(`✅ Returning ${topColleges.length} top colleges`);
      return res.json({
        success: true,
        count: topColleges.length,
        data: topColleges
      });
    }

    // Handle ?q=search
    if (req.query.q) {
      const query = req.query.q.toLowerCase();
      const results = collegeData.filter(college =>
        college.name.toLowerCase().includes(query) ||
        (college.location && college.location.toLowerCase().includes(query)) ||
        (college.category && college.category.toLowerCase().includes(query))
      );
      console.log(`🔍 Search for "${query}" found ${results.length} results`);
      return res.json({
        success: true,
        count: results.length,
        data: results.slice(0, 10)
      });
    }

    // Handle pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = collegeData.slice(startIndex, endIndex);

    console.log(`📄 Returning page ${page} with ${paginatedData.length} colleges`);
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

module.exports = router;
