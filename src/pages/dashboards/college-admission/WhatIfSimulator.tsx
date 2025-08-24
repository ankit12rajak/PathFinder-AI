import { useState } from "react";
import { Lightbulb, Calculator, TrendingUp, DollarSign, GraduationCap, MapPin, Star, Building, Target, BarChart3, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/DashboardLayout";

const WhatIfSimulator = () => {
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: "Current Plan",
      college: "IIT Delhi",
      course: "Computer Science",
      fees: 250000,
      duration: 4,
      startingSalary: 1800000,
      growthRate: 12,
      isBaseline: true
    }
  ]);

  const [newScenario, setNewScenario] = useState({
    name: "",
    college: "",
    course: "",
    fees: 0,
    duration: 4,
    startingSalary: 0,
    growthRate: 8,
    livingCosts: 100000,
    scholarshipAmount: 0
  });

  const [simulationParams, setSimulationParams] = useState({
    careerDuration: [35],
    inflationRate: [6],
    marketGrowth: [4],
    economicScenario: "moderate"
  });

  const [compareMetrics, setCompareMetrics] = useState<string[]>([
    "totalROI", "paybackPeriod", "lifetime_earnings"
  ]);

  const colleges = [
    { name: "IIT Delhi", fees: 250000, avgSalary: 1800000, location: "Delhi", ranking: 1 },
    { name: "IIT Bombay", fees: 250000, avgSalary: 2000000, location: "Mumbai", ranking: 2 },
    { name: "BITS Pilani", fees: 450000, avgSalary: 1500000, location: "Rajasthan", ranking: 8 },
    { name: "NIT Trichy", fees: 180000, avgSalary: 1200000, location: "Tamil Nadu", ranking: 15 },
    { name: "IIIT Hyderabad", fees: 320000, avgSalary: 2200000, location: "Hyderabad", ranking: 3 },
    { name: "VIT Vellore", fees: 280000, avgSalary: 800000, location: "Tamil Nadu", ranking: 25 },
    { name: "Manipal Institute", fees: 380000, avgSalary: 800000, location: "Karnataka", ranking: 30 }
  ];

  const courses = [
    { name: "Computer Science Engineering", avgSalary: 1500000, growth: 12, demand: 95 },
    { name: "Electronics Engineering", avgSalary: 1200000, growth: 8, demand: 80 },
    { name: "Mechanical Engineering", avgSalary: 800000, growth: 6, demand: 70 },
    { name: "Data Science", avgSalary: 1600000, growth: 15, demand: 90 },
    { name: "AI & Machine Learning", avgSalary: 1800000, growth: 18, demand: 95 },
    { name: "Cyber Security", avgSalary: 1400000, growth: 14, demand: 85 }
  ];

  const metricOptions = [
    { id: "totalROI", label: "Total ROI", description: "Return on Investment over career" },
    { id: "paybackPeriod", label: "Payback Period", description: "Years to recover investment" },
    { id: "lifetime_earnings", label: "Lifetime Earnings", description: "Total career earnings" },
    { id: "net_worth", label: "Net Worth", description: "Final net worth after expenses" },
    { id: "monthly_income", label: "Peak Monthly Income", description: "Highest monthly salary" },
    { id: "career_stability", label: "Career Stability", description: "Job security and growth" }
  ];

  const addScenario = () => {
    if (newScenario.name && newScenario.college && newScenario.course) {
      const scenario = {
        ...newScenario,
        id: scenarios.length + 1,
        isBaseline: false
      };
      setScenarios([...scenarios, scenario]);
      setNewScenario({
        name: "",
        college: "",
        course: "",
        fees: 0,
        duration: 4,
        startingSalary: 0,
        growthRate: 8,
        livingCosts: 100000,
        scholarshipAmount: 0
      });
    }
  };

  const removeScenario = (id: number) => {
    setScenarios(scenarios.filter(s => s.id !== id && !s.isBaseline));
  };

  const calculateScenarioMetrics = (scenario: any) => {
    const totalEducationCost = (scenario.fees + (newScenario.livingCosts || 100000)) * scenario.duration - (newScenario.scholarshipAmount || 0);
    const careerYears = simulationParams.careerDuration[0];
    const inflationAdjustment = 1 + (simulationParams.inflationRate[0] / 100);
    
    let totalEarnings = 0;
    let currentSalary = scenario.startingSalary;
    
    for (let year = 1; year <= careerYears; year++) {
      totalEarnings += currentSalary;
      currentSalary *= (1 + (scenario.growthRate / 100));
      // Apply inflation adjustment every 5 years
      if (year % 5 === 0) {
        currentSalary *= Math.pow(inflationAdjustment, 5);
      }
    }

    const netReturn = totalEarnings - totalEducationCost;
    const roiPercentage = totalEducationCost > 0 ? (netReturn / totalEducationCost) * 100 : 0;
    const paybackYears = totalEducationCost > 0 ? totalEducationCost / scenario.startingSalary : 0;
    const peakMonthlySalary = currentSalary / 12;

    return {
      totalEducationCost,
      totalEarnings,
      netReturn,
      roiPercentage,
      paybackYears,
      peakMonthlySalary,
      careerStability: scenario.course.includes("Computer") || scenario.course.includes("Data") ? 90 : 75
    };
  };

  const handleCollegeSelect = (collegeName: string) => {
    const college = colleges.find(c => c.name === collegeName);
    if (college) {
      setNewScenario({
        ...newScenario,
        college: collegeName,
        fees: college.fees,
        startingSalary: college.avgSalary
      });
    }
  };

  const handleCourseSelect = (courseName: string) => {
    const course = courses.find(c => c.name === courseName);
    if (course) {
      setNewScenario({
        ...newScenario,
        course: courseName,
        startingSalary: course.avgSalary,
        growthRate: course.growth
      });
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getScenarioColor = (index: number) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500"];
    return colors[index % colors.length];
  };

  const scenarioResults = scenarios.map(scenario => ({
    ...scenario,
    metrics: calculateScenarioMetrics(scenario)
  }));

  const bestScenario = scenarioResults.reduce((best, current) => 
    current.metrics.roiPercentage > best.metrics.roiPercentage ? current : best
  );

  const toggleMetric = (metricId: string) => {
    setCompareMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(m => m !== metricId)
        : [...prev, metricId]
    );
  };

  return (
    <DashboardLayout 
      title="What-If Simulator" 
      description="Compare different college and career scenarios to make informed decisions"
    >
      <div className="p-6 space-y-8">
        {/* Simulation Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Simulation Parameters
            </CardTitle>
            <CardDescription>Set global parameters for all scenario comparisons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Career Duration</Label>
                  <span className="text-sm font-medium">{simulationParams.careerDuration[0]} years</span>
                </div>
                <Slider
                  value={simulationParams.careerDuration}
                  onValueChange={(value) => setSimulationParams({...simulationParams, careerDuration: value})}
                  max={45}
                  min={20}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Inflation Rate</Label>
                  <span className="text-sm font-medium">{simulationParams.inflationRate[0]}%</span>
                </div>
                <Slider
                  value={simulationParams.inflationRate}
                  onValueChange={(value) => setSimulationParams({...simulationParams, inflationRate: value})}
                  max={12}
                  min={3}
                  step={0.5}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label>Economic Scenario</Label>
                <Select 
                  value={simulationParams.economicScenario} 
                  onValueChange={(value) => setSimulationParams({...simulationParams, economicScenario: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="optimistic">Optimistic Growth</SelectItem>
                    <SelectItem value="moderate">Moderate Growth</SelectItem>
                    <SelectItem value="conservative">Conservative Growth</SelectItem>
                    <SelectItem value="recession">Economic Downturn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Scenario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Add New Scenario
            </CardTitle>
            <CardDescription>Create alternative scenarios to compare against your current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="scenario-name">Scenario Name</Label>
                <Input
                  id="scenario-name"
                  value={newScenario.name}
                  onChange={(e) => setNewScenario({...newScenario, name: e.target.value})}
                  placeholder="e.g., Alternative Option A"
                />
              </div>
              
              <div>
                <Label htmlFor="scenario-college">College</Label>
                <Select value={newScenario.college} onValueChange={handleCollegeSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college.name} value={college.name}>
                        <div className="flex justify-between w-full">
                          <span>{college.name}</span>
                          <Badge variant="outline" className="text-xs">
                            Rank #{college.ranking}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="scenario-course">Course</Label>
                <Select value={newScenario.course} onValueChange={handleCourseSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.name} value={course.name}>
                        <div className="flex justify-between w-full">
                          <span>{course.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {course.growth}% growth
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="fees">Annual Fees (₹)</Label>
                <Input
                  id="fees"
                  type="number"
                  value={newScenario.fees}
                  onChange={(e) => setNewScenario({...newScenario, fees: Number(e.target.value)})}
                />
              </div>
              
              <div>
                <Label htmlFor="living-costs">Living Costs (₹/year)</Label>
                <Input
                  id="living-costs"
                  type="number"
                  value={newScenario.livingCosts}
                  onChange={(e) => setNewScenario({...newScenario, livingCosts: Number(e.target.value)})}
                />
              </div>
              
              <div>
                <Label htmlFor="scholarship">Scholarship (₹)</Label>
                <Input
                  id="scholarship"
                  type="number"
                  value={newScenario.scholarshipAmount}
                  onChange={(e) => setNewScenario({...newScenario, scholarshipAmount: Number(e.target.value)})}
                />
              </div>
              
              <div>
                <Label htmlFor="starting-salary">Starting Salary (₹)</Label>
                <Input
                  id="starting-salary"
                  type="number"
                  value={newScenario.startingSalary}
                  onChange={(e) => setNewScenario({...newScenario, startingSalary: Number(e.target.value)})}
                />
              </div>
            </div>
            
            <Button onClick={addScenario} className="btn-secondary">
              <Lightbulb className="w-4 h-4 mr-2" />
              Add Scenario
            </Button>
          </CardContent>
        </Card>

        {/* Scenario Comparison */}
        {scenarios.length > 1 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Scenario Comparison</h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">
                  Best: {bestScenario.name}
                </Badge>
                <Badge variant="outline">
                  {scenarios.length} scenarios
                </Badge>
              </div>
            </div>

            {/* Comparison Metrics Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Compare By</CardTitle>
                <CardDescription>Select metrics to compare across scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {metricOptions.map((metric) => (
                    <div key={metric.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={metric.id}
                        checked={compareMetrics.includes(metric.id)}
                        onCheckedChange={() => toggleMetric(metric.id)}
                      />
                      <div>
                        <label htmlFor={metric.id} className="text-sm font-medium">
                          {metric.label}
                        </label>
                        <div className="text-xs text-muted-foreground">
                          {metric.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scenario Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {scenarioResults.map((scenario, index) => (
                <Card key={scenario.id} className="feature-card relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getScenarioColor(index)}`}></div>
                        <div>
                          <CardTitle className="text-lg">{scenario.name}</CardTitle>
                          <CardDescription>
                            {scenario.course} at {scenario.college}
                          </CardDescription>
                        </div>
                      </div>
                      {scenario.isBaseline && (
                        <Badge className="bg-blue-100 text-blue-800">Baseline</Badge>
                      )}
                      {!scenario.isBaseline && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeScenario(scenario.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Total Investment</div>
                        <div className="font-semibold">{formatCurrency(scenario.metrics.totalEducationCost)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Lifetime Earnings</div>
                        <div className="font-semibold text-green-600">{formatCurrency(scenario.metrics.totalEarnings)}</div>
                      </div>
                    </div>
                    
                    {compareMetrics.includes("totalROI") && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>ROI</span>
                          <span className="font-semibold">{scenario.metrics.roiPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={Math.min(scenario.metrics.roiPercentage / 10, 100)} className="h-2" />
                      </div>
                    )}
                    
                    {compareMetrics.includes("paybackPeriod") && (
                      <div className="flex justify-between text-sm">
                        <span>Payback Period</span>
                        <span className="font-semibold">{scenario.metrics.paybackYears.toFixed(1)} years</span>
                      </div>
                    )}
                    
                    {compareMetrics.includes("monthly_income") && (
                      <div className="flex justify-between text-sm">
                        <span>Peak Monthly Income</span>
                        <span className="font-semibold">{formatCurrency(scenario.metrics.peakMonthlySalary)}</span>
                      </div>
                    )}
                    
                    {compareMetrics.includes("career_stability") && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Career Stability</span>
                          <span className="font-semibold">{scenario.metrics.careerStability}%</span>
                        </div>
                        <Progress value={scenario.metrics.careerStability} className="h-2" />
                      </div>
                    )}
                    
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Net Return</span>
                        <span className={`font-semibold ${scenario.metrics.netReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(scenario.metrics.netReturn)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparative Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Comparative Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {compareMetrics.includes("totalROI") && (
                    <div>
                      <h4 className="font-medium mb-3">ROI Comparison</h4>
                      <div className="space-y-2">
                        {scenarioResults.map((scenario, index) => (
                          <div key={scenario.id} className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${getScenarioColor(index)}`}></div>
                            <span className="text-sm w-32">{scenario.name}</span>
                            <div className="flex-1">
                              <Progress 
                                value={Math.min(scenario.metrics.roiPercentage / 10, 100)} 
                                className="h-3" 
                              />
                            </div>
                            <span className="text-sm font-medium w-16 text-right">
                              {scenario.metrics.roiPercentage.toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowRight className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Recommendation</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Based on your simulation, <span className="font-semibold">{bestScenario.name}</span> offers 
                      the best ROI at {bestScenario.metrics.roiPercentage.toFixed(1)}% with a payback period of{' '}
                      {bestScenario.metrics.paybackYears.toFixed(1)} years.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button className="btn-primary">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Detailed Report
                  </Button>
                  <Button variant="outline">Export Comparison</Button>
                  <Button variant="outline">Save Scenarios</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {scenarios.length === 1 && (
          <Card>
            <CardContent className="text-center py-12">
              <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Create Alternative Scenarios</h3>
              <p className="text-muted-foreground">
                Add different college and course combinations to compare their long-term outcomes
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WhatIfSimulator;
