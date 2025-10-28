import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, MessageSquare, Zap, Send, User, Bot, Loader2, CheckCircle2, BookOpen, Target, TrendingUp, Award, Clock, Code, Trophy, Lightbulb, Star, Rocket, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_CAREER_ADVISORY_API_KEY;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LearningPathStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  duration: string;
  resources: {
    type: string;
    title: string;
    url?: string;
  }[];
  skills: string[];
  projects: string[];
  milestones: string[];
}

interface CareerSummary {
  careerGoal: string;
  keyInterests: string[];
  currentLevel: string;
  targetRole: string;
  timeframe: string;
  learningPath: LearningPathStep[];
}

interface DetailedLearningPath {
  career: string;
  overview: string;
  totalDuration: string;
  difficulty: string;
  prerequisites: string[];
  outcomes: string[];
  phases: LearningPathStep[];
  certifications: string[];
  jobMarket: {
    averageSalary: string;
    demandLevel: string;
    topCompanies: string[];
    requiredSkills: string[];
  };
}

const CareerAdvisor = () => {
  // State management
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm PathFinder AI, your personal career advisor. I'm here to help you navigate your career journey, develop new skills, and achieve your professional goals. What would you like to discuss today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasSpokenGreeting, setHasSpokenGreeting] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [careerSummary, setCareerSummary] = useState<CareerSummary | null>(null);
  const [detailedPath, setDetailedPath] = useState<DetailedLearningPath | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech services
  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Auto-speak greeting on component mount
  useEffect(() => {
    if (synthRef.current && !hasSpokenGreeting && messages.length > 0) {
      // Wait a short moment for voices to load
      const speakGreeting = () => {
        if (synthRef.current) {
          const voices = synthRef.current.getVoices();
          if (voices.length > 0 && !hasSpokenGreeting) {
            const greetingMessage = messages[0].content;
            speakText(greetingMessage);
            setHasSpokenGreeting(true);
          }
        }
      };

      // Try immediately
      speakGreeting();

      // Also try after a delay in case voices aren't loaded yet
      const timer = setTimeout(() => {
        if (!hasSpokenGreeting) {
          speakGreeting();
        }
      }, 500);

      // Listen for voiceschanged event
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = () => {
          if (!hasSpokenGreeting) {
            speakGreeting();
          }
        };
      }

      return () => {
        clearTimeout(timer);
      };
    }
  }, [hasSpokenGreeting, messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Toggle voice listening
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  // Speak text
  const speakText = (text: string) => {
    if (!synthRef.current || isMuted) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Try to use a more natural voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.name.includes('Natural')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      console.log('🎤 Started speaking:', text.substring(0, 50) + '...');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      console.log('🎤 Finished speaking');
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  };

  // Toggle mute
  const toggleMute = () => {
    if (synthRef.current && isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  };

  // Check if message contains thank you or goodbye
  const isThankYouMessage = (message: string): boolean => {
    const thankYouPhrases = [
      'thank you',
      'thanks',
      'thank u',
      'thx',
      'ty',
      'appreciate it',
      'grateful',
      "that's all",
      'bye',
      'goodbye'
    ];
    
    const lowerMessage = message.toLowerCase().trim();
    return thankYouPhrases.some(phrase => lowerMessage.includes(phrase));
  };

  // Generate career summary from conversation
  const generateCareerSummary = async (): Promise<CareerSummary> => {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const conversationHistory = messages
        .map(msg => `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}`)
        .join('\n');

      const prompt = `Analyze the following career counseling conversation and extract key information.

CONVERSATION:
${conversationHistory}

Extract and provide ONLY valid JSON (no markdown, no code blocks):

{
  "careerGoal": "Clear career goal from conversation",
  "keyInterests": ["Interest 1", "Interest 2", "Interest 3"],
  "currentLevel": "Beginner/Intermediate/Advanced",
  "targetRole": "Specific job title",
  "timeframe": "6 months/1 year/2 years",
  "learningPath": []
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();

      if (text.startsWith('```')) {
        text = text.replace(/```json\s*/, '').replace(/```\s*$/, '').replace(/```\s*/, '');
      }

      const startIndex = text.indexOf('{');
      const lastIndex = text.lastIndexOf('}');
      if (startIndex !== -1 && lastIndex !== -1) {
        text = text.substring(startIndex, lastIndex + 1);
      }

      const summary: CareerSummary = JSON.parse(text);
      return summary;

    } catch (error) {
      console.error('Error generating career summary:', error);
      return {
        careerGoal: "Career Development",
        keyInterests: ["Professional Growth"],
        currentLevel: "Intermediate",
        targetRole: "Career Professional",
        timeframe: "1 year",
        learningPath: []
      };
    }
  };

  // Generate detailed learning path based on career summary
  const generateDetailedLearningPath = async (summary: CareerSummary): Promise<DetailedLearningPath> => {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const prompt = `Create a COMPREHENSIVE, MULTI-PHASE learning path for: ${summary.targetRole}

CONTEXT:
- Career Goal: ${summary.careerGoal}
- Current Level: ${summary.currentLevel}
- Key Interests: ${summary.keyInterests.join(', ')}
- Timeframe: ${summary.timeframe}

CRITICAL REQUIREMENTS:
1. You MUST create EXACTLY 5-6 progressive learning phases
2. Each phase must build upon the previous one
3. Each phase must include ALL required fields
4. Be SPECIFIC with course names, books, and resources
5. Include realistic timeframes for each phase

Provide ONLY valid JSON (no markdown, no code blocks, no explanations):

{
  "career": "${summary.targetRole}",
  "overview": "An engaging 2-3 sentence description of this career path and its opportunities",
  "totalDuration": "${summary.timeframe}",
  "difficulty": "${summary.currentLevel === 'Beginner' ? 'Beginner-Friendly' : summary.currentLevel === 'Advanced' ? 'Advanced' : 'Intermediate'}",
  "prerequisites": [
    "Basic computer literacy",
    "English proficiency",
    "Time commitment of X hours/week"
  ],
  "outcomes": [
    "Specific technical skill 1",
    "Specific technical skill 2", 
    "Build professional portfolio",
    "Job-ready for ${summary.targetRole}",
    "Earn competitive salary"
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "Foundation",
      "title": "Building Strong Fundamentals",
      "description": "Start your journey by mastering the core concepts and foundational skills needed for ${summary.targetRole}",
      "duration": "3-4 weeks",
      "skills": [
        "Fundamental Skill 1",
        "Fundamental Skill 2",
        "Fundamental Skill 3",
        "Fundamental Skill 4",
        "Fundamental Skill 5"
      ],
      "resources": [
        {
          "type": "Course",
          "title": "Specific beginner course name (e.g., CS50, FreeCodeCamp)",
          "url": "https://actual-url.com"
        },
        {
          "type": "Book",
          "title": "Specific book name for beginners",
          "url": ""
        },
        {
          "type": "Documentation",
          "title": "Official documentation or tutorial",
          "url": "https://docs-url.com"
        },
        {
          "type": "Video",
          "title": "YouTube tutorial series name",
          "url": "https://youtube.com/..."
        }
      ],
      "projects": [
        "Beginner project 1 with clear description",
        "Beginner project 2 with clear description"
      ],
      "milestones": [
        "Complete X foundational concepts",
        "Build first simple project",
        "Understand core terminology"
      ]
    },
    {
      "id": "phase-2",
      "phase": "Core Skills",
      "title": "Developing Core Technical Skills",
      "description": "Dive deeper into essential technologies and frameworks used by professionals",
      "duration": "4-6 weeks",
      "skills": [
        "Core Technology 1",
        "Core Technology 2",
        "Core Framework 1",
        "Core Tool 1",
        "Best Practices"
      ],
      "resources": [
        {
          "type": "Course",
          "title": "Intermediate course (Udemy, Coursera, etc.)",
          "url": "https://course-url.com"
        },
        {
          "type": "Book",
          "title": "Intermediate level book",
          "url": ""
        },
        {
          "type": "Documentation",
          "title": "Framework/tool documentation",
          "url": "https://docs-url.com"
        },
        {
          "type": "Practice",
          "title": "Coding challenge platform (LeetCode, HackerRank)",
          "url": "https://platform-url.com"
        }
      ],
      "projects": [
        "Intermediate project 1 using learned skills",
        "Intermediate project 2 with complexity",
        "Portfolio piece that demonstrates proficiency"
      ],
      "milestones": [
        "Master core technology stack",
        "Complete 3 portfolio projects",
        "Contribute to open source"
      ]
    },
    {
      "id": "phase-3",
      "phase": "Advanced Concepts",
      "title": "Mastering Advanced Techniques",
      "description": "Learn industry-standard practices and advanced concepts used in real-world applications",
      "duration": "6-8 weeks",
      "skills": [
        "Advanced Concept 1",
        "Advanced Concept 2",
        "System Design",
        "Performance Optimization",
        "Security Best Practices"
      ],
      "resources": [
        {
          "type": "Course",
          "title": "Advanced specialization course",
          "url": "https://advanced-course.com"
        },
        {
          "type": "Book",
          "title": "Advanced book on architecture/design patterns",
          "url": ""
        },
        {
          "type": "Article",
          "title": "Industry blogs and technical articles",
          "url": "https://blog-url.com"
        },
        {
          "type": "Workshop",
          "title": "Online workshop or bootcamp",
          "url": "https://workshop-url.com"
        }
      ],
      "projects": [
        "Complex full-featured application",
        "System design project",
        "Production-ready application with testing"
      ],
      "milestones": [
        "Understand advanced architectures",
        "Implement complex features",
        "Deploy scalable application"
      ]
    },
    {
      "id": "phase-4",
      "phase": "Specialization",
      "title": "Specializing in ${summary.keyInterests[0] || 'Your Focus Area'}",
      "description": "Develop expertise in your chosen specialization and build advanced portfolio pieces",
      "duration": "6-8 weeks",
      "skills": [
        "Specialized Skill 1",
        "Specialized Skill 2",
        "Domain Knowledge",
        "Industry Tools",
        "Professional Practices"
      ],
      "resources": [
        {
          "type": "Course",
          "title": "Specialized certification course",
          "url": "https://cert-course.com"
        },
        {
          "type": "Book",
          "title": "Specialized domain book",
          "url": ""
        },
        {
          "type": "Community",
          "title": "Professional community/forum",
          "url": "https://community-url.com"
        },
        {
          "type": "Conference",
          "title": "Virtual conference or meetup",
          "url": "https://conference-url.com"
        }
      ],
      "projects": [
        "Industry-standard project in specialization",
        "Capstone project showcasing expertise",
        "Open source contribution in specialization"
      ],
      "milestones": [
        "Become proficient in specialization",
        "Build impressive portfolio pieces",
        "Network with professionals"
      ]
    },
    {
      "id": "phase-5",
      "phase": "Professional Development",
      "title": "Career Preparation & Job Readiness",
      "description": "Prepare for the job market with interview skills, networking, and professional branding",
      "duration": "3-4 weeks",
      "skills": [
        "Technical Interview Skills",
        "System Design Interviews",
        "Behavioral Interviews",
        "Salary Negotiation",
        "Professional Networking"
      ],
      "resources": [
        {
          "type": "Course",
          "title": "Interview preparation course (AlgoExpert, Pramp)",
          "url": "https://interview-prep.com"
        },
        {
          "type": "Book",
          "title": "Cracking the Coding Interview or similar",
          "url": ""
        },
        {
          "type": "Platform",
          "title": "Mock interview platform",
          "url": "https://mock-interview.com"
        },
        {
          "type": "Guide",
          "title": "Resume and LinkedIn optimization guide",
          "url": "https://career-guide.com"
        }
      ],
      "projects": [
        "Polish portfolio website",
        "Create case studies for projects",
        "Build professional online presence"
      ],
      "milestones": [
        "Complete 50+ interview practice problems",
        "Perfect resume and portfolio",
        "Apply to 20+ positions",
        "Receive job offer"
      ]
    },
    {
      "id": "phase-6",
      "phase": "Continuous Growth",
      "title": "Ongoing Learning & Career Advancement",
      "description": "Stay current with industry trends and continue growing as a professional",
      "duration": "Ongoing",
      "skills": [
        "Latest Industry Trends",
        "Emerging Technologies",
        "Leadership Skills",
        "Mentorship",
        "Continuous Learning"
      ],
      "resources": [
        {
          "type": "Newsletter",
          "title": "Industry newsletter subscriptions",
          "url": "https://newsletter-url.com"
        },
        {
          "type": "Podcast",
          "title": "Industry podcasts",
          "url": "https://podcast-url.com"
        },
        {
          "type": "Platform",
          "title": "Continuous learning platform (Pluralsight, LinkedIn Learning)",
          "url": "https://learning-platform.com"
        },
        {
          "type": "Community",
          "title": "Professional network/community",
          "url": "https://professional-community.com"
        }
      ],
      "projects": [
        "Personal projects with new technologies",
        "Contribute to open source regularly",
        "Write technical blog posts",
        "Mentor junior developers"
      ],
      "milestones": [
        "Stay updated with latest trends",
        "Achieve senior level expertise",
        "Build professional reputation",
        "Contribute to community"
      ]
    }
  ],
  "certifications": [
    "Relevant certification 1 for ${summary.targetRole}",
    "Relevant certification 2",
    "Professional certification 3"
  ],
  "jobMarket": {
    "averageSalary": "$XX,XXX - $XXX,XXX per year (based on location and experience)",
    "demandLevel": "High/Very High/Moderate/Growing",
    "topCompanies": [
      "Major Company 1",
      "Major Company 2", 
      "Major Company 3",
      "Major Company 4",
      "Major Company 5"
    ],
    "requiredSkills": [
      "Must-have skill 1",
      "Must-have skill 2",
      "Must-have skill 3",
      "Must-have skill 4",
      "Must-have skill 5"
    ]
  }
}

IMPORTANT REMINDERS:
- Create ALL 6 phases as shown in the template
- Make each phase progressively more advanced
- Include 4-5 specific skills per phase
- Include 3-4 diverse resources per phase (with real URLs when possible)
- Include 2-3 concrete projects per phase
- Include 2-4 measurable milestones per phase
- Tailor everything specifically to ${summary.targetRole}
- Use realistic timeframes that add up to ${summary.timeframe}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();

      console.log('🤖 Raw Learning Path Response:', text.substring(0, 500));

      // Clean up the response
      if (text.startsWith('```')) {
        text = text.replace(/```json\s*/, '').replace(/```\s*$/, '').replace(/```\s*/, '');
      }

      const startIndex = text.indexOf('{');
      const lastIndex = text.lastIndexOf('}');
      if (startIndex !== -1 && lastIndex !== -1) {
        text = text.substring(startIndex, lastIndex + 1);
      }

      const path: DetailedLearningPath = JSON.parse(text);
      
      // Ensure all phases have IDs
      path.phases = path.phases.map((phase, index) => ({
        ...phase,
        id: phase.id || `phase-${index + 1}`
      }));

      console.log('✅ Learning Path Generated with', path.phases.length, 'phases');

      // Validate that we have multiple phases
      if (path.phases.length < 4) {
        console.warn('⚠️ Less than 4 phases generated, adding additional phases...');
        
        // Add missing phases if needed
        while (path.phases.length < 5) {
          const phaseNumber = path.phases.length + 1;
          path.phases.push({
            id: `phase-${phaseNumber}`,
            phase: phaseNumber === 4 ? "Specialization" : "Professional Development",
            title: phaseNumber === 4 ? `Specializing in ${summary.keyInterests[0] || 'Your Focus Area'}` : "Career Preparation",
            description: phaseNumber === 4 ? "Develop expertise in your chosen specialization" : "Prepare for the job market",
            duration: "4-6 weeks",
            skills: ["Advanced Skill 1", "Advanced Skill 2", "Advanced Skill 3"],
            resources: [
              { type: "Course", title: "Advanced course", url: "" },
              { type: "Book", title: "Specialized book", url: "" }
            ],
            projects: ["Advanced project"],
            milestones: ["Achieve proficiency"]
          });
        }
      }

      return path;

    } catch (error) {
      console.error('❌ Error generating learning path:', error);
      
      // Fallback with multiple phases
      return {
        career: summary.targetRole,
        overview: `A comprehensive journey to master ${summary.targetRole} through structured learning phases.`,
        totalDuration: summary.timeframe,
        difficulty: summary.currentLevel === 'Beginner' ? 'Beginner-Friendly' : 'Intermediate',
        prerequisites: ["Basic computer skills", "English proficiency", "Motivation to learn"],
        outcomes: [
          "Master core technical skills",
          "Build professional portfolio", 
          "Job-ready for entry-level positions",
          "Industry-recognized knowledge",
          "Career advancement potential"
        ],
        phases: [
          {
            id: "phase-1",
            phase: "Foundation",
            title: "Building Strong Fundamentals",
            description: "Start with core concepts and foundational knowledge",
            duration: "3-4 weeks",
            skills: ["Core Concept 1", "Core Concept 2", "Basic Tool 1", "Fundamental Skill 1", "Problem Solving"],
            resources: [
              { type: "Course", title: "Introduction to " + summary.targetRole, url: "" },
              { type: "Book", title: "Beginner's Guide", url: "" },
              { type: "Video", title: "YouTube Tutorial Series", url: "" }
            ],
            projects: ["Beginner project 1", "Simple application"],
            milestones: ["Complete fundamentals", "Build first project", "Understand basics"]
          },
          {
            id: "phase-2",
            phase: "Core Skills",
            title: "Developing Core Technical Skills",
            description: "Master essential technologies and tools",
            duration: "4-6 weeks",
            skills: ["Technology 1", "Technology 2", "Framework 1", "Tool 1", "Best Practices"],
            resources: [
              { type: "Course", title: "Intermediate Course", url: "" },
              { type: "Documentation", title: "Official Docs", url: "" },
              { type: "Practice", title: "Coding Challenges", url: "" }
            ],
            projects: ["Intermediate project", "Portfolio piece"],
            milestones: ["Master core stack", "Complete portfolio", "Build confidence"]
          },
          {
            id: "phase-3",
            phase: "Advanced Concepts",
            title: "Mastering Advanced Techniques",
            description: "Learn industry-standard practices and advanced concepts",
            duration: "6-8 weeks",
            skills: ["Advanced Concept 1", "System Design", "Performance", "Security", "Scalability"],
            resources: [
              { type: "Course", title: "Advanced Specialization", url: "" },
              { type: "Book", title: "Advanced Architecture", url: "" },
              { type: "Article", title: "Industry Blogs", url: "" }
            ],
            projects: ["Complex application", "Production-ready project"],
            milestones: ["Understand architectures", "Deploy application", "Master advanced concepts"]
          },
          {
            id: "phase-4",
            phase: "Specialization",
            title: `Specializing in ${summary.keyInterests[0] || 'Your Focus Area'}`,
            description: "Develop expertise in your chosen specialization",
            duration: "6-8 weeks",
            skills: ["Specialized Skill 1", "Specialized Skill 2", "Domain Knowledge", "Industry Tools", "Expertise"],
            resources: [
              { type: "Course", title: "Certification Course", url: "" },
              { type: "Book", title: "Specialized Book", url: "" },
              { type: "Community", title: "Professional Forum", url: "" }
            ],
            projects: ["Industry-standard project", "Capstone project"],
            milestones: ["Achieve specialization", "Build impressive portfolio", "Network professionally"]
          },
          {
            id: "phase-5",
            phase: "Professional Development",
            title: "Career Preparation & Job Readiness",
            description: "Prepare for the job market with interview skills and networking",
            duration: "3-4 weeks",
            skills: ["Interview Skills", "System Design Interviews", "Networking", "Resume Writing", "Negotiation"],
            resources: [
              { type: "Course", title: "Interview Preparation", url: "" },
              { type: "Book", title: "Cracking the Interview", url: "" },
              { type: "Platform", title: "Mock Interviews", url: "" }
            ],
            projects: ["Polish portfolio", "Create case studies", "Build online presence"],
            milestones: ["Complete practice problems", "Perfect resume", "Apply to jobs", "Receive offers"]
          }
        ],
        certifications: [
          `Professional ${summary.targetRole} Certification`,
          "Industry-recognized credential",
          "Specialized certification"
        ],
        jobMarket: {
          averageSalary: "$60,000 - $120,000 per year",
          demandLevel: "High",
          topCompanies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
          requiredSkills: ["Technical Skill 1", "Technical Skill 2", "Technical Skill 3", "Problem Solving", "Communication"]
        }
      };
    }
  };

  // Generate AI response
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const conversationContext = messages
        .slice(-6) // Keep last 3 exchanges for context
        .map(msg => `${msg.role === 'user' ? 'User' : 'PathFinder AI'}: ${msg.content}`)
        .join('\n');

      const prompt = `You are PathFinder AI, a warm, empathetic AI Career Advisor.

Previous conversation:
${conversationContext}

User: ${userMessage}

Provide helpful, conversational response (3-5 sentences):`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Clean up response
      text = text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/#{1,6}\s/g, '')
        .trim();

      return text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I apologize, but I'm having technical difficulties. Could you please repeat that?";
    }
  };

  // Handle send message
  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();

    if (!textToSend || conversationEnded) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Check for thank you or goodbye message
    if (isThankYouMessage(textToSend)) {
      setIsProcessing(true);

      // Send immediate farewell message
      const farewellMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "You're very welcome! Let me prepare a comprehensive learning path for you. This will take just a moment...",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, farewellMessage]);

      // Speak farewell message
      if (!isMuted) {
        speakText(farewellMessage.content);
      }

      // Generate summary and learning path after a short delay
      setTimeout(async () => {
        setIsProcessing(false);
        setConversationEnded(true);
        setIsGeneratingSummary(true);

        const statusMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: "Analyzing our conversation to understand your career goals...",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, statusMessage]);

        // Generate career summary
        const summary = await generateCareerSummary();
        setCareerSummary(summary);
        setIsGeneratingSummary(false);

        const summaryMessage: Message = {
          id: (Date.now() + 3).toString(),
          role: 'assistant',
          content: `Perfect! I've identified your goal to become a ${summary.targetRole}. Now generating a detailed learning path...`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, summaryMessage]);

        setIsGeneratingPath(true);

        // Generate detailed learning path
        const detailedLearningPath = await generateDetailedLearningPath(summary);
        setDetailedPath(detailedLearningPath);
        setIsGeneratingPath(false);

        const finalMessage: Message = {
          id: (Date.now() + 4).toString(),
          role: 'assistant',
          content: `Excellent! I've created your personalized ${detailedLearningPath.phases.length}-phase learning roadmap. Scroll down to see all the details! 🚀`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, finalMessage]);

        // Speak final message
        if (!isMuted) {
          speakText(finalMessage.content);
        }
      }, 2000);

      return;
    }

    setIsProcessing(true);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(textToSend);

      // Add AI message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Speak the response if not muted
      if (!isMuted) {
        speakText(aiResponse);
      }
    } catch (error) {
      console.error('Error in conversation:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Start a new conversation
  const handleNewConversation = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm PathFinder AI, your personal career advisor. I'm here to help you navigate your career journey, develop new skills, and achieve your professional goals. What would you like to discuss today?",
        timestamp: new Date()
      }
    ]);
    setConversationEnded(false);
    setCareerSummary(null);
    setDetailedPath(null);
    setHasSpokenGreeting(false);
    setIsGeneratingSummary(false);
    setIsGeneratingPath(false);
    
    setTimeout(() => {
      if (!isMuted && synthRef.current) {
        speakText("Hello! I'm PathFinder AI. What would you like to discuss today?");
      }
    }, 500);
  };

  // Get icon component for each phase
  const getPhaseIcon = (index: number) => {
    const icons = [Target, Lightbulb, Code, BookOpen, Rocket, Trophy];
    return icons[index % icons.length];
  };

  // Quick action buttons
  const quickActions = [
    "How do I improve my resume?",
    "What skills are in demand?",
    "Career change guidance",
    "Interview preparation tips",
    "Salary negotiation advice"
  ];

  return (
    <DashboardLayout
      title="AI Career Advisor"
      description="Voice-enabled personal career counselor powered by AI"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Panel - AI Avatar */}
            <Card className="lg:col-span-1 border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
              <CardHeader className="border-b border-slate-800">
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  PathFinder AI
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {conversationEnded ? "Learning Path Generated" : "Your personal career advisor"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                
                {/* Enhanced Human-like Robot Avatar */}
                <div className="relative flex items-center justify-center mb-8">
                  {/* Outer glow effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-3xl opacity-30 ${isSpeaking ? 'animate-pulse' : ''}`}></div>
                  
                  {/* Sound waves when speaking */}
                  {isSpeaking && (
                    <>
                      <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-ping"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" style={{ animationDelay: '0.3s' }}></div>
                    </>
                  )}

                  {/* Listening indicator */}
                  {isListening && (
                    <>
                      <div className="absolute inset-0 rounded-full border-4 border-red-500/40 animate-pulse"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-orange-500/30 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    </>
                  )}
                  
                  {/* Main Robot Body */}
                  <div className="relative z-10 w-64 h-80 flex flex-col items-center">
                    
                    {/* Head */}
                    <div className={`relative w-48 h-48 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-[3rem] shadow-2xl border-4 ${
                      isSpeaking ? 'border-purple-500/50 shadow-purple-500/50' : 
                      isListening ? 'border-red-500/50 shadow-red-500/50' : 
                      conversationEnded ? 'border-emerald-500/50 shadow-emerald-500/50' : 
                      'border-slate-600'
                    } transition-all duration-300`}>
                      
                      {/* Antenna */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className={`w-2 h-8 bg-gradient-to-b from-slate-600 to-slate-700 ${isSpeaking ? 'animate-bounce' : ''}`}></div>
                        <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${
                          isSpeaking ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-ping shadow-lg shadow-purple-500/50' : 
                          isListening ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse shadow-lg shadow-red-500/50' :
                          conversationEnded ? 'bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/50' :
                          'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30'
                        }`}></div>
                      </div>

                      {/* Eyes - More human-like */}
                      <div className="flex items-center justify-center gap-8 mt-12">
                        {/* Left Eye */}
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                            isSpeaking ? 'from-purple-400 to-pink-400' : 
                            isListening ? 'from-red-400 to-orange-400' :
                            conversationEnded ? 'from-emerald-400 to-green-400' :
                            'from-blue-400 to-cyan-400'
                          } shadow-lg ${isSpeaking || isListening ? 'animate-pulse' : ''}`}>
                            {/* Pupil */}
                            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 ${
                              isSpeaking ? 'animate-bounce' : ''
                            }`}>
                              {/* Reflection */}
                              <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/80"></div>
                            </div>
                          </div>
                          {/* Eyelid effect when speaking */}
                          {isSpeaking && (
                            <div className="absolute inset-0 rounded-full bg-slate-800 opacity-20 animate-blink"></div>
                          )}
                        </div>

                        {/* Right Eye */}
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                            isSpeaking ? 'from-purple-400 to-pink-400' : 
                            isListening ? 'from-red-400 to-orange-400' :
                            conversationEnded ? 'from-emerald-400 to-green-400' :
                            'from-blue-400 to-cyan-400'
                          } shadow-lg ${isSpeaking || isListening ? 'animate-pulse' : ''}`}>
                            {/* Pupil */}
                            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 ${
                              isSpeaking ? 'animate-bounce' : ''
                            }`}>
                              {/* Reflection */}
                              <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/80"></div>
                            </div>
                          </div>
                          {/* Eyelid effect when speaking */}
                          {isSpeaking && (
                            <div className="absolute inset-0 rounded-full bg-slate-800 opacity-20 animate-blink"></div>
                          )}
                        </div>
                      </div>

                      {/* Mouth - Audio Visualizer */}
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="flex items-end justify-center gap-1 h-10">
                          {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                            <div
                              key={bar}
                              className={`w-2 rounded-full transition-all duration-150 ${
                                isSpeaking 
                                  ? 'bg-gradient-to-t from-purple-500 via-pink-500 to-purple-400' 
                                  : isListening
                                  ? 'bg-gradient-to-t from-red-500 via-orange-500 to-red-400'
                                  : conversationEnded
                                  ? 'bg-gradient-to-t from-emerald-500 via-green-500 to-emerald-400'
                                  : 'bg-gradient-to-t from-slate-600 to-slate-500'
                              }`}
                              style={{
                                height: isSpeaking 
                                  ? `${20 + Math.sin((Date.now() / 100) + bar) * 20}px`
                                  : isListening
                                  ? `${15 + Math.random() * 15}px`
                                  : '8px'
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Cheeks - glow when speaking */}
                      {isSpeaking && (
                        <>
                          <div className="absolute left-4 top-24 w-8 h-8 rounded-full bg-pink-500/30 blur-lg animate-pulse"></div>
                          <div className="absolute right-4 top-24 w-8 h-8 rounded-full bg-pink-500/30 blur-lg animate-pulse"></div>
                        </>
                      )}
                    </div>

                    {/* Neck */}
                    <div className="w-16 h-6 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-lg shadow-lg"></div>

                    {/* Body/Base */}
                    <div className="w-32 h-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl shadow-2xl border-2 border-slate-600 mt-2 flex items-center justify-center">
                      {/* Status LED */}
                      <div className={`w-4 h-4 rounded-full ${
                        isSpeaking ? 'bg-purple-500 animate-pulse shadow-lg shadow-purple-500/50' :
                        isListening ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50' :
                        isProcessing || isGeneratingSummary || isGeneratingPath ? 'bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50' :
                        conversationEnded ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30' :
                        'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                      }`}></div>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="text-center space-y-3 mb-6">
                  {conversationEnded && !isGeneratingSummary && !isGeneratingPath ? (
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-sm px-4 py-2">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Path Complete!
                    </Badge>
                  ) : isGeneratingPath ? (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 animate-pulse text-sm px-4 py-2">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Path...
                    </Badge>
                  ) : isGeneratingSummary ? (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 animate-pulse text-sm px-4 py-2">
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      Analyzing...
                    </Badge>
                  ) : isListening ? (
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30 animate-pulse text-sm px-4 py-2">
                      <Mic className="w-4 h-4 mr-2" />
                      Listening...
                    </Badge>
                  ) : isSpeaking ? (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 animate-pulse text-sm px-4 py-2">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Speaking...
                    </Badge>
                  ) : isProcessing ? (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 animate-pulse text-sm px-4 py-2">
                      <Brain className="w-4 h-4 mr-2" />
                      Thinking...
                    </Badge>
                  ) : (
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-sm px-4 py-2">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Ready
                    </Badge>
                  )}
                </div>

                {/* Voice Controls */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={toggleListening}
                      disabled={isProcessing || isSpeaking}
                      size="lg"
                      className={`${
                        isListening
                          ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                      } text-white shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-5 h-5 mr-2" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5 mr-2" />
                          Speak
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={toggleMute}
                      size="lg"
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-5 h-5 mr-2" />
                          Unmute
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-5 h-5 mr-2" />
                          Mute
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Info */}
                  <div className="text-center text-xs text-slate-400 space-y-1 pt-4 border-t border-slate-800">
                    <p className="flex items-center justify-center gap-2">
                      <Zap className="w-3 h-3 text-emerald-400" />
                      Click "Speak" and ask anything
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <MessageSquare className="w-3 h-3 text-blue-400" />
                      Say "Thank you" when done
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Panel - Chat or Learning Path */}
            <Card className="lg:col-span-2 border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl flex flex-col h-[700px]">
              {!conversationEnded || !detailedPath ? (
                <>
                  <CardHeader className="border-b border-slate-800">
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                      Conversation
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {isGeneratingSummary ? "Analyzing goals..." : 
                       isGeneratingPath ? "Creating path..." :
                       "Chat with your AI advisor"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-6 overflow-hidden">
                    
                    {/* Messages Area */}
                    <ScrollArea className="flex-1 pr-4 mb-4">
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                          >
                            {msg.role === 'assistant' && (
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                <Bot className="w-5 h-5 text-white" />
                              </div>
                            )}
                            <div
                              className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
                                msg.role === 'user'
                                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                                  : 'bg-slate-800 text-slate-100 border border-slate-700'
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                              <p className="text-xs mt-2 opacity-60">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            {msg.role === 'user' && (
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                <User className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {isGeneratingSummary && (
                          <div className="flex justify-center">
                            <div className="bg-slate-800/50 rounded-xl px-6 py-4 flex items-center gap-3">
                              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                              <div className="space-y-1">
                                <p className="text-sm text-slate-300 font-medium">Analyzing...</p>
                                <Progress value={33} className="h-1 w-48" />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {isGeneratingPath && (
                          <div className="flex justify-center">
                            <div className="bg-slate-800/50 rounded-xl px-6 py-4 flex items-center gap-3">
                              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                              <div className="space-y-1">
                                <p className="text-sm text-slate-300 font-medium">Creating path...</p>
                                <Progress value={66} className="h-1 w-48" />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Input Area */}
                    {!conversationEnded && (
                      <div className="space-y-3 pt-4 border-t border-slate-800">
                        <div className="flex gap-2">
                          <Textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            placeholder="Type your message..."
                            className="flex-1 resize-none bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl"
                            rows={2}
                            disabled={isProcessing}
                          />
                          <Button
                            onClick={() => handleSendMessage()}
                            disabled={isProcessing || !inputMessage.trim()}
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 rounded-xl shadow-lg"
                          >
                            {isProcessing ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Send className="w-5 h-5" />
                            )}
                          </Button>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-2">
                          <p className="text-xs text-slate-400 font-medium">Quick Actions:</p>
                          <div className="flex flex-wrap gap-2">
                            {quickActions.map((action, index) => (
                              <Button
                                key={index}
                                onClick={() => handleSendMessage(action)}
                                disabled={isProcessing}
                                variant="outline"
                                size="sm"
                                className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                              >
                                {action}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader className="border-b border-slate-800">
                    <CardTitle className="text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-400" />
                      Your Learning Path
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Personalized roadmap for {detailedPath.career}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-6 overflow-hidden">
                    <ScrollArea className="h-full pr-4">
                      <div className="space-y-6">
                        
                        {/* Career Overview */}
                        <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-700/40">
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                  <Target className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-white mb-2">{detailedPath.career}</h3>
                                  <p className="text-sm text-slate-300 mb-3">{detailedPath.overview}</p>
                                  <div className="flex flex-wrap gap-2">
                                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {detailedPath.totalDuration}
                                    </Badge>
                                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      {detailedPath.difficulty}
                                    </Badge>
                                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                      <Award className="w-3 h-3 mr-1" />
                                      {detailedPath.phases.length} Phases
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Learning Phases */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-emerald-400" />
                            Learning Phases
                          </h3>
                          
                          {detailedPath.phases.map((phase, index) => {
                            const Icon = getPhaseIcon(index);
                            return (
                              <Card key={phase.id} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all">
                                <CardContent className="pt-6">
                                  <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg">
                                        {index + 1}
                                      </div>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                      <div>
                                        <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                          <Icon className="w-5 h-5 text-purple-400" />
                                          {phase.title}
                                        </h4>
                                        <p className="text-sm text-slate-400 mb-2">{phase.description}</p>
                                        <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                                          <Clock className="w-3 h-3 mr-1" />
                                          {phase.duration}
                                        </Badge>
                                      </div>

                                      {phase.skills && phase.skills.length > 0 && (
                                        <div className="space-y-2">
                                          <p className="text-xs font-semibold text-slate-400 uppercase">Skills:</p>
                                          <div className="flex flex-wrap gap-2">
                                            {phase.skills.map((skill, idx) => (
                                              <Badge key={idx} className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                                                {skill}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {phase.projects && phase.projects.length > 0 && (
                                        <div className="space-y-2">
                                          <p className="text-xs font-semibold text-slate-400 uppercase">Projects:</p>
                                          <div className="space-y-1">
                                            {phase.projects.map((project, idx) => (
                                              <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                                                {project}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>

                        {/* Job Market */}
                        <Card className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-700/40">
                          <CardHeader>
                            <CardTitle className="text-white text-lg flex items-center gap-2">
                              <Trophy className="w-5 h-5 text-amber-400" />
                              Job Market
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">Avg Salary</p>
                              <p className="text-lg font-bold text-emerald-400">{detailedPath.jobMarket.averageSalary}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">Demand</p>
                              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                {detailedPath.jobMarket.demandLevel}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Success */}
                        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700/40">
                          <CardContent className="pt-6 text-center space-y-3">
                            <div className="flex justify-center">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <Rocket className="w-8 h-8 text-white" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-white">Ready to Start! 🚀</h3>
                            <p className="text-sm text-slate-300">
                              Follow this path and become a {careerSummary?.targetRole}!
                            </p>
                            <Button
                              onClick={handleNewConversation}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-4"
                            >
                              <Sparkles className="w-4 h-4 mr-2" />
                              New Conversation
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </>
              )}
            </Card>
          </div>

          {/* Info Bar */}
          <Card className="border-slate-800 bg-slate-900/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Online 24/7
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    <Brain className="w-3 h-3 mr-1" />
                    {messages.length} messages
                  </Badge>
                  {conversationEnded && detailedPath && (
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Path Generated
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  Powered by Gemini AI • PathFinder v2.0
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 100% {
            height: 100%;
          }
          50% {
            height: 10%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-blink {
          animation: blink 0.3s ease-in-out infinite;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default CareerAdvisor;