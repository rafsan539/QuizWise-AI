
import React from 'react';

interface AboutViewProps {
  onBack: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 md:space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 uppercase leading-none">
          Inside <span className="sunset-text">QuizWise AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto font-medium leading-relaxed">
          The ultimate synthesis of educational theory and advanced neural intelligence. 
          Powered by Gemini 3 Flash to eliminate the boundary between raw data and true insight.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {[
          { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'High Velocity', desc: 'Real-time synthesis of academic questions from raw context strings.' },
          { icon: 'M3 5h12M9 3v2m1.048 9.5a18.022 18.022 0 01-3.827-5.802M14 11a18.017 18.017 0 01-2 5.5m.5 5.5l-5.048-5.048M19 10h-4M17 7v6', title: 'Polyglot Core', desc: 'Seamless support for global languages including English and Bangla.' },
          { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Vision Input', desc: 'Analyze scanned textbook pages or handwritten notes with OCR-Vision.' },
          { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Analytics', desc: 'In-depth rationale breakdown for every concept validation attempt.' }
        ].map((feat, i) => (
          <div key={i} className="glass-card p-8 rounded-[2rem] border border-zinc-100 shadow-xl shadow-zinc-100/50 space-y-5 group hover:-translate-y-2 transition-transform duration-500">
            <div className="w-14 h-14 sunset-gradient rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={feat.icon} />
              </svg>
            </div>
            <h3 className="text-xl font-black text-zinc-800 uppercase tracking-tight">{feat.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-[3.5rem] p-12 md:p-20 text-center space-y-8 border-white shadow-2xl shadow-rose-100/30 group">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-50 border border-zinc-100 rounded-full text-zinc-400 text-xs font-black uppercase tracking-[0.4em]">
          <span className="w-2.5 h-2.5 sunset-gradient rounded-full animate-pulse"></span>
          Engineering Leadership
        </div>
        
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 uppercase tracking-tighter">
            Architected By <a href="https://rafsan-theta.vercel.app/" target="_blank" rel="noopener noreferrer" className="sunset-text transition-all duration-700 hover:opacity-80 group-hover:drop-shadow-[0_10px_30px_rgba(249,115,22,0.4)]">RAFSAN</a>
          </h2>
          <div className="h-2 w-32 sunset-gradient mx-auto rounded-full opacity-60"></div>
        </div>

        <p className="text-zinc-500 max-w-xl mx-auto font-bold text-lg md:text-xl leading-relaxed">
          Designing the future of pedagogy where intelligent algorithms empower human potential.
        </p>
        
        <div className="pt-6">
          <button
            onClick={onBack}
            className="px-12 py-5 bg-zinc-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-black hover:scale-[1.05] transition-all duration-500 text-sm active:scale-95 shadow-2xl shadow-zinc-300"
          >
            Back to Mission Control
          </button>
        </div>
      </div>
    </div>
  );
};
