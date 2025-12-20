import { useState, useEffect, useCallback } from 'react';
import { useSound } from './hooks/useSound';
import { SlideNavigation } from './components/SlideNavigation';
import { Slide1Welcome } from './components/slides/Slide1Welcome';
import { Slide2Probability } from './components/slides/Slide2Probability';
import { Slide3MoreApples } from './components/slides/Slide3MoreApples';
import { Slide4HowLotteryWorks } from './components/slides/Slide4HowLotteryWorks';
import { Slide5BigNumbers } from './components/slides/Slide5BigNumbers';
import { Slide6Comparisons } from './components/slides/Slide6Comparisons';
import { Slide7TimeExperiment } from './components/slides/Slide7TimeExperiment';
import { Slide8Conclusion } from './components/slides/Slide8Conclusion';

const TOTAL_SLIDES = 8;

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { soundEnabled, toggleSound, play } = useSound();

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index < 0 || index >= TOTAL_SLIDES) return;

    setIsTransitioning(true);
    play('playWhoosh');

    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, play]);

  const goNext = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const restart = useCallback(() => {
    goToSlide(0);
  }, [goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const playSound = useCallback((name: string) => {
    play(name as keyof typeof import('./utils/sounds'));
  }, [play]);

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return <Slide1Welcome onNext={goNext} playSound={playSound} />;
      case 1:
        return <Slide2Probability playSound={playSound} />;
      case 2:
        return <Slide3MoreApples playSound={playSound} />;
      case 3:
        return <Slide4HowLotteryWorks playSound={playSound} />;
      case 4:
        return <Slide5BigNumbers playSound={playSound} />;
      case 5:
        return <Slide6Comparisons playSound={playSound} />;
      case 6:
        return <Slide7TimeExperiment playSound={playSound} />;
      case 7:
        return <Slide8Conclusion playSound={playSound} onRestart={restart} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden">
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={TOTAL_SLIDES}
        onPrev={goPrev}
        onNext={goNext}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        showNav={currentSlide > 0}
      />

      <div
        className={`transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {renderSlide()}
      </div>
    </div>
  );
}

export default App;
