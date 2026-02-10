
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! Need help? Ask me anything.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(20);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<any>(null);

  // Initialize Chat Session with high-speed config
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      console.error('API_KEY not configured. Please set VITE_API_KEY in .env file');
      setMessages(prev => [...prev, { role: 'assistant', content: 'API key not configured. Please add VITE_API_KEY to .env' }]);
      return;
    }
    const ai = new GoogleGenAI({ apiKey });
    chatInstance.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        // Force immediate response without extra thinking time
        thinkingConfig: { thinkingBudget: 0 },
        systemInstruction: `You are the QuizWise AI Assistant by RAFSAN. 
        Be extremely concise and fast. Answer in 1-2 short sentences maximum. 
        Focus on helping with QuizWise features or Rafsan's work. 
        Don't be verbose. Be lightning fast.`,
      },
    });
  }, []);

  // Handle Dynamic Positioning to avoid Footer overlap
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (footerRect.top < viewportHeight) {
        setBottomOffset((viewportHeight - footerRect.top) + 20);
      } else {
        setBottomOffset(20);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const responseStream = await chatInstance.current.sendMessageStream({ message: userMessage });
      
      let fullContent = '';
      // Prepare the placeholder for the assistant's reply
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text || '';
        fullContent += textChunk;
        
        // Update only the last message for performance
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: fullContent };
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection slow. Try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div 
      className="fixed right-5 z-[9999] font-sans pointer-events-none transition-all duration-300 ease-out"
      style={{ bottom: `${bottomOffset}px` }}
    >
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[85vw] md:w-[320px] h-[400px] md:h-[480px] glass-card rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] border border-white/60 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300 pointer-events-auto">
          {/* Header */}
          <div className="p-3.5 sunset-gradient text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center font-black border border-white/30 text-[10px]">Q</div>
              <div>
                <h3 className="font-black text-[10px] uppercase tracking-wider">Flash Support</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[8px] font-bold opacity-90 uppercase tracking-tighter">Instant</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/20 p-1 rounded-full transition-all active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-3 bg-zinc-50/50 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-200`}>
                <div className={`max-w-[90%] p-3 rounded-xl md:rounded-2xl text-[13px] font-semibold leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-zinc-900 text-white rounded-br-none' 
                    : 'bg-white border border-zinc-100 text-zinc-700 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length - 1].content === '' && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl rounded-bl-none border border-zinc-100 flex gap-1 shadow-sm">
                  <div className="w-1 h-1 bg-rose-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-rose-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-1 h-1 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-zinc-100/50">
            <div className="flex items-center gap-1.5 bg-zinc-100 rounded-xl p-1 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type fast..."
                className="flex-grow bg-transparent border-none outline-none px-3 py-1.5 text-xs font-bold text-zinc-800 placeholder:text-zinc-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 sunset-gradient rounded-lg flex items-center justify-center text-white shadow-md disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 sunset-gradient rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-90 transition-all duration-300 relative group pointer-events-auto ${isOpen ? 'rotate-90' : ''}`}
      >
        <div className="absolute inset-0 rounded-full sunset-gradient animate-ping opacity-10"></div>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};
