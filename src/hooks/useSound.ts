import { useState, useCallback } from 'react';
import * as sounds from '../utils/sounds';

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const play = useCallback((soundName: keyof typeof sounds) => {
    if (soundEnabled && sounds[soundName]) {
      sounds[soundName]();
    }
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return { soundEnabled, toggleSound, play };
}
