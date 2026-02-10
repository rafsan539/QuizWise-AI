
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { QuizForm } from './components/QuizForm';
import { QuizPlayer } from './components/QuizPlayer';
import { ResultView } from './components/ResultView';
import { AboutView } from './components/AboutView';
import { AIAssistant } from './components/AIAssistant';
import { AppState, QuizConfig, Question, UserAnswer } from './types';
import { generateQuiz } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('landing');
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (config: QuizConfig, base64Image?: string, mimeType?: string) => {
    setState('generating');
    setError(null);
    try {
      const generated = await generateQuiz(config, base64Image, mimeType);
      setQuestions(generated);
      setConfig(config);
      setState('quiz');
    } catch (err: any) {
      setError(err.message || "Failed to generate quiz. Please try again.");
      setState('landing');
    }
  };

  const handleQuizComplete = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setState('results');
  };

  const handleRestart = () => {
    setState('landing');
    setQuestions([]);
    setUserAnswers([]);
    setConfig(null);
  };

  const navigateToAbout = () => setState('about');
  const navigateToHome = () => {
    if (state === 'about' || state === 'results') {
      handleRestart();
    } else {
      setState('landing');
    }
  };

  return (
    <>
      <Layout onAboutClick={navigateToAbout} onHomeClick={navigateToHome}>
        {state === 'landing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-rose-600 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 sunset-gradient rounded-full animate-pulse"></span>
                  Next-Gen AI Assessment
                </div>
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tighter text-zinc-900 uppercase leading-[0.9]">
                  Master Any <br />
                  Subject <span className="sunset-text">Instantly</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-xl">
                Transform complex topics and study materials into high-stakes professional assessments in seconds.
              </p>
            </div>
            
            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-rose-100/50 border border-white animate-in fade-in slide-in-from-right-8 duration-1000">
              {error && (
                <div className="mb-8 p-5 bg-orange-50 border border-orange-100 text-orange-700 rounded-2xl text-sm flex items-center gap-3 font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              <QuizForm onGenerate={handleGenerate} />
            </div>
          </div>
        )}

        {state === 'generating' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-[8px] border-zinc-100 border-t-rose-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-black text-zinc-800 tracking-tighter uppercase">Engineering Quiz...</h2>
              <p className="text-lg text-zinc-400 font-bold tracking-wide animate-pulse">Synthesizing deep-learning curriculum data</p>
            </div>
          </div>
        )}

        {state === 'quiz' && questions.length > 0 && (
          <QuizPlayer questions={questions} onComplete={handleQuizComplete} onCancel={handleRestart} />
        )}

        {state === 'results' && config && (
          <ResultView 
            questions={questions} 
            answers={userAnswers} 
            config={config} 
            onRestart={handleRestart} 
          />
        )}

        {state === 'about' && (
          <AboutView onBack={navigateToHome} />
        )}
      </Layout>

      {/* Persistent AI Assistant Component - Now outside Layout to ensure stable positioning */}
      <AIAssistant />
    </>
  );
};

export default App;
