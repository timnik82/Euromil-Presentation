import { useState, useEffect } from 'react';
import { EinsteinCharacter } from '../EinsteinCharacter';
import { Calendar } from 'lucide-react';

interface Slide7TimeExperimentProps {
  playSound: (name: string) => void;
}

const timeline = [
  { year: -65000000, label: 'Вымерли динозавры', emoji: '🦖' },
  { year: -3000000, label: 'Первые люди', emoji: '🧑‍🦲' },
  { year: -5000, label: 'Древний Египет', emoji: '🏛️' },
  { year: 0, label: 'Наша эра', emoji: '📜' },
  { year: 2024, label: 'Сейчас', emoji: '📱' },
  { year: 2700000, label: 'Возможный выигрыш', emoji: '🎰' },
];

export function Slide7TimeExperiment({ playSound }: Slide7TimeExperimentProps) {
  const [age, setAge] = useState(9);
  const [showCalculation, setShowCalculation] = useState(false);
  const [tickCount, setTickCount] = useState(0);

  const yearsNeeded = 2688233;
  const generationsNeeded = Math.ceil(yearsNeeded / 80);
  const familyGenerations = Math.ceil(yearsNeeded / (80 * ((100 - age) / 80)));

  useEffect(() => {
    if (showCalculation) {
      const interval = setInterval(() => {
        setTickCount(prev => {
          if (prev >= 10) {
            clearInterval(interval);
            return prev;
          }
          playSound('playTick');
          return prev + 1;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [showCalculation, playSound]);

  const handleCalculate = () => {
    playSound('playSurprise');
    setShowCalculation(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 flex flex-col items-center justify-center p-4 md:p-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          А если играть каждую неделю?
        </h1>
        <p className="text-base md:text-lg text-gray-600 text-center mb-6">
          Давай посчитаем, сколько времени это займёт!
        </p>

        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <EinsteinCharacter pose="watching" className="w-36 h-48 md:w-44 md:h-56" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="bg-white/90 backdrop-blur rounded-2xl p-5 shadow-xl">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-500" />
                Сколько тебе лет?
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="15"
                  value={age}
                  onChange={(e) => {
                    setAge(Number(e.target.value));
                    playSound('playClick');
                  }}
                  className="flex-1 h-3 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full appearance-none cursor-pointer"
                />
                <span className="text-3xl font-bold text-teal-600 w-12 text-center">
                  {age}
                </span>
              </div>

              {!showCalculation ? (
                <button
                  onClick={handleCalculate}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Посчитать!
                </button>
              ) : (
                <div className="mt-4 space-y-3 animate-fadeIn">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-600">
                      Если играть каждую неделю, в среднем понадобится:
                    </p>
                    <p className="text-3xl font-bold text-teal-600 mt-2">
                      {yearsNeeded.toLocaleString('ru-RU')} лет
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Это почти 2.7 миллиона лет!
                    </p>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4">
                    <p className="text-gray-700">
                      Это <span className="font-bold text-amber-600">{generationsNeeded.toLocaleString('ru-RU')}</span> поколений людей!
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Твои пра-пра-пра... (33,603 раза!) ...бабушки и дедушки должны были начать играть ещё до появления человека!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl overflow-hidden">
              <h3 className="font-semibold text-gray-700 mb-4 text-center">
                Шкала времени
              </h3>
              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-200 via-teal-400 to-amber-400 -translate-x-1/2" />

                <div className="space-y-4">
                  {timeline.map((event, i) => {
                    const isRight = i % 2 === 0;
                    const isHighlight = event.year === 2700000;

                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-4 ${isRight ? 'flex-row' : 'flex-row-reverse'}`}
                      >
                        <div className={`flex-1 ${isRight ? 'text-right' : 'text-left'}`}>
                          <div
                            className={`inline-block p-3 rounded-xl ${
                              isHighlight
                                ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300'
                                : 'bg-gray-50'
                            }`}
                          >
                            <span className="text-2xl">{event.emoji}</span>
                            <p className="font-medium text-gray-800 text-sm">{event.label}</p>
                            <p className="text-xs text-gray-500">
                              {event.year < 0
                                ? `${Math.abs(event.year / 1000000).toFixed(1)} млн лет назад`
                                : event.year === 0
                                ? '2000+ лет назад'
                                : event.year === 2024
                                ? 'Сегодня'
                                : `через ${(event.year / 1000000).toFixed(1)} млн лет`}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-4 ${
                            isHighlight
                              ? 'bg-amber-400 border-amber-200'
                              : 'bg-teal-400 border-teal-200'
                          } z-10`}
                        />
                        <div className="flex-1" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-4 text-white text-center">
              <p className="text-lg font-medium">
                Динозавры вымерли 65 миллионов лет назад -
                даже если бы они играли в лотерею каждую неделю, они бы до сих пор не выиграли!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
