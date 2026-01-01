import { useState, useEffect } from 'react';
import { SlideLayoutWithCharacter } from '../SlideLayoutWithCharacter';
import { Star, RotateCcw } from 'lucide-react';

interface Slide4HowLotteryWorksProps {
  playSound: (name: string) => void;
}

export function Slide4HowLotteryWorks({ playSound }: Slide4HowLotteryWorksProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [drawnStars, setDrawnStars] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const toggleNumber = (num: number) => {
    if (isDrawing || showResult) return;
    playSound('playClick');
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(prev => prev.filter(n => n !== num));
    } else if (selectedNumbers.length < 5) {
      setSelectedNumbers(prev => [...prev, num]);
    }
  };

  const toggleStar = (num: number) => {
    if (isDrawing || showResult) return;
    playSound('playClick');
    if (selectedStars.includes(num)) {
      setSelectedStars(prev => prev.filter(n => n !== num));
    } else if (selectedStars.length < 2) {
      setSelectedStars(prev => [...prev, num]);
    }
  };

  const startDraw = () => {
    if (selectedNumbers.length !== 5 || selectedStars.length !== 2) return;

    setIsDrawing(true);
    setShowResult(false);
    setDrawnNumbers([]);
    setDrawnStars([]);
    playSound('playDrumroll');

    const randomNumbers: number[] = [];
    while (randomNumbers.length < 5) {
      const num = Math.floor(Math.random() * 50) + 1;
      if (!randomNumbers.includes(num)) randomNumbers.push(num);
    }

    const randomStars: number[] = [];
    while (randomStars.length < 2) {
      const num = Math.floor(Math.random() * 12) + 1;
      if (!randomStars.includes(num)) randomStars.push(num);
    }

    const drawnNumbersTemp: number[] = [];
    const drawnStarsTemp: number[] = [];

    let index = 0;
    const interval = setInterval(() => {
      if (index < 5) {
        setDrawnNumbers(prev => [...prev, randomNumbers[index]]);
        playSound('playPop');
      } else if (index < 7) {
        drawnStarsTemp.push(randomStars[index - 5]);
        setDrawnStars([...drawnStarsTemp]);
        playSound('playPop');
      } else {
        clearInterval(interval);
        setIsDrawing(false);
        setShowResult(true);
      }
      index++;
    }, 400);
  };

  const reset = () => {
    playSound('playClick');
    setSelectedNumbers([]);
    setSelectedStars([]);
    setDrawnNumbers([]);
    setDrawnStars([]);
    setShowResult(false);
  };

  const matchedNumbers = selectedNumbers.filter(n => drawnNumbers.includes(n)).length;
  const matchedStars = selectedStars.filter(n => drawnStars.includes(n)).length;
  const isStartDisabled = selectedNumbers.length !== 5 || selectedStars.length !== 2 || isDrawing;

  useEffect(() => {
    if (showResult) {
      if (matchedNumbers === 5 && matchedStars === 2) {
        playSound('playFanfare');
      } else if (matchedNumbers >= 2) {
        playSound('playSuccess');
      } else {
        playSound('playWrong');
      }
    }
  }, [showResult, matchedNumbers, matchedStars, playSound]);

  return (
    <SlideLayoutWithCharacter
      characterPosition="right"
      pose="pointing"
      backgroundColor="bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50"
      title="Как играют в лотерею?"
      subtitle="Выбери 5 чисел из 50 и 2 звезды из 12!"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur rounded-3xl p-4 md:p-6 shadow-xl">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">
                  Числа (выбери 5):
                </h3>
                <span className="text-sm text-teal-600 font-medium">
                  {selectedNumbers.length}/5
                </span>
              </div>
              <div className="grid grid-cols-10 gap-1 md:gap-2">
                {Array.from({ length: 50 }, (_, i) => i + 1).map(num => {
                  const isSelected = selectedNumbers.includes(num);
                  const isDrawn = drawnNumbers.includes(num);
                  const isMatch = isSelected && isDrawn && showResult;

                  return (
                    <button
                      key={num}
                      onClick={() => toggleNumber(num)}
                      disabled={isDrawing || showResult}
                      className={`w-7 h-7 md:w-9 md:h-9 rounded-full text-xs md:text-sm font-bold transition-all ${
                        isMatch
                          ? 'bg-green-500 text-white ring-2 ring-green-300 scale-110'
                          : isSelected
                          ? 'bg-teal-500 text-white shadow-md scale-105'
                          : isDrawn && showResult
                          ? 'bg-orange-400 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700 flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  Звёзды (выбери 2):
                </h3>
                <span className="text-sm text-amber-600 font-medium">
                  {selectedStars.length}/2
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(num => {
                  const isSelected = selectedStars.includes(num);
                  const isDrawn = drawnStars.includes(num);
                  const isMatch = isSelected && isDrawn && showResult;

                  return (
                    <button
                      key={num}
                      onClick={() => toggleStar(num)}
                      disabled={isDrawing || showResult}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full text-sm font-bold transition-all flex items-center justify-center ${
                        isMatch
                          ? 'bg-green-500 text-white ring-2 ring-green-300 scale-110'
                          : isSelected
                          ? 'bg-teal-500 text-white shadow-md scale-105'
                          : isDrawn && showResult
                          ? 'bg-orange-400 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isSelected || (isDrawn && showResult) ? 'fill-current' : ''}`} />
                      <span className="ml-0.5">{num}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={showResult ? reset : startDraw}
                disabled={!showResult && isStartDisabled}
                className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDrawing ? (
                  'Розыгрыш...'
                ) : showResult ? (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    Попробовать снова!
                  </>
                ) : (
                  'Начать розыгрыш!'
                )}
              </button>
            </div>

            {(drawnNumbers.length > 0 || showResult) && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                <h3 className="font-semibold text-gray-700 mb-3 text-center">
                  Выпавшие числа:
                </h3>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {drawnNumbers.map((num, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold ${
                        selectedNumbers.includes(num)
                          ? 'bg-green-500 text-white'
                          : 'bg-orange-400 text-white'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                  {Array.from({ length: 5 - drawnNumbers.length }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 animate-pulse"
                    />
                  ))}
                </div>
                <div className="flex justify-center gap-2 mb-3">
                  {drawnStars.map((num, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                        selectedStars.includes(num)
                          ? 'bg-green-500 text-white'
                          : 'bg-amber-400 text-white'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      {num}
                    </div>
                  ))}
                  {!isDrawing && drawnNumbers.length === 5 && Array.from({ length: 2 - drawnStars.length }).map((_, i) => (
                    <div
                      key={`empty-star-${i}`}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-200 animate-pulse"
                    />
                  ))}
                </div>

                {showResult && (
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-700">
                      Совпало: {matchedNumbers} чисел и {matchedStars} звезды
                    </p>
                    <p className={`text-xl font-bold mt-2 ${
                      matchedNumbers === 5 && matchedStars === 2
                        ? 'text-green-600'
                        : 'text-gray-600'
                    }`}>
                      {matchedNumbers === 5 && matchedStars === 2
                        ? 'Джекпот! (Но это было везение!)'
                        : matchedNumbers >= 2
                        ? 'Неплохо, но не джекпот!'
                        : 'Не повезло! Попробуй ещё!'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
    </SlideLayoutWithCharacter>
  );
}
