import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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
      featured: true,
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
      featured: true,
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
      featured: true,
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
      featured: false,
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
      featured: false,
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
      featured: false,
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
      featured: false,
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
      featured: false,
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
      featured: false,
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
      featured: false,
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
      featured: false,
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
      featured: false,
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

  const handleApplyNow = (projectId: number) => {
    navigate(`/dashboard/skill-development/projects-internships/${projectId}`);
  };

  return (
    <DashboardLayout>

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

                {/* Duration */}
                <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <div className="flex-1">
                      <div className="text-xs text-slate-400">Duration</div>
                      <div className="text-sm font-semibold text-slate-200">{project.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => handleApplyNow(project.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Apply Now
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
