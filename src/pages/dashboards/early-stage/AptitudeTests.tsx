import { useState } from "react";
import { Brain, Clock, Star, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

const AptitudeTests = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const aptitudeTests = [
    {
      id: "logical",
      title: "Logical Reasoning",
      description: "Test your problem-solving and analytical thinking abilities",
      duration: "30 minutes",
      questions: 25,
      difficulty: "Easy",
      completed: true,
      score: 85,
      icon: Brain,
      color: "from-blue-500 to-purple-500"
    },
    {
      id: "creative",
      title: "Creative Thinking",
      description: "Discover your creative potential and innovative thinking style",
      duration: "25 minutes",
      questions: 20,
      difficulty: "Medium",
      completed: false,
      score: null,
      icon: Star,
      color: "from-pink-500 to-orange-500"
    },
    {
      id: "analytical",
      title: "Analytical Skills",
      description: "Measure your ability to analyze data and solve complex problems",
      duration: "35 minutes",
      questions: 30,
      difficulty: "Medium",
      completed: true,
      score: 78,
      icon: Brain,
      color: "from-green-500 to-teal-500"
    },
    {
      id: "communication",
      title: "Communication Style",
      description: "Understand your communication preferences and strengths",
      duration: "20 minutes",
      questions: 15,
      difficulty: "Easy",
      completed: false,
      score: null,
      icon: Star,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const personalityTraits = [
    { trait: "Logical Thinker", score: 85, color: "bg-blue-500" },
    { trait: "Creative Mind", score: 72, color: "bg-pink-500" },
    { trait: "Detail Oriented", score: 90, color: "bg-green-500" },
    { trait: "Team Player", score: 68, color: "bg-purple-500" },
    { trait: "Problem Solver", score: 88, color: "bg-orange-500" }
  ];

  const handleStartTest = (testId: string) => {
    setSelectedTest(testId);
    // In a real app, this would navigate to the test interface
    console.log(`Starting test: ${testId}`);
  };

  return (
    <DashboardLayout 
      title="Aptitude & Personality Tests" 
      description="Discover your natural strengths and learning style"
    >
      <div className="p-6 space-y-8">
        {/* Personality Insights */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Your Personality Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personalityTraits.map((trait) => (
              <div key={trait.trait} className="bg-white/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{trait.trait}</span>
                  <span className="text-sm font-bold">{trait.score}%</span>
                </div>
                <Progress value={trait.score} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Available Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aptitudeTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${test.color} flex items-center justify-center`}>
                    <test.icon className="w-6 h-6 text-white" />
                  </div>
                  {test.completed && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{test.title}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {test.duration}
                    </span>
                    <span>{test.questions} questions</span>
                    <Badge variant="outline">{test.difficulty}</Badge>
                  </div>
                  
                  {test.completed && test.score && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Your Score</span>
                        <span className="text-lg font-bold text-primary">{test.score}%</span>
                      </div>
                      <Progress value={test.score} className="h-2" />
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => handleStartTest(test.id)}
                    className="w-full"
                    variant={test.completed ? "outline" : "default"}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {test.completed ? "Retake Test" : "Start Test"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Better Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Before Taking Tests:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Find a quiet, comfortable place</li>
                  <li>• Take breaks between different tests</li>
                  <li>• Answer honestly, not what you think is "right"</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Understanding Results:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• No result is "bad" - they show your unique strengths</li>
                  <li>• Use results to explore matching career paths</li>
                  <li>• Discuss results with parents or teachers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AptitudeTests;
