import { useState, useEffect, useRef } from 'react';
import { SlideLayoutWithCharacter } from '../SlideLayoutWithCharacter';
import { Calculator, Star } from 'lucide-react';

interface Slide4bCalculationProps {
  playSound: (name: string) => void;
}

export function Slide4bCalculation({ playSound }: Slide4bCalculationProps) {
  const [numbersCalculated, setNumbersCalculated] = useState(false);
  const [numbersValue, setNumbersValue] = useState<number | null>(null);
  const [starsCalculated, setStarsCalculated] = useState(false);
  const [starsValue, setStarsValue] = useState<number | null>(null);
  const [finalCalculated, setFinalCalculated] = useState(false);
  const [finalValue, setFinalValue] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
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

  const animateNumber = (
    target: number,
    setter: (val: number | null) => void,
    onComplete: () => void
  ) => {
    setIsAnimating(true);
    const steps = [
      Math.floor(target * 0.1),
      Math.floor(target * 0.3),
      Math.floor(target * 0.5),
      Math.floor(target * 0.7),
      Math.floor(target * 0.9),
      target,
    ];

    let stepIndex = 0;
    intervalRef.current = setInterval(() => {
      setter(steps[stepIndex]);
      playSound('playClick');
      stepIndex++;

      if (stepIndex >= steps.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsAnimating(false);
        onComplete();
      }
    }, 200);
  };

  const calculateNumbers = () => {
    if (numbersCalculated || isAnimating) return;
    playSound('playDrumroll');

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      animateNumber(2118760, setNumbersValue, () => {
        setNumbersCalculated(true);
        playSound('playSuccess');
      });
    }, 500);
  };

  const calculateStars = () => {
    if (starsCalculated || isAnimating || !numbersCalculated) return;
    playSound('playClick');

    animateNumber(66, setStarsValue, () => {
      setStarsCalculated(true);
      playSound('playPop');
    });
  };

  const calculateFinal = () => {
    if (finalCalculated || isAnimating || !starsCalculated) return;
    playSound('playDrumroll');

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      animateNumber(139838160, setFinalValue, () => {
        setFinalCalculated(true);
        playSound('playFanfare');
      });
    }, 500);
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

    setIsAnimating(false);
    setNumbersCalculated(false);
    setNumbersValue(null);
    setStarsCalculated(false);
    setStarsValue(null);
    setFinalCalculated(false);
    setFinalValue(null);
  };

  return (
    <SlideLayoutWithCharacter
      characterPosition="right"
      pose="excited"
      backgroundColor="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50"
      title="Супер-калькулятор для лотереи!"
      subtitle="Посчитаем, сколько всего комбинаций в EuroMillions"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-gray-700">
                Шаг 1: Выбираем 5 чисел из 50
              </h3>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 mb-4">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                  50 × 49 × 48 × 47 × 46
                </div>
                <div className="border-t-2 border-gray-400 mx-auto w-3/4 my-2" />
                <div className="text-xl md:text-2xl font-bold text-gray-800">
                  1 × 2 × 3 × 4 × 5
                </div>
              </div>
            </div>

            {numbersValue !== null ? (
              <div className="text-center py-3">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  = {numbersValue.toLocaleString('ru-RU')}
                </span>
                <p className="text-sm text-gray-500 mt-1">вариантов чисел</p>
              </div>
            ) : (
              <button
                onClick={calculateNumbers}
                disabled={isAnimating}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                Посчитать варианты чисел
              </button>
            )}
          </div>

          <div
            className={`bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl transition-opacity duration-300 ${
              numbersCalculated ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-gray-700">
                Шаг 2: Выбираем 2 звезды из 12
              </h3>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 mb-4">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-800">
                  (12 × 11) ÷ 2
                </div>
              </div>
            </div>

            {starsValue !== null ? (
              <div className="text-center py-3">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  = {starsValue}
                </span>
                <p className="text-sm text-gray-500 mt-1">вариантов звёзд</p>
              </div>
            ) : (
              <button
                onClick={calculateStars}
                disabled={!numbersCalculated || isAnimating}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Посчитать варианты звёзд
              </button>
            )}
          </div>

          <div
            className={`bg-white/80 backdrop-blur rounded-3xl p-5 shadow-xl transition-opacity duration-300 ${
              starsCalculated ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <h3 className="font-semibold text-gray-700 mb-4 text-center">
              Шаг 3: Умножаем всё вместе!
            </h3>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 mb-4">
              <div className="text-center text-lg md:text-xl font-bold text-gray-800">
                {numbersCalculated ? '2 118 760' : '???'} × {starsCalculated ? '66' : '???'}
              </div>
            </div>

            {finalValue !== null ? (
              <div className="text-center py-3">
                <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  = {finalValue.toLocaleString('ru-RU')}
                </span>
                <p className="text-sm text-gray-500 mt-1">всего комбинаций!</p>
              </div>
            ) : (
              <button
                onClick={calculateFinal}
                disabled={!starsCalculated || isAnimating}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Умножить всё!
              </button>
            )}
          </div>

          {finalCalculated && (
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-5 text-white">
              <p className="text-center text-lg md:text-xl font-bold mb-2">
                Почти 140 миллионов комбинаций!
              </p>
              <p className="text-center text-base opacity-90">
                И только ОДНА из них выигрышная. Вот почему выиграть джекпот так сложно!
              </p>
            </div>
          )}

          {finalCalculated && (
            <button
              onClick={reset}
              className="w-full py-3 bg-white/80 text-gray-700 font-medium rounded-xl hover:bg-white transition-colors"
            >
              Посчитать заново
            </button>
          )}
        </div>
      </div>
    </SlideLayoutWithCharacter>
  );
}
