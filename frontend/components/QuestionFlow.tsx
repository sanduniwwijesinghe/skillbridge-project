'use client';

import { Question, Trait } from '@/lib/gameData';

interface QuestionFlowProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (traits: Trait[]) => void;
}

export default function QuestionFlow({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
}: QuestionFlowProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-4">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700 animate-slide-up">
          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option.traits)}
                className="w-full p-5 bg-gray-700/50 hover:bg-purple-600/30 text-white text-left rounded-xl
                           transition-all duration-300 transform hover:scale-102 hover:shadow-lg
                           border border-gray-600 hover:border-purple-500 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600/30 group-hover:bg-purple-600
                                   flex items-center justify-center mr-4 transition-colors duration-300">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-base md:text-lg">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-6 text-center text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Choose the answer that resonates most with you
        </div>
      </div>
    </div>
  );
}
