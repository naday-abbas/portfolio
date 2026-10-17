import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import fontJson from "../assets/font.json";
import { isWebGLSupported, resetWebGLSupportCache } from "../utils/webgl";
import ThreeErrorBoundary from "./ThreeErrorBoundary";

/**
 * WordmarkSection
 * Brand Wordmark: "NADAY ABBAS."
 *
 * Core Features:
 * - Exact Three.js particle contour replication from Webflow.
 * - Portfolio Theme Colors: Electric Violet (#8B5CF6) to Neon Cyan (#22D3EE) gradient
 *   with bright luminous white glints and cyan focal dot (".").
 * - Tight, snug vertical sizing: Eliminated dead vertical space above and below while
 *   keeping the text massive, bold, and edge-to-edge.
 * - Dispersed / Hover particles flash in theme neon cyan (#38BDF8) & electric violet (#C084FC).
 * - Click & drag cyclone vortex smoothly shifts through the violet-cyan-magenta spectrum.
 * - Synchronous local font parsing (zero loading delay / guaranteed visibility).
 */

const VERTEX_SHADER = `
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;
  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * ( 300.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform vec3 color;
  uniform sampler2D pointTexture;
  varying vec3 vColor;
  void main() {
    vec4 texColor = texture2D( pointTexture, gl_PointCoord );
    gl_FragColor = vec4( color * vColor, 1.0 ) * texColor;
  }
`;

function createRadialTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.25, "rgba(240, 248, 255, 0.95)");
  gradient.addColorStop(0.5, "rgba(56, 189, 248, 0.5)");
  gradient.addColorStop(0.75, "rgba(139, 92, 246, 0.2)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.premultiplyAlpha = false;
  texture.needsUpdate = true;
  return texture;
}

export function WordmarkFallback({ onRetry }) {
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
    <section
      className="w-full relative overflow-hidden bg-[#060913] select-none flex flex-col items-center justify-center pt-4 sm:pt-6 pb-6 sm:pb-8 my-0"
      aria-label="Naday Abbas Wordmark"
    >
      {/* Visually hidden heading for screen readers & SEO */}
      <h2 className="sr-only">Naday Abbas.</h2>

      {/* Top divider gradient line matching site theme */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/35 via-cyan-400/35 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Ambient Neural Grid Texture */}
      <div
        className="absolute inset-0 bg-neural-pattern opacity-15 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Deep Theme Radial Glow behind the text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-[1000px] h-[220px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.22)_0%,rgba(34,211,238,0.14)_45%,transparent_70%)] blur-2xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Styled Gradient Wordmark */}
      <div className="relative w-full h-[190px] sm:h-[230px] md:h-[280px] lg:h-[340px] flex items-center justify-center px-4 overflow-hidden z-10">
        <span className="font-['Unbounded','Syne','Poppins',sans-serif] font-black tracking-tight text-center leading-none text-[clamp(2.4rem,10vw,8.5rem)] bg-gradient-to-r from-violet-400 via-indigo-300 via-sky-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.35)] select-none">
          NADAY ABBAS<span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">.</span>
        </span>
      </div>

      {/* Footer hint indicator with optional retry */}
      <div
        className="relative z-20 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-slate-400/70 pt-2 px-4 pointer-events-none"
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>Frontend &amp; Creative Developer</span>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="pointer-events-auto ml-2 normal-case tracking-normal px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/35 hover:bg-cyan-500/30 transition-all cursor-pointer text-[11px]"
            title="Restore 3D Particle Wordmark"
          >
            Restore 3D
          </button>
        )}
      </div>
    </section>
  );
}

