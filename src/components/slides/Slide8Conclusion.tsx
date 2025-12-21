import { useState } from 'react';
import { EinsteinCharacter } from '../EinsteinCharacter';
import { SlideLayoutWithCharacter } from '../SlideLayoutWithCharacter';
import { Award, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface Slide8ConclusionProps {
  playSound: (name: string) => void;
  onRestart: () => void;
}

const questions = [
  {
    question: 'Какой шанс вытащить красное яблоко из корзины с 10 яблоками?',
    options: ['1 из 2', '1 из 5', '1 из 10', '1 из 100'],
    correct: 2,
  },
  {
    question: 'Сколько чисел нужно угадать в Евро Миллион?',
    options: ['3 числа', '5 чисел', '7 чисел', '10 чисел'],
    correct: 1,
  },
  {
    question: 'Шанс выиграть джекпот - примерно 1 из...',
    options: ['1 миллиона', '10 миллионов', '140 миллионов', '1 миллиарда'],
    correct: 2,
  },
  {
    question: 'Что лучше делать с деньгами вместо лотереи?',
    options: [
      'Купить ещё больше билетов',
      'Книги, игрушки или мороженое',
      'Закопать в землю',
      'Выбросить в окно',
    ],
    correct: 1,
  },
];

export function Slide8Conclusion({ playSound, onRestart }: Slide8ConclusionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;

    if (isCorrect) {
      playSound('playSuccess');
    } else {
      playSound('playWrong');
    }

    setAnswers(prev => [...prev, isCorrect]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        playSound('playFanfare');
        setShowCertificate(true);
      }
    }, 1500);
  };

  const correctCount = answers.filter(Boolean).length;

  const startQuiz = () => {
    playSound('playClick');
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    playSound('playClick');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowCertificate(false);
    setQuizStarted(false);
  };

  if (showCertificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex flex-col items-center justify-center p-4 md:p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-amber-400 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400" />
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400" />

            <div className="text-center">
              <Award className="w-20 h-20 text-amber-500 mx-auto mb-4" />

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Сертификат
              </h1>
              <p className="text-xl text-amber-600 font-semibold mb-6">
                Юный Математик
              </p>

              <div className="bg-amber-50 rounded-2xl p-4 mb-6">
                <p className="text-gray-700 text-lg">
                  Поздравляем! Ты успешно прошёл урок о вероятности и теперь знаешь,
                  почему выиграть в лотерею практически невозможно!
                </p>
              </div>

              <div className="flex justify-center gap-2 mb-6">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      correct ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {correct ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                ))}
              </div>

              <p className="text-2xl font-bold text-teal-600 mb-6">
                Правильных ответов: {correctCount} из {questions.length}
              </p>

              <EinsteinCharacter pose="hero" className="w-32 h-44 mx-auto mb-4" />

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Пройти ещё раз
                </button>
                <button
                  onClick={onRestart}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Начать сначала
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SlideLayoutWithCharacter
      characterPosition="right"
      pose="hero"
      backgroundColor="bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50"
      title="Что мы узнали?"
      subtitle="Проверим, как ты запомнил!"
    >
      <div className="w-full max-w-3xl mx-auto">
            {!quizStarted ? (
              <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Главные выводы:
                </h2>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">1️⃣</span>
                    <span className="text-gray-700">
                      <strong>Вероятность</strong> - это шанс, что что-то произойдёт.
                      Чем больше вариантов, тем меньше шанс угадать!
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">2️⃣</span>
                    <span className="text-gray-700">
                      Шанс выиграть в Евро Миллион - <strong>1 из 140 миллионов</strong>.
                      Это невероятно мало!
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">3️⃣</span>
                    <span className="text-gray-700">
                      Даже если играть каждую неделю, понадобится <strong>миллионы лет</strong>!
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">4️⃣</span>
                    <span className="text-gray-700">
                      <strong>Математика помогает</strong> принимать умные решения и не тратить деньги зря!
                    </span>
                  </li>
                </ul>

                <button
                  onClick={startQuiz}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all animate-pulse hover:animate-none"
                >
                  Начать викторину!
                </button>
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </span>
                  <div className="flex gap-1">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < answers.length
                            ? answers[i]
                              ? 'bg-green-500'
                              : 'bg-red-500'
                            : i === currentQuestion
                            ? 'bg-teal-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect = i === questions[currentQuestion].correct;
                    const showResult = selectedAnswer !== null;

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                          showResult
                            ? isCorrect
                              ? 'bg-green-100 border-2 border-green-500 text-green-800'
                              : isSelected
                              ? 'bg-red-100 border-2 border-red-500 text-red-800'
                              : 'bg-gray-50 text-gray-400'
                            : 'bg-gray-50 hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            showResult
                              ? isCorrect
                                ? 'bg-green-500 text-white'
                                : isSelected
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          {option}
                          {showResult && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
      </div>
    </SlideLayoutWithCharacter>
  );
}
