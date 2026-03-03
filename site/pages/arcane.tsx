import { Brain, ArrowUpRight, MapPin, Sparkles, GitBranch, Lock, Mail, ChevronLeft } from "lucide-react";

export default function ArcaneProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-violet-500/10 rounded-full blur-3xl" />
        
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Bxthre3</span>
          </a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-lg">
              B3
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Research Phase
            </span>
          </div>
          
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 flex items-center justify-center flex-shrink-0 border border-violet-500/20">
              <Brain className="w-10 h-10 text-violet-400" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3">The ARCane Project</h1>
              <p className="text-xl text-zinc-400">Multi-Stage AI System for Self-Evolution</p>
            </div>
          </div>
          
          <p className="text-xl text-zinc-300 max-w-4xl leading-relaxed mb-10">
            An ambitious research project exploring the boundaries of artificial intelligence 
            and self-modifying systems. The ARCane Project represents Bxthre3's commitment to foundational 
            research in emergent AI capabilities.
          </p>
        </div>
      </header>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-8">Research Direction</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5">
            <h3 className="text-xl font-semibold mb-4 text-violet-400">The Vision</h3>
            <p className="text-zinc-300 leading-relaxed">
              ARCane explores whether AI systems can be designed to improve their own architectures—
              not just their weights—in a safe, bounded, and verifiable manner. This is foundational 
              research with significant long-term implications.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5">
            <h3 className="text-xl font-semibold mb-4 text-violet-400">The Approach</h3>
            <p className="text-zinc-300 leading-relaxed">
              Multi-stage architecture with clear separation between exploration, validation, 
              and deployment. Every modification is sandboxed, logged, and reversible. 
              Safety is not an afterthought—it's the core constraint.
            </p>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-8">Research Areas</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-500/10">
            <Sparkles className="w-8 h-8 text-violet-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Self-Modification</h3>
            <p className="text-sm text-zinc-400">Safe architectures for AI systems to modify their own structure within bounded constraints.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-500/10">
            <GitBranch className="w-8 h-8 text-violet-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Multi-Stage Systems</h3>
            <p className="text-sm text-zinc-400">Hierarchical architectures where different stages handle different aspects of reasoning and evolution.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-500/10">
            <Lock className="w-8 h-8 text-violet-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Safety Frameworks</h3>
            <p className="text-sm text-zinc-400">Formal verification and constraint systems to ensure self-modifying AI remains aligned and bounded.</p>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-8">Current Status</h2>
        <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <span className="text-lg font-semibold">Early Research Phase</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            ARCane is currently in the foundational research phase. We're exploring theoretical frameworks, 
            reviewing existing literature, and prototyping initial architectures. This is long-term work 
            with no specific timeline—quality and safety over speed.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-500/20">
          <h2 className="text-3xl font-bold mb-4">Research Collaboration</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            We're interested in collaborating with researchers in AI safety, formal verification, 
            and recursive self-improvement.
          </p>
          <a
            href="mailto:contact@bxthre3.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Start a Discussion
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-sm">
              B3
            </div>
            <span className="font-semibold">Bxthre3 Inc.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>© 2026 Bxthre3 Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
