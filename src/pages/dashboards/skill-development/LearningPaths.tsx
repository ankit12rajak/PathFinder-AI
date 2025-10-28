import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Target, TrendingUp, Award, Clock, CheckCircle2, Sparkles, Brain, ArrowLeft, Download, Share2, Loader2, Zap, Star, Trophy, Rocket, Code, Database, Layout, Server, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_SKILL_API_KEY;

interface LearningPathStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  duration: string;
  resources: {
    type: string;
    title: string;
    url?: string;
  }[];
  skills: string[];
  projects: string[];
  milestones: string[];
}

interface CareerSummary {
  careerGoal: string;
  keyInterests: string[];
  currentLevel: string;
  targetRole: string;
  timeframe: string;
  learningPath: LearningPathStep[];
}

interface DetailedLearningPath {
  career: string;
  overview: string;
  totalDuration: string;
  difficulty: string;
  prerequisites: string[];
  outcomes: string[];
  phases: LearningPathStep[];
  certifications: string[];
  jobMarket: {
    averageSalary: string;
    demandLevel: string;
    topCompanies: string[];
    requiredSkills: string[];
  };
}

const LearningPaths = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [careerSummary, setCareerSummary] = useState<CareerSummary | null>(null);
  const [detailedPath, setDetailedPath] = useState<DetailedLearningPath | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  // Load career summary from location state or localStorage
  useEffect(() => {
    // First try to get from navigation state
    if (location.state?.careerSummary) {
      const summary = location.state.careerSummary as CareerSummary;
      setCareerSummary(summary);
      localStorage.setItem('careerSummary', JSON.stringify(summary));
      generateDetailedLearningPath(summary);
    } else {
      // Try to get from localStorage
      const savedSummary = localStorage.getItem('careerSummary');
      if (savedSummary) {
        try {
          const summary = JSON.parse(savedSummary) as CareerSummary;
          setCareerSummary(summary);
          generateDetailedLearningPath(summary);
        } catch (e) {
          console.error('Error parsing saved career summary:', e);
          setError('No career data found. Please complete the career advisor chat first.');
        }
      } else {
        setError('No career data found. Please complete the career advisor chat first.');
      }
    }
  }, [location]);

  const generateDetailedLearningPath = async (summary: CareerSummary) => {
    setIsGenerating(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const prompt = `Create an extremely detailed, comprehensive learning path for someone who wants to become a ${summary.targetRole}.

CONTEXT:
- Career Goal: ${summary.careerGoal}
- Target Role: ${summary.targetRole}
- Current Level: ${summary.currentLevel}
- Key Interests: ${summary.keyInterests.join(', ')}
- Timeframe: ${summary.timeframe}

Generate a professional, actionable learning roadmap with the following structure:

CRITICAL: Respond with ONLY valid JSON. No markdown, no code blocks, no explanations.

Required JSON structure:
{
  "career": "${summary.targetRole}",
  "overview": "Comprehensive 2-3 sentence overview of this career path and what makes it exciting",
  "totalDuration": "Realistic total time estimate (e.g., '8-12 months', '1-2 years')",
  "difficulty": "Beginner-Friendly/Intermediate/Advanced/Expert-Level",
  "prerequisites": ["Prerequisite 1", "Prerequisite 2", "Prerequisite 3"],
  "outcomes": [
    "Specific skill outcome 1",
    "Specific skill outcome 2",
    "Specific skill outcome 3",
    "Career opportunity 1",
    "Career opportunity 2"
  ],
  "phases": [
    {
      "id": "phase-1",
      "phase": "Foundation",
      "title": "Building Strong Fundamentals",
      "description": "Detailed description of what this phase covers and why it's important",
      "duration": "4-6 weeks",
      "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
      "resources": [
        {
          "type": "Course",
          "title": "Specific course name",
          "url": "https://example.com"
        },
        {
          "type": "Book",
          "title": "Specific book name",
          "url": ""
        },
        {
          "type": "Documentation",
          "title": "Official docs or guide",
          "url": "https://example.com"
        },
        {
          "type": "Video",
          "title": "YouTube tutorial or series",
          "url": "https://youtube.com"
        }
      ],
      "projects": [
        "Beginner project 1 with specific description",
        "Beginner project 2 with specific description"
      ],
      "milestones": [
        "Concrete achievement 1",
        "Concrete achievement 2",
        "Concrete achievement 3"
      ]
    }
  ],
  "certifications": [
    "Relevant certification 1",
    "Relevant certification 2",
    "Relevant certification 3"
  ],
  "jobMarket": {
    "averageSalary": "$XX,XXX - $XXX,XXX per year",
    "demandLevel": "High/Very High/Moderate/Growing",
    "topCompanies": ["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"],
    "requiredSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"]
  }
}

REQUIREMENTS:
1. Create 4-6 progressive phases (Foundation, Intermediate, Advanced, Specialization, etc.)
2. Each phase should have 5-8 specific skills
3. Include 4-6 diverse resources per phase (courses, books, docs, videos)
4. Suggest 2-3 hands-on projects per phase
5. Define 3-5 clear milestones per phase
6. Make everything SPECIFIC and ACTIONABLE (real course names, actual books, real platforms)
7. Tailor to ${summary.currentLevel} level
8. Focus on ${summary.keyInterests.join(', ')} interests
9. Include real-world job market data
10. Suggest industry-recognized certifications
11. Make it practical and achievable within ${summary.timeframe}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      console.log('🤖 Learning Path Response (first 300 chars):', text.substring(0, 300));

      // Clean JSON
      text = text.trim();
      if (text.startsWith('```json')) {
        text = text.replace(/```json\s*/, '').replace(/```\s*$/, '');
      } else if (text.startsWith('```')) {
        text = text.replace(/```\s*/, '').replace(/```\s*$/, '');
      }

      const startIndex = text.indexOf('{');
      const lastIndex = text.lastIndexOf('}');
      if (startIndex === -1 || lastIndex === -1) {
        throw new Error('No valid JSON found in response');
      }
      text = text.substring(startIndex, lastIndex + 1);

      const path: DetailedLearningPath = JSON.parse(text);

      // Validate and ensure IDs
      path.phases = path.phases.map((phase, index) => ({
        ...phase,
        id: phase.id || `phase-${index + 1}`
      }));

      console.log('✅ Detailed learning path generated:', path.career);
      setDetailedPath(path);

    } catch (error) {
      console.error('❌ Error generating learning path:', error);
      setError('Failed to generate learning path. Please try again or go back to career advisor.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getPhaseIcon = (index: number) => {
    const icons = [Target, Lightbulb, Code, Database, Server, Layout, Rocket, Trophy];
    const Icon = icons[index % icons.length];
    return Icon;
  };

  const downloadPath = () => {
    if (!detailedPath) return;

    const content = `
# ${detailedPath.career} Learning Path

## Overview
${detailedPath.overview}

**Duration:** ${detailedPath.totalDuration}
**Difficulty:** ${detailedPath.difficulty}

## Prerequisites
${detailedPath.prerequisites.map(p => `- ${p}`).join('\n')}

## Learning Outcomes
${detailedPath.outcomes.map(o => `- ${o}`).join('\n')}

## Phases

${detailedPath.phases.map((phase, index) => `
### Phase ${index + 1}: ${phase.title}
**Duration:** ${phase.duration}

${phase.description}

**Skills to Learn:**
${phase.skills.map(s => `- ${s}`).join('\n')}

**Resources:**
${phase.resources.map(r => `- ${r.type}: ${r.title}${r.url ? ` (${r.url})` : ''}`).join('\n')}

**Projects:**
${phase.projects.map(p => `- ${p}`).join('\n')}

**Milestones:**
${phase.milestones.map(m => `- ${m}`).join('\n')}
`).join('\n---\n')}

## Recommended Certifications
${detailedPath.certifications.map(c => `- ${c}`).join('\n')}

## Job Market Insights
- **Average Salary:** ${detailedPath.jobMarket.averageSalary}
- **Demand Level:** ${detailedPath.jobMarket.demandLevel}
- **Top Companies:** ${detailedPath.jobMarket.topCompanies.join(', ')}

**In-Demand Skills:**
${detailedPath.jobMarket.requiredSkills.map(s => `- ${s}`).join('\n')}

---
Generated by PathFinder AI
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${detailedPath.career.replace(/\s+/g, '-')}-learning-path.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (error && !careerSummary) {
    return (
      <DashboardLayout
        title="Learning Path"
        description="Generate your personalized learning roadmap"
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 flex items-center justify-center">
          <Card className="max-w-md border-slate-800 bg-slate-900/50">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">No Career Data Found</h3>
              <p className="text-slate-400">{error}</p>
              <Button
                onClick={() => navigate('/career-advisor')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go to Career Advisor
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (isGenerating) {
    return (
      <DashboardLayout
        title="Learning Path"
        description="Generate your personalized learning roadmap"
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 flex items-center justify-center">
          <Card className="max-w-md border-slate-800 bg-slate-900/50">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-white">Generating Your Learning Path</h3>
              <p className="text-slate-400">Creating a personalized roadmap for your career journey...</p>
              <div className="space-y-2">
                <Progress value={33} className="h-2" />
                <p className="text-xs text-slate-500">Analyzing career requirements...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Learning Path"
      description="Your personalized career development roadmap"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate('/career-advisor')}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Advisor
            </Button>
            {detailedPath && (
              <div className="flex gap-2">
                <Button
                  onClick={downloadPath}
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            )}
          </div>

          {detailedPath && (
            <>
              {/* Career Overview */}
              <Card className="border-slate-800 bg-gradient-to-br from-purple-900/20 via-slate-900/50 to-indigo-900/20 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{detailedPath.career}</h1>
                        <p className="text-slate-300 leading-relaxed">{detailedPath.overview}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {detailedPath.totalDuration}
                        </Badge>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-3 py-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {detailedPath.difficulty}
                        </Badge>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 py-1">
                          <Award className="w-3 h-3 mr-1" />
                          {detailedPath.phases.length} Phases
                        </Badge>
                        <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-3 py-1">
                          <Star className="w-3 h-3 mr-1" />
                          {detailedPath.certifications.length} Certifications
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Sidebar - Quick Info */}
                <div className="space-y-6">
                  
                  {/* Prerequisites */}
                  <Card className="border-slate-800 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        Prerequisites
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {detailedPath.prerequisites.map((prereq, index) => (
                          <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {prereq}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Job Market */}
                  <Card className="border-slate-800 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-400" />
                        Job Market
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Average Salary</p>
                        <p className="text-lg font-bold text-emerald-400">{detailedPath.jobMarket.averageSalary}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Demand Level</p>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                          {detailedPath.jobMarket.demandLevel}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-2">Top Companies</p>
                        <div className="flex flex-wrap gap-2">
                          {detailedPath.jobMarket.topCompanies.slice(0, 5).map((company, index) => (
                            <Badge key={index} variant="outline" className="border-slate-700 text-slate-300 text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card className="border-slate-800 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-400" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {detailedPath.certifications.map((cert, index) => (
                          <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                            <Star className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content - Learning Phases */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Learning Outcomes */}
                  <Card className="border-slate-800 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-blue-400" />
                        What You'll Achieve
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {detailedPath.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-2 bg-slate-800/50 rounded-lg p-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-slate-300">{outcome}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phase Tabs */}
                  <Card className="border-slate-800 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        Learning Phases
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        Follow these phases step-by-step to master your career path
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Phase Navigation */}
                      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {detailedPath.phases.map((phase, index) => {
                          const Icon = getPhaseIcon(index);
                          return (
                            <Button
                              key={phase.id}
                              onClick={() => setSelectedPhase(index)}
                              variant={selectedPhase === index ? "default" : "outline"}
                              size="sm"
                              className={`flex-shrink-0 ${
                                selectedPhase === index
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                                  : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                              }`}
                            >
                              <Icon className="w-4 h-4 mr-2" />
                              Phase {index + 1}
                            </Button>
                          );
                        })}
                      </div>

                      {/* Selected Phase Content */}
                      <ScrollArea className="h-[600px] pr-4">
                        {detailedPath.phases[selectedPhase] && (
                          <div className="space-y-6">
                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                  {React.createElement(getPhaseIcon(selectedPhase), { className: "w-6 h-6 text-white" })}
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-white">{detailedPath.phases[selectedPhase].title}</h3>
                                  <p className="text-sm text-slate-400">{detailedPath.phases[selectedPhase].phase} • {detailedPath.phases[selectedPhase].duration}</p>
                                </div>
                              </div>
                              <p className="text-slate-300 leading-relaxed">{detailedPath.phases[selectedPhase].description}</p>
                            </div>

                            {/* Skills */}
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                Skills You'll Learn
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {detailedPath.phases[selectedPhase].skills.map((skill, idx) => (
                                  <Badge key={idx} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Resources */}
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-purple-400" />
                                Learning Resources
                              </h4>
                              <div className="space-y-2">
                                {detailedPath.phases[selectedPhase].resources.map((resource, idx) => (
                                  <div key={idx} className="bg-slate-800/50 rounded-lg p-3 flex items-start gap-3 hover:bg-slate-800 transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center">
                                      <BookOpen className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="border-slate-700 text-slate-400 text-xs">
                                          {resource.type}
                                        </Badge>
                                        <p className="text-sm font-medium text-white">{resource.title}</p>
                                      </div>
                                      {resource.url && (
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300">
                                          {resource.url}
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Projects */}
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <Code className="w-5 h-5 text-emerald-400" />
                                Hands-on Projects
                              </h4>
                              <div className="space-y-2">
                                {detailedPath.phases[selectedPhase].projects.map((project, idx) => (
                                  <div key={idx} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-slate-300">{project}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Milestones */}
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5 text-amber-400" />
                                Milestones
                              </h4>
                              <div className="space-y-2">
                                {detailedPath.phases[selectedPhase].milestones.map((milestone, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                                      <Trophy className="w-3 h-3 text-amber-400" />
                                    </div>
                                    <p className="text-sm text-slate-300">{milestone}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearningPaths;