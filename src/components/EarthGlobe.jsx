import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { FiRotateCcw, FiPlus, FiMinus, FiMapPin, FiGlobe } from "react-icons/fi";
import { isWebGLSupported, prefersReducedMotion, resetWebGLSupportCache } from "../utils/webgl";
import ThreeErrorBoundary from "./ThreeErrorBoundary";

// Lat/Long to 3D Cartesian coordinates on sphere
function latLongToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Global developer hubs to connect to Karachi, PK
const GLOBAL_HUBS = [
  { name: "Silicon Valley", country: "USA", lat: 37.7749, lon: -122.4194, dist: "~12,600 km", tz: "PST (UTC-8)" },
  { name: "London", country: "UK", lat: 51.5074, lon: -0.1278, dist: "~6,300 km", tz: "GMT (UTC+0)" },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, dist: "~6,700 km", tz: "JST (UTC+9)" },
  { name: "Singapore", country: "SG", lat: 1.3521, lon: 103.8198, dist: "~4,700 km", tz: "SGT (UTC+8)" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, dist: "~11,000 km", tz: "AEST (UTC+10)" },
];

const KARACHI = { lat: 24.8607, lon: 67.0011 };

// Custom atmospheric Rayleigh glow shader
const ATMOSPHERE_VERTEX = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMOSPHERE_FRAGMENT = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
    vec3 glowColor = mix(vec3(0.13, 0.83, 0.93), vec3(0.55, 0.36, 0.96), 0.35);
    gl_FragColor = vec4(glowColor, 1.0) * intensity;
  }
