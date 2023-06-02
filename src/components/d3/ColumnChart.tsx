import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataItem {
  cve: string;
  percentile: string;
}

interface ColumnChartProps {
  data: DataItem[];
  padding: number;
  barFillColor?: string;
  onBarClick?: (cve: object) => void;
  onBarMouseOver?: (cve: string) => void;
}

const ColumnChart: React.FC<ColumnChartProps> = ({
  data,
  padding,
  barFillColor = 'steelblue',
  onBarClick,
  onBarMouseOver,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawChart = () => {
      // Clear previous chart
      d3.select(chartRef.current!).selectAll('*').remove();

      // Get container dimensions
      const containerWidth = chartRef.current!.clientWidth;
      const containerHeight = chartRef.current!.clientHeight;

      // Set up chart margins
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      // Calculate chart dimensions based on container size and margins
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;

      // Create the SVG element
      const svg = d3
        .select(chartRef.current!)
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);

      // Create the chart group
      const chart = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Set up scales for x and y axes
      const xScale = d3
        .scaleBand<string>()
        .range([0, width])
        .padding(0.1)
        .domain(data.map((d) => d.cve));

      const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, (d) => parseFloat(d.percentile)) as number]);

      // Create x and y axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      // Append x and y axes to the chart
      chart
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      chart.append('g').call(yAxis);

      // Create the columns with click and mouseover handlers
      chart
        .selectAll<SVGRectElement, DataItem>('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d.cve) as number)
        .attr('y', (d) => yScale(parseFloat(d.percentile)) as number)
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => height - (yScale(parseFloat(d.percentile)) as number))
        .attr('fill', barFillColor)
        .on('click', onBarClick ? ((event, d) => onBarClick(d)) : () => {}) // Empty arrow function if no event handler
        .on('mouseover', onBarMouseOver ? ((event, d) => onBarMouseOver(d.cve)) : () => {}) // Empty arrow function if no event handler
        .on('mouseleave', function () {
          d3.select(this).attr('fill', barFillColor);
        });
    };

    if (data) {
      drawChart();
    }
  }, [data, onBarClick, onBarMouseOver, barFillColor]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default ColumnChart;
