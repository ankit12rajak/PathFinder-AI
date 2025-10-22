import { useState } from "react";
import { Eye, Plus, ExternalLink, Settings, Download, Trash2, Copy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

interface Portfolio {
  id: string;
  name: string;
  theme: string;
  domain: string;
  status: "published" | "draft";
  views: number;
}

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([
    {
      id: "1",
      name: "Full Stack Developer",
      theme: "Modern",
      domain: "john-dev.com",
      status: "published",
      views: 1250
    },
    {
      id: "2",
      name: "Product Designer",
      theme: "Minimalist",
      domain: "jane-design.com",
      status: "draft",
      views: 0
    }
  ]);

  const themes = [
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary with smooth animations",
      preview: "🌟",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Clean and focused design",
      preview: "⚪",
      color: "from-slate-500 to-gray-500"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold and artistic layout",
      preview: "🎨",
      color: "from-pink-500 to-orange-500"
    },
    {
      id: "professional",
      name: "Professional",
      description: "Corporate and formal",
      preview: "💼",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Project-focused display",
      preview: "🎯",
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: "gallery",
      name: "Gallery",
      description: "Image-heavy showcase",
      preview: "🖼️",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "dark",
      name: "Dark Mode",
      description: "Sleek dark aesthetic",
      preview: "🌙",
      color: "from-slate-700 to-slate-900"
    },
    {
      id: "vibrant",
      name: "Vibrant",
      description: "Colorful and energetic",
      preview: "🎆",
      color: "from-yellow-500 to-red-500"
    }
  ];

  return (
    <DashboardLayout
      title="Portfolio Builder"
      description="Showcase your projects and skills professionally"
    >
      <div className="p-6 space-y-8 bg-slate-950">
        {/* ============ Header Section ============ */}
        <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl border border-transparent">
          {/* Premium Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-3xl"></div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 hover:from-purple-500/5 hover:via-pink-500/5 hover:to-purple-500/5 transition-all duration-700 rounded-3xl"></div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-purple-500/30 via-pink-500/20 to-purple-500/30"></div>

          {/* Premium Accent Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-600/5 to-transparent rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-600/5 to-transparent rounded-full translate-x-32 translate-y-32 blur-3xl"></div>

          <div className="relative z-10 space-y-6">
            {/* Header Title Row */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-xl backdrop-blur-sm border border-purple-400/40 shadow-lg">
                    <Eye className="w-8 h-8 text-purple-300" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">Portfolio Builder</h1>
                    <p className="text-purple-300 text-lg font-medium">Showcase Your Best Work</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <Badge className="bg-gradient-to-r from-purple-500/40 to-purple-600/30 border-purple-400/60 text-purple-100 backdrop-blur-sm shadow-md">
                    <Globe className="w-3 h-3 mr-2" />
                    8 Themes Available
                  </Badge>
                  <Badge className="bg-gradient-to-r from-pink-500/40 to-pink-600/30 border-pink-400/60 text-pink-100 backdrop-blur-sm shadow-md">
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Custom Domain
                  </Badge>
                </div>
              </div>

              {/* Create Button */}
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12">
                <Plus className="w-4 h-4 mr-2" />
                New Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* ============ Your Portfolios Section ============ */}
        {portfolios.length > 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Portfolios</h2>
              <p className="text-slate-400 mt-1">Manage and publish your portfolios</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] border border-slate-700/50 hover:border-purple-500/40"
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10 p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{portfolio.name}</h3>
                        <p className="text-sm text-slate-400 mt-1">
                          <Globe className="w-3 h-3 inline mr-1" />
                          {portfolio.domain}
                        </p>
                      </div>
                      <Badge className={portfolio.status === "published" ? "bg-gradient-to-r from-emerald-500/40 to-emerald-600/30 border-emerald-400/60 text-emerald-100" : "bg-gradient-to-r from-amber-500/40 to-amber-600/30 border-amber-400/60 text-amber-100"}>
                        {portfolio.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">{portfolio.theme} Theme</span>
                      <span className="text-sm text-purple-300 font-semibold">{portfolio.views} views</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 border-purple-500/40 text-purple-300 hover:bg-purple-500/20 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700/50 text-xs">
                        <Settings className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-purple-500/40 text-purple-300 hover:bg-purple-500/20 text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Visit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ Portfolio Themes ============ */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Choose a Theme</h2>
            <p className="text-slate-400 mt-1">Select from professionally designed themes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {/* Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-20`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90"></div>
                <div className={`absolute inset-0 bg-gradient-to-r ${theme.color} opacity-0 group-hover:opacity-10 transition-all duration-300`}></div>

                {/* Border */}
                <div className={`absolute inset-0 rounded-2xl border bg-gradient-to-r ${theme.color} opacity-20 group-hover:opacity-60 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10 p-6 space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-4xl">{theme.preview}</p>
                    <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all">
                      {theme.name}
                    </h3>
                    <p className="text-xs text-slate-400">{theme.description}</p>
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${theme.color} hover:shadow-lg text-white border-0 transition-all text-sm`}>
                    Use Theme
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ Portfolio Sections ============ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Portfolio Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Hero Section", description: "Eye-catching introduction", icon: "⚡" },
              { title: "About Me", description: "Your professional story", icon: "👤" },
              { title: "Projects", description: "Showcase your best work", icon: "🎯" },
              { title: "Skills", description: "Display your expertise", icon: "🛠️" },
              { title: "Experience", description: "Career timeline", icon: "📈" },
              { title: "Contact", description: "Get in touch section", icon: "✉️" }
            ].map((section, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/40 p-4 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all"></div>
                <div className="relative z-10 space-y-2">
                  <div className="text-2xl">{section.icon}</div>
                  <h3 className="font-semibold text-white">{section.title}</h3>
                  <p className="text-xs text-slate-400">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ Project Examples ============ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Project Showcase Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "E-Commerce Platform",
                description: "Full-stack MERN application with Stripe integration",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                links: ["Live Demo", "GitHub"]
              },
              {
                title: "AI Chat Application",
                description: "Real-time messaging app with machine learning features",
                tech: ["React", "Firebase", "TensorFlow", "Socket.io"],
                links: ["Live Demo", "GitHub"]
              }
            ].map((project, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/40 p-6 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all"></div>

                <div className="relative z-10 space-y-3">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-sm text-slate-400">{project.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t, i) => (
                      <Badge
                        key={i}
                        className="bg-gradient-to-r from-purple-500/30 to-pink-500/20 border-purple-500/40 text-purple-200 text-xs"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4">
                    {project.links.map((link, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="outline"
                        className="border-purple-500/40 text-purple-300 hover:bg-purple-500/20 text-xs flex-1"
                      >
                        {link}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ Features ============ */}
        <div className="relative overflow-hidden rounded-2xl p-8 border border-purple-500/40 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold text-white">Why Build Your Portfolio With Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Responsive design on all devices",
                "Easy drag-and-drop editor",
                "Custom domain support",
                "SEO optimized",
                "Analytics dashboard",
                "Social media integration",
                "Email contact forms",
                "Premium templates"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
