const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace with your Lightcast API key
const API_KEY = 'YOUR_LIGHTCAST_API_KEY';

// Map your pathways to SOC codes (examples)
const pathwayCodes = [
  { id: "engineering", code: "17-2071", title: "Engineering" }, // Electrical Engineer
  { id: "medical", code: "29-1069", title: "Medical" },         // Physicians and Surgeons
  { id: "commerce", code: "13-2011", title: "Commerce" },       // Accountants and Auditors
  { id: "law", code: "23-1011", title: "Law" }                  // Lawyers
];

// Lightcast Career Pathways API endpoint
const LIGHTCAST_API_URL = "https://api.lightcast.io/v1/career-pathways";

router.get('/', async (req, res) => {
  try {
    const results = await Promise.all(
      pathwayCodes.map(async (pathway) => {
        // Lightcast expects occupationCode (SOC or O*NET code)
        const url = `${LIGHTCAST_API_URL}?occupationCode=${pathway.code}`;
        const response = await axios.get(url, {
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Accept": "application/json"
          }
        });
        const data = response.data;

        // Structure the response for frontend use
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
    res.json(results);
  } catch (error) {
    // Fallback: Static data if API fails
    res.json([
      {
        id: "engineering",
        title: "Engineering",
        description: "Build the future with technology and innovation",
        avgSalary: "₹6-25 LPA",
        education: "B.Tech/B.E.",
        outlook: "Excellent",
        skills: ["Problem Solving", "Mathematics", "Physics"],
        nextSteps: [],
        lateralMoves: [],
        url: "https://lightcast.io/"
      },
      {
        id: "medical",
        title: "Medical",
        description: "Serve society through healthcare and research",
        avgSalary: "₹8-20 LPA",
        education: "MBBS/MD",
        outlook: "High",
        skills: ["Biology", "Empathy", "Attention to Detail"],
        nextSteps: [],
        lateralMoves: [],
        url: "https://lightcast.io/"
      },
      {
        id: "commerce",
        title: "Commerce",
        description: "Drive business, finance, and entrepreneurship",
        avgSalary: "₹4-12 LPA",
        education: "B.Com/CA",
        outlook: "Good",
        skills: ["Accounting", "Analysis", "Communication"],
        nextSteps: [],
        lateralMoves: [],
        url: "https://lightcast.io/"
      },
      {
        id: "law",
        title: "Law",
        description: "Shape justice and governance",
        avgSalary: "₹5-18 LPA",
        education: "LLB/LLM",
        outlook: "Moderate",
        skills: ["Critical Thinking", "Negotiation", "Research"],
        nextSteps: [],
        lateralMoves: [],
        url: "https://lightcast.io/"
      }
    ]);
  }
});

module.exports = router;