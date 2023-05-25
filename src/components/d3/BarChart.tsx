import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface DataItem {
  title: string;
  epss: string;
}

interface BarChartProps {
  data: DataItem[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(0);

  useEffect(() => {
    const containerWidth = svgRef.current?.parentElement?.clientWidth || 0;
    setChartWidth(containerWidth);
  }, []);

  useEffect(() => {
    if (data && data.length > 0 && chartWidth > 0) {
      // Set up the chart dimensions
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = chartWidth - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Clear previous chart
      d3.select(svgRef.current!).selectAll("*").remove();

      // Create the SVG element
      const svg = d3
        .select(svgRef.current)
        .attr("width", chartWidth)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Set up the x and y scales
      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const y = d3.scaleLinear().range([height, 0]);

      // Map the data to the x and y domains
      x.domain(data.map((d) => d.title));
      y.domain([0, d3.max(data, (d) => parseFloat(d.epss)) || 0]);

      // Create the bars
      svg
        .selectAll<SVGRectElement, DataItem>(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.title) || 0)
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(parseFloat(d.epss)) || 0)
        .attr("height", (d) => height - (y(parseFloat(d.epss)) || 0));

      // Add the x-axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add the y-axis
      svg.append("g").call(d3.axisLeft(y));
    }
  }, [data, chartWidth]);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = svgRef.current?.parentElement?.clientWidth || 0;
      setChartWidth(containerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
