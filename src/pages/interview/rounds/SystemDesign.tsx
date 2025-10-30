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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-140px)]">
          {/* Canvas */}
          <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm border-border shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Design Canvas
                <Badge variant="secondary" className="ml-2">Drag & Drop Icons</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 overflow-hidden">
              <DrawingCanvas />
            </CardContent>
          </Card>

          {/* Right Sidebar */}
          <div className="space-y-4 flex flex-col min-h-0 max-h-full overflow-hidden">
            {/* Icon Library */}
            <div className="flex-shrink-0">
              <SystemDesignIconLibrary 
                onIconSelect={(iconType, icon) => {
                  toast.info(`Drag ${icon} to canvas`, {
                    description: "Click and drag the icon onto the canvas"
                  });
                }}
              />
            </div>

            {/* Problem Description */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl flex-1 flex flex-col min-h-0">
              <CardHeader className="pb-3 flex-shrink-0 border-b border-border">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-accent" />
                  System Design Problem
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4 text-sm p-4">
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Design a URL Shortener Service</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Design a system like bit.ly that can shorten URLs and redirect users to the original URL with high availability and low latency.
                  </p>
                </div>

                <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Functional Requirements
                  </h4>
                  <ul className="space-y-1.5 text-muted-foreground ml-4 text-xs">
                    <li>• Generate short URLs for long URLs</li>
                    <li>• Redirect users to original URL</li>
                    <li>• Custom short URLs (optional)</li>
                    <li>• URL expiration support</li>
                    <li>• Track click analytics</li>
                  </ul>
                </div>

                <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                  <h4 className="font-semibold mb-2 text-accent">Non-Functional Requirements</h4>
                  <ul className="space-y-1.5 text-muted-foreground ml-4 text-xs">
                    <li>• Handle 100M URLs</li>
                    <li>• Low latency ({"<"}100ms)</li>
                    <li>• High availability (99.9%)</li>
                    <li>• Scalable architecture</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Components to Consider</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-muted/50 rounded text-xs border border-border">
                      <p className="font-semibold text-blue-400">API Gateway</p>
                      <p className="text-muted-foreground">Entry point for all requests</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-xs border border-border">
                      <p className="font-semibold text-green-400">URL Generation Service</p>
                      <p className="text-muted-foreground">Create unique short URLs</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-xs border border-border">
                      <p className="font-semibold text-purple-400">Database (NoSQL)</p>
                      <p className="text-muted-foreground">Store URL mappings</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-xs border border-border">
                      <p className="font-semibold text-orange-400">Cache Layer (Redis)</p>
                      <p className="text-muted-foreground">Fast URL lookups</p>
                    </div>
                    <div className="p-2 bg-muted/50 rounded text-xs border border-border">
                      <p className="font-semibold text-pink-400">Load Balancer</p>
                      <p className="text-muted-foreground">Distribute traffic</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Design Discussion Points</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="p-2 bg-muted/50 rounded border border-border">
                      💡 How will you generate unique short URLs?
                    </li>
                    <li className="p-2 bg-muted/50 rounded border border-border">
                      💡 How will you handle hash collisions?
                    </li>
                    <li className="p-2 bg-muted/50 rounded border border-border">
                      💡 What database will you use and why?
                    </li>
                    <li className="p-2 bg-muted/50 rounded border border-border">
                      💡 How will you scale for 1M requests/sec?
                    </li>
                    <li className="p-2 bg-muted/50 rounded border border-border">
                      💡 How will you handle URL expiration?
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
                  <p className="text-xs font-semibold mb-1 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    Pro Tip
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Start with high-level architecture, identify bottlenecks, then dive into specific components. Always discuss trade-offs between consistency, availability, and partition tolerance (CAP theorem).
                  </p>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-xs">Expected Flow:</h4>
                  <ol className="space-y-1 text-xs text-muted-foreground ml-4">
                    <li>1. User requests short URL</li>
                    <li>2. Generate unique hash/ID</li>
                    <li>3. Store mapping in DB</li>
                    <li>4. Cache for quick access</li>
                    <li>5. Return short URL</li>
                    <li>6. Redirect on access</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDesign;
