import { useState, useMemo } from 'react';
import { SlideLayoutWithCharacter } from '../SlideLayoutWithCharacter';

interface Slide3MoreApplesProps {
  playSound: (name: string) => void;
}

export function Slide3MoreApples({ playSound }: Slide3MoreApplesProps) {
  const [appleCount, setAppleCount] = useState(10);

  const handleSliderChange = (value: number) => {
    setAppleCount(value);
    if (value % 10 === 0) {
      playSound('playClick');
    }
  };

  const probability = useMemo(() => {
    return ((1 / appleCount) * 100).toFixed(1);
  }, [appleCount]);

  const getEmoji = () => {
    if (appleCount <= 5) return { emoji: 'smile', text: 'Легко!' };
    if (appleCount <= 20) return { emoji: 'think', text: 'Уже сложнее...' };
    if (appleCount <= 50) return { emoji: 'worry', text: 'Ой-ой...' };
    return { emoji: 'shock', text: 'Почти невозможно!' };
  };

  const reaction = getEmoji();

  const apples = useMemo(() => {
    const result = [];
    const redIndex = Math.floor(Math.random() * appleCount);
    for (let i = 0; i < appleCount; i++) {
      result.push({
        isRed: i === redIndex,
        x: (i % 10) * 10 + 5,
        y: Math.floor(i / 10) * 12 + 5,
      });
    }
    return result;
  }, [appleCount]);

  return (
    <SlideLayoutWithCharacter
      characterPosition="left"
      pose="surprised"
      backgroundColor="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
      title="А если яблок больше?"
      subtitle="Чем больше яблок, тем труднее найти красное!"
    >
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-xl">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Сколько яблок в корзине?
              </label>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-gray-500">2</span>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={appleCount}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className="flex-1 h-3 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 rounded-full appearance-none cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                  }}
                />
                <span className="text-xl font-bold text-gray-500">100</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-4xl font-bold text-teal-600">{appleCount}</span>
                <span className="text-xl text-gray-600 ml-2">яблок</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 mb-6">
              <div className="flex flex-wrap gap-1 justify-center min-h-[100px]">
                {apples.slice(0, Math.min(appleCount, 100)).map((apple, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full transition-all duration-200 ${
                      apple.isRed
                        ? 'bg-red-500 ring-2 ring-red-300 ring-offset-1'
                        : 'bg-green-500'
                    }`}
                    style={{
                      transform: `scale(${appleCount > 50 ? 0.8 : 1})`,
                    }}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Найди красное яблоко!
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold text-gray-700">
                  Шанс найти красное:
                </span>
                <span className="text-2xl font-bold text-teal-600">
                  1 из {appleCount}
                </span>
              </div>

              <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(1, parseFloat(probability))}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-700">
                    {probability}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="text-4xl">
                  {reaction.emoji === 'smile' && '😊'}
                  {reaction.emoji === 'think' && '🤔'}
                  {reaction.emoji === 'worry' && '😰'}
                  {reaction.emoji === 'shock' && '😱'}
                </div>
                <span className={`text-xl font-bold ${
                  appleCount <= 5 ? 'text-green-600' :
                  appleCount <= 20 ? 'text-yellow-600' :
                  appleCount <= 50 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {reaction.text}
                </span>
              </div>
            </div>
          </div>
        </div>
    </SlideLayoutWithCharacter>
  );
}
