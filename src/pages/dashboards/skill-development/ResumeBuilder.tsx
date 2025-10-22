import { useState } from "react";
import { FileText, Plus, Eye, Settings, Download, Trash2, Copy, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

interface Resume {
  id: string;
  name: string;
  template: string;
  lastModified: string;
  status: "draft" | "completed";
}

const ResumeBuilder = () => {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: "1",
      name: "Software Engineer - TCS",
      template: "Modern",
      lastModified: "2 hours ago",
      status: "completed"
    },
    {
      id: "2",
      name: "Full Stack Developer - Flipkart",
      template: "Minimalist",
      lastModified: "1 day ago",
      status: "draft"
    }
  ]);

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary design with clean layout",
      color: "from-blue-500 to-purple-500",
      icon: "✨"
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Simple and elegant appearance",
      color: "from-slate-500 to-gray-500",
      icon: "⚡"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Eye-catching design for creative roles",
      color: "from-pink-500 to-orange-500",
      icon: "🎨"
    },
    {
      id: "professional",
      name: "Professional",
      description: "Corporate and formal appearance",
      color: "from-indigo-500 to-blue-500",
      icon: "💼"
    }
  ];

  return (
    <DashboardLayout
      title="Resume Builder"
      description="Create professional resumes with AI assistance"
    >
      <div className="p-6 space-y-8 bg-slate-950">
        {/* ============ Header Section ============ */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl border border-transparent">
          {/* Premium Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-teal-600/5 to-blue-600/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-teal-500/0 to-blue-500/0 hover:from-emerald-500/5 hover:via-teal-500/5 hover:to-blue-500/5 transition-all duration-700 rounded-3xl"></div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-emerald-500/30 via-teal-500/20 to-blue-500/30"></div>

          {/* Premium Accent Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-emerald-600/5 to-transparent rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-600/5 to-transparent rounded-full translate-x-32 translate-y-32 blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            {/* Header Title Row */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500/30 to-teal-500/20 rounded-xl backdrop-blur-sm border border-emerald-400/40 shadow-lg">
                    <FileText className="w-8 h-8 text-emerald-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-100 bg-clip-text text-transparent">Resume Builder</h1>
                    <p className="text-emerald-300 text-lg font-medium">Professional Resumes with AI Assistance</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <Badge className="bg-gradient-to-r from-emerald-500/40 to-emerald-600/30 border-emerald-400/60 text-emerald-100 backdrop-blur-sm shadow-md">
                    <FileText className="w-3 h-3 mr-2" />
                    12 Templates Available
                  </Badge>
                  <Badge className="bg-gradient-to-r from-teal-500/40 to-teal-600/30 border-teal-400/60 text-teal-100 backdrop-blur-sm shadow-md">
                    <Settings className="w-3 h-3 mr-2" />
                    AI-Powered
                  </Badge>
                </div>
              </div>

              {/* Create Button */}
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12">
                <Plus className="w-4 h-4 mr-2" />
                New Resume
              </Button>
            </div>
          </div>
        </div>

        {/* ============ Your Resumes Section ============ */}
        {resumes.length > 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Resumes</h2>
              <p className="text-slate-400 mt-1">Manage and edit your saved resumes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-slate-700/50 hover:border-emerald-500/40"
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10 p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{resume.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-gradient-to-r from-slate-700 to-slate-800 border-slate-600 text-slate-300 text-xs">
                            {resume.template}
                          </Badge>
                          <Badge className={resume.status === "completed" ? "bg-gradient-to-r from-emerald-500/40 to-emerald-600/30 border-emerald-400/60 text-emerald-100" : "bg-gradient-to-r from-amber-500/40 to-amber-600/30 border-amber-400/60 text-amber-100"}>
                            {resume.status === "completed" ? "Complete" : "Draft"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400">Modified {resume.lastModified}</p>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700/50 text-xs">
                        <Copy className="w-3 h-3 mr-1" />
                        Duplicate
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-red-500/40 text-red-300 hover:bg-red-500/20 text-xs">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ Templates Section ============ */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Choose a Template</h2>
            <p className="text-slate-400 mt-1">Start with a professionally designed template</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90"></div>
                <div className={`absolute inset-0 bg-gradient-to-r ${template.color} opacity-0 group-hover:opacity-10 transition-all duration-300`}></div>

                {/* Border */}
                <div className={`absolute inset-0 rounded-2xl border bg-gradient-to-r ${template.color} opacity-20 group-hover:opacity-60 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10 p-6 space-y-4 text-center h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-3xl">{template.icon}</p>
                    <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all">
                      {template.name}
                    </h3>
                    <p className="text-sm text-slate-400">{template.description}</p>
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${template.color} hover:shadow-lg text-white border-0 transition-all`}>
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ Features Section ============ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Why Use Our Builder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "AI Content", description: "Get intelligent suggestions for your resume", icon: "✨" },
              { title: "ATS Optimized", description: "Ensures compatibility with applicant tracking systems", icon: "🎯" },
              { title: "Real-time Preview", description: "See changes instantly as you edit", icon: "👁️" },
              { title: "Export Options", description: "Download as PDF, Word, or plaintext", icon: "📥" }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-emerald-500/40 p-4 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all"></div>
                <div className="relative z-10 space-y-2">
                  <div className="text-2xl">{feature.icon}</div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-xs text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ Premium Features ============ */}
        <div className="relative overflow-hidden rounded-2xl p-8 border border-purple-500/40 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-purple-300" />
              <h3 className="text-xl font-bold text-white">Premium Features Unlocked</h3>
            </div>
            <p className="text-slate-300">Upgrade your account to access:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Unlimited resume versions",
                "Advanced AI content suggestions",
                "Professional cover letter templates",
                "Priority customer support",
                "Custom domain portfolio",
                "Analytics and insights"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
            <Button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 font-semibold shadow-lg">
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeBuilder;
