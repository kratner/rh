import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<THREE.Mesh>();
  const lineRef = useRef<THREE.Line>();
  const bogeyRefs = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    let frameId: number;
    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;

    const scene = new THREE.Scene();

    const initRenderer = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current?.clientWidth || 0, containerRef.current?.clientHeight || 0);
      containerRef.current?.appendChild(renderer.domElement);
    };

    const initCamera = () => {
      const width = containerRef.current?.clientWidth || 0;
      const height = containerRef.current?.clientHeight || 0;

      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      window.addEventListener('resize', handleResize);
    };

    const initCircle = () => {
      const circleGeometry = new THREE.CircleGeometry(1, 64);
      const circleMaterial = new THREE.MeshBasicMaterial({ color: circleColor });
      const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
      scene.add(circleMesh);
      circleRef.current = circleMesh;
    };

    const initLine = () => {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 1, 0),
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor });
      const lineMesh = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(lineMesh);
      lineRef.current = lineMesh;
    };

    const initBogeys = () => {
      bogeyData.forEach((bogey) => {
        const bogeyGeometry = new THREE.CircleGeometry(0.1, 16);
        const bogeyMaterial = new THREE.MeshBasicMaterial({ color: bogey.color });
        const bogeyMesh = new THREE.Mesh(bogeyGeometry, bogeyMaterial);
        bogeyMesh.position.x = bogey.x;
        bogeyMesh.position.y = bogey.y;
        scene.add(bogeyMesh);
        bogeyRefs.current.push(bogeyMesh);
      });
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (lineRef.current) {
        lineRef.current.rotation.z += (Math.PI / 180) * rotationSpeed;
      }

      bogeyRefs.current.forEach((bogeyMesh) => {
        bogeyMesh.position.x += 0.01;
        if (bogeyMesh.position.x > 1) {
          bogeyMesh.position.x = -1;
        }
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = containerRef.current?.clientWidth || 0;
      const height = containerRef.current?.clientHeight || 0;

      renderer.setSize(width, height);

      if (camera) {
        camera.aspect = width / height || 1;
        camera.updateProjectionMatrix();
      }
    };

    initRenderer();
    initCamera();
    initCircle();
    initLine();
    initBogeys();
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [circleColor, lineColor, bogeyData, rotationSpeed]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default RadarScreen;
