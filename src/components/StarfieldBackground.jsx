import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function StarfieldBackground({ heartbeatActive }) {
  const containerRef = useRef();
  const starFieldRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const starCount = 4500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const roseColor = new THREE.Color('#FDA4AF');
    const purpleColor = new THREE.Color('#12072B');
    const whiteColor = new THREE.Color('#FFFFFF');

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = Math.random() * 150 + 10;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      let selectedColor = whiteColor;
      const rand = Math.random();
      if (rand > 0.75) selectedColor = roseColor;
      else if (rand > 0.5) selectedColor = purpleColor;

      colors[i] = selectedColor.r;
      colors[i + 1] = selectedColor.g;
      colors[i + 2] = selectedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.45,
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starParticles = new THREE.Points(geometry, material);
    scene.add(starParticles);
    starFieldRef.current = starParticles;

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.015;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.015;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let reqId;

    const tick = () => {
      const elapsed = clock.getElapsedTime();
      
      starParticles.rotation.y = elapsed * 0.012;
      starParticles.rotation.x = elapsed * 0.006;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      if (heartbeatActive) {
        const pulseFactor = 1.0 + Math.sin(elapsed * 8) * 0.08;
        starParticles.scale.set(pulseFactor, pulseFactor, pulseFactor);
      } else {
        starParticles.scale.set(1, 1, 1);
      }

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(tick);
    };
    
    tick();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [heartbeatActive]);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none bg-transparent" />;
}