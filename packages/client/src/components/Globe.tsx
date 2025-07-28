import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AttackEvent, AttackTypeConfig } from '../types/attack.js';

interface GlobeProps {
  attacks: AttackEvent[];
}

const GlobeComponent: React.FC<GlobeProps> = ({ attacks }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const arcsRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    cameraRef.current = camera;
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000011, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera as any, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.minDistance = 150;
    controls.maxDistance = 800;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Create Earth sphere with realistic textures
    const earthGeometry = new THREE.SphereGeometry(100, 128, 128);
    
    // Earth texture
    const earthTexture = new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
    );
    
    // Bump map for terrain
    const bumpTexture = new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg'
    );
    
    // Specular map for water
    const specularTexture = new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg'
    );

    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.5,
      specularMap: specularTexture,
      specular: new THREE.Color(0x333333),
      shininess: 25,
    });

    const globe = new THREE.Mesh(earthGeometry, earthMaterial);
    globeRef.current = globe;
    globe.castShadow = true;
    globe.receiveShadow = true;
    scene.add(globe);

    // Create atmospheric glow
    const atmosphereGeometry = new THREE.SphereGeometry(102, 128, 128);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphereRef.current = atmosphere;
    scene.add(atmosphere);

    // Create starfield background
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 2000;
      starPositions[i + 1] = (Math.random() - 0.5) * 2000;
      starPositions[i + 2] = (Math.random() - 0.5) * 2000;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      transparent: true,
      opacity: 0.8,
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create arcs container
    const arcsGroup = new THREE.Group();
    arcsRef.current = arcsGroup;
    scene.add(arcsGroup);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(200, 200, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Add subtle point light for glow effect
    const pointLight = new THREE.PointLight(0x0077ff, 0.5, 500);
    pointLight.position.set(0, 0, 200);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Rotate stars slowly
      stars.rotation.y += 0.0002;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update arcs when attacks change
  useEffect(() => {
    if (!arcsRef.current) return;

    // Clear existing arcs
    arcsRef.current.clear();

    attacks.slice(-12).forEach((attack, index) => { // Show last 12 attacks
      const startPoint = latLngToVector3(attack.source.lat, attack.source.lng, 100);
      const endPoint = latLngToVector3(attack.target.lat, attack.target.lng, 100);
      
      // Create smooth cubic bezier curve for more realistic arcs
      const distance = startPoint.distanceTo(endPoint);
      const height = Math.min(distance * 0.3, 80); // Dynamic height based on distance
      
      // Calculate control points for smooth curve
      const midPoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
      const direction = new THREE.Vector3().subVectors(endPoint, startPoint).normalize();
      const perpendicular = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize();
      
      // Create control points for cubic bezier
      const control1 = new THREE.Vector3().copy(startPoint).add(
        direction.clone().multiplyScalar(distance * 0.25)
      ).add(perpendicular.clone().multiplyScalar(height * 0.5));
      
      const control2 = new THREE.Vector3().copy(endPoint).sub(
        direction.clone().multiplyScalar(distance * 0.25)
      ).add(perpendicular.clone().multiplyScalar(height * 0.5));
      
      const curve = new THREE.CubicBezierCurve3(startPoint, control1, control2, endPoint);
      const points = curve.getPoints(100); // More points for smoother curve
      
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(points);
      
      // Create main arc with glow effect
      const arcMaterial = new THREE.LineBasicMaterial({
        color: AttackTypeConfig[attack.type].color,
        transparent: true,
        opacity: 0.9,
        linewidth: attack.severity === 'critical' ? 3 : attack.severity === 'high' ? 2.5 : 2,
      });
      
      const arc = new THREE.Line(arcGeometry, arcMaterial);
      
      // Create glow effect with wider, more transparent line
      const glowGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const glowMaterial = new THREE.LineBasicMaterial({
        color: AttackTypeConfig[attack.type].color,
        transparent: true,
        opacity: 0.3,
        linewidth: (attack.severity === 'critical' ? 6 : attack.severity === 'high' ? 5 : 4),
      });
      
      const glow = new THREE.Line(glowGeometry, glowMaterial);
      
      // Create particle effect at start and end points
      const particleCount = 20;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const point = curve.getPoint(t);
        particlePositions[i * 3] = point.x;
        particlePositions[i * 3 + 1] = point.y;
        particlePositions[i * 3 + 2] = point.z;
        
        const color = new THREE.Color(AttackTypeConfig[attack.type].color);
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 2,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      
      // Add pulsing effect with different speeds for each arc
      const pulseSpeed = 0.015 + (index * 0.002);
      const originalOpacity = 0.9;
      arc.userData = { pulseSpeed, originalOpacity, glow, particles };
      
      if (arcsRef.current) {
        arcsRef.current.add(glow);
        arcsRef.current.add(arc);
        arcsRef.current.add(particles);
      }
    });
  }, [attacks]);

  // Animate arc effects
  useEffect(() => {
    if (!arcsRef.current) return;

    const animateArcs = () => {
      arcsRef.current?.children.forEach((child) => {
        if (child instanceof THREE.Line && child.userData.pulseSpeed) {
          const time = Date.now() * child.userData.pulseSpeed;
          const opacity = child.userData.originalOpacity * (0.6 + 0.4 * Math.sin(time));
          (child.material as THREE.LineBasicMaterial).opacity = opacity;
          
          // Animate glow
          if (child.userData.glow) {
            (child.userData.glow.material as THREE.LineBasicMaterial).opacity = opacity * 0.4;
          }
          
          // Animate particles
          if (child.userData.particles) {
            const particleOpacity = opacity * 0.8;
            (child.userData.particles.material as THREE.PointsMaterial).opacity = particleOpacity;
          }
        }
      });
    };

    const interval = setInterval(animateArcs, 16); // 60fps
    return () => clearInterval(interval);
  }, [attacks]);

  // Convert lat/lng to 3D coordinates
  const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    
    return new THREE.Vector3(x, y, z);
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
      }} 
    />
  );
};

export default GlobeComponent; 