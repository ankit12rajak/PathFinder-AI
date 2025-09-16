import React, { useState, useEffect } from "react";
import { BarChart3, Target, TrendingUp, AlertCircle, CheckCircle, User, Code, Download, Settings } from "lucide-react";
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

const SkillGapAnalysis = () => {
  // State Management
  const [selectedRole, setSelectedRole] = useState<TargetRole | null>(null);
  const [customRoles, setCustomRoles] = useState<TargetRole[]>([]);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [completedResources, setCompletedResources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
                <Button variant="outline" onClick={handleExportReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="roles">Target Roles</TabsTrigger>
            <TabsTrigger value="assessment">Skill Assessment</TabsTrigger>
            <TabsTrigger value="analysis">Gap Analysis</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
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

          {/* Market Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Skill Trends</CardTitle>
                <CardDescription>Most in-demand skills and their growth rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillTrends.map((trend, index) => {
                    const skill = getSkillById(trend.skillId);
                    if (!skill) return null;
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium">{skill.name}</div>
                          <div className="text-sm text-muted-foreground">Market Demand: {trend.demand}%</div>
                          <div className="text-xs text-muted-foreground">
                            {trend.jobCount.toLocaleString()} jobs • Avg. salary impact: +{trend.averageSalaryImpact}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{trend.growth}</div>
                          <div className="text-sm text-muted-foreground">Growth Rate</div>
                          <div className="text-xs text-muted-foreground">
                            Top: {trend.topCompanies.slice(0, 2).join(', ')}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800">Priority Skills</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Focus on {skillGaps.filter(g => g.status === 'critical').slice(0, 2).map(g => g.skillName).join(' and ')} to close critical gaps
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800">Emerging Opportunities</h4>
                    <p className="text-sm text-green-600 mt-1">
                      {skillTrends.slice(0, 2).map(t => getSkillById(t.skillId)?.name).filter(Boolean).join(' and ')} show high growth potential
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800">Market Alignment</h4>
                    <p className="text-sm text-orange-600 mt-1">
                      Your skill profile aligns {overallScore}% with current {selectedRole?.name || 'target role'} market demands
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SkillGapAnalysis;