import { useState } from "react";
import { FileText, Download, Upload, Bot, CheckCircle, AlertCircle, Target, Zap, Eye, Edit, Share2, Star, TrendingUp, Award, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardLayout from "@/components/DashboardLayout";

const PlacementKit = () => {
  const [resumeUploaded, setResumeUploaded] = useState<boolean>(true);
  const [atsScore, setAtsScore] = useState<number>(78);

  const placementServices = [
    {
      id: "ats-scanner",
      title: "ATS Resume Scanner",
      description: "AI-powered ATS compatibility analysis with optimization suggestions",
      icon: Bot,
      color: "from-blue-500 to-purple-500",
      features: ["ATS Score", "Keyword Optimization", "Format Analysis", "Industry Matching"],
      status: "Active",
      score: 78
    },
    {
      id: "resume-builder",
      title: "AI Resume Builder",
      description: "Professional resume creation with industry-specific templates",
      icon: FileText,
      color: "from-green-500 to-teal-500",
      features: ["Smart Templates", "Content Suggestions", "Real-time Preview", "Export Options"],
      status: "Available",
      score: null
    },
    {
      id: "cover-letter",
      title: "Cover Letter Generator",
      description: "Personalized cover letters tailored to job descriptions",
      icon: Edit,
      color: "from-orange-500 to-red-500",
      features: ["Job Matching", "Company Research", "Tone Adjustment", "Multiple Versions"],
      status: "Premium",
      score: null
    },
    {
      id: "portfolio",
      title: "Portfolio Builder",
      description: "Create stunning portfolios to showcase your projects and skills",
      icon: Eye,
      color: "from-purple-500 to-pink-500",
      features: ["Responsive Design", "Project Showcase", "Skills Display", "Contact Integration"],
      status: "Available",
      score: null
    }
  ];

  const resumeAnalysis = {
    atsScore: 78,
    strengths: [
      "Strong technical skills section",
      "Quantified achievements",
      "Relevant work experience",
      "ATS-friendly format"
    ],
    improvements: [
      "Add more industry keywords",
      "Include certifications section",
      "Optimize work experience descriptions",
      "Add projects section"
    ],
    keywords: {
      found: 15,
      recommended: 25,
      missing: ["React.js", "Node.js", "Agile", "CI/CD", "Docker"]
    },
    sections: {
      contact: { score: 95, status: "excellent" },
      summary: { score: 70, status: "good" },
      experience: { score: 85, status: "excellent" },
      education: { score: 90, status: "excellent" },
      skills: { score: 60, status: "needs-improvement" },
      projects: { score: 0, status: "missing" }
    }
  };

  const jobMatchingResults = [
    {
      company: "Google",
      position: "Frontend Developer",
      match: 92,
      location: "Bangalore",
      salary: "₹15-25L",
      requirements: ["React", "JavaScript", "TypeScript", "Node.js"],
      missingSkills: ["GraphQL"],
      status: "Highly Recommended"
    },
    {
      company: "Microsoft",
      position: "Software Engineer",
      match: 88,
      location: "Hyderabad",
      salary: "₹12-20L",
      requirements: ["JavaScript", "C#", ".NET", "Azure"],
      missingSkills: ["C#", ".NET"],
      status: "Good Match"
    },
    {
      company: "Amazon",
      position: "Full Stack Developer",
      match: 85,
      location: "Chennai",
      salary: "₹18-28L",
      requirements: ["React", "Python", "AWS", "Docker"],
      missingSkills: ["Python", "AWS"],
      status: "Consider"
    }
  ];

  const portfolioTemplates = [
    {
      id: "developer",
      name: "Developer Portfolio",
      description: "Perfect for software developers and engineers",
      preview: "🖥️",
      features: ["Project showcase", "GitHub integration", "Tech stack display", "Blog section"],
      suitable: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
    },
    {
      id: "designer",
      name: "Designer Portfolio",
      description: "Showcase your design work and creative projects",
      preview: "🎨",
      features: ["Image gallery", "Case studies", "Design process", "Client testimonials"],
      suitable: ["UI/UX Designer", "Graphic Designer", "Product Designer"]
    },
    {
      id: "data-scientist",
      name: "Data Science Portfolio",
      description: "Highlight your data analysis and ML projects",
      preview: "📊",
      features: ["Project notebooks", "Data visualizations", "Model demos", "Research papers"],
      suitable: ["Data Scientist", "ML Engineer", "Data Analyst"]
    }
  ];

  const applicationTracker = [
    {
      company: "Google",
      position: "Frontend Developer",
      status: "Interview Scheduled",
      appliedDate: "2024-08-20",
      lastUpdate: "2024-08-22",
      stage: "Technical Round",
      nextAction: "Prepare for coding interview"
    },
    {
      company: "Microsoft",
      position: "Software Engineer",
      status: "Under Review",
      appliedDate: "2024-08-18",
      lastUpdate: "2024-08-21",
      stage: "Resume Review",
      nextAction: "Wait for response"
    },
    {
      company: "Amazon",
      position: "Full Stack Developer",
      status: "Applied",
      appliedDate: "2024-08-15",
      lastUpdate: "2024-08-15",
      stage: "Application Submitted",
      nextAction: "Follow up if no response in 2 weeks"
    }
  ];

  const aiInsights = [
    {
      type: "Resume Optimization",
      insight: "Adding 'React.js' and 'Node.js' keywords could increase your ATS score by 12%",
      priority: "High",
      action: "Update resume"
    },
    {
      type: "Job Matching",
      insight: "You're a 95% match for Frontend Developer roles at tech startups",
      priority: "Medium",
      action: "Apply to startups"
    },
    {
      type: "Skill Gap",
      insight: "Learning Docker would make you eligible for 45% more positions",
      priority: "Medium",
      action: "Start Docker course"
    },
    {
      type: "Market Trend",
      insight: "TypeScript demand increased by 40% in your target companies",
      priority: "High",
      action: "Strengthen TypeScript skills"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-100 text-green-700";
      case "good": return "bg-yellow-100 text-yellow-700";
      case "needs-improvement": return "bg-orange-100 text-orange-700";
      case "missing": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return "bg-green-100 text-green-700";
    if (match >= 80) return "bg-yellow-100 text-yellow-700";
    return "bg-orange-100 text-orange-700";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Placement Kit</h1>
            <p className="text-gray-600 mt-2">Complete toolkit for job placement with AI-powered ATS scanning and optimization</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Bot className="w-4 h-4 mr-1" />
              ATS Optimized
            </Badge>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download Kit
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Bot className="w-8 h-8 text-blue-500" />
                <div>
                  <p className={`text-2xl font-bold ${getScoreColor(atsScore)}`}>{atsScore}%</p>
                  <p className="text-sm text-gray-600">ATS Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-gray-600">Job Matches</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600">Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">+15%</p>
                  <p className="text-sm text-gray-600">Profile Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {placementServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-3`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription className="text-sm">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {service.score && (
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current Score</span>
                      <span className={`font-bold ${getScoreColor(service.score)}`}>{service.score}%</span>
                    </div>
                    <Progress value={service.score} className="h-2" />
                  </div>
                )}

                <Badge variant={service.status === "Premium" ? "default" : "secondary"} className="w-full justify-center">
                  {service.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="ats-scanner" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="ats-scanner">ATS Scanner</TabsTrigger>
            <TabsTrigger value="job-matching">Job Matching</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="ats-scanner" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ATS Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    ATS Analysis Results
                  </CardTitle>
                  <CardDescription>AI-powered resume compatibility analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(resumeAnalysis.atsScore)}`}>
                      {resumeAnalysis.atsScore}%
                    </div>
                    <p className="text-gray-600">ATS Compatibility Score</p>
                    <Badge className="mt-2" variant={resumeAnalysis.atsScore >= 80 ? "default" : "secondary"}>
                      {resumeAnalysis.atsScore >= 80 ? "Excellent" : resumeAnalysis.atsScore >= 60 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Strengths:</h4>
                    {resumeAnalysis.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-orange-700">Improvements:</h4>
                    {resumeAnalysis.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span>{improvement}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Resume
                  </Button>
                </CardContent>
              </Card>

              {/* Section Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Section-wise Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of each resume section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(resumeAnalysis.sections).map(([section, data]) => (
                    <div key={section} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">{section.replace('-', ' ')}</span>
                        <Badge className={getStatusColor(data.status)} variant="outline">
                          {data.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={data.score} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{data.score}%</span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Keyword Analysis:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Found:</span>
                        <p className="font-medium">{resumeAnalysis.keywords.found}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Recommended:</span>
                        <p className="font-medium">{resumeAnalysis.keywords.recommended}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <span className="text-sm font-medium text-red-700">Missing Keywords:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {resumeAnalysis.keywords.missing.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-red-200 text-red-700">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="job-matching" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">AI-Powered Job Matching</h2>
                <Button>
                  <Zap className="w-4 h-4 mr-2" />
                  Find More Matches
                </Button>
              </div>

              <div className="space-y-4">
                {jobMatchingResults.map((job, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{job.company}</h3>
                            <Badge className={getMatchColor(job.match)}>
                              {job.match}% Match
                            </Badge>
                          </div>
                          
                          <p className="text-gray-900 font-medium mb-1">{job.position}</p>
                          <p className="text-sm text-gray-600 mb-3">{job.location} • {job.salary}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
                              <div className="flex flex-wrap gap-1">
                                {job.requirements.map((skill, skillIndex) => (
                                  <Badge key={skillIndex} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            {job.missingSkills.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2 text-orange-700">Missing Skills:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {job.missingSkills.map((skill, skillIndex) => (
                                    <Badge key={skillIndex} variant="outline" className="text-xs border-orange-200 text-orange-700">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <Badge variant="outline" className="mb-3">
                            {job.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm">
                            Apply Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Portfolio Builder</h2>
                <Button>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Current Portfolio
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {portfolioTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="text-6xl mb-4">{template.preview}</div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {template.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Suitable for:</h4>
                        <div className="flex flex-wrap gap-1">
                          {template.suitable.map((role, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Portfolio Editor */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Portfolio Setup</CardTitle>
                  <CardDescription>Get started with your portfolio in minutes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-title">Portfolio Title</Label>
                      <Input id="portfolio-title" placeholder="Your Name - Portfolio" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-tagline">Professional Tagline</Label>
                      <Input id="portfolio-tagline" placeholder="Frontend Developer & UI/UX Enthusiast" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio-bio">Professional Bio</Label>
                    <Textarea 
                      id="portfolio-bio" 
                      placeholder="Write a brief description about yourself, your skills, and experience..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Application Tracker</h2>
                <Button>
                  <Briefcase className="w-4 h-4 mr-2" />
                  Add New Application
                </Button>
              </div>

              <div className="space-y-4">
                {applicationTracker.map((application, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{application.company}</h3>
                            <Badge variant={
                              application.status === "Interview Scheduled" ? "default" :
                              application.status === "Under Review" ? "secondary" : "outline"
                            }>
                              {application.status}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-900 font-medium mb-1">{application.position}</p>
                          <p className="text-sm text-gray-600 mb-3">
                            Applied: {application.appliedDate} • Last Update: {application.lastUpdate}
                          </p>

                          <div className="bg-blue-50 p-3 rounded-lg mb-3">
                            <p className="text-sm">
                              <strong>Current Stage:</strong> {application.stage}
                            </p>
                            <p className="text-sm">
                              <strong>Next Action:</strong> {application.nextAction}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Update
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">AI-Powered Career Insights</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiInsights.map((insight, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-500" />
                          <h3 className="font-semibold">{insight.type}</h3>
                        </div>
                        <Badge variant={insight.priority === "High" ? "default" : "secondary"}>
                          {insight.priority} Priority
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{insight.insight}</p>
                      
                      <Button size="sm">
                        <Zap className="w-4 h-4 mr-2" />
                        {insight.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    Career Roadmap Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Short Term (1-3 months):</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Complete React advanced course</li>
                        <li>• Build 2 portfolio projects</li>
                        <li>• Apply to 5 companies weekly</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                      <h4 className="font-medium mb-2">Medium Term (3-6 months):</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Learn TypeScript and Next.js</li>
                        <li>• Contribute to open source projects</li>
                        <li>• Network with industry professionals</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                      <h4 className="font-medium mb-2">Long Term (6+ months):</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Secure senior developer position</li>
                        <li>• Lead a development team</li>
                        <li>• Speak at tech conferences</li>
                      </ul>
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

export default PlacementKit;
