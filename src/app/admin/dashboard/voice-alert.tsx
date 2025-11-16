'use client';

import { useEffect, useRef } from 'react';

type VoiceAlertProps = {
  audioDataUri: string;
};

export default function VoiceAlert({ audioDataUri }: VoiceAlertProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioDataUri && audioRef.current) {
      audioRef.current.src = audioDataUri;
      // Autoplay might be blocked by the browser, but we can try.
      // A user interaction might be required to play it for the first time.
      audioRef.current.play().catch(error => {
        console.warn("Audio autoplay was prevented by the browser. A user interaction is needed.", error);
      });
    }
  }, [audioDataUri]);

  return <audio ref={audioRef} style={{ display: 'none' }} />;
}
