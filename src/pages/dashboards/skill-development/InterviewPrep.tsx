import { useState } from "react";
import { Brain, Video, Mic, Clock, Target, Award, Users, Star, Play, Pause, RotateCcw, CheckCircle, AlertCircle, TrendingUp, FileText, Download, Share2, Sparkles, Code, MessageSquare, Layers, Zap } from "lucide-react";
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
  const [selectedRounds, setSelectedRounds] = useState<string[]>([]);

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

  const interviewRounds = [
    { id: 'machine-coding', name: 'Machine Coding', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 'technical', name: 'Technical Discussion', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'system-design', name: 'System Design', icon: Layers, color: 'from-orange-500 to-red-500' },
    { id: 'behavioral', name: 'Behavioral', icon: MessageSquare, color: 'from-green-500 to-emerald-500' }
  ];

  const toggleRound = (roundId: string) => {
    setSelectedRounds(prev =>
      prev.includes(roundId)
        ? prev.filter(id => id !== roundId)
        : [...prev, roundId]
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8 bg-slate-950 min-h-screen">
        {/* ============ Premium Header Section ============ */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl border border-transparent">
          {/* Premium Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 hover:from-blue-500/5 hover:via-purple-500/5 hover:to-indigo-500/5 transition-all duration-700 rounded-3xl"></div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-purple-500/30 via-blue-500/20 to-indigo-500/30"></div>

          {/* Premium Accent Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-600/5 to-transparent rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600/5 to-transparent rounded-full translate-x-32 translate-y-32 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500/30 to-blue-500/20 rounded-xl backdrop-blur-sm border border-purple-400/40 shadow-lg">
                <Brain className="w-8 h-8 text-purple-300" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-100 bg-clip-text text-transparent">
                  AI Interview Preparation
                </h1>
                <p className="text-purple-300 text-lg font-medium">Master Your Interview Skills</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-gradient-to-r from-purple-500/40 to-purple-600/30 border-purple-400/60 text-purple-100 backdrop-blur-sm shadow-md">
                <Sparkles className="w-3 h-3 mr-2" />
                AI-Powered
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/40 to-blue-600/30 border-blue-400/60 text-blue-100 backdrop-blur-sm shadow-md">
                <Target className="w-3 h-3 mr-2" />
                Real-time Feedback
              </Badge>
              <Badge className="bg-gradient-to-r from-emerald-500/40 to-emerald-600/30 border-emerald-400/60 text-emerald-100 backdrop-blur-sm shadow-md">
                <Award className="w-3 h-3 mr-2" />
                Performance Tracking
              </Badge>
            </div>
          </div>
        </div>

        {/* ============ Main Interview Setup Section (Following Wireframe) ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - Role Selection & Rounds */}
          <div className="space-y-6">
            {/* Role Selection Card */}
            <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Select Role
                </CardTitle>
                <CardDescription className="text-slate-400">Choose the role you're applying for</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white hover:bg-slate-700/50 transition-colors">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="frontend-developer" className="text-white hover:bg-slate-700">Frontend Developer</SelectItem>
                    <SelectItem value="backend-developer" className="text-white hover:bg-slate-700">Backend Developer</SelectItem>
                    <SelectItem value="fullstack-developer" className="text-white hover:bg-slate-700">Full Stack Developer</SelectItem>
                    <SelectItem value="devops-engineer" className="text-white hover:bg-slate-700">DevOps Engineer</SelectItem>
                    <SelectItem value="data-scientist" className="text-white hover:bg-slate-700">Data Scientist</SelectItem>
                    <SelectItem value="ml-engineer" className="text-white hover:bg-slate-700">ML Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Interview Rounds Card */}
            <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  Interview Rounds
                </CardTitle>
                <CardDescription className="text-slate-400">Select rounds to practice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {interviewRounds.map((round, index) => (
                  <div
                    key={round.id}
                    onClick={() => toggleRound(round.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${selectedRounds.includes(round.id)
                        ? 'bg-gradient-to-r ' + round.color + ' border-transparent shadow-lg scale-[1.02]'
                        : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${selectedRounds.includes(round.id)
                          ? 'bg-white/20'
                          : 'bg-slate-700/50'
                        }`}>
                        <round.icon className={`w-5 h-5 ${selectedRounds.includes(round.id)
                            ? 'text-white'
                            : 'text-slate-400'
                          }`} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-sm ${selectedRounds.includes(round.id)
                            ? 'text-white'
                            : 'text-slate-300'
                          }`}>
                          {index + 1}. {round.name}
                        </p>
                      </div>
                      {selectedRounds.includes(round.id) && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Start Interview Button */}
            <Button
              className="w-full h-14 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={selectedRounds.length === 0}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Interview
            </Button>
          </div>

          {/* Right Column - Rules & Guidelines */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  Interview Rules & Guidelines
                </CardTitle>
                <CardDescription className="text-slate-400">Important information before you start</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* General Rules */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    General Guidelines
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <p className="font-medium text-white text-sm">Time Management</p>
                      </div>
                      <p className="text-xs text-slate-400">Each round has a specific time limit. Manage your time wisely.</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <p className="font-medium text-white text-sm">Think Aloud</p>
                      </div>
                      <p className="text-xs text-slate-400">Explain your thought process as you solve problems.</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className="w-4 h-4 text-green-400" />
                        <p className="font-medium text-white text-sm">Clear Communication</p>
                      </div>
                      <p className="text-xs text-slate-400">Speak clearly and articulate your ideas effectively.</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        <p className="font-medium text-white text-sm">Ask Questions</p>
                      </div>
                      <p className="text-xs text-slate-400">Don't hesitate to ask clarifying questions.</p>
                    </div>
                  </div>
                </div>

                {/* Round-Specific Tips */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-blue-300 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Round-Specific Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="w-4 h-4 text-blue-400" />
                        <p className="font-semibold text-white">Machine Coding</p>
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1 ml-6 list-disc">
                        <li>Write clean, modular, and well-documented code</li>
                        <li>Focus on code quality and best practices</li>
                        <li>Test your code with edge cases</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <p className="font-semibold text-white">Technical Discussion</p>
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1 ml-6 list-disc">
                        <li>Demonstrate deep understanding of concepts</li>
                        <li>Discuss trade-offs and alternatives</li>
                        <li>Share real-world experiences</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="w-4 h-4 text-orange-400" />
                        <p className="font-semibold text-white">System Design</p>
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1 ml-6 list-disc">
                        <li>Start with high-level architecture</li>
                        <li>Consider scalability and reliability</li>
                        <li>Discuss data flow and API design</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-green-400" />
                        <p className="font-semibold text-white">Behavioral</p>
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1 ml-6 list-disc">
                        <li>Use the STAR method (Situation, Task, Action, Result)</li>
                        <li>Provide specific examples from your experience</li>
                        <li>Show leadership and problem-solving skills</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* AI Features */}
                <div className="p-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-lg border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <p className="font-semibold text-white">AI-Powered Features</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Real-time feedback
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Voice analysis
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Code review
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      Performance tracking
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl">
                  <Award className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{interviewAnalytics.totalInterviews}</p>
                  <p className="text-sm text-slate-400">Mock Interviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{interviewAnalytics.averageScore}%</p>
                  <p className="text-sm text-slate-400">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{interviewAnalytics.improvement}</p>
                  <p className="text-sm text-slate-400">Improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl">
                  <Star className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{interviewAnalytics.successProbability}%</p>
                  <p className="text-sm text-slate-400">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="mock-interviews" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="mock-interviews" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Mock Interviews</TabsTrigger>
            <TabsTrigger value="practice" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Practice Questions</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Analytics</TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Upcoming</TabsTrigger>
            <TabsTrigger value="ai-coach" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">AI Coach</TabsTrigger>
          </TabsList>

          <TabsContent value="mock-interviews" className="mt-6">
            <div className="space-y-6">
              {/* Interview Types */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Choose Interview Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {interviewTypes.map((type) => (
                    <Card key={type.id} className="cursor-pointer hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 hover:border-purple-500/50">
                      <CardHeader className="pb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${type.color} flex items-center justify-center mb-3 shadow-lg`}>
                          <type.icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg text-white">{type.title}</CardTitle>
                        <CardDescription className="text-sm text-slate-400">{type.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Duration:</span>
                            <span className="font-medium text-white">{type.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Difficulty:</span>
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">{type.difficulty}</Badge>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0">
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
                <h2 className="text-xl font-semibold mb-4 text-white">Recent Mock Interviews</h2>
                <div className="space-y-4">
                  {mockInterviews.map((interview) => (
                    <Card key={interview.id} className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl hover:shadow-2xl transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg text-white">{interview.company}</h3>
                              <Badge variant="outline" className="border-slate-600 text-slate-300">{interview.type}</Badge>
                              <Badge className={getDifficultyColor(interview.difficulty)}>
                                {interview.difficulty}
                              </Badge>
                            </div>
                            <p className="text-slate-400 mb-2">{interview.role}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {interview.duration}
                              </span>
                              <span>{interview.questions} questions</span>
                            </div>

                            {interview.completed && (
                              <div className="space-y-2">
                                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                  <p className="text-sm text-slate-300"><strong className="text-white">Feedback:</strong> {interview.feedback}</p>
                                </div>
                                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-3 rounded-lg border border-purple-500/30">
                                  <p className="text-sm flex items-center gap-2 text-slate-300">
                                    <Brain className="w-4 h-4 text-purple-400" />
                                    <strong className="text-white">AI Insights:</strong> {interview.aiInsights}
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
                                <p className="text-sm text-slate-400">Score</p>
                              </div>
                            ) : (
                              <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 border-amber-500/30">In Progress</Badge>
                            )}

                            <div className="flex gap-2">
                              {interview.completed ? (
                                <>
                                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
                                    <Download className="w-4 h-4 mr-1" />
                                    Report
                                  </Button>
                                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
                                    <RotateCcw className="w-4 h-4 mr-1" />
                                    Retry
                                  </Button>
                                </>
                              ) : (
                                <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 border-0">
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
                <h2 className="text-xl font-semibold text-white">Practice Questions</h2>
                <div className="flex gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px] bg-slate-800/50 border-slate-600/50 text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-white hover:bg-slate-700">All Categories</SelectItem>
                      <SelectItem value="algorithms" className="text-white hover:bg-slate-700">Algorithms</SelectItem>
                      <SelectItem value="data-structures" className="text-white hover:bg-slate-700">Data Structures</SelectItem>
                      <SelectItem value="system-design" className="text-white hover:bg-slate-700">System Design</SelectItem>
                      <SelectItem value="behavioral" className="text-white hover:bg-slate-700">Behavioral</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px] bg-slate-800/50 border-slate-600/50 text-white">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all" className="text-white hover:bg-slate-700">All Levels</SelectItem>
                      <SelectItem value="easy" className="text-white hover:bg-slate-700">Easy</SelectItem>
                      <SelectItem value="medium" className="text-white hover:bg-slate-700">Medium</SelectItem>
                      <SelectItem value="hard" className="text-white hover:bg-slate-700">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {practiceQuestions.map((question, index) => (
                  <Card key={index} className="hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="border-slate-600 text-slate-300">{question.category}</Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                              {question.frequency}
                            </Badge>
                          </div>

                          <h3 className="font-semibold text-lg mb-2 text-white">{question.question}</h3>

                          <div className="space-y-2 mb-3">
                            <div>
                              <span className="text-sm text-slate-400">Topics: </span>
                              {question.topics.map((topic, topicIndex) => (
                                <Badge key={topicIndex} variant="outline" className="text-xs mr-1 border-slate-600 text-slate-300">
                                  {topic}
                                </Badge>
                              ))}
                            </div>

                            <div>
                              <span className="text-sm text-slate-400">Asked by: </span>
                              {question.companies.map((company, companyIndex) => (
                                <Badge key={companyIndex} variant="secondary" className="text-xs mr-1 bg-slate-700/50 text-slate-300">
                                  {company}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 rounded-lg border border-blue-500/30">
                            <p className="text-sm flex items-center gap-2 text-slate-300">
                              <Brain className="w-4 h-4 text-blue-400" />
                              <strong className="text-white">AI Hint:</strong> {question.aiHint}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 border-0">
                            <Play className="w-4 h-4 mr-1" />
                            Practice
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
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
              <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-slate-300">
                      <span>Overall Performance</span>
                      <span className="text-white font-semibold">{interviewAnalytics.averageScore}%</span>
                    </div>
                    <Progress value={interviewAnalytics.averageScore} className="h-2 bg-slate-700" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2 text-slate-300">
                      <span>Success Probability</span>
                      <span className="text-white font-semibold">{interviewAnalytics.successProbability}%</span>
                    </div>
                    <Progress value={interviewAnalytics.successProbability} className="h-2 bg-slate-700" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Strong Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {interviewAnalytics.strongAreas.map((area, index) => (
                        <Badge key={index} variant="default" className="bg-green-500/20 text-green-300 border-green-500/30">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Areas for Improvement:</h4>
                    <div className="flex flex-wrap gap-1">
                      {interviewAnalytics.weakAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="border-red-500/30 text-red-300">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Brain className="w-5 h-5 text-purple-400" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/30">
                    <h4 className="font-medium mb-2 text-white">Recommended Practice Areas:</h4>
                    <ul className="space-y-2">
                      {interviewAnalytics.recommendedPractice.map((practice, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-300">
                          <Target className="w-4 h-4 text-purple-400" />
                          <span className="text-sm">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/30">
                    <h4 className="font-medium mb-2 text-white">Next Steps:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-slate-300">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        Complete 3 more system design interviews
                      </li>
                      <li className="flex items-center gap-2 text-slate-300">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        Practice dynamic programming problems
                      </li>
                      <li className="flex items-center gap-2 text-slate-300">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
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
              <h2 className="text-xl font-semibold text-white">Upcoming Interviews</h2>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-white">{interview.company}</h3>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">{interview.type}</Badge>
                          </div>
                          <p className="text-slate-400 mb-2">{interview.role}</p>
                          <p className="text-sm text-blue-400 font-medium mb-3">{interview.date}</p>

                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-2 text-slate-300">
                              <span>Preparation Progress</span>
                              <span className="text-white font-semibold">{interview.preparation}%</span>
                            </div>
                            <Progress value={interview.preparation} className="h-2 bg-slate-700" />
                          </div>

                          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3 rounded-lg border border-green-500/30">
                            <h4 className="font-medium mb-2 flex items-center gap-2 text-white">
                              <Brain className="w-4 h-4 text-green-400" />
                              AI Preparation Tips:
                            </h4>
                            <ul className="space-y-1">
                              {interview.aiTips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-sm flex items-center gap-2 text-slate-300">
                                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 border-0">
                            <Play className="w-4 h-4 mr-1" />
                            Practice
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700/50">
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
              <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Brain className="w-5 h-5 text-purple-400" />
                    AI Interview Coach
                  </CardTitle>
                  <CardDescription className="text-slate-400">Start a personalized coaching session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-lg border border-purple-500/30">
                    <h4 className="font-medium mb-2 text-white">Current Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">System Design</Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">Algorithms</Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">Behavioral Questions</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0">
                      <Video className="w-4 h-4 mr-2" />
                      Start Video Session
                    </Button>
                    <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50">
                      <Mic className="w-4 h-4 mr-2" />
                      Voice-Only Session
                    </Button>
                    <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50">
                      <FileText className="w-4 h-4 mr-2" />
                      Text-Based Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 border-slate-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30">
                      <h4 className="font-medium text-sm mb-1 text-white">Technical Interviews</h4>
                      <p className="text-xs text-slate-400">Think out loud, explain your approach, and don't be afraid to ask clarifying questions.</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                      <h4 className="font-medium text-sm mb-1 text-white">Behavioral Interviews</h4>
                      <p className="text-xs text-slate-400">Use the STAR method and prepare specific examples from your experience.</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/30">
                      <h4 className="font-medium text-sm mb-1 text-white">System Design</h4>
                      <p className="text-xs text-slate-400">Start with high-level architecture and then dive into specific components.</p>
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
