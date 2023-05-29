import React, { useEffect, useRef } from 'react';

const SVGRadarComponent: React.FC = () => {
  const lineRef = useRef<SVGLineElement | null>(null);
  const bogeysRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const line = lineRef.current;
    const bogeys = bogeysRef.current;

    const resetAnimation = () => {
      if (line) {
        line.style.transition = 'none';
        line.style.transformOrigin = 'center';
        line.style.transform = 'rotate(0deg)';
        line.style.opacity = '1';
      }

      bogeys.forEach((bogey) => {
        bogey.style.transition = 'none';
        bogey.style.opacity = '0';
      });
    };

    const startAnimation = () => {
      resetAnimation();

      if (line) {
        line.style.transition = 'transform 2s linear infinite';
        line.style.transform = 'rotate(180deg)';

        line.ontransitionend = () => {
          resetAnimation();

          setTimeout(startAnimation, 0);
        };

        bogeys.forEach((bogey) => {
          const x = parseFloat(bogey.getAttribute('cx') || '0');
          const y = parseFloat(bogey.getAttribute('cy') || '0');
          const distanceToCenter = Math.sqrt((x - 50) ** 2 + (y - 50) ** 2);

          if (distanceToCenter < 45) {
            bogey.style.transition = 'opacity 0.5s linear';
            bogey.style.opacity = '1';

            setTimeout(() => {
              bogey.style.transition = 'opacity 0.5s linear';
              bogey.style.opacity = '0';
            }, 2000);
          }
        });
      }
    };

    startAnimation();
  }, []);

  useEffect(() => {
    const numBogeys = 5; // Number of bogeys to generate

    const generateRandomCoordinates = () => {
      return Math.floor(Math.random() * 90) + 5; // Generate random coordinates between 5 and 95
    };

    // Generate bogeys
    const bogeys: SVGCircleElement[] = [];
    for (let i = 0; i < numBogeys; i++) {
      const bogey = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bogey.setAttribute('cx', generateRandomCoordinates().toString());
      bogey.setAttribute('cy', generateRandomCoordinates().toString());
      bogey.setAttribute('r', '2');
      bogey.setAttribute('fill', 'green');
      bogeys.push(bogey);
    }

    bogeysRef.current = bogeys;
  }, []);

  return (
    <div className="svg-radar-container">
      <svg className="svg-radar" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
        <circle className="radar-bg" cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="1" />
        <line
          ref={lineRef}
          className="radar-line"
          x1="50"
          y1="50"
          x2="50"
          y2="5"
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {bogeysRef.current.map((bogey, index) => (
          <circle
            key={index}
            className="bogey"
            cx={bogey.getAttribute('cx') || undefined}
            cy={bogey.getAttribute('cy') || undefined}
            r={bogey.getAttribute('r') || undefined}
            fill={bogey.getAttribute('fill') || undefined}
          /> 
        ))}
      </svg>
    </div>
  );
};

export default SVGRadarComponent;
