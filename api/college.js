const axios = require('axios');

// Cache the college data
let cachedColleges = null;
let cacheTime = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function getCollegeData(baseUrl) {
  // Check cache
  if (cachedColleges && cacheTime && (Date.now() - cacheTime < CACHE_DURATION)) {
    return cachedColleges;
  }

  try {
    // Fetch from public folder
    const url = `${baseUrl}/data/colleges_500.json`;
    const response = await axios.get(url, { timeout: 5000 });
    cachedColleges = response.data;
    cacheTime = Date.now();
    return cachedColleges;
  } catch (error) {
    console.error('Error loading college data:', error.message);
    
    // Fallback: Return sample data if file not accessible
    return [
      {
        id: 1,
        name: "IIT Delhi",
        location: "New Delhi",
        type: "Government",
        category: "Engineering",
        ranking: 1,
        fees: "2.5 LPA",
        placement: "95%",
        averagePackage: "18 LPA",
        courses: ["B.Tech CSE", "B.Tech Mechanical"],
        website: "https://home.iitd.ac.in"
      },
      {
        id: 2,
        name: "AIIMS Delhi",
        location: "New Delhi",
        type: "Government",
        category: "Medical",
        ranking: 1,
        fees: "5000/year",
        placement: "100%",
        averagePackage: "15 LPA",
        courses: ["MBBS", "MD"],
        website: "https://www.aiims.edu"
      }
    ];
  }
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get base URL from request
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const collegeData = await getCollegeData(baseUrl);

    // Handle /top endpoint
    if (req.url === '/api/colleges/top' || req.query.type === 'top') {
      return res.status(200).json({
        success: true,
        count: 10,
        data: collegeData.slice(0, 10)
      });
    }

    // Handle /search endpoint
    if (req.query.q) {
      const query = req.query.q.toLowerCase();
      const results = collegeData.filter(college =>
        college.name.toLowerCase().includes(query) ||
        (college.location && college.location.toLowerCase().includes(query)) ||
        (college.category && college.category.toLowerCase().includes(query))
      );
      return res.status(200).json({
        success: true,
        count: results.length,
        data: results.slice(0, 10)
      });
    }

    // Return all colleges (with pagination)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedData = collegeData.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      total: collegeData.length,
      page,
      limit,
      count: paginatedData.length,
      data: paginatedData
    });
  } catch (error) {
    console.error('Error in colleges API:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch colleges',
      message: error.message 
    });
  }
};