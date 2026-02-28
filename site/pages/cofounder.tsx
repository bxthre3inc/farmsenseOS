import { Briefcase, ArrowUpRight, MapPin, Users, Zap, Shield, Mail, ChevronLeft } from "lucide-react";

export default function CoFounderProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-rose-500/10 rounded-full blur-3xl" />
        
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Bxthre3</span>
          </a>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-lg">B3</div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Pilot
          </span>
          
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-600/20 flex items-center justify-center border border-rose-500/20">
              <Briefcase className="w-10 h-10 text-rose-400" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3">CoFounder</h1>
              <p className="text-xl text-zinc-400">Business Operations System</p>
            </div>
          </div>
          
          <p className="text-xl text-zinc-300 max-w-4xl leading-relaxed">
            A streamlined business operations platform designed for small teams, partnerships, 
            and founder-led organizations. Simplify complexity, focus on what matters.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-8">Core Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-900/20 to-pink-900/10 border border-rose-500/10">
            <Users className="w-8 h-8 text-rose-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team Sync</h3>
            <p className="text-sm text-zinc-400">Real-time collaboration with clear ownership and accountability.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-900/20 to-pink-900/10 border border-rose-500/10">
            <Zap className="w-8 h-8 text-rose-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Setup</h3>
            <p className="text-sm text-zinc-400">Get running in minutes, not days. No technical expertise required.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-900/20 to-pink-900/10 border border-rose-500/10">
            <Shield className="w-8 h-8 text-rose-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Data</h3>
            <p className="text-sm text-zinc-400">Self-hosted option with full data sovereignty and control.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-rose-900/20 to-pink-900/10 border border-rose-500/20">
          <h2 className="text-3xl font-bold mb-4">Currently in Pilot</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">CoFounder is being tested with select early partners.</p>
          <a href="mailto:contact@bxthre3.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <Mail className="w-4 h-4" />Get in Touch
          </a>
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-sm">B3</div>
            <span className="font-semibold">Bxthre3 Inc.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500"><span>© 2025 Bxthre3 Inc.</span></div>
        </div>
      </footer>
    </div>
  );
}
