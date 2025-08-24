import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, GraduationCap, Building, Target, BarChart3, PieChart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import DashboardLayout from "@/components/DashboardLayout";

const ROICalculator = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    college: "",
    duration: 4,
    totalFees: 0,
    livingCosts: 0,
    otherExpenses: 0
  });

  const [careerData, setCareerData] = useState({
    startingSalary: 0,
    salaryGrowthRate: [8],
    careerDuration: [35],
    alternativeIncome: 0
  });

  const [results, setResults] = useState<any>(null);

  const colleges = [
    { name: "IIT Delhi", fees: 250000, avgSalary: 1800000, type: "Government" },
    { name: "BITS Pilani", fees: 450000, avgSalary: 1500000, type: "Private" },
    { name: "NIT Trichy", fees: 180000, avgSalary: 1200000, type: "Government" },
    { name: "VIT Vellore", fees: 280000, avgSalary: 800000, type: "Private" },
    { name: "IIIT Hyderabad", fees: 320000, avgSalary: 2200000, type: "Government" },
    { name: "Manipal Institute", fees: 380000, avgSalary: 800000, type: "Private" }
  ];

  const courses = [
    { name: "Computer Science Engineering", avgSalary: 1500000, growth: 12 },
    { name: "Electronics Engineering", avgSalary: 1200000, growth: 8 },
    { name: "Mechanical Engineering", avgSalary: 800000, growth: 6 },
    { name: "MBA", avgSalary: 1800000, growth: 10 },
    { name: "MBBS", avgSalary: 1000000, growth: 5 },
    { name: "Data Science", avgSalary: 1600000, growth: 15 }
  ];

  const calculateROI = () => {
    const totalEducationCost = (courseData.totalFees + courseData.livingCosts + courseData.otherExpenses) * courseData.duration;
    const opportunityCost = careerData.alternativeIncome * courseData.duration;
    const totalInvestment = totalEducationCost + opportunityCost;

    let totalEarnings = 0;
    let currentSalary = careerData.startingSalary;
    const annualGrowthRate = careerData.salaryGrowthRate[0] / 100;
    const workingYears = careerData.careerDuration[0];

    for (let year = 1; year <= workingYears; year++) {
      totalEarnings += currentSalary;
      currentSalary *= (1 + annualGrowthRate);
    }

    const netReturn = totalEarnings - totalInvestment;
    const roiRatio = totalInvestment > 0 ? (netReturn / totalInvestment) : 0;
    const roiPercentage = roiRatio * 100;
    const paybackPeriod = totalInvestment > 0 ? totalInvestment / careerData.startingSalary : 0;

    // Calculate breakeven point
    let breakevenYear = 0;
    let cumulativeEarnings = 0;
    currentSalary = careerData.startingSalary;
    
    for (let year = 1; year <= workingYears; year++) {
      cumulativeEarnings += currentSalary;
      if (cumulativeEarnings >= totalInvestment && breakevenYear === 0) {
        breakevenYear = year;
      }
      currentSalary *= (1 + annualGrowthRate);
    }

    setResults({
      totalInvestment,
      totalEarnings,
      netReturn,
      roiRatio,
      roiPercentage,
      paybackPeriod,
      breakevenYear,
      educationCost: totalEducationCost,
      opportunityCost,
      monthlyROI: netReturn / (workingYears * 12)
    });
  };

  const handleCollegeSelect = (collegeName: string) => {
    const college = colleges.find(c => c.name === collegeName);
    if (college) {
      setCourseData({
        ...courseData,
        college: collegeName,
        totalFees: college.fees
      });
      setCareerData({
        ...careerData,
        startingSalary: college.avgSalary
      });
    }
  };

  const handleCourseSelect = (courseName: string) => {
    const course = courses.find(c => c.name === courseName);
    if (course) {
      setCourseData({
        ...courseData,
        courseName
      });
      setCareerData({
        ...careerData,
        startingSalary: course.avgSalary,
        salaryGrowthRate: [course.growth]
      });
    }
  };

  const getROIRating = (percentage: number) => {
    if (percentage > 500) return { label: "Excellent", color: "text-green-600", bg: "bg-green-100" };
    if (percentage > 300) return { label: "Very Good", color: "text-blue-600", bg: "bg-blue-100" };
    if (percentage > 200) return { label: "Good", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (percentage > 100) return { label: "Average", color: "text-orange-600", bg: "bg-orange-100" };
    return { label: "Poor", color: "text-red-600", bg: "bg-red-100" };
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <DashboardLayout 
      title="ROI Calculator Pro" 
      description="Advanced cost-benefit analysis with career trajectory predictions"
    >
      <div className="p-6 space-y-8">
        {/* Input Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education Investment
              </CardTitle>
              <CardDescription>Enter your course and college details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select value={courseData.courseName} onValueChange={handleCourseSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.name} value={course.name}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="college">College</Label>
                  <Select value={courseData.college} onValueChange={handleCollegeSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem key={college.name} value={college.name}>
                          <div className="flex justify-between w-full">
                            <span>{college.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatCurrency(college.fees)}/year
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Course Duration (years)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={courseData.duration}
                    onChange={(e) => setCourseData({...courseData, duration: Number(e.target.value)})}
                    min="1"
                    max="10"
                  />
                </div>

                <div>
                  <Label htmlFor="fees">Annual Tuition Fees (₹)</Label>
                  <Input
                    id="fees"
                    type="number"
                    value={courseData.totalFees}
                    onChange={(e) => setCourseData({...courseData, totalFees: Number(e.target.value)})}
                    placeholder="250000"
                  />
                </div>

                <div>
                  <Label htmlFor="living">Annual Living Costs (₹)</Label>
                  <Input
                    id="living"
                    type="number"
                    value={courseData.livingCosts}
                    onChange={(e) => setCourseData({...courseData, livingCosts: Number(e.target.value)})}
                    placeholder="100000"
                  />
                </div>

                <div>
                  <Label htmlFor="other">Other Annual Expenses (₹)</Label>
                  <Input
                    id="other"
                    type="number"
                    value={courseData.otherExpenses}
                    onChange={(e) => setCourseData({...courseData, otherExpenses: Number(e.target.value)})}
                    placeholder="50000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Projections */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Career Projections
              </CardTitle>
              <CardDescription>Expected career and salary growth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="starting-salary">Starting Salary (₹/year)</Label>
                  <Input
                    id="starting-salary"
                    type="number"
                    value={careerData.startingSalary}
                    onChange={(e) => setCareerData({...careerData, startingSalary: Number(e.target.value)})}
                    placeholder="800000"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Annual Salary Growth Rate</Label>
                    <span className="text-sm font-medium">{careerData.salaryGrowthRate[0]}%</span>
                  </div>
                  <Slider
                    value={careerData.salaryGrowthRate}
                    onValueChange={(value) => setCareerData({...careerData, salaryGrowthRate: value})}
                    max={20}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Industry average: 5-12%
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Career Duration (years)</Label>
                    <span className="text-sm font-medium">{careerData.careerDuration[0]} years</span>
                  </div>
                  <Slider
                    value={careerData.careerDuration}
                    onValueChange={(value) => setCareerData({...careerData, careerDuration: value})}
                    max={45}
                    min={10}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="alternative">Alternative Income (₹/year)</Label>
                  <Input
                    id="alternative"
                    type="number"
                    value={careerData.alternativeIncome}
                    onChange={(e) => setCareerData({...careerData, alternativeIncome: Number(e.target.value)})}
                    placeholder="300000"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Income you could earn during study years
                  </div>
                </div>
              </div>

              <Button onClick={calculateROI} className="w-full btn-primary">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate ROI
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">ROI Analysis Results</h2>
              <Badge className={getROIRating(results.roiPercentage).bg + " " + getROIRating(results.roiPercentage).color}>
                {getROIRating(results.roiPercentage).label} ROI
              </Badge>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="feature-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {results.roiRatio.toFixed(1)}x
                  </div>
                  <div className="text-sm text-muted-foreground">ROI Multiple</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {results.roiPercentage.toFixed(0)}% return
                  </div>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.netReturn)}
                  </div>
                  <div className="text-sm text-muted-foreground">Net Return</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Lifetime earnings minus investment
                  </div>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {results.breakevenYear} years
                  </div>
                  <div className="text-sm text-muted-foreground">Breakeven Period</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Time to recover investment
                  </div>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(results.monthlyROI)}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly ROI</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Average monthly return
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Education Costs</span>
                    <span className="font-semibold">{formatCurrency(results.educationCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Opportunity Cost</span>
                    <span className="font-semibold">{formatCurrency(results.opportunityCost)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Investment</span>
                      <span>{formatCurrency(results.totalInvestment)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Education Costs</span>
                      <span>{((results.educationCost / results.totalInvestment) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(results.educationCost / results.totalInvestment) * 100} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Opportunity Costs</span>
                      <span>{((results.opportunityCost / results.totalInvestment) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(results.opportunityCost / results.totalInvestment) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Returns Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Lifetime Earnings</span>
                    <span className="font-semibold">{formatCurrency(results.totalEarnings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Investment</span>
                    <span className="font-semibold text-red-600">-{formatCurrency(results.totalInvestment)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Net Profit</span>
                      <span className={results.netReturn > 0 ? "text-green-600" : "text-red-600"}>
                        {formatCurrency(results.netReturn)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mt-4">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">ROI Percentage</div>
                      <div className={`text-3xl font-bold ${getROIRating(results.roiPercentage).color}`}>
                        {results.roiPercentage.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Every ₹1 invested returns ₹{(1 + results.roiRatio).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.roiPercentage > 400 && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800 font-medium mb-2">
                        <Badge className="bg-green-100 text-green-800">Excellent Choice</Badge>
                      </div>
                      <p className="text-sm text-green-700">
                        This investment shows excellent returns. The high ROI indicates strong career prospects and market demand.
                      </p>
                    </div>
                  )}
                  
                  {results.roiPercentage < 150 && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 text-yellow-800 font-medium mb-2">
                        <Badge className="bg-yellow-100 text-yellow-800">Consider Alternatives</Badge>
                      </div>
                      <p className="text-sm text-yellow-700">
                        The ROI is below industry standards. Consider exploring other courses or colleges with better placement records.
                      </p>
                    </div>
                  )}
                  
                  {results.breakevenYear > 8 && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 text-orange-800 font-medium mb-2">
                        <Badge className="bg-orange-100 text-orange-800">Long Payback Period</Badge>
                      </div>
                      <p className="text-sm text-orange-700">
                        It will take {results.breakevenYear} years to recover your investment. Consider courses with faster career progression.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button>
                    <PieChart className="w-4 h-4 mr-2" />
                    Generate Detailed Report
                  </Button>
                  <Button variant="outline">Compare with Other Options</Button>
                  <Button variant="outline">Save Analysis</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ROICalculator;
