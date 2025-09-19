import { useState, useEffect } from "react";
import { BarChart3, Target, TrendingUp, AlertCircle, CheckCircle, User, Code, BookOpen, ExternalLink, Play, Clock, Award, Search, Filter, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { geminiSkillGapService, type CourseData, type CourseSearchResult } from "@/services/geminiSkillGapService";

const SkillGapAnalysis = () => {
  const [selectedRole, setSelectedRole] = useState<string>("frontend-developer");
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [matchedCourse, setMatchedCourse] = useState<CourseData | null>(null);
  const [searchResults, setSearchResults] = useState<CourseSearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<CourseSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const { toast } = useToast();

  const targetRoles = [
    { id: "frontend-developer", name: "Frontend Developer", category: "Development" },
    { id: "data-scientist", name: "Data Scientist", category: "Analytics" },
    { id: "digital-marketer", name: "Digital Marketer", category: "Marketing" },
    { id: "product-manager", name: "Product Manager", category: "Management" },
    { id: "ui-designer", name: "UI/UX Designer", category: "Design" },
    { id: "cloud-engineer", name: "Cloud Engineer", category: "Infrastructure" }
  ];

  const skillAnalysis = {
    "frontend-developer": {
      required: [
        { skill: "HTML/CSS", level: 90, current: 85, status: "strong" },
        { skill: "JavaScript", level: 95, current: 70, status: "developing" },
        { skill: "React.js", level: 85, current: 60, status: "gap" },
        { skill: "Version Control (Git)", level: 80, current: 90, status: "strong" },
        { skill: "Responsive Design", level: 85, current: 75, status: "developing" },
        { skill: "Testing & Debugging", level: 75, current: 45, status: "gap" },
        { skill: "Web Performance", level: 70, current: 30, status: "gap" },
        { skill: "TypeScript", level: 80, current: 20, status: "critical" }
      ],
      trends: [
        { skill: "React/Next.js", demand: 95, growth: "+25%" },
        { skill: "TypeScript", demand: 88, growth: "+40%" },
        { skill: "Mobile Development", demand: 82, growth: "+18%" },
        { skill: "Web3/Blockchain", demand: 65, growth: "+60%" }
      ]
    },
    "data-scientist": {
      required: [
        { skill: "Python", level: 95, current: 80, status: "developing" },
        { skill: "Statistics", level: 90, current: 60, status: "gap" },
        { skill: "Machine Learning", level: 85, current: 40, status: "critical" },
        { skill: "SQL", level: 80, current: 70, status: "developing" },
        { skill: "Data Visualization", level: 75, current: 55, status: "gap" },
        { skill: "Big Data Tools", level: 70, current: 20, status: "critical" },
        { skill: "R Programming", level: 65, current: 25, status: "gap" },
        { skill: "Deep Learning", level: 80, current: 15, status: "critical" }
      ],
      trends: [
        { skill: "AI/ML", demand: 98, growth: "+35%" },
        { skill: "Big Data", demand: 85, growth: "+28%" },
        { skill: "Cloud Platforms", demand: 82, growth: "+22%" },
        { skill: "MLOps", demand: 75, growth: "+45%" }
      ]
    },
    "digital-marketer": {
      required: [
        { skill: "SEO/SEM", level: 90, current: 65, status: "developing" },
        { skill: "Google Analytics", level: 85, current: 70, status: "developing" },
        { skill: "Social Media Marketing", level: 80, current: 85, status: "strong" },
        { skill: "Content Creation", level: 85, current: 60, status: "gap" },
        { skill: "Email Marketing", level: 75, current: 45, status: "gap" },
        { skill: "PPC Advertising", level: 80, current: 30, status: "critical" },
        { skill: "Marketing Automation", level: 70, current: 25, status: "critical" },
        { skill: "Data Analysis", level: 75, current: 40, status: "gap" }
      ],
      trends: [
        { skill: "AI Marketing Tools", demand: 92, growth: "+45%" },
        { skill: "Video Marketing", demand: 88, growth: "+35%" },
        { skill: "Influencer Marketing", demand: 82, growth: "+28%" },
        { skill: "Marketing Analytics", demand: 85, growth: "+30%" }
      ]
    },
    "product-manager": {
      required: [
        { skill: "Product Strategy", level: 95, current: 70, status: "developing" },
        { skill: "User Research", level: 90, current: 65, status: "developing" },
        { skill: "Agile/Scrum", level: 85, current: 80, status: "strong" },
        { skill: "Data Analysis", level: 80, current: 55, status: "gap" },
        { skill: "Wireframing/Prototyping", level: 75, current: 40, status: "gap" },
        { skill: "Stakeholder Management", level: 90, current: 75, status: "developing" },
        { skill: "Technical Understanding", level: 70, current: 30, status: "critical" },
        { skill: "Market Research", level: 80, current: 60, status: "developing" }
      ],
      trends: [
        { skill: "AI Product Management", demand: 90, growth: "+40%" },
        { skill: "Data-Driven PM", demand: 85, growth: "+35%" },
        { skill: "Growth Hacking", demand: 78, growth: "+25%" },
        { skill: "User Experience", demand: 82, growth: "+20%" }
      ]
    },
    "ui-designer": {
      required: [
        { skill: "UI/UX Design", level: 95, current: 80, status: "developing" },
        { skill: "Figma/Sketch", level: 90, current: 85, status: "strong" },
        { skill: "User Research", level: 85, current: 60, status: "gap" },
        { skill: "Prototyping", level: 80, current: 75, status: "developing" },
        { skill: "Design Systems", level: 85, current: 50, status: "gap" },
        { skill: "Interaction Design", level: 80, current: 45, status: "gap" },
        { skill: "HTML/CSS", level: 70, current: 30, status: "critical" },
        { skill: "Accessibility", level: 75, current: 35, status: "critical" }
      ],
      trends: [
        { skill: "AI-Assisted Design", demand: 88, growth: "+50%" },
        { skill: "Voice UI Design", demand: 75, growth: "+40%" },
        { skill: "AR/VR Design", demand: 70, growth: "+60%" },
        { skill: "Motion Design", demand: 82, growth: "+30%" }
      ]
    },
    "cloud-engineer": {
      required: [
        { skill: "AWS/Azure/GCP", level: 95, current: 70, status: "developing" },
        { skill: "Docker/Kubernetes", level: 90, current: 55, status: "gap" },
        { skill: "Infrastructure as Code", level: 85, current: 40, status: "critical" },
        { skill: "CI/CD Pipelines", level: 80, current: 60, status: "developing" },
        { skill: "Linux/Unix", level: 85, current: 75, status: "developing" },
        { skill: "Networking", level: 80, current: 65, status: "developing" },
        { skill: "Security", level: 85, current: 35, status: "critical" },
        { skill: "Monitoring/Logging", level: 75, current: 45, status: "gap" }
      ],
      trends: [
        { skill: "DevOps/SRE", demand: 95, growth: "+35%" },
        { skill: "Serverless", demand: 85, growth: "+40%" },
        { skill: "Multi-Cloud", demand: 80, growth: "+30%" },
        { skill: "Cloud Security", demand: 90, growth: "+45%" }
      ]
    }
  };

  const learningPaths = [
    // Frontend Developer Paths
    {
      id: "react-path",
      skill: "React.js",
      roles: ["frontend-developer"],
      timeline: "6-8 weeks",
      difficulty: "Medium",
      priority: "High",
      totalLessons: 12,
      resources: [
        { type: "Course", name: "React Fundamentals", duration: "4 weeks", lessons: 8, url: "https://react.dev/learn" },
        { type: "Project", name: "Todo App", duration: "1 week", lessons: 2, url: "https://github.com/facebook/create-react-app" },
        { type: "Course", name: "Advanced React", duration: "3 weeks", lessons: 6, url: "https://react.dev/reference" },
        { type: "Project", name: "E-commerce Site", duration: "2 weeks", lessons: 4, url: "https://nextjs.org/learn" }
      ]
    },
    {
      id: "typescript-path", 
      skill: "TypeScript",
      roles: ["frontend-developer", "cloud-engineer"],
      timeline: "4-6 weeks",
      difficulty: "Medium",
      priority: "Critical",
      totalLessons: 10,
      resources: [
        { type: "Course", name: "TypeScript Basics", duration: "2 weeks", lessons: 4, url: "https://www.typescriptlang.org/docs/" },
        { type: "Project", name: "Type-safe API", duration: "1 week", lessons: 2, url: "https://github.com/microsoft/TypeScript" },
        { type: "Course", name: "Advanced Types", duration: "2 weeks", lessons: 4, url: "https://www.typescriptlang.org/docs/handbook/advanced-types.html" },
        { type: "Project", name: "React + TypeScript", duration: "1 week", lessons: 2, url: "https://react-typescript-cheatsheet.netlify.app/" }
      ]
    },
    {
      id: "testing-path",
      skill: "Testing & Debugging", 
      roles: ["frontend-developer"],
      timeline: "3-4 weeks",
      difficulty: "Medium",
      priority: "High",
      totalLessons: 8,
      resources: [
        { type: "Course", name: "Testing Fundamentals", duration: "2 weeks", lessons: 4, url: "https://jestjs.io/docs/getting-started" },
        { type: "Project", name: "Unit Testing", duration: "1 week", lessons: 2, url: "https://testing-library.com/" },
        { type: "Course", name: "E2E Testing", duration: "1 week", lessons: 2, url: "https://playwright.dev/" }
      ]
    },
    {
      id: "performance-path",
      skill: "Web Performance",
      roles: ["frontend-developer"],
      timeline: "3-5 weeks", 
      difficulty: "Advanced",
      priority: "Medium",
      totalLessons: 9,
      resources: [
        { type: "Course", name: "Performance Basics", duration: "2 weeks", lessons: 4, url: "https://web.dev/performance/" },
        { type: "Project", name: "Optimization Project", duration: "2 weeks", lessons: 3, url: "https://developers.google.com/web/tools/lighthouse" },
        { type: "Course", name: "Advanced Optimization", duration: "1 week", lessons: 2, url: "https://webpack.js.org/guides/performance/" }
      ]
    },
    // Data Scientist Paths
    {
      id: "python-ml-path",
      skill: "Machine Learning",
      roles: ["data-scientist"],
      timeline: "8-12 weeks",
      difficulty: "Advanced",
      priority: "Critical",
      totalLessons: 16,
      resources: [
        { type: "Course", name: "Python for Data Science", duration: "3 weeks", lessons: 6, url: "https://www.kaggle.com/learn/python" },
        { type: "Course", name: "Machine Learning Basics", duration: "4 weeks", lessons: 8, url: "https://www.coursera.org/learn/machine-learning" },
        { type: "Project", name: "ML Classification Project", duration: "2 weeks", lessons: 4, url: "https://scikit-learn.org/stable/tutorial/" },
        { type: "Course", name: "Deep Learning", duration: "3 weeks", lessons: 6, url: "https://www.deeplearning.ai/" }
      ]
    },
    {
      id: "data-viz-path",
      skill: "Data Visualization",
      roles: ["data-scientist"],
      timeline: "4-6 weeks",
      difficulty: "Medium",
      priority: "High",
      totalLessons: 10,
      resources: [
        { type: "Course", name: "Matplotlib & Seaborn", duration: "2 weeks", lessons: 4, url: "https://matplotlib.org/stable/tutorials/" },
        { type: "Course", name: "Plotly & Dash", duration: "2 weeks", lessons: 4, url: "https://plotly.com/python/" },
        { type: "Project", name: "Interactive Dashboard", duration: "2 weeks", lessons: 2, url: "https://dash.plotly.com/" }
      ]
    },
    // Digital Marketing Paths
    {
      id: "seo-path",
      skill: "SEO/SEM",
      roles: ["digital-marketer"],
      timeline: "5-7 weeks",
      difficulty: "Medium",
      priority: "High",
      totalLessons: 12,
      resources: [
        { type: "Course", name: "SEO Fundamentals", duration: "2 weeks", lessons: 4, url: "https://www.google.com/search/howsearchworks/" },
        { type: "Course", name: "Google Ads", duration: "2 weeks", lessons: 4, url: "https://skillshop.exceedlms.com/student/catalog" },
        { type: "Project", name: "SEO Campaign", duration: "2 weeks", lessons: 3, url: "https://analytics.google.com/analytics/academy/" },
        { type: "Course", name: "Advanced SEM", duration: "1 week", lessons: 1, url: "https://support.google.com/google-ads" }
      ]
    },
    {
      id: "marketing-automation-path",
      skill: "Marketing Automation",
      roles: ["digital-marketer"],
      timeline: "4-6 weeks",
      difficulty: "Medium",
      priority: "Critical",
      totalLessons: 10,
      resources: [
        { type: "Course", name: "Email Marketing", duration: "2 weeks", lessons: 4, url: "https://mailchimp.com/resources/" },
        { type: "Course", name: "Marketing Automation Tools", duration: "2 weeks", lessons: 4, url: "https://www.hubspot.com/resources" },
        { type: "Project", name: "Automation Campaign", duration: "2 weeks", lessons: 2, url: "https://blog.hubspot.com/marketing/automation" }
      ]
    },
    // Product Manager Paths
    {
      id: "product-strategy-path",
      skill: "Product Strategy",
      roles: ["product-manager"],
      timeline: "6-8 weeks",
      difficulty: "Advanced",
      priority: "Critical",
      totalLessons: 14,
      resources: [
        { type: "Course", name: "Product Management Basics", duration: "3 weeks", lessons: 6, url: "https://www.coursera.org/learn/intro-to-product-management" },
        { type: "Course", name: "Product Strategy", duration: "2 weeks", lessons: 4, url: "https://www.productplan.com/learn/" },
        { type: "Project", name: "Product Roadmap", duration: "2 weeks", lessons: 3, url: "https://www.aha.io/roadmapping/guide" },
        { type: "Course", name: "Product Analytics", duration: "1 week", lessons: 1, url: "https://amplitude.com/blog" }
      ]
    },
    {
      id: "user-research-path",
      skill: "User Research",
      roles: ["product-manager", "ui-designer"],
      timeline: "4-5 weeks",
      difficulty: "Medium",
      priority: "High",
      totalLessons: 9,
      resources: [
        { type: "Course", name: "UX Research Methods", duration: "2 weeks", lessons: 4, url: "https://www.nngroup.com/articles/" },
        { type: "Project", name: "User Interview Project", duration: "1 week", lessons: 2, url: "https://www.usertesting.com/resources" },
        { type: "Course", name: "Data-Driven UX", duration: "2 weeks", lessons: 3, url: "https://www.hotjar.com/blog/" }
      ]
    },
    // UI/UX Designer Paths
    {
      id: "design-systems-path",
      skill: "Design Systems",
      roles: ["ui-designer"],
      timeline: "5-7 weeks",
      difficulty: "Advanced",
      priority: "High",
      totalLessons: 12,
      resources: [
        { type: "Course", name: "Design System Fundamentals", duration: "2 weeks", lessons: 4, url: "https://www.designsystems.com/" },
        { type: "Course", name: "Component Libraries", duration: "2 weeks", lessons: 4, url: "https://storybook.js.org/tutorials/" },
        { type: "Project", name: "Design System Creation", duration: "3 weeks", lessons: 4, url: "https://www.figma.com/resources/" }
      ]
    },
    {
      id: "accessibility-path",
      skill: "Accessibility",
      roles: ["ui-designer", "frontend-developer"],
      timeline: "3-4 weeks",
      difficulty: "Medium",
      priority: "Critical",
      totalLessons: 8,
      resources: [
        { type: "Course", name: "Web Accessibility", duration: "2 weeks", lessons: 4, url: "https://www.w3.org/WAI/tutorials/" },
        { type: "Project", name: "Accessible Design Project", duration: "1 week", lessons: 2, url: "https://webaim.org/" },
        { type: "Course", name: "ARIA & Screen Readers", duration: "1 week", lessons: 2, url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" }
      ]
    },
    // Cloud Engineer Paths
    {
      id: "aws-path",
      skill: "AWS/Azure/GCP",
      roles: ["cloud-engineer"],
      timeline: "8-10 weeks",
      difficulty: "Advanced",
      priority: "Critical",
      totalLessons: 18,
      resources: [
        { type: "Course", name: "AWS Fundamentals", duration: "3 weeks", lessons: 6, url: "https://aws.amazon.com/training/" },
        { type: "Course", name: "Cloud Architecture", duration: "3 weeks", lessons: 6, url: "https://cloud.google.com/training" },
        { type: "Project", name: "Multi-tier Application", duration: "2 weeks", lessons: 4, url: "https://docs.microsoft.com/en-us/azure/" },
        { type: "Course", name: "Advanced Cloud Services", duration: "2 weeks", lessons: 2, url: "https://learn.microsoft.com/en-us/azure/" }
      ]
    },
    {
      id: "devops-path",
      skill: "CI/CD Pipelines",
      roles: ["cloud-engineer"],
      timeline: "5-7 weeks",
      difficulty: "Advanced",
      priority: "High",
      totalLessons: 12,
      resources: [
        { type: "Course", name: "Git & Version Control", duration: "1 week", lessons: 2, url: "https://git-scm.com/doc" },
        { type: "Course", name: "CI/CD with Jenkins", duration: "2 weeks", lessons: 4, url: "https://www.jenkins.io/doc/" },
        { type: "Course", name: "Docker & Kubernetes", duration: "3 weeks", lessons: 6, url: "https://kubernetes.io/docs/tutorials/" }
      ]
    },
    {
      id: "iac-path",
      skill: "Infrastructure as Code",
      roles: ["cloud-engineer"],
      timeline: "4-6 weeks",
      difficulty: "Advanced",
      priority: "Critical",
      totalLessons: 10,
      resources: [
        { type: "Course", name: "Terraform Basics", duration: "2 weeks", lessons: 4, url: "https://learn.hashicorp.com/terraform" },
        { type: "Course", name: "CloudFormation", duration: "2 weeks", lessons: 4, url: "https://docs.aws.amazon.com/cloudformation/" },
        { type: "Project", name: "IaC Deployment", duration: "2 weeks", lessons: 2, url: "https://registry.terraform.io/" }
      ]
    }
  ];

  // Functions for course management
  const enrollInCourse = (pathId: string) => {
    if (!enrolledCourses.includes(pathId)) {
      setEnrolledCourses(prev => [...prev, pathId]);
      setCompletedLessons(prev => ({ ...prev, [pathId]: 0 }));
      toast({
        title: "Enrolled Successfully!",
        description: `You've enrolled in the ${learningPaths.find(p => p.id === pathId)?.skill} learning path.`,
      });
    }
  };

  const markLessonComplete = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (path) {
      const currentCompleted = completedLessons[pathId] || 0;
      if (currentCompleted < path.totalLessons) {
        setCompletedLessons(prev => ({
          ...prev,
          [pathId]: currentCompleted + 1
        }));
        
        const newCompleted = currentCompleted + 1;
        const isPathCompleted = newCompleted === path.totalLessons;
        
        toast({
          title: isPathCompleted ? "🎉 Path Completed!" : "Lesson Completed!",
          description: isPathCompleted 
            ? `Congratulations! You've completed the ${path.skill} learning path.`
            : `Progress: ${newCompleted}/${path.totalLessons} lessons completed`,
        });
      }
    }
  };

  const openLearningResource = (url: string, resourceName: string) => {
    window.open(url, '_blank');
    toast({
      title: "Resource Opened",
      description: `Opening ${resourceName} in a new tab`,
    });
  };

  const getPathProgress = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return 0;
    const completed = completedLessons[pathId] || 0;
    return Math.round((completed / path.totalLessons) * 100);
  };

  // Handle course selection and get detailed analysis
  const handleCourseSelect = async (course: CourseSearchResult) => {
    setIsAnalyzing(true);
    try {
      const detailedCourse = await geminiSkillGapService.getCourseSkillAnalysis(
        course.name, 
        course.description
      );
      setMatchedCourse(detailedCourse);
      toast({
        title: "Course Selected",
        description: `Skill assessment updated for ${course.name}`,
      });
    } catch (error) {
      console.error('Error analyzing course:', error);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze course skills. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Apply filters to search results
  const handleApplyFilters = () => {
    console.log('Apply filters clicked');
    console.log('Search results:', searchResults);
    console.log('Selected category:', selectedCategory);
    console.log('Selected level:', selectedLevel);
    
    if (!searchResults.length) {
      toast({
        title: "No Results to Filter",
        description: "Please search for courses first before applying filters.",
      });
      return;
    }

    let filtered = searchResults;
    
    if (selectedCategory !== "all") {
      console.log('Filtering by category:', selectedCategory);
      filtered = filtered.filter(course => 
        course.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      console.log('After category filter:', filtered);
    }
    
    if (selectedLevel !== "all") {
      console.log('Filtering by level:', selectedLevel);
      filtered = filtered.filter(course => 
        course.level.toLowerCase().includes(selectedLevel.toLowerCase())
      );
      console.log('After level filter:', filtered);
    }

    console.log('Final filtered results:', filtered);
    setFilteredResults(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No Results",
        description: "No courses match the selected filters. Try different filter options.",
      });
    } else {
      toast({
        title: "Filters Applied",
        description: `Showing ${filtered.length} course(s) matching your filters.`,
      });
    }
  };

  // Clear search and results
  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setMatchedCourse(null);
    setSearchResults([]);
    setFilteredResults([]);
  };

  // Load categories and levels on component mount
  useEffect(() => {
    const loadFilters = async () => {
      try {
        console.log('Loading filter options...');
        const [categoriesData, levelsData] = await Promise.all([
          geminiSkillGapService.getCourseCategories(),
          geminiSkillGapService.getCourseLevels()
        ]);
        console.log('Categories loaded:', categoriesData);
        console.log('Levels loaded:', levelsData);
        setCategories(categoriesData);
        setLevels(levelsData);
      } catch (error) {
        console.error('Error loading filters:', error);
      }
    };
    loadFilters();
  }, []);

  // Load enrolled courses and progress from localStorage
  useEffect(() => {
    const savedCourses = localStorage.getItem('enrolledCourses');
    const savedProgress = localStorage.getItem('lessonProgress');
    
    if (savedCourses) {
      setEnrolledCourses(JSON.parse(savedCourses));
    }
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    }
  }, []);

  // Manual search function
  const handleApplySearch = async () => {
    console.log('Search initiated with query:', searchQuery);
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a course name to search.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    try {
      console.log('Calling geminiSkillGapService.searchCourses...');
      const results = await geminiSkillGapService.searchCourses(searchQuery.trim(), 8);
      console.log('Search results received:', results);
      
      setSearchResults(results);
      setFilteredResults([]); // Reset filtered results when new search is performed
      
      if (results.length === 0) {
        toast({
          title: "No Results",
          description: "No courses found. Try a different search term.",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${results.length} course(s). Use filters to narrow down results.`,
        });
      }
    } catch (error) {
      console.error('Error searching courses:', error);
      toast({
        title: "Search Error",
        description: "Failed to search courses. Please try again.",
        variant: "destructive"
      });
      setSearchResults([]);
      setFilteredResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Remove automatic search effect and replace with manual trigger
  useEffect(() => {
    // Only clear results when search query is completely empty
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setFilteredResults([]);
    }
  }, [searchQuery]);

  // Save progress when state changes
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('lessonProgress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Get role-specific course recommendations
  const getRoleSpecificCourses = (role: string) => {
    const courseRecommendations = {
      "frontend-developer": [
        { name: "Advanced JavaScript", provider: "freeCodeCamp", rating: 4.8, duration: "8 hours", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
        { name: "React Testing Library", provider: "Testing Library", rating: 4.7, duration: "6 hours", url: "https://testing-library.com/docs/react-testing-library/intro/" },
        { name: "Web Performance Optimization", provider: "Google Developers", rating: 4.9, duration: "12 hours", url: "https://developers.google.com/web/fundamentals/performance" },
        { name: "Modern CSS Techniques", provider: "CSS-Tricks", rating: 4.6, duration: "10 hours", url: "https://css-tricks.com/" }
      ],
      "data-scientist": [
        { name: "Python Data Science", provider: "Kaggle Learn", rating: 4.9, duration: "15 hours", url: "https://www.kaggle.com/learn/python" },
        { name: "Machine Learning Course", provider: "Coursera", rating: 4.8, duration: "50 hours", url: "https://www.coursera.org/learn/machine-learning" },
        { name: "Deep Learning Specialization", provider: "deeplearning.ai", rating: 4.9, duration: "120 hours", url: "https://www.deeplearning.ai/" },
        { name: "Data Visualization with Python", provider: "Matplotlib", rating: 4.6, duration: "20 hours", url: "https://matplotlib.org/stable/tutorials/" }
      ],
      "digital-marketer": [
        { name: "Google Analytics Certification", provider: "Google", rating: 4.8, duration: "12 hours", url: "https://analytics.google.com/analytics/academy/" },
        { name: "Facebook Ads Mastery", provider: "Meta", rating: 4.7, duration: "15 hours", url: "https://www.facebook.com/business/learn" },
        { name: "Content Marketing Strategy", provider: "HubSpot", rating: 4.6, duration: "10 hours", url: "https://academy.hubspot.com/" },
        { name: "SEO Fundamentals", provider: "Moz Academy", rating: 4.8, duration: "8 hours", url: "https://moz.com/learn/seo" }
      ],
      "product-manager": [
        { name: "Product Management Fundamentals", provider: "Coursera", rating: 4.7, duration: "25 hours", url: "https://www.coursera.org/learn/intro-to-product-management" },
        { name: "Agile Product Development", provider: "Scrum.org", rating: 4.8, duration: "16 hours", url: "https://www.scrum.org/resources" },
        { name: "User Experience for PMs", provider: "Interaction Design Foundation", rating: 4.6, duration: "20 hours", url: "https://www.interaction-design.org/" },
        { name: "Data-Driven Product Management", provider: "Amplitude", rating: 4.9, duration: "12 hours", url: "https://amplitude.com/blog" }
      ],
      "ui-designer": [
        { name: "UI/UX Design Specialization", provider: "Coursera", rating: 4.8, duration: "30 hours", url: "https://www.coursera.org/specializations/ui-ux-design" },
        { name: "Figma Masterclass", provider: "Figma", rating: 4.9, duration: "15 hours", url: "https://www.figma.com/resources/" },
        { name: "Design Systems", provider: "Design+Code", rating: 4.7, duration: "20 hours", url: "https://designcode.io/" },
        { name: "Accessibility in Design", provider: "WebAIM", rating: 4.6, duration: "8 hours", url: "https://webaim.org/" }
      ],
      "cloud-engineer": [
        { name: "AWS Solutions Architect", provider: "AWS", rating: 4.9, duration: "40 hours", url: "https://aws.amazon.com/training/" },
        { name: "Kubernetes Administration", provider: "Linux Foundation", rating: 4.8, duration: "35 hours", url: "https://training.linuxfoundation.org/" },
        { name: "Terraform Certification", provider: "HashiCorp", rating: 4.7, duration: "25 hours", url: "https://learn.hashicorp.com/terraform" },
        { name: "Docker Deep Dive", provider: "Docker", rating: 4.8, duration: "18 hours", url: "https://docs.docker.com/" }
      ]
    };

    return courseRecommendations[role as keyof typeof courseRecommendations] || [];
  };

  const currentSkills = skillAnalysis[selectedRole as keyof typeof skillAnalysis];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong": return "text-green-600 bg-green-100";
      case "developing": return "text-blue-600 bg-blue-100";
      case "gap": return "text-orange-600 bg-orange-100";
      case "critical": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "strong": return <CheckCircle className="w-4 h-4" />;
      case "developing": return <TrendingUp className="w-4 h-4" />;
      case "gap": case "critical": return <AlertCircle className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  // Calculate overall score based on selected course or default
  const getOverallScore = () => {
    if (matchedCourse) {
      return Math.round(
        matchedCourse.skills.reduce((acc, skill) => acc + (skill.current / skill.level) * 100, 0) / 
        matchedCourse.skills.length
      );
    }
    return 0;
  };

  // Get skill counts for selected course
  const getSkillCounts = () => {
    if (matchedCourse) {
      return ["strong", "developing", "gap", "critical"].map(status => ({
        status,
        count: matchedCourse.skills.filter(skill => skill.status === status).length
      }));
    }
    return ["strong", "developing", "gap", "critical"].map(status => ({ status, count: 0 }));
  };

  return (
    <DashboardLayout 
      title="Skill Gap Analysis" 
      description="Search for courses and analyze your skill gaps in real-time"
    >
      <div className="p-6 space-y-8">
        {/* Overall Assessment */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Your Skill Assessment
              </h2>
              <p className="text-muted-foreground">
                {matchedCourse 
                  ? `Based on requirements for ${matchedCourse.name}` 
                  : "Select a course to see your skill assessment"
                }
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{getOverallScore()}%</div>
              <div className="text-sm text-muted-foreground">Overall Readiness</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {getSkillCounts().map(({ status, count }) => (
              <div key={status} className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm capitalize">{status} Skills</div>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">Skill Analysis</TabsTrigger>
            <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            {/* Course Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Course Search & Skill Assessment
                </CardTitle>
                <CardDescription>Search for courses and get personalized skill assessments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Bar */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search for courses (e.g., Web Development, Data Science, Digital Marketing)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-10"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleApplySearch();
                        }
                      }}
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={clearSearch}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <Button 
                    onClick={handleApplySearch}
                    disabled={!searchQuery.trim() || isSearching}
                    className="flex items-center gap-2"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Apply Search
                      </>
                    )}
                  </Button>
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-end">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {levels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    onClick={handleApplyFilters}
                    disabled={!searchResults.length || isSearching}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Apply Filters
                  </Button>

                  {filteredResults.length > 0 && (
                    <Button 
                      onClick={() => setFilteredResults([])} 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Clear Filters
                    </Button>
                  )}

                  {(searchQuery || selectedCategory !== "all" || selectedLevel !== "all") && (
                    <Button variant="outline" onClick={clearSearch}>
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Course Results */}
                {((searchResults.length > 0 || filteredResults.length > 0) || isSearching) && (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {/* Results Status */}
                    {searchResults.length > 0 && !isSearching && (
                      <div className="flex items-center justify-between text-sm text-muted-foreground border-b pb-2">
                        <span>
                          {filteredResults.length > 0 
                            ? `Showing ${filteredResults.length} of ${searchResults.length} courses (filtered)`
                            : `Showing all ${searchResults.length} courses`
                          }
                        </span>
                        {filteredResults.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Filters Applied
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {isSearching ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                        <p>Searching for courses...</p>
                      </div>
                    ) : (filteredResults.length > 0 ? filteredResults : searchResults).length > 0 ? (
                      (filteredResults.length > 0 ? filteredResults : searchResults).map(course => (
                        <div
                          key={course.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            matchedCourse?.id === course.id ? 'border-primary bg-primary/5' : 'border-border'
                          } ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
                          onClick={() => handleCourseSelect(course)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium">{course.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Badge variant="outline">{course.category}</Badge>
                                </span>
                                <span>{course.level}</span>
                                <span>{course.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {isAnalyzing && matchedCourse?.name === course.name && (
                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                              )}
                              {matchedCourse?.id === course.id && (
                                <CheckCircle className="w-5 h-5 text-primary" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : null}
                  </div>
                )}

                {!searchResults.length && !filteredResults.length && !isSearching && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Enter a course name and click "Apply Search"</p>
                    <p className="text-sm">Try searching for "Python", "React", "Digital Marketing", etc.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skill Assessment */}
            {matchedCourse ? (
              <Card>
                <CardHeader>
                  <CardTitle>Skills Required for {matchedCourse.name}</CardTitle>
                  <CardDescription>Your current level vs course requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {matchedCourse.skills.map((skill, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{skill.skill}</span>
                            <Badge className={`${getStatusColor(skill.status)} border-0`}>
                              {getStatusIcon(skill.status)}
                              <span className="ml-1 capitalize">{skill.status}</span>
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {skill.current}% / {skill.level}%
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Your Level</span>
                            <span>Required Level</span>
                          </div>
                          <div className="relative">
                            <Progress value={skill.level} className="h-3 bg-gray-200" />
                            <Progress 
                              value={skill.current} 
                              className="h-3 absolute top-0 bg-transparent" 
                            />
                          </div>
                        </div>
                        
                        {skill.current < skill.level && (
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                              Gap: {skill.level - skill.current}% improvement needed
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                Find Learning Resources
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs">
                                Practice Exercises
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Skills Assessment</CardTitle>
                  <CardDescription>Select a course above to see detailed skill requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No Course Selected</p>
                    <p className="text-sm">Search and select a course to view the skill assessment</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Recommended Courses for {targetRoles.find(r => r.id === selectedRole)?.name}
                </CardTitle>
                <CardDescription>Curated courses to fill your skill gaps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {/* Critical Skills Courses */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-red-600">🔥 Critical Skill Gaps</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentSkills.required
                        .filter(skill => skill.status === "critical")
                        .map((skill, index) => (
                          <Card key={index} className="border-red-200 bg-red-50/50">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg flex items-center justify-between">
                                {skill.skill}
                                <Badge variant="destructive">Critical</Badge>
                              </CardTitle>
                              <CardDescription>
                                Gap: {skill.level - skill.current}% improvement needed
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="space-y-2">
                                  {[
                                    { name: `${skill.skill} Fundamentals`, provider: "Codecademy", duration: "20 hours", price: "Free" },
                                    { name: `Advanced ${skill.skill}`, provider: "Udemy", duration: "40 hours", price: "$49.99" },
                                    { name: `${skill.skill} Masterclass`, provider: "Pluralsight", duration: "15 hours", price: "$29/month" }
                                  ].map((course, courseIndex) => (
                                    <div key={courseIndex} className="p-3 bg-white rounded-lg border">
                                      <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium text-sm">{course.name}</h4>
                                        <Badge variant="outline" className="text-xs">{course.price}</Badge>
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-2">
                                        {course.provider} • {course.duration}
                                      </p>
                                      <Button 
                                        size="sm" 
                                        className="w-full"
                                        onClick={() => {
                                          const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(course.name + ' ' + course.provider)}`;
                                          openLearningResource(searchUrl, course.name);
                                        }}
                                      >
                                        <ExternalLink className="w-3 h-3 mr-2" />
                                        Enroll Now
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>

                  {/* Gap Skills Courses */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-orange-600">⚡ Important Skill Gaps</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {currentSkills.required
                        .filter(skill => skill.status === "gap")
                        .map((skill, index) => (
                          <Card key={index} className="border-orange-200 bg-orange-50/50">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">{skill.skill}</CardTitle>
                              <CardDescription className="text-sm">
                                {skill.level - skill.current}% gap
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => {
                                    const searchUrl = `https://www.coursera.org/search?query=${encodeURIComponent(skill.skill)}`;
                                    openLearningResource(searchUrl, `${skill.skill} Courses`);
                                  }}
                                >
                                  <BookOpen className="w-3 h-3 mr-2" />
                                  Find Courses
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => {
                                    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(skill.skill + ' tutorial')}`;
                                    openLearningResource(searchUrl, `${skill.skill} Tutorials`);
                                  }}
                                >
                                  <Play className="w-3 h-3 mr-2" />
                                  Free Tutorials
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>

                  {/* Skill Enhancement Courses */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-blue-600">📈 Skills to Enhance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {currentSkills.required
                        .filter(skill => skill.status === "developing")
                        .map((skill, index) => (
                          <Card key={index} className="border-blue-200 bg-blue-50/50">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">{skill.skill}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <Progress value={(skill.current / skill.level) * 100} className="h-2" />
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="w-full text-xs"
                                  onClick={() => {
                                    const searchUrl = `https://www.edx.org/search?q=${encodeURIComponent(skill.skill)}`;
                                    openLearningResource(searchUrl, `${skill.skill} Advanced Courses`);
                                  }}
                                >
                                  Advanced Courses
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>

                  {/* Course Platforms */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Learning Platforms</CardTitle>
                      <CardDescription>Top platforms for skill development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { name: "Coursera", description: "University courses", url: "https://www.coursera.org/" },
                          { name: "Udemy", description: "Practical skills", url: "https://www.udemy.com/" },
                          { name: "Pluralsight", description: "Tech skills", url: "https://www.pluralsight.com/" },
                          { name: "freeCodeCamp", description: "Free coding", url: "https://www.freecodecamp.org/" },
                          { name: "edX", description: "University courses", url: "https://www.edx.org/" },
                          { name: "Khan Academy", description: "Free learning", url: "https://www.khanacademy.org/" },
                          { name: "LinkedIn Learning", description: "Professional skills", url: "https://www.linkedin.com/learning/" },
                          { name: "YouTube", description: "Free tutorials", url: "https://www.youtube.com/" }
                        ].map((platform, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="h-auto p-3 flex flex-col items-start"
                            onClick={() => openLearningResource(platform.url, platform.name)}
                          >
                            <div className="font-medium text-sm">{platform.name}</div>
                            <div className="text-xs text-muted-foreground">{platform.description}</div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            {matchedCourse ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Industry Skill Trends for {matchedCourse.name}</CardTitle>
                    <CardDescription>Most in-demand skills and their growth rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {matchedCourse.trends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium">{trend.skill}</div>
                            <div className="text-sm text-muted-foreground">Market Demand: {trend.demand}%</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{trend.growth}</div>
                            <div className="text-sm text-muted-foreground">Growth Rate</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {matchedCourse.skills.filter(skill => skill.status === "critical").length > 0 && (
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <h4 className="font-semibold text-red-800">Critical Skills</h4>
                          <p className="text-sm text-red-600 mt-1">
                            Focus on {matchedCourse.skills.filter(skill => skill.status === "critical").map(skill => skill.skill).join(", ")} to meet course requirements
                          </p>
                        </div>
                      )}
                      
                      {matchedCourse.skills.filter(skill => skill.status === "gap").length > 0 && (
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-semibold text-orange-800">Skills to Improve</h4>
                          <p className="text-sm text-orange-600 mt-1">
                            Enhance {matchedCourse.skills.filter(skill => skill.status === "gap").map(skill => skill.skill).join(", ")} for better course performance
                          </p>
                        </div>
                      )}
                      
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800">Career Impact</h4>
                        <p className="text-sm text-green-600 mt-1">
                          Completing {matchedCourse.name} will make you competitive in the {matchedCourse.category.toLowerCase()} field
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Industry Skill Trends</CardTitle>
                  <CardDescription>Select a course to see relevant market trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No Course Selected</p>
                    <p className="text-sm">Search and select a course to view market trends and skill recommendations</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            {/* Overall Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Learning Progress Overview
                </CardTitle>
                <CardDescription>Track your progress across all learning paths</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{enrolledCourses.length}</div>
                    <div className="text-sm text-blue-600">Enrolled Paths</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Object.values(completedLessons).reduce((acc, curr) => acc + curr, 0)}
                    </div>
                    <div className="text-sm text-green-600">Lessons Completed</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {learningPaths.filter(path => getPathProgress(path.id) === 100).length}
                    </div>
                    <div className="text-sm text-purple-600">Paths Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Gap Recommendations */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Based on your skill analysis, we recommend starting with <strong>TypeScript</strong> and <strong>React.js</strong> 
                to address your most critical skill gaps for the {targetRoles.find(r => r.id === selectedRole)?.name} role.
              </AlertDescription>
            </Alert>

            <div className="grid gap-6">
              {learningPaths
                .filter(path => path.roles.includes(selectedRole))
                .map((path, index) => {
                const isEnrolled = enrolledCourses.includes(path.id);
                const progress = getPathProgress(path.id);
                const completedCount = completedLessons[path.id] || 0;
                
                return (
                  <Card key={index} className={`transition-all duration-300 ${isEnrolled ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Code className="w-5 h-5" />
                          {path.skill}
                          {isEnrolled && <Badge variant="secondary">Enrolled</Badge>}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant={path.priority === "Critical" ? "destructive" : path.priority === "High" ? "default" : "secondary"}>
                            {path.priority} Priority
                          </Badge>
                          <Badge variant="outline">{path.difficulty}</Badge>
                        </div>
                      </div>
                      <CardDescription className="flex items-center gap-4">
                        <span>Complete in {path.timeline}</span>
                        <span>•</span>
                        <span>{path.totalLessons} total lessons</span>
                        {isEnrolled && (
                          <>
                            <span>•</span>
                            <span className="text-primary font-medium">{progress}% completed</span>
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {isEnrolled && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{completedCount}/{path.totalLessons} lessons</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        )}
                        
                        <h4 className="font-semibold">Learning Path:</h4>
                        <div className="space-y-3">
                          {path.resources.map((resource, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                                  {idx + 1}
                                </div>
                                <div>
                                  <div className="font-medium">{resource.name}</div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    {resource.type}
                                    <span>•</span>
                                    <span>{resource.lessons} lessons</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{resource.duration}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openLearningResource(resource.url, resource.name)}
                                  className="flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  Open
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 pt-4">
                          {!isEnrolled ? (
                            <Button 
                              className="flex-1 flex items-center gap-2" 
                              onClick={() => enrollInCourse(path.id)}
                            >
                              <Play className="w-4 h-4" />
                              Start Learning Path
                            </Button>
                          ) : (
                            <>
                              {progress < 100 ? (
                                <Button 
                                  className="flex-1 flex items-center gap-2" 
                                  onClick={() => markLessonComplete(path.id)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Mark Lesson Complete
                                </Button>
                              ) : (
                                <Button className="flex-1" disabled>
                                  <Award className="w-4 h-4 mr-2" />
                                  Path Completed!
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                className="flex items-center gap-2"
                                onClick={() => {
                                  const nextResource = path.resources[Math.min(Math.floor(completedCount / 2), path.resources.length - 1)];
                                  openLearningResource(nextResource.url, nextResource.name);
                                }}
                              >
                                <BookOpen className="w-4 h-4" />
                                Continue
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recommended Courses Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Additional Course Recommendations for {targetRoles.find(r => r.id === selectedRole)?.name}
                </CardTitle>
                <CardDescription>Explore more courses to enhance your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getRoleSpecificCourses(selectedRole).map((course, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{course.name}</h4>
                        <Badge variant="outline">⭐ {course.rating}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        By {course.provider} • {course.duration}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => openLearningResource(course.url, course.name)}
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        View Course
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SkillGapAnalysis;
