import { useState } from "react";
import { Briefcase, MapPin, Clock, DollarSign, Users, Star, Filter, Search, BookOpen, Code, Award, Target, Calendar, Building, ExternalLink, Heart, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";

const ProjectsInternships = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("opportunities");

  const opportunities = [
    {
      id: 1,
      title: "AI-Powered E-commerce Recommendation System",
      company: "TechCorp Solutions",
      type: "Project",
      level: "Intermediate",
      duration: "3-4 months",
      stipend: "₹25,000",
      location: "Remote",
      description: "Build a machine learning recommendation engine for an e-commerce platform using collaborative filtering and deep learning techniques.",
      skills: ["Python", "TensorFlow", "Pandas", "SQL", "Machine Learning"],
      requirements: ["Python experience", "Basic ML knowledge", "Portfolio of projects"],
      mentorship: true,
      rating: 4.8,
      applicants: 45,
      deadline: "5 days",
      logo: "🚀",
      featured: true,
      category: "AI/ML",
      aiMatch: 95
    },
    {
      id: 2,
      title: "Full-Stack Developer Internship",
      company: "StartupXYZ",
      type: "Internship",
      level: "Beginner",
      duration: "6 months",
      stipend: "₹18,000/month",
      location: "Bangalore",
      description: "Join our development team to build modern web applications using React, Node.js, and cloud technologies.",
      skills: ["React", "Node.js", "JavaScript", "MongoDB", "AWS"],
      requirements: ["HTML/CSS/JS proficiency", "React basics", "Git knowledge"],
      mentorship: true,
      rating: 4.6,
      applicants: 120,
      deadline: "2 weeks",
      logo: "💻",
      featured: false,
      category: "Web Development",
      aiMatch: 87
    },
    {
      id: 3,
      title: "Mobile App Development Project",
      company: "InnovateLabs",
      type: "Project",
      level: "Advanced",
      duration: "4-5 months",
      stipend: "₹40,000",
      location: "Remote",
      description: "Develop a cross-platform mobile application for healthcare management with real-time data synchronization.",
      skills: ["React Native", "Firebase", "TypeScript", "REST APIs", "Redux"],
      requirements: ["Mobile development experience", "React Native proficiency", "API integration skills"],
      mentorship: true,
      rating: 4.9,
      applicants: 28,
      deadline: "1 week",
      logo: "📱",
      featured: true,
      category: "Mobile Development",
      aiMatch: 78
    },
    {
      id: 4,
      title: "Data Analytics Internship",
      company: "DataDriven Inc",
      type: "Internship",
      level: "Intermediate",
      duration: "3 months",
      stipend: "₹20,000/month",
      location: "Mumbai",
      description: "Analyze large datasets to extract business insights and create interactive dashboards for decision-making.",
      skills: ["Python", "Tableau", "SQL", "Statistics", "Excel"],
      requirements: ["Data analysis experience", "Python/R knowledge", "SQL proficiency"],
      mentorship: true,
      rating: 4.7,
      applicants: 67,
      deadline: "3 days",
      logo: "📊",
      featured: false,
      category: "Data Science",
      aiMatch: 92
    },
    {
      id: 5,
      title: "Cybersecurity Research Project",
      company: "SecureNet Labs",
      type: "Project",
      level: "Advanced",
      duration: "6 months",
      stipend: "₹35,000",
      location: "Remote",
      description: "Research and develop security solutions for IoT devices, focusing on vulnerability assessment and penetration testing.",
      skills: ["Ethical Hacking", "Network Security", "Python", "Linux", "Vulnerability Assessment"],
      requirements: ["Security certifications preferred", "Penetration testing experience", "Python scripting"],
      mentorship: true,
      rating: 4.8,
      applicants: 23,
      deadline: "1 week",
      logo: "🔒",
      featured: true,
      category: "Cybersecurity",
      aiMatch: 85
    },
    {
      id: 6,
      title: "UI/UX Design Challenge",
      company: "DesignCo",
      type: "Challenge",
      level: "Beginner",
      duration: "1 month",
      stipend: "Portfolio + Certificate",
      location: "Remote",
      description: "Design a complete user experience for a fintech application, from user research to high-fidelity prototypes.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
      requirements: ["Design portfolio", "Figma proficiency", "Basic UX knowledge"],
      mentorship: true,
      rating: 4.5,
      applicants: 89,
      deadline: "4 days",
      logo: "🎨",
      featured: false,
      category: "Design",
      aiMatch: 73
    }
  ];

  const mentorshipPrograms = [
    {
      id: 1,
      title: "AI/ML Mentorship Program",
      mentor: "Dr. Priya Sharma",
      expertise: "Senior AI Engineer at Google",
      duration: "3 months",
      sessions: "Weekly 1-hour sessions",
      focus: ["Machine Learning", "Deep Learning", "Career Guidance"],
      rating: 4.9,
      mentees: 12,
      price: "₹15,000",
      description: "Comprehensive mentorship covering AI fundamentals to advanced topics with hands-on projects"
    },
    {
      id: 2,
      title: "Full-Stack Development Mentorship",
      mentor: "Rahul Kumar",
      expertise: "Tech Lead at Microsoft",
      duration: "4 months",
      sessions: "Bi-weekly 1.5-hour sessions",
      focus: ["React", "Node.js", "System Design", "Career Growth"],
      rating: 4.8,
      mentees: 8,
      price: "₹12,000",
      description: "End-to-end web development mentorship with real-world project experience"
    },
    {
      id: 3,
      title: "Product Management Mentorship",
      mentor: "Anita Desai",
      expertise: "Senior PM at Amazon",
      duration: "2 months",
      sessions: "Weekly 45-minute sessions",
      focus: ["Product Strategy", "User Research", "Analytics"],
      rating: 4.7,
      mentees: 6,
      price: "₹18,000",
      description: "Strategic product thinking and execution with industry best practices"
    }
  ];

  const skillBasedProjects = [
    {
      skill: "React Development",
      projects: ["E-commerce Dashboard", "Social Media App", "Task Management Tool"],
      difficulty: "Beginner to Advanced",
      timeCommitment: "2-6 weeks per project",
      outcomes: ["Portfolio projects", "Real-world experience", "Industry connections"]
    },
    {
      skill: "Data Science",
      projects: ["Customer Segmentation", "Predictive Analytics", "NLP Sentiment Analysis"],
      difficulty: "Intermediate to Advanced",
      timeCommitment: "3-8 weeks per project",
      outcomes: ["Data science portfolio", "Industry datasets", "Research publications"]
    },
    {
      skill: "Mobile Development",
      projects: ["Fitness Tracker App", "Food Delivery App", "AR Shopping App"],
      difficulty: "Intermediate to Advanced",
      timeCommitment: "4-10 weeks per project",
      outcomes: ["Published apps", "App store presence", "User feedback"]
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesType = selectedType === "all" || opp.type.toLowerCase() === selectedType.toLowerCase();
    const matchesLevel = selectedLevel === "all" || opp.level.toLowerCase() === selectedLevel.toLowerCase();
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesLevel && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Internship": return <Briefcase className="w-4 h-4" />;
      case "Project": return <Code className="w-4 h-4" />;
      case "Challenge": return <Award className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-600">Projects & Internships</h1>
            <p className="text-gray-600 mt-2">Real-world opportunities to build your portfolio and gain industry experience</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Target className="w-4 h-4 mr-1" />
              AI Matched
            </Badge>
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              My Applications
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search opportunities, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="internship">Internships</SelectItem>
                    <SelectItem value="project">Projects</SelectItem>
                    <SelectItem value="challenge">Challenges</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="skill-projects">Skill Projects</TabsTrigger>
            <TabsTrigger value="my-activity">My Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="mt-6">
            <div className="space-y-6">
              {/* Featured Opportunities */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Featured Opportunities
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredOpportunities.filter(opp => opp.featured).map((opportunity) => (
                    <Card key={opportunity.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{opportunity.logo}</div>
                            <div>
                              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                <Building className="w-3 h-3" />
                                {opportunity.company}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="bg-blue-100 text-blue-700">
                              {opportunity.aiMatch}% Match
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-sm">{opportunity.description}</CardDescription>

                        {/* Key Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(opportunity.type)}
                            <span>{opportunity.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{opportunity.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span>{opportunity.stipend}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{opportunity.location}</span>
                          </div>
                        </div>

                        {/* Level and Rating */}
                        <div className="flex items-center justify-between">
                          <Badge className={getLevelColor(opportunity.level)}>
                            {opportunity.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{opportunity.rating}</span>
                            <span className="text-sm text-gray-500">({opportunity.applicants} applied)</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <p className="text-sm font-medium mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                            {opportunity.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">+{opportunity.skills.length - 4}</Badge>
                            )}
                          </div>
                        </div>

                        {/* Deadline and Actions */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-2 text-sm text-orange-600">
                            <Calendar className="w-4 h-4" />
                            <span>Deadline: {opportunity.deadline}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                            <Button size="sm">Apply Now</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Opportunities */}
              <div>
                <h2 className="text-xl font-semibold mb-4">All Opportunities</h2>
                <div className="space-y-4">
                  {filteredOpportunities.filter(opp => !opp.featured).map((opportunity) => (
                    <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="text-xl">{opportunity.logo}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{opportunity.title}</h3>
                                <Badge variant="outline" className="text-xs">{opportunity.category}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{opportunity.company}</p>
                              <p className="text-sm text-gray-700 mb-3">{opportunity.description}</p>
                              
                              <div className="flex items-center gap-6 text-sm">
                                <span className="flex items-center gap-1">
                                  {getTypeIcon(opportunity.type)}
                                  {opportunity.type}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {opportunity.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  {opportunity.stipend}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {opportunity.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-3">
                            <Badge variant="default" className="bg-purple-100 text-purple-700">
                              {opportunity.aiMatch}% Match
                            </Badge>
                            <Badge className={getLevelColor(opportunity.level)}>
                              {opportunity.level}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Bookmark className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button size="sm">Apply</Button>
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

          <TabsContent value="mentorship" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mentorshipPrograms.map((program) => (
                  <Card key={program.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                      <CardDescription>with {program.mentor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">{program.expertise}</p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{program.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sessions:</span>
                          <span className="font-medium">{program.sessions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mentees:</span>
                          <span className="font-medium">{program.mentees} current</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Focus Areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {program.focus.map((area, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">{area}</Badge>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600">{program.description}</p>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{program.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">{program.price}</span>
                          <Button size="sm">Enroll</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skill-projects" className="mt-6">
            <div className="space-y-6">
              {skillBasedProjects.map((skillProject, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{skillProject.skill}</CardTitle>
                    <CardDescription>Hands-on projects to master {skillProject.skill.toLowerCase()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Available Projects:</h4>
                        <ul className="space-y-2">
                          {skillProject.projects.map((project, projectIndex) => (
                            <li key={projectIndex} className="flex items-center gap-2">
                              <Code className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Project Details:</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Difficulty:</span>
                            <p className="font-medium">{skillProject.difficulty}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Time Commitment:</span>
                            <p className="font-medium">{skillProject.timeCommitment}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Expected Outcomes:</h4>
                        <ul className="space-y-1">
                          {skillProject.outcomes.map((outcome, outcomeIndex) => (
                            <li key={outcomeIndex} className="flex items-center gap-2">
                              <Award className="w-3 h-3 text-green-500" />
                              <span className="text-sm">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button>
                        <Target className="w-4 h-4 mr-2" />
                        Start Projects
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-activity" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    My Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-blue-400">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">AI Recommendation System</h4>
                        <Badge variant="secondary">Under Review</Badge>
                      </div>
                      <p className="text-sm text-gray-600">TechCorp Solutions • Applied 3 days ago</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-green-400">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Frontend Developer Internship</h4>
                        <Badge variant="default" className="bg-green-500">Accepted</Badge>
                      </div>
                      <p className="text-sm text-gray-600">StartupXYZ • Starts next month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Applications Sent</span>
                        <span>12</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Projects Completed</span>
                        <span>3 of 5</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Skill Improvement</span>
                        <span>+45%</span>
                      </div>
                      <Progress value={85} className="h-2" />
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

export default ProjectsInternships;
