import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface RadarChartProps {
  padding: number;
}

interface Bogey {
  angle: number;
  radius: number;
}

const RadarComponent: React.FC<RadarChartProps> = ({ padding }) => {
  const radarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawChart = () => {
      if (!radarRef.current) return;

      // Clear previous chart
      d3.select(radarRef.current).select('svg').remove();

      // Get container dimensions
      const containerWidth = radarRef.current.clientWidth;
      const height = (containerWidth * 9) / 16 - padding;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      // Calculate chart dimensions based on container size and margins
      const width = containerWidth - margin.left - margin.right;

      // Set up the radar chart
      const svg = d3
        .select(radarRef.current)
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', height);

      const radar = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

      const radius = Math.min(width, height) / 2;

      // Create the radar screen (circle)
      radar
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', 'lightgray')
        .attr('stroke-width', 1);

      // Create the rotating line
      const line = radar
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -radius)
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('transform', 'rotate(-90)');

      // Create the random "bogeys"
      const numBogeys = 10;
      const bogeysData: Bogey[] = Array.from({ length: numBogeys }, () => ({
        angle: Math.random() * 2 * Math.PI,
        radius: Math.random() * radius * 0.9,
      }));

      const bogeys = radar
        .selectAll('.bogey')
        .data(bogeysData)
        .enter()
        .append('circle')
        .attr('class', 'bogey')
        .attr('cx', (d: Bogey) => d.radius * Math.sin(d.angle))
        .attr('cy', (d: Bogey) => -d.radius * Math.cos(d.angle))
        .attr('r', 3)
        .attr('fill', 'blue')
        .style('opacity', 0);

      // Animate the rotating line
      const animateRotation = () => {
        line
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attrTween('transform', () => {
            return function (t: number) {
              const rotation = t * 360;
              return `rotate(${rotation})`;
            };
          })
          .on('start', animateBogeys) // Invoke animateBogeys when line rotation animation starts
          .on('end', animateRotation);
      };

      // Animate the bogeys
      const animateBogeys = () => {
        const lineNode = line.node() as SVGLineElement;
        const lineLength = lineNode.getTotalLength();

        bogeys.each(function (d: Bogey) {
          const bogey = d3.select(this);
          const distanceToLine = Math.abs(d.angle * radius - lineLength * 0.5);

          if (distanceToLine < 5) {
            bogey
              .transition()
              .duration(200)
              .style('opacity', 1)
              .transition()
              .duration(1000)
              .style('opacity', 0);
          }
        });
      };

      animateRotation();
    };

    drawChart();

    const resizeHandler = () => {
      drawChart();
    };

    window.addEventListener('resize', resizeHandler);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [padding]);

  return <div ref={radarRef} style={{ width: '100%', height: '0', paddingBottom: '56.25%', position: 'relative' }} />;
};

export default RadarComponent;
