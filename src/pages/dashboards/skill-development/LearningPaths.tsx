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
      colorDark: "from-blue-700 to-cyan-600",
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
      colorDark: "from-green-700 to-emerald-600",
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
      colorDark: "from-purple-700 to-pink-600",
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
      colorDark: "from-orange-700 to-red-600",
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
          aiFeatures: ["Code review", "Real-time debugging", "Performance optimization"],
          materials: [
            { title: 'MDN HTML Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
            { title: 'CSS Tricks Guide', url: 'https://css-tricks.com/guides/' },
            { title: 'FreeCodeCamp HTML/CSS', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' },
            { title: 'W3Schools HTML', url: 'https://www.w3schools.com/html/' },
            { title: 'Codecademy HTML/CSS', url: 'https://www.codecademy.com/learn/learn-html' }
          ]
        },
        {
          title: "JavaScript Mastery",
          duration: "4-5 weeks",
          lessons: 32,
          projects: 5,
          status: "in-progress",
          aiFeatures: ["Algorithm explanation", "Code generation", "Error detection"],
          materials: [
            { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
            { title: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net/' },
            { title: 'JavaScript.info', url: 'https://javascript.info/' },
            { title: 'FreeCodeCamp JS', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' },
            { title: 'Codecademy JS', url: 'https://www.codecademy.com/learn/introduction-to-javascript' }
          ]
        },
        {
          title: "React Development",
          duration: "6-7 weeks",
          lessons: 38,
          projects: 7,
          status: "locked",
          aiFeatures: ["Component suggestions", "State management", "Performance tuning"],
          materials: [
            { title: 'React Official Docs', url: 'https://react.dev/learn' },
            { title: 'React Tutorial', url: 'https://react.dev/learn/tutorial-tic-tac-toe' },
            { title: 'Scrimba React Course', url: 'https://scrimba.com/learn/learnreact' },
            { title: 'Codecademy React', url: 'https://www.codecademy.com/learn/react-101' },
            { title: 'Egghead React', url: 'https://egghead.io/courses/the-beginner-s-guide-to-react' }
          ]
        },
        {
          title: "Advanced React & TypeScript",
          duration: "5-6 weeks",
          lessons: 28,
          projects: 4,
          status: "locked",
          aiFeatures: ["Type inference", "Refactoring assistance", "Testing automation"],
          materials: [
            { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
            { title: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/' },
            { title: 'Total TypeScript', url: 'https://www.totaltypescript.com/' },
            { title: 'Codecademy TypeScript', url: 'https://www.codecademy.com/learn/learn-typescript' },
            { title: 'Egghead TypeScript', url: 'https://egghead.io/courses/up-and-running-with-typescript' }
          ]
        },
        {
          title: "Next.js & Deployment",
          duration: "4-5 weeks",
          lessons: 22,
          projects: 3,
          status: "locked",
            aiFeatures: ["SEO optimization", "Performance monitoring", "Deployment automation"],
            materials: [
              { title: 'Next.js Docs', url: 'https://nextjs.org/docs' },
              { title: 'Vercel Deployment', url: 'https://vercel.com/docs' },
              { title: 'Next.js Tutorial', url: 'https://nextjs.org/learn' },
              { title: 'Netlify Deployment', url: 'https://docs.netlify.com/' },
              { title: 'Railway Deployment', url: 'https://docs.railway.app/' }
            ]
        }
      ],
      aiMentor: {
        personalizedFeedback: true,
        codeReview: true,
        learningPath: true,
        projectSuggestions: true
      }
    }
    ,
    backend: {
      modules: [
        {
          title: 'Node.js & Express',
          duration: '4-6 weeks',
          lessons: 30,
          projects: 5,
          status: 'in-progress',
          aiFeatures: ['API scaffolding', 'Security checks', 'Performance tips'],
          materials: [
            { title: 'Node.js Guide', url: 'https://nodejs.org/en/docs/guides/' },
            { title: 'Express Docs', url: 'https://expressjs.com/' },
            { title: 'Node.js Tutorial', url: 'https://www.w3schools.com/nodejs/' },
            { title: 'FreeCodeCamp Node.js', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/' },
            { title: 'Codecademy Node.js', url: 'https://www.codecademy.com/learn/learn-node-js' }
          ]
        },
        {
          title: 'Databases & SQL',
          duration: '4-5 weeks',
          lessons: 28,
          projects: 4,
          status: 'locked',
          aiFeatures: ['Query optimization', 'Schema suggestions'],
          materials: [
            { title: 'Postgres Tutorial', url: 'https://www.postgresql.org/docs/' },
            { title: 'SQLBolt', url: 'https://sqlbolt.com/' },
            { title: 'MySQL Tutorial', url: 'https://dev.mysql.com/doc/' },
            { title: 'SQLZoo', url: 'https://sqlzoo.net/' },
            { title: 'Codecademy SQL', url: 'https://www.codecademy.com/learn/learn-sql' }
          ]
        },
        {
          title: 'Authentication & Security',
          duration: '2-3 weeks',
          lessons: 16,
          projects: 2,
          status: 'locked',
          aiFeatures: ['Vulnerability detection', 'Secure defaults'],
          materials: [
            { title: 'OWASP Top Ten', url: 'https://owasp.org/www-project-top-ten/' },
            { title: 'JWT.io', url: 'https://jwt.io/' },
            { title: 'Passport.js Docs', url: 'http://www.passportjs.org/docs/' },
            { title: 'Node.js Security Best Practices', url: 'https://nodejs.org/en/docs/guides/security/' },
            { title: 'Auth0 Docs', url: 'https://auth0.com/docs/' }
          ]
        }
      ],
      aiMentor: { personalizedFeedback: true, codeReview: true }
    },
    'data-science': {
      modules: [
        {
          title: 'Python for Data Science',
          duration: '3-4 weeks',
          lessons: 20,
          projects: 3,
          status: 'completed',
          aiFeatures: ['Data cleaning helpers', 'Visualization suggestions'],
          materials: [
            { title: 'Python Official', url: 'https://docs.python.org/3/tutorial/' },
            { title: 'Pandas Guide', url: 'https://pandas.pydata.org/docs/' },
            { title: 'NumPy Docs', url: 'https://numpy.org/doc/' },
            { title: 'DataCamp Python', url: 'https://www.datacamp.com/courses/intro-to-python-for-data-science' },
            { title: 'Codecademy Python', url: 'https://www.codecademy.com/learn/learn-python-3' }
          ]
        },
        {
          title: 'Machine Learning Foundations',
          duration: '6-8 weeks',
          lessons: 40,
          projects: 6,
          status: 'in-progress',
          aiFeatures: ['Model explainability', 'Hyperparameter tuning'],
          materials: [
            { title: 'Coursera ML (Andrew Ng)', url: 'https://www.coursera.org/learn/machine-learning' },
            { title: 'Scikit-learn', url: 'https://scikit-learn.org/stable/' },
            { title: 'Kaggle Learn ML', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' },
            { title: 'Fast.ai', url: 'https://www.fast.ai/' },
            { title: 'Google ML Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }
          ]
        },
        {
          title: 'Deep Learning & MLOps',
          duration: '6-10 weeks',
          lessons: 50,
          projects: 6,
          status: 'locked',
          aiFeatures: ['Model deployment', 'Serving recommendations'],
          materials: [
            { title: 'TensorFlow Guides', url: 'https://www.tensorflow.org/learn' },
            { title: 'MLOps Guide', url: 'https://ml-ops.org/' },
            { title: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/' },
            { title: 'Hugging Face', url: 'https://huggingface.co/learn' },
            { title: 'Kubeflow Docs', url: 'https://www.kubeflow.org/docs/' }
          ]
        }
      ],
      aiMentor: { personalizedFeedback: true, projectSuggestions: true }
    },
    design: {
      modules: [
        {
          title: 'Design Fundamentals',
          duration: '3-4 weeks',
          lessons: 18,
          projects: 3,
          status: 'completed',
          aiFeatures: ['Layout suggestions', 'Color contrast checks'],
          materials: [
            { title: 'Interaction Design Foundation', url: 'https://www.interaction-design.org/' },
            { title: 'Principles of Design', url: 'https://www.smashingmagazine.com/' },
            { title: 'Canva Design School', url: 'https://www.canva.com/designschool/' },
            { title: 'Adobe XD Tutorials', url: 'https://www.adobe.com/products/xd/learn.html' },
            { title: 'Coursera Graphic Design', url: 'https://www.coursera.org/specializations/google-ux-design' }
          ]
        },
        {
          title: 'Figma & Prototyping',
          duration: '4-5 weeks',
          lessons: 22,
          projects: 4,
          status: 'in-progress',
          aiFeatures: ['Auto-layout helpers', 'Accessibility checks'],
          materials: [
            { title: 'Figma Learn', url: 'https://help.figma.com/hc/en-us' },
            { title: 'Figma Tutorials', url: 'https://www.figma.com/resources/learn-design/' },
            { title: 'ProtoPie', url: 'https://www.protopie.io/' },
            { title: 'InVision', url: 'https://www.invisionapp.com/inside-design/design-resources/' },
            { title: 'Framer', url: 'https://www.framer.com/learn/' }
          ]
        },
        {
          title: 'User Research & Testing',
          duration: '3-4 weeks',
          lessons: 16,
          projects: 2,
          status: 'locked',
          aiFeatures: ['Persona generation', 'Test script suggestions'],
          materials: [
            { title: 'Usability.gov', url: 'https://www.usability.gov/' },
            { title: 'NNGroup UX Research', url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/' },
            { title: 'UserTesting', url: 'https://www.usertesting.com/' },
            { title: 'Optimal Workshop', url: 'https://www.optimalworkshop.com/' },
            { title: 'Maze Design', url: 'https://maze.co/' }
          ]
        }
      ],
      aiMentor: { personalizedFeedback: true, projectSuggestions: true }
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
            <h1 className="text-3xl font-bold text-gray-900">Learning Paths</h1>
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
                <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <feature.icon className="w-5 h-5 text-white" />
                    <Badge variant={feature.active ? "default" : "secondary"} className="text-xs bg-white/10 border-white/20 text-white">
                      {feature.active ? "Active" : "Coming Soon"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-white/90">{feature.description}</p>
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

        {/* Selected Path Details (dynamic for each learning path) */}
        {(() => {
          const selectedPathObj = learningPaths.find(p => p.id === selectedPath);
          return pathDetails[selectedPath] ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* show matching icon if possible */}
                {selectedPathObj?.icon && (
                  <selectedPathObj.icon className="w-5 h-5 text-white" />
                )}
                <span className="text-white">{selectedPathObj?.title ?? 'Learning Path'} Details</span>
              </CardTitle>
              <CardDescription className="text-white/80">Complete curriculum with AI-powered assistance and real-world projects</CardDescription>
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
                    {pathDetails[selectedPath].modules.map((module: any, index: number) => (
                      <div key={index} className={`p-4 rounded-lg bg-gradient-to-r ${selectedPathObj?.colorDark ?? 'from-gray-700 to-slate-700'} text-white`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              module.status === 'completed' ? 'bg-green-500 text-white' :
                              module.status === 'in-progress' ? 'bg-yellow-500 text-white' :
                              'bg-white/20 text-white'
                            }`}>
                              {module.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-sm font-bold">{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{module.title}</h3>
                              <p className="text-sm text-white/80">{module.duration} • {module.lessons} lessons • {module.projects} projects</p>
                            </div>
                          </div>
                          <Badge className="text-xs bg-white/10 border-white/20 text-white">
                            {module.status === 'completed' ? 'Completed' : module.status === 'in-progress' ? 'In Progress' : 'Locked'}
                          </Badge>
                        </div>
                        
                        <div className="ml-11">
                          <div className="mb-3">
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                              <Brain className="w-4 h-4 text-white" />
                              AI Features in this module:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {module.aiFeatures.map((feature: string, featureIndex: number) => (
                                <Badge key={featureIndex} variant="outline" className="text-xs bg-white/10 border-white/20 text-white">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {module.status !== 'locked' && (
                              <Button size="sm" variant={module.status === 'completed' ? 'outline' : 'default'}>
                                {module.status === 'completed' ? 'Review' : 'Continue'}
                              </Button>
                            )}

                            {/* materials / external links */}
                            {module.materials && module.materials.length > 0 && (
                              <div className="flex gap-2">
                                {module.materials.map((m: any, mi: number) => (
                                  <a key={mi} href={m.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs px-3 py-1 rounded bg-white/10 border border-white/20 text-white">
                                    {m.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
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
                      <div key={index} className="p-4 rounded-lg bg-white/5">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className={`w-6 h-6 ${achievement.progress === 100 ? 'text-yellow-500' : 'text-gray-400'}`} />
                          <div className="flex-1">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-gray-400">{achievement.description}</p>
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
        ) : (
          <Card>
            <CardContent>
              <p>No details available for this path yet.</p>
            </CardContent>
          </Card>
        );
        })()}
      </div>
    </DashboardLayout>
  );
};

export default LearningPaths;