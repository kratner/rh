import React, { useEffect, useState } from 'react';

interface RadarScreenProps {
  circleColor: string;
  lineColor: string;
  bogeyData: Bogey[];
  rotationSpeed: number;
}

interface Bogey {
  id: number;
  x: number;
  y: number;
  label: string;
  color: string;
}

const RadarScreen: React.FC<RadarScreenProps> = ({
  circleColor,
  lineColor,
  bogeyData,
  rotationSpeed,
}) => {
  const [bogeys, setBogeys] = useState<Bogey[]>([]);

  useEffect(() => {
    setBogeys(bogeyData);

    const interval = setInterval(() => {
      // Update bogeys' positions here
      // Replace this with an actual API request to update bogeys dynamically
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [bogeyData]);

  const renderBogeys = () => {
    return bogeys.map((bogey) => {
      const isVisible = bogey.x >= 200;
      const style = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      };

      return (
        <circle
          key={bogey.id}
          cx={bogey.x}
          cy={bogey.y}
          r="5"
          fill={bogey.color}
          style={style}
        >
          <title>{bogey.label}</title>
        </circle>
      );
    });
  };

  const rotationDuration = 360 / rotationSpeed;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      style={{ width: '100%', height: '100%' }}
    >
      <circle cx="200" cy="200" r="180" fill="transparent" stroke={circleColor} strokeWidth="2" />
      <g transform={`rotate(90 200 200)`}>
        <line
          x1="200"
          y1="10"
          x2="200"
          y2="190"
          stroke={lineColor}
          strokeWidth="2"
          style={{
            animation: `rotation ${rotationDuration}s linear infinite`,
            transformOrigin: 'center',
          }}
        />
      </g>
      {renderBogeys()}
    </svg>
  );
};

export default RadarScreen;
