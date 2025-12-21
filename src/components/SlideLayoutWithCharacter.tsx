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
  const positionClasses = characterPosition === 'left'
    ? 'bottom-3 left-3 md:bottom-4 md:left-4 lg:bottom-6 lg:left-6 animate-slideInFromLeft'
    : 'bottom-3 right-3 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6 animate-slideInFromRight';

  return (
    <div className={`min-h-screen ${backgroundColor} flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden`}>
      <style>
        {`
          @keyframes slideInFromLeft {
            from { transform: translateX(-120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideInFromRight {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slideInFromLeft {
            animation: slideInFromLeft 0.4s ease-out forwards;
          }
          .animate-slideInFromRight {
            animation: slideInFromRight 0.4s ease-out forwards;
          }
        `}
      </style>

      <div
        className={`fixed ${positionClasses} z-20 transition-transform hover:scale-105 duration-300`}
      >
        <EinsteinCharacter
          pose={pose}
          className="w-16 h-20 md:w-24 md:h-32 lg:w-28 lg:h-36 opacity-90 md:opacity-100"
        />
      </div>

      <div className="max-w-4xl lg:max-w-5xl w-full pb-24 md:pb-28 lg:pb-4">
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
