'use client';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black p-4">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 animate-slide-up">
          Next Life
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Discover Who You Might Be
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-400 mb-12 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          Answer a few questions and discover who you might be in your next life.
          Will you explore distant galaxies, create timeless art, or bring peace to the world?
        </p>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full
                     hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-2xl animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          Begin Your Journey
        </button>

        {/* Fun hint */}
        <p className="text-sm text-gray-500 mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          ✨ Hint: There might be some rare surprises waiting...
        </p>
      </div>
    </div>
  );
}
