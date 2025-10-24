const axios = require('axios');
const cheerio = require('cheerio');

async function fetchJeeDate() {
  try {
    const res = await axios.get('https://jeemain.nta.ac.in/', {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(res.data);
    const text = $('marquee').text();
    const match = text.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (match) {
      const [dd, mm, yyyy] = match[1].split('/');
      return { 
        id: 1,
        name: 'JEE Main Exam', 
        date: `${yyyy}-${mm}-${dd}`,
        category: 'Engineering',
        source: 'NTA Official'
      };
    }
  } catch (e) {
    console.error('Error fetching JEE date:', e.message);
  }
  return { 
    id: 1,
    name: 'JEE Main Exam', 
    date: '2025-09-15',
    category: 'Engineering',
    source: 'Estimated'
  };
}

async function fetchNeetDate() {
  try {
    const res = await axios.get('https://neet.nta.nic.in/', {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(res.data);
    const text = $('marquee').text();
    const match = text.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (match) {
      const [dd, mm, yyyy] = match[1].split('/');
      return { 
        id: 2,
        name: 'NEET Exam', 
        date: `${yyyy}-${mm}-${dd}`,
        category: 'Medical',
        source: 'NTA Official'
      };
    }
  } catch (e) {
    console.error('Error fetching NEET date:', e.message);
  }
  return { 
    id: 2,
    name: 'NEET Exam', 
    date: '2025-10-05',
    category: 'Medical',
    source: 'Estimated'
  };
}

async function fetchCuetDate() {
  try {
    const res = await axios.get('https://cuet.samarth.ac.in/', {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(res.data);
    const text = $('marquee').text();
    const match = text.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (match) {
      const [dd, mm, yyyy] = match[1].split('/');
      return { 
        id: 3,
        name: 'CUET Exam', 
        date: `${yyyy}-${mm}-${dd}`,
        category: 'Undergraduate',
        source: 'Official'
      };
    }
  } catch (e) {
    console.error('Error fetching CUET date:', e.message);
  }
  return { 
    id: 3,
    name: 'CUET Exam', 
    date: '2025-11-15',
    category: 'Undergraduate',
    source: 'Estimated'
  };
}

async function fetchClatDate() {
  try {
    const res = await axios.get('https://consortiumofnlus.ac.in/clat-2025/', {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(res.data);
    const text = $('marquee').text();
    const match = text.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (match) {
      const [dd, mm, yyyy] = match[1].split('/');
      return { 
        id: 4,
        name: 'CLAT Exam', 
        date: `${yyyy}-${mm}-${dd}`,
        category: 'Law',
        source: 'Official'
      };
    }
  } catch (e) {
    console.error('Error fetching CLAT date:', e.message);
  }
  return { 
    id: 4,
    name: 'CLAT Exam', 
    date: '2025-12-07',
    category: 'Law',
    source: 'Estimated'
  };
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
    // Fetch all deadlines in parallel
    const [jee, neet, cuet, clat] = await Promise.all([
      fetchJeeDate(),
      fetchNeetDate(),
      fetchCuetDate(),
      fetchClatDate()
    ]);

    const deadlines = [jee, neet, cuet, clat].filter(Boolean);

    res.status(200).json({
      success: true,
      count: deadlines.length,
      data: deadlines,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in deadlines API:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch deadlines',
      message: error.message 
    });
  }
};