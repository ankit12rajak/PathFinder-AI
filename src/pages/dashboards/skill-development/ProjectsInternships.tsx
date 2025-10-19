import { useState } from "react";
import { Code, Search, Filter, Download, ExternalLink, CheckCircle2, ArrowRight, Rocket, Star, Clock, Users, Building, Sparkles, Brain, Target, Award, FileText, BookOpen, Layers, Activity, Calendar, MapPin, DollarSign, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";

const ProjectsInternships = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const projects = [
    {
      id: 1,
      title: "SportifyHub - Sports Event Management Backend",
      difficulty: "Medium",
      description: "Develop a Spring Boot API for managing sports events, teams, and registrations. Implement role-based access, event scheduling, and notification features. Use PostgreSQL for persistence, Docker for deployment, and Maven for project management.",
      technologies: ["Java", "Springboot", "PostgreSQL", "Docker", "Maven"],
      domains: ["Sports"],
      themes: ["Entrepreneurship", "Education"],
      duration: "3-4 months",
      stipend: "₹15,000 - ₹25,000",
      applicants: 147,
      rating: 4.8,
      logo: "⚽",
      featured: true,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Complete product requirements and specifications for the sports event management system"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "System architecture and high-level component design"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Detailed technical implementation and database schemas"
        }
      }
    },
    {
      id: 2,
      title: "PropEase - Real Estate Listings & Booking API",
      difficulty: "Medium",
      description: "Build a Spring Boot backend for managing real estate property listings, bookings, and user profiles. Implement search functionality, booking system, and payment integration.",
      technologies: ["Java", "Springboot", "MySQL", "Docker", "Maven"],
      domains: ["Real-Estate"],
      themes: ["Startup", "Open-Source"],
      duration: "3-4 months",
      stipend: "₹18,000 - ₹28,000",
      applicants: 203,
      rating: 4.7,
      logo: "🏠",
      featured: true,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Product requirements for real estate platform"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "Architecture design for property management system"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Implementation details and API specifications"
        }
      }
    },
    {
      id: 3,
      title: "Enerlytics - Energy Consumption Analytics Service",
      difficulty: "Medium",
      description: "Create a Spring Boot microservice for collecting and analyzing energy consumption data from smart meters. Build interactive dashboards and generate insights.",
      technologies: ["Java", "Springboot", "PostgreSQL", "Docker", "Maven"],
      domains: ["Energy"],
      themes: ["Research", "Futuristic"],
      duration: "4-5 months",
      stipend: "₹20,000 - ₹30,000",
      applicants: 89,
      rating: 4.9,
      logo: "⚡",
      featured: true,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Requirements for energy analytics platform"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "Microservices architecture for data processing"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Data models and analytics algorithms"
        }
      }
    },
    {
      id: 4,
      title: "CloudScale - Multi-Cloud Infrastructure Manager",
      difficulty: "Hard",
      description: "Build a comprehensive cloud infrastructure management platform supporting AWS, Azure, and GCP. Implement resource provisioning, monitoring, and cost optimization.",
      technologies: ["Python", "FastAPI", "Terraform", "Kubernetes", "PostgreSQL"],
      domains: ["Cloud", "Agriculture"],
      themes: ["Startup", "Education"],
      duration: "5-6 months",
      stipend: "₹25,000 - ₹40,000",
      applicants: 156,
      rating: 4.8,
      logo: "☁️",
      featured: false,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Multi-cloud platform requirements"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "Cloud-native architecture design"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Infrastructure as code implementation"
        }
      }
    },
    {
      id: 5,
      title: "MediConnect - Healthcare Appointment System",
      difficulty: "Easy",
      description: "Develop a patient-doctor appointment booking system with real-time availability, notifications, and medical records management.",
      technologies: ["Node.js", "Express", "MongoDB", "React", "Socket.io"],
      domains: ["Healthcare"],
      themes: ["Open-Source", "Education"],
      duration: "2-3 months",
      stipend: "₹12,000 - ₹20,000",
      applicants: 312,
      rating: 4.6,
      logo: "🏥",
      featured: false,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Healthcare appointment system requirements"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "System design for appointment management"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Database schema and API endpoints"
        }
      }
    },
    {
      id: 6,
      title: "EduLearn - Online Learning Platform",
      difficulty: "Medium",
      description: "Create an interactive online learning platform with course management, video streaming, quizzes, and progress tracking.",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Redis"],
      domains: ["Education"],
      themes: ["Education", "Startup"],
      duration: "4-5 months",
      stipend: "₹18,000 - ₹28,000",
      applicants: 245,
      rating: 4.7,
      logo: "📚",
      featured: false,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "E-learning platform specifications"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "Platform architecture and components"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Implementation details and integrations"
        }
      }
    },
    {
      id: 7,
      title: "FarmTech - Agricultural IoT Platform",
      difficulty: "Hard",
      description: "Build an IoT platform for smart farming with sensor data collection, weather integration, crop monitoring, and automated irrigation control.",
      technologies: ["Python", "Django", "PostgreSQL", "MQTT", "React"],
      domains: ["Agriculture"],
      themes: ["Research", "Futuristic"],
      duration: "5-6 months",
      stipend: "₹22,000 - ₹35,000",
      applicants: 98,
      rating: 4.9,
      logo: "🌾",
      featured: false,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Smart farming platform requirements"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "IoT architecture and data pipeline"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Sensor integration and automation logic"
        }
      }
    },
    {
      id: 8,
      title: "LegalEase - Legal Document Automation",
      difficulty: "Medium",
      description: "Develop a platform for automating legal document generation, contract management, and compliance tracking with AI-powered suggestions.",
      technologies: ["Python", "FastAPI", "PostgreSQL", "React", "OpenAI"],
      domains: ["Legal"],
      themes: ["Entrepreneurship", "Startup"],
      duration: "3-4 months",
      stipend: "₹20,000 - ₹30,000",
      applicants: 134,
      rating: 4.8,
      logo: "⚖️",
      featured: false,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Legal automation platform requirements"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "Document processing architecture"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "AI integration and template engine"
        }
      }
    },
    {
      id: 9,
      title: "TransitTrack - Transportation Management System",
      difficulty: "Easy",
      description: "Build a fleet management system for tracking vehicles, optimizing routes, and managing deliveries with real-time GPS integration.",
      technologies: ["Node.js", "Express", "MongoDB", "React", "Google Maps API"],
      domains: ["Transportation"],
      themes: ["Startup", "Open-Source"],
      duration: "2-3 months",
      stipend: "₹15,000 - ₹22,000",
      applicants: 187,
      rating: 4.5,
      logo: "🚚",
      featured: false,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Fleet management system requirements"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "Real-time tracking architecture"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Route optimization algorithms"
        }
      }
    },
    {
      id: 10,
      title: "GovConnect - Government Services Portal",
      difficulty: "Medium",
      description: "Create a citizen services portal for government applications, document verification, and service request tracking with secure authentication.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "React", "OAuth2"],
      domains: ["Government"],
      themes: ["Open-Source", "Research"],
      duration: "4-5 months",
      stipend: "₹18,000 - ₹28,000",
      applicants: 165,
      rating: 4.7,
      logo: "🏛️",
      featured: false,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Government portal requirements"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "Secure portal architecture"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Authentication and workflow implementation"
        }
      }
    },
    {
      id: 11,
      title: "CharityChain - Non-Profit Donation Platform",
      difficulty: "Easy",
      description: "Build a transparent donation platform for non-profits with campaign management, donor tracking, and impact reporting.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      domains: ["Non-Profit"],
      themes: ["Open-Source", "Education"],
      duration: "2-3 months",
      stipend: "₹12,000 - ₹18,000",
      applicants: 221,
      rating: 4.6,
      logo: "❤️",
      featured: false,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "Donation platform requirements"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "Payment processing architecture"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Campaign and donor management"
        }
      }
    },
    {
      id: 12,
      title: "HRPro - Human Resources Management System",
      difficulty: "Medium",
      description: "Develop a comprehensive HR management system with employee onboarding, attendance tracking, payroll, and performance reviews.",
      technologies: ["Python", "Django", "PostgreSQL", "React", "Celery"],
      domains: ["Human-Resources"],
      themes: ["Startup", "Business"],
      duration: "4-5 months",
      stipend: "₹20,000 - ₹30,000",
      applicants: 178,
      rating: 4.8,
      logo: "👥",
      featured: false,
      documents: {
        prd: {
          title: "PRD Document",
          subtitle: "Product Requirements",
          description: "HR management system requirements"
        },
        hld: {
          title: "HLD Document",
          subtitle: "High Level Design",
          description: "HRMS architecture and modules"
        },
        lld: {
          title: "LLD Document",
          subtitle: "Low Level Design",
          description: "Payroll calculation and workflows"
        }
      }
    }
  ];

  const difficultyLevels = ["Easy", "Medium", "Hard"];
  const themes = ["Open-Source", "Research", "Startup", "Futuristic", "Business", "Education", "Entrepreneurship"];
  const domains = ["Agriculture", "Media", "Government", "Healthcare", "Legal", "Transportation", "Non-Profit", "Human-Resources", "Sports", "Real-Estate", "Energy", "Cloud", "Education"];

  const filteredProjects = projects.filter(project => {
    const matchesDifficulty = selectedDifficulty === "all" || project.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesTheme = selectedTheme === "all" || project.themes.some(t => t.toLowerCase() === selectedTheme.toLowerCase());
    const matchesDomain = selectedDomain === "all" || project.domains.some(d => d.toLowerCase() === selectedDomain.toLowerCase());
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDifficulty && matchesTheme && matchesDomain && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "medium": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "hard": return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const clearAllFilters = () => {
    setSelectedDifficulty("all");
    setSelectedTheme("all");
    setSelectedDomain("all");
    setSearchTerm("");
    setActiveFilters([]);
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handleCloseDetails = () => {
    setShowProjectDetails(false);
    setSelectedProject(null);
  };

  return (
    <DashboardLayout>
      {/* Project Details Modal */}
      {showProjectDetails && selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 rounded-2xl border border-purple-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseDetails}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-white/10 z-10"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Header */}
            <div className="p-8 border-b border-slate-700/50">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{selectedProject.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                    <Badge className={`${getDifficultyColor(selectedProject.difficulty)} border px-3 py-1`}>
                      {selectedProject.difficulty} Difficulty
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed mb-4">{selectedProject.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-200 text-sm">{selectedProject.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 text-sm font-semibold">{selectedProject.stipend}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-200 text-sm">{selectedProject.applicants} applied</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-slate-200 text-sm font-semibold">{selectedProject.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-8 space-y-6">
              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5 text-cyan-400" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <Badge key={index} className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Domains & Themes */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-400" />
                    Domains
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.domains.map((domain: string, index: number) => (
                      <Badge key={index} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {domain}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Themes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.themes.map((theme: string, index: number) => (
                      <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documentation */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-emerald-400" />
                  Documentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* PRD Document */}
                  <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30 hover:border-blue-400/50 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{selectedProject.documents.prd.title}</h4>
                          <p className="text-xs text-blue-300">{selectedProject.documents.prd.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-4">{selectedProject.documents.prd.description}</p>
                      <Button size="sm" variant="outline" className="w-full bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>

                  {/* HLD Document */}
                  <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 hover:border-purple-400/50 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Layers className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{selectedProject.documents.hld.title}</h4>
                          <p className="text-xs text-purple-300">{selectedProject.documents.hld.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-4">{selectedProject.documents.hld.description}</p>
                      <Button size="sm" variant="outline" className="w-full bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>

                  {/* LLD Document */}
                  <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/30 hover:border-emerald-400/50 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                          <Code className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{selectedProject.documents.lld.title}</h4>
                          <p className="text-xs text-emerald-300">{selectedProject.documents.lld.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-4">{selectedProject.documents.lld.description}</p>
                      <Button size="sm" variant="outline" className="w-full bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Start Your Learning Journey */}
              <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Start Your Learning Journey</h3>
                    <p className="text-purple-100">Apply now and receive your official offer letter to begin this internship</p>
                  </div>
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 font-semibold">
                    <Rocket className="w-5 h-5 mr-2" />
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Premium Dark Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-8 shadow-2xl border border-purple-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl shadow-lg">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 hover:bg-purple-500/30">
                    <Brain className="w-3 h-3 mr-1" />
                    Launch Your Tech Career With Internships
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
                  Projects & Internships
                </h1>
                <p className="text-slate-300 text-lg">Build real-world projects, Get Experience Letter, and Launch your tech career.</p>

                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-200 text-sm font-medium">Found: {filteredProjects.length} projects</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-slate-200 text-sm font-medium">Official Offer Letters</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-200 text-sm font-medium">Complete Documentation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="border border-slate-700/50 shadow-xl bg-slate-900/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search for your next adventure..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-base bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Filter Options */}
          <Card className="border border-slate-700/50 shadow-xl bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-purple-400" />
                  Filters
                </CardTitle>
                {(selectedDifficulty !== "all" || selectedTheme !== "all" || selectedDomain !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-slate-400 hover:text-white hover:bg-white/10"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Difficulty Levels */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  Difficulty Levels
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedDifficulty === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty("all")}
                    className={selectedDifficulty === "all" 
                      ? "bg-purple-600 hover:bg-purple-700" 
                      : "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50"}
                  >
                    All
                  </Button>
                  {difficultyLevels.map((level) => (
                    <Button
                      key={level}
                      variant={selectedDifficulty === level.toLowerCase() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDifficulty(level.toLowerCase())}
                      className={selectedDifficulty === level.toLowerCase()
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50"}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Themes */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Themes
                </h3>
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Themes</SelectItem>
                    {themes.map((theme) => (
                      <SelectItem key={theme} value={theme.toLowerCase()}>{theme}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Domains */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-400" />
                  Domains
                </h3>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain.toLowerCase()}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Active Filters Display */}
          <Card className="border border-slate-700/50 shadow-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border-purple-500/30">
            <CardHeader className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-b border-purple-500/30">
              <CardTitle className="text-slate-100">Active Filters</CardTitle>
              <CardDescription className="text-slate-400">
                {selectedDifficulty === "all" && selectedTheme === "all" && selectedDomain === "all"
                  ? "No filters applied"
                  : "Currently filtering by:"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {selectedDifficulty === "all" && selectedTheme === "all" && selectedDomain === "all" ? (
                <div className="text-center py-8">
                  <Filter className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">Select filters to narrow down your search</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDifficulty !== "all" && (
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <span className="text-sm text-slate-300">Difficulty: <span className="font-semibold text-white capitalize">{selectedDifficulty}</span></span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDifficulty("all")}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  {selectedTheme !== "all" && (
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <span className="text-sm text-slate-300">Theme: <span className="font-semibold text-white capitalize">{selectedTheme}</span></span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTheme("all")}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  {selectedDomain !== "all" && (
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <span className="text-sm text-slate-300">Domain: <span className="font-semibold text-white capitalize">{selectedDomain}</span></span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDomain("all")}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 border border-slate-700/50 hover:border-purple-500/50 hover:-translate-y-1 bg-slate-900/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{project.logo}</div>
                  <Badge className={`${getDifficultyColor(project.difficulty)} border px-2 py-1 text-xs`}>
                    {project.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-slate-100 group-hover:text-purple-400 transition-colors leading-tight">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm text-slate-400 leading-relaxed mt-2">
                  {project.description.substring(0, 120)}...
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Technologies */}
                <div>
                  <p className="text-xs font-medium mb-2 text-slate-400">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-slate-800/50 text-slate-300 border-slate-700">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-slate-800/50 text-slate-300 border-slate-700">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50 text-center">
                    <div className="text-xs text-slate-400 mb-1">Duration</div>
                    <div className="text-sm font-semibold text-slate-200">{project.duration}</div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 p-2 rounded-lg border border-emerald-500/30 text-center">
                    <div className="text-xs text-emerald-400 mb-1">Stipend</div>
                    <div className="text-sm font-semibold text-emerald-400">{project.stipend.split(' - ')[0]}</div>
                  </div>
                </div>

                {/* Rating and Applicants */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-slate-200 font-medium">{project.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>{project.applicants} applied</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => handleViewDetails(project)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <Card className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="py-16 text-center">
              <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No projects found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your filters or search terms</p>
              <Button onClick={clearAllFilters} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectsInternships;
