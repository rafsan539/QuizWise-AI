
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onAboutClick?: () => void;
  onHomeClick?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onAboutClick, onHomeClick }) => {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'mailto:rafsanzanirizon539@gmail.com';
  };

  return (
    <div className="min-h-screen bg-transparent text-zinc-900 flex flex-col relative">
      {/* Main Navigation Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer shrink-0 group" onClick={onHomeClick}>
            <div className="w-10 h-10 sunset-gradient rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-rose-200 group-hover:scale-110 transition-transform duration-500">
              Q
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tighter sunset-text whitespace-nowrap">
              QuizWise AI
            </span>
          </div>
          <nav className="flex items-center">
            <button 
              onClick={onAboutClick} 
              className="group flex items-center gap-3 px-6 py-2.5 rounded-full border border-zinc-200 bg-white/80 hover:bg-white hover:border-rose-200 hover:text-rose-600 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-rose-100/40 active:scale-95"
            >
              <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-rose-600 transition-colors">
                About Engine
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-zinc-400 group-hover:text-rose-500 transition-all duration-300 group-hover:rotate-12" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </nav>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="pt-28 md:pt-36 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto flex-grow w-full relative z-10">
        {children}
      </main>
      
      {/* Redesigned Premium Footer Section - Optimized Compact Spacing */}
      <footer className="mt-auto border-t border-zinc-100 bg-white/50 backdrop-blur-md relative overflow-hidden z-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-12 pb-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Column 1: Brand & Philosophy */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sunset-gradient rounded-lg flex items-center justify-center text-white font-bold text-xs">Q</div>
                <span className="font-black text-xl tracking-tighter sunset-text">QuizWise AI</span>
              </div>
              <p className="text-zinc-500 text-sm font-semibold leading-relaxed">
                Empowering the next generation of scholars through automated, high-fidelity assessment intelligence.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-8 sunset-gradient rounded-full"></div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Global Protocol</span>
              </div>
            </div>

            {/* Column 2: Ecosystem */}
            <div className="space-y-4 text-left">
              <h4 className="text-xs font-black text-zinc-900 uppercase tracking-[0.3em]">Ecosystem</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={onHomeClick} 
                    className="text-sm font-bold text-zinc-500 hover:text-rose-600 transition-colors text-left w-full focus:outline-none"
                  >
                    Generator Terminal
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onAboutClick} 
                    className="text-sm font-bold text-zinc-500 hover:text-rose-600 transition-colors text-left w-full focus:outline-none"
                  >
                    Core Intelligence
                  </button>
                </li>
                <li>
                  <a 
                    href="https://ai.google.dev/gemini-api/docs" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-bold text-zinc-500 hover:text-rose-600 transition-colors block"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="https://arxiv.org/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-bold text-zinc-500 hover:text-rose-600 transition-colors block"
                  >
                    Research Paper
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Lead Developer Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-zinc-900 uppercase tracking-[0.3em]">Engineering Lead</h4>
              <div className="space-y-3">
                <div className="group">
                  <a 
                    href="https://rafsan-theta.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-black sunset-text uppercase tracking-tight group-hover:tracking-widest transition-all duration-300 block outline-none"
                  >
                    RAFSAN
                  </a>
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Full-Stack Architect</div>
                </div>
                <button 
                  onClick={handleEmailClick}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-100 transition-all text-zinc-600 hover:text-rose-600 focus:outline-none group/mail"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover/mail:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-bold">Connect via Email</span>
                </button>
              </div>
            </div>

            {/* Column 4: Status & Connectivity */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-zinc-900 uppercase tracking-[0.3em]">System Integrity</h4>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-wider">
                  Engine: Active
                </div>
                <div className="px-3 py-1.5 bg-rose-50 text-rose-600 text-[10px] font-black rounded-lg border border-rose-100 uppercase tracking-wider">
                  v2.5.0-Stable
                </div>
              </div>
              <div className="pt-2 text-[10px] font-bold text-zinc-400 leading-relaxed uppercase tracking-tighter">
                Securely encrypted via <br />
                Gemini Intelligence Cloud.
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Signature - Reduced Top Padding */}
          <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="text-zinc-400 text-[11px] font-black uppercase tracking-[0.2em]">
                &copy; 2026 QuizWise AI
              </div>
              <div className="h-1 w-1 bg-zinc-200 rounded-full hidden md:block"></div>
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-zinc-900 text-[11px] font-black uppercase tracking-[0.2em] transition-colors"
              >
                Privacy
              </a>
              <a 
                href="https://policies.google.com/terms" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-zinc-900 text-[11px] font-black uppercase tracking-[0.2em] transition-colors"
              >
                Terms
              </a>
            </div>
            
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Coded by</span>
               <a 
                 href="https://rafsan-theta.vercel.app/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="px-4 py-1.5 sunset-gradient text-white text-[11px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-rose-200/50 hover:scale-105 active:scale-95 transition-all focus:outline-none"
               >
                 Rafsan
               </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