`;

/**
 * EarthGlobeFallback
 * Interactive SVG/CSS Vector Globe Fallback.
 * Renders instantly without WebGL, hardware acceleration, or GPU contexts.
 * Displays Karachi, PK location and interactive global remote connection nodes.
 */
export function EarthGlobeFallback({ onRetry }) {
  const [selectedHub, setSelectedHub] = useState(GLOBAL_HUBS[0]);

  // Auto-recovery polling: if WebGL recovers after a GPU crash/hang, automatically restore 3D
  useEffect(() => {
    if (!onRetry) return;
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && !document.hidden && isWebGLSupported(true)) {
        onRetry();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [onRetry]);

  return (
    <div className="w-full h-full min-h-[420px] sm:min-h-[460px] md:min-h-[500px] relative select-none overflow-hidden flex flex-col items-center justify-between p-6 bg-[#080d1e]/90">
      {/* Top HUD Header */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#060913]/90 border border-cyan-400/30 text-xs font-mono text-cyan-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold text-white">Karachi, PK</span>
          <span className="text-zinc-500">•</span>
          <span>24.86° N, 67.00° E</span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Remote Collaboration Ready</span>
        </div>
      </div>

      {/* Central Interactive Vector Globe Representation */}
      <div className="relative my-auto flex items-center justify-center">
        {/* Soft Ambient Radial Backing Glow */}
        <div className="absolute w-72 h-72 sm:w-84 sm:h-84 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18)_0%,rgba(139,92,246,0.12)_45%,transparent_70%)] blur-2xl pointer-events-none" />

        {/* Vector Planetary Illustration */}
        <svg
          viewBox="0 0 320 320"
          className="w-64 h-64 sm:w-76 sm:h-76 relative z-10 drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]"
          aria-label="Stylized Vector Globe Map"
        >
          {/* Outer Atmospheric Ring */}
          <circle cx="160" cy="160" r="140" fill="#060914" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="160" cy="160" r="142" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.5" />

          {/* Planetary Latitudes */}
          <ellipse cx="160" cy="160" rx="140" ry="40" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.25" />
          <ellipse cx="160" cy="160" rx="140" ry="90" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.2" />
          <ellipse cx="160" cy="160" rx="140" ry="135" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.15" />

          {/* Planetary Longitudes */}
          <ellipse cx="160" cy="160" rx="45" ry="140" fill="none" stroke="#8b5cf6" strokeWidth="0.8" strokeOpacity="0.25" />
          <ellipse cx="160" cy="160" rx="95" ry="140" fill="none" stroke="#8b5cf6" strokeWidth="0.8" strokeOpacity="0.2" />

          {/* Stylized Landmass Silhouette (World continents outline) */}
          <path
            d="M 90 120 Q 120 100 150 110 Q 170 95 200 105 Q 230 110 240 135 Q 220 150 200 145 Q 185 160 170 155 Q 150 175 140 160 Q 120 165 110 140 Z
               M 70 85 Q 90 70 120 75 Q 130 90 110 100 Q 80 100 70 85 Z
               M 190 170 Q 210 165 225 180 Q 220 205 195 210 Q 185 190 190 170 Z"
            fill="#1e293b"
            fillOpacity="0.5"
            stroke="#38bdf8"
            strokeWidth="0.7"
            strokeOpacity="0.4"
          />

          {/* Dynamic Connection Arc from Karachi to Selected Hub */}
          <path
            d="M 180 140 Q 160 70 100 110"
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
          />

          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Karachi, PK Beacon Marker (Lat 24.86, Lon 67.00) */}
          <g transform="translate(180, 140)">
            <circle r="14" fill="#22d3ee" fillOpacity="0.2" className="animate-ping" />
            <circle r="8" fill="#22d3ee" fillOpacity="0.35" />
            <circle r="4" fill="#ffffff" stroke="#22d3ee" strokeWidth="2" />
          </g>

          {/* Global Destination Hub Pin */}
          <g transform="translate(100, 110)">
            <circle r="5" fill="#a78bfa" fillOpacity="0.4" />
            <circle r="3" fill="#c084fc" />
          </g>
        </svg>

        {/* Floating Active Connection Info Card */}
        <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-xl bg-[#060913]/95 border border-cyan-400/40 text-xs font-mono text-zinc-200 shadow-2xl flex items-center gap-2 whitespace-nowrap">
          <FiGlobe className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-white font-medium">{selectedHub.name}, {selectedHub.country}</span>
          <span className="text-zinc-500">·</span>
          <span className="text-cyan-300">{selectedHub.tz}</span>
        </div>
      </div>

      {/* Bottom Global Remote Hub Selector Tabs */}
      <div className="w-full z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mr-1 hidden md:inline">
          Connections:
        </span>
        {GLOBAL_HUBS.map((hub) => {
          const isSelected = selectedHub.name === hub.name;
          return (
            <button
              key={hub.name}
              type="button"
              onClick={() => setSelectedHub(hub)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                isSelected
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.25)]"
                  : "bg-white/5 text-zinc-400 hover:text-white border border-transparent hover:border-white/10"
              }`}
            >
              {hub.name}
            </button>
          );
        })}

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/35 transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
            title="Restore 3D Interactive Earth"
          >
            <FiRotateCcw className="w-3 h-3 text-cyan-400" />
            <span>Restore 3D</span>
          </button>
        )}
      </div>
    </div>
  );
}

