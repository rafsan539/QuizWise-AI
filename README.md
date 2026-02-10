# QuizWise AI

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite\&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini%20AI-API-8E75B2)

QuizWise AI is an AI-powered quiz generator and player. Users can enter any topic, and the app automatically generates smart MCQ questions using AI and lets them play the quiz through a clean and interactive interface.

---

## Features

* AI-based automatic quiz generation
* Multiple choice questions
* Smooth and interactive quiz player
* Instant score and detailed results
* Minimal and user-friendly UI
* Fast performance powered by Vite

---

## Tech Stack

* React
* TypeScript
* Vite
* Gemini AI API
* CSS or Tailwind

---

## Installation

To run the project locally:

```
git clone https://github.com/rafsan539/QuizWise-AI.git
cd QuizWise-AI
npm install
npm run dev
```

Then open this link in your browser:

```
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the root folder and add this line:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

---

## How to Use

1. Open the app
2. Enter your desired quiz topic
3. Click the **Generate Quiz** button
4. Play the quiz
5. View your score and results

---

## Project Architecture

```
QuizWise-AI/
│── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── QuizForm.tsx
│   │   ├── QuizPlayer.tsx
│   │   ├── ResultView.tsx
│   │   ├── AIAssistant.tsx
│   │   └── AboutView.tsx
│   │
│   ├── services/
│   │   └── geminiService.ts
│   │
│   ├── App.tsx
│   ├── index.tsx
│   ├── types.ts
│   └── metadata.json
│
│── public/
│── .env
│── package.json
│── vite.config.ts
└── README.md
```

* **components/** contains all React UI components
* **services/** handles calls to the Gemini AI API
* **App.tsx** contains the core application logic

---

## Developer

**MD.RAFSAN ZANI **
Full-stack enthusiast, React and TypeScript developer, AI integration explorer

* GitHub: [https://github.com/rafsan539](https://github.com/rafsan539)
* Passionate about modern web technologies
* Enjoys building interactive and user-friendly applications

---

## Contributing

If you want to contribute:

1. Fork this repository
2. Create a new branch

   ```
   git checkout -b feature-name
   ```
3. Make your changes
4. Commit your changes

   ```
   git commit -m "Add your message"
   ```
5. Push to your branch

   ```
   git push origin feature-name
   ```
6. Open a Pull Request

---

## License

This project is released under the MIT License.
You are free to use, modify, and share the code.

---

## Future Plans

* User accounts
* Global leaderboard
* Quiz history tracking
* Difficulty levels
* Timer-based quiz mode
