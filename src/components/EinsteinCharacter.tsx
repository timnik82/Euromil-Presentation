import { useEffect, useState } from 'react';

export type EinsteinPose = 'wave' | 'thinking' | 'surprised' | 'pointing' | 'excited' | 'winking' | 'watching' | 'hero';

interface EinsteinCharacterProps {
  pose: EinsteinPose;
  className?: string;
}

export function EinsteinCharacter({ pose, className = '' }: EinsteinCharacterProps) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const getEyeProps = () => {
    if (blink && pose !== 'winking') {
      return { leftEyeHeight: 2, rightEyeHeight: 2 };
    }
    if (pose === 'winking') {
      return { leftEyeHeight: 8, rightEyeHeight: 2 };
    }
    if (pose === 'surprised' || pose === 'excited') {
      return { leftEyeHeight: 10, rightEyeHeight: 10 };
    }
    return { leftEyeHeight: 8, rightEyeHeight: 8 };
  };

  const { leftEyeHeight, rightEyeHeight } = getEyeProps();

  const getMouthPath = () => {
    switch (pose) {
      case 'surprised':
      case 'excited':
        return 'M 85 115 Q 100 135 115 115';
      case 'thinking':
        return 'M 88 118 Q 100 122 112 118';
      case 'winking':
        return 'M 85 115 Q 100 130 115 115';
      default:
        return 'M 85 115 Q 100 130 115 115';
    }
  };

  const getEyebrows = () => {
    switch (pose) {
      case 'surprised':
      case 'excited':
        return (
          <>
            <path d="M 75 70 Q 83 63 91 68" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 109 68 Q 117 63 125 70" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case 'thinking':
        return (
          <>
            <path d="M 75 72 Q 83 70 91 74" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 109 70 Q 117 68 125 72" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      default:
        return (
          <>
            <path d="M 75 72 Q 83 68 91 72" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 109 72 Q 117 68 125 72" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
    }
  };

  const getLeftArm = () => {
    switch (pose) {
      case 'wave':
        return (
          <g className="animate-wave origin-[45px_180px]">
            <path d="M 45 180 Q 20 150 25 110" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="25" cy="105" rx="10" ry="12" fill="#FFB74D" />
          </g>
        );
      case 'thinking':
        return (
          <>
            <path d="M 45 180 Q 50 160 80 135" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="82" cy="130" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
      case 'surprised':
        return (
          <>
            <path d="M 45 180 Q 10 160 5 180" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="2" cy="180" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
      case 'excited':
        return (
          <>
            <path d="M 45 180 Q 20 130 30 80" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="32" cy="75" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
      case 'pointing':
        return (
          <>
            <path d="M 45 180 Q 40 200 50 220" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="52" cy="225" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
      case 'watching':
        return (
          <>
            <path d="M 45 180 Q 30 170 40 150" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="42" cy="145" rx="10" ry="12" fill="#FFB74D" />
            <rect x="30" y="135" width="25" height="20" rx="3" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
            <rect x="35" y="140" width="15" height="10" rx="1" fill="#93C5FD" />
          </>
        );
      case 'hero':
        return (
          <>
            <path d="M 45 180 Q 25 185 20 200" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="18" cy="205" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
      default:
        return (
          <>
            <path d="M 45 180 Q 35 200 45 220" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="47" cy="225" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
    }
  };

  const getRightArm = () => {
    switch (pose) {
      case 'surprised':
        return (
          <>
            <path d="M 155 180 Q 190 160 195 180" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="198" cy="180" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
      case 'excited':
        return (
          <>
            <path d="M 155 180 Q 180 130 170 80" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="168" cy="75" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
      case 'pointing':
        return (
          <>
            <path d="M 155 180 Q 185 160 210 150" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="215" cy="148" rx="8" ry="10" fill="#FFB74D" />
            <ellipse cx="230" cy="145" rx="5" ry="6" fill="#FFB74D" />
          </>
        );
      case 'hero':
        return (
          <>
            <path d="M 155 180 Q 175 185 180 200" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="182" cy="205" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
      default:
        return (
          <>
            <path d="M 155 180 Q 165 200 155 220" stroke="#FFB74D" strokeWidth="16" fill="none" strokeLinecap="round" />
            <ellipse cx="153" cy="225" rx="10" ry="12" fill="#FFB74D" />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 200 280"
      className={`${className} transition-all duration-300`}
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
    >
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(-10deg); }
          }
          @keyframes breathe {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          .animate-wave {
            animation: wave 0.6s ease-in-out infinite;
          }
          .animate-breathe {
            animation: breathe 3s ease-in-out infinite;
          }
        `}
      </style>

      <g className="animate-breathe">
        <ellipse cx="100" cy="220" rx="45" ry="50" fill="#4A90D9" />
        <ellipse cx="100" cy="210" rx="35" ry="15" fill="#FFFFFF" />

        {getLeftArm()}
        {getRightArm()}

        <ellipse cx="100" cy="85" rx="50" ry="55" fill="#FFB74D" />

        <g>
          <ellipse cx="65" cy="30" rx="25" ry="15" fill="#4A3728" transform="rotate(-30 65 30)" />
          <ellipse cx="135" cy="30" rx="25" ry="15" fill="#4A3728" transform="rotate(30 135 30)" />
          <ellipse cx="45" cy="50" rx="20" ry="12" fill="#4A3728" transform="rotate(-45 45 50)" />
          <ellipse cx="155" cy="50" rx="20" ry="12" fill="#4A3728" transform="rotate(45 155 50)" />
          <ellipse cx="100" cy="25" rx="30" ry="18" fill="#4A3728" />
          <ellipse cx="80" cy="35" rx="15" ry="10" fill="#4A3728" transform="rotate(-20 80 35)" />
          <ellipse cx="120" cy="35" rx="15" ry="10" fill="#4A3728" transform="rotate(20 120 35)" />
          <ellipse cx="55" cy="65" rx="12" ry="8" fill="#4A3728" transform="rotate(-60 55 65)" />
          <ellipse cx="145" cy="65" rx="12" ry="8" fill="#4A3728" transform="rotate(60 145 65)" />
        </g>

        <g>
          <ellipse cx="83" cy="88" rx="22" ry="20" fill="none" stroke="#1E3A5F" strokeWidth="4" />
          <ellipse cx="117" cy="88" rx="22" ry="20" fill="none" stroke="#1E3A5F" strokeWidth="4" />
          <line x1="61" y1="88" x2="50" y2="85" stroke="#1E3A5F" strokeWidth="3" />
          <line x1="139" y1="88" x2="150" y2="85" stroke="#1E3A5F" strokeWidth="3" />
          <ellipse cx="83" cy="88" rx="18" ry="16" fill="rgba(200, 230, 255, 0.3)" />
          <ellipse cx="117" cy="88" rx="18" ry="16" fill="rgba(200, 230, 255, 0.3)" />
        </g>

        <ellipse cx="83" cy="90" rx="5" ry={leftEyeHeight / 2} fill="#1E3A5F">
          <animate attributeName="ry" values={`${leftEyeHeight / 2};${leftEyeHeight / 2}`} dur="0.15s" />
        </ellipse>
        <ellipse cx="117" cy="90" rx="5" ry={rightEyeHeight / 2} fill="#1E3A5F">
          <animate attributeName="ry" values={`${rightEyeHeight / 2};${rightEyeHeight / 2}`} dur="0.15s" />
        </ellipse>
        {leftEyeHeight > 4 && <circle cx="81" cy="88" r="2" fill="white" />}
        {rightEyeHeight > 4 && <circle cx="115" cy="88" r="2" fill="white" />}

        {getEyebrows()}

        <ellipse cx="100" cy="100" rx="6" ry="5" fill="#E08050" />

        <path d={getMouthPath()} stroke="#8B4513" strokeWidth="3" fill="none" strokeLinecap="round" />
        {(pose === 'surprised' || pose === 'excited') && (
          <ellipse cx="100" cy="122" rx="8" ry="10" fill="#8B4513" />
        )}
      </g>
    </svg>
  );
}
