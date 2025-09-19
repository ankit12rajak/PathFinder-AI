import React, { useState, useEffect } from "react";
import { BarChart3, Target, TrendingUp, AlertCircle, CheckCircle, User, Code, Download, Settings, Brain, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  UserSkill, 
  TargetRole, 
  skillTrends,
  systemTargetRoles,
  masterSkills,
  getSkillById,
  getTrendBySkill 
} from "@/data/skillsData";
import TargetRoleManager from "@/components/TargetRoleManager";
import SkillInputInterface from "@/components/SkillInputInterface";
import DynamicLearningPaths from "@/components/DynamicLearningPaths";
import GeminiTest from "@/components/GeminiTest";
import DynamicQuiz from "@/components/DynamicQuiz";
import QuizResults from "@/components/QuizResults";
import { GapAnalysisResult, LearningPath } from "@/services/geminiService";

const SkillGapAnalysis = () => {
  // State Management
  const [selectedRole, setSelectedRole] = useState<TargetRole | null>(null);
  const [customRoles, setCustomRoles] = useState<TargetRole[]>([]);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [completedResources, setCompletedResources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Quiz-related state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState<GapAnalysisResult | null>(null);
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  // Initialize with first system role
  useEffect(() => {
    if (!selectedRole && systemTargetRoles.length > 0) {
      setSelectedRole(systemTargetRoles[0]);
    }
  }, [selectedRole]);

  // Initialize user skills based on selected role
  useEffect(() => {
    if (selectedRole && userSkills.length === 0) {
      const initialSkills: UserSkill[] = selectedRole.requiredSkills.map(req => {
        const masterSkill = getSkillById(req.skillId);
        if (!masterSkill) return null;
        
        return {
          ...masterSkill,
          currentLevel: Math.floor(Math.random() * 60) + 10, // Random current levels for demo
          targetLevel: req.minimumLevel,
          assessmentMethod: 'self' as const,
          lastAssessed: new Date(),
          confidence: Math.floor(Math.random() * 40) + 50
        };
      }).filter(Boolean) as UserSkill[];
      
      setUserSkills(initialSkills);
    }
  }, [selectedRole, userSkills.length]);

  // Event Handlers
  const handleRoleSelect = (role: TargetRole) => {
    setSelectedRole(role);
    // Reset user skills for new role
    setUserSkills([]);
  };

  const handleRoleCreate = (role: TargetRole) => {
    setCustomRoles(prev => [...prev, role]);
    setSelectedRole(role);
  };

  const handleRoleUpdate = (role: TargetRole) => {
    setCustomRoles(prev => prev.map(r => r.id === role.id ? role : r));
    if (selectedRole?.id === role.id) {
      setSelectedRole(role);
    }
  };

  const handleSkillUpdate = (skillId: string, currentLevel: number, targetLevel: number, assessmentMethod: 'self' | 'quiz' | 'project' | 'combined') => {
    setUserSkills(prev => {
      const existing = prev.find(s => s.id === skillId);
      const masterSkill = getSkillById(skillId);
      
      if (!masterSkill) return prev;
      
      if (existing) {
        return prev.map(s => 
          s.id === skillId 
            ? { ...s, currentLevel, targetLevel, assessmentMethod, lastAssessed: new Date() }
            : s
        );
      } else {
        return [...prev, {
          ...masterSkill,
          currentLevel,
          targetLevel,
          assessmentMethod,
          lastAssessed: new Date(),
          confidence: assessmentMethod === 'self' ? 70 : 85
        }];
      }
    });
  };

  const handleResourceStart = (resourceId: string) => {
    // Mark resource as started/completed
    setCompletedResources(prev => [...prev, resourceId]);
  };

  // Quiz handlers
  const handleStartQuiz = () => {
    if (!selectedRole) return;
    setShowQuiz(true);
    setQuizResults(null);
  };

  const handleQuizComplete = (results: GapAnalysisResult) => {
    setQuizResults(results);
    setShowQuiz(false);
    
    // Update user skills based on quiz results
    if (results.skillGaps && selectedRole) {
      const updatedSkills: UserSkill[] = results.skillGaps.map(gap => {
        const masterSkill = masterSkills.find(ms => ms.name.toLowerCase().includes(gap.skill.toLowerCase()));
        if (masterSkill) {
          return {
            ...masterSkill,
            currentLevel: gap.currentLevel,
            targetLevel: gap.requiredLevel,
            assessmentMethod: 'quiz' as const,
            lastAssessed: new Date(),
            confidence: 90
          };
        }
        return null;
      }).filter(Boolean) as UserSkill[];
      
      setUserSkills(prev => {
        const merged = [...prev];
        updatedSkills.forEach(newSkill => {
          const existingIndex = merged.findIndex(s => s.id === newSkill.id);
          if (existingIndex >= 0) {
            merged[existingIndex] = newSkill;
          } else {
            merged.push(newSkill);
          }
        });
        return merged;
      });
    }
  };

  const handleRetakeQuiz = () => {
    setQuizResults(null);
    setShowQuiz(true);
  };

  const handleStartLearningPath = (path: LearningPath) => {
    // Navigate to learning path or save to user's learning plan
    console.log('Starting learning path:', path);
    // You could integrate with a learning management system here
  };

  const handleCloseQuizResults = () => {
    setQuizResults(null);
  };

  const handleExportReport = () => {
    if (!selectedRole) return;
    
    const report = {
      role: selectedRole.name,
      timestamp: new Date().toISOString(),
      skills: userSkills.map(skill => ({
        name: skill.name,
        currentLevel: skill.currentLevel,
        targetLevel: skill.targetLevel,
        gap: skill.targetLevel - skill.currentLevel,
        assessmentMethod: skill.assessmentMethod
      })),
      overallReadiness: calculateOverallReadiness()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skill-gap-analysis-${selectedRole.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calculations
  const calculateOverallReadiness = (): number => {
    if (!selectedRole || userSkills.length === 0) return 0;
    
    const weightedScore = selectedRole.requiredSkills.reduce((sum, req) => {
      const userSkill = userSkills.find(us => us.id === req.skillId);
      const currentLevel = userSkill?.currentLevel || 0;
      const achievement = Math.min(currentLevel / req.minimumLevel, 1);
      return sum + (achievement * req.weight);
    }, 0);
    
    const totalWeight = selectedRole.requiredSkills.reduce((sum, req) => sum + req.weight, 0);
    return Math.round((weightedScore / totalWeight) * 100);
  };

  const getSkillGaps = () => {
    if (!selectedRole) return [];
    
    return selectedRole.requiredSkills.map(req => {
      const userSkill = userSkills.find(us => us.id === req.skillId);
      const masterSkill = getSkillById(req.skillId);
      const currentLevel = userSkill?.currentLevel || 0;
      const gap = Math.max(0, req.minimumLevel - currentLevel);
      
      return {
        skillId: req.skillId,
        skillName: masterSkill?.name || req.skillId,
        currentLevel,
        targetLevel: req.minimumLevel,
        gap,
        importance: req.importance,
        status: gap === 0 ? 'strong' : gap <= 15 ? 'developing' : gap <= 30 ? 'gap' : 'critical'
      };
    }).sort((a, b) => b.gap - a.gap);
  };

  const getSkillsByStatus = () => {
    const gaps = getSkillGaps();
    return {
      strong: gaps.filter(g => g.status === 'strong').length,
      developing: gaps.filter(g => g.status === 'developing').length,
      gap: gaps.filter(g => g.status === 'gap').length,
      critical: gaps.filter(g => g.status === 'critical').length
    };
  };

  // UI Helper Functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong": return "text-green-600 bg-green-100";
      case "developing": return "text-blue-600 bg-blue-100";
      case "gap": return "text-orange-600 bg-orange-100";
      case "critical": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "strong": return <CheckCircle className="w-4 h-4" />;
      case "developing": return <TrendingUp className="w-4 h-4" />;
      case "gap": case "critical": return <AlertCircle className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout 
        title="Skill Gap Analysis" 
        description="Analyze your current skills and identify areas for improvement"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  const overallScore = calculateOverallReadiness();
  const skillsByStatus = getSkillsByStatus();
  const skillGaps = getSkillGaps();

  // Show quiz if active
  if (showQuiz && selectedRole) {
    return (
      <DashboardLayout 
        title="Skill Assessment Quiz" 
        description={`Take a comprehensive skill test for ${selectedRole.name}`}
      >
        <div className="p-6">
          <DynamicQuiz
            role={selectedRole.name}
            skillLevel={skillLevel}
            onQuizComplete={handleQuizComplete}
            onCancel={() => setShowQuiz(false)}
          />
        </div>
      </DashboardLayout>
    );
  }

  // Show quiz results if available
  if (quizResults && selectedRole) {
    return (
      <DashboardLayout 
        title="Quiz Results" 
        description={`Your skill assessment results for ${selectedRole.name}`}
      >
        <div className="p-6">
          <QuizResults
            results={quizResults}
            role={selectedRole.name}
            onRetakeQuiz={handleRetakeQuiz}
            onStartLearning={handleStartLearningPath}
            onClose={handleCloseQuizResults}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Skill Gap Analysis" 
      description="Analyze your current skills and identify areas for improvement"
    >
      <div className="p-6 space-y-8">
        {/* Overall Assessment */}
        {selectedRole && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-6 h-6" />
                  Your Skill Assessment
                </h2>
                <p className="text-muted-foreground">Based on requirements for {selectedRole.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{overallScore}%</div>
                  <div className="text-sm text-muted-foreground">Overall Readiness</div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button onClick={handleStartQuiz} className="min-w-[140px]">
                    <Brain className="w-4 h-4 mr-2" />
                    Take Skill Test
                  </Button>
                  <Button variant="outline" onClick={handleExportReport}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["strong", "developing", "gap", "critical"].map((status) => {
                const count = skillsByStatus[status as keyof typeof skillsByStatus];
                return (
                  <div key={status} className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm capitalize">{status} Skills</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Tabs defaultValue="roles" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="roles">Target Roles</TabsTrigger>
        <TabsTrigger value="assessment">Skill Assessment</TabsTrigger>
        <TabsTrigger value="analysis">Gap Analysis</TabsTrigger>
        <TabsTrigger value="learning">Learning Path</TabsTrigger>
      </TabsList>

          {/* Target Roles Tab */}
          <TabsContent value="roles">
            <TargetRoleManager
              selectedRole={selectedRole}
              onRoleSelect={handleRoleSelect}
              onRoleCreate={handleRoleCreate}
              onRoleUpdate={handleRoleUpdate}
              customRoles={customRoles}
            />
          </TabsContent>

          {/* Skill Assessment Tab */}
          <TabsContent value="assessment">
            <SkillInputInterface
              userSkills={userSkills}
              onSkillUpdate={handleSkillUpdate}
              onSkillsUpdate={setUserSkills}
            />
          </TabsContent>

          {/* Gap Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            {selectedRole ? (
              <>
                {/* Skill Gap Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Gap Analysis</CardTitle>
                    <CardDescription>Detailed breakdown of your skill gaps for {selectedRole.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {skillGaps.map((gap, index) => (
                        <div key={gap.skillId} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{gap.skillName}</span>
                              <Badge className={`${getStatusColor(gap.status)} border-0`}>
                                {getStatusIcon(gap.status)}
                                <span className="ml-1 capitalize">{gap.status}</span>
                              </Badge>
                              <Badge variant="outline">{gap.importance}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {gap.currentLevel}% / {gap.targetLevel}%
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Your Level</span>
                              <span>Required Level</span>
                            </div>
                            <div className="relative">
                              <Progress value={gap.targetLevel} className="h-3 bg-gray-200" />
                              <Progress 
                                value={gap.currentLevel} 
                                className="h-3 absolute top-0 bg-transparent" 
                              />
                            </div>
                          </div>
                          
                          {gap.gap > 0 && (
                            <div className="text-sm text-muted-foreground">
                              Gap: {gap.gap}% improvement needed
                              {gap.gap > 30 && (
                                <span className="text-red-600 font-medium"> (High Priority)</span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Target Role</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose a target role to see detailed skill gap analysis
                  </p>
                  <Button onClick={() => setSelectedRole(systemTargetRoles[0])}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Market Trends removed as per request */}

          {/* Learning Path Tab */}
          <TabsContent value="learning">
            {selectedRole ? (
              <DynamicLearningPaths
                userSkills={userSkills}
                targetRole={selectedRole}
                onResourceStart={handleResourceStart}
                completedResources={completedResources}
              />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Code className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Target Role First</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose your target role to get personalized learning recommendations
                  </p>
                  <Button onClick={() => setSelectedRole(systemTargetRoles[0])}>
                    Choose Target Role
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* API Test tab removed */}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SkillGapAnalysis;