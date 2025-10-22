import { useState, useRef } from "react";
import { Upload, Bot, TrendingUp, AlertCircle, CheckCircle, AlertTriangle, Zap, Download, RefreshCw, FileText, Briefcase, Lightbulb, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import ResumeEditor from "@/components/ResumeEditor";
import { atsService, ATSAnalysisResult, JobDescriptionMatch, OptimizationSuggestion } from "@/services/atsService";
import { parseFile, isSupportedFormat } from "@/services/fileParserService";

interface TabState {
  step: 'upload' | 'analysis' | 'matching' | 'editor';
}

const ATSScanner = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'upload' | 'analysis' | 'matching' | 'suggestions' | 'editor'>('upload');
  const [atsAnalysis, setAtsAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [jobMatch, setJobMatch] = useState<JobDescriptionMatch | null>(null);
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [scanResults, setScanResults] = useState(false);


  const demoScanResults = atsAnalysis || {
    overallScore: 0,
    parseability: 0,
    keywordMatch: 0,
    formatting: 0,
    readability: 0,
    sections: [],
    recommendations: [],
    missingKeywords: [],
    strengthAreas: [],
    improvementAreas: []
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Validate file format
    if (!isSupportedFormat(file.name)) {
      alert('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB. Please try a smaller file.');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Parse the file using the appropriate parser
      const text = await parseFile(file);

      if (!text || text.trim().length === 0) {
        alert('The file appears to be empty or could not be parsed. Please try a different file.');
        setIsAnalyzing(false);
        return;
      }

      // Validate that we have at least some readable content
      if (text.length < 50) {
        alert('The file content is too short. Please upload a complete resume.');
        setIsAnalyzing(false);
        return;
      }

      setResumeText(text);

      // Perform real ATS analysis
      const analysis = await atsService.analyzeResume(text);
      setAtsAnalysis(analysis);

      // Also get optimization suggestions
      const opts = await atsService.getOptimizationSuggestions(text);
      setSuggestions(opts);

      setScanResults(true);
      setCurrentTab('analysis');
    } catch (error) {
      console.error('Error processing file:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error processing file: ${errorMessage}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleJobMatching = async () => {
    if (!resumeText || !jobDescription) {
      alert('Please enter both resume and job description');
      return;
    }

    setIsMatching(true);
    try {
      const match = await atsService.matchJobDescription(resumeText, jobDescription);
      setJobMatch(match);
      setCurrentTab('matching');
    } catch (error) {
      console.error('Error matching job:', error);
      alert('Error matching job description. Please try again.');
    } finally {
      setIsMatching(false);
    }
  };

  const downloadATSReport = async () => {
    if (!atsAnalysis) return;

    try {
      // Dynamically import jsPDF
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.jsPDF;

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = margin;

      // Helper function to add text with wrapping
      const addText = (text: string, fontSize: number = 11, isBold: boolean = false) => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
        
        lines.forEach((line: string) => {
          if (yPosition > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(line, margin, yPosition);
          yPosition += fontSize * 0.5;
        });
        yPosition += 5;
      };

      // Title
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('ATS Analysis Report', margin, 25);
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 35);
      
      yPosition = 50;
      doc.setTextColor(0, 0, 0);

      // Overall Score
      addText('OVERALL ATS SCORE', 16, true);
      doc.setFillColor(59, 130, 246);
      doc.rect(margin, yPosition, (atsAnalysis.overallScore / 100) * (pageWidth - margin * 2), 8, 'F');
      doc.setFontSize(14);
      doc.text(`${atsAnalysis.overallScore}%`, pageWidth - margin - 20, yPosition + 6);
      yPosition += 15;

      // Score Breakdown
      addText('Score Breakdown', 14, true);
      addText(`Parseability: ${atsAnalysis.parseability}%`);
      addText(`Keyword Match: ${atsAnalysis.keywordMatch}%`);
      addText(`Formatting: ${atsAnalysis.formatting}%`);
      addText(`Readability: ${atsAnalysis.readability}%`);
      yPosition += 5;

      // Sections Analysis
      if (atsAnalysis.sections && atsAnalysis.sections.length > 0) {
        addText('Section Analysis', 14, true);
        atsAnalysis.sections.forEach(section => {
          addText(`${section.name}: ${section.score}% - ${section.status.toUpperCase()}`);
        });
        yPosition += 5;
      }

      // Recommendations
      if (atsAnalysis.recommendations && atsAnalysis.recommendations.length > 0) {
        addText('Recommendations', 14, true);
        atsAnalysis.recommendations.forEach((rec, index) => {
          addText(`${index + 1}. [${rec.priority.toUpperCase()}] ${rec.text}`);
        });
        yPosition += 5;
      }

      // Missing Keywords
      if (atsAnalysis.missingKeywords && atsAnalysis.missingKeywords.length > 0) {
        addText('Missing Keywords', 14, true);
        addText(atsAnalysis.missingKeywords.join(', '));
        yPosition += 5;
      }

      // Strength Areas
      if (atsAnalysis.strengthAreas && atsAnalysis.strengthAreas.length > 0) {
        addText('Strength Areas', 14, true);
        atsAnalysis.strengthAreas.forEach((area, index) => {
          addText(`${index + 1}. ${area}`);
        });
        yPosition += 5;
      }

      // Improvement Areas
      if (atsAnalysis.improvementAreas && atsAnalysis.improvementAreas.length > 0) {
        addText('Areas for Improvement', 14, true);
        atsAnalysis.improvementAreas.forEach((area, index) => {
          addText(`${index + 1}. ${area}`);
        });
      }

      // Job Match Section (if available)
      if (jobMatch) {
        doc.addPage();
        yPosition = margin;
        addText('JOB MATCH ANALYSIS', 16, true);
        addText(`Overall Match Score: ${jobMatch.matchScore}%`, 14);
        addText(`Experience Relevance: ${jobMatch.experienceRelevance}%`);
        addText(`Education Relevance: ${jobMatch.educationRelevance}%`);
        yPosition += 5;

        if (jobMatch.matchedKeywords && jobMatch.matchedKeywords.length > 0) {
          addText('Matched Keywords', 14, true);
          addText(jobMatch.matchedKeywords.join(', '));
          yPosition += 5;
        }

        if (jobMatch.missingKeywords && jobMatch.missingKeywords.length > 0) {
          addText('Missing Keywords', 14, true);
          addText(jobMatch.missingKeywords.join(', '));
          yPosition += 5;
        }

        if (jobMatch.skillsMatched && jobMatch.skillsMatched.length > 0) {
          addText('Skills Matched', 14, true);
          jobMatch.skillsMatched.forEach((skill, index) => {
            addText(`${index + 1}. ${skill.skill} (${skill.confidence}% confidence) - Found in: ${skill.foundIn}`);
          });
          yPosition += 5;
        }

        if (jobMatch.recommendations && jobMatch.recommendations.length > 0) {
          addText('Job Match Recommendations', 14, true);
          jobMatch.recommendations.forEach((rec, index) => {
            addText(`${index + 1}. ${rec}`);
          });
        }
      }

      // Save the PDF
      const fileName = `ATS_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('Failed to generate PDF report. Please try again.');
    }
  };

  const demoScanResults_old = {
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

  const handleScanAgain = () => {
    setScanResults(false);
    setFileName(null);
    setResumeText("");
    setAtsAnalysis(null);
    setJobMatch(null);
    setSuggestions([]);
    setCurrentTab('upload');
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
                  {scanResults && atsAnalysis && (
                    <Badge className="bg-gradient-to-r from-blue-500/40 to-blue-600/30 border-blue-400/60 text-blue-100 backdrop-blur-sm shadow-md">
                      <TrendingUp className="w-3 h-3 mr-2" />
                      Current Score: {atsAnalysis.overallScore}%
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {scanResults && (
                <div className="flex gap-3">
                  <Button
                    onClick={downloadATSReport}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button
                    onClick={handleScanAgain}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Scan Another
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ============ Tabbed Interface for Complete Flow ============ */}
        {!scanResults ? (
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="relative overflow-hidden rounded-2xl p-12 border-2 border-dashed border-blue-500/40 bg-gradient-to-br from-blue-500/5 to-purple-500/5 hover:border-blue-500/60 transition-all duration-300"
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-blue-500/80'); }}
              onDragLeave={(e) => { e.currentTarget.classList.remove('border-blue-500/80'); }}
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                  const input = document.getElementById('resume-upload') as HTMLInputElement;
                  const dataTransfer = new DataTransfer();
                  dataTransfer.items.add(files[0]);
                  input.files = dataTransfer.files;
                  handleFileUpload({ target: { files: dataTransfer.files } } as any);
                }
              }}
            >
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
                      ref={fileInputRef}
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-slate-400 mt-2">Supported formats: PDF, DOC, DOCX, TXT (Max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Real AI Analysis",
                  description: "Get comprehensive ATS analysis powered by Gemini AI",
                  icon: Bot
                },
                {
                  title: "Job Description Matching",
                  description: "Match your resume against specific job descriptions",
                  icon: Briefcase
                },
                {
                  title: "AI Optimization",
                  description: "Get specific suggestions to improve your resume",
                  icon: Lightbulb
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
          <Tabs value={currentTab} onValueChange={(value: any) => setCurrentTab(value)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-1">
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="matching" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">Job Match</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">Suggestions</span>
              </TabsTrigger>
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Editor</span>
              </TabsTrigger>
            </TabsList>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              {isAnalyzing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full mx-auto"></div>
                    <p className="text-slate-300">Analyzing your resume with AI...</p>
                  </div>
                </div>
              ) : atsAnalysis ? (
                <>
                  {/* Scan Result Header */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-slate-400 mb-2">Resume Analyzed</p>
                        <p className="text-white font-semibold">{fileName}</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-emerald-500/40 to-emerald-600/30 border-emerald-400/60 text-emerald-100 backdrop-blur-sm text-lg px-4 py-2">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Analysis Complete
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
                              <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(100, 116, 139, 0.3)" strokeWidth="8" />
                              <circle
                                cx="64"
                                cy="64"
                                r="56"
                                fill="none"
                                stroke="url(#scoreGradient)"
                                strokeWidth="8"
                                strokeDasharray={`${(atsAnalysis.overallScore / 100) * 351.858} 351.858`}
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
                                <span className="text-4xl font-bold text-blue-300">{atsAnalysis.overallScore}</span>
                                <span className="text-slate-400">%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className={`text-sm ${atsAnalysis.overallScore >= 75 ? 'text-emerald-300' : atsAnalysis.overallScore >= 50 ? 'text-amber-300' : 'text-red-300'}`}>
                          {atsAnalysis.overallScore >= 75 ? 'Excellent compatibility' : atsAnalysis.overallScore >= 50 ? 'Good compatibility' : 'Needs improvement'}
                        </p>
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="space-y-4">
                      {[
                        { label: "Parseability", value: atsAnalysis.parseability, color: "from-emerald-500 to-teal-500" },
                        { label: "Keyword Match", value: atsAnalysis.keywordMatch, color: "from-blue-500 to-cyan-500" },
                        { label: "Formatting", value: atsAnalysis.formatting, color: "from-orange-500 to-red-500" },
                        { label: "Readability", value: atsAnalysis.readability, color: "from-purple-500 to-pink-500" }
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
                      {atsAnalysis.sections.map((section, index) => (
                        <div
                          key={index}
                          className={`${getStatusColor(section.status)} border rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white">{section.name}</span>
                            {getStatusIcon(section.status)}
                          </div>
                          <p className="text-xs text-slate-300 mb-2">{section.feedback}</p>
                          <p className="text-xs font-semibold">Score: {section.score}%</p>
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
                        {atsAnalysis.missingKeywords.map((keyword, index) => (
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
                    <h3 className="text-xl font-bold text-white">Top Recommendations</h3>
                    <div className="space-y-3">
                      {atsAnalysis.recommendations.slice(0, 5).map((rec, index) => (
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
                            {rec.section && <p className="text-xs text-slate-300 mt-2">Section: {rec.section}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </TabsContent>

            {/* Job Description Matching Tab */}
            <TabsContent value="matching" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Match Your Resume to Job Description</h3>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">Job Description</label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description here..."
                      className="w-full h-40 bg-slate-950/50 border border-slate-600/50 rounded-lg p-4 text-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button
                    onClick={handleJobMatching}
                    disabled={isMatching || !jobDescription.trim()}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                  >
                    {isMatching ? 'Analyzing...' : 'Match Resume to Job'}
                  </Button>
                </div>

                {isMatching && (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-4">
                      <div className="animate-spin w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full mx-auto"></div>
                      <p className="text-slate-300">Matching resume to job description...</p>
                    </div>
                  </div>
                )}

                {jobMatch && (
                  <>
                    {/* Match Score */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6 text-center">
                        <p className="text-sm text-slate-400 mb-2">Overall Match</p>
                        <p className="text-4xl font-bold text-blue-300">{jobMatch.matchScore}%</p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30 rounded-2xl p-6 text-center">
                        <p className="text-sm text-slate-400 mb-2">Experience Relevance</p>
                        <p className="text-4xl font-bold text-emerald-300">{jobMatch.experienceRelevance}%</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6 text-center">
                        <p className="text-sm text-slate-400 mb-2">Education Relevance</p>
                        <p className="text-4xl font-bold text-purple-300">{jobMatch.educationRelevance}%</p>
                      </div>
                    </div>

                    {/* Matched Skills */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-white">Matched Skills</h4>
                      <div className="space-y-2">
                        {jobMatch.skillsMatched.map((skill, idx) => (
                          <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-slate-200">{skill.skill}</span>
                              <Badge className="bg-emerald-500/30 text-emerald-200">{skill.confidence}%</Badge>
                            </div>
                            <p className="text-xs text-slate-400">Found in: {skill.foundIn}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Missing Keywords for Job */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-white">Missing Keywords for This Job</h4>
                      <div className="flex flex-wrap gap-2">
                        {jobMatch.missingKeywords.map((keyword, idx) => (
                          <Badge key={idx} className="bg-red-500/20 border-red-500/40 text-red-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-white">Recommendations</h4>
                      <div className="space-y-2">
                        {jobMatch.recommendations.map((rec, idx) => (
                          <div key={idx} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                            <p className="text-sm text-blue-100">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            {/* Suggestions Tab */}
            <TabsContent value="suggestions" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">AI Optimization Suggestions</h3>
                {suggestions.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <p>No suggestions available yet. Check the Analysis tab first.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {suggestions.map((suggestion, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className={`${
                                suggestion.priority === 'high' 
                                  ? 'bg-red-500/30 text-red-200' 
                                  : suggestion.priority === 'medium' 
                                  ? 'bg-amber-500/30 text-amber-200' 
                                  : 'bg-blue-500/30 text-blue-200'
                              }`}>
                                {suggestion.priority.toUpperCase()}
                              </Badge>
                              <Badge className="bg-slate-700/50 text-slate-300">{suggestion.type}</Badge>
                            </div>
                            <h4 className="font-semibold text-white mb-2">{suggestion.reason}</h4>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-xs text-slate-400 font-semibold">ORIGINAL TEXT</p>
                            <div className="bg-slate-950/50 border border-slate-700/30 rounded-lg p-3">
                              <p className="text-sm text-slate-300 line-clamp-3">{suggestion.originalText}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs text-slate-400 font-semibold">SUGGESTED TEXT</p>
                            <div className="bg-emerald-950/30 border border-emerald-700/30 rounded-lg p-3">
                              <p className="text-sm text-emerald-200 line-clamp-3">{suggestion.suggestedText}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Resume Editor Tab */}
            <TabsContent value="editor" className="space-y-4">
              {resumeText ? (
                <ResumeEditor 
                  resumeText={resumeText} 
                  onResumeUpdate={setResumeText}
                  suggestions={suggestions}
                />
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <p>Resume content will be available here after analysis</p>
                </div>
              )}
            </TabsContent>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={handleScanAgain}
                variant="outline"
                className="flex-1 min-w-48 border-blue-500/60 text-blue-300 hover:bg-blue-500/30 backdrop-blur-sm transition-all duration-300"
              >
                <Upload className="w-4 h-4 mr-2" />
                Scan Another Resume
              </Button>
            </div>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ATSScanner;
