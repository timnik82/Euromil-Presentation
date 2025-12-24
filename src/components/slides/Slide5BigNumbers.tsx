import { useState } from 'react';
import { SlideLayoutWithCharacter } from '../SlideLayoutWithCharacter';
import { Users, Building, Waves } from 'lucide-react';

interface Slide5BigNumbersProps {
  playSound: (name: string) => void;
}

const comparisons = [
  {
    id: 'countries',
    icon: Users,
    title: 'Население стран',
    description: 'Это как если бы ВСЕ жители России, Германии и Франции вместе сыграли в лотерею...',
    detail: 'Россия (144 млн) + Германия (83 млн) + Франция (67 млн) = почти 294 миллиона человек!',
    visual: '🇷🇺 + 🇩🇪 + 🇫🇷',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'stadiums',
    icon: Building,
    title: 'Футбольные стадионы',
    description: 'Представь стадион на 50,000 человек. Чтобы вместить 139 миллионов...',
    detail: 'Нужно 2,797 стадионов, заполненных до отказа! Это больше, чем во всём мире!',
    visual: '🏟️ × 2,797',
    color: 'from-green-400 to-green-600',
  },
  {
    id: 'sand',
    icon: Waves,
    title: 'Песчинки на пляже',
    description: 'Если бы каждый билет был песчинкой...',
    detail: 'Это был бы огромный мешок песка весом около 14 тонн! Как 3 слона!',
    visual: '🏖️ 🐘🐘🐘',
    color: 'from-amber-400 to-amber-600',
  },
];

export function Slide5BigNumbers({ playSound }: Slide5BigNumbersProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showCounter, setShowCounter] = useState(false);
  const [counter, setCounter] = useState(0);

  const startCounter = () => {
    if (showCounter) return;
    setShowCounter(true);
    playSound('playSurprise');

    let count = 0;
    const targetSteps = [1000, 10000, 100000, 1000000, 10000000, 50000000, 100000000, 139838160];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < targetSteps.length) {
        count = targetSteps[stepIndex];
        setCounter(count);
        stepIndex++;
        playSound('playClick');
      } else {
        clearInterval(interval);
        playSound('playSurprise');
      }
    }, 300);
  };

  const handleCardClick = (id: string) => {
    playSound('playSurprise');
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <SlideLayoutWithCharacter
      characterPosition="left"
      pose="excited"
      backgroundColor="bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50"
      title="Насколько это много?"
      subtitle="Шанс выиграть - 1 из 139,838,160. Но что это значит?"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="space-y-4">
            <div
              className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-all"
              onClick={startCounter}
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
                {showCounter ? 'Вот сколько это:' : 'Нажми, чтобы увидеть число!'}
              </h3>
              <div className="text-center">
                <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  {showCounter ? counter.toLocaleString('ru-RU') : '???'}
                </span>
              </div>
              {showCounter && counter === 139838160 && (
                <p className="text-center text-gray-600 mt-3">
                  Сто тридцать девять миллионов восемьсот тридцать восемь тысяч сто шестьдесят!
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisons.map((comp) => {
                const Icon = comp.icon;
                const isActive = activeCard === comp.id;

                return (
                  <div
                    key={comp.id}
                    onClick={() => handleCardClick(comp.id)}
                    className={`bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg cursor-pointer transition-all duration-300 ${
                      isActive ? 'ring-2 ring-teal-400 shadow-xl scale-105' : 'hover:shadow-xl hover:scale-102'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${comp.color} flex items-center justify-center mb-3 mx-auto`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-800 text-center mb-2">
                      {comp.title}
                    </h4>
                    <div className="text-3xl text-center mb-2">
                      {comp.visual}
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      {isActive ? comp.detail : comp.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-4 text-white text-center">
              <p className="text-lg font-medium">
                Запомни: шанс выиграть джекпот - это как найти ОДНОГО конкретного человека
                среди ВСЕХ жителей России!
              </p>
            </div>
          </div>
        </div>
    </SlideLayoutWithCharacter>
  );
}
