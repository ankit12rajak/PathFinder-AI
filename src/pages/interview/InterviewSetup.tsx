import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Building2, TrendingUp, Layers, Code2, Users, MessageSquare, Sparkles, Clock, Mic, Lightbulb, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const InterviewSetup = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedLevel, setSelectedLevel] = useState("SDE1");

  const rounds = [
    {
      id: 1,
      title: "Machine Coding",
      icon: Code2,
      description: "Live coding with Monaco editor & AI evaluation",
      duration: "45 min",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Technical Discussion",
      icon: MessageSquare,
      description: "AI-powered technical conversation & code review",
      duration: "30 min",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "System Design",
      icon: Layers,
      description: "Interactive canvas for architecture design",
      duration: "45 min",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      title: "Behavioral",
      icon: Users,
      description: "Behavioral and situational questions",
      duration: "30 min",
      color: "from-green-500 to-emerald-500"
    },
  ];

  const guidelines = [
    {
      icon: Clock,
      title: "Time Management",
      description: "Each round has a specific time limit. Manage your time wisely.",
    },
    {
      icon: Lightbulb,
      title: "Think Aloud",
      description: "Explain your thought process as you solve problems.",
    },
    {
      icon: Mic,
      title: "Clear Communication",
      description: "Speak clearly and articulate your ideas effectively.",
    },
    {
      icon: HelpCircle,
      title: "Ask Questions",
      description: "Don't hesitate to ask clarifying questions.",
    },
  ];

  const roundTips = {
    "Machine Coding": [
      "Write clean, modular, and well-documented code",
      "Focus on code quality and best practices",
      "Test your code with edge cases",
      "Explain your approach before coding"
    ],
    "Technical Discussion": [
      "Demonstrate deep understanding of concepts",
      "Discuss trade-offs and alternatives",
      "Share real-world experiences",
      "Be ready to defend your technical decisions"
    ],
    "System Design": [
      "Start with high-level architecture",
      "Consider scalability and reliability",
      "Discuss data flow and API design",
      "Address non-functional requirements"
    ],
    "Behavioral": [
      "Use the STAR method (Situation, Task, Action, Result)",
      "Be specific with examples from your experience",
      "Show growth mindset and learning ability",
      "Be honest and authentic"
    ]
  };

  const handleStartInterview = () => {
    // Skip permissions page since we're not recording (2B requirement)
    navigate("/interview/round/1");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Interview Platform</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Mock Interview Setup
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Practice realistic interviews with AI-powered personalized questions and instant feedback
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Selection */}
          <div className="space-y-6">
            {/* Role Selection */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  Select Role
                </CardTitle>
                <CardDescription>Choose the role you're applying for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-muted border-border h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                    <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                    <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                    <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                    <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                    <SelectItem value="Mobile Developer">Mobile Developer</SelectItem>
                    <SelectItem value="ML Engineer">ML Engineer</SelectItem>
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company Type</label>
                    <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Companies">All Companies</SelectItem>
                        <SelectItem value="FAANG">FAANG</SelectItem>
                        <SelectItem value="Startups">Startups</SelectItem>
                        <SelectItem value="Product Companies">Product Companies</SelectItem>
                        <SelectItem value="Service Based">Service Based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Experience Level</label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Intern">Intern</SelectItem>
                        <SelectItem value="SDE1">SDE1 / Junior</SelectItem>
                        <SelectItem value="SDE2">SDE2 / Mid</SelectItem>
                        <SelectItem value="SDE3">SDE3 / Senior</SelectItem>
                        <SelectItem value="Lead">Lead / Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interview Rounds */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Layers className="w-5 h-5 text-accent" />
                  </div>
                  Interview Rounds
                </CardTitle>
                <CardDescription>You'll go through all 4 rounds sequentially</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {rounds.map((round) => {
                  const Icon = round.icon;
                  return (
                    <div
                      key={round.id}
                      className="relative overflow-hidden group"
                    >
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${round.color} shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-lg">Round {round.id}: {round.title}</p>
                            <Badge variant="secondary" className="text-xs">{round.duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{round.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* General Guidelines */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  General Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guidelines.map((guideline, idx) => {
                    const Icon = guideline.icon;
                    return (
                      <div key={idx} className="p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors">
                        <Icon className="w-5 h-5 text-primary mb-2" />
                        <h4 className="font-medium text-sm mb-1">{guideline.title}</h4>
                        <p className="text-xs text-muted-foreground">{guideline.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tips & Start */}
          <div className="space-y-6">
            {/* Round-Specific Tips */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-accent" />
                  Round-Specific Tips
                </CardTitle>
                <CardDescription>Best practices for each interview round</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                {Object.entries(roundTips).map(([round, tips]) => (
                  <div key={round} className="p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg border border-border">
                    <h4 className="font-semibold mb-3 text-primary flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {round}
                    </h4>
                    <ul className="space-y-2">
                      {tips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Start Button */}
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20 shadow-2xl">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Ready to Begin?</h3>
                    <p className="text-sm text-muted-foreground">
                      Your mock interview will consist of 4 rounds. Take your time and demonstrate your best skills!
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-card/50 rounded-lg border border-border">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Total Duration: ~2.5 hours</span>
                  </div>

                  <Button 
                    onClick={handleStartInterview}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-accent to-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Interview Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    You can pause and resume at any time
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;
