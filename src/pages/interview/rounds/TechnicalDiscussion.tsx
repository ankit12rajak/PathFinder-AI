import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MessageSquare, Send, Bot, User, Code2, CheckCircle2, TrendingUp, Brain } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const TechnicalDiscussion = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello! I've reviewed your solution for the Two Sum problem. Great job! Let's discuss your approach. Can you walk me through how you solved it and explain your thought process?",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("Time's up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    toast.success("Round completed successfully!");
    setTimeout(() => {
      navigate("/interview/round/3");
    }, 1500);
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentMessage,
        timestamp: new Date(),
      },
    ]);

    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a good approach! Can you explain the time complexity of your solution and how you arrived at it?",
        "Interesting! How would you handle edge cases like an empty array, null inputs, or negative numbers?",
        "Can you think of any alternative approaches to solve this problem? What would be their trade-offs?",
        "What trade-offs did you consider when choosing this approach over others? For example, regarding time vs space complexity.",
        "Excellent explanation! How would this solution scale if the input size was 10 million elements?",
        "Good point! Can you explain how your solution handles duplicate values in the array?",
        "That makes sense. What would you do differently if the array was sorted?",
        "Great! Can you walk me through a specific example with values [3, 2, 4] and target 6?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: randomResponse,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const quickResponses = [
    "The time complexity is O(n)",
    "I used a hash map for O(1) lookup",
    "Let me explain with an example",
    "I would handle edge cases by checking for null first",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-[1600px] mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Round 2: Technical Discussion</h1>
                <p className="text-sm text-muted-foreground">Code Review & Technical Q&A</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-mono text-lg font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-primary via-accent to-primary hover:opacity-90 transition-opacity shadow-lg"
          >
            Complete Round
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-140px)]">
          {/* Left Panel - Context & Info */}
          <div className="space-y-4">
            {/* AI Interviewer Card */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  AI Interviewer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-lg flex items-center justify-center relative overflow-hidden border border-primary/30">
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-semibold">Technical Expert</p>
                    <p className="text-xs text-muted-foreground">AI Agent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Previous Solution Summary */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-accent" />
                  Your Solution Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="font-semibold mb-1">Problem: Two Sum</p>
                  <Badge variant="secondary" className="mt-1">Hash Map Approach</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Time Complexity
                    </span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">O(n)</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Space Complexity
                    </span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">O(n)</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>All test cases passed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discussion Tips */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Discussion Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Explain your reasoning clearly</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Discuss time/space trade-offs</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Consider edge cases</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Mention alternative approaches</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Chat Interface */}
          <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm border-border shadow-xl flex flex-col">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Technical Discussion
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        message.role === "user" 
                          ? "bg-gradient-to-r from-accent to-primary" 
                          : "bg-gradient-to-r from-primary to-accent"
                      }`}>
                        {message.role === "user" ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      
                      {/* Message bubble */}
                      <div
                        className={`rounded-2xl p-4 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-accent to-primary text-white"
                            : "bg-muted/50 border border-border"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === "user" ? "opacity-80" : "text-muted-foreground"
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-muted/50 border border-border rounded-2xl p-4">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Responses */}
              <div className="px-6 py-3 border-t border-border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Quick responses:</p>
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentMessage(response)}
                      className="text-xs border-border hover:border-primary hover:bg-primary/10"
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-6 border-t border-border bg-muted/50">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your response here..."
                    className="flex-1 px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!currentMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-6"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
                  <Brain className="w-3 h-3" />
                  Tip: Explain your thought process clearly and discuss trade-offs in your solution
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDiscussion;
