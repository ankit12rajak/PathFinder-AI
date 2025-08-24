import { useState } from "react";
import { BookOpen, Code, Palette, Microscope, Calculator, Globe, Music, Wrench, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";

const CareerExplorer = () => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const careerFields = [
    {
      id: "stem",
      name: "STEM",
      icon: Microscope,
      color: "from-blue-500 to-cyan-500",
      description: "Science, Technology, Engineering & Mathematics",
      careers: ["Software Engineer", "Doctor", "Research Scientist", "Data Analyst", "Aerospace Engineer"],
      skills: ["Problem Solving", "Analytical Thinking", "Mathematical Skills", "Research"],
      story: "Imagine creating the next breakthrough in medicine or developing apps that millions use daily!"
    },
    {
      id: "arts",
      name: "Arts & Creative",
      icon: Palette,
      color: "from-pink-500 to-purple-500",
      description: "Visual Arts, Performing Arts & Creative Expression",
      careers: ["Graphic Designer", "Filmmaker", "Writer", "Animator", "Art Director"],
      skills: ["Creativity", "Visual Communication", "Storytelling", "Innovation"],
      story: "Turn your imagination into reality through visual arts, stories, and creative expression!"
    },
    {
      id: "business",
      name: "Business & Commerce",
      icon: Calculator,
      color: "from-green-500 to-emerald-500",
      description: "Finance, Management & Entrepreneurship",
      careers: ["Business Analyst", "Marketing Manager", "Entrepreneur", "Accountant", "Consultant"],
      skills: ["Leadership", "Communication", "Strategic Thinking", "Financial Literacy"],
      story: "Lead teams, start your own company, or help businesses grow and succeed!"
    },
    {
      id: "communication",
      name: "Communication & Media",
      icon: Globe,
      color: "from-orange-500 to-red-500",
      description: "Journalism, Public Relations & Digital Media",
      careers: ["Journalist", "Content Creator", "PR Specialist", "Social Media Manager", "News Anchor"],
      skills: ["Writing", "Public Speaking", "Research", "Digital Literacy"],
      story: "Share important stories with the world and shape public opinion through media!"
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      icon: Users,
      color: "from-teal-500 to-green-500",
      description: "Athletics, Coaching & Sports Management",
      careers: ["Professional Athlete", "Sports Coach", "Fitness Trainer", "Sports Journalist", "Sports Manager"],
      skills: ["Physical Fitness", "Teamwork", "Discipline", "Leadership"],
      story: "Combine your love for sports with a career that keeps you active and competitive!"
    },
    {
      id: "social",
      name: "Social Impact",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "Education, Social Work & Community Service",
      careers: ["Teacher", "Social Worker", "NGO Leader", "Counselor", "Community Developer"],
      skills: ["Empathy", "Communication", "Problem Solving", "Patience"],
      story: "Make a difference in people's lives and contribute to building a better society!"
    }
  ];

  const interactiveModules = [
    {
      title: "Day in the Life",
      description: "Experience a typical day in different careers through interactive simulations",
      status: "Available",
      progress: 0
    },
    {
      title: "Career Matching Quiz",
      description: "Answer fun questions to discover careers that match your interests",
      status: "In Progress",
      progress: 60
    },
    {
      title: "Industry Spotlight",
      description: "Learn about trending industries and emerging career opportunities",
      status: "Available",
      progress: 0
    },
    {
      title: "Success Stories",
      description: "Read inspiring stories from young professionals in various fields",
      status: "Completed",
      progress: 100
    }
  ];

  return (
    <DashboardLayout 
      title="Career Explorer" 
      description="Discover exciting career possibilities through interactive exploration"
    >
      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Explore Your Future 🚀
          </h2>
          <p className="text-muted-foreground mb-4">
            Discover different career fields through engaging stories and real-world examples. 
            No pressure - just explore what excites you!
          </p>
          <Button>Take Career Interest Quiz</Button>
        </div>

        <Tabs defaultValue="fields" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fields">Career Fields</TabsTrigger>
            <TabsTrigger value="modules">Interactive Modules</TabsTrigger>
          </TabsList>

          <TabsContent value="fields" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerFields.map((field) => (
                <Card 
                  key={field.id} 
                  className={`hover:shadow-lg transition-all cursor-pointer ${
                    selectedField === field.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${field.color} flex items-center justify-center mb-2`}>
                      <field.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{field.name}</CardTitle>
                    <CardDescription>{field.description}</CardDescription>
                  </CardHeader>
                  
                  {selectedField === field.id && (
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">💡 {field.story}</h4>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Popular Careers:</h4>
                        <div className="flex flex-wrap gap-1">
                          {field.careers.map((career) => (
                            <Badge key={career} variant="secondary" className="text-xs">
                              {career}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {field.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full" size="sm">
                        Explore This Field
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interactiveModules.map((module, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <Badge 
                        variant={module.status === 'Completed' ? 'default' : 
                                module.status === 'In Progress' ? 'secondary' : 'outline'}
                      >
                        {module.status}
                      </Badge>
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {module.progress > 0 && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all" 
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <Button className="w-full" variant={module.status === 'Completed' ? 'outline' : 'default'}>
                      {module.status === 'Completed' ? 'Review' : 
                       module.status === 'In Progress' ? 'Continue' : 'Start'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Fun Fact Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Did You Know?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">65%</div>
                <div className="text-sm text-muted-foreground">of future jobs don't exist today</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">7</div>
                <div className="text-sm text-muted-foreground">average career changes in a lifetime</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-muted-foreground">new skills learned every year</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CareerExplorer;
