import { useState } from "react";
import { Upload, Bot, TrendingUp, AlertCircle, CheckCircle, AlertTriangle, Zap, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

const ATSScanner = () => {
  const [atsScore, setAtsScore] = useState<number>(78);
  const [fileName, setFileName] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState(false);

  const demoScanResults = {
    overallScore: 78,
    parseability: 92,
    keywordMatch: 85,
    formatting: 68,
    readability: 81,
    sections: [
      { name: "Contact Info", status: "good", score: 95 },
      { name: "Professional Summary", status: "good", score: 88 },
      { name: "Experience", status: "warning", score: 72 },
      { name: "Education", status: "good", score: 90 },
      { name: "Skills", status: "warning", score: 68 },
      { name: "Certifications", status: "good", score: 85 }
    ],
    recommendations: [
      { priority: "high", text: "Add more action verbs to experience descriptions" },
      { priority: "high", text: "Include industry-specific keywords from job description" },
      { priority: "medium", text: "Expand technical skills section with relevant tools" },
      { priority: "medium", text: "Use standard section headers for better parsing" },
      { priority: "low", text: "Consider formatting numbers for consistency" }
    ],
    missingKeywords: ["Machine Learning", "Cloud Computing", "DevOps", "CI/CD", "Kubernetes"]
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Simulate scanning delay
      setTimeout(() => {
        setScanResults(true);
      }, 1500);
    }
  };

  const handleScanAgain = () => {
    setScanResults(false);
    setFileName(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-emerald-500/20 border-emerald-500/40 text-emerald-300";
      case "warning":
        return "bg-amber-500/20 border-amber-500/40 text-amber-300";
      case "bad":
        return "bg-red-500/20 border-red-500/40 text-red-300";
      default:
        return "bg-slate-500/20 border-slate-500/40 text-slate-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "bad":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 border-red-500/40 text-red-300";
      case "medium":
        return "bg-amber-500/20 border-amber-500/40 text-amber-300";
      case "low":
        return "bg-blue-500/20 border-blue-500/40 text-blue-300";
      default:
        return "bg-slate-500/20 border-slate-500/40 text-slate-300";
    }
  };

  return (
    <DashboardLayout
      title="ATS Resume Scanner"
      description="Analyze and optimize your resume for ATS compatibility"
    >
      <div className="p-6 space-y-8 bg-slate-950">
        {/* ============ Header Section ============ */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl border border-transparent">
          {/* Premium Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 hover:from-blue-500/5 hover:via-purple-500/5 hover:to-indigo-500/5 transition-all duration-700 rounded-3xl"></div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-purple-500/30 via-blue-500/20 to-indigo-500/30"></div>

          {/* Premium Accent Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-600/5 to-transparent rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-600/5 to-transparent rounded-full translate-x-32 translate-y-32 blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            {/* Header Title Row */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-xl backdrop-blur-sm border border-blue-400/40 shadow-lg">
                    <Bot className="w-8 h-8 text-blue-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-100 bg-clip-text text-transparent">ATS Resume Scanner</h1>
                    <p className="text-blue-300 text-lg font-medium">AI-Powered Compatibility Analysis</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <Badge className="bg-gradient-to-r from-emerald-500/40 to-emerald-600/30 border-emerald-400/60 text-emerald-100 backdrop-blur-sm shadow-md">
                    <Zap className="w-3 h-3 mr-2" />
                    Real-time Analysis
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500/40 to-blue-600/30 border-blue-400/60 text-blue-100 backdrop-blur-sm shadow-md">
                    <TrendingUp className="w-3 h-3 mr-2" />
                    Current Score: {atsScore}%
                  </Badge>
                </div>
              </div>

              {/* Action Button */}
              {scanResults && (
                <Button
                  onClick={handleScanAgain}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Scan Another
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* ============ Upload Section / Results Section ============ */}
        {!scanResults ? (
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="relative overflow-hidden rounded-2xl p-12 border-2 border-dashed border-blue-500/40 bg-gradient-to-br from-blue-500/5 to-purple-500/5 hover:border-blue-500/60 transition-all duration-300">
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center">
                <div className="p-4 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-xl backdrop-blur-sm border border-blue-400/40 shadow-lg">
                  <Upload className="w-10 h-10 text-blue-300" />
                </div>
                <div>
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <p className="text-lg font-semibold text-white">
                      Drag and drop your resume or <span className="text-blue-300 hover:text-blue-200">click to upload</span>
                    </p>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-slate-400 mt-2">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "What is ATS?",
                  description: "Applicant Tracking Systems scan resumes to identify qualified candidates",
                  icon: Bot
                },
                {
                  title: "Why it Matters",
                  description: "75% of resumes never reach human eyes due to ATS filtering",
                  icon: AlertCircle
                },
                {
                  title: "Optimize Tips",
                  description: "Use standard fonts, keywords, and clear formatting for best results",
                  icon: Zap
                }
              ].map((card, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/40 p-4 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-3">
                      <card.icon className="w-5 h-5 text-blue-300" />
                      <h3 className="font-semibold text-white">{card.title}</h3>
                    </div>
                    <p className="text-sm text-slate-400">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Scan Result Header */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Resume Scanned</p>
                  <p className="text-white font-semibold">{fileName}</p>
                </div>
                <Badge className="bg-gradient-to-r from-emerald-500/40 to-emerald-600/30 border-emerald-400/60 text-emerald-100 backdrop-blur-sm text-lg px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Scan Complete
                </Badge>
              </div>
            </div>

            {/* Overall Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative overflow-hidden rounded-2xl p-8 border border-blue-500/40 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
                <div className="relative z-10 text-center space-y-4">
                  <p className="text-sm text-slate-400 uppercase tracking-wider">ATS Compatibility Score</p>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          fill="none"
                          stroke="rgba(100, 116, 139, 0.3)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          fill="none"
                          stroke="url(#scoreGradient)"
                          strokeWidth="8"
                          strokeDasharray={`${(demoScanResults.overallScore / 100) * 351.858} 351.858`}
                          className="transition-all duration-500"
                        />
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-4xl font-bold text-blue-300">{demoScanResults.overallScore}</span>
                          <span className="text-slate-400">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">Excellent compatibility rate</p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-4">
                {[
                  { label: "Parseability", value: demoScanResults.parseability, color: "from-emerald-500 to-teal-500" },
                  { label: "Keyword Match", value: demoScanResults.keywordMatch, color: "from-blue-500 to-cyan-500" },
                  { label: "Formatting", value: demoScanResults.formatting, color: "from-orange-500 to-red-500" },
                  { label: "Readability", value: demoScanResults.readability, color: "from-purple-500 to-pink-500" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">{item.label}</span>
                      <span className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.value}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Analysis */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Section Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {demoScanResults.sections.map((section, index) => (
                  <div
                    key={index}
                    className={`${getStatusColor(section.status)} border rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{section.name}</span>
                      {getStatusIcon(section.status)}
                    </div>
                    <p className="text-xs text-slate-300">Score: {section.score}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Missing Keywords</h3>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
                <p className="text-sm text-slate-400 mb-4">Add these keywords to improve ATS compatibility:</p>
                <div className="flex flex-wrap gap-2">
                  {demoScanResults.missingKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      className="bg-gradient-to-r from-amber-500/30 to-orange-500/20 border-amber-500/40 text-amber-200 backdrop-blur-sm cursor-pointer hover:from-amber-500/50 hover:to-orange-500/40 transition-all duration-300"
                    >
                      + {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Recommendations</h3>
              <div className="space-y-3">
                {demoScanResults.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`${getPriorityColor(rec.priority)} border rounded-xl p-4 backdrop-blur-sm flex items-start gap-3 transition-all duration-300`}
                  >
                    <div className="mt-1">
                      {rec.priority === "high" && <AlertTriangle className="w-5 h-5" />}
                      {rec.priority === "medium" && <AlertCircle className="w-5 h-5" />}
                      {rec.priority === "low" && <CheckCircle className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        {rec.priority === "high" ? "Critical" : rec.priority === "medium" ? "Important" : "Optional"}
                      </p>
                      <p className="text-sm">{rec.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button
                onClick={handleScanAgain}
                variant="outline"
                className="flex-1 border-blue-500/60 text-blue-300 hover:bg-blue-500/30 backdrop-blur-sm transition-all duration-300"
              >
                <Upload className="w-4 h-4 mr-2" />
                Scan Another Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ATSScanner;
