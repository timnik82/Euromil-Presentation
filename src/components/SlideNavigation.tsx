import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  showNav?: boolean;
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  soundEnabled,
  onToggleSound,
  showNav = true,
}: SlideNavigationProps) {
  return (
    <>
      <button
        onClick={onToggleSound}
        className="fixed top-4 right-4 z-50 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
        aria-label={soundEnabled ? 'Выключить звук' : 'Включить звук'}
      >
        {soundEnabled ? (
          <Volume2 className="w-6 h-6 text-teal-600" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-400" />
        )}
      </button>

      {showNav && (
        <>
          {/* Previous button - left edge, vertically centered */}
          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="fixed left-4 top-1/2 -translate-y-1/2 md:left-6 z-50 p-4 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all hover:scale-110 active:scale-95 disabled:opacity-20 disabled:hover:scale-100 disabled:cursor-not-allowed focus:ring-4 focus:ring-teal-300 focus:outline-none"
            aria-label="Предыдущий слайд (клавиша ← или стрелка влево)"
            title="Предыдущий слайд"
          >
            <ChevronLeft className="w-7 h-7 text-teal-600" />
          </button>

          {/* Next button - right edge, vertically centered */}
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="fixed right-4 top-1/2 -translate-y-1/2 md:right-6 z-50 p-4 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all hover:scale-110 active:scale-95 disabled:opacity-20 disabled:hover:scale-100 disabled:cursor-not-allowed focus:ring-4 focus:ring-teal-300 focus:outline-none"
            aria-label="Следующий слайд (клавиша → или стрелка вправо)"
            title="Следующий слайд"
          >
            <ChevronRight className="w-7 h-7 text-teal-600" />
          </button>

          {/* Progress indicator - bottom center with background */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2.5 bg-white/80 backdrop-blur px-5 py-3 rounded-full shadow-lg">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'bg-teal-500 scale-150 shadow-md'
                    : i < currentSlide
                    ? 'bg-teal-300'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Screen reader announcement */}
          <div aria-live="polite" className="sr-only">
            Слайд {currentSlide + 1} из {totalSlides}
          </div>
        </>
      )}
    </>
  );
}
