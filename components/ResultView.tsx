
import React, { useEffect, useState } from 'react';
import { Question, UserAnswer, QuizConfig } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultViewProps {
  questions: Question[];
  answers: UserAnswer[];
  config: QuizConfig;
  onRestart: () => void;
}

// Fix: Define ConfettiPiece as a React.FC to include standard props like 'key'
const ConfettiPiece: React.FC<{ delay: number }> = ({ delay }) => {
  const colors = ['#f97316', '#e11d48', '#fbbf24', '#2dd4bf', '#818cf8'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const size = Math.random() * 10 + 5;
  
  return (
    <div 
      className="fixed pointer-events-none animate-confetti-fall z-[60]"
      style={{
        left: `${left}%`,
        top: '-5%',
        width: `${size}px`,
        height: `${size * 1.5}px`,
        backgroundColor: color,
        animationDelay: `${delay}ms`,
        opacity: 0.8,
        borderRadius: '2px',
        transform: `rotate(${Math.random() * 360}deg)`
      }}
    />
  );
};

export const ResultView: React.FC<ResultViewProps> = ({ questions, answers, config, onRestart }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const correctCount = answers.filter(a => a.isCorrect).length;
  const scorePercentage = Math.round((correctCount / questions.length) * 100);

  useEffect(() => {
    if (scorePercentage >= 50) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [scorePercentage]);

  const chartData = [
    { name: 'Proficient', value: correctCount },
    { name: 'Pending', value: questions.length - correctCount }
  ];

  const COLORS = ['#e11d48', '#f4f4f5'];

  return (
    <div className="max-w-6xl mx-auto space-y-12 md:space-y-20 animate-in fade-in zoom-in-95 duration-700 relative">
      {/* Confetti Animation */}
      {showConfetti && Array.from({ length: 50 }).map((_, i) => (
        <ConfettiPiece key={i} delay={i * 100} />
      ))}

      <div className="text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-rose-50 border border-rose-100 rounded-full text-rose-600 text-xs font-black uppercase tracking-[0.3em] animate-bounce">
          🎉 Session Accomplished
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-zinc-900 tracking-tighter uppercase leading-none">
          Assessment Complete
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto">
          Deep-analysis completed for topic: <span className="sunset-text font-black">{config.topic}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center relative z-10">
        {/* Score Card - Fixed Overflow with Responsive Text */}
        <div className="order-2 lg:order-1 glass-card p-8 md:p-10 lg:p-14 rounded-[3rem] text-center space-y-4 border-2 border-rose-50 shadow-2xl shadow-rose-100 flex flex-col items-center justify-center min-h-[300px] overflow-hidden">
          <div className="text-6xl sm:text-7xl md:text-8xl font-black sunset-text leading-none tracking-tighter truncate w-full">
            {scorePercentage}%
          </div>
          <div className="text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-[0.4em] mt-2">
            Mastery Index
          </div>
          <div className="pt-6 text-zinc-600 font-bold text-base md:text-lg border-t border-zinc-100 w-full mt-4">
            {correctCount} / {questions.length} Concepts Validated
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="order-1 lg:order-2 h-64 md:h-80 xl:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'black', fontSize: '14px', padding: '16px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Rigor & Action Section */}
        <div className="order-3 space-y-6">
          <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[10px] font-black text-zinc-400 uppercase mb-2 tracking-[0.3em]">Session Rigor</div>
            <div className="text-2xl font-black text-zinc-800 uppercase tracking-tighter flex items-center gap-3">
              <span className="w-3 h-3 rounded-full sunset-gradient"></span>
              {config.difficulty}
            </div>
          </div>
          <button
            onClick={onRestart}
            className="w-full py-6 sunset-gradient text-white rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl shadow-rose-200 transition-all hover:scale-[1.03] active:scale-[0.97] text-lg flex items-center justify-center gap-3"
          >
            New Session
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="h-0.5 flex-grow bg-zinc-100"></div>
          <h3 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase tracking-tighter whitespace-nowrap">Contextual Breakdown</h3>
          <div className="h-0.5 flex-grow bg-zinc-100"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {questions.map((q, idx) => {
            const answer = answers.find(a => a.questionIndex === idx);
            const isCorrect = answer?.isCorrect;

            return (
              <div key={idx} className={`p-8 md:p-10 rounded-[3rem] border-2 transition-all flex flex-col h-full ${isCorrect ? 'bg-teal-50/20 border-teal-100 hover:bg-teal-50/40' : 'bg-rose-50/20 border-rose-100 hover:bg-rose-50/40'}`}>
                <div className="flex justify-between items-start gap-6 mb-8">
                  <h4 className="font-black text-xl md:text-2xl text-zinc-800 leading-tight tracking-tight">{q.question}</h4>
                  <span className={`px-5 py-2 ${isCorrect ? 'bg-teal-500 text-white' : 'bg-rose-500 text-white'} text-[10px] font-black rounded-full flex-shrink-0 uppercase tracking-widest border-none shadow-lg ${isCorrect ? 'shadow-teal-100' : 'shadow-rose-100'}`}>
                    {isCorrect ? 'PASSED' : 'MISSED'}
                  </span>
                </div>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="p-5 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                    <div className="text-[10px] font-black text-zinc-400 uppercase mb-2 tracking-widest">Candidate Input</div>
                    <div className={`font-bold text-lg ${isCorrect ? 'text-teal-700' : 'text-rose-700'}`}>
                      {q.options[answer?.selectedOption ?? 0]}
                    </div>
                  </div>
                  {!isCorrect && (
                    <div className="p-5 bg-white rounded-2xl border border-teal-100 shadow-sm">
                      <div className="text-[10px] font-black text-teal-500 uppercase mb-2 tracking-widest">Correct Solution</div>
                      <div className="text-teal-700 font-black text-lg">{q.options[q.correctAnswerIndex]}</div>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-zinc-900 rounded-3xl text-sm md:text-base text-zinc-300 leading-relaxed font-medium">
                  <span className="font-black text-white text-[10px] uppercase tracking-[0.3em] block mb-3 opacity-40">System Rationale:</span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall {
          animation: confetti-fall 4s linear forwards;
        }
      `}</style>
    </div>
  );
};
