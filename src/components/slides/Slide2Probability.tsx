import { useState } from 'react';
import { EinsteinCharacter } from '../EinsteinCharacter';
import { RotateCcw } from 'lucide-react';

interface Slide2ProbabilityProps {
  playSound: (name: string) => void;
}

export function Slide2Probability({ playSound }: Slide2ProbabilityProps) {
  const [picked, setPicked] = useState<'red' | 'green' | null>(null);
  const [stats, setStats] = useState({ red: 0, green: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const pickApple = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    playSound('playPop');

    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'red' : 'green';
      setPicked(result);
      setStats(prev => ({
        ...prev,
        [result]: prev[result] + 1,
      }));
      setIsAnimating(false);
    }, 500);
  };

  const reset = () => {
    playSound('playClick');
    setPicked(null);
    setStats({ red: 0, green: 0 });
  };

  const total = stats.red + stats.green;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col items-center justify-center p-6">
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
          }
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
          @keyframes pop {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pop {
            animation: pop 0.4s ease-out forwards;
          }
        `}
      </style>

      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          Что такое шанс?
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Давай разберемся на простом примере!
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <EinsteinCharacter pose="thinking" className="w-40 h-52 md:w-48 md:h-64" />
          </div>

          <div className="flex-1 bg-white/80 backdrop-blur rounded-3xl p-6 shadow-xl">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Представь корзину с яблоками: <span className="text-red-500 font-bold">1 красное</span> и <span className="text-green-500 font-bold">1 зелёное</span>.
              Если закрыть глаза и достать одно, какой шанс вытащить красное?
              <span className="font-bold text-teal-600"> Правильно - один из двух!</span>
            </p>

            <div className="flex flex-col items-center gap-6">
              <div
                className={`relative cursor-pointer transition-transform hover:scale-105 ${isAnimating ? 'animate-shake' : ''}`}
                onClick={pickApple}
              >
                <svg viewBox="0 0 200 150" className="w-64 h-48">
                  <ellipse cx="100" cy="130" rx="80" ry="20" fill="#8B4513" />
                  <path d="M 30 130 Q 30 60 100 70 Q 170 60 170 130" fill="#A0522D" stroke="#8B4513" strokeWidth="3" />
                  <path d="M 35 120 Q 35 70 100 80 Q 165 70 165 120" fill="#CD853F" />

                  {!isAnimating && (
                    <>
                      <circle cx="70" cy="100" r="22" fill="#DC2626" />
                      <ellipse cx="65" cy="95" rx="6" ry="4" fill="#FCA5A5" opacity="0.6" />
                      <path d="M 70 78 Q 75 70 80 75" stroke="#15803D" strokeWidth="3" fill="none" />

                      <circle cx="130" cy="100" r="22" fill="#16A34A" />
                      <ellipse cx="125" cy="95" rx="6" ry="4" fill="#86EFAC" opacity="0.6" />
                      <path d="M 130 78 Q 135 70 140 75" stroke="#15803D" strokeWidth="3" fill="none" />
                    </>
                  )}
                </svg>

                <p className="text-center text-gray-600 mt-2">
                  {isAnimating ? 'Достаю...' : 'Нажми на корзину!'}
                </p>
              </div>

              {picked && (
                <div className="animate-pop flex flex-col items-center gap-2">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    picked === 'red' ? 'bg-red-500' : 'bg-green-500'
                  } shadow-lg`}>
                    <svg viewBox="0 0 50 50" className="w-16 h-16">
                      <circle cx="25" cy="28" r="18" fill={picked === 'red' ? '#DC2626' : '#16A34A'} />
                      <ellipse cx="20" cy="23" rx="5" ry="3" fill={picked === 'red' ? '#FCA5A5' : '#86EFAC'} opacity="0.6" />
                      <path d="M 25 10 Q 30 5 35 8" stroke="#15803D" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-gray-700">
                    Ты достал {picked === 'red' ? 'красное' : 'зелёное'} яблоко!
                  </p>
                </div>
              )}

              {total > 0 && (
                <div className="bg-gray-100 rounded-2xl p-4 w-full max-w-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Статистика:</span>
                    <button
                      onClick={reset}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        <span className="text-gray-600">Красных: {stats.red}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 transition-all duration-300"
                          style={{ width: `${(stats.red / total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 bg-green-500 rounded-full" />
                        <span className="text-gray-600">Зелёных: {stats.green}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${(stats.green / total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Попробуй много раз - увидишь, примерно поровну!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
