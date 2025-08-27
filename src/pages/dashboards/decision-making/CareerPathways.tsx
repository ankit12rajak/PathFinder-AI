import { useState } from "react";
import { Target, TrendingUp, DollarSign, Clock, Users, Building, Award, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import FlowchartDisplay from "@/components/FlowchartDisplay"; // Import the new component

const CareerPathways = () => {
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);
  const [showFlowchart, setShowFlowchart] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // New state for active tab

  const pathways = [
    {
      id: "engineering",
      title: "Engineering",
      description: "Build the future with technology and innovation",
      duration: "4 years + specialization",
      investment: "₹8-25 Lakhs",
      jobScope: "Excellent",
      avgSalary: "₹6-25 LPA",
      icon: Building,
      color: "from-blue-500 to-cyan-500",
      pros: [
        "High demand in market",
        "Good starting salaries",
        "Diverse specializations",
        "Global opportunities"
      ],
      cons: [
        "Highly competitive entrance exams",
        "Requires strong math/physics",
        "Continuous learning needed",
        "Work can be demanding"
      ],
      branches: [
        { name: "Computer Science", demand: 95, salary: "₹8-30 LPA" },
        { name: "Electronics", demand: 85, salary: "₹6-20 LPA" },
        { name: "Mechanical", demand: 75, salary: "₹5-18 LPA" },
        { name: "Civil", demand: 70, salary: "₹4-15 LPA" }
      ],
      exams: ["JEE Main", "JEE Advanced", "State CETs", "BITSAT"],
      flowchart: {
        title: "Engineering Course Flowchart",
        steps: [
          { name: "10+2 Science (PCM)", description: "Physics, Chemistry, Mathematics" },
          { name: "Entrance Exams", description: "JEE Main, JEE Advanced, BITSAT, State CETs" },
          { name: "B.Tech/B.E. (4 years)", description: "Specializations: Computer Science, Mechanical, Civil, Electrical, Electronics, etc." },
          { name: "Further Studies/Career", description: "M.Tech/M.S., MBA, Software Engineer, Data Scientist, Core Engineer, Consultant" }
        ]
      }
    },
    {
      id: "medical",
      title: "Medical",
      description: "Heal and save lives through medical science",
      duration: "5.5 years + internship",
      investment: "₹15-50 Lakhs",
      jobScope: "Very Good",
      avgSalary: "₹8-40 LPA",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      pros: [
        "Noble profession",
        "Job security",
        "High social status",
        "Good earning potential"
      ],
      cons: [
        "Very competitive entrance",
        "Long duration of study",
        "High investment required",
        "Stressful work environment"
      ],
      branches: [
        { name: "MBBS", demand: 90, salary: "₹10-50 LPA" },
        { name: "Dental", demand: 75, salary: "₹6-25 LPA" },
        { name: "Pharmacy", demand: 80, salary: "₹4-15 LPA" },
        { name: "Nursing", demand: 85, salary: "₹3-12 LPA" }
      ],
      exams: ["NEET UG", "NEET PG", "AIIMS", "JIPMER"],
      flowchart: {
        title: "Medical Course Flowchart",
        steps: [
          { name: "10+2 Science (PCB)", description: "Physics, Chemistry, Biology" },
          { name: "Entrance Exams", description: "NEET UG, AIIMS, JIPMER" },
          { name: "MBBS/BDS (5.5 years)", description: "Bachelor of Medicine, Bachelor of Surgery / Bachelor of Dental Surgery" },
          { name: "Internship (1 year)", description: "Compulsory practical training" },
          { name: "PG/Specialization", description: "MD/MS (3 years), DM/M.Ch (3 years), General Physician, Surgeon, Specialist" }
        ]
      }
    },
    {
      id: "commerce",
      title: "Commerce & Business",
      description: "Master the world of business and finance",
      duration: "3-5 years",
      investment: "₹3-15 Lakhs",
      jobScope: "Good",
      avgSalary: "₹4-20 LPA",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      pros: [
        "Diverse career options",
        "Lower entrance competition",
        "Entrepreneurship opportunities",
        "Practical skills"
      ],
      cons: [
        "Market saturation in some fields",
        "Initial salaries may be lower",
        "Requires networking skills",
        "Economic dependency"
      ],
      branches: [
        { name: "CA", demand: 90, salary: "₹8-25 LPA" },
        { name: "MBA", demand: 85, salary: "₹6-30 LPA" },
        { name: "Banking", demand: 75, salary: "₹4-15 LPA" },
        { name: "Economics", demand: 70, salary: "₹5-18 LPA" }
      ],
      exams: ["CA Foundation", "CUET", "CAT", "Banking Exams"],
      flowchart: {
        title: "Commerce & Business Course Flowchart",
        steps: [
          { name: "10+2 Commerce/Any Stream", description: "Commerce, Arts, Science" },
          { name: "Undergraduate Degree (3 years)", description: "B.Com, BBA, BA Economics, BMS" },
          { name: "Professional Courses/PG", description: "CA, CS, CMA, MBA, M.Com, Actuarial Science" },
          { name: "Career", description: "Accountant, Financial Analyst, Marketing Manager, HR Manager, Entrepreneur" }
        ]
      }
    },
    {
      id: "law",
      title: "Law",
      description: "Fight for justice and uphold the legal system",
      duration: "5 years (Integrated)",
      investment: "₹5-20 Lakhs",
      jobScope: "Good",
      avgSalary: "₹5-25 LPA",
      icon: Building,
      color: "from-orange-500 to-red-500",
      pros: [
        "Intellectual stimulation",
        "Social impact",
        "Prestigious profession",
        "Diverse specializations"
      ],
      cons: [
        "Long working hours",
        "High stress levels",
        "Competitive field",
        "Initial struggle period"
      ],
      branches: [
        { name: "Corporate Law", demand: 85, salary: "₹8-30 LPA" },
        { name: "Criminal Law", demand: 75, salary: "₹5-20 LPA" },
        { name: "Civil Law", demand: 70, salary: "₹4-18 LPA" },
        { name: "Constitutional Law", demand: 65, salary: "₹6-25 LPA" }
      ],
      exams: ["CLAT", "AILET", "LSAT India", "State Law Entrance"],
      flowchart: {
        title: "Law Course Flowchart",
        steps: [
          { name: "10+2 Any Stream", description: "Arts, Commerce, Science" },
          { name: "Entrance Exams", description: "CLAT, AILET, LSAT India, State Law Entrance" },
          { name: "Integrated Law Degree (5 years)", description: "BA LLB, BBA LLB, B.Sc LLB" },
          { name: "Further Studies/Career", description: "LL.M., Ph.D. in Law, Advocate, Corporate Counsel, Judge, Legal Advisor" }
        ]
      }
    }
  ];

  const comparisonMetrics = [
    { metric: "Job Market Demand", engineering: 90, medical: 85, commerce: 75, law: 70 },
    { metric: "Starting Salary", engineering: 85, medical: 90, commerce: 65, law: 70 },
    { metric: "Work-Life Balance", engineering: 70, medical: 50, commerce: 80, law: 60 },
    { metric: "Social Impact", engineering: 75, medical: 95, commerce: 60, law: 85 },
    { metric: "Growth Potential", engineering: 90, medical: 80, commerce: 85, law: 75 }
  ];

  const handleExploreClick = (pathwayId: string) => {
    setSelectedPathway(pathwayId);
    setShowFlowchart(true);
    setActiveTab("detailed"); // Switch to detailed tab
  };

  const handleBackToOverview = () => {
    setShowFlowchart(false);
    setSelectedPathway(null);
    setActiveTab("overview"); // Switch back to overview tab
  };

  return (
    <DashboardLayout 
      title="Career Pathway Explorer" 
      description="Analyze and compare different career paths with detailed insights"
    >
      <div className="p-6 space-y-8">
        {/* Quick Comparison */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Quick Path Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Metric</th>
                  <th className="text-center p-2">Engineering</th>
                  <th className="text-center p-2">Medical</th>
                  <th className="text-center p-2">Commerce</th>
                  <th className="text-center p-2">Law</th>
                </tr>
              </thead>
              <tbody>
                {comparisonMetrics.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{row.metric}</td>
                    <td className="p-2 text-center">{row.engineering}/100</td>
                    <td className="p-2 text-center">{row.medical}/100</td>
                    <td className="p-2 text-center">{row.commerce}/100</td>
                    <td className="p-2 text-center">{row.law}/100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button className="mt-4">Generate Detailed Comparison Report</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Pathway Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pathways.map((pathway) => (
                <Card 
                  key={pathway.id}
                  className={`hover:shadow-lg transition-all cursor-pointer ${
                    selectedPathway === pathway.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedPathway(pathway.id)} // Keep selection for detailed view
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${pathway.color} flex items-center justify-center`}>
                        <pathway.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline">{pathway.jobScope} Job Scope</Badge>
                    </div>
                    <CardTitle className="text-xl">{pathway.title}</CardTitle>
                    <CardDescription>{pathway.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{pathway.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>{pathway.investment}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Average Salary</span>
                        <span className="font-bold text-primary">{pathway.avgSalary}</span>
                      </div>
                      
                      <Button className="w-full" size="sm" onClick={() => handleExploreClick(pathway.id)}>
                        Explore {pathway.title}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {showFlowchart && selectedPathway ? (
              <div className="space-y-6">
                <Button onClick={handleBackToOverview} variant="outline">
                  ← Back to Pathway Details
                </Button>
                <FlowchartDisplay 
                  title={pathways.find(p => p.id === selectedPathway)?.flowchart?.title || ""}
                  steps={pathways.find(p => p.id === selectedPathway)?.flowchart?.steps || []}
                />
              </div>
            ) : selectedPathway && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {pathways.find(p => p.id === selectedPathway)?.title} - Detailed Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const pathway = pathways.find(p => p.id === selectedPathway);
                    if (!pathway) return null;
                    
                    return (
                      <div className="space-y-6">
                        {/* Pros and Cons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg text-green-600">Advantages</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {pathway.pros.map((pro, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm">{pro}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg text-orange-600">Challenges</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {pathway.cons.map((con, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{con}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Specializations */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Popular Specializations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {pathway.branches.map((branch, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">{branch.name}</span>
                                    <div className="flex items-center gap-4">
                                      <span className="text-sm text-muted-foreground">{branch.salary}</span>
                                      <span className="text-sm font-medium">{branch.demand}% Demand</span>
                                    </div>
                                  </div>
                                  <Progress value={branch.demand} className="h-2" />
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Entrance Exams */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Key Entrance Exams</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {pathway.exams.map((exam, index) => (
                                <Badge key={index} variant="secondary">{exam}</Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
            
            {!selectedPathway && (
              <Card>
                <CardContent className="text-center py-12">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Pathway</h3>
                  <p className="text-muted-foreground">Choose a career pathway from the overview tab to see detailed analysis</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CareerPathways;