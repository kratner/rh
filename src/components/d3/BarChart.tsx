import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataItem {
  cve: string;
  percentile: string;
}

interface BarChartProps {
  data: DataItem[];
  padding: number;
  onBarClick?: (cve: object) => void;
  onBarMouseOver?: (cve: object) => void;
}

const BarChart: React.FC<BarChartProps> = ({ data, padding, onBarClick, onBarMouseOver }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const drawChart = () => {
    // Clear previous chart
    d3.select(chartRef.current!).selectAll('*').remove();

    // Get container dimensions
    const containerHeight = chartRef.current!.clientHeight;
    const width = chartRef.current!.clientWidth - padding;

    // Set up chart margins
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Calculate chart dimensions based on container size and margins
    const height = containerHeight - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3
      .select(chartRef.current!)
      .append('svg')
      .attr('width', width)
      .attr('height', containerHeight);

    // Create the chart group
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Set up scales for x and y axes
    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, d3.max(data, (d) => parseFloat(d.percentile)) as number]);

    const yScale = d3
      .scaleBand<string>()
      .range([0, height])
      .padding(0.1)
      .domain(data.map((d) => d.cve));

    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append x and y axes to the chart
    chart.append('g').call(xAxis).attr('class','xAxis').attr('transform', `translate(0, ${height})`);
    chart.append('g').call(yAxis).attr('class','yAxis');

    // Create the bars
    chart
      .selectAll<SVGRectElement, DataItem>('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', (d) => yScale(d.cve) as number)
      .attr('width', (d) => xScale(parseFloat(d.percentile)) as number)
      .attr('height', yScale.bandwidth())
      .attr('fill', 'steelblue')
      .on('click', (event, d) => {
        if (onBarClick) {
          onBarClick(d);
        }
      })
      .on('mouseover', (event, d) => {
        if (onBarMouseOver) {
          onBarMouseOver(d);
        }
      });
  };

  useEffect(() => {
    if (data) {
      drawChart();
    }
  }, [data, padding, onBarClick, onBarMouseOver]);

  useEffect(() => {
    const handleResize = () => {
      drawChart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div className='bar-chart' ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default BarChart;
