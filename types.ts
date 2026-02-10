
export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizConfig {
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  numQuestions: number;
  language: string;
}

export interface UserAnswer {
  questionIndex: number;
  selectedOption: number;
  isCorrect: boolean;
}

export type AppState = 'landing' | 'generating' | 'quiz' | 'results' | 'about';
