import { GraduationCap, Calculator, Target, DollarSign, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CollegeAdmissionDashboard = () => {
  const features = [
    {
      title: "College Comparison Tool",
      description: "Compare colleges based on placements, fees, alumni network, and location preferences",
      icon: Target,
      color: "from-blue-500/20 to-purple-500/20",
      action: "Compare Colleges"
    },
    {
      title: "Career vs Interest Matchmaker",
      description: "AI-powered suggestions for Engineering branches, Medical specialties, Commerce majors, and more",
      icon: GraduationCap,
      color: "from-green-500/20 to-teal-500/20",
      action: "Find Matches"
    },
    {
      title: "ROI Calculator",
      description: "Analyze cost vs expected opportunities considering time, money, and career stability",
      icon: Calculator,
      color: "from-orange-500/20 to-red-500/20",
      action: "Calculate ROI"
    },
    {
      title: "What If Simulator",
      description: "Explore different scenarios - Medical vs Engineering vs Commerce career journeys",
      icon: BookOpen,
      color: "from-pink-500/20 to-purple-500/20",
      action: "Run Simulation"
    },
    {
      title: "Scholarship & Funding Guides",
      description: "Access government scholarships, private funding, and education loan information",
      icon: DollarSign,
      color: "from-yellow-500/20 to-orange-500/20",
      action: "Find Funding"
    },
    {
      title: "Admission Strategy",
      description: "Personalized application strategy based on your profile and target colleges",
      icon: Award,
      color: "from-cyan-500/20 to-blue-500/20",
      action: "Get Strategy"
    }
  ];

  const collegeShortlist = [
    { name: "IIT Delhi", branch: "Computer Science", rank: "#1", fees: "₹2.5L/year", placement: "₹25L avg" },
    { name: "BITS Pilani", branch: "Electronics", rank: "#8", fees: "₹4.5L/year", placement: "₹18L avg" },
    { name: "IIIT Bangalore", branch: "Information Technology", rank: "#12", fees: "₹3.2L/year", placement: "₹22L avg" },
    { name: "VIT Vellore", branch: "Computer Science", rank: "#18", fees: "₹2.8L/year", placement: "₹12L avg" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Post-12th Dashboard</h1>
              <p className="text-muted-foreground">College Admission Stage</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Make informed decisions about your higher education. Compare colleges, evaluate courses, 
            and ensure you get the best return on your educational investment.
          </p>
        </div>

        {/* College Shortlist */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your College Shortlist</h2>
          <div className="space-y-4">
            {collegeShortlist.map((college, index) => (
              <Card key={index} className="feature-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <div className="font-semibold text-lg">{college.name}</div>
                      <div className="text-muted-foreground">{college.branch}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">NIRF Rank</div>
                      <div className="font-semibold">{college.rank}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Annual Fees</div>
                      <div className="font-semibold">{college.fees}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Avg Package</div>
                      <div className="font-semibold text-green-500">{college.placement}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Compare</Button>
                      <Button size="sm" className="btn-secondary">Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">18</div>
              <div className="text-sm text-muted-foreground">Colleges Compared</div>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-secondary mb-2">₹45L</div>
              <div className="text-sm text-muted-foreground">Scholarships Found</div>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-accent mb-2">12</div>
              <div className="text-sm text-muted-foreground">Applications Tracked</div>
            </CardContent>
          </Card>
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">4.2x</div>
              <div className="text-sm text-muted-foreground">Best ROI Found</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="feature-card group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full btn-secondary">
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Application Status */}
        <div>
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="text-xl">Application Status Tracker</CardTitle>
              <CardDescription>Keep track of your college applications and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                  <div>
                    <div className="font-medium">IIT Delhi - Computer Science</div>
                    <div className="text-sm text-muted-foreground">Application submitted successfully</div>
                  </div>
                  <div className="text-sm font-medium text-green-500">Submitted</div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                  <div>
                    <div className="font-medium">BITS Pilani - Electronics</div>
                    <div className="text-sm text-muted-foreground">Documents under review</div>
                  </div>
                  <div className="text-sm font-medium text-yellow-600">In Review</div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <div>
                    <div className="font-medium">IIIT Bangalore - IT</div>
                    <div className="text-sm text-muted-foreground">Application in progress</div>
                  </div>
                  <div className="text-sm font-medium text-blue-500">In Progress</div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                  <div>
                    <div className="font-medium">VIT Vellore - Computer Science</div>
                    <div className="text-sm text-muted-foreground">Deadline approaching</div>
                  </div>
                  <div className="text-sm font-medium text-red-500">2 days left</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollegeAdmissionDashboard;