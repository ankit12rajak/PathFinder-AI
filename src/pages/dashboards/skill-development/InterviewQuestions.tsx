import { useState } from "react";
import { MessageSquare, Plus, Volume2, Copy, ThumbsUp, ThumbsDown, Zap, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

interface Question {
  id: string;
  category: string;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  answer: string;
}

const InterviewQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      category: "Technical",
      question: "Explain the difference between REST and GraphQL APIs",
      difficulty: "medium",
      answer: "REST uses multiple endpoints with fixed data structures, while GraphQL uses a single endpoint where clients can request specific fields, offering more flexibility and reducing over-fetching of data."
    },
    {
      id: "2",
      category: "Behavioral",
      question: "Tell me about a time you had to work with a difficult team member",
      difficulty: "medium",
      answer: "Describe a specific situation, the actions you took to resolve it professionally, and the positive outcome. Focus on communication, empathy, and problem-solving skills."
    }
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | "all">("all");

  const demoQuestions: Question[] = [
    {
      id: "3",
      category: "Technical",
      question: "What are the main differences between SQL and NoSQL databases?",
      difficulty: "medium",
      answer: "SQL databases are relational, use structured schemas, and ACID transactions. NoSQL databases are non-relational, schema-less, and designed for scalability with eventual consistency."
    },
    {
      id: "4",
      category: "Technical",
      question: "Describe the virtual DOM and how it improves performance",
      difficulty: "hard",
      answer: "The virtual DOM is an in-memory representation of the real DOM. React compares the new virtual DOM with the previous one, identifies changes, and updates only the necessary parts of the real DOM, reducing expensive DOM operations."
    },
    {
      id: "5",
      category: "Behavioral",
      question: "How do you handle receiving critical feedback?",
      difficulty: "easy",
      answer: "Explain that you view feedback as an opportunity for growth. Share how you listen actively, ask clarifying questions, and create an action plan to improve."
    },
    {
      id: "6",
      category: "System Design",
      question: "Design a URL shortening service like bit.ly",
      difficulty: "hard",
      answer: "Discuss architecture: hash generation algorithm, database design, caching layer, load balancing, and handling redirects at scale."
    }
  ];

  const roles = [
    { name: "Software Engineer", icon: "💻", color: "from-blue-500 to-cyan-500" },
    { name: "Full Stack Developer", icon: "🔄", color: "from-purple-500 to-pink-500" },
    { name: "Product Manager", icon: "📊", color: "from-orange-500 to-red-500" },
    { name: "Data Scientist", icon: "📈", color: "from-green-500 to-teal-500" },
    { name: "DevOps Engineer", icon: "⚙️", color: "from-indigo-500 to-blue-500" },
    { name: "UX Designer", icon: "🎨", color: "from-pink-500 to-purple-500" }
  ];

  const categories = ["Technical", "Behavioral", "System Design", "Situational"];

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy":
        return "bg-emerald-500/20 border-emerald-500/40 text-emerald-300";
      case "medium":
        return "bg-amber-500/20 border-amber-500/40 text-amber-300";
      case "hard":
        return "bg-red-500/20 border-red-500/40 text-red-300";
      default:
        return "bg-slate-500/20 border-slate-500/40 text-slate-300";
    }
  };

  const filteredQuestions = difficulty === "all" 
    ? [...questions, ...demoQuestions]
    : [...questions, ...demoQuestions].filter(q => q.difficulty === difficulty);

  return (
    <DashboardLayout
      title="Interview Questions Generator"
      description="Prepare for interviews with AI-powered role-specific questions"
    >
      <div className="p-6 space-y-8 bg-slate-950">
        {/* ============ Header Section ============ */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl border border-transparent">
          {/* Premium Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 via-blue-600/5 to-purple-600/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 hover:from-cyan-500/5 hover:via-blue-500/5 hover:to-purple-500/5 transition-all duration-700 rounded-3xl"></div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30"></div>

          {/* Premium Accent Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-600/5 to-transparent rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600/5 to-transparent rounded-full translate-x-32 translate-y-32 blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            {/* Header Title Row */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-xl backdrop-blur-sm border border-cyan-400/40 shadow-lg">
                    <MessageSquare className="w-8 h-8 text-cyan-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-100 bg-clip-text text-transparent">Interview Questions Generator</h1>
                    <p className="text-cyan-300 text-lg font-medium">Master Your Interview Preparation</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <Badge className="bg-gradient-to-r from-cyan-500/40 to-cyan-600/30 border-cyan-400/60 text-cyan-100 backdrop-blur-sm shadow-md">
                    <MessageSquare className="w-3 h-3 mr-2" />
                    150+ Questions
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500/40 to-blue-600/30 border-blue-400/60 text-blue-100 backdrop-blur-sm shadow-md">
                    <Award className="w-3 h-3 mr-2" />
                    6 Roles Covered
                  </Badge>
                </div>
              </div>

              {/* Create Button */}
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12">
                <Plus className="w-4 h-4 mr-2" />
                Generate New
              </Button>
            </div>
          </div>
        </div>

        {/* ============ Role Selection ============ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Select Your Role</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {roles.map((role) => (
              <div
                key={role.name}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/40 p-4 transition-all duration-300 cursor-pointer hover:scale-110"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-10 transition-all`}></div>

                <div className="relative z-10 space-y-2 text-center">
                  <div className="text-3xl">{role.icon}</div>
                  <p className="text-xs font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all line-clamp-2">
                    {role.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ Question Categories & Filters ============ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Interview Questions</h2>
              <p className="text-slate-400 mt-1">Practice with role-specific questions</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {["All", "Technical", "Behavioral", "System Design", "Situational"].map((cat) => (
              <Button
                key={cat}
                variant={cat === "All" ? "default" : "outline"}
                className={cat === "All" ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0" : "border-slate-600 text-slate-300 hover:bg-slate-700/50"}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Filter by difficulty:</span>
            <div className="flex gap-2">
              {["all", "easy", "medium", "hard"].map((diff) => (
                <Button
                  key={diff}
                  size="sm"
                  onClick={() => setDifficulty(diff as any)}
                  variant={difficulty === diff ? "default" : "outline"}
                  className={difficulty === diff ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0" : "border-slate-600 text-slate-300 hover:bg-slate-700/50"}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* ============ Questions List ============ */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              onClick={() => setSelectedQuestion(selectedQuestion === question.id ? null : question.id)}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/40 cursor-pointer"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative z-10 p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {question.question}
                    </h3>
                  </div>
                  <Badge className={`${getDifficultyColor(question.difficulty)} whitespace-nowrap`}>
                    {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs">{question.category}</span>
                </div>

                {/* Answer - Expanded View */}
                {selectedQuestion === question.id && (
                  <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Sample Answer</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{question.answer}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      <Button size="sm" variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 text-xs">
                        <Volume2 className="w-3 h-3 mr-1" />
                        Listen
                      </Button>
                      <Button size="sm" variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 text-xs">
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 text-xs">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        Helpful
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500/40 text-red-300 hover:bg-red-500/20 text-xs">
                        <ThumbsDown className="w-3 h-3 mr-1" />
                        Not Helpful
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ============ Interview Preparation Tips ============ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Interview Preparation Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Practice with Mock Interviews",
                description: "Record yourself answering questions and review the recordings",
                icon: "🎥"
              },
              {
                title: "Use the STAR Method",
                description: "Situation, Task, Action, Result - structure your behavioral answers",
                icon: "⭐"
              },
              {
                title: "Research the Company",
                description: "Know the company's mission, products, and recent news",
                icon: "🔍"
              },
              {
                title: "Prepare Questions to Ask",
                description: "Show your interest by asking thoughtful questions",
                icon: "❓"
              }
            ].map((tip, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/40 p-6 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all"></div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tip.icon}</span>
                    <h3 className="font-semibold text-white">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ Mock Interview Session ============ */}
        <div className="relative overflow-hidden rounded-2xl p-8 border border-cyan-500/40 bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-cyan-300" />
              <h3 className="text-2xl font-bold text-white">Start a Mock Interview</h3>
            </div>

            <p className="text-slate-300 mb-4">Practice with AI-powered mock interviews that simulate real interview scenarios</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Interview Duration", value: "30 mins" },
                { label: "Questions", value: "8-10" },
                { label: "Feedback", value: "Real-time" }
              ].map((stat, index) => (
                <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-cyan-300">{stat.value}</p>
                </div>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all w-full">
              <Zap className="w-4 h-4 mr-2" />
              Start Mock Interview
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewQuestions;
