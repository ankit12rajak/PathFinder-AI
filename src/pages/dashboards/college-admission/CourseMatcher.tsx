import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Target, Users, TrendingUp, BookOpen, Award, Filter, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import { courseRecommendations, type Course } from "@/data/courseData";

const CourseMatcher = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [careerGoals, setCareerGoals] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    jobMarket: [70],
    salary: [60],
    workLifeBalance: [80],
    growth: [75]
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [visibleCoursesCount, setVisibleCoursesCount] = useState(5); // Start with 5 courses
  const coursesPerLoad = 5; // Load 5 more courses each time

  const interestOptions = [
    "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
    "Economics", "Psychology", "Literature", "History", "Art & Design",
    "Music", "Sports", "Technology", "Business", "Social Work",
    "Environment", "Medical Science", "Engineering", "Research", "Teaching"
  ];

  const skillOptions = [
    "Analytical Thinking", "Problem Solving", "Communication", "Leadership",
    "Programming", "Mathematics", "Creative Thinking", "Research", "Writing",
    "Public Speaking", "Team Work", "Project Management", "Data Analysis",
    "Design", "Technical Skills", "Sales", "Innovation", "Critical Thinking"
  ];

  const careerGoalOptions = [
    "High Salary", "Job Security", "Work-Life Balance", "Leadership Roles",
    "Entrepreneurship", "Research & Innovation", "Social Impact", "Travel Opportunities",
    "Flexible Work", "Continuous Learning", "Recognition", "Helping Others"
  ];

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const calculateCompatibilityScore = (course: Course) => {
    let score = course.matchScore;
    
    // Adjust based on preferences
    if (preferences.salary[0] > 70 && course.avgSalary.includes("25")) score += 5;
    if (preferences.workLifeBalance[0] > 80 && course.workLifeBalance > 80) score += 5;
    if (preferences.jobMarket[0] > 80 && course.marketDemand > 85) score += 5;
    
    return Math.min(100, score);
  };

  const filteredCourses = courseRecommendations
    .filter(course => 
      (selectedStream === "all" || selectedStream === "" || course.stream === selectedStream) &&
      (searchTerm === "" || course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.careers.some(career => career.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .map(course => ({
      ...course,
      compatibilityScore: calculateCompatibilityScore(course)
    }))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  // Reset visible courses count when filters change
  useEffect(() => {
    setVisibleCoursesCount(5);
  }, [searchTerm, selectedStream]);

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <DashboardLayout 
      title="Course Matcher AI" 
      description="AI-powered matching for Engineering, Medical, Commerce specialties based on your interests"
    >
      <div className="p-6 space-y-8">
        {/* Profile Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Build Your Profile
            </CardTitle>
            <CardDescription>
              Help us understand your interests, skills, and goals for personalized course recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="interests" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="interests">Interests</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="goals">Career Goals</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="interests" className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">What subjects/areas interest you the most?</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={interests.includes(interest)}
                          onCheckedChange={() => toggleSelection(interest, interests, setInterests)}
                        />
                        <label htmlFor={interest} className="text-sm">{interest}</label>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Selected: {interests.length} interests
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">What are your strongest skills?</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={skills.includes(skill)}
                          onCheckedChange={() => toggleSelection(skill, skills, setSkills)}
                        />
                        <label htmlFor={skill} className="text-sm">{skill}</label>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Selected: {skills.length} skills
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">What are your career priorities?</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {careerGoalOptions.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={careerGoals.includes(goal)}
                          onCheckedChange={() => toggleSelection(goal, careerGoals, setCareerGoals)}
                        />
                        <label htmlFor={goal} className="text-sm">{goal}</label>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Selected: {careerGoals.length} goals
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Rate the importance of these factors (1-100)</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm">Job Market Demand</label>
                        <span className="text-sm font-medium">{preferences.jobMarket[0]}%</span>
                      </div>
                      <Slider
                        value={preferences.jobMarket}
                        onValueChange={(value) => setPreferences({...preferences, jobMarket: value})}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm">High Salary Potential</label>
                        <span className="text-sm font-medium">{preferences.salary[0]}%</span>
                      </div>
                      <Slider
                        value={preferences.salary}
                        onValueChange={(value) => setPreferences({...preferences, salary: value})}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm">Work-Life Balance</label>
                        <span className="text-sm font-medium">{preferences.workLifeBalance[0]}%</span>
                      </div>
                      <Slider
                        value={preferences.workLifeBalance}
                        onValueChange={(value) => setPreferences({...preferences, workLifeBalance: value})}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm">Career Growth Opportunities</label>
                        <span className="text-sm font-medium">{preferences.growth[0]}%</span>
                      </div>
                      <Slider
                        value={preferences.growth}
                        onValueChange={(value) => setPreferences({...preferences, growth: value})}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 flex gap-4">
              <Button className="btn-primary">
                <Target className="w-4 h-4 mr-2" />
                Get AI Recommendations
              </Button>
              <Button variant="outline">Save Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search courses or career paths..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedStream} onValueChange={setSelectedStream}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Filter by Stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Streams</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
              <SelectItem value="Commerce">Commerce</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Personalized Course Recommendations</h2>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                Showing {Math.min(visibleCoursesCount, filteredCourses.length)} of {filteredCourses.length} courses
              </Badge>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredCourses.slice(0, visibleCoursesCount).map((course, index) => (
              <Card key={course.id} className="feature-card hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-primary/20 text-primary">#{index + 1}</Badge>
                        <CardTitle className="text-xl">{course.name}</CardTitle>
                        <Badge variant="outline">{course.stream}</Badge>
                      </div>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Compatibility</div>
                      <div className={`text-2xl font-bold ${getMatchColor(course.compatibilityScore)}`}>
                        {course.compatibilityScore}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Average Salary</div>
                      <div className="font-semibold text-green-600">{course.avgSalary}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Job Outlook</div>
                      <div className="font-semibold">{course.jobOutlook}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Growth Rate</div>
                      <div className="font-semibold text-blue-600">{course.growth}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Market Demand</div>
                      <div className="flex items-center gap-2">
                        <Progress value={course.marketDemand} className="h-2 flex-1" />
                        <span className="text-sm">{course.marketDemand}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Required Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Career Opportunities</div>
                      <div className="flex flex-wrap gap-1">
                        {course.careers.map((career, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {career}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Top Colleges</div>
                    <div className="flex flex-wrap gap-1">
                      {course.topColleges.map((college, i) => (
                        <Badge key={i} className="text-xs bg-primary/20 text-primary">
                          {college}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      size="sm" 
                      className="btn-secondary"
                      onClick={() => navigate(`/dashboard/college-admission/course-tree/${course.id}?courseName=${encodeURIComponent(course.name)}`)}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Star className="w-4 h-4 mr-2" />
                      Save to Shortlist
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Connect with Alumni
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* View More Button */}
            {visibleCoursesCount < filteredCourses.length && (
              <div className="text-center pt-6">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setVisibleCoursesCount(prev => prev + coursesPerLoad)}
                  className="w-full md:w-auto"
                >
                  View {Math.min(coursesPerLoad, filteredCourses.length - visibleCoursesCount)} More Courses
                  <TrendingUp className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  {filteredCourses.length - visibleCoursesCount} more courses available
                </p>
              </div>
            )}
            
            {/* Show All Button (appears after loading some courses) */}
            {visibleCoursesCount >= 15 && visibleCoursesCount < filteredCourses.length && (
              <div className="text-center pt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setVisibleCoursesCount(filteredCourses.length)}
                  className="text-muted-foreground"
                >
                  Or view all {filteredCourses.length} courses at once
                </Button>
              </div>
            )}
          </div>
        </div>

        {filteredCourses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Matches Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or profile preferences to find suitable courses
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CourseMatcher;
