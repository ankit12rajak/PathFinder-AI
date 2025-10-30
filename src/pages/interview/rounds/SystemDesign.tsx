import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Layers, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { SystemDesignIconLibrary } from "@/components/SystemDesignIconLibrary";
import { Badge } from "@/components/ui/badge";

const SystemDesign = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    toast.success("System design submitted successfully!");
    setTimeout(() => {
      navigate("/interview/round/4");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-[1800px] mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Round 3: System Design</h1>
                <p className="text-sm text-muted-foreground">Design Scalable Architecture</p>
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
            Submit & Continue
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-140px)]">
          {/* Left Sidebar - Problem Description */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border-border shadow-xl flex flex-col overflow-hidden">
            <CardHeader className="pb-3 flex-shrink-0 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="text-sm flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-primary" />
                Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-3 p-3">
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-3 rounded-lg border-2 border-primary/40">
                  <h3 className="font-bold mb-2 text-base text-primary">URL Shortener Service</h3>
                  <p className="text-foreground/90 text-xs leading-relaxed">
                    Design like <strong>bit.ly</strong> - shorten URLs with <strong>high availability</strong> & <strong>low latency</strong>.
                  </p>
                </div>

                <div className="p-3 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg border border-primary/40">
                  <h4 className="font-bold mb-2 text-primary flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    Functional Requirements
                  </h4>
                  <ul className="space-y-1.5 ml-1">
                    <li className="flex items-start gap-1.5 text-xs">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">Generate short URLs</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-xs">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">Redirect to original</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-xs">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">Custom URLs</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-xs">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">URL expiration</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-xs">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/90">Click analytics</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-gradient-to-br from-accent/15 to-accent/5 rounded-lg border border-accent/40">
                  <h4 className="font-bold mb-2 text-accent text-xs">Non-Functional</h4>
                  <ul className="space-y-1.5 ml-1">
                    <li className="flex items-start gap-1.5 text-xs">
                      <span className="text-accent font-bold">⚡</span>
                      <span className="text-foreground/90"><strong>100M URLs</strong></span>
                    </li>
                    <li className="flex items-start gap-1.5 text-xs">
                      <span className="text-accent font-bold">⚡</span>
                      <span className="text-foreground/90"><strong>{"<"}100ms</strong> latency</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-xs">
                      <span className="text-accent font-bold">⚡</span>
                      <span className="text-foreground/90"><strong>99.9%</strong> uptime</span>
                    </li>
                    <li className="flex items-start gap-1.5 text-xs">
                      <span className="text-accent font-bold">⚡</span>
                      <span className="text-foreground/90">Scalable</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-xs">Key Components</h4>
                  <div className="space-y-1.5">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-500/10 rounded text-xs border border-blue-500/30">
                      <p className="font-bold text-blue-400">API Gateway</p>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-green-500/20 to-green-500/10 rounded text-xs border border-green-500/30">
                      <p className="font-bold text-green-400">URL Service</p>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-500/10 rounded text-xs border border-purple-500/30">
                      <p className="font-bold text-purple-400">NoSQL DB</p>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-500/10 rounded text-xs border border-orange-500/30">
                      <p className="font-bold text-orange-400">Redis Cache</p>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-pink-500/20 to-pink-500/10 rounded text-xs border border-pink-500/30">
                      <p className="font-bold text-pink-400">Load Balancer</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-xs">Discussion Points</h4>
                  <ul className="space-y-1.5">
                    <li className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 rounded border-l-2 border-yellow-500">
                      <span className="text-xs text-foreground/90">Unique URL generation?</span>
                    </li>
                    <li className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 rounded border-l-2 border-yellow-500">
                      <span className="text-xs text-foreground/90">Hash collisions?</span>
                    </li>
                    <li className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 rounded border-l-2 border-yellow-500">
                      <span className="text-xs text-foreground/90">Database choice?</span>
                    </li>
                    <li className="p-2 bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 rounded border-l-2 border-yellow-500">
                      <span className="text-xs text-foreground/90">Scaling strategy?</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-gradient-to-br from-primary/20 via-accent/15 to-primary/10 rounded-lg border border-primary/50">
                  <p className="text-xs font-bold mb-1.5 flex items-center gap-1.5 text-primary">
                    <Sparkles className="w-3 h-3" />
                    Pro Tip
                  </p>
                  <p className="text-xs text-foreground/90 leading-relaxed">
                    Start with <strong>high-level arch</strong>, identify bottlenecks, discuss <strong>CAP theorem</strong> trade-offs.
                  </p>
                </div>
              </CardContent>
            </Card>

          {/* Canvas - Center (Takes most space) */}
          <Card className="lg:col-span-3 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border-border shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="pb-2 border-b border-border bg-gradient-to-r from-accent/10 to-primary/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2 font-bold">
                  <Layers className="w-5 h-5 text-accent" />
                  Design Canvas
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Drag & Drop
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Professional Mode
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-3 overflow-hidden">
              <DrawingCanvas />
            </CardContent>
          </Card>

          {/* Icon Library - Right Sidebar */}
          <div className="lg:col-span-1 space-y-4 flex flex-col min-h-0 max-h-full overflow-hidden">
            <SystemDesignIconLibrary 
              onIconSelect={(iconType, icon) => {
                toast.info(`Drag ${icon} to canvas`, {
                  description: "Click and drag the icon onto the canvas",
                  duration: 2000,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDesign;
