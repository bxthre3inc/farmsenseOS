import { Lightbulb, Sprout, Leaf, ArrowUpRight, Mail, MapPin, Cpu, Rocket, Mountain, Smartphone, Briefcase, Brain, Calendar, Box, Fish, Zap, Target, TrendingUp, Users, Layers, Shield, ArrowRight, ChevronRight, Sparkles } from "lucide-react";

// Status configuration
const statusConfig = {
  prototyping: { label: "Building Hardware Prototypes", color: "emerald" },
  active: { label: "Active Development", color: "emerald" },
  pilot: { label: "Pilot", color: "blue" },
  research: { label: "Research Phase", color: "violet" },
  validated: { label: "Validated", color: "amber" },
  fundraising: { label: "Fund Raising", color: "orange" },
  ideated: { label: "Ideated", color: "zinc" },
};

// Projects data
const projects = [
  {
    name: "FarmSense",
    subtitle: "Precision Agriculture Intelligence",
    description: "A deterministic operating system for agriculture that maximizes crop yield while minimizing water usage through real-time sensor fusion and judgment-based algorithms.",
    icon: Sprout,
    color: "emerald",
    status: ["prototyping", "fundraising"],
    featured: true,
    link: "/projects/farmsense",
  },
  {
    name: "CoFounder",
    subtitle: "Business Operations System",
    description: "Streamlined business management for small teams and partnerships.",
    icon: Briefcase,
    color: "blue",
    status: ["pilot"],
    link: "/projects/cofounder",
  },
  {
    name: "CANE",
    subtitle: "Advanced AI Research",
    description: "Research into multi-stage AI systems and self-modifying architectures.",
    icon: Brain,
    color: "violet",
    status: ["research"],
    link: "/projects/cane",
  },
  {
    name: "Android-Native Agent-First IDE",
    subtitle: "Mobile Development Environment",
    description: "A self-contained, mobile-native environment designed for agentic workflows.",
    icon: Smartphone,
    color: "violet",
    status: ["pilot"],
    link: "/projects/android-native-ide",
  },
  {
    name: "WellServed",
    subtitle: "Service Industry Platform",
    description: "Supply chain and operations platform for the service industry.",
    icon: Leaf,
    color: "green",
    status: ["pilot"],
    link: "/projects/wellserved",
  },
  {
    name: "ADM Standard",
    subtitle: "Aetheric Drafting & Mixing",
    description: "3D projection interface project incorporating haptic feedback.",
    icon: Box,
    color: "amber",
    status: ["ideated"],
    link: "/projects/adm-standard",
  },
  {
    name: "Crayfish",
    subtitle: "OpenClaw-Based Web Platform",
    description: "Web-hosted platform with OpenClaw at its core.",
    icon: Fish,
    color: "orange",
    status: ["ideated"],
    link: "/projects/crayfish",
  },
];

const stats = [
  { label: "Total Projects", value: "7" },
  { label: "In Active Development", value: "1" },
  { label: "Focus Areas", value: "AgTech, AI, Hardware" },
  { label: "Founded", value: "2024" },
];

