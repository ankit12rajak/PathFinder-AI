import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Target, 
  GraduationCap, 
  Briefcase,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      id: "early-stage",
      title: "Class 8-10",
      subtitle: "Early Stage / Awareness Phase",
      icon: BookOpen,
      color: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30",
      description: "Focus on exposure, self-discovery, and reducing academic stress while exploring various career fields.",
      keyPoints: [
        "Discover your natural strengths and interests",
        "Learn about different career fields in engaging ways", 
        "Build foundational skills through interactive activities",
        "Develop healthy study habits and stress management"
      ],
      stats: { students: "2.5M+", satisfaction: "94%", timeSpent: "30 min/day" },
      dashboardLink: "/auth"
    },
    {
      id: "decision-making",
      title: "Class 11-12", 
      subtitle: "Decision-Making / Competitive Exams",
      icon: Target,
      color: "from-green-500/20 to-teal-500/20",
      borderColor: "border-green-500/30",
      description: "Navigate career decisions, prepare for competitive exams, and explore multiple pathways to success.",
      keyPoints: [
        "Get clear guidance on career pathways and requirements",
        "Smart strategies for competitive exam preparation",
        "Explore alternative career options beyond traditional paths",
        "Connect with mentors and successful seniors"
      ],
      stats: { students: "1.8M+", satisfaction: "96%", timeSpent: "45 min/day" },
      dashboardLink: "/auth"
    },
    {
      id: "college-admission",
      title: "Post-12th Students",
      subtitle: "College Admission Stage", 
      icon: GraduationCap,
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      description: "Make informed decisions about college selection, course choices, and evaluate return on investment.",
      keyPoints: [
        "Compare colleges based on placements, fees, and opportunities",
        "Match your interests with the right courses and specializations",
        "Calculate ROI for different education paths",
        "Access scholarship and funding opportunities"
      ],
      stats: { students: "950K+", satisfaction: "97%", timeSpent: "60 min/day" },
      dashboardLink: "/auth"
    },
    {
      id: "skill-development",
      title: "College Students",
      subtitle: "Skill Development / Employability Stage",
      icon: Briefcase,
      color: "from-purple-500/20 to-pink-500/20", 
      borderColor: "border-purple-500/30",
      description: "Bridge the gap between academic learning and industry requirements with targeted skill development.",
      keyPoints: [
        "Identify and fill critical skill gaps for your career goals",
        "Follow AI-curated learning paths for in-demand skills",
        "Stay updated with latest industry trends and requirements",
        "Get placement-ready with resume building and interview prep"
      ],
      stats: { students: "1.2M+", satisfaction: "95%", timeSpent: "90 min/day" },
      dashboardLink: "/auth"
    }
  ];

  return (
    <section id="categories" className="py-24 bg-gradient-to-b from-muted/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Student Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Designed for Every
            <span className="text-glow block">Stage of Your Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each student category has unique needs and challenges. Our platform provides 
            specialized features and guidance tailored to your current academic stage.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`feature-card p-4 transition-all ${
                activeCategory === index 
                  ? category.borderColor + ' bg-gradient-to-r ' + category.color
                  : 'hover:border-primary/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <category.icon className={`w-6 h-6 ${activeCategory === index ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="text-left">
                  <div className={`font-semibold ${activeCategory === index ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {category.title}
                  </div>
                  <div className="text-sm text-muted-foreground hidden sm:block">
                    {category.subtitle}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Category Details */}
        <div className="feature-card p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categories[activeCategory].color} flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = categories[activeCategory].icon;
                      return <IconComponent className="w-6 h-6 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{categories[activeCategory].title}</h3>
                    <p className="text-muted-foreground">{categories[activeCategory].subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {categories[activeCategory].description}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Key Features:</h4>
                <ul className="space-y-3">
                  {categories[activeCategory].keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/auth">
                <button className="btn-hero flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{categories[activeCategory].stats.students}</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10">
                  <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{categories[activeCategory].stats.satisfaction}</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10">
                  <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{categories[activeCategory].stats.timeSpent}</div>
                  <div className="text-sm text-muted-foreground">Daily Use</div>
                </div>
              </div>

              {/* Visual Element */}
              <div className={`relative rounded-2xl p-8 bg-gradient-to-br ${categories[activeCategory].color} border ${categories[activeCategory].borderColor}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl"></div>
                <div className="relative text-center">
                  {(() => {
                    const IconComponent = categories[activeCategory].icon;
                    return <IconComponent className="w-16 h-16 text-primary mx-auto mb-4" />;
                  })()}
                  <h4 className="text-xl font-bold mb-2">Ready to Start?</h4>
                  <p className="text-muted-foreground">
                    Join thousands of students who have successfully navigated their career journey with our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;