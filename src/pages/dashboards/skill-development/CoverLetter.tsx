import { useState, useEffect } from "react";
import { Edit, Plus, Eye, Download, RefreshCw, Sparkles, Target, Copy, Trash2, Save, X, Check, Lightbulb, AlertCircle, FileText, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import { coverLetterService, GeneratedCoverLetter, CoverLetterTemplate } from "@/services/coverLetterService";
import { useNavigate } from "react-router-dom";

interface ViewState {
  type: 'list' | 'preview' | 'edit' | 'generate' | 'analyze' | 'view-detail';
  letterId?: string;
}

const CoverLetter = () => {
  const navigate = useNavigate();
  
  // Core state
  const [coverLetters, setCoverLetters] = useState<GeneratedCoverLetter[]>([]);
  const [viewState, setViewState] = useState<ViewState>({ type: 'list' });
  const [selectedLetter, setSelectedLetter] = useState<GeneratedCoverLetter | null>(null);
  
  // Form states
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [userBackground, setUserBackground] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Professional");
  
  // Generated content
  const [generatedContent, setGeneratedContent] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Suggestions and analysis
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [alignmentAnalysis, setAlignmentAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [templates, setTemplates] = useState<CoverLetterTemplate[]>([]);
  const [refinementFeedback, setRefinementFeedback] = useState("");

  // Load data on mount
  useEffect(() => {
    try {
      const saved = coverLetterService.loadFromLocalStorage();
      setCoverLetters(saved);
      const loadedTemplates = coverLetterService.getTemplates();
      setTemplates(loadedTemplates);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  }, []);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleGenerateCoverLetter = async () => {
    if (!company.trim() || !position.trim()) {
      setError("Please fill in company name and job position");
      return;
    }

    setIsGenerating(true);
    setError("");
    try {
      const content = await coverLetterService.generateCoverLetter(
        company,
        position,
        jobDescription,
        userBackground,
        selectedTemplate
      );
      
      setGeneratedContent(content);
      setEditedContent(content);
      setViewState({ type: 'preview' });
      setSuccess("Cover letter generated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate cover letter");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCoverLetter = () => {
    if (!editedContent.trim()) {
      setError("Cover letter cannot be empty");
      return;
    }

    const newLetter: GeneratedCoverLetter = {
      id: coverLetterService.generateId(),
      company: company || "Unnamed",
      position: position || "Position",
      content: editedContent,
      template: selectedTemplate,
      lastModified: coverLetterService.getFormattedDate(),
      createdAt: new Date().toISOString(),
    };

    const updated = [...coverLetters, newLetter];
    setCoverLetters(updated);
    coverLetterService.saveToLocalStorage(updated);
    
    setCompany("");
    setPosition("");
    setJobDescription("");
    setUserBackground("");
    setGeneratedContent("");
    setEditedContent("");
    setRefinementFeedback("");
    
    setViewState({ type: 'list' });
    setSuccess("Cover letter saved successfully!");
  };

  const handleDeleteCoverLetter = (id: string) => {
    const updated = coverLetters.filter(letter => letter.id !== id);
    setCoverLetters(updated);
    coverLetterService.saveToLocalStorage(updated);
    setSuccess("Cover letter deleted successfully!");
    if (selectedLetter?.id === id) {
      setSelectedLetter(null);
      setViewState({ type: 'list' });
    }
  };

  const handleViewLetter = (letter: GeneratedCoverLetter) => {
    setSelectedLetter(letter);
    setEditedContent(letter.content);
    setViewState({ type: 'view-detail' });
  };

  const handleEditLetter = () => {
    if (selectedLetter) {
      setEditedContent(selectedLetter.content);
      setViewState({ type: 'edit' });
    }
  };

  const handleDuplicateLetter = (letter: GeneratedCoverLetter) => {
    setCompany(letter.company);
    setPosition(letter.position);
    setSelectedTemplate(letter.template);
    setGeneratedContent(letter.content);
    setEditedContent(letter.content);
    setViewState({ type: 'preview' });
    setSuccess("Letter loaded for editing!");
  };

  const handleGetSuggestions = async () => {
    if (!editedContent.trim()) {
      setError("No content to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    try {
      const subs = await coverLetterService.getCoverLetterSuggestions(
        company || "the company",
        position || "the position",
        editedContent
      );
      setSuggestions(subs);
      setViewState({ type: 'analyze' });
      setSuccess("Suggestions generated!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get suggestions");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeAlignment = async () => {
    if (!editedContent.trim() || !jobDescription.trim()) {
      setError("Please provide both cover letter and job description");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    try {
      const analysis = await coverLetterService.analyzeAlignment(
        editedContent,
        jobDescription
      );
      setAlignmentAnalysis(analysis);
      setSuccess("Analysis complete!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRefineContent = async () => {
    if (!refinementFeedback.trim()) {
      setError("Please provide feedback for refinement");
      return;
    }

    setIsRefining(true);
    setError("");
    try {
      const refined = await coverLetterService.refineCoverLetter(
        editedContent,
        refinementFeedback
      );
      setEditedContent(refined);
      setRefinementFeedback("");
      setSuccess("Content refined successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refine content");
    } finally {
      setIsRefining(false);
    }
  };

  const handleDownloadPDF = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([editedContent], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${company}_${position}_CoverLetter.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setSuccess("Cover letter downloaded!");
    } catch (err) {
      setError("Failed to download");
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(editedContent);
    setSuccess("Copied to clipboard!");
  };

  const handleBackToPlacementKit = () => {
    navigate('/dashboards/placement-kit');
  };

  // ==== RENDER SECTIONS ====

  if (viewState.type === 'generate') {
    return (
      <DashboardLayout
        title="Generate Cover Letter"
        description="Create a personalized cover letter"
      >
        <div className="p-6 space-y-6 bg-slate-950">
          {/* Error/Success Messages */}
          {error && (
            <div className="rounded-lg p-4 bg-red-500/10 border border-red-500/40 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}
          {success && (
            <div className="rounded-lg p-4 bg-green-500/10 border border-green-500/40 flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-300 text-sm">{success}</span>
            </div>
          )}

          {/* Back Button */}
          <Button
            onClick={() => {
              setViewState({ type: 'list' });
              setCompany("");
              setPosition("");
              setJobDescription("");
              setUserBackground("");
            }}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
          >
            ← Back to Letters
          </Button>

          {/* Form - Keep all existing form code */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Letter Details</h2>
              
              <div className="space-y-4 rounded-2xl p-6 border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g., Google, Microsoft"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-500/40 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Job Position *
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g., Senior Engineer"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-500/40 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Template Style
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-500/40 focus:outline-none transition-all"
                  >
                    {templates.map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.name} - {t.style}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Job Description (Optional)
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description for better personalization"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-500/40 focus:outline-none transition-all h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">
                    Your Background (Optional)
                  </label>
                  <textarea
                    value={userBackground}
                    onChange={(e) => setUserBackground(e.target.value)}
                    placeholder="Brief summary of your experience and skills"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-orange-500/40 focus:outline-none transition-all h-20 resize-none"
                  />
                </div>

                <Button
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 font-semibold shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Templates Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Available Templates</h2>
              <div className="grid grid-cols-1 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.name}
                    onClick={() => setSelectedTemplate(template.name)}
                    className={`relative overflow-hidden rounded-xl p-4 transition-all cursor-pointer border ${
                      selectedTemplate === template.name
                        ? "border-orange-500/60 bg-orange-500/10"
                        : "border-slate-700/50 bg-slate-800/50 hover:border-orange-500/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <p className="font-semibold text-white">{template.name}</p>
                        <p className="text-xs text-slate-400">{template.style}</p>
                      </div>
                      {selectedTemplate === template.name && (
                        <Check className="w-4 h-4 text-orange-400 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ... Keep all other view states (preview, analyze, edit, view-detail) exactly as they are ...

  // Default - LIST VIEW
  return (
    <DashboardLayout
      title="Cover Letter Generator"
      description="Create personalized cover letters tailored to specific jobs"
    >
      <div className="p-6 space-y-8 bg-slate-950">
        {/* Back to Placement Kit Button */}
        <Button
          onClick={() => navigate('/dashboard/skill-development/placement-kit')}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-orange-500/40 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Placement Kit
        </Button>

        {/* Header Section */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl border border-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-red-600/5 to-pink-600/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl"></div>

          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-red-500/0 to-pink-500/0 hover:from-orange-500/5 hover:via-red-500/5 hover:to-pink-500/5 transition-all duration-700 rounded-3xl"></div>

          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-orange-500/30 via-red-500/20 to-pink-500/30"></div>

          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-600/5 to-transparent rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-red-600/5 to-transparent rounded-full translate-x-32 translate-y-32 blur-3xl"></div>

          <div className="relative z-10 space-y-6">
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

              <Button
                onClick={() => setViewState({ type: 'generate' })}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Letter
              </Button>
            </div>
          </div>
        </div>

        {/* Your Cover Letters */}
        {coverLetters.length > 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Cover Letters ({coverLetters.length})</h2>
              <p className="text-slate-400 mt-1">Browse and manage your saved cover letters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coverLetters.map((letter) => (
                <div
                  key={letter.id}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] border border-slate-700/50 hover:border-orange-500/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 transition-all duration-300"></div>

                  <div className="relative z-10 p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                        {letter.company}
                      </h3>
                      <p className="text-sm text-orange-300 mt-1">{letter.position}</p>
                      <Badge className="mt-2 bg-slate-700/50 text-slate-300 text-xs">
                        {letter.template}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-400">Modified {letter.lastModified}</p>

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleViewLetter(letter)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-orange-500/40 text-orange-300 hover:bg-orange-500/20 text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleDuplicateLetter(letter)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-orange-500/40 text-orange-300 hover:bg-orange-500/20 text-xs"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Duplicate
                      </Button>
                      <Button
                        onClick={() => handleDeleteCoverLetter(letter.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500/40 text-red-300 hover:bg-red-500/20 text-xs"
                      >
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

        {/* Empty State */}
        {coverLetters.length === 0 && (
          <div className="rounded-2xl p-12 border border-dashed border-slate-700 bg-slate-900/30 flex flex-col items-center justify-center text-center">
            <FileText className="w-16 h-16 text-slate-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Cover Letters Yet</h3>
            <p className="text-slate-400 mb-6">Create your first personalized cover letter using AI</p>
            <Button
              onClick={() => setViewState({ type: 'generate' })}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Letter
            </Button>
          </div>
        )}

        {/* Templates Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Available Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.name}
                onClick={() => {
                  setSelectedTemplate(template.name);
                  setViewState({ type: 'generate' });
                }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-orange-500/40 p-4 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 transition-all"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                      <p className="font-semibold text-white">{template.name}</p>
                      <p className="text-xs text-slate-400">{template.style}</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-orange-400 group-hover:scale-150 transition-transform"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
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