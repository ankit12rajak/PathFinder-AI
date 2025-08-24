import { Briefcase, TrendingUp, Target, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SkillDevelopmentDashboard = () => {
  const features = [
    {
      title: "Skill Gap Analyzer",
      description: "AI analysis of your resume, current course, and career goals to identify missing skills",
      icon: Target,
      color: "from-blue-500/20 to-purple-500/20",
      action: "Analyze Skills"
    },
    {
      title: "Personalized Learning Paths",
      description: "Curated roadmaps for Web Dev, AI/ML, Finance, Design, Data Science, Digital Marketing",
      icon: BookOpen,
      color: "from-green-500/20 to-teal-500/20",
      action: "Start Learning"
    },
    {
      title: "Industry Trends Dashboard",
      description: "Real-time insights on rising skills like AI, Cloud, Cybersecurity, and Blockchain",
      icon: TrendingUp,
      color: "from-orange-500/20 to-red-500/20",
      action: "View Trends"
    },
    {
      title: "Internship & Project Opportunities",
      description: "Match with real-world projects and internships based on your skill level and interests",
      icon: Briefcase,
      color: "from-pink-500/20 to-purple-500/20",
      action: "Find Opportunities"
    },
    {
      title: "Soft Skills & Communication",
      description: "Interview preparation, networking skills, public speaking, and professional communication",
      icon: Users,
      color: "from-yellow-500/20 to-orange-500/20",
      action: "Improve Skills"
    },
    {
      title: "Placement Readiness Kit",
      description: "Resume builder, ATS optimization, mock interviews with AI, and placement preparation",
      icon: Award,
      color: "from-cyan-500/20 to-blue-500/20",
      action: "Get Ready"
    }
  ];

  const skillProgress = [
    { skill: "React Development", progress: 85, level: "Advanced", color: "bg-blue-500" },
    { skill: "Python Programming", progress: 72, level: "Intermediate", color: "bg-green-500" },
    { skill: "Data Analysis", progress: 56, level: "Beginner", color: "bg-orange-500" },
    { skill: "UI/UX Design", progress: 38, level: "Beginner", color: "bg-purple-500" }
  ];

  const trendingSkills = [
    { skill: "Artificial Intelligence", demand: "High", growth: "+45%", jobs: "15K+" },
    { skill: "Cloud Computing", demand: "High", growth: "+38%", jobs: "12K+" },
    { skill: "Cybersecurity", demand: "Very High", growth: "+52%", jobs: "8K+" },
    { skill: "Data Science", demand: "High", growth: "+41%", jobs: "18K+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">College Students Dashboard</h1>
              <p className="text-muted-foreground">Skill Development / Employability Stage</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Bridge the gap between academic learning and industry requirements. Develop in-demand skills, 
            gain practical experience, and prepare for a successful career launch.
          </p>
        </div>

        {/* Skill Progress Tracking */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Skill Development Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillProgress.map((skill, index) => (
              <Card key={index} className="feature-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold">{skill.skill}</div>
                      <div className="text-sm text-muted-foreground">{skill.level}</div>
                    </div>
                    <div className="text-xl font-bold text-primary">{skill.progress}%</div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${skill.color}`}
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>Next milestone: {skill.progress + 15}%</span>
                    <Button size="sm" variant="ghost" className="text-primary">Continue</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trending Skills */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Trending Skills in Market</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingSkills.map((skill, index) => (
              <Card key={index} className="feature-card">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="font-semibold">{skill.skill}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Demand:</span>
                        <span className={`font-medium ${
                          skill.demand === 'Very High' ? 'text-red-500' : 'text-orange-500'
                        }`}>
                          {skill.demand}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Growth:</span>
                        <span className="text-green-500 font-medium">{skill.growth}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Jobs:</span>
                        <span className="font-medium">{skill.jobs}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full btn-secondary">Learn Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Skills Completed</div>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-secondary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-accent mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Placement Score</div>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">₹8.5L</div>
              <div className="text-sm text-muted-foreground">Expected Package</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="feature-card group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full btn-secondary">
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Opportunities */}
        <div>
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-xl">Recent Opportunities</CardTitle>
              <CardDescription>Latest internships and projects matching your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                  <div>
                    <div className="font-medium">Frontend Developer Internship - TechCorp</div>
                    <div className="text-sm text-muted-foreground">3-month paid internship • React, TypeScript • ₹15K/month</div>
                  </div>
                  <Button size="sm" className="btn-hero">Apply</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <div>
                    <div className="font-medium">Data Analysis Project - StartupXYZ</div>
                    <div className="text-sm text-muted-foreground">2-month project • Python, Pandas • ₹25K total</div>
                  </div>
                  <Button size="sm" className="btn-secondary">View Details</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <div>
                    <div className="font-medium">UI/UX Design Challenge - DesignCo</div>
                    <div className="text-sm text-muted-foreground">1-month challenge • Figma, Prototyping • Portfolio building</div>
                  </div>
                  <Button size="sm" className="btn-secondary">Join Challenge</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopmentDashboard;