import { useState } from "react";
import { Building, MapPin, DollarSign, TrendingUp, Users, Award, Star, BookOpen, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";

const CollegeInsights = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const colleges = [
    {
      id: 1,
      name: "IIT Delhi",
      location: "New Delhi",
      type: "Public",
      ranking: 1,
      fees: "₹2.5 Lakhs/year",
      averagePlacement: "₹25.8 LPA",
      highestPlacement: "₹1.98 Cr",
      placementRate: 95,
      rating: 4.8,
      courses: ["Computer Science", "Electrical", "Mechanical", "Chemical"],
      cutoff: {
        general: "JEE Rank: 1-200",
        obc: "JEE Rank: 1-400",
        sc: "JEE Rank: 1-150"
      },
      infrastructure: 4.9,
      faculty: 4.8,
      placements: 4.9,
      campusLife: 4.6,
      topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "McKinsey"],
      hostels: "Available",
      library: "Central Library with 5 lakh books",
      labs: "50+ Research Labs"
    },
    {
      id: 2,
      name: "AIIMS Delhi",
      location: "New Delhi",
      type: "Public",
      ranking: 1,
      fees: "₹5,846/year",
      averagePlacement: "₹12-15 LPA",
      highestPlacement: "₹50 LPA",
      placementRate: 100,
      rating: 4.9,
      courses: ["MBBS", "MD", "MS", "DM"],
      cutoff: {
        general: "NEET Rank: 1-50",
        obc: "NEET Rank: 1-150",
        sc: "NEET Rank: 1-100"
      },
      infrastructure: 4.8,
      faculty: 5.0,
      placements: 4.7,
      campusLife: 4.4,
      topRecruiters: ["Govt. Hospitals", "Private Hospitals", "Research Institutes"],
      hostels: "Available",
      library: "Medical Library with latest journals",
      labs: "Advanced Medical Labs & Hospital"
    },
    {
      id: 3,
      name: "IIM Ahmedabad",
      location: "Ahmedabad",
      type: "Public",
      ranking: 1,
      fees: "₹25 Lakhs (2 years)",
      averagePlacement: "₹34.36 LPA",
      highestPlacement: "₹1.15 Cr",
      placementRate: 100,
      rating: 4.7,
      courses: ["MBA", "PGPX", "Fellow Programme"],
      cutoff: {
        general: "CAT 99.5+ %ile",
        obc: "CAT 98+ %ile",
        sc: "CAT 85+ %ile"
      },
      infrastructure: 4.7,
      faculty: 4.9,
      placements: 5.0,
      campusLife: 4.8,
      topRecruiters: ["Consulting", "Investment Banking", "Tech Giants"],
      hostels: "Premium Hostels",
      library: "Vikram Sarabhai Library",
      labs: "Business Labs & Case Study Rooms"
    },
    {
      id: 4,
      name: "NLSIU Bangalore",
      location: "Bangalore",
      type: "Public",
      ranking: 1,
      fees: "₹2.2 Lakhs/year",
      averagePlacement: "₹15-20 LPA",
      highestPlacement: "₹2.5 Cr",
      placementRate: 95,
      rating: 4.6,
      courses: ["BA LLB", "LLM", "PhD"],
      cutoff: {
        general: "CLAT Rank: 1-80",
        obc: "CLAT Rank: 1-120",
        sc: "CLAT Rank: 1-60"
      },
      infrastructure: 4.5,
      faculty: 4.8,
      placements: 4.7,
      campusLife: 4.5,
      topRecruiters: ["Law Firms", "Corporate Legal", "Judiciary"],
      hostels: "Available",
      library: "Law Library with extensive collection",
      labs: "Moot Court & Legal Aid Clinic"
    }
  ];

  const trends = [
    {
      title: "Top Growing Fields",
      data: [
        { field: "AI/ML Engineering", growth: "+45%", demand: "Very High" },
        { field: "Data Science", growth: "+38%", demand: "High" },
        { field: "Cybersecurity", growth: "+35%", demand: "High" },
        { field: "Digital Marketing", growth: "+30%", demand: "Medium" }
      ]
    },
    {
      title: "Salary Trends (2024)",
      data: [
        { field: "Software Engineering", avg: "₹18 LPA", top: "₹80 LPA" },
        { field: "Investment Banking", avg: "₹25 LPA", top: "₹1.2 Cr" },
        { field: "Consulting", avg: "₹22 LPA", top: "₹75 LPA" },
        { field: "Product Management", avg: "₹28 LPA", top: "₹90 LPA" }
      ]
    }
  ];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "engineering") return matchesSearch && college.courses.some(course => 
      course.includes("Computer") || course.includes("Electrical") || course.includes("Mechanical"));
    if (selectedFilter === "medical") return matchesSearch && college.courses.some(course => 
      course.includes("MBBS") || course.includes("MD"));
    if (selectedFilter === "management") return matchesSearch && college.courses.some(course => 
      course.includes("MBA"));
    if (selectedFilter === "law") return matchesSearch && college.courses.some(course => 
      course.includes("LLB") || course.includes("LLM"));
    
    return matchesSearch;
  });

  return (
    <DashboardLayout 
      title="College Insights Hub" 
      description="Comprehensive college analysis, trends, and placement insights"
    >
      <div className="p-6 space-y-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search colleges by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Streams</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="management">Management</SelectItem>
              <SelectItem value="law">Law</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="colleges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colleges">Top Colleges</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="colleges" className="space-y-6">
            <div className="grid gap-6">
              {filteredColleges.map((college) => (
                <Card key={college.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building className="w-5 h-5" />
                          {college.name}
                          <Badge variant="secondary">#{college.ranking}</Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4" />
                          {college.location} • {college.type}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{college.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Annual Fees</div>
                        <div className="font-semibold">{college.fees}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Avg Package</div>
                        <div className="font-semibold text-green-600">{college.averagePlacement}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Highest Package</div>
                        <div className="font-semibold text-blue-600">{college.highestPlacement}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Placement Rate</div>
                        <div className="flex items-center gap-2">
                          <Progress value={college.placementRate} className="flex-1" />
                          <span className="text-sm font-semibold">{college.placementRate}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Infrastructure</div>
                        <div className="font-semibold">{college.infrastructure}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Faculty</div>
                        <div className="font-semibold">{college.faculty}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Placements</div>
                        <div className="font-semibold">{college.placements}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Campus Life</div>
                        <div className="font-semibold">{college.campusLife}/5</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium mb-1">Popular Courses</div>
                        <div className="flex flex-wrap gap-1">
                          {college.courses.map((course, idx) => (
                            <Badge key={idx} variant="outline">{course}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Top Recruiters</div>
                        <div className="flex flex-wrap gap-1">
                          {college.topRecruiters.slice(0, 4).map((recruiter, idx) => (
                            <Badge key={idx} variant="secondary">{recruiter}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Compare
                      </Button>
                      <Button variant="outline" size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trends.map((trend, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      {trend.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trend.data.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium">{item.field}</div>
                            {item.demand && (
                              <div className="text-sm text-muted-foreground">
                                Demand: {item.demand}
                              </div>
                            )}
                            {item.avg && (
                              <div className="text-sm text-muted-foreground">
                                Average: {item.avg}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            {item.growth && (
                              <div className="font-semibold text-green-600">{item.growth}</div>
                            )}
                            {item.top && (
                              <div className="text-sm font-medium text-blue-600">{item.top}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Placement Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                  <div className="text-sm text-muted-foreground">
                    Average across top 100 colleges
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Package Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">+18.5%</div>
                  <div className="text-sm text-muted-foreground">
                    Year-over-year increase
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Hiring Sectors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Technology</span>
                      <span className="text-sm font-semibold">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Consulting</span>
                      <span className="text-sm font-semibold">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Finance</span>
                      <span className="text-sm font-semibold">18%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CollegeInsights;
