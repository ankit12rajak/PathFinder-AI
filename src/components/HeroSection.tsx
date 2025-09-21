import { ArrowRight, Sparkles, Target, Users, TrendingUp, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const stats = [
    { value: "50K+", label: "Students Guided", icon: Users },
    { value: "95%", label: "Success Rate", icon: Target },
    { value: "200+", label: "Career Paths", icon: TrendingUp },
  ];

  const handleStartJourney = () => {
    navigate('/auth');
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId("https://youtu.be/Olo9zdqS01M");

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI-Powered Career Guidance</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Navigate Your
                  <span className="text-glow block">Future Career</span>
                  with AI Precision
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Personalized career guidance powered by advanced AI. Discover your strengths, 
                  explore career paths, and develop the skills needed for tomorrow's job market.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleStartJourney}
                  className="btn-hero flex items-center space-x-2 justify-center hover:scale-105 transition-transform duration-300"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={openVideoModal}
                  className="btn-secondary flex items-center space-x-2 justify-center hover:scale-105 transition-transform duration-300"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={heroImage} 
                  alt="AI Career Guidance Platform" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 feature-card p-4 animate-pulse">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">AI Active</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 feature-card p-4">
                <div className="text-sm">
                  <div className="font-semibold text-primary">Career Match</div>
                  <div className="text-muted-foreground">96% Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeVideoModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl mx-4 bg-background rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b bg-muted/50">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Play className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">PathFinder AI Demo</h3>
                  <p className="text-sm text-muted-foreground">Discover how AI guides your career journey</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeVideoModal}
                className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Video Container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="PathFinder AI Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 bg-muted/30 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Ready to start your journey?
                </div>
                <Button 
                  onClick={() => {
                    closeVideoModal();
                    handleStartJourney();
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Get Started Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;