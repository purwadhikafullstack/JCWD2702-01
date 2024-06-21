'use client';
import { useTimer } from 'react-timer-hook';
import { useEffect } from 'react';

function Timer({ expiryTimestamp }: { expiryTimestamp: any }) {
  const { seconds, minutes, hours, start } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  });

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div className="numbers-font text-5xl font-semibold">
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </div>
  );
}

export default Timer;
