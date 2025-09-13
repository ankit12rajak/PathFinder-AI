import { useState } from "react";
import { TrendingUp, BarChart3, Zap, Target, Brain, Star, ArrowUp, ArrowDown, Minus, Eye, Bookmark, Share2, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";

const IndustryTrends = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [timeframe, setTimeframe] = useState<string>("2024");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const trendingSkills = [
    {
      id: 1,
      skill: "Artificial Intelligence & Machine Learning",
      category: "Technology",
      demand: 95,
      growth: "+67%",
      salaryRange: "₹12-35L",
      jobOpenings: "25K+",
      trend: "up",
      description: "AI/ML continues to dominate with GPT, computer vision, and automation driving demand",
      keyAreas: ["Large Language Models", "Computer Vision", "MLOps", "Generative AI"],
      topCompanies: ["Google", "Microsoft", "OpenAI", "Meta", "Amazon"],
      aiInsights: "AI-powered skill assessment shows 89% of learners in this track get job offers within 6 months",
      futureOutlook: "Expected to grow 150% by 2026",
      difficulty: "Advanced",
      timeToLearn: "8-12 months"
    },
    {
      id: 2,
      skill: "Cloud Computing & DevOps",
      category: "Infrastructure",
      demand: 92,
      growth: "+54%",
      salaryRange: "₹8-25L",
      jobOpenings: "18K+",
      trend: "up",
      description: "Cloud adoption accelerating with multi-cloud strategies and serverless computing",
      keyAreas: ["AWS/Azure/GCP", "Kubernetes", "Docker", "CI/CD", "Infrastructure as Code"],
      topCompanies: ["Amazon", "Microsoft", "Google", "Salesforce", "IBM"],
      aiInsights: "AI analysis shows DevOps professionals have 95% job security rating",
      futureOutlook: "Steady growth expected with edge computing trends",
      difficulty: "Intermediate",
      timeToLearn: "6-9 months"
    },
    {
      id: 3,
      skill: "Cybersecurity",
      category: "Security",
      demand: 89,
      growth: "+43%",
      salaryRange: "₹10-28L",
      jobOpenings: "12K+",
      trend: "up",
      description: "Critical shortage in cybersecurity professionals with increasing digital threats",
      keyAreas: ["Ethical Hacking", "Cloud Security", "Zero Trust", "AI Security"],
      topCompanies: ["Palo Alto", "CrowdStrike", "Fortinet", "Cisco", "IBM"],
      aiInsights: "AI predicts 200% increase in cybersecurity job demand by 2025",
      futureOutlook: "Explosive growth expected with quantum computing threats",
      difficulty: "Advanced",
      timeToLearn: "9-15 months"
    },
    {
      id: 4,
      skill: "Data Science & Analytics",
      category: "Analytics",
      demand: 87,
      growth: "+38%",
      salaryRange: "₹9-22L",
      jobOpenings: "16K+",
      trend: "up",
      description: "Data-driven decision making becomes core to business strategy",
      keyAreas: ["Python", "R", "SQL", "Tableau", "Big Data", "Statistics"],
      topCompanies: ["Netflix", "Airbnb", "Uber", "LinkedIn", "Facebook"],
      aiInsights: "AI shows data scientists with domain expertise earn 40% more",
      futureOutlook: "Integration with AI/ML creating hybrid roles",
      difficulty: "Intermediate",
      timeToLearn: "6-10 months"
    },
    {
      id: 5,
      skill: "Full-Stack Development",
      category: "Development",
      demand: 85,
      growth: "+32%",
      salaryRange: "₹6-18L",
      jobOpenings: "22K+",
      trend: "up",
      description: "Modern frameworks and low-code platforms changing development landscape",
      keyAreas: ["React/Vue", "Node.js", "TypeScript", "GraphQL", "Microservices"],
      topCompanies: ["Stripe", "Shopify", "Vercel", "Netlify", "GitHub"],
      aiInsights: "Full-stack developers with cloud skills see 60% faster career growth",
      futureOutlook: "Shift towards specialized full-stack roles",
      difficulty: "Intermediate",
      timeToLearn: "8-12 months"
    },
    {
      id: 6,
      skill: "Blockchain & Web3",
      category: "Emerging Tech",
      demand: 72,
      growth: "+89%",
      salaryRange: "₹15-40L",
      jobOpenings: "3K+",
      trend: "up",
      description: "Decentralized technologies gaining enterprise adoption",
      keyAreas: ["Smart Contracts", "DeFi", "NFTs", "Solidity", "Ethereum"],
      topCompanies: ["Coinbase", "Binance", "ConsenSys", "Polygon", "Chainlink"],
      aiInsights: "Web3 developers command highest salaries but market is volatile",
      futureOutlook: "Regulatory clarity will drive mainstream adoption",
      difficulty: "Advanced",
      timeToLearn: "6-12 months"
    },
    {
      id: 7,
      skill: "Mobile Development",
      category: "Development",
      demand: 78,
      growth: "+25%",
      salaryRange: "₹7-20L",
      jobOpenings: "14K+",
      trend: "stable",
      description: "Cross-platform development and AI integration driving mobile innovation",
      keyAreas: ["React Native", "Flutter", "iOS", "Android", "AR/VR"],
      topCompanies: ["Apple", "Google", "Meta", "Spotify", "TikTok"],
      aiInsights: "Mobile developers with AI/ML skills see 45% salary premium",
      futureOutlook: "AR/VR integration creating new opportunities",
      difficulty: "Intermediate",
      timeToLearn: "4-8 months"
    },
    {
      id: 8,
      skill: "UI/UX Design",
      category: "Design",
      demand: 74,
      growth: "+28%",
      salaryRange: "₹5-15L",
      jobOpenings: "8K+",
      trend: "up",
      description: "AI-assisted design tools and accessibility focus reshaping the field",
      keyAreas: ["Design Systems", "Accessibility", "Prototyping", "User Research"],
      topCompanies: ["Adobe", "Figma", "Airbnb", "Spotify", "Slack"],
      aiInsights: "Designers with technical skills bridge to development teams effectively",
      futureOutlook: "AI tools augmenting rather than replacing designers",
      difficulty: "Beginner to Intermediate",
      timeToLearn: "4-8 months"
    }
  ];

  const industryReports = [
    {
      title: "State of AI in India 2024",
      source: "NASSCOM",
      date: "March 2024",
      summary: "AI adoption in Indian enterprises increased by 156% with demand for AI professionals growing exponentially",
      keyFindings: ["78% companies planning AI initiatives", "45% skill gap in AI talent", "₹500B market by 2025"],
      relevantSkills: ["Machine Learning", "Python", "Deep Learning"]
    },
    {
      title: "Cloud Computing Trends Report",
      source: "Gartner",
      date: "February 2024",
      summary: "Multi-cloud strategies become mainstream with 85% of enterprises adopting cloud-first approach",
      keyFindings: ["92% use multi-cloud", "60% increase in DevOps roles", "₹200B cloud market in India"],
      relevantSkills: ["AWS", "Azure", "Kubernetes", "DevOps"]
    },
    {
      title: "Cybersecurity Workforce Study",
      source: "ISC2",
      date: "January 2024",
      summary: "Global cybersecurity workforce gap reaches 4 million professionals with India contributing 25%",
      keyFindings: ["4M global shortage", "₹28L average salary", "200% growth in demand"],
      relevantSkills: ["Ethical Hacking", "Cloud Security", "Zero Trust"]
    }
  ];

  const emergingTechnologies = [
    {
      technology: "Quantum Computing",
      maturityLevel: 15,
      timeToMainstream: "5-7 years",
      potentialImpact: "Revolutionary",
      learningDemand: "Early",
      description: "Quantum computing promises to solve complex problems exponentially faster"
    },
    {
      technology: "Extended Reality (XR)",
      maturityLevel: 35,
      timeToMainstream: "2-3 years",
      potentialImpact: "High",
      learningDemand: "Growing",
      description: "AR/VR/MR technologies creating immersive digital experiences"
    },
    {
      technology: "Edge Computing",
      maturityLevel: 55,
      timeToMainstream: "1-2 years",
      potentialImpact: "High",
      learningDemand: "High",
      description: "Processing data closer to source for reduced latency and improved performance"
    },
    {
      technology: "Neuromorphic Computing",
      maturityLevel: 10,
      timeToMainstream: "7-10 years",
      potentialImpact: "Revolutionary",
      learningDemand: "Research",
      description: "Brain-inspired computing architectures for efficient AI processing"
    }
  ];

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
            <h1 className="text-3xl font-bold text-purple-600 p-3">Industry Trends</h1>
            <p className="text-gray-600 mt-2 px-2">AI-powered insights into emerging skills and market demands</p>
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
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">AI Insight</span>
                      </div>
                      <p className="text-xs text-purple-700">{skill.aiInsights}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Target className="w-4 h-4 mr-1" />
                        Start Learning
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4" />
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
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{report.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Source: {report.source}</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>
                    <CardDescription className="text-base">{report.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Key Findings:</h4>
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
                        <h4 className="font-semibold mb-3">Relevant Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {report.relevantSkills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Read Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emerging" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emergingTechnologies.map((tech, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{tech.technology}</CardTitle>
                    <CardDescription>{tech.description}</CardDescription>
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
                        <span className="text-gray-600">Learning Demand</span>
                        <p className="font-semibold">{tech.learningDemand}</p>
                      </div>
                    </div>

                    <Badge variant={tech.potentialImpact === "Revolutionary" ? "default" : "secondary"} className="w-full justify-center">
                      {tech.potentialImpact} Impact
                    </Badge>

                    <Button size="sm" variant="outline" className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      Get Early Access
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    AI Market Predictions
                  </CardTitle>
                  <CardDescription>Machine learning analysis of job market trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-300 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Next 6 Months Forecast</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• AI/ML roles expected to grow by 78%</li>
                      <li>• Cloud security positions increasing by 45%</li>
                      <li>• Web3 developer demand stabilizing</li>
                      <li>• Data science roles shifting to AI integration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-600 to-emerald-300 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Salary Trend Analysis</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• AI specialists: +35% average increase</li>
                      <li>• Cloud architects: +28% growth</li>
                      <li>• Full-stack developers: +15% steady rise</li>
                      <li>• DevOps engineers: +22% demand premium</li>
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
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-2">High-Impact Combinations</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>AI + Cloud Computing</span>
                          <Badge variant="default">98% Success Rate</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Data Science + Domain Expertise</span>
                          <Badge variant="default">95% Success Rate</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Full-Stack + DevOps</span>
                          <Badge variant="secondary">92% Success Rate</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg from bg-yellow-600">
                      <h4 className="font-medium mb-2">Emerging Combinations</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Cybersecurity + AI</span>
                          <Badge variant="outline">Growing 89%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Design + No-Code Development</span>
                          <Badge variant="outline">Growing 76%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default IndustryTrends;
