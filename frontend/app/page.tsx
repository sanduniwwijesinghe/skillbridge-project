'use client';

import { useState } from 'react';
import Landing from '@/components/Landing';
import QuestionFlow from '@/components/QuestionFlow';
import Result from '@/components/Result';
import { questions } from '@/lib/gameData';
import { determineNextLife, getTraitSummary } from '@/lib/gameLogic';
import type { Trait, NextLife } from '@/lib/gameData';

// Game states
type GameState = 'landing' | 'questions' | 'result';

export default function Home() {
  // State management
  const [gameState, setGameState] = useState<GameState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Trait[][]>([]);
  const [result, setResult] = useState<NextLife | null>(null);

  // Start the game
  const handleStart = () => {
    setGameState('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  // Handle answer selection
  const handleAnswer = (traits: Trait[]) => {
    const newAnswers = [...answers, traits];
    setAnswers(newAnswers);

    // Check if there are more questions
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered - calculate result
      const nextLife = determineNextLife(newAnswers);
      setResult(nextLife);
      setGameState('result');
    }
  };

  // Play again
  const handlePlayAgain = () => {
    handleStart();
  };

  // Render based on game state
  return (
    <main>
      {gameState === 'landing' && <Landing onStart={handleStart} />}

      {gameState === 'questions' && (
        <QuestionFlow
          question={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}

      {gameState === 'result' && result && (
        <Result
          result={result}
          traitSummary={getTraitSummary(answers)}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </main>
  );
}
