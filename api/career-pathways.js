const axios = require('axios');

// Lightcast API configuration
const API_KEY = process.env.LIGHTCAST_API_KEY || 'YOUR_LIGHTCAST_API_KEY';
const LIGHTCAST_API_URL = "https://api.lightcast.io/v1/career-pathways";

const pathwayCodes = [
  { id: "engineering", code: "17-2071", title: "Engineering" },
  { id: "medical", code: "29-1069", title: "Medical" },
  { id: "commerce", code: "13-2011", title: "Commerce" },
  { id: "law", code: "23-1011", title: "Law" },
  { id: "arts", code: "27-1024", title: "Arts & Design" },
  { id: "science", code: "19-1029", title: "Science & Research" }
];

// Fallback static data
const fallbackData = [
  {
    id: "engineering",
    title: "Engineering",
    description: "Build the future with technology and innovation. Engineering encompasses various disciplines focused on designing, building, and maintaining systems and structures.",
    avgSalary: "₹6-25 LPA",
    education: "B.Tech/B.E. (4 years)",
    outlook: "Excellent - High demand in IT, AI, and emerging tech",
    skills: ["Problem Solving", "Mathematics", "Physics", "Programming", "Analytical Thinking"],
    topColleges: ["IIT Delhi", "IIT Bombay", "NIT Trichy", "BITS Pilani"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT", "State CETs"],
    careerOptions: ["Software Engineer", "Data Scientist", "Mechanical Engineer", "Civil Engineer"],
    nextSteps: ["Pursue M.Tech", "Get internships", "Build projects", "Competitive programming"],
    lateralMoves: ["Management", "Data Science", "Product Management"],
    url: "https://www.aicte-india.org/"
  },
  {
    id: "medical",
    title: "Medical",
    description: "Serve society through healthcare and research. Medical careers involve diagnosing, treating, and preventing illnesses to improve quality of life.",
    avgSalary: "₹8-20 LPA",
    education: "MBBS (5.5 years) + MD/MS (3 years)",
    outlook: "High - Always in demand",
    skills: ["Biology", "Empathy", "Attention to Detail", "Communication", "Problem Solving"],
    topColleges: ["AIIMS Delhi", "CMC Vellore", "JIPMER", "KGMU"],
    exams: ["NEET UG", "NEET PG", "AIIMS"],
    careerOptions: ["Doctor", "Surgeon", "Psychiatrist", "Pediatrician", "Medical Researcher"],
    nextSteps: ["NEET preparation", "Hospital internships", "Specialization", "Research"],
    lateralMoves: ["Public Health", "Medical Writing", "Healthcare Management"],
    url: "https://www.nmc.org.in/"
  },
  {
    id: "commerce",
    title: "Commerce & Business",
    description: "Drive business, finance, and entrepreneurship. Commerce careers focus on trade, accounting, finance, and business management.",
    avgSalary: "₹4-15 LPA",
    education: "B.Com (3 years) / BBA (3 years) / CA",
    outlook: "Good - Steady demand in finance and business",
    skills: ["Accounting", "Financial Analysis", "Communication", "Excel", "Business Strategy"],
    topColleges: ["SRCC Delhi", "St. Xavier's Mumbai", "Loyola Chennai", "Christ Bangalore"],
    exams: ["CA Foundation", "IPMAT", "CUET", "CAT"],
    careerOptions: ["Chartered Accountant", "Investment Banker", "Financial Analyst", "Entrepreneur"],
    nextSteps: ["CA preparation", "MBA", "Internships", "Stock market learning"],
    lateralMoves: ["Data Analytics", "Management Consulting", "Digital Marketing"],
    url: "https://www.icai.org/"
  },
  {
    id: "law",
    title: "Law & Justice",
    description: "Shape justice and governance. Law careers involve practicing law, upholding justice, and understanding legal systems.",
    avgSalary: "₹5-18 LPA",
    education: "BA LLB (5 years) / LLB (3 years)",
    outlook: "Moderate to High - Growing with corporate law",
    skills: ["Critical Thinking", "Negotiation", "Research", "Communication", "Argumentation"],
    topColleges: ["NLU Delhi", "NALSAR Hyderabad", "NLS Bangalore", "NLIU Bhopal"],
    exams: ["CLAT", "AILET", "LSAT India"],
    careerOptions: ["Lawyer", "Judge", "Legal Advisor", "Corporate Lawyer", "Legal Analyst"],
    nextSteps: ["CLAT preparation", "Internships", "Moot courts", "LLM abroad"],
    lateralMoves: ["Policy Making", "Compliance", "Human Rights", "Journalism"],
    url: "https://www.barcouncilofindia.org/"
  },
  {
    id: "arts",
    title: "Arts & Design",
    description: "Express creativity and innovation. Arts careers involve creative expression, design thinking, and cultural preservation.",
    avgSalary: "₹3-12 LPA",
    education: "BA (3 years) / BFA (4 years) / BDes (4 years)",
    outlook: "Growing - High demand in digital media and UX design",
    skills: ["Creativity", "Communication", "Design Tools", "Critical Analysis", "Storytelling"],
    topColleges: ["NID Ahmedabad", "NIFT Delhi", "JJ School of Arts", "Srishti Bangalore"],
    exams: ["NIFT", "NID DAT", "UCEED", "CEED"],
    careerOptions: ["Graphic Designer", "UX/UI Designer", "Animator", "Content Writer", "Artist"],
    nextSteps: ["Build portfolio", "Freelancing", "Design internships", "Online courses"],
    lateralMoves: ["Marketing", "Product Design", "Film Making", "Digital Media"],
    url: "https://www.nid.edu/"
  },
  {
    id: "science",
    title: "Science & Research",
    description: "Explore the unknown and advance knowledge. Science careers involve research, experimentation, and discovery.",
    avgSalary: "₹4-15 LPA",
    education: "BSc (3 years) + MSc (2 years) + PhD (5 years)",
    outlook: "Good - Growing in research institutions and pharma",
    skills: ["Analytical Thinking", "Research", "Laboratory Skills", "Data Analysis", "Curiosity"],
    topColleges: ["IISc Bangalore", "IISER Pune", "IIT Bombay", "Delhi University"],
    exams: ["KVPY", "JAM", "GATE", "CSIR NET"],
    careerOptions: ["Research Scientist", "Professor", "Data Analyst", "Lab Technician", "Biotechnologist"],
    nextSteps: ["MSc preparation", "Research internships", "Publications", "PhD abroad"],
    lateralMoves: ["Data Science", "Quality Control", "Environmental Science", "Teaching"],
    url: "https://www.iisc.ac.in/"
  }
];

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

  // If API key is not configured, return fallback data
  if (!API_KEY || API_KEY === 'YOUR_LIGHTCAST_API_KEY') {
    console.log('Using fallback career pathway data - Lightcast API key not configured');
    return res.status(200).json({
      success: true,
      source: 'fallback',
      count: fallbackData.length,
      data: fallbackData
    });
  }

  try {
    // Fetch from Lightcast API
    const results = await Promise.allSettled(
      pathwayCodes.map(async (pathway) => {
        const url = `${LIGHTCAST_API_URL}?occupationCode=${pathway.code}`;
        const response = await axios.get(url, {
          timeout: 5000,
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json"
          }
        });
        const data = response.data;

        return {
          id: pathway.id,
          title: pathway.title,
          description: data.occupation?.description ?? "",
          avgSalary: data.occupation?.averageSalary ?? "N/A",
          education: data.occupation?.education ?? "N/A",
          outlook: data.occupation?.outlook ?? "N/A",
          skills: data.occupation?.skills ?? [],
          nextSteps: data.nextStepOccupations ?? [],
          lateralMoves: data.lateralOccupations ?? [],
          url: data.occupation?.url ?? "",
        };
      })
    );

    // Extract successful results
    const successfulResults = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);

    if (successfulResults.length > 0) {
      return res.status(200).json({
        success: true,
        source: 'lightcast',
        count: successfulResults.length,
        data: successfulResults
      });
    } else {
      // All API calls failed, return fallback
      return res.status(200).json({
        success: true,
        source: 'fallback_after_api_failure',
        count: fallbackData.length,
        data: fallbackData
      });
    }
  } catch (error) {
    console.error('Error fetching career pathways:', error.message);
    
    // Return fallback data on error
    return res.status(200).json({
      success: true,
      source: 'fallback_on_error',
      count: fallbackData.length,
      data: fallbackData,
      error: error.message
    });
  }
};