import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, BookOpen, Users, Calculator, Award, TrendingUp, Brain, Calendar, Clock, AlertCircle, CheckCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
// Animation library
import { motion, AnimatePresence } from "framer-motion";

const DecisionMakingDashboard = () => {
  const navigate = useNavigate();
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const mainFeatures = [
    {
      title: "Career Pathway Analysis",
      description: "AI-powered analysis of Engineering, Medical, Commerce, and other career paths",
      icon: Target,
      color: "from-blue-500/20 to-purple-500/20",
      action: "Analyze Paths",
      progress: 85,
      status: "Active",
      path: "/dashboard/decision-making/pathways"
    },
    {
      title: "Exam Preparation Hub",
      description: "Comprehensive prep for JEE, NEET, CUET, CLAT with personalized study plans",
      icon: BookOpen,
      color: "from-green-500/20 to-teal-500/20",
      action: "Start Prep",
      progress: 60,
      status: "In Progress",
      path: "/dashboard/decision-making/exams"
    },
    {
      title: "College Insights",
      description: "Detailed analysis of colleges, branches, placements, and ROI calculations",
      icon: Calculator,
      color: "from-purple-500/20 to-pink-500/20",
      action: "Explore Colleges",
      progress: 70,
      status: "New",
      path: "/dashboard/decision-making/college-insights"
    },
    {
      title: "Alternative Careers",
      description: "Explore unconventional career paths and emerging opportunities",
      icon: Brain,
      color: "from-indigo-500/20 to-blue-500/20",
      action: "Discover Paths",
      progress: 45,
      status: "Trending",
      path: "/dashboard/decision-making/alternative-careers"
    },
    {
      title: "Mentor Network",
      description: "Connect with seniors, professionals, and subject experts for guidance",
      icon: Users,
      color: "from-orange-500/20 to-red-500/20",
      action: "Find Mentors",
      progress: 75,
      status: "Popular",
      path: "/dashboard/decision-making/mentors"
    },
    {
      title: "Mock Tests",
      description: "Practice with comprehensive mock tests and improve your performance",
      icon: Trophy,
      color: "from-yellow-500/20 to-orange-500/20",
      action: "Take Tests",
      progress: 88,
      status: "Active",
      path: "/dashboard/decision-making/mock-tests"
    },
    {
      title: "Progress Analytics",
      description: "Track your learning journey with detailed insights and recommendations",
      icon: TrendingUp,
      color: "from-teal-500/20 to-green-500/20",
      action: "View Analytics",
      progress: 92,
      status: "Updated",
      path: "/dashboard/decision-making/analytics"
    }
  ];

  const examProgress = [
    { exam: "JEE Main", progress: 78, color: "bg-blue-500", nextTest: "Mock Test 15", rank: "All India: 2,450" },
    { exam: "NEET", progress: 65, color: "bg-green-500", nextTest: "Biology Quiz", rank: "State: 890" },
    { exam: "CUET", progress: 82, color: "bg-purple-500", nextTest: "English Test", rank: "Zone: 156" },
    { exam: "CLAT", progress: 45, color: "bg-orange-500", nextTest: "Legal Reasoning", rank: "National: 5,670" }
  ];

  // --- Real-time deadlines state ---
  useEffect(() => {
    // Fetch deadlines from backend API
    fetch("http://localhost:3001/api/deadlines")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const formatted = data.map((item) => {
          const deadlineDate = new Date(item.date);
          const diffTime = deadlineDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          let status = "upcoming";
          if (diffDays < 0) status = "expired";
          else if (diffDays === 0) status = "today";
          return {
            ...item,
            status,
            timeLeft:
              status === "expired"
                ? "Expired"
                : status === "today"
                ? "Today"
                : `${diffDays} days left`,
            formattedDate: deadlineDate.toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          };
        });
        setDeadlines(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const recentAchievements = [
    { title: "Mock Test Champion", score: "95%", subject: "Physics", icon: Trophy },
    { title: "Consistency Master", streak: "15 days", type: "Study Streak", icon: CheckCircle },
    { title: "Top Performer", rank: "Top 5%", exam: "JEE Mock", icon: Award }
  ];

  return (
    <DashboardLayout 
      title="Decision Maker's Hub" 
      description="Strategic preparation for your crucial academic decisions"
    >
      <div className="p-6 space-y-8">
        {/* Performance Overview */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Preparation Dashboard 🎯</h2>
                <p className="text-muted-foreground">Track your progress across all competitive exams</p>
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary">
              Rank: Top 8%
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Mock Tests Taken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">89.2%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">45hrs</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Mentor Sessions</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exam Progress Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Exam Preparation Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examProgress.map((exam, index) => (
                  <Card key={index} className="feature-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-lg">{exam.exam}</div>
                        <Badge variant={exam.progress >= 70 ? "default" : exam.progress >= 50 ? "secondary" : "destructive"}>
                          {exam.progress >= 70 ? "Excellent" : exam.progress >= 50 ? "Good" : "Focus Needed"}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{exam.progress}%</span>
                        </div>
                        <Progress value={exam.progress} className="h-3" />
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Next Test:</span>
                            <span className="font-medium">{exam.nextTest}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Current Rank:</span>
                            <span className="font-medium text-primary">{exam.rank}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Main Features */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Strategic Tools</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mainFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={index} className="feature-card group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <Badge variant={feature.status === "Active" ? "default" : feature.status === "Popular" ? "secondary" : "outline"}>
                            {feature.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription className="text-muted-foreground text-sm">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Completion</span>
                            <span>{feature.progress}%</span>
                          </div>
                          <Progress value={feature.progress} className="h-2" />
                          <Button 
                            className="w-full btn-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                            onClick={() => navigate(feature.path)}
                          >
                            {feature.action}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Critical Deadlines */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center text-red-500">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Critical Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ marginTop: "2rem", fontSize: "1.2rem" }}
                    >
                      Loading deadlines...
                    </motion.div>
                  ) : deadlines.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ marginTop: "2rem", fontSize: "1.2rem" }}
                    >
                      No deadlines found.
                    </motion.div>
                  ) : (
                    <ul className="space-y-4">
                      {deadlines.map((dl, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between p-4 rounded-lg shadow-md bg-blue-100 border border-blue-300"
                        >
                          <div>
                            <p className="font-semibold text-lg text-blue-900">{dl.name}</p>
                            <p className="text-sm text-blue-700">{dl.formattedDate}</p>
                          </div>
                          <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                            {dl.timeLeft}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Recent Wins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAchievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {achievement.score && `Score: ${achievement.score}`}
                            {achievement.streak && `${achievement.streak} streak`}
                            {achievement.rank && `${achievement.rank} in ${achievement.exam}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Performance */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Study Hours</span>
                    <span className="font-medium">18.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mock Tests</span>
                    <span className="font-medium">8 completed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg Score</span>
                    <span className="font-medium text-primary">92.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rank Improvement</span>
                    <span className="font-medium text-green-500">↑ 245 positions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DecisionMakingDashboard;