function EarthGlobe3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [recoveryAttempt, setRecoveryAttempt] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [cameraZoom, setCameraZoom] = useState(1);

  // State refs for animation loop
  const sceneState = useRef({
    scene: null,
    camera: null,
    renderer: null,
    earthGroup: null,
    cloudsMesh: null,
    earthMesh: null,
    nightMesh: null,
    pulseRings: [],
    arcPhotons: [],
    isDragging: false,
    prevPointer: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    baseCameraZ: 4.2,
    zoomFactor: 1.0,
    targetRotation: null,
    isInView: true,
  });

  const resetToKarachi = useCallback(() => {
    const s = sceneState.current;
    if (!s.earthGroup) return;
    const targetY = -((67.0 + 90) * Math.PI) / 180;
    const targetX = (24.86 * Math.PI) / 180;
    s.targetRotation = { x: targetX, y: targetY };
    s.velocity = { x: 0, y: 0 };
  }, []);

  const handleZoom = useCallback((direction) => {
    const s = sceneState.current;
    const nextZoom = Math.max(0.75, Math.min(1.4, s.zoomFactor + direction * 0.15));
    s.zoomFactor = nextZoom;
    setCameraZoom(nextZoom);
    if (s.camera) {
      s.camera.position.z = s.baseCameraZ / nextZoom;
    }
  }, []);

  useEffect(() => {
    // 0. Pre-flight capability check
    if (!isWebGLSupported()) {
      setWebglFailed(true);
      const timer = setTimeout(() => {
        if (isWebGLSupported(true)) {
          setWebglFailed(false);
          setRecoveryAttempt((prev) => prev + 1);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isDisposed = false;
    let isContextLost = false;
    let fallbackTimer = null;
    let animId = null;

    const s = sceneState.current;
    s.pulseRings = [];
    s.arcPhotons = [];
    s.targetRotation = null;
    s.isDragging = false;
    s.velocity = { x: 0, y: 0 };

    const textureLoader = new THREE.TextureLoader();

    // Attach WebGL context loss and restoration listeners
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn("WebGL context lost in EarthGlobe. Pausing render loop and awaiting restoration...");
      isContextLost = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      fallbackTimer = setTimeout(() => {
        if (isContextLost && !isDisposed) {
          setWebglFailed(true);
        }
      }, 3000);
    };

    const handleContextRestored = () => {
      console.info("WebGL context restored in EarthGlobe. Reinitializing 3D Earth scene...");
      isContextLost = false;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      setWebglFailed(false);
      setRecoveryAttempt((prev) => prev + 1);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    let renderer;
    let scene;
    let camera;

    try {
      // 1. Scene, Camera, Renderer
      scene = new THREE.Scene();
      s.scene = scene;

      const width = container.clientWidth || 400;
      const height = container.clientHeight || 450;
      const aspect = width / height;

      camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
      s.camera = camera;

      // Guaranteed "Not cut by sides" calculation
      const maxGlobeDiameter = 1.48 * 2;
      const vFOV = (camera.fov * Math.PI) / 180;
      const fitHeightDist = (maxGlobeDiameter * 1.08) / (2 * Math.tan(vFOV / 2));
      const fitWidthDist = fitHeightDist / Math.min(1.0, aspect);
      const baseZ = Math.max(3.8, fitWidthDist);
      s.baseCameraZ = baseZ;
      camera.position.set(0, 0, baseZ / s.zoomFactor);

      // Reset unpack parameters on existing context to prevent WebGL2 texImage3D FLIP_Y conflicts
      const existingGl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (existingGl && !existingGl.isContextLost()) {
        existingGl.pixelStorei(existingGl.UNPACK_FLIP_Y_WEBGL, false);
        existingGl.pixelStorei(existingGl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      }

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      s.renderer = renderer;

      const gl = renderer.getContext();
      if (gl && !gl.isContextLost()) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      }

      // 2. Lighting Rig
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
      scene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
      sunLight.position.set(5, 3, 4);
      scene.add(sunLight);

      const backRimLight = new THREE.DirectionalLight(0x22d3ee, 1.4);
      backRimLight.position.set(-5, -2, -3);
      scene.add(backRimLight);

      const violetFill = new THREE.DirectionalLight(0x8b5cf6, 0.9);
      violetFill.position.set(0, -4, 2);
      scene.add(violetFill);

      // 3. Earth Group
      const earthGroup = new THREE.Group();
      earthGroup.rotation.x = 0.22;
      scene.add(earthGroup);
      s.earthGroup = earthGroup;

      const globeRadius = 1.32;

      // Textures
      const dayMap = textureLoader.load("/textures/earth/earth_atmos.jpg");
      const normalMap = textureLoader.load("/textures/earth/earth_normal.jpg");
      const specMap = textureLoader.load("/textures/earth/earth_specular.jpg");
      const cloudsMap = textureLoader.load("/textures/earth/earth_clouds.png");
      const nightMap = textureLoader.load("/textures/earth/earth_lights.png");

      // Earth Sphere Material
      const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
      const earthMat = new THREE.MeshStandardMaterial({
        map: dayMap,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(0.85, 0.85),
        roughnessMap: specMap,
        roughness: 0.65,
        metalness: 0.15,
      });
      const earthMesh = new THREE.Mesh(earthGeo, earthMat);
      earthGroup.add(earthMesh);
      s.earthMesh = earthMesh;

      // Night Lights Shell
      const nightGeo = new THREE.SphereGeometry(globeRadius * 1.002, 64, 64);
      const nightMat = new THREE.MeshBasicMaterial({
        map: nightMap,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });
      const nightMesh = new THREE.Mesh(nightGeo, nightMat);
      earthGroup.add(nightMesh);
      s.nightMesh = nightMesh;

      // Atmospheric Cloud Layer
      const cloudsGeo = new THREE.SphereGeometry(globeRadius * 1.018, 64, 64);
      const cloudsMat = new THREE.MeshStandardMaterial({
        map: cloudsMap,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
      earthGroup.add(cloudsMesh);
      s.cloudsMesh = cloudsMesh;

      // Outer Rayleigh Atmospheric Glow Corona
      const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.15, 48, 48);
      const atmosMat = new THREE.ShaderMaterial({
        vertexShader: ATMOSPHERE_VERTEX,
        fragmentShader: ATMOSPHERE_FRAGMENT,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      });
      const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
      scene.add(atmosMesh);

      // 4. Karachi Location Beacon & Pulse Rings
      const karachiPos = latLongToVector3(KARACHI.lat, KARACHI.lon, globeRadius);
      const beaconGroup = new THREE.Group();
      beaconGroup.position.copy(karachiPos);
      beaconGroup.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        karachiPos.clone().normalize()
      );

      const pinGeo = new THREE.SphereGeometry(0.026, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      beaconGroup.add(pinMesh);

      const ringGeo = new THREE.RingGeometry(0.028, 0.046, 32);
      const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ring1 = new THREE.Mesh(ringGeo, ringMat1);
      ring1.rotation.x = Math.PI / 2;
      beaconGroup.add(ring1);

      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ring2 = new THREE.Mesh(ringGeo, ringMat2);
      ring2.rotation.x = Math.PI / 2;
      beaconGroup.add(ring2);

      s.pulseRings = [
        { mesh: ring1, offset: 0 },
        { mesh: ring2, offset: 0.75 },
      ];

      const beamGeo = new THREE.CylinderGeometry(0.005, 0.012, 0.22, 16);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.position.y = 0.11;
      beaconGroup.add(beamMesh);

      earthGroup.add(beaconGroup);

      // 5. Global Tech Hub Flight / Remote Connection Arcs
      const arcPhotons = [];
      GLOBAL_HUBS.forEach((hub, idx) => {
        const hubPos = latLongToVector3(hub.lat, hub.lon, globeRadius);

        const hubPin = new THREE.Mesh(
          new THREE.SphereGeometry(0.016, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xa78bfa })
        );
        hubPin.position.copy(hubPos);
        earthGroup.add(hubPin);

        const midPoint = karachiPos.clone().lerp(hubPos, 0.5);
        const dist = karachiPos.distanceTo(hubPos);
        const arcHeight = globeRadius + Math.min(0.65, dist * 0.32);
        midPoint.normalize().multiplyScalar(arcHeight);

        const curve = new THREE.QuadraticBezierCurve3(karachiPos, midPoint, hubPos);
        const points = curve.getPoints(50);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

        const arcMat = new THREE.LineBasicMaterial({
          color: idx % 2 === 0 ? 0x22d3ee : 0x8b5cf6,
          transparent: true,
          opacity: 0.42,
          blending: THREE.AdditiveBlending,
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        earthGroup.add(arcLine);

        const photon = new THREE.Mesh(
          new THREE.SphereGeometry(0.02, 12, 12),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            blending: THREE.AdditiveBlending,
          })
        );
        earthGroup.add(photon);
        arcPhotons.push({ curve, mesh: photon, progress: idx * 0.2 });
      });
      s.arcPhotons = arcPhotons;

      // 6. Smooth Resize Observer
      const handleResize = () => {
        if (!container || !camera || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;

        const newAspect = w / h;
        camera.aspect = newAspect;

        const newVFOV = (camera.fov * Math.PI) / 180;
        const newFitHeightDist = (maxGlobeDiameter * 1.08) / (2 * Math.tan(newVFOV / 2));
        const newFitWidthDist = newFitHeightDist / Math.min(1.0, newAspect);
        s.baseCameraZ = Math.max(3.8, newFitWidthDist);
        camera.position.z = s.baseCameraZ / s.zoomFactor;

        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // 7. Intersection Observer for battery & GPU savings
      const intObserver = new IntersectionObserver(
        ([entry]) => {
          s.isInView = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      intObserver.observe(container);

      earthGroup.rotation.y = -((KARACHI.lon + 45) * Math.PI) / 180;
      earthGroup.rotation.x = 0.28;

      // 8. Animation Render Loop
      let animId;
      let clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);

        if (!s.isInView) return;

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        if (cloudsMesh) {
          cloudsMesh.rotation.y += delta * 0.025;
        }

        s.pulseRings.forEach(({ mesh, offset }) => {
          const t = (elapsedTime + offset) % 1.5;
          const scale = 1 + t * 2.2;
          const opacity = Math.max(0, 1 - t / 1.5);
          mesh.scale.set(scale, scale, scale);
          mesh.material.opacity = opacity * 0.85;
        });

        s.arcPhotons.forEach((item) => {
          item.progress = (item.progress + delta * 0.35) % 1.0;
          const point = item.curve.getPointAt(item.progress);
          item.mesh.position.copy(point);
        });

        if (s.targetRotation && earthGroup) {
          earthGroup.rotation.x = THREE.MathUtils.lerp(
            earthGroup.rotation.x,
            s.targetRotation.x,
            0.08
          );
          earthGroup.rotation.y = THREE.MathUtils.lerp(
            earthGroup.rotation.y,
            s.targetRotation.y,
            0.08
          );
          if (
            Math.abs(earthGroup.rotation.x - s.targetRotation.x) < 0.005 &&
            Math.abs(earthGroup.rotation.y - s.targetRotation.y) < 0.005
          ) {
            s.targetRotation = null;
          }
        } else if (earthGroup) {
          if (!s.isDragging) {
            earthGroup.rotation.y += s.velocity.x;
            earthGroup.rotation.x = THREE.MathUtils.clamp(
              earthGroup.rotation.x + s.velocity.y,
              -1.1,
              1.1
            );

            s.velocity.x *= 0.94;
            s.velocity.y *= 0.94;

            if (Math.abs(s.velocity.x) < 0.0005 && !prefersReducedMotion()) {
              earthGroup.rotation.y += delta * 0.06;
            }
          }
        }

        if (isContextLost) return;
        if (!s.isInView) return;

        try {
          renderer.render(scene, camera);
        } catch (err) {
          if (!isContextLost) {
            console.warn("Render error in EarthGlobe:", err);
          }
        }
      };

      animate();

      return () => {
        isDisposed = true;
        if (fallbackTimer) clearTimeout(fallbackTimer);
        cancelAnimationFrame(animId);
        resizeObserver.disconnect();
        intObserver.disconnect();
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener("webglcontextrestored", handleContextRestored);
        if (renderer) {
          const gl = renderer.getContext();
          if (gl && typeof gl.pixelStorei === "function") {
            try {
              if (!gl.isContextLost()) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
              }
            } catch {}
          }
          renderer.dispose();
          s.renderer = null;
        }
        earthGeo.dispose();
        earthMat.dispose();
        cloudsGeo.dispose();
        cloudsMat.dispose();
        atmosGeo.dispose();
        atmosMat.dispose();
        dayMap.dispose();
        normalMap.dispose();
        specMap.dispose();
        cloudsMap.dispose();
        nightMap.dispose();
        s.pulseRings = [];
        s.arcPhotons = [];
        s.earthGroup = null;
        s.scene = null;
        s.camera = null;
      };
    } catch (err) {
      console.warn("Error creating Three.js WebGL context in EarthGlobe:", err);
      setWebglFailed(true);
      return;
    }
  }, [recoveryAttempt]);

  const handlePointerDown = (e) => {
    const s = sceneState.current;
    s.isDragging = true;
    s.targetRotation = null;
    s.prevPointer = { x: e.clientX, y: e.clientY };
    s.velocity = { x: 0, y: 0 };
    setIsInteracting(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
  };

  const handlePointerMove = (e) => {
    const s = sceneState.current;
    if (!s.isDragging || !s.earthGroup) return;

    const dx = e.clientX - s.prevPointer.x;
    const dy = e.clientY - s.prevPointer.y;

    const rotSpeed = 0.0055;
    s.earthGroup.rotation.y += dx * rotSpeed;
    s.earthGroup.rotation.x = THREE.MathUtils.clamp(
      s.earthGroup.rotation.x + dy * rotSpeed,
      -1.1,
      1.1
    );

    s.velocity = {
      x: dx * rotSpeed * 0.8,
      y: dy * rotSpeed * 0.8,
    };

    s.prevPointer = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    const s = sceneState.current;
    s.isDragging = false;
    setIsInteracting(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Fallback
    }
  };

  if (webglFailed) {
    return <EarthGlobeFallback />;
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={resetToKarachi}
      className={`w-full h-full min-h-[420px] sm:min-h-[460px] md:min-h-[500px] relative select-none touch-none overflow-hidden flex items-center justify-center ${
        isInteracting ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Holographic Coordinates Badge */}
      <div className="absolute top-4 left-4 z-20 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#070b18]/90 border border-cyan-400/35 backdrop-blur-md text-[11px] sm:text-xs font-mono text-cyan-300 flex items-center gap-1.5 sm:gap-2 shadow-2xl pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-semibold text-white">Karachi, PK</span>
        <span className="text-zinc-500">•</span>
        <span className="text-cyan-300/90">24.86° N, 67.00° E</span>
      </div>

      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#070b18]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-300 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Global Remote Ready</span>
      </div>

      {/* Interactive Controls Overlay Toolbar */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            resetToKarachi();
          }}
          className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#090f22]/90 hover:bg-cyan-500/20 text-zinc-200 hover:text-cyan-300 border border-white/15 hover:border-cyan-400/40 text-xs font-mono flex items-center gap-1.5 backdrop-blur-md shadow-xl transition-all cursor-pointer"
          title="Reset focus to Karachi (or double-click)"
        >
          <FiRotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Focus Karachi</span>
        </button>

        <div className="flex items-center bg-[#090f22]/90 border border-white/15 rounded-xl overflow-hidden backdrop-blur-md shadow-xl">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleZoom(1);
            }}
            className="p-1.5 hover:bg-cyan-500/20 text-zinc-300 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <FiPlus className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-zinc-500 px-1 select-none">
            {Math.round(cameraZoom * 100)}%
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleZoom(-1);
            }}
            className="p-1.5 hover:bg-cyan-500/20 text-zinc-300 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <FiMinus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20 hidden md:flex px-3.5 py-1.5 rounded-full bg-[#070b18]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-zinc-400 pointer-events-none items-center gap-2 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse" />
        <span>{isInteracting ? "Rotating 3D Earth..." : "Drag to rotate · Double-click to focus"}</span>
      </div>
    </div>
  );
}

export default function EarthGlobe() {
  const [resetKey, setResetKey] = useState(0);

  const handleManualRetry = useCallback(() => {
    resetWebGLSupportCache();
    setResetKey((prev) => prev + 1);
  }, []);

  return (
    <ThreeErrorBoundary
      key={resetKey}
      resetKey={resetKey}
      fallback={<EarthGlobeFallback onRetry={handleManualRetry} />}
    >
      <EarthGlobe3D />
    </ThreeErrorBoundary>
  );
}
