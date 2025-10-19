import { useState } from "react";
import { BookOpen, Brain, Clock, TrendingUp, PlayCircle, Star, Target, Code, Database, Palette, BarChart3, Zap, Users, Trophy, ArrowRight, Lock, Play, CheckCircle } from "lucide-react";
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
      title: "Smart Progress Tracking",
      description: "Track your learning journey with intelligent analytics and insights",
      icon: TrendingUp,
      active: true
    },
    {
      title: "Project Recommendations",
      description: "AI suggests projects based on your skill level and interests",
      icon: Star,
      active: false
    }
  ];



  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Premium Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
          <div className="absolute inset-0 opacity-20"></div>
          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
                    <Zap className="w-3 h-3 mr-1" />
                    AI-Powered Learning
                  </Badge>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Learning Paths</h1>
                  <p className="text-slate-300 text-lg max-w-2xl">
                    Accelerate your career with AI-guided learning journeys tailored to your goals and skill level
                  </p>
                </div>
                <div className="flex items-center gap-6 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">45K+ Active Learners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">98% Success Rate</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Continue Learning
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                  View Progress
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Features Grid - Dark Premium Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <Badge
                    variant={feature.active ? "default" : "secondary"}
                    className={feature.active
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-700 text-slate-400 border-slate-600"
                    }
                  >
                    {feature.active ? "Active" : "Coming Soon"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Learning Paths Grid - Dark Theme */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Choose Your Path</h2>
              <p className="text-slate-600 mt-1">Select a learning journey that aligns with your career goals</p>
            </div>
            <Button variant="outline" className="hidden sm:flex border-slate-300 hover:bg-slate-100">
              View All Paths
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card
                key={path.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 ${selectedPath === path.id
                  ? 'ring-2 ring-blue-500 shadow-2xl shadow-blue-500/20'
                  : 'hover:shadow-xl'
                  }`}
                onClick={() => setSelectedPath(path.id)}
              >
                <div className={`h-1 bg-gradient-to-r ${path.color}`}></div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${path.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <path.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-slate-200">{path.rating}</span>
                      </div>
                      <p className="text-xs text-slate-400">{path.learners} learners</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{path.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-700">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="text-xs text-slate-500 uppercase tracking-wide">Duration</span>
                        </div>
                        <p className="font-semibold text-slate-200">{path.duration}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="w-4 h-4 text-slate-500" />
                          <span className="text-xs text-slate-500 uppercase tracking-wide">Level</span>
                        </div>
                        <Badge variant="secondary" className="bg-slate-700 text-slate-200 hover:bg-slate-600 border-slate-600">
                          {path.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Key Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {path.skills.slice(0, 4).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs border-slate-600 text-slate-300 hover:bg-slate-700 bg-slate-800/50"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {path.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-300 bg-slate-800/50">
                            +{path.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                      <Button
                        className={`w-full ${selectedPath === path.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30'
                          : 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500'
                          } text-white transition-all duration-300`}
                      >
                        {selectedPath === path.id ? 'View Details' : 'Select Path'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium Path Details Section - Dark Theme */}
        {(() => {
          const selectedPathObj = learningPaths.find(p => p.id === selectedPath);
          return pathDetails[selectedPath] ? (
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${selectedPathObj?.color}`}></div>
              <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {selectedPathObj?.icon && (
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedPathObj.color} shadow-lg`}>
                        <selectedPathObj.icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-2xl text-white">
                        {selectedPathObj?.title ?? 'Learning Path'} Curriculum
                      </CardTitle>
                      <CardDescription className="text-slate-400 mt-1">
                        Complete curriculum with AI-powered assistance and real-world projects
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Enhanced
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="modules" className="w-full">
                  <div className="px-6 pt-6">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-800 border border-slate-700">
                      <TabsTrigger value="modules" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-400">
                        Modules
                      </TabsTrigger>
                      <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-400">
                        Progress
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="modules" className="mt-0 p-6">
                    <div className="space-y-6">
                      {pathDetails[selectedPath].modules.map((module: any, index: number) => (
                        <Card key={index} className="border border-slate-700 shadow-lg overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 bg-gradient-to-br from-slate-800 to-slate-900">
                          <div className={`h-1 bg-gradient-to-r ${selectedPathObj?.color}`}></div>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${module.status === 'completed' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' :
                                module.status === 'in-progress' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' :
                                  'bg-slate-700 text-slate-400'
                                } group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {module.status === 'completed' ? (
                                  <CheckCircle className="w-6 h-6" />
                                ) : module.status === 'in-progress' ? (
                                  <Play className="w-5 h-5" />
                                ) : (
                                  <Lock className="w-5 h-5" />
                                )}
                              </div>

                              <div className="flex-1 space-y-4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-slate-400">
                                      <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{module.duration}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{module.lessons} lessons</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Code className="w-4 h-4" />
                                        <span>{module.projects} projects</span>
                                      </div>
                                    </div>
                                  </div>
                                  <Badge
                                    className={
                                      module.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                        module.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                          'bg-slate-700 text-slate-400 border-slate-600'
                                    }
                                  >
                                    {module.status === 'completed' ? 'Completed' :
                                      module.status === 'in-progress' ? 'In Progress' : 'Locked'}
                                  </Badge>
                                </div>

                                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                                  <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-purple-400" />
                                    AI-Powered Features
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {module.aiFeatures.map((feature: string, featureIndex: number) => (
                                      <Badge key={featureIndex} variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-300">
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                                  <div className="flex items-center gap-3">
                                    {module.status !== 'locked' && (
                                      <Button
                                        size="sm"
                                        className={module.status === 'completed'
                                          ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30'
                                        }
                                      >
                                        {module.status === 'completed' ? 'Review' : 'Continue'}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                      </Button>
                                    )}
                                  </div>

                                  {module.materials && module.materials.length > 0 && (
                                    <div className="flex gap-2">
                                      {module.materials.slice(0, 3).map((m: any, mi: number) => (
                                        <a
                                          key={mi}
                                          href={m.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                                        >
                                          {m.title}
                                        </a>
                                      ))}
                                      {module.materials.length > 3 && (
                                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                          +{module.materials.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="mt-0 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="border border-slate-700 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
                        <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-slate-700">
                          <CardTitle className="text-lg flex items-center gap-2 text-white">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                            Overall Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                          <div>
                            <div className="flex justify-between text-sm mb-3">
                              <span className="text-slate-400">Course Completion</span>
                              <span className="font-semibold text-white">32%</span>
                            </div>
                            <Progress value={32} className="h-3 bg-slate-700" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-3">
                              <span className="text-slate-400">Projects Submitted</span>
                              <span className="font-semibold text-white">3 of 22</span>
                            </div>
                            <Progress value={14} className="h-3 bg-slate-700" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-3">
                              <span className="text-slate-400">AI Assistance Used</span>
                              <span className="font-semibold text-white">45 times</span>
                            </div>
                            <Progress value={75} className="h-3 bg-slate-700" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-700 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
                        <CardHeader className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-b border-slate-700">
                          <CardTitle className="text-lg flex items-center gap-2 text-white">
                            <BarChart3 className="w-5 h-5 text-emerald-400" />
                            Learning Analytics
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <div className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-sm text-slate-400">Time Spent Learning</span>
                            <span className="font-semibold text-white">42 hours</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-sm text-slate-400">Average Session</span>
                            <span className="font-semibold text-white">1.5 hours</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-slate-700">
                            <span className="text-sm text-slate-400">Current Streak</span>
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">7 days</Badge>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-slate-400">AI Recommendations</span>
                            <span className="font-semibold text-white">12 followed</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>


                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-slate-700 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Details Available</h3>
                <p className="text-slate-400">Select a learning path to view detailed curriculum information.</p>
              </CardContent>
            </Card>
          );
        })()}
      </div>
    </DashboardLayout >
  );
};

export default LearningPaths;