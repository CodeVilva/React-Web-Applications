import { useState } from "react";
import './App.css';

function App() {
  const questions = [
    {
      question: "Which language is mainly used with React?",
      options: ["Java", "JavaScript", "Python", "C++"],
      answer: "JavaScript",
    },
    {
      question: "Which hook is used to manage state in React?",
      options: ["useState", "useData", "useValue", "useReact"],
      answer: "useState",
    },
    {
      question: "Which company developed React?",
      options: ["Google", "Microsoft", "Meta", "Amazon"],
      answer: "Meta",
    },
    {
      question: "What is JSX?",
      options: [
        "A JavaScript syntax extension",
        "A CSS framework",
        "A database",
        "A JavaScript library",
      ],
      answer: "A JavaScript syntax extension",
    },
    {
      question: "Which hook is used to perform side effects in React?",
      options: ["useEffect", "useState", "useEvent", "useAction"],
      answer: "useEffect",
    },
    {
      question: "Which method is commonly used to render a list in React?",
      options: ["map()", "loop()", "repeat()", "forLoop()"],
      answer: "map()",
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Document Oriented Model",
        "Digital Object Model",
      ],
      answer: "Document Object Model",
    },
    {
      question: "Which file commonly contains the main App component in a Vite React project?",
      options: ["App.jsx", "index.html", "main.css", "package.json"],
      answer: "App.jsx",
    },
    {
      question: "Which symbol is used to pass a JavaScript expression inside JSX?",
      options: ["{}", "()", "[]", "<>"],
      answer: "{}",
    },
    {
      question: "What does a React component return?",
      options: [
        "JSX or React elements",
        "Only CSS",
        "Only JSON",
        "Only HTML files",
      ],
      answer: "JSX or React elements",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    // Check the answer
    const isCorrect = selectedAnswer === question.answer;

    // Update score
    if (isCorrect) {
      setScore((previousScore) => previousScore + 1);
    }

    // Check if this is the last question
    if (currentQuestion === questions.length - 1) {
      setQuizFinished(true);
      return;
    }

    // Move to next question
    setCurrentQuestion((previousQuestion) => previousQuestion + 1);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  // Show result screen
  if (quizFinished) {
    return (
      <div className="quiz-container">
        <h1>Quiz Completed!</h1>

        <h2>
          Your Score: {score} / {questions.length}
        </h2>

        <button onClick={handleRestart}>
          Try Again
        </button>
      </div>
    );
  }

  // Show quiz screen
  return (
    <div className="quiz-container">
      <h1>React Quiz</h1>

      <p>
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <h2>{question.question}</h2>

      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <button onClick={handleNext}>
          {currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      )}

      <p>Score: {score}</p>
    </div>
  );
}

export default App;
