import { useState } from 'react';
import { SlideLayoutWithCharacter } from '../SlideLayoutWithCharacter';

interface Slide6ComparisonsProps {
  playSound: (name: string) => void;
}

const comparisons = [
  {
    id: 'clover',
    emoji: '🍀',
    title: 'Найти четырёхлистный клевер',
    odds: '1 из 10,000',
    oddsNum: 10000,
    description: 'На лугу среди обычного клевера',
  },
  {
    id: 'astronaut',
    emoji: '👨‍🚀',
    title: 'Стать космонавтом',
    odds: '1 из 12,000',
    oddsNum: 12000,
    description: 'Если очень-очень захотеть!',
  },
  {
    id: 'lightning',
    emoji: '⚡',
    title: 'Попасть под молнию',
    odds: '1 из 1,000,000',
    oddsNum: 1000000,
    description: 'За всю жизнь (и это редко!)',
  },
  {
    id: 'lottery',
    emoji: '🎰',
    title: 'Выиграть Евро Миллион',
    odds: '1 из 139,838,160',
    oddsNum: 139838160,
    description: 'Главный приз лотереи',
    highlight: true,
  },
];

export function Slide6Comparisons({ playSound }: Slide6ComparisonsProps) {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [allRevealed, setAllRevealed] = useState(false);

  const flipCard = (id: string) => {
    playSound('playClick');
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlippedCards(newFlipped);

    if (newFlipped.size === comparisons.length && !allRevealed) {
      setAllRevealed(true);
      setTimeout(() => playSound('playSurprise'), 300);
    }
  };

  const getBarWidth = (odds: number) => {
    const maxOdds = 139838160;
    const logMax = Math.log10(maxOdds);
    const logOdds = Math.log10(odds);
    return Math.max(2, (logOdds / logMax) * 100);
  };

  return (
    <SlideLayoutWithCharacter
      characterPosition="right"
      pose="winking"
      backgroundColor="bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50"
      title="Давай сравним!"
      subtitle="Нажми на карточки, чтобы узнать шансы"
    >
      <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
              {comparisons.map((comp) => {
                const isFlipped = flippedCards.has(comp.id);

                return (
                  <div
                    key={comp.id}
                    onClick={() => flipCard(comp.id)}
                    className="perspective-1000 cursor-pointer h-40 md:h-48"
                  >
                    <div
                      className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      <div
                        className={`absolute inset-0 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center shadow-lg ${
                          comp.highlight
                            ? 'bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300'
                            : 'bg-white'
                        }`}
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <span className="text-4xl md:text-6xl mb-2 md:mb-3">{comp.emoji}</span>
                        <h4 className="font-bold text-gray-800 text-center text-sm md:text-base">
                          {comp.title}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                          Нажми, чтобы узнать шанс
                        </p>
                      </div>

                      <div
                        className={`absolute inset-0 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center shadow-lg ${
                          comp.highlight
                            ? 'bg-gradient-to-br from-amber-200 to-orange-200 border-2 border-amber-400'
                            : 'bg-gradient-to-br from-teal-50 to-cyan-50'
                        }`}
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <span className="text-3xl md:text-4xl mb-1 md:mb-2">{comp.emoji}</span>
                        <h4 className="font-bold text-gray-800 text-center text-xs md:text-sm">
                          {comp.title}
                        </h4>
                        <p className={`text-lg md:text-2xl font-bold mt-1 md:mt-2 ${
                          comp.highlight ? 'text-red-600' : 'text-teal-600'
                        }`}>
                          {comp.odds}
                        </p>
                        <p className="text-xs text-gray-600 text-center mt-1">
                          {comp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {allRevealed && (
              <div className="bg-white/90 backdrop-blur rounded-2xl p-4 md:p-6 shadow-xl animate-fadeIn">
                <h3 className="font-bold text-gray-800 mb-4 text-center text-sm md:text-base">
                  Сравнение шансов (логарифмическая шкала):
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {comparisons.map((comp) => (
                    <div key={comp.id} className="flex items-center gap-2 md:gap-3">
                      <span className="text-xl md:text-2xl w-8 md:w-10">{comp.emoji}</span>
                      <div className="flex-1">
                        <div className="h-5 md:h-6 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              comp.highlight
                                ? 'bg-gradient-to-r from-red-400 to-red-600'
                                : 'bg-gradient-to-r from-teal-400 to-cyan-500'
                            }`}
                            style={{ width: `${getBarWidth(comp.oddsNum)}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-20 md:w-28 text-right">
                        {comp.odds}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-gray-600 mt-4 text-xs md:text-sm">
                  Шанс выиграть в лотерею в <span className="font-bold text-red-600">14,000 раз меньше</span>,
                    Шанс выиграть в лотерею примерно в <span className="font-bold text-red-600">140 раз меньше</span>,
                </p>
              </div>
            )}

        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.5s ease-out forwards;
            }
          `}
        </style>
      </div>
    </SlideLayoutWithCharacter>
  );
}
