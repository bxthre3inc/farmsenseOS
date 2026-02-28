import { Fish, Globe, Code, Mail, ChevronLeft } from "lucide-react";

export default function CrayfishProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-orange-500/10 rounded-full blur-3xl" />
        
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /><span>Back to Bxthre3</span>
          </a>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-lg">B3</div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />Ideated
          </span>
          
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center border border-orange-500/20">
              <Fish className="w-10 h-10 text-orange-400" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3">Crayfish</h1>
              <p className="text-xl text-zinc-400">OpenClaw-Based Web Platform</p>
            </div>
          </div>
          
          <p className="text-xl text-zinc-300 max-w-4xl leading-relaxed">
            A web-hosted platform with OpenClaw at its core. Exploring applications of the 
            OpenClaw framework in web-native environments.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-8">Concept Areas</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-900/20 to-amber-900/10 border border-orange-500/10">
            <Globe className="w-8 h-8 text-orange-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Web-Native</h3>
            <p className="text-sm text-zinc-400">Bringing OpenClaw capabilities to the browser.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-900/20 to-amber-900/10 border border-orange-500/10">
            <Code className="w-8 h-8 text-orange-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">OpenClaw Core</h3>
            <p className="text-sm text-zinc-400">Leveraging OpenClaw as the foundation for platform capabilities.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-zinc-500" />
            <span className="text-lg font-semibold">Ideated — Not Yet in Development</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            Crayfish is currently a concept under exploration.
          </p>
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
