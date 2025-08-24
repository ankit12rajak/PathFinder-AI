import { useState } from "react";
import { Building, MapPin, Star, DollarSign, Users, TrendingUp, Award, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/DashboardLayout";

const CollegeComparison = () => {
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    fees: "",
    rating: ""
  });

  const colleges = [
    {
      id: "iit-delhi",
      name: "IIT Delhi",
      location: "Delhi",
      type: "Government",
      rating: 4.8,
      fees: "₹2.5 Lakhs/year",
      placement: {
        average: "₹18 LPA",
        highest: "₹1.2 Crore",
        percentage: 95
      },
      infrastructure: 4.7,
      faculty: 4.9,
      research: 4.8,
      alumni: 4.9,
      hostel: 4.5,
      courses: ["Computer Science", "Electrical", "Mechanical", "Chemical"],
      highlights: ["Top Research Facilities", "Global Alumni Network", "Industry Partnerships"],
      image: "/placeholder.svg"
    },
    {
      id: "bits-pilani",
      name: "BITS Pilani",
      location: "Rajasthan",
      type: "Private",
      rating: 4.6,
      fees: "₹4.5 Lakhs/year",
      placement: {
        average: "₹15 LPA",
        highest: "₹60 LPA",
        percentage: 92
      },
      infrastructure: 4.8,
      faculty: 4.6,
      research: 4.4,
      alumni: 4.7,
      hostel: 4.6,
      courses: ["Computer Science", "Electronics", "Mechanical", "Chemical"],
      highlights: ["Flexible Curriculum", "Industry Integration", "Innovation Focus"],
      image: "/placeholder.svg"
    },
    {
      id: "nit-trichy",
      name: "NIT Trichy",
      location: "Tamil Nadu",
      type: "Government",
      rating: 4.5,
      fees: "₹1.8 Lakhs/year",
      placement: {
        average: "₹12 LPA",
        highest: "₹45 LPA",
        percentage: 88
      },
      infrastructure: 4.4,
      faculty: 4.5,
      research: 4.3,
      alumni: 4.4,
      hostel: 4.3,
      courses: ["Computer Science", "Electronics", "Mechanical", "Civil"],
      highlights: ["Strong Technical Foundation", "Good ROI", "Regional Industry Connect"],
      image: "/placeholder.svg"
    },
    {
      id: "manipal",
      name: "Manipal Institute",
      location: "Karnataka",
      type: "Private",
      rating: 4.3,
      fees: "₹3.8 Lakhs/year",
      placement: {
        average: "₹8 LPA",
        highest: "₹35 LPA",
        percentage: 85
      },
      infrastructure: 4.6,
      faculty: 4.2,
      research: 4.0,
      alumni: 4.3,
      hostel: 4.5,
      courses: ["Computer Science", "Information Technology", "Electronics", "Mechanical"],
      highlights: ["Modern Infrastructure", "International Exposure", "Industry Ready Curriculum"],
      image: "/placeholder.svg"
    }
  ];

  const comparisonMetrics = [
    { name: "Academic Excellence", key: "faculty" },
    { name: "Infrastructure", key: "infrastructure" },
    { name: "Research Output", key: "research" },
    { name: "Alumni Network", key: "alumni" },
    { name: "Campus Life", key: "hostel" }
  ];

  const toggleCollegeSelection = (collegeId: string) => {
    setSelectedColleges(prev => 
      prev.includes(collegeId)
        ? prev.filter(id => id !== collegeId)
        : prev.length < 3 ? [...prev, collegeId] : prev
    );
  };

  const selectedCollegeData = colleges.filter(college => selectedColleges.includes(college.id));

  return (
    <DashboardLayout 
      title="College Comparison Tool" 
      description="Compare colleges based on placements, fees, alumni network, and more"
    >
      <div className="p-6 space-y-8">
        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Colleges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="College Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="deemed">Deemed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.fees} onValueChange={(value) => setFilters({...filters, fees: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Fee Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">₹0-2 Lakhs</SelectItem>
                  <SelectItem value="2-5">₹2-5 Lakhs</SelectItem>
                  <SelectItem value="5-10">₹5-10 Lakhs</SelectItem>
                  <SelectItem value="10+">₹10+ Lakhs</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.rating} onValueChange={(value) => setFilters({...filters, rating: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Minimum Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* College Cards */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Select Colleges to Compare</h2>
            <span className="text-sm text-muted-foreground">
              Selected: {selectedColleges.length}/3
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colleges.map((college) => (
              <Card 
                key={college.id}
                className={`hover:shadow-lg transition-all cursor-pointer ${
                  selectedColleges.includes(college.id) ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Checkbox 
                          checked={selectedColleges.includes(college.id)}
                          onCheckedChange={() => toggleCollegeSelection(college.id)}
                        />
                        <CardTitle className="text-xl">{college.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {college.location}
                        </span>
                        <Badge variant="outline">{college.type}</Badge>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {college.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Annual Fees</div>
                      <div className="font-semibold">{college.fees}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Avg. Package</div>
                      <div className="font-semibold text-green-600">{college.placement.average}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Placement Rate</span>
                      <span>{college.placement.percentage}%</span>
                    </div>
                    <Progress value={college.placement.percentage} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Highlights:</div>
                    <div className="flex flex-wrap gap-1">
                      {college.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedColleges.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of selected colleges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Metric</th>
                      {selectedCollegeData.map((college) => (
                        <th key={college.id} className="text-center p-3 min-w-[150px]">
                          {college.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Annual Fees</td>
                      {selectedCollegeData.map((college) => (
                        <td key={college.id} className="p-3 text-center">{college.fees}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Average Package</td>
                      {selectedCollegeData.map((college) => (
                        <td key={college.id} className="p-3 text-center text-green-600 font-semibold">
                          {college.placement.average}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Highest Package</td>
                      {selectedCollegeData.map((college) => (
                        <td key={college.id} className="p-3 text-center text-blue-600 font-semibold">
                          {college.placement.highest}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Placement %</td>
                      {selectedCollegeData.map((college) => (
                        <td key={college.id} className="p-3 text-center">{college.placement.percentage}%</td>
                      ))}
                    </tr>
                    {comparisonMetrics.map((metric) => (
                      <tr key={metric.key} className="border-b">
                        <td className="p-3 font-medium">{metric.name}</td>
                        {selectedCollegeData.map((college) => (
                          <td key={college.id} className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span>{(college as any)[metric.key]}/5</span>
                              <div className="w-16">
                                <Progress 
                                  value={((college as any)[metric.key] as number) * 20} 
                                  className="h-1" 
                                />
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex gap-4">
                <Button>Generate Detailed Report</Button>
                <Button variant="outline">Save Comparison</Button>
                <Button variant="outline">Share Results</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedColleges.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start Your Comparison</h3>
              <p className="text-muted-foreground">Select up to 3 colleges to compare their features, placements, and costs</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CollegeComparison;
