import { 
  Brain, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award,
  Lightbulb,
  BarChart3,
  Compass,
  Rocket,
  Shield,
  Zap
} from "lucide-react";

const FeaturesSection = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Assessment",
      description: "Advanced algorithms analyze your skills, interests, and personality to provide personalized recommendations.",
      color: "text-primary"
    },
    {
      icon: Compass,
      title: "Career Path Mapping",
      description: "Visualize clear roadmaps for different career paths with required skills and milestones.",
      color: "text-secondary"
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Real-time insights into job market trends, salary expectations, and emerging opportunities.",
      color: "text-accent"
    },
    {
      icon: BookOpen,
      title: "Skill Development",
      description: "Curated learning paths and resources to build the skills you need for your chosen career.",
      color: "text-primary"
    }
  ];

  const categoryFeatures = [
    {
      category: "Class 8-10",
      subtitle: "Awareness & Discovery",
      icon: Lightbulb,
      features: [
        "Aptitude tests & personality quizzes",
        "Career awareness modules",
        "Skill starter packs",
        "Stress management guides",
        "Gamified learning challenges"
      ],
      color: "border-primary/30 bg-primary/5"
    },
    {
      category: "Class 11-12", 
      subtitle: "Decision Making",
      icon: Target,
      features: [
        "Career pathway explorer",
        "Competitive exam prep roadmap",
        "Alternative career options",
        "College & branch insights",
        "Peer & mentor interaction"
      ],
      color: "border-secondary/30 bg-secondary/5"
    },
    {
      category: "Post-12th",
      subtitle: "College Admission",
      icon: BarChart3,
      features: [
        "College comparison tool",
        "Career vs Interest matchmaker",
        "ROI calculator",
        "What If simulator",
        "Scholarship & funding guides"
      ],
      color: "border-accent/30 bg-accent/5"
    },
    {
      category: "College Students",
      subtitle: "Skill Development",
      icon: Rocket,
      features: [
        "Skill gap analyzer",
        "Personalized learning paths",
        "Industry trends dashboard",
        "Internship opportunities",
        "Placement readiness kit"
      ],
      color: "border-primary/30 bg-primary/5"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-transparent to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Features */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need for
            <span className="text-glow block">Career Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge AI with expert career guidance 
            to provide personalized recommendations for every stage of your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="feature-card text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Category-Specific Features */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Tailored for Every Student</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">
            Specialized Features by
            <span className="text-glow block">Student Category</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {categoryFeatures.map((category, index) => (
            <div key={index} className={`feature-card ${category.color}`}>
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">{category.category}</h4>
                  <p className="text-muted-foreground">{category.subtitle}</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {category.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;