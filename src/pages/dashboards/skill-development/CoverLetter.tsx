import { useState } from "react";
import { Edit, Plus, Eye, Download, RefreshCw, Sparkles, Target, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

interface CoverLetter {
  id: string;
  company: string;
  position: string;
  lastModified: string;
}

const CoverLetter = () => {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([
    {
      id: "1",
      company: "Google",
      position: "Senior Software Engineer",
      lastModified: "3 days ago"
    },
    {
      id: "2",
      company: "Microsoft",
      position: "Cloud Solutions Architect",
      lastModified: "1 week ago"
    }
  ]);

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const demoLetterContent = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at Google. With over 5 years of experience in full-stack development and a proven track record of building scalable applications that serve millions of users, I am confident in my ability to contribute significantly to your team.

Throughout my career, I have developed expertise in modern web technologies including React, Node.js, and cloud infrastructure. At my current position, I led a team of 8 engineers in architecting a microservices-based platform that reduced deployment time by 60% and improved system reliability to 99.99% uptime.

What particularly excites me about this opportunity is Google's commitment to innovation and its use of cutting-edge technologies. I am especially interested in contributing to projects that leverage machine learning and distributed systems—areas where I have gained substantial experience.

I am confident that my technical skills, leadership experience, and passion for solving complex problems would make me a valuable addition to your team. I would welcome the opportunity to discuss how I can contribute to Google's mission of organizing the world's information.

Thank you for considering my application. I look forward to the opportunity to speak with you soon.

Sincerely,
John Doe`;

  return (
    <DashboardLayout
      title="Cover Letter Generator"
      description="Create personalized cover letters tailored to specific jobs"
    >
      <div className="p-6 space-y-8 bg-slate-950">
        {/* ============ Header Section ============ */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl border border-transparent">
          {/* Premium Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-red-600/5 to-pink-600/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-red-500/0 to-pink-500/0 hover:from-orange-500/5 hover:via-red-500/5 hover:to-pink-500/5 transition-all duration-700 rounded-3xl"></div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-orange-500/30 via-red-500/20 to-pink-500/30"></div>

          {/* Premium Accent Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-600/5 to-transparent rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-red-600/5 to-transparent rounded-full translate-x-32 translate-y-32 blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            {/* Header Title Row */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500/30 to-red-500/20 rounded-xl backdrop-blur-sm border border-orange-400/40 shadow-lg">
                    <Edit className="w-8 h-8 text-orange-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-orange-200 to-red-100 bg-clip-text text-transparent">Cover Letter Generator</h1>
                    <p className="text-orange-300 text-lg font-medium">Personalized for Every Opportunity</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <Badge className="bg-gradient-to-r from-orange-500/40 to-orange-600/30 border-orange-400/60 text-orange-100 backdrop-blur-sm shadow-md">
                    <Sparkles className="w-3 h-3 mr-2" />
                    AI-Powered Generation
                  </Badge>
                  <Badge className="bg-gradient-to-r from-red-500/40 to-red-600/30 border-red-400/60 text-red-100 backdrop-blur-sm shadow-md">
                    <Target className="w-3 h-3 mr-2" />
                    Job-Specific
                  </Badge>
                </div>
              </div>

              {/* Create Button */}
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12">
                <Plus className="w-4 h-4 mr-2" />
                New Letter
              </Button>
            </div>
          </div>
        </div>

        {/* ============ Your Cover Letters Section ============ */}
        {coverLetters.length > 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Cover Letters</h2>
              <p className="text-slate-400 mt-1">Browse and manage your cover letters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coverLetters.map((letter) => (
                <div
                  key={letter.id}
                  onClick={() => setSelectedLetter(selectedLetter === letter.id ? null : letter.id)}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-slate-700/50 hover:border-orange-500/40"
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 transition-all duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10 p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">{letter.company}</h3>
                      <p className="text-sm text-orange-300 mt-1">{letter.position}</p>
                    </div>

                    <p className="text-xs text-slate-400">Modified {letter.lastModified}</p>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 border-orange-500/40 text-orange-300 hover:bg-orange-500/20 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700/50 text-xs">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-orange-500/40 text-orange-300 hover:bg-orange-500/20 text-xs">
                        <Copy className="w-3 h-3 mr-1" />
                        Duplicate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ Generation Options ============ */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Generate New Letter</h2>
            <p className="text-slate-400 mt-1">Provide details about the job and company</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl p-6 border border-slate-700/50 hover:border-orange-500/40 bg-gradient-to-br from-slate-800/50 to-slate-900/50 transition-all duration-300">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">Company Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Google, Microsoft, Amazon"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-500/40 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">Job Position</label>
                    <input
                      type="text"
                      placeholder="e.g., Senior Software Engineer"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-500/40 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">Job Description (Optional)</label>
                    <textarea
                      placeholder="Paste the job description for better personalization"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-500/40 focus:outline-none transition-all h-24 resize-none"
                    ></textarea>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl p-6 border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 max-h-96 overflow-y-auto">
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{demoLetterContent}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700/50">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ============ Generation Templates ============ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Letter Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Professional", icon: "💼", color: "from-blue-500 to-cyan-500" },
              { name: "Creative", icon: "🎨", color: "from-pink-500 to-orange-500" },
              { name: "Academic", icon: "🎓", color: "from-purple-500 to-pink-500" },
              { name: "Career Change", icon: "🚀", color: "from-green-500 to-teal-500" },
              { name: "Internship", icon: "👨‍💼", color: "from-indigo-500 to-blue-500" },
              { name: "Referral-based", icon: "🤝", color: "from-yellow-500 to-orange-500" }
            ].map((template, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-orange-500/40 p-4 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 transition-all"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{template.icon}</span>
                    <span className="font-semibold text-white">{template.name}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-orange-400 group-hover:scale-150 transition-transform"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ Tips Section ============ */}
        <div className="relative overflow-hidden rounded-2xl p-8 border border-orange-500/40 bg-gradient-to-br from-orange-500/5 to-red-500/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold text-white">Pro Tips for Great Cover Letters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Personalize each letter with specific details about the company",
                "Use the same keywords from the job description",
                "Tell a compelling story about why you're interested",
                "Keep it concise - no more than one page",
                "Mention specific achievements and results",
                "Proofread carefully for spelling and grammar"
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm text-slate-300">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoverLetter;
