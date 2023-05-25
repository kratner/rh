import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      // Set up the chart dimensions
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create the SVG element
      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Set up the x and y scales
      const x = d3.scaleBand().range([0, width]).padding(0.1);
      const y = d3.scaleLinear().range([height, 0]);

      // Map the data to the x and y domains
      x.domain(data.map((d) => d.title));
      y.domain([0, d3.max(data, (d) => parseFloat(d.epss))]);

      // Create the bars
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.title))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(parseFloat(d.epss)))
        .attr("height", (d) => height - y(parseFloat(d.epss)));

      // Add the x-axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add the y-axis
      svg.append("g").call(d3.axisLeft(y));
    }
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