function WordmarkSection3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [recoveryAttempt, setRecoveryAttempt] = useState(0);

  useEffect(() => {
    // 0. Pre-flight WebGL capability check
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

    let animationFrameId;
    let isDisposed = false;
    let isContextLost = false;
    let fallbackTimer = null;
    let isInView = true;

    // Attach WebGL context loss and restoration listeners
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn("WebGL context lost in WordmarkSection. Pausing render loop and awaiting restoration...");
      isContextLost = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      fallbackTimer = setTimeout(() => {
        if (isContextLost && !isDisposed) {
          setWebglFailed(true);
        }
      }, 3000);
    };

    const handleContextRestored = () => {
      console.info("WebGL context restored in WordmarkSection. Rebuilding 3D particle scene...");
      isContextLost = false;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      setWebglFailed(false);
      setRecoveryAttempt((prev) => prev + 1);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    let scene;
    let camera;
    let loadedFont;
    let particleTexture;

    try {
      // 1. Synchronous Font Parsing & Radial Texture
      const fontLoader = new FontLoader();
      loadedFont = fontLoader.parse(fontJson);
      particleTexture = createRadialTexture();

      // 2. Three.js Scene, Camera, Renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(65, 1, 1, 10000);
      camera.position.set(0, 0, 100);

      // Reset unpack parameters on existing context to prevent WebGL2 texImage3D FLIP_Y errors
      const existingGl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (existingGl && !existingGl.isContextLost()) {
        existingGl.pixelStorei(existingGl.UNPACK_FLIP_Y_WEBGL, false);
        existingGl.pixelStorei(existingGl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      }

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const gl = renderer.getContext();
      if (gl && !gl.isContextLost()) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      }
    } catch (err) {
      console.warn("Error creating Three.js WebGL context in WordmarkSection:", err);
      setWebglFailed(true);
      return;
    }

    // 3. Theme Color Definitions
    const colorViolet = new THREE.Color("#8B5CF6");
    const colorIndigo = new THREE.Color("#6366F1");
    const colorCyanBright = new THREE.Color("#38BDF8");
    const colorCyanPrimary = new THREE.Color("#22D3EE");
    const colorWhite = new THREE.Color("#FFFFFF");
    const colorDot = new THREE.Color("#A5F3FC");

    // Disturbed & Hover Neon Theme Colors
    const colorHoverCyan = new THREE.Color("#22D3EE");
    const colorHoverViolet = new THREE.Color("#C084FC");

    const data = {
      text: "NADAY ABBAS.",
      textColor: 0xffffff,
      amount: 950,
      particleSize: 1.7,
      textSize: 25,
      area: 230,
      ease: 0.055,
    };

    let particles = null;
    let geometryCopy = null;
    let planeArea = null;
    let originColorsArray = null;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-9999, 9999);
    let isMouseDown = false;

    function visibleHeightAtZDepth(depth, cam) {
      const cameraOffset = cam.position.z;
      let d = depth;
      if (d < cameraOffset) d -= cameraOffset;
      else d += cameraOffset;
      const vFOV = (cam.fov * Math.PI) / 180;
      return 2 * Math.tan(vFOV / 2) * Math.abs(d);
    }

    function visibleWidthAtZDepth(depth, cam) {
      const height = visibleHeightAtZDepth(depth, cam);
      return height * cam.aspect;
    }

    function distance(x1, y1, x2, y2) {
      return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    // 4. Setup Plane Area for Raycasting
    function setupPlaneArea() {
      if (planeArea) {
        scene.remove(planeArea);
        planeArea.geometry.dispose();
        planeArea.material.dispose();
      }
      const width = visibleWidthAtZDepth(0, camera) * 2;
      const height = visibleHeightAtZDepth(0, camera) * 2;
      const geometry = new THREE.PlaneGeometry(width, height);
      const material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      planeArea = new THREE.Mesh(geometry, material);
      scene.add(planeArea);
    }

    // 5. Build Text Particles with Theme Gradient
    function createText() {
      const rect = container.getBoundingClientRect();
      const containerW = rect.width > 0 ? rect.width : window.innerWidth;
      const isMobile = containerW < 768;

      // Single line "NADAY ABBAS." on desktop, stacked "NADAY\nABBAS." on mobile
      const textToRender = isMobile ? "NADAY\nABBAS." : "NADAY ABBAS.";

      const visibleW = visibleWidthAtZDepth(0, camera);
      const visibleH = visibleHeightAtZDepth(0, camera);

      // Measure at sample size 20
      const testShapes = loadedFont.generateShapes(textToRender, 20);
      const testGeom = new THREE.ShapeGeometry(testShapes);
      testGeom.computeBoundingBox();
      const rawW = Math.max(1, testGeom.boundingBox.max.x - testGeom.boundingBox.min.x);
      const rawH = Math.max(1, testGeom.boundingBox.max.y - testGeom.boundingBox.min.y);
      testGeom.dispose();

      // Fit snugly: 92% of width on desktop, 88% on mobile, while filling ~72% of height
      const targetW = visibleW * (isMobile ? 0.88 : 0.92);
      const targetH = visibleH * (isMobile ? 0.72 : 0.72);
      const scale = Math.min(targetW / rawW, targetH / rawH);
      const computedTextSize = 20 * scale;

      data.textSize = computedTextSize;
      data.particleSize = isMobile ? 1.8 : 1.6;
      data.area = isMobile ? 160 : 220;

      const shapes = loadedFont.generateShapes(textToRender, data.textSize);
      const geometry = new THREE.ShapeGeometry(shapes);
      geometry.computeBoundingBox();

      const minX = geometry.boundingBox.min.x;
      const maxX = geometry.boundingBox.max.x;
      const spanX = Math.max(1, maxX - minX);

      const center = new THREE.Vector3();
      geometry.boundingBox.getCenter(center);
      geometry.dispose();

      // Collect holes for complete letter contours ('A', 'B', 'D')
      const holeShapes = [];
      for (let q = 0; q < shapes.length; q++) {
        const shape = shapes[q];
        if (shape.holes && shape.holes.length > 0) {
          for (let j = 0; j < shape.holes.length; j++) {
            holeShapes.push(shape.holes[j]);
          }
        }
      }
      shapes.push.apply(shapes, holeShapes);

      const thePoints = [];
      const colors = [];
      const sizes = [];
      const originColors = [];

      for (let x = 0; x < shapes.length; x++) {
        const shape = shapes[x];
        const amountPoints = shape.type === "Path" ? Math.floor(data.amount / 2) : data.amount;
        const points = shape.getSpacedPoints(amountPoints);

        points.forEach((element) => {
          const px = element.x - center.x;
          const py = element.y - center.y;
          thePoints.push(new THREE.Vector3(px, py, 0));

          // Theme Gradient Calculation based on X position:
          // Left (Violet #8B5CF6) -> Mid (Indigo/Sky #38BDF8) -> Right (Cyan #22D3EE)
          const normX = Math.max(0, Math.min(1, (element.x - minX) / spanX));
          const isPeriodGlyph = normX > 0.94 && py < -data.textSize * 0.15;

          const pColor = new THREE.Color();
          if (isPeriodGlyph) {
            // Distinctive glowing Cyan/White for the final period '.'
            pColor.copy(colorDot).lerp(colorWhite, 0.4);
          } else if (normX < 0.45) {
            const t = normX / 0.45;
            pColor.lerpColors(colorViolet, colorIndigo, t);
          } else if (normX < 0.65) {
            const t = (normX - 0.45) / 0.2;
            pColor.lerpColors(colorIndigo, colorCyanBright, t);
          } else {
            const t = (normX - 0.65) / 0.35;
            pColor.lerpColors(colorCyanBright, colorCyanPrimary, t);
          }

          // Occasional luminous core sparkle (18% of particles)
          if (Math.random() < 0.18) {
            pColor.lerp(colorWhite, 0.35);
          }

          colors.push(pColor.r, pColor.g, pColor.b);
          originColors.push(pColor.r, pColor.g, pColor.b);
          sizes.push(data.particleSize);
        });
      }

      originColorsArray = new Float32Array(originColors);

      if (particles) {
        scene.remove(particles);
        particles.geometry.dispose();
        particles.material.dispose();
      }
      if (geometryCopy) {
        geometryCopy.dispose();
      }

      const geoParticles = new THREE.BufferGeometry().setFromPoints(thePoints);
      geoParticles.setAttribute("customColor", new THREE.Float32BufferAttribute(colors, 3));
      geoParticles.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(data.textColor) },
          pointTexture: { value: particleTexture },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      });

      particles = new THREE.Points(geoParticles, material);
      scene.add(particles);

      geometryCopy = new THREE.BufferGeometry();
      geometryCopy.copy(particles.geometry);
    }

    // 6. Resize Handler with Tight Framing
    function handleResize() {
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width) || window.innerWidth;
      const height = Math.floor(rect.height) || 280;
      if (width <= 0 || height <= 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, true);
      setupPlaneArea();
      createText();
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    requestAnimationFrame(handleResize);

    // 7. Mouse & Touch Events
    function updatePointer(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }

    function onPointerMove(e) {
      updatePointer(e.clientX, e.clientY);
    }

    function onPointerDown(e) {
      updatePointer(e.clientX, e.clientY);
      isMouseDown = true;
      data.ease = 0.012; // extended cyclone swirl
    }

    function onPointerUp() {
      isMouseDown = false;
      data.ease = 0.055; // smooth snap return
    }

    function onPointerLeave() {
      mouse.set(-9999, 9999);
      isMouseDown = false;
      data.ease = 0.055;
    }

    function onTouchStart(e) {
      if (e.touches && e.touches[0]) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
        isMouseDown = true;
        data.ease = 0.012;
      }
    }

    function onTouchMove(e) {
      if (e.touches && e.touches[0]) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    }

    function onTouchEnd() {
      isMouseDown = false;
      data.ease = 0.055;
      mouse.set(-9999, 9999);
    }

    canvas.addEventListener("mousemove", onPointerMove, { passive: true });
    canvas.addEventListener("mousedown", onPointerDown, { passive: true });
    window.addEventListener("mouseup", onPointerUp, { passive: true });
    canvas.addEventListener("mouseleave", onPointerLeave, { passive: true });

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });

    // 8. Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    // 9. Particle Simulation & Theme Render Loop
    function render() {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(render);

      if (!isInView || !particles || !geometryCopy || !planeArea || !originColorsArray) return;

      const time = ((0.001 * performance.now()) % 12) / 12;
      // Thematic cyclone phase cycling between cyan, azure, indigo, violet, magenta
      const themeHue = 0.52 + 0.28 * Math.sin(time * 2 * Math.PI);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(planeArea);
      const hasIntersects = intersects.length > 0;

      const mx = hasIntersects ? intersects[0].point.x : -9999;
      const my = hasIntersects ? intersects[0].point.y : -9999;

      const pos = particles.geometry.attributes.position;
      const copy = geometryCopy.attributes.position;
      const coulors = particles.geometry.attributes.customColor;
      const size = particles.geometry.attributes.size;

      const count = pos.count;
      let positionsChanged = false;
      let colorsChanged = false;
      let sizesChanged = false;

      const dynamicColor = new THREE.Color();

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const initX = copy.getX(i);
        const initY = copy.getY(i);
        const initZ = copy.getZ(i);

        const origR = originColorsArray[i3];
        const origG = originColorsArray[i3 + 1];
        const origB = originColorsArray[i3 + 2];

        let px = pos.getX(i);
        let py = pos.getY(i);
        let pz = pos.getZ(i);

        // Repulsion physics when cursor is nearby
        if (hasIntersects && !prefersReducedMotion) {
          const dx = mx - px;
          const dy = my - py;
          const mouseDistance = distance(mx, my, px, py);
          let d = dx * dx + dy * dy;
          if (d < 0.001) d = 0.001;
          const f = -data.area / d;

          if (isMouseDown) {
            // Click / drag cyclone vortex within portfolio theme gamut (cyan to violet)
            const t = Math.atan2(dy, dx);
            px -= f * Math.cos(t);
            py -= f * Math.sin(t);

            dynamicColor.setHSL(themeHue, 1.0, 0.6);
            coulors.setXYZ(i, dynamicColor.r, dynamicColor.g, dynamicColor.b);
            colorsChanged = true;

            if (
              px > initX + 50 ||
              px < initX - 50 ||
              py > initY + 50 ||
              py < initY - 50
            ) {
              // Outer cyclone edge glints
              coulors.setXYZ(i, colorHoverCyan.r, colorHoverCyan.g, colorHoverCyan.b);
              colorsChanged = true;
            }
          } else if (mouseDistance < data.area) {
            // Hover repulsion
            if (i % 5 === 0) {
              const t = Math.atan2(dy, dx);
              px -= 0.03 * Math.cos(t);
              py -= 0.03 * Math.sin(t);

              // Displaced particle flashes in electric violet (#C084FC)
              coulors.setXYZ(i, colorHoverViolet.r, colorHoverViolet.g, colorHoverViolet.b);
              colorsChanged = true;

              size.array[i] = data.particleSize / 1.2;
              sizesChanged = true;
            } else {
              const t = Math.atan2(dy, dx);
              px += f * Math.cos(t);
              py += f * Math.sin(t);

              size.array[i] = data.particleSize * 1.35;
              sizesChanged = true;
            }

            if (
              px > initX + 8 ||
              px < initX - 8 ||
              py > initY + 8 ||
              py < initY - 8
            ) {
              // Scatter glow in neon cyan (#22D3EE)
              coulors.setXYZ(i, colorHoverCyan.r, colorHoverCyan.g, colorHoverCyan.b);
              colorsChanged = true;

              size.array[i] = data.particleSize / 1.6;
              sizesChanged = true;
            }
          }
        }

        // Spring easing toward original coordinate
        const diffX = initX - px;
        const diffY = initY - py;
        const diffZ = initZ - pz;

        if (
          Math.abs(diffX) > 0.001 ||
          Math.abs(diffY) > 0.001 ||
          Math.abs(diffZ) > 0.001
        ) {
          px += diffX * data.ease;
          py += diffY * data.ease;
          pz += diffZ * data.ease;
          pos.setXYZ(i, px, py, pz);
          positionsChanged = true;
        } else {
          // Reset to original theme gradient color
          if (
            coulors.getX(i) !== origR ||
            coulors.getY(i) !== origG ||
            coulors.getZ(i) !== origB
          ) {
            coulors.setXYZ(i, origR, origG, origB);
            colorsChanged = true;
          }
          if (size.array[i] !== data.particleSize) {
            size.array[i] = data.particleSize;
            sizesChanged = true;
          }
        }
      }

      if (positionsChanged) pos.needsUpdate = true;
      if (colorsChanged) coulors.needsUpdate = true;
      if (sizesChanged) size.needsUpdate = true;

      if (isContextLost) return;
      if (!isInView) return;

      try {
        renderer.render(scene, camera);
      } catch (err) {
        if (!isContextLost) {
          console.warn("Render loop error in WordmarkSection:", err);
        }
      }
    }

    render();

    // 10. Cleanup
    return () => {
      isDisposed = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("mousedown", onPointerDown);
      canvas.removeEventListener("mouseleave", onPointerLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      if (observer) observer.disconnect();

      if (particles) {
        if (scene) scene.remove(particles);
        particles.geometry?.dispose();
        particles.material?.dispose();
      }
      if (planeArea) {
        if (scene) scene.remove(planeArea);
        planeArea.geometry?.dispose();
        planeArea.material?.dispose();
      }
      if (geometryCopy) {
        geometryCopy.dispose();
      }
      if (particleTexture) {
        particleTexture.dispose();
      }
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
      }
    };
  }, [recoveryAttempt]);

  if (webglFailed) {
    return <WordmarkFallback />;
  }

  return (
    <section
      className="w-full relative overflow-hidden bg-[#060913] select-none flex flex-col items-center justify-center pt-4 sm:pt-6 pb-6 sm:pb-8 my-0"
      aria-label="Naday Abbas Interactive 3D Particle Wordmark"
    >
      {/* Visually hidden heading for screen readers & SEO */}
      <h2 className="sr-only">Naday Abbas.</h2>

      {/* Top divider gradient line matching site theme */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/35 via-cyan-400/35 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Ambient Neural Grid Texture */}
      <div
        className="absolute inset-0 bg-neural-pattern opacity-15 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Deep Theme Radial Glow behind the particles */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-[1000px] h-[220px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.18)_0%,rgba(34,211,238,0.12)_45%,transparent_70%)] blur-2xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Interactive 3D Particle Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[190px] sm:h-[230px] md:h-[280px] lg:h-[340px] flex items-center justify-center overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block cursor-crosshair touch-none z-10"
          aria-hidden="true"
        />
      </div>

      {/* Subtle interaction hint indicator properly spaced below wordmark */}
      <div
        className="relative z-20 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-slate-400/70 pt-2 px-4 pointer-events-none"
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>Hover to repel, click and drag to explore</span>
      </div>
    </section>
  );
}

export default function WordmarkSection() {
  const [resetKey, setResetKey] = useState(0);

  const handleManualRetry = useCallback(() => {
    resetWebGLSupportCache();
    setResetKey((prev) => prev + 1);
  }, []);

  return (
    <ThreeErrorBoundary
      key={resetKey}
      resetKey={resetKey}
      fallback={<WordmarkFallback onRetry={handleManualRetry} />}
    >
      <WordmarkSection3D />
    </ThreeErrorBoundary>
  );
}
