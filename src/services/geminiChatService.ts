import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_CHATBOT_API_KEY;

if (!API_KEY) {
  console.error('Gemini API key not found. Please check your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const getChatbotResponse = async (message: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const systemPrompt = `You are PathFinder AI Assistant, a helpful career guidance chatbot for students. You help with:

1. Career exploration and guidance
2. College admission advice
3. Exam preparation tips
4. Skill development recommendations
5. Educational pathways

Key Features of PathFinder AI:
- Career Explorer: Helps discover careers based on interests
- Mock Tests: JEE, NEET, CLAT, and other competitive exams
- College Comparison: Tools for comparing colleges and tracking applications
- Scholarship Finder: Find relevant scholarships
- Skill Gap Analysis: Identify and develop necessary skills
- Study Tools: Pomodoro timer, flashcards, and study materials

Guidelines:
- Be encouraging and supportive
- Provide practical, actionable advice
- Keep responses concise but informative
- Always relate back to career and education goals
- Suggest relevant PathFinder AI features when appropriate
- Be friendly and conversational

User message: ${message}

Respond as PathFinder AI Assistant:`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return getFailsafeResponse(message);
  }
};

const getFailsafeResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
    return 'I can help you explore different career paths! Check out our Career Explorer in the dashboard to discover careers that match your interests and skills.';
  }
  if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
    return 'Need help with exam preparation? Visit our Mock Tests section for JEE, NEET, CLAT, and other competitive exams with detailed analytics.';
  }
  if (lowerMessage.includes('college') || lowerMessage.includes('admission')) {
    return 'Looking for college guidance? Our College Admission dashboard has tools for college comparison, application tracking, and scholarship finder.';
  }
  if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
    return 'Want to develop new skills? Check out our Skill Development section for gap analysis, learning paths, and industry insights.';
  }
  if (lowerMessage.includes('study') || lowerMessage.includes('preparation')) {
    return 'Need study help? Try our StudySmart tools including Pomodoro timer, flashcards, and personalized study plans!';
  }
  if (lowerMessage.includes('scholarship')) {
    return 'Looking for scholarships? Our Scholarship Finder can help you discover opportunities that match your profile and academic achievements.';
  }
  
  return 'Hi! I\'m your PathFinder AI assistant. I can help you with career guidance, exam preparation, college admissions, skill development, and study strategies. What would you like to explore today?';
};