// Helper function to get status badge
const getStatusBadge = (status: string) => {
  const config = statusConfig[status as keyof typeof statusConfig];
  if (!config) return null;
  
  const colorClasses: Record<string, string> = {
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    teal: "bg-teal-500/10 border-teal-500/20 text-teal-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    zinc: "bg-zinc-500/10 border-zinc-500/20 text-zinc-400",
  };
  
  const dotClasses: Record<string, string> = {
    emerald: "bg-emerald-400",
    blue: "bg-blue-400",
    violet: "bg-violet-400",
    teal: "bg-teal-400",
    amber: "bg-amber-400",
    zinc: "bg-zinc-400",
  };
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${colorClasses[config.color]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[config.color]}`} />
      {config.label}
    </span>
  );
};

export default function Home() {
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-violet-500/25">
              B3
            </div>
            <span className="font-semibold text-lg tracking-tight">Bxthre3</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#projects" className="text-sm text-zinc-400 hover:text-white transition-colors">Projects</a>
            <a href="#vision" className="text-sm text-zinc-400 hover:text-white transition-colors">Vision</a>
            <a href="mailto:contact@bxthre3.com" className="text-sm px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 text-violet-400 text-sm mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          Building What Comes Next
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Infrastructure for the
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Next Generation
          </span>
        </h1>
        
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12">
          We identify civilizational challenges and develop original technology to address them. 
          From precision agriculture to advanced AI research, we build what matters.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5 backdrop-blur-sm group hover:border-violet-500/30 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">{stat.value}</div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The Name - Redesigned */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-fuchsia-500/5 to-pink-500/5 rounded-3xl blur-3xl" />
          
          <div className="relative p-12 md:p-20 rounded-3xl bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 backdrop-blur-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Why Bxthre3?
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                Three principles guide everything we build.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 border border-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Better</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Every solution must be meaningfully better than what exists. No incrementalism.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/20 border border-fuchsia-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-fuchsia-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Bolder</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We take on problems others won't. Hard problems are where real impact lives.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-10 h-10 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Brighter</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Technology should illuminate and elevate. We build for a better future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section id="projects" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">What We Build</h2>
            <p className="text-zinc-500">Projects across agriculture, AI, and infrastructure.</p>
          </div>
          <div className="hidden md:flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">Building Hardware Prototypes</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">Active Development</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">Pilot</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm">Research Phase</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">Validated</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm">Fund Raising</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-sm">Ideated</span>
            </div>
          </div>
        </div>
        
        {featuredProject && (
          <a href={featuredProject.link} className="block mb-8 group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/30 via-emerald-800/20 to-zinc-900 border border-emerald-500/20 p-8 md:p-12 transition-all duration-500 group-hover:border-emerald-500/40 group-hover:shadow-2xl group-hover:shadow-emerald-500/10">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
              
              <div className="relative flex flex-col md:flex-row md:items-center gap-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 flex items-center justify-center flex-shrink-0 border border-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
                  <Sprout className="w-12 h-12 text-emerald-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-3xl font-bold text-white">{featuredProject.name}</h3>
                    <span className="text-lg text-emerald-400 font-medium">{featuredProject.subtitle}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {featuredProject.status.map(s => getStatusBadge(s))}
                  </div>
                  
                  <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl mb-6">
                    {featuredProject.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 text-emerald-400 font-medium group-hover:gap-3 transition-all">
                      View Project <ArrowRight className="w-4 h-4" />
                    </span>
                    {featuredProject.external && (
                      <a href={featuredProject.external} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                        Visit Site <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </a>
        )}

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => {
            const Icon = project.icon;
            const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
              blue: { bg: "from-blue-900/30 to-blue-800/10", border: "border-blue-500/20 hover:border-blue-500/40", icon: "text-blue-400" },
              violet: { bg: "from-violet-900/30 to-violet-800/10", border: "border-violet-500/20 hover:border-violet-500/40", icon: "text-violet-400" },
              green: { bg: "from-green-900/30 to-green-800/10", border: "border-green-500/20 hover:border-green-500/40", icon: "text-green-400" },
              amber: { bg: "from-amber-900/30 to-amber-800/10", border: "border-amber-500/20 hover:border-amber-500/40", icon: "text-amber-400" },
              orange: { bg: "from-orange-900/30 to-orange-800/10", border: "border-orange-500/20 hover:border-orange-500/40", icon: "text-orange-400" },
            };
            const colors = colorMap[project.color] || colorMap.violet;
            
            return (
              <a
                key={project.name}
                href={project.link}
                className={`group block p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${project.color}-500/20 to-${project.color}-600/20 flex items-center justify-center border border-${project.color}-500/20`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
                <p className="text-sm text-zinc-400 mb-3">{project.subtitle}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.status.map(s => getStatusBadge(s))}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Long-Term Vision
          </h2>
          <p className="text-xl text-zinc-300 leading-relaxed mb-8">
            We're building infrastructure that matters. Not just products, but foundational systems 
            that address real civilizational challenges — water scarcity, food security, and the 
            future of human-machine collaboration.
          </p>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Starting from Colorado's San Luis Valley with FarmSense, we're creating technology 
            that's deterministic, auditable, and built for the real world. No black boxes. 
            No vapor. Just solutions that work.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 border border-violet-500/20 p-12 md:p-16">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Collaborate?</h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-xl mx-auto">
              We're always looking for partners, investors, and talented people who share our vision.
            </p>
            <a
              href="mailto:contact@bxthre3.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-colors shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-900" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Brodi Builds Better</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Three principles guide every project: Build something meaningful. Build it right. Build it to last.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-sm">B3</div>
            <span className="font-semibold">Bxthre3 Inc.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <MapPin className="w-4 h-4" />
            <span>United States</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>© 2025 Bxthre3 Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
