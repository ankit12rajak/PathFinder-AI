import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Play, Code2, FileText, Settings, Loader2, CheckCircle2, XCircle, Sparkles, TrendingUp, AlertCircle, Brain } from "lucide-react";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";
import { analyzeAndExecuteCode, CodeExecutionResult } from "@/services/geminiCodeService";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const MachineCoding = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`// Write your solution here\nfunction twoSum(nums, target) {\n  // Your code here\n}\n\nconsole.log(twoSum([2,7,11,15], 9));`);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CodeExecutionResult | null>(null);

  const codeTemplates: Record<string, string> = {
    javascript: `// Write your solution here\nfunction twoSum(nums, target) {\n  // Your code here\n}\n\nconsole.log(twoSum([2,7,11,15], 9));`,
    python: `# Write your solution here\ndef two_sum(nums, target):\n    # Your code here\n    pass\n\nprint(two_sum([2,7,11,15], 9))`,
    typescript: `// Write your solution here\nfunction twoSum(nums: number[], target: number): number[] {\n  // Your code here\n  return [];\n}\n\nconsole.log(twoSum([2,7,11,15], 9));`,
    java: `public class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n    \n    public static void main(String[] args) {\n        int[] result = twoSum(new int[]{2,7,11,15}, 9);\n        System.out.println(java.util.Arrays.toString(result));\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}\n\nint main() {\n    vector<int> nums = {2,7,11,15};\n    vector<int> result = twoSum(nums, 9);\n    for(int i : result) cout << i << " ";\n    return 0;\n}`,
  };

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
    if (codeTemplates[language]) {
      setCode(codeTemplates[language]);
      setOutput("");
      setAnalysisResult(null);
    }
  }, [language]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    toast.success("Code submitted successfully!");
    setTimeout(() => {
      navigate("/interview/round/2");
    }, 1500);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("🔄 Analyzing and executing your code with Gemini AI...\n\nThis may take a few seconds...");
    toast.info("Running code analysis...");

    try {
      const problemDescription = "Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.";
      
      const result = await analyzeAndExecuteCode(code, language, problemDescription);
      setAnalysisResult(result);
      
      if (result.success) {
        let outputText = `✓ Code Analysis Complete\n\n`;
        outputText += `📊 Overall Score: ${result.analysis?.overallScore}%\n\n`;
        outputText += `🔍 Execution Output:\n${result.output}\n\n`;
        
        if (result.analysis) {
          outputText += `📈 Detailed Scores:\n`;
          outputText += `• Code Quality: ${result.analysis.codeQuality}%\n`;
          outputText += `• Correctness: ${result.analysis.correctness}%\n`;
          outputText += `• Efficiency: ${result.analysis.efficiency}%\n`;
          outputText += `• Best Practices: ${result.analysis.bestPractices}%\n\n`;
          
          if (result.analysis.strengths.length > 0) {
            outputText += `✅ Strengths:\n${result.analysis.strengths.map(s => `  • ${s}`).join('\n')}\n\n`;
          }
          
          if (result.analysis.bugs.length > 0) {
            outputText += `🐛 Bugs Found:\n${result.analysis.bugs.map(b => `  • ${b}`).join('\n')}\n\n`;
          }
        }
        
        setOutput(outputText);
        toast.success("Code analysis completed!");
      } else {
        setOutput(`✗ Error\n\n${result.error || "Unknown error occurred"}\n\n${result.output || ""}`);
        toast.error("Code execution failed!");
      }
    } catch (error) {
      setOutput(`✗ Execution Error\n\n${error instanceof Error ? error.message : "Failed to analyze code"}`);
      toast.error("Failed to analyze code");
    } finally {
      setIsRunning(false);
    }
  };

  const getLanguageForMonaco = (lang: string) => {
    const map: Record<string, string> = {
      javascript: "javascript",
      python: "python",
      typescript: "typescript",
      java: "java",
      cpp: "cpp",
    };
    return map[lang] || "javascript";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-[1800px] mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Round 1: Machine Coding</h1>
                <p className="text-sm text-muted-foreground">Powered by Gemini AI</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-140px)]">
          {/* Left Panel - Question */}
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl overflow-hidden">
            <Tabs defaultValue="problem" className="h-full flex flex-col">
              <CardHeader className="pb-0">
                <TabsList className="grid w-full grid-cols-2 bg-muted">
                  <TabsTrigger value="problem">
                    <FileText className="w-4 h-4 mr-2" />
                    Problem
                  </TabsTrigger>
                  <TabsTrigger value="approach">
                    <Brain className="w-4 h-4 mr-2" />
                    Approach
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <TabsContent value="problem" className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Two Sum</h3>
                    <div className="flex gap-2 mb-4">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Easy</Badge>
                      <Badge variant="secondary">Array</Badge>
                      <Badge variant="secondary">Hash Table</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <p className="text-muted-foreground">
                      Given an array of integers <code className="bg-muted px-2 py-1 rounded">nums</code> and an integer{" "}
                      <code className="bg-muted px-2 py-1 rounded">target</code>, return indices of the two numbers such that they add up to target.
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Example 1:</h4>
                      <div className="bg-muted p-3 rounded space-y-1 font-mono text-xs">
                        <p><span className="text-muted-foreground">Input:</span> nums = [2,7,11,15], target = 9</p>
                        <p><span className="text-muted-foreground">Output:</span> [0,1]</p>
                        <p><span className="text-muted-foreground">Explanation:</span> nums[0] + nums[1] == 9</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Example 2:</h4>
                      <div className="bg-muted p-3 rounded space-y-1 font-mono text-xs">
                        <p><span className="text-muted-foreground">Input:</span> nums = [3,2,4], target = 6</p>
                        <p><span className="text-muted-foreground">Output:</span> [1,2]</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Constraints:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>2 ≤ nums.length ≤ 10⁴</li>
                        <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                        <li>Only one valid answer exists</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="approach" className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Solution Approaches</h3>
                    <div className="space-y-4 text-sm">
                      <div className="p-3 bg-muted/50 rounded-lg border border-border">
                        <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
                          <span className="text-lg">1️⃣</span> Brute Force (O(n²))
                        </h4>
                        <p className="text-muted-foreground">Use nested loops to check all possible pairs.</p>
                      </div>
                      
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                        <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
                          <span className="text-lg">2️⃣</span> Hash Map (O(n)) - Recommended ⭐
                        </h4>
                        <p className="text-muted-foreground mb-2">
                          Use a hash map to store seen numbers and their indices.
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 text-xs">
                          <li>Iterate through array once</li>
                          <li>For each number, check if complement exists in map</li>
                          <li>Store current number and index in map</li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-4 rounded-lg border border-accent/30">
                        <p className="text-xs font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-accent" />
                          Key Insight
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Instead of searching for pairs, search for the complement (target - current number) in constant time using a hash map.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          {/* Middle Panel - Code Editor */}
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Code Editor
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[150px] bg-muted border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  >
                    {isRunning ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    Run & Analyze
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-hidden">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(language)}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                  }}
                />
              </div>
              <div className="h-48 p-4 bg-muted/50 border-t border-border overflow-y-auto">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    AI Analysis & Output
                  </span>
                  {isRunning ? (
                    <span className="text-yellow-400 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Analyzing...
                    </span>
                  ) : analysisResult ? (
                    <span className={analysisResult.success ? "text-green-400 flex items-center gap-1" : "text-red-400 flex items-center gap-1"}>
                      {analysisResult.success ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {analysisResult.success ? "Analysis Complete" : "Error"}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Ready</span>
                  )}
                </div>
                <pre className="text-xs font-mono whitespace-pre-wrap">{output || "Click 'Run & Analyze' to execute your code and get AI-powered feedback..."}</pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Panel - Analysis Results */}
        {analysisResult?.analysis && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Overall Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-bold ${getScoreColor(analysisResult.analysis.overallScore)}`}>
                  {analysisResult.analysis.overallScore}%
                </div>
                <Progress value={analysisResult.analysis.overallScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-1">
                {analysisResult.analysis.strengths.map((strength, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-muted-foreground">{strength}</span>
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  Improvements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-1">
                {analysisResult.analysis.improvements.map((improvement, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-400">!</span>
                    <span className="text-muted-foreground">{improvement}</span>
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4 text-accent" />
                  Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quality</span>
                  <span className={`font-semibold ${getScoreColor(analysisResult.analysis.codeQuality)}`}>
                    {analysisResult.analysis.codeQuality}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Correctness</span>
                  <span className={`font-semibold ${getScoreColor(analysisResult.analysis.correctness)}`}>
                    {analysisResult.analysis.correctness}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className={`font-semibold ${getScoreColor(analysisResult.analysis.efficiency)}`}>
                    {analysisResult.analysis.efficiency}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineCoding;
