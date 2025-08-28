import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Briefcase, TrendingUp, Users, Award, Globe, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import GeminiCourseService, { type AICourseData, type AISubCourse } from "@/services/geminiCourseService";
import { getCourseNameById } from "@/data/courseData";

const CourseDetailTree = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedSubcourse, setSelectedSubcourse] = useState<AISubCourse | null>(null);
  const [isTreeVisible, setIsTreeVisible] = useState(false);
  const [visibleSubcourses, setVisibleSubcourses] = useState<string[]>([]);
  const [courseData, setCourseData] = useState<AICourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get course name from URL parameter (primary) or from courseData by ID (fallback)
  const courseNameFromUrl = searchParams.get('courseName');
  const courseNameFromData = courseId ? getCourseNameById(parseInt(courseId)) : undefined;
  
  const courseName = courseNameFromUrl || courseNameFromData || "Computer Science Engineering";

  // Load course data from AI
  useEffect(() => {
    const loadCourseData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await GeminiCourseService.generateSubcourses(courseName);
        setCourseData(data);
      } catch (err) {
        setError('Failed to load course data. Please try again.');
        console.error('Error loading course data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseName]);

  // Animation logic
  useEffect(() => {
    if (!courseData || loading) return;

    // Reset animations when course changes
    setIsTreeVisible(false);
    setVisibleSubcourses([]);
    setSelectedSubcourse(null);
    
    // Trigger tree animation after component mounts
    const timer = setTimeout(() => {
      setIsTreeVisible(true);
    }, 100);

    // Animate subcourses one by one
    courseData.subcourses.forEach((subcourse, index) => {
      setTimeout(() => {
        setVisibleSubcourses(prev => [...prev, subcourse.id]);
      }, 300 + (index * 100));
    });

    return () => clearTimeout(timer);
  }, [courseData, loading]);

  const handleRegenerateContent = async () => {
    GeminiCourseService.clearCache();
    setLoading(true);
    setError(null);
    
    try {
      const data = await GeminiCourseService.generateSubcourses(courseName);
      setCourseData(data);
    } catch (err) {
      setError('Failed to regenerate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating Course Tree</h2>
            <p className="text-gray-600">AI is creating personalized subcourses for {courseName}...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !courseData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {error || "Course Not Found"}
            </h2>
            <div className="space-y-2">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              {error && (
                <Button onClick={handleRegenerateContent} className="ml-2">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <style>
          {`
            @keyframes bounce-in {
              0% { transform: scale(0); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            
            @keyframes slide-up {
              0% { 
                transform: translateY(20px); 
                opacity: 0; 
              }
              100% { 
                transform: translateY(0); 
                opacity: 1; 
              }
            }
            
            .tree-node-animate {
              animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            
            .tree-branch-animate {
              animation: slide-up 0.5s ease-out;
            }
          `}
        </style>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course Matcher
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">{courseData.mainCourse}</h1>
            <p className="text-lg text-gray-600 mt-2">{courseData.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline">AI Generated</Badge>
              <Badge variant="secondary">Last Updated: {new Date(courseData.lastUpdated).toLocaleDateString()}</Badge>
              <Button size="sm" variant="ghost" onClick={handleRegenerateContent}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
        </div>

        {/* Animated Tree */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Course Specializations Tree
            </CardTitle>
            <CardDescription>
              Click on any specialization to view detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="min-h-[400px] p-8 relative"
              style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" }}
            >
              {/* Main Course Node */}
              <div className="text-center mb-16">
                <div 
                  className={`inline-block px-8 py-4 rounded-2xl text-white font-bold text-xl shadow-lg cursor-pointer transition-all duration-700 transform ${
                    isTreeVisible ? 'scale-100 opacity-100 tree-node-animate' : 'scale-100 opacity-50'
                  }`}
                  style={{ 
                    backgroundColor: courseData.color,
                    transformOrigin: 'center'
                  }}
                >
                  {courseData.mainCourse}
                </div>
              </div>

              {/* Debug info */}
              <div className="text-xs text-gray-500 mb-4 text-center">
                Debug: isTreeVisible={isTreeVisible.toString()}, courseId={courseId}, visibleCount={visibleSubcourses.length}
              </div>

              {/* Subcourse Branches */}
              <div className="flex flex-wrap justify-center gap-8">
                {courseData.subcourses.map((subcourse, index) => (
                  <div key={subcourse.id} className="relative">
                    {/* Connection Line */}
                    <div 
                      className={`absolute -top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-12 transition-all duration-300 ${
                        visibleSubcourses.includes(subcourse.id) ? 'opacity-100 scale-y-100' : 'opacity-30 scale-y-100'
                      }`}
                      style={{ 
                        backgroundColor: courseData.color,
                        transformOrigin: 'top'
                      }}
                    />
                    
                    {/* Subcourse Node */}
                    <div 
                      className={`bg-white border-3 rounded-xl p-4 max-w-48 min-h-20 flex items-center justify-center text-center font-semibold cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                        visibleSubcourses.includes(subcourse.id) 
                          ? 'translate-y-0 opacity-100 scale-100 tree-branch-animate' 
                          : 'translate-y-0 opacity-50 scale-100'
                      } ${
                        selectedSubcourse?.id === subcourse.id 
                          ? 'shadow-xl' 
                          : 'shadow-md hover:shadow-lg'
                      }`}
                      style={{ 
                        borderColor: courseData.color,
                        color: courseData.color,
                        boxShadow: selectedSubcourse?.id === subcourse.id 
                          ? `0 8px 30px ${courseData.color}40` 
                          : undefined
                      }}
                      onClick={() => setSelectedSubcourse(subcourse)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = courseData.color;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = courseData.color;
                      }}
                    >
                      {subcourse.name}
                    </div>
                  </div>
                )) || []}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subcourse Details */}
        {selectedSubcourse && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                {selectedSubcourse.name} - Detailed Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedSubcourse.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                      <p className="text-gray-600">{selectedSubcourse.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Difficulty</h4>
                      <p className="text-gray-600">{selectedSubcourse.difficulty}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Average Salary</h4>
                    <p className="text-green-600 font-semibold">{selectedSubcourse.averageSalary}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Market Demand</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                          style={{ width: `${selectedSubcourse.marketDemand}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{selectedSubcourse.marketDemand}%</span>
                    </div>
                  </div>

                  {selectedSubcourse.prerequisites && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Prerequisites</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubcourse.prerequisites.map((prereq, index) => (
                          <Badge key={index} variant="outline">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSubcourse.certification && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Popular Certification</h4>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                        <Award className="w-3 h-3 mr-1" />
                        {selectedSubcourse.certification}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Career Opportunities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubcourse.jobRoles.map((role, index) => (
                        <Badge key={index} variant="secondary">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Industry Applications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubcourse.industryApplications.map((industry, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-300">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubcourse.skills.map((skill, index) => (
                        <Badge key={index} style={{ backgroundColor: `${courseData.color}20`, color: courseData.color }}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" style={{ backgroundColor: courseData.color }}>
                      <Users className="w-4 h-4 mr-2" />
                      Find Courses & Colleges
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CourseDetailTree;
