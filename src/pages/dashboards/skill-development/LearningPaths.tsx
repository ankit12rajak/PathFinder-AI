import { useState } from "react";
import { BookOpen, Brain, Clock, Award, TrendingUp, PlayCircle, CheckCircle, Star, Target, Code, Database, Palette, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";

const LearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState<string>("frontend");

  const learningPaths = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: Code,
      duration: "6-8 months",
      difficulty: "Beginner to Advanced",
      learners: "15K+",
      rating: 4.8,
      color: "from-blue-500 to-cyan-500",
      skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Next.js"],
      description: "Master modern frontend development with AI-assisted learning"
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: Database,
      duration: "7-9 months",
      difficulty: "Intermediate",
      learners: "12K+",
      rating: 4.7,
      color: "from-green-500 to-emerald-500",
      skills: ["Node.js", "Python", "Databases", "APIs", "Cloud"],
      description: "Build scalable backend systems with modern technologies"
    },
    {
      id: "data-science",
      title: "Data Science & AI",
      icon: BarChart3,
      duration: "8-10 months",
      difficulty: "Intermediate to Advanced",
      learners: "10K+",
      rating: 4.9,
      color: "from-purple-500 to-pink-500",
      skills: ["Python", "Machine Learning", "Statistics", "Deep Learning", "MLOps"],
      description: "Become an AI expert with hands-on projects and industry mentorship"
    },
    {
      id: "design",
      title: "UI/UX Design",
      icon: Palette,
      duration: "5-6 months",
      difficulty: "Beginner to Advanced",
      learners: "8K+",
      rating: 4.6,
      color: "from-orange-500 to-red-500",
      skills: ["Design Thinking", "Figma", "Prototyping", "User Research", "Design Systems"],
      description: "Create beautiful and user-friendly interfaces with design thinking"
    }
  ];

  const pathDetails = {
    frontend: {
      modules: [
        {
          title: "HTML & CSS Fundamentals",
          duration: "3-4 weeks",
          lessons: 24,
          projects: 3,
          status: "completed",
          aiFeatures: ["Code review", "Real-time debugging", "Performance optimization"]
        },
        {
          title: "JavaScript Mastery",
          duration: "4-5 weeks",
          lessons: 32,
          projects: 5,
          status: "in-progress",
          aiFeatures: ["Algorithm explanation", "Code generation", "Error detection"]
        },
        {
          title: "React Development",
          duration: "6-7 weeks",
          lessons: 38,
          projects: 7,
          status: "locked",
          aiFeatures: ["Component suggestions", "State management", "Performance tuning"]
        },
        {
          title: "Advanced React & TypeScript",
          duration: "5-6 weeks",
          lessons: 28,
          projects: 4,
          status: "locked",
          aiFeatures: ["Type inference", "Refactoring assistance", "Testing automation"]
        },
        {
          title: "Next.js & Deployment",
          duration: "4-5 weeks",
          lessons: 22,
          projects: 3,
          status: "locked",
          aiFeatures: ["SEO optimization", "Performance monitoring", "Deployment automation"]
        }
      ],
      aiMentor: {
        personalizedFeedback: true,
        codeReview: true,
        learningPath: true,
        projectSuggestions: true
      }
    }
  };

  const aiFeatures = [
    {
      title: "AI Learning Assistant",
      description: "24/7 personalized help with code explanations and debugging",
      icon: Brain,
      active: true
    },
    {
      title: "Adaptive Learning Path",
      description: "AI adjusts your learning path based on progress and preferences",
      icon: Target,
      active: true
    },
    {
      title: "Smart Code Review",
      description: "AI-powered code review with suggestions for improvement",
      icon: CheckCircle,
      active: true
    },
    {
      title: "Project Recommendations",
      description: "AI suggests projects based on your skill level and interests",
      icon: Star,
      active: false
    }
  ];

  const achievements = [
    { title: "First Steps", description: "Complete your first lesson", progress: 100 },
    { title: "Code Warrior", description: "Submit 10 projects", progress: 60 },
    { title: "Mentor", description: "Help 5 other learners", progress: 20 },
    { title: "Expert", description: "Complete advanced track", progress: 0 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-600">Learning Paths</h1>
            <p className="text-gray-600 mt-2">AI-powered personalized learning journeys for your career goals</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Brain className="w-4 h-4 mr-1" />
              AI Powered
            </Badge>
            <Button>
              <PlayCircle className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </div>

        {/* AI Features Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Learning Features
            </CardTitle>
            <CardDescription>Powered by advanced AI to accelerate your learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <feature.icon className="w-5 h-5 text-purple-600" />
                    <Badge variant={feature.active ? "default" : "secondary"} className="text-xs">
                      {feature.active ? "Active" : "Coming Soon"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 text-gray-800">{feature.title}</h3>
                  <p className="text-xs text-gray-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningPaths.map((path) => (
            <Card key={path.id} className={`cursor-pointer transition-all duration-200 hover:scale-105 ${selectedPath === path.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedPath(path.id)}>
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${path.color} flex items-center justify-center mb-3`}>
                  <path.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{path.title}</CardTitle>
                <CardDescription className="text-sm">{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{path.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty:</span>
                  <Badge variant="secondary" className="text-xs">{path.difficulty}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Learners:</span>
                  <span className="font-medium">{path.learners}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{path.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {path.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                  {path.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{path.skills.length - 3}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Path Details */}
        {selectedPath === "frontend" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Frontend Development Learning Path
              </CardTitle>
              <CardDescription>Complete curriculum with AI-powered assistance and real-world projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="modules" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="modules">Modules</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="modules" className="mt-6">
                  <div className="space-y-4">
                    {pathDetails.frontend.modules.map((module, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              module.status === 'completed' ? 'bg-green-500 text-white' :
                              module.status === 'in-progress' ? 'bg-blue-500 text-white' :
                              'bg-gray-300 text-gray-600'
                            }`}>
                              {module.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-sm font-bold">{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{module.title}</h3>
                              <p className="text-sm text-gray-700">{module.duration} • {module.lessons} lessons • {module.projects} projects</p>
                            </div>
                          </div>
                          <Badge variant={module.status === 'completed' ? 'default' : module.status === 'in-progress' ? 'secondary' : 'outline'}>
                            {module.status === 'completed' ? 'Completed' : module.status === 'in-progress' ? 'In Progress' : 'Locked'}
                          </Badge>
                        </div>
                        
                        <div className="ml-11">
                          <div className="mb-3">
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Brain className="w-4 h-4 text-purple-600" />
                              AI Features in this module:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {module.aiFeatures.map((feature, featureIndex) => (
                                <Badge key={featureIndex} variant="outline" className="text-xs bg-gray-700 border-gray-700">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {module.status !== 'locked' && (
                            <Button size="sm" variant={module.status === 'completed' ? 'outline' : 'default'}>
                              {module.status === 'completed' ? 'Review' : 'Continue'}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Overall Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Course Completion</span>
                              <span>32%</span>
                            </div>
                            <Progress value={32} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Projects Submitted</span>
                              <span>3 of 22</span>
                            </div>
                            <Progress value={14} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>AI Assistance Used</span>
                              <span>45 times</span>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Learning Analytics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Time Spent Learning</span>
                            <span className="font-medium">42 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Average Session</span>
                            <span className="font-medium">1.5 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Streak</span>
                            <span className="font-medium">7 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">AI Recommendations</span>
                            <span className="font-medium">12 followed</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="achievements" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className={`w-6 h-6 ${achievement.progress === 100 ? 'text-yellow-500' : 'text-gray-400'}`} />
                          <div className="flex-1">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="ml-9">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LearningPaths;
