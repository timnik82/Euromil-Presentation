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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
            aria-label="Назад"
          >
            <ChevronLeft className="w-6 h-6 text-teal-600" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentSlide
                    ? 'bg-teal-500 scale-125'
                    : i < currentSlide
                    ? 'bg-teal-300'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
            aria-label="Вперед"
          >
            <ChevronRight className="w-6 h-6 text-teal-600" />
          </button>
        </div>
      )}
    </>
  );
}
