import { ReactNode } from 'react';
import { EinsteinCharacter, EinsteinPose } from './EinsteinCharacter';

interface SlideLayoutWithCharacterProps {
  children: ReactNode;
  characterPosition: 'left' | 'right';
  pose: EinsteinPose;
  backgroundColor: string;
  title: string;
  subtitle?: string;
}

export function SlideLayoutWithCharacter({
  children,
  characterPosition,
  pose,
  backgroundColor,
  title,
  subtitle,
}: SlideLayoutWithCharacterProps) {
  return (
    <div className={`min-h-screen ${backgroundColor} flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden`}>
      <style>
        {`
          @keyframes slideInFromTop {
            from { transform: translateY(-120%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slideInFromTop {
            animation: slideInFromTop 0.5s ease-out forwards;
          }
        `}
      </style>

      <div
        className="fixed top-5 right-5 md:top-6 md:right-6 lg:top-8 lg:right-8 z-20 transition-transform hover:scale-105 duration-300 animate-slideInFromTop"
      >
        <EinsteinCharacter
          pose={pose}
          className="w-16 h-20 md:w-20 md:h-28 lg:w-24 lg:h-32 opacity-90 md:opacity-100"
        />
      </div>

      <div className="max-w-4xl lg:max-w-5xl w-full pt-8 md:pt-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-gray-600 text-center mb-6 md:mb-8">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
