import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';

export function useSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const slideStartTime = useRef<number>(Date.now());

  useEffect(() => {
    const initSession = async () => {
      const stored = sessionStorage.getItem('lottery_session_id');

      if (stored) {
        setSessionId(stored);
        await supabase
          .from('sessions')
          .update({ last_active_at: new Date().toISOString() })
          .eq('id', stored);
      } else {
        const { data, error } = await supabase
          .from('sessions')
          .insert({
            started_at: new Date().toISOString(),
            last_active_at: new Date().toISOString(),
            completed: false,
            sound_enabled: true,
          })
          .select()
          .maybeSingle();

        if (data && !error) {
          setSessionId(data.id);
          sessionStorage.setItem('lottery_session_id', data.id);
        }
      }
    };

    initSession();
  }, []);

  const trackSlideView = useCallback(async (slideNumber: number) => {
    if (!sessionId) return;

    const timeSpent = Math.floor((Date.now() - slideStartTime.current) / 1000);
    slideStartTime.current = Date.now();

    await supabase
      .from('slide_progress')
      .upsert({
        session_id: sessionId,
        slide_number: slideNumber,
        viewed_at: new Date().toISOString(),
        time_spent_seconds: timeSpent,
      }, {
        onConflict: 'session_id,slide_number',
      });

    await supabase
      .from('sessions')
      .update({ last_active_at: new Date().toISOString() })
      .eq('id', sessionId);
  }, [sessionId]);

  const markComplete = useCallback(async () => {
    if (!sessionId) return;

    await supabase
      .from('sessions')
      .update({
        completed: true,
        last_active_at: new Date().toISOString(),
      })
      .eq('id', sessionId);
  }, [sessionId]);

  const updateSoundPreference = useCallback(async (enabled: boolean) => {
    if (!sessionId) return;

    await supabase
      .from('sessions')
      .update({ sound_enabled: enabled })
      .eq('id', sessionId);
  }, [sessionId]);

  const saveExperimentResult = useCallback(async (
    age: number,
    yearsNeeded: number,
    generationsNeeded: number
  ) => {
    if (!sessionId) return;

    await supabase
      .from('experiment_results')
      .insert({
        session_id: sessionId,
        user_age: age,
        years_needed: yearsNeeded,
        generations_needed: generationsNeeded,
      });
  }, [sessionId]);

  return {
    sessionId,
    trackSlideView,
    markComplete,
    updateSoundPreference,
    saveExperimentResult,
  };
}
