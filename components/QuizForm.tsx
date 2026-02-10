
import React, { useState } from 'react';
import { QuizConfig } from '../types';

interface QuizFormProps {
  onGenerate: (config: QuizConfig, base64Image?: string, mimeType?: string) => void;
}

export const QuizForm: React.FC<QuizFormProps> = ({ onGenerate }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<QuizConfig['difficulty']>('Medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [language, setLanguage] = useState('English');
  const [image, setImage] = useState<{ base64: string; mimeType: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setImage({ base64: base64Data, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate(
      { topic, difficulty, numQuestions, language },
      image?.base64,
      image?.mimeType
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 block ml-1">Context or Topic</label>
        <textarea
          required
          placeholder="Enter a topic, copy a lecture note, or upload a page..."
          className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border border-zinc-200 bg-zinc-50/80 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 focus:bg-white transition-all outline-none min-h-[100px] md:min-h-[120px] resize-none text-zinc-950 font-semibold placeholder:text-zinc-400 text-sm md:text-base"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-2">
          <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 block ml-1">Response Language</label>
          <div className="flex p-1 bg-zinc-100 rounded-xl md:rounded-2xl">
            {['English', 'Bangla'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-2 md:py-2.5 text-xs md:text-sm font-bold rounded-lg md:rounded-xl transition-all ${
                  language === lang
                    ? 'bg-white text-rose-600 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 block ml-1">Difficulty</label>
          <div className="flex p-1 bg-zinc-100 rounded-xl md:rounded-2xl">
            {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`flex-1 py-2 md:py-2.5 text-xs md:text-sm font-bold rounded-lg md:rounded-xl transition-all ${
                  difficulty === level
                    ? 'bg-white text-rose-600 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 block ml-1">Intensity</label>
        <div className="px-1">
          <input
            type="range"
            min="3"
            max="15"
            step="1"
            className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          />
          <div className="flex justify-between text-[10px] font-bold text-zinc-400 mt-2">
            <span>3 Qs</span>
            <span className="text-rose-600 font-black">{numQuestions} Questions</span>
            <span>15 Qs</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 block ml-1">Visual Context</label>
        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`p-4 md:p-5 border-2 border-dashed rounded-xl md:rounded-2xl transition-all flex items-center gap-3 md:gap-4 ${
            image ? 'border-orange-400 bg-orange-50/50' : 'border-zinc-200 group-hover:border-rose-300'
          }`}>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 ${image ? 'bg-orange-500 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <span className="text-xs md:text-sm font-bold text-zinc-500 line-clamp-1">
              {image ? 'Study Material Attached' : 'Attach image of notes/book'}
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!topic.trim()}
        className="w-full py-4 sunset-gradient hover:opacity-90 disabled:opacity-50 disabled:grayscale text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-rose-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-sm md:text-base"
      >
        <span>Initialize Generator</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  );
};
