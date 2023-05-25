import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Spheres = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const projection = d3
      .geoOrthographic()
      .fitSize([width, height], { type: "Sphere" });

    const path = d3.geoPath().projection(projection);

    svg
      .append("path")
      .attr("class", "sphere")
      .attr("d", path({ type: "Sphere" }))
      .style("fill", "black")
      .style("stroke", "white");

    // Add your custom globe visualization here

    // ...
  }, []);

  return <svg ref={svgRef} className="spheres"></svg>;
};

export default Spheres;
