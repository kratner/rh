import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { scaleLinear } from "d3-scale";

/*
   "cve": "CVE-2023-32784",
      "epss": "0.000430000",
      "percentile": "0.070580000",
      "date": "2023-05-15"

*/

const SpherePointRenderer = ({ lat, lng, color, radius }) => {
  const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
  const sphereMaterial = new THREE.MeshLambertMaterial({ color });
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.set(lat, lng, radius); // Adjust the Z coordinate to lift the sphere above the globe

  return <primitive object={sphereMesh} />;
};

const GlobeComponent = ({ data, globeImageUrl }) => {
  const calculateSphereRadius = (percentile) => {
    // Define the scaling factor for sphere radius based on percentile
    const scaleFactor = 10;
    // Calculate the radius based on the percentile value
    return Math.sqrt(percentile) * scaleFactor;
  };
  // Define the color scale for mapping percentile to color
  const colorScale = scaleLinear()
    .domain([0, 1]) // Assuming percentile ranges from 0 to 1
    .range(["orange", "red"]);
  const canvasRef = useRef(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     canvas.style.width = "100%";
  //     canvas.style.height = "100%";
  //   }
  // }, []);

  const handleGlobeReady = () => {
    document
      .querySelectorAll(".scene-container")
      .forEach((el) => (el.style.width = "100%"));
    document
      .querySelectorAll(".scene-container")
      .forEach((el) => (el.style.height = "100%"));
    document
      .querySelectorAll(".scene-container canvas")
      .forEach((el) => (el.style.width = "100%"));
    document
      .querySelectorAll(".scene-container canvas")
      .forEach((el) => (el.style.height = "100%"));
  };

  return (
    <div className="globe-container">
      <Globe
        globeImageUrl={globeImageUrl}
        pointsData={data}
        pointAltitude={0.1} // Adjust the pointAltitude value to lift the spheres above the globe
        pointColor={(d) => colorScale(d.percentile)} // Use the color scale to set the point color
        pointRadius={(point) => calculateSphereRadius(point.percentile)}
        // PointLabelRenderer={({ point }) => <PointLabelRenderer point={point} />} // Pass the point object as a prop
        //   <PointLabelRenderer point={point} index={index} />
        // )}
        pointLabel={(d) =>
          "<div style='border:" +
          colorScale(d.percentile) +
          " .1em solid;' class='data_points'><strong>CVE:</strong> " +
          d.cve +
          "<br /><strong>EPSS:</strong> " +
          d.epss +
          "<br /><strong>%:</strong> " +
          d.percentile +
          "</div>"
        }
        // pointLat="lat"
        // pointLng="lng"
        // pointResolution={24} // Increase the point resolution for smoother spheres
        pointMaterial={({ percentile }) => {
          const color = new THREE.Color().setHSL(percentile, 1, 0.5);
          return new THREE.MeshLambertMaterial({ color });
        }}
        pointRenderer={(props) => (
          <SpherePointRenderer
            lat={props.lat}
            lng={props.lng}
            color={props.color}
            radius={props.radius}
          />
        )}
        onGlobeReady={handleGlobeReady}
        ref={canvasRef}
      />
    </div>
  );
};

export default GlobeComponent;
