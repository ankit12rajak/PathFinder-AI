import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import EarlyStageDashboard from "./pages/dashboards/EarlyStageDashboard";
import DecisionMakingDashboard from "./pages/dashboards/DecisionMakingDashboard";
import CollegeAdmissionDashboard from "./pages/dashboards/CollegeAdmissionDashboard";
import SkillDevelopmentDashboard from "./pages/dashboards/SkillDevelopmentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard/early-stage" element={<EarlyStageDashboard />} />
          <Route path="/dashboard/decision-making" element={<DecisionMakingDashboard />} />
          <Route path="/dashboard/college-admission" element={<CollegeAdmissionDashboard />} />
          <Route path="/dashboard/skill-development" element={<SkillDevelopmentDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
