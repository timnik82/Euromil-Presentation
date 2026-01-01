import { useState, useEffect, useRef } from 'react';
import { SlideLayoutWithCharacter } from '../SlideLayoutWithCharacter';

interface Slide4aCombinatoricsProps {
  playSound: (name: string) => void;
}

const fruits = [
  { id: 'apple', name: 'Яблоко', color: 'bg-red-500', emoji: '🍎' },
  { id: 'pear', name: 'Груша', color: 'bg-green-500', emoji: '🍐' },
  { id: 'banana', name: 'Банан', color: 'bg-yellow-400', emoji: '🍌' },
  { id: 'orange', name: 'Апельсин', color: 'bg-orange-500', emoji: '🍊' },
];

const allPairs = [
  [0, 1], [0, 2], [0, 3],
  [1, 2], [1, 3],
  [2, 3],
];

export function Slide4aCombinatorics({ playSound }: Slide4aCombinatoricsProps) {
  const [showPairs, setShowPairs] = useState(false);
  const [visiblePairs, setVisiblePairs] = useState<number>(0);
  const [showConclusion, setShowConclusion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleShowPairs = () => {
    if (showPairs) return;
    setShowPairs(true);
    playSound('playClick');

    let pairIndex = 0;
    intervalRef.current = setInterval(() => {
      pairIndex++;
      setVisiblePairs(pairIndex);
      playSound('playPop');

      if (pairIndex >= allPairs.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        timeoutRef.current = setTimeout(() => {
          setShowConclusion(true);
          playSound('playSurprise');
          timeoutRef.current = null;
        }, 500);
      }
    }, 400);
  };

  const reset = () => {
    playSound('playClick');

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setShowPairs(false);
    setVisiblePairs(0);
    setShowConclusion(false);
  };

  return (
    <SlideLayoutWithCharacter
      characterPosition="left"
      pose="thinking"
      backgroundColor="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
      title="Давай потренируемся на фруктах!"
      subtitle="Есть 4 фрукта. Сколькими способами можно выбрать пару?"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-xl">
          <div className="flex justify-center gap-6 md:gap-10 mb-8">
            {fruits.map((fruit, index) => (
              <div
                key={fruit.id}
                className="flex flex-col items-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${fruit.color} flex items-center justify-center text-3xl md:text-4xl shadow-lg transition-transform hover:scale-110`}
                >
                  {fruit.emoji}
                </div>
                <span className="mt-2 text-sm md:text-base font-medium text-gray-700">
                  {fruit.name}
                </span>
              </div>
            ))}
          </div>

          {!showPairs ? (
            <button
              onClick={handleShowPairs}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Показать все пары
            </button>
          ) : (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 text-center">
                Все возможные пары:
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allPairs.slice(0, visiblePairs).map((pair, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 shadow-md animate-bounce-in"
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${fruits[pair[0]].color} flex items-center justify-center text-2xl shadow`}
                    >
                      {fruits[pair[0]].emoji}
                    </div>
                    <span className="text-xl font-bold text-gray-400">+</span>
                    <div
                      className={`w-12 h-12 rounded-full ${fruits[pair[1]].color} flex items-center justify-center text-2xl shadow`}
                    >
                      {fruits[pair[1]].emoji}
                    </div>
                  </div>
                ))}
              </div>

              {visiblePairs === allPairs.length && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full font-bold text-lg">
                    Итого: {allPairs.length} пар!
                  </div>
                </div>
              )}

              {showConclusion && (
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-5 text-white">
                  <p className="text-center text-lg font-medium mb-3">
                    Всего 4 фрукта, но целых 6 пар!
                  </p>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold mb-2">
                      (4 × 3) ÷ 2 = 6
                    </p>
                    <p className="text-sm md:text-base opacity-90">
                      Делим на 2, потому что порядок не важен:
                      <br />
                      Яблоко + Груша = Груша + Яблоко
                    </p>
                  </div>
                </div>
              )}

              {showConclusion && (
                <button
                  onClick={reset}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Попробовать снова
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </SlideLayoutWithCharacter>
  );
}
