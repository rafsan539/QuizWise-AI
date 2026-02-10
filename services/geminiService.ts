
import { GoogleGenAI, Type } from "@google/genai";
import { QuizConfig, Question } from "../types";

const apiKey = import.meta.env.VITE_API_KEY;
if (!apiKey) {
  throw new Error('VITE_API_KEY environment variable is not set. Please create a .env file with your Google Generative AI API key.');
}

const ai = new GoogleGenAI({ apiKey });

export const generateQuiz = async (
  config: QuizConfig,
  base64Image?: string,
  mimeType?: string
): Promise<Question[]> => {
  const { topic, difficulty, numQuestions, language } = config;

  const prompt = `Generate a high-quality, academic-level multiple choice quiz for undergraduate students.
  Topic: ${topic}
  Difficulty: ${difficulty}
  Number of Questions: ${numQuestions}
  Language: ${language}
  
  Each question must have exactly 4 plausible options. Only one option should be correct.
  Include a brief explanation of why the correct answer is right.
  
  Return the response in a structured JSON format.`;

  const contents: any = { parts: [] };
  
  if (base64Image && mimeType) {
    contents.parts.push({
      inlineData: {
        data: base64Image,
        mimeType: mimeType
      }
    });
    contents.parts.push({ text: `Analyze the attached image and ${prompt}` });
  } else {
    contents.parts.push({ text: prompt });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4
              },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text) as Question[];
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    throw error;
  }
};
