import { Leaf, Users, Zap, Mail, ChevronLeft } from "lucide-react";

export default function WellServedProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-green-500/10 rounded-full blur-3xl" />
        
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /><span>Back to Bxthre3</span>
          </a>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-lg">B3</div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Pilot
          </span>
          
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center border border-green-500/20">
              <Leaf className="w-10 h-10 text-green-400" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3">WellServed</h1>
              <p className="text-xl text-zinc-400">Service Industry Supply Chain Integration</p>
            </div>
          </div>
          
          <p className="text-xl text-zinc-300 max-w-4xl leading-relaxed">
            Vertical integration of service industry supply chains. Streamlining the path from 
            producer to provider with transparent pricing and quality verification.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-green-500/20">
          <h2 className="text-3xl font-bold mb-4">Currently in Pilot</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">WellServed is being piloted with select service industry partners.</p>
          <a href="mailto:contact@bxthre3.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <Mail className="w-4 h-4" />Learn More
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
