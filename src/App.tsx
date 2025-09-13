import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import EarlyStageDashboard from "./pages/dashboards/EarlyStageDashboard";
import DecisionMakingDashboard from "./pages/dashboards/DecisionMakingDashboard";
import CollegeAdmissionDashboard from "./pages/dashboards/CollegeAdmissionDashboard";
import SkillDevelopmentDashboard from "./pages/dashboards/SkillDevelopmentDashboard";

// Early Stage Dashboard Components
import AptitudeTests from "./pages/dashboards/early-stage/AptitudeTests";
import CareerExplorer from "./pages/dashboards/early-stage/CareerExplorer";
import SkillGames from "./pages/dashboards/early-stage/SkillGames";
import StudySmart from "./pages/dashboards/early-stage/StudySmart";
import StressRelief from "./pages/dashboards/early-stage/StressRelief";
import ProgressTracking from "./pages/dashboards/early-stage/ProgressTracking";

// Decision Making Dashboard Components
import CareerPathways from "./pages/dashboards/decision-making/CareerPathways";
import ExamPreparation from "./pages/dashboards/decision-making/ExamPreparation";
import CollegeInsights from "./pages/dashboards/decision-making/CollegeInsights";
import AlternativeCareers from "./pages/dashboards/decision-making/AlternativeCareers";
import MentorNetwork from "./pages/dashboards/decision-making/MentorNetwork";
import MockTests from "./pages/dashboards/decision-making/MockTests";
import ProgressAnalytics from "./pages/dashboards/decision-making/ProgressAnalytics";

// College Admission Dashboard Components
import CollegeComparison from "./pages/dashboards/college-admission/CollegeComparison";
import CourseMatcher from "./pages/dashboards/college-admission/CourseMatcher";
import CourseDetailTree from "./pages/dashboards/college-admission/CourseDetailTree";
import ROICalculator from "./pages/dashboards/college-admission/ROICalculator";
import WhatIfSimulator from "./pages/dashboards/college-admission/WhatIfSimulator";
import Scholarships from "./pages/dashboards/college-admission/Scholarships";
import ApplicationTracker from "./pages/dashboards/college-admission/ApplicationTracker";
import Deadlines from "./pages/dashboards/college-admission/Deadlines";

// Skill Development Dashboard Components
import SkillGapAnalysis from "./pages/dashboards/skill-development/SkillGapAnalysis";
import LearningPaths from "./pages/dashboards/skill-development/LearningPaths";
import IndustryTrends from "./pages/dashboards/skill-development/IndustryTrends";
import ProjectsInternships from "./pages/dashboards/skill-development/ProjectsInternships";
import SkillTraining from "./pages/dashboards/skill-development/SkillTraining";
import InterviewPrep from "./pages/dashboards/skill-development/InterviewPrep";
import PlacementKit from "./pages/dashboards/skill-development/PlacementKit";
import MockTestPage from "./Test/jeemain"; // Import jeemain.tsx
import NEETTestPage from './Test/neet';
import JEEAdvancedTestPage from './Test/jeeadvanced';
import CUETTestPage from './Test/cuet';
import CLATTestPage from './Test/clat';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Early Stage Dashboard Routes */}
          <Route path="/dashboard/early-stage" element={<EarlyStageDashboard />} />
          <Route path="/dashboard/early-stage/aptitude" element={<AptitudeTests />} />
          <Route path="/dashboard/early-stage/careers" element={<CareerExplorer />} />
          <Route path="/dashboard/early-stage/games" element={<SkillGames />} />
          <Route path="/dashboard/early-stage/study" element={<StudySmart />} />
          <Route path="/dashboard/early-stage/wellness" element={<StressRelief />} />
          <Route path="/dashboard/early-stage/progress" element={<ProgressTracking />} />
          
          {/* Decision Making Dashboard Routes */}
          <Route path="/dashboard/decision-making" element={<DecisionMakingDashboard />} />
          <Route path="/dashboard/decision-making/pathways" element={<CareerPathways />} />
          <Route path="/dashboard/decision-making/exams" element={<ExamPreparation />} />
          <Route path="/dashboard/decision-making/college-insights" element={<CollegeInsights />} />
          <Route path="/dashboard/decision-making/alternative-careers" element={<AlternativeCareers />} />
          <Route path="/dashboard/decision-making/mentors" element={<MentorNetwork />} />
          <Route path="/dashboard/decision-making/mock-tests" element={<MockTests />} />
          <Route path="/dashboard/decision-making/analytics" element={<ProgressAnalytics />} />
          
          {/* College Admission Dashboard Routes */}
          <Route path="/dashboard/college-admission" element={<CollegeAdmissionDashboard />} />
          <Route path="/dashboard/college-admission/compare" element={<CollegeComparison />} />
          <Route path="/dashboard/college-admission/matcher" element={<CourseMatcher />} />
          <Route path="/dashboard/college-admission/course-tree/:courseId" element={<CourseDetailTree />} />
          <Route path="/dashboard/college-admission/roi" element={<ROICalculator />} />
          <Route path="/dashboard/college-admission/simulator" element={<WhatIfSimulator />} />
          <Route path="/dashboard/college-admission/scholarships" element={<Scholarships />} />
          <Route path="/dashboard/college-admission/applications" element={<ApplicationTracker />} />
          <Route path="/dashboard/college-admission/deadlines" element={<Deadlines />} />
          
          {/* Skill Development Dashboard Routes */}
          <Route path="/dashboard/skill-development" element={<SkillDevelopmentDashboard />} />
          <Route path="/dashboard/skill-development/gap-analysis" element={<SkillGapAnalysis />} />
          <Route path="/dashboard/skill-development/learning-paths" element={<LearningPaths />} />
          <Route path="/dashboard/skill-development/industry-trends" element={<IndustryTrends />} />
          <Route path="/dashboard/skill-development/projects-internships" element={<ProjectsInternships />} />
          <Route path="/dashboard/skill-development/skill-training" element={<SkillTraining />} />
          <Route path="/dashboard/skill-development/interview-prep" element={<InterviewPrep />} />
          <Route path="/dashboard/skill-development/placement-kit" element={<PlacementKit />} />
          
          {/* Mock Test Routes */}
          <Route path="/jeemain" element={<MockTestPage />} />
          <Route path="/neet" element={<NEETTestPage />} />
          <Route path="/jeeadvanced" element={<JEEAdvancedTestPage />} />
          <Route path="/cuet" element={<CUETTestPage />} />
          <Route path="/clat" element={<CLATTestPage />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
