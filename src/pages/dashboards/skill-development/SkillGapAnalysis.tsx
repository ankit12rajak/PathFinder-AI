import { useState } from "react";
import {
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Award,
  Zap,
  Download,
  BarChart3,
  Brain,
  Star,
  BookOpen,
  Clock,
  Users,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronRight,
  RotateCcw,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";

// ============ TypeScript Interfaces ============
interface SkillItem {
  id: string;
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  importance: 'High' | 'Medium' | 'Low';
  trend: 'up' | 'down' | 'stable';
  marketDemand: number;
}

interface AssessmentQuestion {
  id: string;
  skillId: string;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface SkillAssessment {
  skillId: string;
  completed: boolean;
  score: number;
  questionsAnswered: number;
  assessmentTime: number;
}

interface ProfessionalRole {
  id: string;
  name: string;
  level: string;
  demand: string;
  salary: string;
  growth: string;
  description: string;
  keyResponsibilities: string[];
}

interface LearningResource {
  name: string;
  provider: string;
  duration: string;
  rating: number;
}

interface RoleResources {
  courses: LearningResource[];
  projects: (LearningResource & { difficulty: string })[];
  certifications: string[];
}

// ============ Assessment Questions ============
const assessmentQuestions: { [key: string]: AssessmentQuestion[] } = {
  react: [
    {
      id: 'react-1',
      skillId: 'react',
      question: 'What is the primary purpose of React hooks?',
      options: ['To style components', 'To manage state and side effects in functional components', 'To connect to databases', 'To optimize CSS'],
      correct: 1,
      difficulty: 'beginner'
    },
    {
      id: 'react-2',
      skillId: 'react',
      question: 'How do you pass data from child to parent component?',
      options: ['Using props directly', 'Using callback functions through props', 'Using global state only', 'Direct DOM manipulation'],
      correct: 1,
      difficulty: 'intermediate'
    },
    {
      id: 'react-3',
      skillId: 'react',
      question: 'What does React.memo prevent?',
      options: ['Memory leaks', 'Unnecessary re-renders', 'API calls', 'State mutations'],
      correct: 1,
      difficulty: 'advanced'
    }
  ],
  typescript: [
    {
      id: 'ts-1',
      skillId: 'typescript',
      question: 'What is the main benefit of TypeScript generics?',
      options: ['Faster code execution', 'Type safety with flexible types', 'Reduced bundle size', 'Runtime performance'],
      correct: 1,
      difficulty: 'intermediate'
    },
    {
      id: 'ts-2',
      skillId: 'typescript',
      question: 'How do you define optional properties in an interface?',
      options: ['Using ? symbol', 'Using undefined', 'Using null', 'Using unknown'],
      correct: 0,
      difficulty: 'beginner'
    }
  ]
};

// ============ Professional Roles Data ============
const professionalRoles: ProfessionalRole[] = [
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    level: 'Senior',
    demand: 'High',
    salary: '$95,000 - $140,000',
    growth: '+15%',
    description: 'Build end-to-end web applications with modern technologies',
    keyResponsibilities: ['Frontend & Backend Development', 'Database Design', 'API Integration', 'Performance Optimization']
  },
  {
    id: 'frontend',
    name: 'Frontend Developer',
    level: 'Mid-Level',
    demand: 'Very High',
    salary: '$80,000 - $120,000',
    growth: '+22%',
    description: 'Create exceptional user experiences with cutting-edge frontend technologies',
    keyResponsibilities: ['UI/UX Implementation', 'Performance Optimization', 'Cross-browser Compatibility', 'Accessibility Standards']
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    level: 'Senior',
    demand: 'High',
    salary: '$90,000 - $135,000',
    growth: '+18%',
    description: 'Design and implement scalable server-side applications and APIs',
    keyResponsibilities: ['API Development', 'Database Architecture', 'System Security', 'Microservices Design']
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    level: 'Senior',
    demand: 'Medium',
    salary: '$100,000 - $150,000',
    growth: '+20%',
    description: 'Streamline development workflows and manage cloud infrastructure',
    keyResponsibilities: ['CI/CD Pipelines', 'Infrastructure as Code', 'Container Orchestration', 'System Monitoring']
  }
];

// ============ Role Skills Data ============
const roleSkillsData: { [key: string]: SkillItem[] } = {
  fullstack: [
    { id: 'react', name: 'React', category: 'Frontend', currentLevel: 0, targetLevel: 90, importance: 'High', trend: 'up', marketDemand: 95 },
    { id: 'typescript', name: 'TypeScript', category: 'Programming', currentLevel: 0, targetLevel: 85, importance: 'High', trend: 'up', marketDemand: 88 },
    { id: 'nodejs', name: 'Node.js', category: 'Backend', currentLevel: 0, targetLevel: 80, importance: 'High', trend: 'up', marketDemand: 82 },
    { id: 'mongodb', name: 'MongoDB', category: 'Database', currentLevel: 0, targetLevel: 75, importance: 'Medium', trend: 'stable', marketDemand: 70 },
    { id: 'aws', name: 'AWS', category: 'Cloud', currentLevel: 0, targetLevel: 75, importance: 'High', trend: 'up', marketDemand: 90 },
    { id: 'docker', name: 'Docker', category: 'DevOps', currentLevel: 0, targetLevel: 70, importance: 'Medium', trend: 'up', marketDemand: 85 },
    { id: 'graphql', name: 'GraphQL', category: 'API', currentLevel: 0, targetLevel: 65, importance: 'Medium', trend: 'up', marketDemand: 65 },
    { id: 'testing', name: 'Testing (Jest/Cypress)', category: 'Quality', currentLevel: 0, targetLevel: 70, importance: 'Medium', trend: 'stable', marketDemand: 75 }
  ],
  frontend: [
    { id: 'react', name: 'React', category: 'Frontend', currentLevel: 0, targetLevel: 95, importance: 'High', trend: 'up', marketDemand: 95 },
    { id: 'typescript', name: 'TypeScript', category: 'Programming', currentLevel: 0, targetLevel: 90, importance: 'High', trend: 'up', marketDemand: 88 },
    { id: 'nextjs', name: 'Next.js', category: 'Framework', currentLevel: 0, targetLevel: 85, importance: 'High', trend: 'up', marketDemand: 85 },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Styling', currentLevel: 0, targetLevel: 80, importance: 'Medium', trend: 'up', marketDemand: 78 },
    { id: 'webpack', name: 'Webpack/Vite', category: 'Build Tools', currentLevel: 0, targetLevel: 70, importance: 'Medium', trend: 'stable', marketDemand: 70 },
    { id: 'figma', name: 'Figma/Design', category: 'Design', currentLevel: 0, targetLevel: 75, importance: 'Medium', trend: 'up', marketDemand: 80 },
    { id: 'accessibility', name: 'Web Accessibility', category: 'Standards', currentLevel: 0, targetLevel: 70, importance: 'Medium', trend: 'up', marketDemand: 65 },
    { id: 'performance', name: 'Performance Optimization', category: 'Optimization', currentLevel: 0, targetLevel: 75, importance: 'High', trend: 'up', marketDemand: 85 }
  ],
  backend: [
    { id: 'nodejs', name: 'Node.js', category: 'Runtime', currentLevel: 0, targetLevel: 90, importance: 'High', trend: 'up', marketDemand: 82 },
    { id: 'python', name: 'Python', category: 'Programming', currentLevel: 0, targetLevel: 85, importance: 'High', trend: 'up', marketDemand: 90 },
    { id: 'postgresql', name: 'PostgreSQL', category: 'Database', currentLevel: 0, targetLevel: 80, importance: 'High', trend: 'stable', marketDemand: 85 },
    { id: 'redis', name: 'Redis', category: 'Caching', currentLevel: 0, targetLevel: 70, importance: 'Medium', trend: 'up', marketDemand: 75 },
    { id: 'microservices', name: 'Microservices', category: 'Architecture', currentLevel: 0, targetLevel: 75, importance: 'High', trend: 'up', marketDemand: 88 },
    { id: 'kubernetes', name: 'Kubernetes', category: 'Orchestration', currentLevel: 0, targetLevel: 70, importance: 'High', trend: 'up', marketDemand: 85 },
    { id: 'api-design', name: 'API Design', category: 'Architecture', currentLevel: 0, targetLevel: 85, importance: 'High', trend: 'stable', marketDemand: 80 },
    { id: 'security', name: 'Security Best Practices', category: 'Security', currentLevel: 0, targetLevel: 80, importance: 'High', trend: 'up', marketDemand: 90 }
  ],
  devops: [
    { id: 'aws', name: 'AWS', category: 'Cloud', currentLevel: 0, targetLevel: 90, importance: 'High', trend: 'up', marketDemand: 90 },
    { id: 'docker', name: 'Docker', category: 'Containerization', currentLevel: 0, targetLevel: 90, importance: 'High', trend: 'up', marketDemand: 85 },
    { id: 'kubernetes', name: 'Kubernetes', category: 'Orchestration', currentLevel: 0, targetLevel: 85, importance: 'High', trend: 'up', marketDemand: 85 },
    { id: 'terraform', name: 'Terraform', category: 'IaC', currentLevel: 0, targetLevel: 80, importance: 'High', trend: 'up', marketDemand: 82 },
    { id: 'jenkins', name: 'Jenkins/CI-CD', category: 'Automation', currentLevel: 0, targetLevel: 80, importance: 'High', trend: 'stable', marketDemand: 78 },
    { id: 'monitoring', name: 'Monitoring (Prometheus)', category: 'Observability', currentLevel: 0, targetLevel: 75, importance: 'Medium', trend: 'up', marketDemand: 80 },
    { id: 'linux', name: 'Linux Administration', category: 'Systems', currentLevel: 0, targetLevel: 85, importance: 'High', trend: 'stable', marketDemand: 85 },
    { id: 'scripting', name: 'Bash/Python Scripting', category: 'Automation', currentLevel: 0, targetLevel: 80, importance: 'Medium', trend: 'stable', marketDemand: 75 }
  ]
};

// ============ Learning Resources ============
const learningResources: { [key: string]: RoleResources } = {
  fullstack: {
    courses: [
      { name: 'Full Stack Web Development Bootcamp', provider: 'Tech Academy', duration: '12 weeks', rating: 4.8 },
      { name: 'MERN Stack Masterclass', provider: 'CodeMaster', duration: '8 weeks', rating: 4.7 },
      { name: 'Advanced React & Node.js', provider: 'DevPro', duration: '10 weeks', rating: 4.9 }
    ],
    projects: [
      { name: 'E-commerce Platform', difficulty: 'Advanced', duration: '4-6 weeks', provider: 'Self', rating: 5 },
      { name: 'Social Media Dashboard', difficulty: 'Intermediate', duration: '3-4 weeks', provider: 'Self', rating: 5 },
      { name: 'Real-time Chat Application', difficulty: 'Advanced', duration: '2-3 weeks', provider: 'Self', rating: 5 }
    ],
    certifications: ['AWS Certified Developer', 'MongoDB Certified Developer', 'React Professional Certificate']
  },
  frontend: {
    courses: [
      { name: 'Advanced React Development', provider: 'Frontend Masters', duration: '6 weeks', rating: 4.9 },
      { name: 'Modern CSS & Design Systems', provider: 'Design Code', duration: '4 weeks', rating: 4.8 },
      { name: 'TypeScript for React Developers', provider: 'TypeScript Academy', duration: '5 weeks', rating: 4.7 }
    ],
    projects: [
      { name: 'Component Library', difficulty: 'Advanced', duration: '3-4 weeks', provider: 'Self', rating: 5 },
      { name: 'Progressive Web App', difficulty: 'Intermediate', duration: '2-3 weeks', provider: 'Self', rating: 5 },
      { name: 'Interactive Data Visualization', difficulty: 'Advanced', duration: '4-5 weeks', provider: 'Self', rating: 5 }
    ],
    certifications: ['Google UX Design Certificate', 'React Professional Certificate', 'Web Accessibility Specialist']
  },
  backend: {
    courses: [
      { name: 'Microservices Architecture', provider: 'Cloud Native', duration: '8 weeks', rating: 4.8 },
      { name: 'Database Design & Optimization', provider: 'Data Pro', duration: '6 weeks', rating: 4.7 },
      { name: 'API Security Best Practices', provider: 'Security First', duration: '4 weeks', rating: 4.9 }
    ],
    projects: [
      { name: 'Scalable API Gateway', difficulty: 'Advanced', duration: '5-6 weeks', provider: 'Self', rating: 5 },
      { name: 'Event-Driven Architecture', difficulty: 'Expert', duration: '6-8 weeks', provider: 'Self', rating: 5 },
      { name: 'High-Performance Database', difficulty: 'Advanced', duration: '4-5 weeks', provider: 'Self', rating: 5 }
    ],
    certifications: ['AWS Certified Solutions Architect', 'MongoDB Certified DBA', 'Kubernetes Administrator']
  },
  devops: {
    courses: [
      { name: 'Kubernetes Administration', provider: 'Cloud Native', duration: '10 weeks', rating: 4.9 },
      { name: 'Infrastructure as Code with Terraform', provider: 'HashiCorp', duration: '6 weeks', rating: 4.8 },
      { name: 'Advanced CI/CD Pipelines', provider: 'DevOps Pro', duration: '8 weeks', rating: 4.7 }
    ],
    projects: [
      { name: 'Multi-Cloud Infrastructure', difficulty: 'Expert', duration: '8-10 weeks', provider: 'Self', rating: 5 },
      { name: 'Automated Deployment Pipeline', difficulty: 'Advanced', duration: '4-6 weeks', provider: 'Self', rating: 5 },
      { name: 'Monitoring & Alerting System', difficulty: 'Advanced', duration: '3-4 weeks', provider: 'Self', rating: 5 }
    ],
    certifications: ['AWS Certified DevOps Engineer', 'Kubernetes Certified Administrator', 'Terraform Associate']
  }
};

// ============ Main Component ============
export default function SkillGapAnalysis() {
  const [selectedRole, setSelectedRole] = useState<ProfessionalRole>(professionalRoles[0]);
  const [skills, setSkills] = useState<SkillItem[]>(roleSkillsData.fullstack);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentSkillAssessment, setCurrentSkillAssessment] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<{ [key: string]: number }>({});
  const [skillAssessments, setSkillAssessments] = useState<{ [key: string]: SkillAssessment }>({});

  // ============ Event Handlers ============
  const handleRoleChange = (roleId: string) => {
    const role = professionalRoles.find(r => r.id === roleId);
    if (role) {
      setSelectedRole(role);
      setSkills(roleSkillsData[roleId as keyof typeof roleSkillsData]);
      setAnalysisComplete(false);
      setSkillAssessments({});
      setCurrentSkillAssessment(null);
    }
  };

  const startSkillAssessment = (skillId: string) => {
    setCurrentSkillAssessment(skillId);
    setAssessmentAnswers({});
  };

  const handleAssessmentAnswer = (questionId: string, answerIndex: number) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const completeSkillAssessment = (skillId: string) => {
    const questions = assessmentQuestions[skillId] || [];
    if (questions.length === 0) return;

    let correctAnswers = 0;
    questions.forEach(question => {
      if (assessmentAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    const calculatedLevel = Math.min(Math.round(score * 0.8) + Math.floor(Math.random() * 15), 100);

    setSkillAssessments(prev => ({
      ...prev,
      [skillId]: {
        skillId,
        completed: true,
        score,
        questionsAnswered: questions.length,
        assessmentTime: Date.now()
      }
    }));

    setSkills(prev => prev.map(skill =>
      skill.id === skillId
        ? { ...skill, currentLevel: calculatedLevel }
        : skill
    ));

    setCurrentSkillAssessment(null);
    setAssessmentAnswers({});
  };

  const handleAnalyzeGaps = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const handleResetAssessments = () => {
    setSkills(prev => prev.map(skill => ({
      ...skill,
      currentLevel: 0
    })));
    setSkillAssessments({});
    setAnalysisComplete(false);
    setCurrentSkillAssessment(null);
  };

  const handleExportReport = () => {
    const report = {
      role: selectedRole.name,
      timestamp: new Date().toISOString(),
      overallReadiness: calculateOverallReadiness(),
      skills: skills.map(skill => ({
        name: skill.name,
        currentLevel: skill.currentLevel,
        targetLevel: skill.targetLevel,
        gap: skill.targetLevel - skill.currentLevel,
        status: getGapStatus(skill.targetLevel - skill.currentLevel),
        assessed: skillAssessments[skill.id]?.completed || false
      })),
      recommendations: getTopRecommendations()
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skill-gap-analysis-${selectedRole.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ============ Calculations ============
  const calculateOverallReadiness = (): number => {
    if (skills.length === 0) return 0;
    const totalScore = skills.reduce((sum, skill) => {
      const achievement = Math.min(skill.currentLevel / skill.targetLevel, 1);
      const weight = skill.importance === 'High' ? 3 : skill.importance === 'Medium' ? 2 : 1;
      return sum + (achievement * weight);
    }, 0);
    const totalWeight = skills.reduce((sum, skill) => {
      return sum + (skill.importance === 'High' ? 3 : skill.importance === 'Medium' ? 2 : 1);
    }, 0);
    return Math.round((totalScore / totalWeight) * 100);
  };

  const getGapStatus = (gap: number): 'strong' | 'developing' | 'gap' | 'critical' => {
    if (gap <= 0) return 'strong';
    if (gap <= 15) return 'developing';
    if (gap <= 30) return 'gap';
    return 'critical';
  };

  const getSkillsByStatus = () => {
    const skillsWithGaps = skills.map(skill => ({
      ...skill,
      gap: skill.targetLevel - skill.currentLevel,
      status: getGapStatus(skill.targetLevel - skill.currentLevel)
    }));
    return {
      strong: skillsWithGaps.filter(s => s.status === 'strong').length,
      developing: skillsWithGaps.filter(s => s.status === 'developing').length,
      gap: skillsWithGaps.filter(s => s.status === 'gap').length,
      critical: skillsWithGaps.filter(s => s.status === 'critical').length
    };
  };

  const getTopRecommendations = () => {
    const roleResources = learningResources[selectedRole.id as keyof typeof learningResources];
    return skills
      .filter(skill => skill.targetLevel - skill.currentLevel > 0)
      .sort((a, b) => {
        const importanceWeight: { [key: string]: number } = { 'High': 3, 'Medium': 2, 'Low': 1 };
        const aScore = importanceWeight[a.importance] * 100 +
          (a.targetLevel - a.currentLevel) * 10 + a.marketDemand;
        const bScore = importanceWeight[b.importance] * 100 +
          (b.targetLevel - b.currentLevel) * 10 + b.marketDemand;
        return bScore - aScore;
      })
      .slice(0, 3)
      .map((skill, index) => ({
        skill: skill.name,
        priority: skill.importance,
        gap: skill.targetLevel - skill.currentLevel,
        marketDemand: skill.marketDemand,
        course: roleResources.courses[index] || roleResources.courses[0],
        project: roleResources.projects[index] || roleResources.projects[0]
      }));
  };

  const getMarketInsights = () => {
    const avgMarketDemand = skills.reduce((sum, skill) => sum + skill.marketDemand, 0) / skills.length;
    const trendingSkills = skills.filter(skill => skill.trend === 'up').length;
    const criticalSkills = skills.filter(skill => skill.targetLevel - skill.currentLevel > 30).length;
    return {
      avgMarketDemand: Math.round(avgMarketDemand),
      trendingSkills,
      criticalSkills,
      competitiveAdvantage: avgMarketDemand > 80 ? 'High' : avgMarketDemand > 60 ? 'Medium' : 'Low'
    };
  };

  // ============ Helper Functions ============
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong": return "text-green-400 bg-green-950/30 border-green-800/50";
      case "developing": return "text-blue-400 bg-blue-950/30 border-blue-800/50";
      case "gap": return "text-amber-400 bg-amber-950/30 border-amber-800/50";
      case "critical": return "text-red-400 bg-red-950/30 border-red-800/50";
      default: return "text-gray-400 bg-slate-950/30 border-slate-800/50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "strong": return <CheckCircle className="w-4 h-4" />;
      case "developing": return <TrendingUp className="w-4 h-4" />;
      case "gap":
      case "critical": return <AlertCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getReadinessLevel = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "text-green-400", icon: Award };
    if (score >= 70) return { label: "Good", color: "text-blue-400", icon: TrendingUp };
    if (score >= 50) return { label: "Developing", color: "text-amber-400", icon: Zap };
    return { label: "Needs Work", color: "text-red-400", icon: AlertCircle };
  };

  // ============ Derived State ============
  const overallScore = calculateOverallReadiness();
  const skillsByStatus = getSkillsByStatus();
  const readinessLevel = getReadinessLevel(overallScore);
  const marketInsights = getMarketInsights();
  const assessedSkillsCount = Object.values(skillAssessments).filter(a => a.completed).length;
  const recommendations = getTopRecommendations();

  return (
    <DashboardLayout
      title="Skill Gap Analysis"
      description="AI-powered skill assessment and career development insights"
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
                    <BarChart3 className="w-8 h-8 text-purple-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-100 bg-clip-text text-transparent">Career Intelligence</h1>
                    <p className="text-purple-300 text-lg font-medium">Professional Skill Assessment</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <Badge className="bg-gradient-to-r from-purple-500/40 to-purple-600/30 border-purple-400/60 text-purple-100 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                    <Target className="w-3 h-3 mr-2" />
                    {selectedRole.name}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500/40 to-blue-600/30 border-blue-400/60 text-blue-100 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                    <Award className="w-3 h-3 mr-2" />
                    {selectedRole.level}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-emerald-500/40 to-emerald-600/30 border-emerald-400/60 text-emerald-100 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                    <TrendingUp className="w-3 h-3 mr-2" />
                    {selectedRole.growth}
                  </Badge>
                </div>
              </div>

              {/* Score Circle */}
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-32 h-32">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-xl rounded-full"></div>
                  <svg className="w-32 h-32 transform -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6ee7b7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-700/40" />
                    <circle
                      cx="50" cy="50" r="40" stroke="url(#scoreGradient)" strokeWidth="8" fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - Math.min(overallScore, 100) / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{overallScore}%</span>
                    <span className="text-xs text-purple-300 font-medium">Readiness</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAnalyzeGaps}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-slate-950 border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetAssessments}
                    className="border-purple-500/60 text-purple-300 hover:bg-purple-500/30 backdrop-blur-sm transition-all duration-300"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Status Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { key: 'strong', label: 'Mastered', icon: CheckCircle, color: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-500/40', text: 'text-emerald-300' },
                { key: 'developing', label: 'In Progress', icon: TrendingUp, color: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/40', text: 'text-blue-300' },
                { key: 'gap', label: 'Learning Queue', icon: BookOpen, color: 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500/40', text: 'text-amber-300' },
                { key: 'critical', label: 'High Priority', icon: AlertCircle, color: 'bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/40', text: 'text-red-300' }
              ].map(({ key, label, icon: Icon, color, text }) => {
                const count = skillsByStatus[key as keyof typeof skillsByStatus];
                return (
                  <div key={key} className={`${color} backdrop-blur-md rounded-xl p-4 text-center border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                    <Icon className={`w-5 h-5 mx-auto mb-2 ${text}`} />
                    <div className="text-2xl font-bold text-white">{count}</div>
                    <div className="text-xs text-slate-300 font-medium">{label}</div>
                  </div>
                );
              })}
            </div>

            {/* Market Insights */}
            {analysisComplete && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm text-slate-400">Market Demand</div>
                      <div className="text-lg font-bold text-white">{marketInsights.avgMarketDemand}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-sm text-slate-400">Trending Skills</div>
                      <div className="text-lg font-bold text-white">{marketInsights.trendingSkills}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-sm text-slate-400">Critical Gaps</div>
                      <div className="text-lg font-bold text-white">{marketInsights.criticalSkills}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============ Main Content Tabs ============ */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-900 border border-slate-800 p-1 rounded-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="assessment" className="data-[state=active]:bg-purple-600">Assessment</TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-600">Analysis</TabsTrigger>
            <TabsTrigger value="roadmap" className="data-[state=active]:bg-purple-600">Roadmap</TabsTrigger>
          </TabsList>

          {/* ============ Overview Tab ============ */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Role Selection Card */}
              <Card className="lg:col-span-1 bg-slate-900 border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="w-5 h-5 text-purple-400" />
                    Career Target
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedRole.id} onValueChange={handleRoleChange}>
                    <SelectTrigger className="h-12 border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      {professionalRoles.map(role => (
                        <SelectItem key={role.id} value={role.id} className="text-slate-100">
                          <div>
                            <div className="font-semibold">{role.name}</div>
                            <div className="text-xs text-slate-400">{role.level} • {role.salary}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <p className="text-sm text-slate-300">{selectedRole.description}</p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-800/50 p-2 rounded">
                        <div className="text-slate-400">Salary</div>
                        <div className="font-semibold text-green-400">{selectedRole.salary}</div>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded">
                        <div className="text-slate-400">Growth</div>
                        <div className="font-semibold text-blue-400">{selectedRole.growth}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 mb-2">Key Responsibilities:</h4>
                      <ul className="space-y-1">
                        {selectedRole.keyResponsibilities.map((resp, idx) => (
                          <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                            <ChevronRight className="w-3 h-3 mt-0.5 text-purple-400 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Readiness Score Card - Premium */}
              <Card className="lg:col-span-2 bg-gradient-to-br from-slate-800 via-purple-900/20 to-indigo-900/20 border border-purple-700/40 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-white text-xl">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Award className="w-5 h-5 text-purple-300" />
                    </div>
                    Readiness Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Status Section */}
                  <div className="bg-gradient-to-r from-slate-800/40 to-purple-900/20 rounded-xl p-5 border border-purple-700/30">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Career Readiness Level</div>
                        <div className={`text-4xl font-bold ${readinessLevel.color}`}>{readinessLevel.label}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 mb-1">Overall Score</div>
                        <div className="text-3xl font-bold text-cyan-400">{overallScore}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700/30 rounded-full h-2 mt-3">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${overallScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Insights Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-slate-400 font-medium">Strengths</span>
                      </div>
                      <div className="text-sm text-slate-200">
                        {skillsByStatus.strong} Skills Mastered
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{Math.round((skillsByStatus.strong / skills.length) * 100)}% Complete</div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-slate-400 font-medium">Gaps to Fill</span>
                      </div>
                      <div className="text-sm text-slate-200">
                        {skillsByStatus.gap + skillsByStatus.critical} Skills to Learn
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Priority focus areas</div>
                    </div>
                  </div>

                  {/* Description & Timeline */}
                  <div className="space-y-3">
                    <div className="bg-indigo-950/20 border border-indigo-700/30 rounded-lg p-4">
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {overallScore >= 85 ? "🎯 Excellent progress! You're well-prepared for this role. Consider exploring advanced specializations and certifications to stand out." :
                          overallScore >= 70 ? "📈 Good momentum! Focus on closing the remaining skill gaps through targeted practice and real-world projects." :
                            overallScore >= 50 ? "🏗️ Solid foundation established. Build on core competencies with hands-on experience and structured learning." :
                              "🚀 Starting your journey! Begin with foundational concepts and progress systematically through structured learning paths."}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/30 rounded-lg p-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Clock className="w-5 h-5 text-purple-300" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-400 font-medium">Estimated Timeline</div>
                        <div className="text-sm font-semibold text-white">
                          {Math.max(1, Math.ceil((100 - overallScore) / 10))} months to achieve {100}% readiness
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Based on</div>
                        <div className="text-sm font-bold text-green-400">{skills.length} skills</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Indicators */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-emerald-950/20 border border-emerald-700/30 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-400">{assessedSkillsCount}</div>
                      <div className="text-xs text-slate-400 mt-1">Assessed</div>
                    </div>
                    <div className="bg-purple-950/20 border border-purple-700/30 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-purple-400">{skillsByStatus.developing}</div>
                      <div className="text-xs text-slate-400 mt-1">In Progress</div>
                    </div>
                    <div className="bg-blue-950/20 border border-blue-700/30 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-400">{marketInsights.avgMarketDemand}%</div>
                      <div className="text-xs text-slate-400 mt-1">Demand</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Top Recommendations
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Prioritized learning path based on market demand and your gaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendations.slice(0, 3).map((rec, idx) => (
                    <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-sm">{rec.skill}</h3>
                          <Badge className="mt-1 bg-purple-500/30 text-purple-200 text-xs">
                            {rec.priority} Priority
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-amber-400">{rec.gap}%</div>
                          <div className="text-xs text-slate-400">Gap</div>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Market Demand</span>
                          <span className="font-semibold text-green-400">{rec.marketDemand}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-1.5 rounded-full" style={{ width: `${rec.marketDemand}%` }}></div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-700">
                        <div className="text-xs text-slate-400 mb-1">Recommended Course</div>
                        <div className="text-xs font-medium text-slate-200">{rec.course.name}</div>
                        <div className="text-xs text-slate-500">{rec.course.provider} • {rec.course.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============ Assessment Tab ============ */}
          <TabsContent value="assessment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-white">{skills.length}</div>
                  <div className="text-sm text-slate-400">Total Skills</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="text-2xl font-bold text-white">{assessedSkillsCount}</div>
                  <div className="text-sm text-slate-400">Assessed</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold text-white">{Math.round((assessedSkillsCount / skills.length) * 100)}%</div>
                  <div className="text-sm text-slate-400">Completion</div>
                </CardContent>
              </Card>
            </div>

            {currentSkillAssessment ? (
              // Assessment Quiz View
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    {skills.find(s => s.id === currentSkillAssessment)?.name} Assessment
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Answer questions to evaluate your proficiency level
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {(assessmentQuestions[currentSkillAssessment] || []).map((question, qIdx) => (
                    <div key={question.id} className="border-b border-slate-800 pb-6 last:border-0">
                      <h3 className="font-bold text-white mb-3">Question {qIdx + 1}: {question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option, optIdx) => (
                          <label key={optIdx} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                            <input
                              type="radio"
                              name={question.id}
                              checked={assessmentAnswers[question.id] === optIdx}
                              onChange={() => handleAssessmentAnswer(question.id, optIdx)}
                              className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-slate-200">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => completeSkillAssessment(currentSkillAssessment)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Assessment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentSkillAssessment(null)}
                      className="border-slate-700 text-slate-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Skills Assessment List View
              <div className="space-y-3">
                {skills.map((skill) => {
                  const assessment = skillAssessments[skill.id];
                  return (
                    <Card key={skill.id} className="bg-slate-900 border-slate-800">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-white">{skill.name}</h3>
                              <Badge className="bg-slate-800 text-slate-300 text-xs">{skill.category}</Badge>
                              {assessment?.completed && (
                                <Badge className="bg-green-500/30 text-green-200">Assessed</Badge>
                              )}
                            </div>
                            {assessment?.completed && (
                              <div className="text-sm text-slate-400">
                                Assessment Score: <span className="font-bold text-green-400">{assessment.score}%</span>
                                {' | '} Level: <span className="font-bold text-blue-400">{skill.currentLevel}%</span>
                              </div>
                            )}
                          </div>
                          {!assessment?.completed ? (
                            <Button
                              onClick={() => startSkillAssessment(skill.id)}
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              <Play className="w-3 h-3 mr-2" />
                              Start
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                setSkillAssessments(prev => {
                                  const newAssessments = { ...prev };
                                  delete newAssessments[skill.id];
                                  return newAssessments;
                                });
                                setSkills(prev => prev.map(s =>
                                  s.id === skill.id ? { ...s, currentLevel: 0 } : s
                                ));
                              }}
                              size="sm"
                              variant="outline"
                              className="border-slate-700"
                            >
                              <RotateCcw className="w-3 h-3 mr-2" />
                              Retake
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ============ Analysis Tab ============ */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Detailed Skill Gap Analysis
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Comprehensive view of your skill levels against industry targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill) => {
                  const gap = skill.targetLevel - skill.currentLevel;
                  const status = getGapStatus(gap);
                  const progressPercent = Math.min((skill.currentLevel / skill.targetLevel) * 100, 100);
                  return (
                    <div key={skill.id} className="space-y-2 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="font-bold text-white">{skill.name}</span>
                          <Badge className={`${getStatusColor(status)} border`}>
                            {getStatusIcon(status)}
                            <span className="ml-1 capitalize text-xs">{status}</span>
                          </Badge>
                          {getTrendIcon(skill.trend)}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">{skill.currentLevel}% / {skill.targetLevel}%</div>
                          {gap > 0 && (
                            <div className="text-xs text-amber-400 font-medium">{gap}% gap</div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Current</span>
                          <span>Target</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {analysisComplete && (
              <div className="flex justify-end">
                <Button
                  onClick={handleExportReport}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Full Report
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ============ Roadmap Tab ============ */}
          <TabsContent value="roadmap" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Your Learning Roadmap</CardTitle>
                <CardDescription className="text-slate-400">
                  Structured path to achieve your career goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills
                  .filter(s => s.targetLevel - s.currentLevel > 0)
                  .sort((a, b) => {
                    const weights: { [key: string]: number } = { 'High': 3, 'Medium': 2, 'Low': 1 };
                    return weights[b.importance] - weights[a.importance];
                  })
                  .map((skill, idx) => (
                    <div key={skill.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          idx < 2 ? 'bg-green-600' : idx < 4 ? 'bg-blue-600' : 'bg-purple-600'
                        }`}>
                          {idx + 1}
                        </div>
                        {idx < skills.filter(s => s.targetLevel - s.currentLevel > 0).length - 1 && (
                          <div className="w-1 h-12 bg-slate-700 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-white">{skill.name}</h3>
                          <Badge className={`${getStatusColor(getGapStatus(skill.targetLevel - skill.currentLevel))} border`}>
                            {skill.importance}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                          Learn {skill.name} to reach {skill.targetLevel}% proficiency. Current: {skill.currentLevel}%
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-purple-950/30 border border-purple-800/50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <BookOpen className="w-4 h-4 text-purple-400" />
                              <span className="text-xs font-semibold text-purple-300">Course</span>
                            </div>
                            <div className="text-xs text-slate-300">
                              {learningResources[selectedRole.id as keyof typeof learningResources]?.courses[idx % 3]?.name || 'Professional Development'}
                            </div>
                          </div>
                          <div className="bg-emerald-950/30 border border-emerald-800/50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs font-semibold text-emerald-300">Project</span>
                            </div>
                            <div className="text-xs text-slate-300">
                              {learningResources[selectedRole.id as keyof typeof learningResources]?.projects[idx % 3]?.name || 'Hands-on Practice'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
