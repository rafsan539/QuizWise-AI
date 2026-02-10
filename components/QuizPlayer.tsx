
import React, { useState } from 'react';
import { Question, UserAnswer } from '../types';

interface QuizPlayerProps {
  questions: Question[];
  onComplete: (answers: UserAnswer[]) => void;
  onCancel: () => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({ questions, onComplete, onCancel }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswer: UserAnswer = {
      questionIndex: currentIdx,
      selectedOption,
      isCorrect: selectedOption === currentQuestion.correctAnswerIndex
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={onCancel}
          className="text-zinc-400 hover:text-zinc-600 flex items-center gap-1 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="hidden sm:inline">Abort Session</span>
          <span className="sm:hidden">Cancel</span>
        </button>
        <span className="text-[10px] md:text-xs font-black text-rose-600 bg-rose-50 px-3 md:px-4 py-1.5 rounded-full uppercase tracking-widest border border-rose-100 whitespace-nowrap">
          {currentIdx + 1} / {questions.length}
        </span>
      </div>

      <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
        <div 
          className="h-full sunset-gradient transition-all duration-700 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-6 md:space-y-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-zinc-900 leading-tight tracking-tight">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              className={`p-4 md:p-6 rounded-2xl md:rounded-3xl text-left border-2 transition-all flex items-center justify-between group relative overflow-hidden ${
                selectedOption === idx
                  ? 'border-rose-500 bg-rose-50/50 text-rose-950'
                  : 'border-zinc-100 bg-white hover:border-orange-200 text-zinc-600'
              }`}
            >
              <div className="flex items-center gap-3 md:gap-5 relative z-10">
                <span className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-2xl flex items-center justify-center text-xs md:text-sm font-black transition-all shrink-0 ${
                  selectedOption === idx ? 'sunset-gradient text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-orange-100 group-hover:text-orange-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="font-bold text-base md:text-lg leading-snug">{option}</span>
              </div>
              {selectedOption === idx && (
                <div className="w-5 h-5 md:w-6 md:h-6 sunset-gradient rounded-full flex items-center justify-center shadow-lg shadow-rose-200 shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={selectedOption === null}
        className="w-full py-4 md:py-5 bg-zinc-900 hover:bg-black disabled:bg-zinc-200 disabled:cursor-not-allowed text-white rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all shadow-2xl shadow-zinc-200 active:scale-[0.98] text-sm md:text-base"
      >
        {currentIdx < questions.length - 1 ? 'Next Question' : 'Process Results'}
      </button>
    </div>
  );
};
