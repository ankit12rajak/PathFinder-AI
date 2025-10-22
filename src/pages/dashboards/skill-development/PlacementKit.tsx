import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Download, Upload, Bot, Target, Briefcase, Sparkles, Award, TrendingUp, BarChart3, Edit, Code, MessageSquare, Rocket, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

const PlacementKit = () => {
  const navigate = useNavigate();
  const [atsScore] = useState<number>(78);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const placementTools = [
    {
      id: "ats-scanner",
      title: "ATS Resume Scanner",
      description: "AI-powered ATS compatibility analysis with real-time optimization suggestions",
      icon: Bot,
      gradient: "from-blue-500/20 to-purple-500/10",
      borderGradient: "from-blue-500/40 to-purple-500/40",
      iconBg: "from-blue-500/30 to-purple-500/20",
      iconColor: "text-blue-300",
      features: ["ATS Score Analysis", "Keyword Optimization", "Format Validation", "Industry Matching"],
      stats: { score: 78, label: "Current Score" },
      badge: "Active",
      badgeColor: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
    },
    {
      id: "resume-builder",
      title: "AI Resume Builder",
      description: "Professional resume creation with industry-specific templates and AI suggestions",
      icon: FileText,
      gradient: "from-emerald-500/20 to-teal-500/10",
      borderGradient: "from-emerald-500/40 to-teal-500/40",
      iconBg: "from-emerald-500/30 to-teal-500/20",
      iconColor: "text-emerald-300",
      features: ["Smart Templates", "AI Content Suggestions", "Real-time Preview", "Multi-format Export"],
      stats: { score: 12, label: "Templates" },
      badge: "Available",
      badgeColor: "bg-blue-500/20 border-blue-500/40 text-blue-300"
    },
    {
      id: "cover-letter",
      title: "Cover Letter Generator",
      description: "Personalized cover letters tailored to specific job descriptions and companies",
      icon: Edit,
      gradient: "from-orange-500/20 to-red-500/10",
      borderGradient: "from-orange-500/40 to-red-500/40",
      iconBg: "from-orange-500/30 to-red-500/20",
      iconColor: "text-orange-300",
      features: ["Job Matching", "Company Research", "Tone Adjustment", "Multiple Versions"],
      stats: { score: 5, label: "Generated" },
      badge: "Premium",
      badgeColor: "bg-purple-500/20 border-purple-500/40 text-purple-300"
    },
    {
      id: "portfolio",
      title: "Portfolio Builder",
      description: "Create stunning portfolios to showcase your projects, skills, and achievements",
      icon: Eye,
      gradient: "from-purple-500/20 to-pink-500/10",
      borderGradient: "from-purple-500/40 to-pink-500/40",
      iconBg: "from-purple-500/30 to-pink-500/20",
      iconColor: "text-purple-300",
      features: ["Responsive Design", "Project Showcase", "Skills Display", "Contact Integration"],
      stats: { score: 8, label: "Themes" },
      badge: "Available",
      badgeColor: "bg-blue-500/20 border-blue-500/40 text-blue-300"
    },
    {
      id: "interview-prep",
      title: "Interview Questions Generator",
      description: "AI-powered interview preparation with role-specific questions and answers",
      icon: MessageSquare,
      gradient: "from-cyan-500/20 to-blue-500/10",
      borderGradient: "from-cyan-500/40 to-blue-500/40",
      iconBg: "from-cyan-500/30 to-blue-500/20",
      iconColor: "text-cyan-300",
      features: ["Role-specific Questions", "Answer Templates", "Mock Interviews", "Feedback System"],
      stats: { score: 150, label: "Questions" },
      badge: "New",
      badgeColor: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
    }
  ];



  return (
    <DashboardLayout
      title="Placement Kit"
      description="AI-powered career toolkit for job placement success"
    >
      <div className="p-6 space-y-8 bg-slate-950">
        {/* ============ Premium Header Section ============ */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl border border-transparent">
          {/* Premium Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 hover:from-blue-500/5 hover:via-purple-500/5 hover:to-indigo-500/5 transition-all duration-700 rounded-3xl"></div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-purple-500/30 via-blue-500/20 to-indigo-500/30"></div>

          {/* Premium Accent Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-600/5 to-transparent rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600/5 to-transparent rounded-full translate-x-32 translate-y-32 blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            {/* Header Title Row */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/30 to-blue-500/20 rounded-xl backdrop-blur-sm border border-purple-400/40 shadow-lg">
                    <Briefcase className="w-8 h-8 text-purple-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-100 bg-clip-text text-transparent">Placement Kit</h1>
                    <p className="text-purple-300 text-lg font-medium">AI-Powered Career Toolkit</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <Badge className="bg-gradient-to-r from-emerald-500/40 to-emerald-600/30 border-emerald-400/60 text-emerald-100 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                    <Sparkles className="w-3 h-3 mr-2" />
                    AI-Optimized
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500/40 to-blue-600/30 border-blue-400/60 text-blue-100 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                    <Target className="w-3 h-3 mr-2" />
                    5 Tools Available
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-500/40 to-purple-600/30 border-purple-400/60 text-purple-100 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                    <Award className="w-3 h-3 mr-2" />
                    Premium Features
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="border-purple-500/60 text-purple-300 hover:bg-purple-500/30 backdrop-blur-sm transition-all duration-300">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>

            {/* Quick Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'ATS Score', value: `${atsScore}%`, icon: Bot, color: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/40', text: 'text-blue-300' },
                { label: 'Resume Templates', value: '12', icon: FileText, color: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-500/40', text: 'text-emerald-300' },
                { label: 'Cover Letters', value: '5', icon: Edit, color: 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/40', text: 'text-orange-300' },
                { label: 'Portfolio Themes', value: '8', icon: Eye, color: 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/40', text: 'text-purple-300' }
              ].map((stat, index) => (
                <div key={index} className={`${stat.color} border rounded-xl p-4 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.text}`} />
                    <span className={`text-2xl font-bold ${stat.text}`}>{stat.value}</span>
                  </div>
                  <p className="text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============ Career Tools Section ============ */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Career Tools</h2>
              <p className="text-slate-400 mt-1">Professional toolkit to accelerate your job placement journey</p>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placementTools.map((tool) => (
              <div
                key={tool.id}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
              >
                {/* Background Layers */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-2xl`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 rounded-2xl"></div>

                {/* Border Glow */}
                <div className={`absolute inset-0 rounded-2xl border bg-gradient-to-r ${tool.borderGradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10 p-6 space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 bg-gradient-to-br ${tool.iconBg} rounded-xl backdrop-blur-sm border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className={`w-7 h-7 ${tool.iconColor}`} />
                    </div>
                    <Badge className={`${tool.badgeColor} backdrop-blur-sm text-xs`}>
                      {tool.badge}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {tool.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className={`w-1.5 h-1.5 rounded-full ${tool.iconColor.replace('text-', 'bg-')}`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats Bar */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 uppercase tracking-wider">{tool.stats.label}</span>
                      <span className={`text-2xl font-bold ${tool.iconColor}`}>
                        {tool.stats.score}{tool.id === 'ats-scanner' ? '%' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => {
                      if (tool.id === 'ats-scanner') navigate('/dashboard/skill-development/placement-kit/atsscanner');
                      if (tool.id === 'resume-builder') navigate('/dashboard/skill-development/placement-kit/resumebuilder');
                      if (tool.id === 'cover-letter') navigate('/dashboard/skill-development/placement-kit/coverletter');
                      if (tool.id === 'portfolio') navigate('/dashboard/skill-development/placement-kit/portfolio');
                      if (tool.id === 'interview-prep') navigate('/dashboard/skill-development/placement-kit/interviewquestion');
                    }}
                    className={`w-full bg-gradient-to-r ${tool.iconBg.replace('/30', '').replace('/20', '')} hover:shadow-lg hover:shadow-${tool.iconColor.split('-')[1]}-500/20 text-white border-0 transition-all duration-300`}
                  >
                    {tool.id === 'ats-scanner' && (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Scan Resume
                      </>
                    )}
                    {tool.id === 'resume-builder' && (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        Build Resume
                      </>
                    )}
                    {tool.id === 'cover-letter' && (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Generate Letter
                      </>
                    )}
                    {tool.id === 'portfolio' && (
                      <>
                        <Code className="w-4 h-4 mr-2" />
                        Create Portfolio
                      </>
                    )}
                    {tool.id === 'interview-prep' && (
                      <>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Start Practice
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </DashboardLayout>
  );
};

export default PlacementKit;
