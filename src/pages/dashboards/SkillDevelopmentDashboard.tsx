import { Briefcase, TrendingUp, Target, Users, BookOpen, Award, Code, Brain, Star, PlayCircle, Calendar, Trophy, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

const SkillDevelopmentDashboard = () => {
  const mainFeatures = [
    {
      title: "AI Skill Gap Analyzer",
      description: "Smart analysis of your profile vs industry requirements with personalized roadmaps",
      icon: Brain,
      color: "from-blue-500/20 to-purple-500/20",
      action: "Analyze Skills",
      progress: 85,
      status: "Active"
    },
    {
      title: "Learning Path Engine",
      description: "Adaptive learning tracks for Web Dev, AI/ML, Data Science, and emerging technologies",
      icon: BookOpen,
      color: "from-green-500/20 to-teal-500/20",
      action: "Start Learning",
      progress: 70,
      status: "Popular"
    },
    {
      title: "Project-Based Learning",
      description: "Real-world projects with mentorship and industry collaboration opportunities",
      icon: Code,
      color: "from-orange-500/20 to-red-500/20",
      action: "Find Projects",
      progress: 60,
      status: "Updated"
    },
    {
      title: "Placement Accelerator",
      description: "Complete placement preparation with resume optimization and mock interviews",
      icon: Award,
      color: "from-purple-500/20 to-pink-500/20",
      action: "Get Ready",
      progress: 45,
      status: "New"
    }
  ];

  const skillProgress = [
    { skill: "React Development", progress: 85, level: "Advanced", color: "bg-blue-500", nextMilestone: "Next.js Mastery", timeToComplete: "2 weeks" },
    { skill: "Python Programming", progress: 72, level: "Intermediate", color: "bg-green-500", nextMilestone: "Django Framework", timeToComplete: "3 weeks" },
    { skill: "Data Analysis", progress: 56, level: "Beginner", color: "bg-orange-500", nextMilestone: "Machine Learning", timeToComplete: "4 weeks" },
    { skill: "UI/UX Design", progress: 38, level: "Beginner", color: "bg-purple-500", nextMilestone: "Design Systems", timeToComplete: "5 weeks" }
  ];

  const trendingSkills = [
    { skill: "Artificial Intelligence", demand: "Very High", growth: "+45%", jobs: "15K+", salary: "₹12-25L" },
    { skill: "Cloud Computing", demand: "High", growth: "+38%", jobs: "12K+", salary: "₹8-18L" },
    { skill: "Cybersecurity", demand: "Very High", growth: "+52%", jobs: "8K+", salary: "₹10-22L" },
    { skill: "Data Science", demand: "High", growth: "+41%", jobs: "18K+", salary: "₹9-20L" }
  ];

  const upcomingOpportunities = [
    {
      title: "Frontend Developer Internship",
      company: "TechCorp",
      type: "Internship",
      duration: "3 months",
      stipend: "₹15K/month",
      skills: ["React", "TypeScript"],
      deadline: "3 days"
    },
    {
      title: "Data Analysis Project",
      company: "StartupXYZ",
      type: "Project",
      duration: "2 months",
      stipend: "₹25K total",
      skills: ["Python", "Pandas"],
      deadline: "1 week"
    },
    {
      title: "UI/UX Design Challenge",
      company: "DesignCo",
      type: "Challenge",
      duration: "1 month",
      stipend: "Portfolio building",
      skills: ["Figma", "Prototyping"],
      deadline: "5 days"
    }
  ];

  const achievements = [
    { title: "Code Master", description: "100+ coding problems solved", icon: Code, earned: true },
    { title: "Project Champion", description: "3 projects completed", icon: Trophy, earned: true },
    { title: "Skill Streak", description: "30 days continuous learning", icon: Target, earned: false },
    { title: "Industry Ready", description: "80% placement score", icon: Star, earned: false }
  ];

  return (
    <DashboardLayout 
      title="Skill Development Hub" 
      description="Bridge the gap between learning and earning with industry-relevant skills"
    >
      <div className="p-6 space-y-8">
        {/* Performance Overview */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Skill Development Journey 🚀</h2>
                <p className="text-muted-foreground">Track progress and unlock career opportunities</p>
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary">
              Level 3 Developer
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Skills Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">3</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">89%</div>
              <div className="text-sm text-muted-foreground">Placement Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">₹8.5L</div>
              <div className="text-sm text-muted-foreground">Expected Package</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skill Progress Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Learning Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillProgress.map((skill, index) => (
                  <Card key={index} className="feature-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-lg">{skill.skill}</div>
                        <Badge variant={skill.progress >= 70 ? "default" : skill.progress >= 50 ? "secondary" : "outline"}>
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-3" />
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Next Goal:</span>
                            <span className="font-medium">{skill.nextMilestone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ETA:</span>
                            <span className="font-medium text-primary">{skill.timeToComplete}</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full btn-secondary">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Strategic Tools */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Development Tools</h3>
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
                            <span>Usage</span>
                            <span>{feature.progress}%</span>
                          </div>
                          <Progress value={feature.progress} className="h-2" />
                          <Button className="w-full btn-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
            {/* Trending Skills */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingSkills.map((skill, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="font-medium text-sm mb-2">{skill.skill}</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Demand:</span>
                          <span className={`font-medium ${skill.demand === 'Very High' ? 'text-red-500' : 'text-orange-500'}`}>
                            {skill.demand}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Growth:</span>
                          <span className="text-green-500 font-medium">{skill.growth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Salary:</span>
                          <span className="font-medium text-primary">{skill.salary}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-2 btn-secondary">Learn Now</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Opportunities */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Hot Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingOpportunities.map((opportunity, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      opportunity.deadline === '3 days' ? 'bg-red-500/10 border-red-500/30' :
                      opportunity.deadline === '1 week' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      'bg-blue-500/10 border-blue-500/30'
                    }`}>
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">{opportunity.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {opportunity.deadline}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {opportunity.company} • {opportunity.duration} • {opportunity.stipend}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {opportunity.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs px-2 py-0">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full btn-secondary">
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          achievement.earned 
                            ? "bg-primary/10 border-primary/30 text-primary" 
                            : "bg-muted/30 border-border/50 text-muted-foreground"
                        }`}
                      >
                        <IconComponent className={`w-6 h-6 mx-auto mb-2 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`} />
                        <p className="text-xs font-medium">{achievement.title}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillDevelopmentDashboard;