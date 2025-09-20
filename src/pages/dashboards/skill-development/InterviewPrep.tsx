import { useState } from "react";
import { Brain, Video, Mic, Clock, Target, Award, Users, Star, Play, Pause, RotateCcw, CheckCircle, AlertCircle, TrendingUp, FileText, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";

const InterviewPrep = () => {
  const [selectedRole, setSelectedRole] = useState<string>("frontend-developer");
  const [activeInterview, setActiveInterview] = useState<boolean>(false);
  const [interviewTimer, setInterviewTimer] = useState<number>(0);

  const interviewTypes = [
    {
      id: "technical",
      title: "Technical Interview",
      description: "Coding challenges, data structures, and algorithm problems",
      duration: "45-60 minutes",
      difficulty: "Medium to Hard",
      icon: Brain,
      color: "from-blue-500 to-purple-500"
    },
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "Soft skills, teamwork, and situational questions",
      duration: "30-45 minutes",
      difficulty: "Medium",
      icon: Users,
      color: "from-green-500 to-teal-500"
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Architecture and scalability discussions",
      duration: "60-90 minutes",
      difficulty: "Hard",
      icon: Target,
      color: "from-orange-500 to-red-500"
    },
    {
      id: "case-study",
      title: "Case Study",
      description: "Problem-solving and analytical thinking",
      duration: "45-60 minutes",
      difficulty: "Medium",
      icon: FileText,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const mockInterviews = [
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      type: "Technical",
      difficulty: "Hard",
      duration: "60 minutes",
      questions: 8,
      completed: true,
      score: 85,
      feedback: "Strong in React concepts but needs improvement in algorithms",
      aiInsights: "Focus on dynamic programming and tree traversal problems"
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Software Engineer",
      type: "Behavioral",
      difficulty: "Medium",
      duration: "45 minutes",
      questions: 6,
      completed: true,
      score: 92,
      feedback: "Excellent communication and leadership examples",
      aiInsights: "Well-prepared with specific examples from experience"
    },
    {
      id: 3,
      company: "Amazon",
      role: "Full Stack Developer",
      type: "System Design",
      difficulty: "Hard",
      duration: "75 minutes",
      questions: 3,
      completed: false,
      score: null,
      feedback: null,
      aiInsights: null
    }
  ];

  const practiceQuestions = [
    {
      category: "Data Structures",
      difficulty: "Medium",
      question: "Implement a LRU Cache with O(1) operations",
      topics: ["Hash Map", "Doubly Linked List"],
      companies: ["Google", "Facebook", "Amazon"],
      frequency: "Very High",
      aiHint: "Consider using a combination of hash map and doubly linked list for O(1) operations"
    },
    {
      category: "Algorithms",
      difficulty: "Hard",
      question: "Find the median of two sorted arrays",
      topics: ["Binary Search", "Divide and Conquer"],
      companies: ["Google", "Microsoft", "Apple"],
      frequency: "High",
      aiHint: "Think about binary search approach to reduce time complexity to O(log(min(m,n)))"
    },
    {
      category: "System Design",
      difficulty: "Hard",
      question: "Design a URL shortening service like TinyURL",
      topics: ["Scalability", "Database Design", "Caching"],
      companies: ["Google", "Facebook", "Twitter"],
      frequency: "Very High",
      aiHint: "Consider aspects like URL encoding, database sharding, and caching strategies"
    },
    {
      category: "Behavioral",
      difficulty: "Medium",
      question: "Tell me about a time you faced a challenging technical problem",
      topics: ["Problem Solving", "Communication"],
      companies: ["All Companies"],
      frequency: "Very High",
      aiHint: "Use the STAR method: Situation, Task, Action, Result"
    }
  ];

  const aiInterviewFeatures = [
    {
      title: "Real-time Feedback",
      description: "AI analyzes your responses and provides instant feedback on technical accuracy and communication",
      icon: Brain,
      active: true
    },
    {
      title: "Voice Analysis",
      description: "AI evaluates your speaking pace, confidence level, and clarity of communication",
      icon: Mic,
      active: true
    },
    {
      title: "Code Review",
      description: "AI reviews your coding solutions for efficiency, correctness, and best practices",
      icon: CheckCircle,
      active: true
    },
    {
      title: "Personalized Recommendations",
      description: "AI identifies your weak areas and suggests targeted practice materials",
      icon: Target,
      active: true
    },
    {
      title: "Industry Insights",
      description: "AI provides insights on current interview trends and company-specific preparation",
      icon: TrendingUp,
      active: false
    },
    {
      title: "Performance Tracking",
      description: "AI tracks your improvement over time and predicts interview success probability",
      icon: Award,
      active: false
    }
  ];

  const interviewAnalytics = {
    totalInterviews: 12,
    averageScore: 78,
    improvement: "+23%",
    strongAreas: ["React", "JavaScript", "Problem Solving"],
    weakAreas: ["System Design", "Algorithms", "Database Design"],
    successProbability: 85,
    recommendedPractice: ["Dynamic Programming", "System Design Fundamentals", "Behavioral Questions"]
  };

  const upcomingInterviews = [
    {
      company: "Netflix",
      role: "Senior Frontend Developer",
      date: "Tomorrow, 2:00 PM",
      type: "Technical + System Design",
      preparation: 85,
      aiTips: ["Review React performance optimization", "Practice video streaming architecture", "Prepare examples of large-scale projects"]
    },
    {
      company: "Stripe",
      role: "Full Stack Engineer",
      date: "Friday, 10:00 AM",
      type: "Technical + Behavioral",
      preparation: 60,
      aiTips: ["Practice payment system questions", "Review API design principles", "Prepare leadership examples"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-600">Interview Preparation</h1>
            <p className="text-gray-600 mt-2">AI-powered interview practice with real-time feedback and personalized coaching</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Brain className="w-4 h-4 mr-1" />
              AI Interviewer
            </Badge>
            <Button>
              <Play className="w-4 h-4 mr-2" />
              Start Mock Interview
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Award className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{interviewAnalytics.totalInterviews}</p>
                  <p className="text-sm text-gray-600">Mock Interviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Target className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{interviewAnalytics.averageScore}%</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{interviewAnalytics.improvement}</p>
                  <p className="text-sm text-gray-600">Improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Star className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{interviewAnalytics.successProbability}%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Interview Coach Features
            </CardTitle>
            <CardDescription>Advanced AI technology to simulate real interview experiences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiInterviewFeatures.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-purple-600 to-blue-300">
                  <div className="flex items-center gap-2 mb-2">
                    <feature.icon className="w-5 h-5 text-purple-300" />
                    <Badge variant={feature.active ? "default" : "secondary"} className="text-xs">
                      {feature.active ? "Active" : "Coming Soon"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="mock-interviews" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="mock-interviews">Mock Interviews</TabsTrigger>
            <TabsTrigger value="practice">Practice Questions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ai-coach">AI Coach</TabsTrigger>
          </TabsList>

          <TabsContent value="mock-interviews" className="mt-6">
            <div className="space-y-6">
              {/* Interview Types */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Choose Interview Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {interviewTypes.map((type) => (
                    <Card key={type.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-3`}>
                          <type.icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                        <CardDescription className="text-sm">{type.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{type.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Difficulty:</span>
                            <Badge variant="outline" className="text-xs">{type.difficulty}</Badge>
                          </div>
                        </div>
                        <Button className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Start Interview
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Mock Interviews */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Mock Interviews</h2>
                <div className="space-y-4">
                  {mockInterviews.map((interview) => (
                    <Card key={interview.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{interview.company}</h3>
                              <Badge variant="outline">{interview.type}</Badge>
                              <Badge className={getDifficultyColor(interview.difficulty)}>
                                {interview.difficulty}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{interview.role}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {interview.duration}
                              </span>
                              <span>{interview.questions} questions</span>
                            </div>
                            
                            {interview.completed && (
                              <div className="space-y-2">
                                <div className="bg-gray-700 p-3 rounded-lg">
                                  <p className="text-sm"><strong>Feedback:</strong> {interview.feedback}</p>
                                </div>
                                <div className="bg-gray-700 p-3 rounded-lg">
                                  <p className="text-sm flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-purple-600" />
                                    <strong>AI Insights:</strong> {interview.aiInsights}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col items-end gap-3">
                            {interview.completed ? (
                              <div className="text-right">
                                <p className={`text-2xl font-bold ${getScoreColor(interview.score!)}`}>
                                  {interview.score}%
                                </p>
                                <p className="text-sm text-gray-600">Score</p>
                              </div>
                            ) : (
                              <Badge variant="secondary">In Progress</Badge>
                            )}
                            
                            <div className="flex gap-2">
                              {interview.completed ? (
                                <>
                                  <Button variant="outline" size="sm">
                                    <Download className="w-4 h-4 mr-1" />
                                    Report
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <RotateCcw className="w-4 h-4 mr-1" />
                                    Retry
                                  </Button>
                                </>
                              ) : (
                                <Button size="sm">
                                  <Play className="w-4 h-4 mr-1" />
                                  Continue
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Practice Questions</h2>
                <div className="flex gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="algorithms">Algorithms</SelectItem>
                      <SelectItem value="data-structures">Data Structures</SelectItem>
                      <SelectItem value="system-design">System Design</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {practiceQuestions.map((question, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{question.category}</Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              {question.frequency}
                            </Badge>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-2">{question.question}</h3>
                          
                          <div className="space-y-2 mb-3">
                            <div>
                              <span className="text-sm text-gray-600">Topics: </span>
                              {question.topics.map((topic, topicIndex) => (
                                <Badge key={topicIndex} variant="outline" className="text-xs mr-1">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                            
                            <div>
                              <span className="text-sm text-gray-600">Asked by: </span>
                              {question.companies.map((company, companyIndex) => (
                                <Badge key={companyIndex} variant="secondary" className="text-xs mr-1">
                                  {company}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm flex items-center gap-2">
                              <Brain className="w-4 h-4 text-blue-600" />
                              <strong>AI Hint:</strong> {question.aiHint}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Practice
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Performance</span>
                      <span>{interviewAnalytics.averageScore}%</span>
                    </div>
                    <Progress value={interviewAnalytics.averageScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Success Probability</span>
                      <span>{interviewAnalytics.successProbability}%</span>
                    </div>
                    <Progress value={interviewAnalytics.successProbability} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Strong Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {interviewAnalytics.strongAreas.map((area, index) => (
                        <Badge key={index} variant="default" className="bg-green-100 text-green-700">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Areas for Improvement:</h4>
                    <div className="flex flex-wrap gap-1">
                      {interviewAnalytics.weakAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="border-red-200 text-red-700">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Recommended Practice Areas:</h4>
                    <ul className="space-y-2">
                      {interviewAnalytics.recommendedPractice.map((practice, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-purple-600" />
                          <span className="text-sm">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Next Steps:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Complete 3 more system design interviews
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Practice dynamic programming problems
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Review behavioral question templates
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{interview.company}</h3>
                            <Badge variant="outline">{interview.type}</Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{interview.role}</p>
                          <p className="text-sm text-blue-600 font-medium mb-3">{interview.date}</p>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-2">
                              <span>Preparation Progress</span>
                              <span>{interview.preparation}%</span>
                            </div>
                            <Progress value={interview.preparation} className="h-2" />
                          </div>

                          <div className="bg-green-50 p-3 rounded-lg">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Brain className="w-4 h-4 text-green-600" />
                              AI Preparation Tips:
                            </h4>
                            <ul className="space-y-1">
                              {interview.aiTips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-sm flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Practice
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            Notes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-coach" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    AI Interview Coach
                  </CardTitle>
                  <CardDescription>Start a personalized coaching session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Current Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">System Design</Badge>
                      <Badge variant="outline">Algorithms</Badge>
                      <Badge variant="outline">Behavioral Questions</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Start Video Session
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mic className="w-4 h-4 mr-2" />
                      Voice-Only Session
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Text-Based Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Technical Interviews</h4>
                      <p className="text-xs text-gray-600">Think out loud, explain your approach, and don't be afraid to ask clarifying questions.</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Behavioral Interviews</h4>
                      <p className="text-xs text-gray-600">Use the STAR method and prepare specific examples from your experience.</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">System Design</h4>
                      <p className="text-xs text-gray-600">Start with high-level architecture and then dive into specific components.</p>
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

export default InterviewPrep;
