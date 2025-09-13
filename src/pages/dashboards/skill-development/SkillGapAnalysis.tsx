import { useState } from "react";
import { BarChart3, Target, TrendingUp, AlertCircle, CheckCircle, User, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";

const SkillGapAnalysis = () => {
  const [selectedRole, setSelectedRole] = useState<string>("frontend-developer");

  const targetRoles = [
    { id: "frontend-developer", name: "Frontend Developer", category: "Development" },
    { id: "data-scientist", name: "Data Scientist", category: "Analytics" },
    { id: "digital-marketer", name: "Digital Marketer", category: "Marketing" },
    { id: "product-manager", name: "Product Manager", category: "Management" },
    { id: "ui-designer", name: "UI/UX Designer", category: "Design" },
    { id: "cloud-engineer", name: "Cloud Engineer", category: "Infrastructure" }
  ];

  const skillAnalysis = {
    "frontend-developer": {
      required: [
        { skill: "HTML/CSS", level: 90, current: 85, status: "strong" },
        { skill: "JavaScript", level: 95, current: 70, status: "developing" },
        { skill: "React.js", level: 85, current: 60, status: "gap" },
        { skill: "Version Control (Git)", level: 80, current: 90, status: "strong" },
        { skill: "Responsive Design", level: 85, current: 75, status: "developing" },
        { skill: "Testing & Debugging", level: 75, current: 45, status: "gap" },
        { skill: "Web Performance", level: 70, current: 30, status: "gap" },
        { skill: "TypeScript", level: 80, current: 20, status: "critical" }
      ],
      trends: [
        { skill: "React/Next.js", demand: 95, growth: "+25%" },
        { skill: "TypeScript", demand: 88, growth: "+40%" },
        { skill: "Mobile Development", demand: 82, growth: "+18%" },
        { skill: "Web3/Blockchain", demand: 65, growth: "+60%" }
      ]
    },
    "data-scientist": {
      required: [
        { skill: "Python", level: 95, current: 80, status: "developing" },
        { skill: "Statistics", level: 90, current: 60, status: "gap" },
        { skill: "Machine Learning", level: 85, current: 40, status: "critical" },
        { skill: "SQL", level: 80, current: 70, status: "developing" },
        { skill: "Data Visualization", level: 75, current: 55, status: "gap" },
        { skill: "Big Data Tools", level: 70, current: 20, status: "critical" },
        { skill: "R Programming", level: 65, current: 25, status: "gap" },
        { skill: "Deep Learning", level: 80, current: 15, status: "critical" }
      ],
      trends: [
        { skill: "AI/ML", demand: 98, growth: "+35%" },
        { skill: "Big Data", demand: 85, growth: "+28%" },
        { skill: "Cloud Platforms", demand: 82, growth: "+22%" },
        { skill: "MLOps", demand: 75, growth: "+45%" }
      ]
    }
  };

  const learningPaths = [
    {
      skill: "React.js",
      timeline: "6-8 weeks",
      difficulty: "Medium",
      priority: "High",
      resources: [
        { type: "Course", name: "React Fundamentals", duration: "4 weeks" },
        { type: "Project", name: "Todo App", duration: "1 week" },
        { type: "Course", name: "Advanced React", duration: "3 weeks" },
        { type: "Project", name: "E-commerce Site", duration: "2 weeks" }
      ]
    },
    {
      skill: "TypeScript",
      timeline: "4-6 weeks",
      difficulty: "Medium",
      priority: "Critical",
      resources: [
        { type: "Course", name: "TypeScript Basics", duration: "2 weeks" },
        { type: "Project", name: "Type-safe API", duration: "1 week" },
        { type: "Course", name: "Advanced Types", duration: "2 weeks" },
        { type: "Project", name: "React + TypeScript", duration: "1 week" }
      ]
    }
  ];

  const currentSkills = skillAnalysis[selectedRole as keyof typeof skillAnalysis];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong": return "text-green-600 bg-green-100";
      case "developing": return "text-blue-600 bg-blue-100";
      case "gap": return "text-orange-600 bg-orange-100";
      case "critical": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "strong": return <CheckCircle className="w-4 h-4" />;
      case "developing": return <TrendingUp className="w-4 h-4" />;
      case "gap": case "critical": return <AlertCircle className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const overallScore = Math.round(
    currentSkills.required.reduce((acc, skill) => acc + (skill.current / skill.level) * 100, 0) / 
    currentSkills.required.length
  );

  return (
    <DashboardLayout 
      title="Skill Gap Analysis" 
      description="Analyze your current skills and identify areas for improvement"
    >
      <div className="p-6 space-y-8">
        {/* Overall Assessment */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Your Skill Assessment
              </h2>
              <p className="text-muted-foreground">Based on industry requirements for {targetRoles.find(r => r.id === selectedRole)?.name}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{overallScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Readiness</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["strong", "developing", "gap", "critical"].map((status) => {
              const count = currentSkills.required.filter(skill => skill.status === status).length;
              return (
                <div key={status} className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm capitalize">{status} Skills</div>
                </div>
              );
            })}
          </div>
        </div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Skill Analysis</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            {/* Role Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Target Role</CardTitle>
                <CardDescription>Select the role you're preparing for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {targetRoles.map((role) => (
                    <Button
                      key={role.id}
                      variant={selectedRole === role.id ? "default" : "outline"}
                      onClick={() => setSelectedRole(role.id)}
                      className="justify-start"
                    >
                      {role.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills Assessment</CardTitle>
                <CardDescription>Your current level vs industry requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentSkills.required.map((skill, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{skill.skill}</span>
                          <Badge className={`${getStatusColor(skill.status)} border-0`}>
                            {getStatusIcon(skill.status)}
                            <span className="ml-1 capitalize">{skill.status}</span>
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {skill.current}% / {skill.level}%
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Your Level</span>
                          <span>Required Level</span>
                        </div>
                        <div className="relative">
                          <Progress value={skill.level} className="h-3 bg-gray-200" />
                          <Progress 
                            value={skill.current} 
                            className="h-3 absolute top-0 bg-transparent" 
                          />
                        </div>
                      </div>
                      
                      {skill.current < skill.level && (
                        <div className="text-sm text-muted-foreground">
                          Gap: {skill.level - skill.current}% improvement needed
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Skill Trends</CardTitle>
                <CardDescription>Most in-demand skills and their growth rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentSkills.trends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{trend.skill}</div>
                        <div className="text-sm text-muted-foreground">Market Demand: {trend.demand}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{trend.growth}</div>
                        <div className="text-sm text-muted-foreground">Growth Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-200 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800">Priority Skills</h4>
                    <p className="text-sm text-blue-600 mt-1">Focus on TypeScript and React.js to close critical gaps</p>
                  </div>
                  <div className="p-4 bg-green-200 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800">Emerging Opportunities</h4>
                    <p className="text-sm text-green-600 mt-1">Web3 and Mobile Development show high growth potential</p>
                  </div>
                  <div className="p-4 bg-orange-200 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800">Long-term Investment</h4>
                    <p className="text-sm text-orange-600 mt-1">AI/ML skills will be valuable across all tech roles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <div className="grid gap-6">
              {learningPaths.map((path, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        {path.skill}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={path.priority === "Critical" ? "destructive" : "secondary"}>
                          {path.priority} Priority
                        </Badge>
                        <Badge variant="outline">{path.difficulty}</Badge>
                      </div>
                    </div>
                    <CardDescription>
                      Complete in {path.timeline} • {path.difficulty} difficulty
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Learning Path:</h4>
                      <div className="space-y-3">
                        {path.resources.map((resource, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                                {idx + 1}
                              </div>
                              <div>
                                <div className="font-medium">{resource.name}</div>
                                <div className="text-sm text-muted-foreground">{resource.type}</div>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">{resource.duration}</div>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full">Start Learning Path</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SkillGapAnalysis;
