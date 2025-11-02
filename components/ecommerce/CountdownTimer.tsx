'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  endDate: Date;
  onComplete?: () => void;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function CountdownTimer({ 
  endDate, 
  onComplete, 
  showLabels = true,
  size = 'md' 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  const sizeClasses = {
    sm: { container: 'text-sm', number: 'text-lg', box: 'px-2 py-1' },
    md: { container: 'text-base', number: 'text-2xl', box: 'px-3 py-2' },
    lg: { container: 'text-lg', number: 'text-4xl', box: 'px-4 py-3' }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2 ${sizes.container}`}>
      <Clock className="w-5 h-5 text-red-500" />
      <div className="flex gap-2">
        {timeLeft.days > 0 && (
          <div className="text-center">
            <div className={`bg-red-600 text-white font-bold rounded-lg ${sizes.box} ${sizes.number} min-w-[3rem]`}>
              {timeLeft.days}
            </div>
            {showLabels && <div className="text-xs text-gray-600 mt-1">Days</div>}
          </div>
        )}
        <div className="text-center">
          <div className={`bg-red-600 text-white font-bold rounded-lg ${sizes.box} ${sizes.number} min-w-[3rem]`}>
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          {showLabels && <div className="text-xs text-gray-600 mt-1">Hours</div>}
        </div>
        <div className="text-center">
          <div className={`bg-red-600 text-white font-bold rounded-lg ${sizes.box} ${sizes.number} min-w-[3rem]`}>
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          {showLabels && <div className="text-xs text-gray-600 mt-1">Mins</div>}
        </div>
        <div className="text-center">
          <div className={`bg-red-600 text-white font-bold rounded-lg ${sizes.box} ${sizes.number} min-w-[3rem]`}>
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          {showLabels && <div className="text-xs text-gray-600 mt-1">Secs</div>}
        </div>
      </div>
    </div>
  );
}
