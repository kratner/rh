import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { scaleLinear } from "d3-scale";

const EARTH_RADIUS_KM = 6371;

const SpherePointRenderer = ({ lat, lng, color, radius }) => {
  const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
  const sphereMaterial = new THREE.MeshLambertMaterial({ color });
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

  const orbitRadius = EARTH_RADIUS_KM + radius / 1000; // Scale radius to fit orbit

  // Convert latitude and longitude to radians
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  // Calculate the Cartesian coordinates
  const x = Math.cos(latRad) * Math.cos(lngRad) * orbitRadius;
  const y = Math.sin(latRad) * orbitRadius;
  const z = Math.sin(latRad) * Math.cos(lngRad) * orbitRadius;

  // Set the position of the sphere
  sphereMesh.position.set(x, y, z);

  return <primitive object={sphereMesh} />;
};

const GlobeComponent = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const colorScale = scaleLinear().domain([0, 1]).range(["orange", "red"]);

    data.forEach((point) => {
      const { lat, lng, percentile } = point;
      const radius = Math.sqrt(percentile) * 0.1;
      const color = colorScale(percentile);

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 32, 32),
        new THREE.MeshLambertMaterial({ color })
      );

      const orbitRadius = EARTH_RADIUS_KM + radius / 1000;

      const latRad = (lat * Math.PI) / 180;
      const lngRad = (lng * Math.PI) / 180;

      const x = Math.cos(latRad) * Math.cos(lngRad) * orbitRadius;
      const y = Math.sin(latRad) * orbitRadius;
      const z = Math.sin(latRad) * Math.cos(lngRad) * orbitRadius;

      sphere.position.set(x, y, z);
      scene.add(sphere);
    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [data]);

  return <div ref={canvasRef} />;
};

export default GlobeComponent;
