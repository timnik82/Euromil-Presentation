import { useEffect, useState } from 'react';
import { EinsteinCharacter } from '../EinsteinCharacter';
import { Sparkles, Star } from 'lucide-react';

interface Slide1WelcomeProps {
  onNext: () => void;
  playSound: (name: string) => void;
}

export function Slide1Welcome({ onNext, playSound }: Slide1WelcomeProps) {
  const [showContent, setShowContent] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      playSound('playWelcome');
    }, 300);
    return () => clearTimeout(timer);
  }, [playSound]);

  const handleStart = () => {
    playSound('playSuccess');
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setConfetti(newConfetti);
    setTimeout(() => {
      onNext();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-amber-300 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.5 + Math.random() * 0.5,
              transform: `scale(${0.5 + Math.random() * 1})`,
            }}
          />
        ))}
      </div>

      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute w-3 h-3 rounded-full animate-fall"
          style={{
            left: `${c.x}%`,
            top: '-20px',
            backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'][c.id % 5],
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .animate-fall {
            animation: fall 2s ease-out forwards;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slideInLeft {
            animation: slideInLeft 0.6s ease-out forwards;
          }
          @keyframes slideInRight {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slideInRight {
            animation: slideInRight 0.6s ease-out forwards;
          }
        `}
      </style>

      <div className={`flex flex-col lg:flex-row items-center gap-8 max-w-4xl transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`${showContent ? 'animate-slideInLeft' : ''}`}>
          <EinsteinCharacter pose="wave" className="w-48 h-64 md:w-64 md:h-80 animate-float" />
        </div>

        <div className={`text-center lg:text-left ${showContent ? 'animate-slideInRight' : ''}`}>
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Привет!
            </h1>
            <Sparkles className="w-8 h-8 text-amber-500" />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 mb-6">
            Я Молодой Эйнштейн!
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-md">
            Меня зовут Альберт, и я обожаю разгадывать загадки чисел! Сегодня мы узнаем кое-что удивительное про лотерею. Готов к приключению?
          </p>

          <button
            onClick={handleStart}
            className="group relative px-10 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
          >
            <span className="relative z-10 flex items-center gap-2">
              Поехали!
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex gap-2">
        {['E', '=', 'm', 'c', '²'].map((char, i) => (
          <span
            key={i}
            className="text-2xl font-mono text-gray-400/50"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
