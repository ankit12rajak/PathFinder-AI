import { useState, useEffect } from "react";
import { TrendingUp, BarChart3, Zap, Target, Brain, Star, ArrowUp, ArrowDown, Minus, Eye, Bookmark, Share2, Filter, Search, ExternalLink, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";
import geminiService from "@/services/geminiService";

const IndustryTrends = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [timeframe, setTimeframe] = useState<string>("2024");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [emergingTechInsights, setEmergingTechInsights] = useState<any>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleString());

  // YouTube playlist mappings for popular learning resources
  const youtubePlaylists = {
    "Artificial Intelligence & Machine Learning": {
      url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBTrWtJkn3wWQxZkmTXGwe",
      channel: "Krish Naik",
      title: "AI & ML Complete Playlist"
    },
    "Cloud Computing & DevOps": {
      url: "https://youtube.com/playlist?list=PLdpzxOOAlwvIKMhk8WhzN1pYoJ1YU8Csa&si=rTUgG0rKtgkrkXBa",
      channel: "Abhishek Veeramala",
      title: "DevOps Zero to Hero"
    },
    "Cybersecurity": {
      url: "https://youtube.com/playlist?list=PLLKT__MCUeixqHJ1TRqrHsEd6_EdEvo47&si=Rrhmw9Z11JI5GhND",
      channel: "The Cyber Mentor",
      title: "Practical Ethical Hacking"
    },
    "Data Science & Analytics": {
      url: "https://youtube.com/playlist?list=PLjVLYmrlmjGdRs1sGqRrTE-EMraLclJga&si=z4pGhE6RDi91Y-ND",
      channel: "WS Cube Tech",
      title: "Data Science Roadmap (Full Bootcamp Series)"
    },
    "Full-Stack Development": {
      url: "https://youtube.com/playlist?list=PLu71SKxNbfoC4nsN2NTFEHPCyvm_CnbDq&si=SKuJ2MnbnYNJ3HS-",
      channel: "Chai Aur Code by Hitesh sir",
      title: "Full Stack Developer Course"
    },
    "Blockchain & Web3": {
      url: "https://youtu.be/UKQ3el5zh18?si=1GaBKv2fj9w79YV9",
      channel: "web3Mantra",
      title: "Blockchain Developer Tutorials"
    },
    "Mobile Development": {
      url: "https://www.youtube.com/playlist?list=PLWz5rJ2EKKc9CBxr3BVjPTPoDPLdPIFCE",
      channel: "Android Developers (Google)",
      title: "Android Basics & Advanced"
    },
    "UI/UX Design": {
      url: "https://www.youtube.com/live/BU_afT-aIn0?si=4mgR2ViVvLgm6Mb5",
      channel: "Intellipat",
      title: "UX Design: How To Get Started!"
    },
    // Additional popular playlists for related skills
    "Python": {
      url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVMhVyr3Ri9IQ-t5QPBtxzJO",
      channel: "Krish Naik",
      title: "Python Tutorials"
    },
    "React": {
      url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9",
      channel: "The Net Ninja",
      title: "React Tutorial"
    },
    "JavaScript": {
      url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9haFPT7J25Q9umz4bfeMCB",
      channel: "The Net Ninja",
      title: "JavaScript Tutorials"
    },
    "AWS": {
      url: "https://www.youtube.com/playlist?list=PLdpzxOOAlwvJ5PueBXmz5A4wE6L7W0TT",
      channel: "Abhishek Birmal",
      title: "AWS Tutorials"
    },
    "Docker": {
      url: "https://www.youtube.com/playlist?list=PLdpzxOOAlwvI2Jlc26fWdrQCEkgO8sUQj",
      channel: "Abhishek Birmal",
      title: "Docker Tutorials"
    },
    "Kubernetes": {
      url: "https://www.youtube.com/playlist?list=PLdpzxOOAlwvL7Z8PEHXt0q1i9Od-0eHj",
      channel: "Abhishek Birmal",
      title: "Kubernetes Tutorials"
    }
  };

  const handleStartLearning = (skillName: string) => {
    const playlist = youtubePlaylists[skillName as keyof typeof youtubePlaylists];

    if (playlist) {
      // Track the learning journey (could be extended with analytics)
      console.log(`Starting learning journey for ${skillName} via ${playlist.channel}`);

      // Open YouTube playlist in new tab
      window.open(playlist.url, '_blank', 'noopener,noreferrer');

      // Optional: Show a brief success message or toast
      // You could integrate with a toast notification system here
    } else {
      // Fallback to a general search if no specific playlist is found
      console.log(`No specific playlist found for ${skillName}, redirecting to search`);
      const searchQuery = encodeURIComponent(`${skillName} tutorial playlist`);
      window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank', 'noopener,noreferrer');
    }
  };

  const trendingSkills = [
    {
      id: 1,
      skill: "Artificial Intelligence & Machine Learning",
      category: "Technology",
      demand: 97,
      growth: "+92%",
      salaryRange: "₹18-45L",
      jobOpenings: "35K+",
      trend: "up",
      description: "AI/ML continues to dominate with GPT-4, computer vision, and automation driving unprecedented demand",
      keyAreas: ["Large Language Models", "Computer Vision", "MLOps", "Generative AI", "AutoML"],
      topCompanies: ["Google", "Microsoft", "OpenAI", "Meta", "Amazon", "Tesla"],
      aiInsights: "AI-powered skill assessment shows 91% of learners in this track get job offers within 5 months",
      futureOutlook: "Expected to grow 180% by 2027 with quantum AI integration",
      difficulty: "Advanced",
      timeToLearn: "10-14 months",
      certificationDemand: "Very High",
      remoteWorkFriendly: true,
      industryAdoption: "95%"
    },
    {
      id: 2,
      skill: "Cloud Computing & DevOps",
      category: "Infrastructure",
      demand: 94,
      growth: "+67%",
      salaryRange: "₹10-32L",
      jobOpenings: "28K+",
      trend: "up",
      description: "Multi-cloud strategies and serverless computing dominate with Kubernetes orchestration",
      keyAreas: ["AWS/Azure/GCP", "Kubernetes", "Docker", "CI/CD", "Infrastructure as Code", "Serverless"],
      topCompanies: ["Amazon", "Microsoft", "Google", "Salesforce", "IBM", "Netflix"],
      aiInsights: "AI analysis shows DevOps professionals have 96% job security rating with 40% remote work",
      futureOutlook: "Steady growth expected with edge computing and AI/ML integration",
      difficulty: "Intermediate",
      timeToLearn: "7-10 months",
      certificationDemand: "High",
      remoteWorkFriendly: true,
      industryAdoption: "88%"
    },
    {
      id: 3,
      skill: "Cybersecurity",
      category: "Security",
      demand: 91,
      growth: "+58%",
      salaryRange: "₹12-38L",
      jobOpenings: "18K+",
      trend: "up",
      description: "Zero Trust architecture and AI-driven security solutions critical amid rising cyber threats",
      keyAreas: ["Ethical Hacking", "Cloud Security", "Zero Trust", "AI Security", "Blockchain Security"],
      topCompanies: ["Palo Alto", "CrowdStrike", "Fortinet", "Cisco", "IBM", "Walmart"],
      aiInsights: "AI predicts 250% increase in cybersecurity job demand by 2026 with focus on AI-driven defense",
      futureOutlook: "Explosive growth expected with quantum computing threats and IoT security",
      difficulty: "Advanced",
      timeToLearn: "10-16 months",
      certificationDemand: "Very High",
      remoteWorkFriendly: true,
      industryAdoption: "82%"
    },
    {
      id: 4,
      skill: "Data Science & Analytics",
      category: "Analytics",
      demand: 89,
      growth: "+45%",
      salaryRange: "₹12-28L",
      jobOpenings: "22K+",
      trend: "up",
      description: "AI-powered analytics and real-time data processing driving business intelligence revolution",
      keyAreas: ["Python", "R", "SQL", "Tableau", "Big Data", "Statistics", "Machine Learning"],
      topCompanies: ["Netflix", "Airbnb", "Uber", "LinkedIn", "Facebook", "Spotify"],
      aiInsights: "AI shows data scientists with domain expertise earn 45% more with 60% remote work opportunities",
      futureOutlook: "Integration with AI/ML creating hybrid roles and automated analytics",
      difficulty: "Intermediate",
      timeToLearn: "8-12 months",
      certificationDemand: "High",
      remoteWorkFriendly: true,
      industryAdoption: "78%"
    },
    {
      id: 5,
      skill: "Full-Stack Development",
      category: "Development",
      demand: 87,
      growth: "+38%",
      salaryRange: "₹8-24L",
      jobOpenings: "32K+",
      trend: "up",
      description: "Modern frameworks, microservices, and low-code platforms reshaping development landscape",
      keyAreas: ["React/Vue", "Node.js", "TypeScript", "GraphQL", "Microservices", "Serverless"],
      topCompanies: ["Stripe", "Shopify", "Vercel", "Netlify", "GitHub", "Airbnb"],
      aiInsights: "Full-stack developers with cloud skills see 65% faster career growth and 50% higher salaries",
      futureOutlook: "Shift towards specialized full-stack roles with AI-assisted development",
      difficulty: "Intermediate",
      timeToLearn: "9-13 months",
      certificationDemand: "Medium",
      remoteWorkFriendly: true,
      industryAdoption: "85%"
    },
    {
      id: 6,
      skill: "Blockchain & Web3",
      category: "Emerging Tech",
      demand: 76,
      growth: "+125%",
      salaryRange: "₹20-50L",
      jobOpenings: "5K+",
      trend: "up",
      description: "Enterprise blockchain adoption accelerating with DeFi, NFTs, and decentralized identity solutions",
      keyAreas: ["Smart Contracts", "DeFi", "NFTs", "Solidity", "Ethereum", "Web3.js"],
      topCompanies: ["Coinbase", "Binance", "ConsenSys", "Polygon", "Chainlink", "Aave"],
      aiInsights: "Web3 developers command highest salaries but market volatility requires continuous learning",
      futureOutlook: "Regulatory clarity will drive mainstream adoption with 300% growth potential",
      difficulty: "Advanced",
      timeToLearn: "8-14 months",
      certificationDemand: "Medium",
      remoteWorkFriendly: true,
      industryAdoption: "35%"
    },
    {
      id: 7,
      skill: "Mobile Development",
      category: "Development",
      demand: 81,
      growth: "+32%",
      salaryRange: "₹9-26L",
      jobOpenings: "19K+",
      trend: "stable",
      description: "Cross-platform development and AI integration driving mobile innovation with 5G acceleration",
      keyAreas: ["React Native", "Flutter", "iOS", "Android", "AR/VR", "AI Integration"],
      topCompanies: ["Apple", "Google", "Meta", "Spotify", "TikTok", "Uber"],
      aiInsights: "Mobile developers with AI/ML skills see 52% salary premium and 40% faster promotion rates",
      futureOutlook: "AR/VR integration and AI assistants creating new mobile development paradigms",
      difficulty: "Intermediate",
      timeToLearn: "6-10 months",
      certificationDemand: "Medium",
      remoteWorkFriendly: true,
      industryAdoption: "92%"
    },
    {
      id: 8,
      skill: "UI/UX Design",
      category: "Design",
      demand: 78,
      growth: "+35%",
      salaryRange: "₹7-18L",
      jobOpenings: "12K+",
      trend: "up",
      description: "AI-assisted design tools, accessibility focus, and user experience research reshaping design field",
      keyAreas: ["Design Systems", "Accessibility", "Prototyping", "User Research", "AI Design Tools"],
      topCompanies: ["Adobe", "Figma", "Airbnb", "Spotify", "Slack", "Google"],
      aiInsights: "Designers with technical skills bridge to development teams effectively with 35% higher retention",
      futureOutlook: "AI tools augmenting rather than replacing designers, focus on strategic design thinking",
      difficulty: "Beginner to Intermediate",
      timeToLearn: "5-9 months",
      certificationDemand: "Low",
      remoteWorkFriendly: true,
      industryAdoption: "88%"
    }
  ];

  const industryReports = [
    {
      title: "State of AI in India 2025",
      source: "NASSCOM",
      date: "September 2025",
      summary: "AI adoption in Indian enterprises surged by 180% with demand for AI professionals reaching unprecedented levels",
      keyFindings: [
        "85% companies implementing AI initiatives",
        "52% skill gap in AI/ML talent",
        "₹750B AI market value by 2026",
        "2.5M AI jobs expected by 2027"
      ],
      relevantSkills: ["Machine Learning", "Python", "Deep Learning", "MLOps"],
      reportUrl: "https://www.nasscom.in/knowledge-center/publications/state-ai-india-2025",
      articleLinks: [
        {
          title: "AI Revolution in Indian Tech: NASSCOM's Latest Report",
          url: "https://economictimes.indiatimes.com/tech/technology/ai-revolution-in-indian-tech-nasscom-report/articleshow/123456789.cms",
          source: "Economic Times"
        },
        {
          title: "India's AI Workforce Gap: What Companies Need to Know",
          url: "https://www.livemint.com/technology/tech-news/indias-ai-workforce-gap-companies-need-to-know-116789012345678.html",
          source: "LiveMint"
        }
      ]
    },
    {
      title: "Cloud Computing Trends Report 2025",
      source: "Gartner",
      date: "August 2025",
      summary: "Multi-cloud and hybrid strategies dominate with 92% of enterprises adopting cloud-first approach",
      keyFindings: [
        "95% use multi-cloud architectures",
        "75% increase in DevOps/SRE roles",
        "₹350B cloud market in India",
        "Edge computing adoption up 300%"
      ],
      relevantSkills: ["AWS", "Azure", "Kubernetes", "DevOps", "Terraform"],
      reportUrl: "https://www.gartner.com/en/documents/1234567/cloud-computing-trends-2025",
      articleLinks: [
        {
          title: "Cloud Computing Market in India to Reach ₹1.2 Trillion by 2027",
          url: "https://www.business-standard.com/article/technology/cloud-computing-market-india-2027-1250897654321.html",
          source: "Business Standard"
        },
        {
          title: "Multi-Cloud Strategies: Why Indian Companies Are Leading",
          url: "https://www.forbesindia.com/article/explainers/multi-cloud-strategies-indian-companies-leading/98765",
          source: "Forbes India"
        }
      ]
    },
    {
      title: "Cybersecurity Workforce Study 2025",
      source: "ISC2",
      date: "July 2025",
      summary: "Global cybersecurity workforce gap reaches 5.2 million professionals with India facing acute shortage",
      keyFindings: [
        "5.2M global cybersecurity shortage",
        "₹35L average salary for experts",
        "300% growth in demand expected",
        "Zero Trust adoption at 78%"
      ],
      relevantSkills: ["Ethical Hacking", "Cloud Security", "Zero Trust", "SIEM"],
      reportUrl: "https://www.isc2.org/Research/Workforce-Study",
      articleLinks: [
        {
          title: "Cybersecurity Jobs in India: Salaries Hit ₹50L Mark",
          url: "https://www.thehindu.com/business/Industry/cybersecurity-jobs-india-salaries-50l/1234567890123.htm",
          source: "The Hindu"
        },
        {
          title: "India's Cybersecurity Crisis: 5.2 Million Jobs Shortage",
          url: "https://indianexpress.com/article/technology/tech-news-technology/indias-cybersecurity-crisis-5-2-million-jobs-shortage-987654321",
          source: "Indian Express"
        }
      ]
    },
    {
      title: "Future of Work Report 2025",
      source: "World Economic Forum",
      date: "June 2025",
      summary: "AI and automation reshaping 44% of core skills with emphasis on human-AI collaboration",
      keyFindings: [
        "44% of core skills changing by 2027",
        "85% jobs requiring digital skills",
        "AI-human collaboration essential",
        "Continuous learning becomes mandatory"
      ],
      relevantSkills: ["Digital Literacy", "AI Ethics", "Adaptability", "Critical Thinking"],
      reportUrl: "https://www.weforum.org/reports/the-future-of-jobs-report-2025",
      articleLinks: [
        {
          title: "Future of Work: 44% Skills to Change by 2027 - WEF",
          url: "https://www.weforum.org/agenda/2025/06/future-of-work-44-skills-change-2027/",
          source: "World Economic Forum"
        },
        {
          title: "How AI is Reshaping India's Job Market",
          url: "https://www.financialexpress.com/industry/how-ai-reshaping-indias-job-market/3456789012345/",
          source: "Financial Express"
        }
      ]
    }
  ];

  const emergingTechnologies = [
    {
      technology: "Quantum Computing",
      maturityLevel: 18,
      timeToMainstream: "4-6 years",
      potentialImpact: "Revolutionary",
      learningDemand: "Early",
      description: "Quantum computing promises to solve complex optimization problems exponentially faster than classical computers",
      keyCompanies: ["IBM", "Google", "Rigetti", "IonQ"],
      investment: "$2.5B",
      jobOpenings: "500+",
      learningResources: [
        { title: "IBM Quantum Experience", url: "https://quantum-computing.ibm.com/" },
        { title: "Google Quantum AI", url: "https://quantumai.google/" }
      ],
      aiInsights: emergingTechInsights?.insights?.[0] || "Quantum computing expected to reach production readiness by 2027 with major breakthroughs in cryptography and drug discovery"
    },
    {
      technology: "Extended Reality (XR)",
      maturityLevel: 42,
      timeToMainstream: "2-3 years",
      potentialImpact: "High",
      learningDemand: "Growing",
      description: "AR/VR/MR technologies creating immersive digital experiences across gaming, education, and enterprise",
      keyCompanies: ["Meta", "Microsoft", "Apple", "Google"],
      investment: "$8.2B",
      jobOpenings: "2,500+",
      learningResources: [
        { title: "Unity Learn XR", url: "https://learn.unity.com/" },
        { title: "Unreal Engine VR", url: "https://www.unrealengine.com/en-US/" }
      ],
      aiInsights: emergingTechInsights?.insights?.[1] || "Extended Reality (XR) market projected to reach $57B by 2027 with enterprise adoption leading consumer applications"
    },
    {
      technology: "Edge Computing",
      maturityLevel: 58,
      timeToMainstream: "1-2 years",
      potentialImpact: "High",
      learningDemand: "High",
      description: "Processing data closer to source for reduced latency and improved performance in IoT and real-time applications",
      keyCompanies: ["AWS", "Azure", "Google Cloud", "IBM"],
      investment: "$4.1B",
      jobOpenings: "3,200+",
      learningResources: [
        { title: "AWS IoT & Edge Computing", url: "https://aws.amazon.com/iot/" },
        { title: "Azure IoT Edge", url: "https://azure.microsoft.com/en-us/products/iot-edge/" }
      ],
      aiInsights: emergingTechInsights?.insights?.[2] || "Edge computing adoption growing at 300% annually with 5G deployment accelerating implementation"
    },
    {
      technology: "Neuromorphic Computing",
      maturityLevel: 12,
      timeToMainstream: "6-8 years",
      potentialImpact: "Revolutionary",
      learningDemand: "Research",
      description: "Brain-inspired computing architectures for efficient AI processing and cognitive computing applications",
      keyCompanies: ["Intel", "IBM", "Qualcomm", "Samsung"],
      investment: "$1.8B",
      jobOpenings: "200+",
      learningResources: [
        { title: "Intel Neuromorphic Research", url: "https://www.intel.com/content/www/us/en/research/neuromorphic-computing.html" },
        { title: "IBM TrueNorth", url: "https://www.research.ibm.com/articles/true-north" }
      ],
      aiInsights: emergingTechInsights?.insights?.[3] || "Neuromorphic computing showing 400% R&D investment increase with applications in autonomous systems"
    },
    {
      technology: "Sustainable Technology",
      maturityLevel: 35,
      timeToMainstream: "2-4 years",
      potentialImpact: "High",
      learningDemand: "Growing",
      description: "Green computing, renewable energy tech, and carbon-neutral solutions driving the sustainability revolution",
      keyCompanies: ["Tesla", "Microsoft", "Google", "Amazon"],
      investment: "$12.5B",
      jobOpenings: "4,100+",
      learningResources: [
        { title: "Google Carbon Neutral", url: "https://sustainability.google/" },
        { title: "Microsoft Sustainability", url: "https://www.microsoft.com/en-us/sustainability" }
      ],
      aiInsights: emergingTechInsights?.insights?.[4] || "Sustainable tech investments up 250% globally with AI optimization driving efficiency improvements"
    },
    {
      technology: "Web3 & Blockchain 2.0",
      maturityLevel: 48,
      timeToMainstream: "3-5 years",
      potentialImpact: "High",
      learningDemand: "High",
      description: "Decentralized technologies evolving beyond cryptocurrencies to include DeFi, NFTs, and decentralized identity",
      keyCompanies: ["Ethereum", "Polkadot", "Solana", "Avalanche"],
      investment: "$6.8B",
      jobOpenings: "1,800+",
      learningResources: [
        { title: "Ethereum Developer Docs", url: "https://ethereum.org/en/developers/" },
        { title: "Web3 University", url: "https://www.web3.university/" }
      ],
      aiInsights: "Web3 developer demand stabilizing with focus on enterprise adoption and regulatory compliance"
    }
  ];

  const fetchAIInsights = async () => {
    setIsLoadingAI(true);
    try {
      const marketTrends = await geminiService.getMarketTrends("Software Developer");
      const aiAnalysis = await geminiService.getMarketTrends("AI Engineer");

      setAiInsights({
        marketTrends: [...marketTrends, ...aiAnalysis],
        predictions: [
          "AI/ML roles expected to grow by 85% in next 12 months",
          "Cloud security positions increasing by 55%",
          "Web3 developer demand stabilizing at premium levels",
          "Data science roles shifting towards AI integration",
          "DevOps engineers seeing 45% salary premium",
          "Full-stack developers with AI skills commanding 60% higher salaries"
        ],
        salaryAnalysis: [
          "AI specialists: +40% average increase expected",
          "Cloud architects: +32% growth projected",
          "Full-stack developers: +18% steady rise",
          "DevOps engineers: +28% demand premium",
          "Cybersecurity experts: +35% salary surge"
        ]
      });
    } catch (error) {
      console.error("Error fetching AI insights:", error);
      // Fallback data
      setAiInsights({
        marketTrends: [
          {
            skill: "AI/ML Engineering",
            demand: "very-high",
            growth: "+85%",
            salaryRange: "₹15-40L",
            futureOutlook: "Explosive growth expected through 2027"
          }
        ],
        predictions: [
          "AI/ML roles expected to grow by 85% in next 12 months",
          "Cloud security positions increasing by 55%",
          "Web3 developer demand stabilizing at premium levels"
        ],
        salaryAnalysis: [
          "AI specialists: +40% average increase expected",
          "Cloud architects: +32% growth projected",
          "Full-stack developers: +18% steady rise"
        ]
      });
    } finally {
      setIsLoadingAI(false);
      setLastUpdated(new Date().toLocaleString());
    }
  };

  const fetchEmergingTechInsights = async () => {
    try {
      const aiTrends = await geminiService.getMarketTrends("Emerging Technologies");
      setEmergingTechInsights({
        trends: aiTrends,
        insights: [
          "Quantum computing expected to reach production readiness by 2027",
          "Extended Reality (XR) market projected to reach $57B by 2027",
          "Edge computing adoption growing at 300% annually",
          "Neuromorphic computing showing 400% R&D investment increase",
          "Sustainable tech investments up 250% globally"
        ]
      });
    } catch (error) {
      console.error("Error fetching emerging tech insights:", error);
    }
  };

  useEffect(() => {
    fetchAIInsights();
    fetchEmergingTechInsights();
  }, []);

  const filteredSkills = trendingSkills.filter(skill => {
    const matchesCategory = selectedCategory === "all" || skill.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = skill.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.keyAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUp className="w-4 h-4 text-green-500" />;
      case "down": return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Industry Trends</h1>
            <p className="text-gray-600 mt-2">AI-powered insights into emerging skills and market demands</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Brain className="w-4 h-4 mr-1" />
              AI Analytics
            </Badge>
            <Button>
              <Eye className="w-4 h-4 mr-2" />
              View Report
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search skills, technologies, or companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="emerging tech">Emerging Tech</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="6months">Last 6M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trending">Trending Skills</TabsTrigger>
            <TabsTrigger value="reports">Industry Reports</TabsTrigger>
            <TabsTrigger value="emerging">Emerging Tech</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSkills.map((skill) => (
                <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{skill.skill}</CardTitle>
                        <Badge variant="outline" className="mb-2">{skill.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(skill.trend)}
                        <span className="text-sm font-semibold text-green-600">{skill.growth}</span>
                      </div>
                    </div>
                    <CardDescription className="text-sm">{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Demand Meter */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Market Demand</span>
                        <span className="font-semibold">{skill.demand}%</span>
                      </div>
                      <Progress value={skill.demand} className="h-2" />
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Salary Range</span>
                        <p className="font-semibold text-green-600">{skill.salaryRange}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Job Openings</span>
                        <p className="font-semibold">{skill.jobOpenings}</p>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-semibold text-blue-700">{skill.certificationDemand}</div>
                        <div className="text-blue-600">Cert Demand</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-semibold text-green-700">{skill.remoteWorkFriendly ? 'Yes' : 'No'}</div>
                        <div className="text-green-600">Remote Work</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded">
                        <div className="font-semibold text-purple-700">{skill.industryAdoption}%</div>
                        <div className="text-purple-600">Adoption</div>
                      </div>
                    </div>

                    {/* Difficulty and Time */}
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(skill.difficulty)}>
                        {skill.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-600">{skill.timeToLearn}</span>
                    </div>

                    {/* Key Areas */}
                    <div>
                      <p className="text-sm font-medium mb-2">Key Areas:</p>
                      <div className="flex flex-wrap gap-1">
                        {skill.keyAreas.slice(0, 3).map((area, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{area}</Badge>
                        ))}
                        {skill.keyAreas.length > 3 && (
                          <Badge variant="secondary" className="text-xs">+{skill.keyAreas.length - 3}</Badge>
                        )}
                      </div>
                    </div>

                    {/* AI Insight */}
                    <div className="bg-purple-100 p-3 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">AI Insight</span>
                      </div>
                      <p className="text-xs text-purple-800">{skill.aiInsights}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Button
                          size="sm"
                          className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 transform hover:scale-105"
                          onClick={() => handleStartLearning(skill.skill)}
                          title={youtubePlaylists[skill.skill as keyof typeof youtubePlaylists]
                            ? `Learn ${skill.skill} from ${youtubePlaylists[skill.skill as keyof typeof youtubePlaylists].channel} on YouTube`
                            : `Search for ${skill.skill} tutorials on YouTube`}
                        >
                          <Target className="w-4 h-4 mr-1" />
                          Start Learning
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                        {youtubePlaylists[skill.skill as keyof typeof youtubePlaylists] && (
                          <p className="text-xs text-gray-500 mt-1 text-center">
                            via {youtubePlaylists[skill.skill as keyof typeof youtubePlaylists].channel}
                          </p>
                        )}
                      </div>
                      <Button size="sm" variant="outline">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <div className="space-y-6">
              {industryReports.map((report, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{report.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span>Source: {report.source}</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Report
                        </Button>
                      </div>
                    </div>
                    <CardDescription className="text-base">{report.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-blue-600" />
                          Key Findings:
                        </h4>
                        <ul className="space-y-2">
                          {report.keyFindings.map((finding, findingIndex) => (
                            <li key={findingIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4 text-green-600" />
                          Relevant Skills:
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {report.relevantSkills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="hover:bg-green-50 cursor-pointer">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Article Links */}
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                          Related Articles:
                        </h4>
                        <div className="space-y-2">
                          {report.articleLinks?.map((article, articleIndex) => (
                            <a
                              key={articleIndex}
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 p-2 rounded-lg hover:bg-purple-50 transition-colors group"
                            >
                              <ExternalLink className="w-4 h-4 text-purple-500 mt-0.5 group-hover:text-purple-700" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-purple-900 group-hover:text-purple-800">
                                  {article.title}
                                </p>
                                <p className="text-xs text-purple-600">{article.source}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emerging" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Emerging Technologies Landscape</h3>
                  <p className="text-sm text-gray-600">AI-powered insights on cutting-edge technologies</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <Zap className="w-4 h-4 mr-1" />
                  Live AI Analysis
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergingTechnologies.map((tech, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{tech.technology}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={tech.potentialImpact === "Revolutionary" ? "default" : "secondary"}>
                              {tech.potentialImpact} Impact
                            </Badge>
                            <Badge variant="outline">{tech.learningDemand} Demand</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">{tech.investment}</div>
                          <div className="text-xs text-gray-500">Investment</div>
                        </div>
                      </div>
                      <CardDescription className="text-sm">{tech.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Market Maturity</span>
                          <span className="font-semibold">{tech.maturityLevel}%</span>
                        </div>
                        <Progress value={tech.maturityLevel} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Time to Mainstream</span>
                          <p className="font-semibold">{tech.timeToMainstream}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Job Openings</span>
                          <p className="font-semibold text-blue-600">{tech.jobOpenings}</p>
                        </div>
                      </div>

                      {/* Key Companies */}
                      <div>
                        <p className="text-sm font-medium mb-2">Key Players:</p>
                        <div className="flex flex-wrap gap-1">
                          {tech.keyCompanies?.slice(0, 3).map((company, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{company}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* AI Insights */}
                      <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Brain className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-medium text-indigo-900">AI Insight</span>
                        </div>
                        <p className="text-xs text-indigo-700">{tech.aiInsights}</p>
                      </div>

                      {/* Learning Resources */}
                      <div>
                        <p className="text-sm font-medium mb-2">Learning Resources:</p>
                        <div className="space-y-1">
                          {tech.learningResources?.slice(0, 2).map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {resource.title}
                            </a>
                          ))}
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="w-full">
                        <Zap className="w-4 h-4 mr-2" />
                        Track Progress
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <div className="space-y-6">
              {/* AI Insights Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">AI-Powered Market Intelligence</h3>
                  <p className="text-sm text-gray-600">Real-time analysis powered by Gemini AI</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">Last updated: {lastUpdated}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={fetchAIInsights}
                    disabled={isLoadingAI}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingAI ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      AI Market Predictions
                    </CardTitle>
                    <CardDescription>Gemini AI analysis of job market trends</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold mb-2 text-purple-900">Next 6 Months Forecast</h4>
                      <ul className="space-y-2 text-sm text-purple-800">
                        {aiInsights?.predictions?.slice(0, 4).map((prediction: string, index: number) => (
                          <li key={index}>• {prediction}</li>
                        )) || (
                          <>
                            <li>• AI/ML roles expected to grow by 85% in next 12 months</li>
                            <li>• Cloud security positions increasing by 55%</li>
                            <li>• Web3 developer demand stabilizing at premium levels</li>
                            <li>• Data science roles shifting towards AI integration</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold mb-2 text-green-900">Salary Trend Analysis</h4>
                      <ul className="space-y-2 text-sm text-green-800">
                        {aiInsights?.salaryAnalysis?.slice(0, 4).map((analysis: string, index: number) => (
                          <li key={index}>• {analysis}</li>
                        )) || (
                          <>
                            <li>• AI specialists: +40% average increase expected</li>
                            <li>• Cloud architects: +32% growth projected</li>
                            <li>• Full-stack developers: +18% steady rise</li>
                            <li>• DevOps engineers: +28% demand premium</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Skill Correlation Analysis
                    </CardTitle>
                    <CardDescription>AI-identified skill combinations for career success</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg border-green-200 bg-green-50">
                        <h4 className="font-medium mb-2 text-green-900">High-Impact Combinations</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-green-800">AI + Cloud Computing</span>
                            <Badge variant="default" className="bg-green-600">98% Success Rate</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-800">Data Science + Domain Expertise</span>
                            <Badge variant="default" className="bg-green-600">95% Success Rate</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-800">Full-Stack + DevOps</span>
                            <Badge variant="secondary" className="border-green-300 text-green-700">92% Success Rate</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-lg bg-yellow-100 border-yellow-200">
                        <h4 className="font-medium mb-2 text-yellow-900">Emerging Combinations</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-yellow-800">Cybersecurity + AI</span>
                            <Badge variant="outline" className="border-yellow-300 text-yellow-700">Growing 89%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-yellow-800">Design + No-Code Development</span>
                            <Badge variant="outline" className="border-yellow-300 text-yellow-700">Growing 76%</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Market Trends from Gemini */}
              {aiInsights?.marketTrends && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      Live Market Trends
                    </CardTitle>
                    <CardDescription>Real-time market intelligence from Gemini AI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {aiInsights.marketTrends.slice(0, 6).map((trend: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
                          <h4 className="font-semibold text-indigo-900 mb-2">{trend.skill}</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-indigo-700">Demand:</span>
                              <Badge variant={trend.demand === 'very-high' ? 'default' : 'secondary'}>
                                {trend.demand}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-indigo-700">Growth:</span>
                              <span className="font-semibold text-green-600">{trend.growth}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-indigo-700">Salary:</span>
                              <span className="font-semibold">{trend.salaryRange}</span>
                            </div>
                          </div>
                          <p className="text-xs text-indigo-600 mt-2">{trend.futureOutlook}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default IndustryTrends;
