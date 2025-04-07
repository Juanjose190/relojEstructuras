import React from 'react';

interface AnalogClockProps {
  time: Date;
}

export const AnalogClock: React.FC<AnalogClockProps> = ({ time }) => {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours + minutes / 60) / 12) * 360;

  const clockSize = 340;
  const center = clockSize / 2;
  const numberRadius = 135; 

  return (
    <div
      className="relative rounded-full border-[8px] border-black bg-white shadow-lg"
      style={{ width: clockSize, height: clockSize }}
    >
     
      {[...Array(12)].map((_, i) => {
        const number = i === 0 ? 12 : i;
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = center + numberRadius * Math.cos(angle);
        const y = center + numberRadius * Math.sin(angle);

        return (
          <div
            key={i}
            className="absolute text-black text-[16px] font-normal"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
              width: '24px',
              textAlign: 'center',
            }}
          >
            {number}
          </div>
        );
      })}


      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[6px] bg-black rounded-full"
        style={{
          height: '25%',
          transform: `translateY(-100%) rotate(${hourDegrees}deg)`,
          transformOrigin: 'bottom',
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[4px] bg-black rounded-full"
        style={{
          height: '35%',
          transform: `translateY(-100%) rotate(${minuteDegrees}deg)`,
          transformOrigin: 'bottom',
        }}
      />

 
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[2px] bg-red-500 rounded-full"
        style={{
          height: '40%',
          transform: `translateY(-100%) rotate(${secondDegrees}deg)`,
          transformOrigin: 'bottom',
        }}
      />

   
      <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};
