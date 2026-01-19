'use client';

import { NextLife } from '@/lib/gameData';

interface ResultProps {
  result: NextLife;
  traitSummary: string;
  onPlayAgain: () => void;
}

export default function Result({ result, traitSummary, onPlayAgain }: ResultProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4">
      <div className="max-w-3xl w-full">
        {/* Result Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700 animate-fade-in">
          {/* Secret Badge (if applicable) */}
          {result.isSecret && (
            <div className="mb-6 text-center animate-slide-up">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-full text-sm">
                ✨ RARE RESULT ✨
              </span>
            </div>
          )}

          {/* Title Section */}
          <div className="text-center mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-7xl md:text-9xl mb-4">{result.emoji}</div>
            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              Your Next Life
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              {result.title}
            </h2>
          </div>

          {/* Description */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg md:text-xl text-gray-300 text-center leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Reasoning Section */}
          <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold text-purple-300 mb-3 flex items-center">
              <span className="mr-2">🔮</span>
              Why This Result?
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {result.reasoning}
            </p>
          </div>

          {/* Trait Summary */}
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center">
              <span className="mr-2">⭐</span>
              Your Dominant Traits
            </h3>
            <p className="text-gray-300">
              {traitSummary}
            </p>
          </div>

          {/* Play Again Button */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={onPlayAgain}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full
                         hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300
                         shadow-lg hover:shadow-2xl"
            >
              Discover Another Life
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Your answers are always unique - try again for a different result!
            </p>
          </div>
        </div>

        {/* Share hint (optional future feature) */}
        <div className="mt-6 text-center text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Share your next life with friends and see what they get!
        </div>
      </div>
    </div>
  );
}
