import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const SECTION_IDS = ["top", "projects", "about", "experience", "skills", "ai", "contact"];

const PLACEMENT_HINTS = {
  top: [
    { name: "right-center", x: 0.8, y: 0.48 },
    { name: "right-lower", x: 0.82, y: 0.73 },
    { name: "right-upper", x: 0.82, y: 0.3 },
    { name: "left-lower", x: 0.19, y: 0.73 }
  ],
  projects: [
    { name: "right-upper", x: 0.83, y: 0.31 },
    { name: "left-lower", x: 0.18, y: 0.73 },
    { name: "right-lower", x: 0.83, y: 0.73 },
    { name: "left-upper", x: 0.18, y: 0.31 },
    { name: "right-center", x: 0.83, y: 0.52 }
  ],
  about: [
    { name: "left-lower", x: 0.18, y: 0.73 },
    { name: "right-upper", x: 0.82, y: 0.31 },
    { name: "right-lower", x: 0.82, y: 0.73 },
    { name: "left-upper", x: 0.18, y: 0.31 }
  ],
  experience: [
    { name: "right-upper", x: 0.83, y: 0.31 },
    { name: "left-lower", x: 0.18, y: 0.73 },
    { name: "right-lower", x: 0.83, y: 0.73 },
    { name: "left-upper", x: 0.18, y: 0.31 }
  ],
  skills: [
    { name: "left-lower", x: 0.18, y: 0.73 },
    { name: "right-upper", x: 0.82, y: 0.31 },
    { name: "right-lower", x: 0.82, y: 0.73 },
    { name: "left-upper", x: 0.18, y: 0.31 }
  ],
  ai: [
    { name: "right-lower", x: 0.82, y: 0.73 },
    { name: "left-upper", x: 0.18, y: 0.31 },
    { name: "right-upper", x: 0.82, y: 0.31 },
    { name: "left-lower", x: 0.18, y: 0.73 }
  ],
  contact: [
    { name: "right-center", x: 0.82, y: 0.5 },
    { name: "left-upper", x: 0.18, y: 0.31 },
    { name: "left-lower", x: 0.18, y: 0.73 },
    { name: "right-lower", x: 0.82, y: 0.73 }
  ]
};

const MODULES = [
  { id: "backbone", target: [0, 0, 0], source: [1.92, 0.82, 0.45], size: [0.56, 2.42, 0.42], startRotation: [0.18, 0.32, 1.18], rotation: [0, 0, 0], color: "#303b40", kind: "spine" },
  { id: "upper-left", target: [-0.5, 0.73, 0.19], source: [-1.92, 1.12, 0.52], size: [0.94, 0.69, 0.34], startRotation: [0.28, -0.18, 0.88], rotation: [0.05, 0.1, -0.22], color: "#f4b942", kind: "plate" },
  { id: "upper-right", target: [0.5, 0.73, -0.05], source: [1.94, 1.04, 0.58], size: [0.94, 0.69, 0.34], startRotation: [-0.22, 0.28, -0.8], rotation: [-0.05, -0.1, 0.22], color: "#b8c0c5", kind: "plate" },
  { id: "middle-left", target: [-0.58, 0, 0.22], source: [-1.96, 0.02, 0.58], size: [0.88, 0.67, 0.34], startRotation: [0.22, -0.2, -0.76], rotation: [0.04, 0.1, 0.18], color: "#4fa7a3", kind: "plate" },
  { id: "middle-right", target: [0.58, 0, -0.06], source: [1.96, -0.12, 0.58], size: [0.88, 0.67, 0.34], startRotation: [-0.2, 0.2, 0.84], rotation: [-0.04, -0.1, -0.18], color: "#f4b942", kind: "plate" },
  { id: "lower-left", target: [-0.5, -0.73, 0.18], source: [-1.92, -1.08, 0.52], size: [0.94, 0.69, 0.34], startRotation: [0.2, -0.25, 0.82], rotation: [0.05, 0.1, -0.22], color: "#b8c0c5", kind: "plate" },
  { id: "lower-right", target: [0.5, -0.73, -0.04], source: [1.9, -1.05, 0.52], size: [0.94, 0.69, 0.34], startRotation: [-0.2, 0.24, -0.82], rotation: [-0.05, -0.1, 0.22], color: "#4fa7a3", kind: "plate" }
];

const CONTENT_SELECTORS = "h1, h2, h3, p, a, button, li, img, figure, .project-visual, .pitch-visual";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function smoothStep(value) {
  const amount = clamp(value, 0, 1);
  return amount * amount * (3 - 2 * amount);
}

function measureContentRects(section) {
  return Array.from(section.querySelectorAll(CONTENT_SELECTORS))
    .filter(element => {
      const style = window.getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0;
    })
    .map(element => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left - 7, right: rect.right + 7, top: rect.top - 7, bottom: rect.bottom + 7 };
    })
    .filter(rect => rect.right > 0 && rect.left < window.innerWidth && rect.bottom > 80 && rect.top < window.innerHeight);
}

function overlapScore(rect, obstacles) {
  const columns = 9;
  const rows = 9;
  let covered = 0;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = rect.left + ((column + 0.5) / columns) * rect.width;
      const y = rect.top + ((row + 0.5) / rows) * rect.height;
      if (obstacles.some(obstacle => x >= obstacle.left && x <= obstacle.right && y >= obstacle.top && y <= obstacle.bottom)) {
        covered += 1;
      }
    }
  }

  return covered / (columns * rows);
}

function choosePlacement(section, previousPlacement) {
  const mobile = window.innerWidth <= 600;
  const size = mobile ? clamp(window.innerWidth * 0.36, 116, 150) : clamp(window.innerWidth * 0.22, 190, 280);
  const obstacles = measureContentRects(section);
  const hints = PLACEMENT_HINTS[section.id] || PLACEMENT_HINTS.top;

  const candidates = hints.map(hint => {
    const centerX = clamp(window.innerWidth * hint.x, size / 2 + 12, window.innerWidth - size / 2 - 12);
    const centerY = clamp(window.innerHeight * hint.y, size / 2 + 106, window.innerHeight - size / 2 - 18);
    const rect = {
      left: centerX - size / 2,
      right: centerX + size / 2,
      top: centerY - size / 2,
      bottom: centerY + size / 2,
      width: size,
      height: size
    };

    return { name: hint.name, x: centerX, y: centerY, size, score: overlapScore(rect, obstacles) };
  });

  const best = candidates.reduce((current, candidate) => candidate.score < current.score ? candidate : current);
  const previous = previousPlacement && previousPlacement.sectionId === section.id
    ? candidates.find(candidate => candidate.name === previousPlacement.name)
    : null;

  if (previous && previous.score <= best.score + 0.12) {
    return { ...previous, sectionId: section.id };
  }

  return { ...best, sectionId: section.id };
}

function createPullCurves() {
  return MODULES.map(part => {
    const start = new THREE.Vector3(...part.source);
    const end = new THREE.Vector3(...part.target);
    const direction = part.source[0] >= 0 ? -1 : 1;
    const lift = part.source[1] >= 0 ? 0.42 : -0.32;
    const firstControl = start.clone().lerp(end, 0.28).add(new THREE.Vector3(direction * 0.18, lift, 0.48));
    const secondControl = start.clone().lerp(end, 0.72).add(new THREE.Vector3(direction * -0.24, 0.24, 0.34));
    return new THREE.CubicBezierCurve3(start, firstControl, secondControl, end);
  });
}

function ModulePiece({ part, groupRef, geometry, edgeGeometry, trimGeometry, boltGeometry, material, edgeMaterial, detailMaterial, boltMaterial }) {
  const depth = part.size[2] / 2;

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      <lineSegments geometry={edgeGeometry} material={edgeMaterial} />
      <mesh geometry={trimGeometry} material={detailMaterial} position={[0, 0, depth + 0.022]} />
      {part.kind === "plate" && [-1, 1].map(side => (
        <mesh
          key={side}
          geometry={boltGeometry}
          material={boltMaterial}
          position={[side * part.size[0] * 0.36, 0, depth + 0.045]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
    </group>
  );
}

function AssemblyModel({ sectionIndex, sectionProgress }) {
  const partRefs = useRef([]);
  const dockRefs = useRef([]);
  const pathRefs = useRef([]);
  const pulseRefs = useRef([]);
  const assemblyRef = useRef();

  const geometries = useMemo(() => MODULES.map(part => new RoundedBoxGeometry(
    part.size[0], part.size[1], part.size[2], 6, part.kind === "spine" ? 0.085 : 0.065
  )), []);
  const edgeGeometries = useMemo(() => geometries.map(geometry => new THREE.EdgesGeometry(geometry, 24)), [geometries]);
  const trimGeometries = useMemo(() => MODULES.map(part => new RoundedBoxGeometry(
    part.kind === "spine" ? 0.095 : 0.47,
    part.kind === "spine" ? 1.78 : 0.055,
    0.035,
    4,
    0.014
  )), []);
  const curves = useMemo(createPullCurves, []);
  const pathGeometries = useMemo(() => curves.map(curve => new THREE.TubeGeometry(curve, 42, 0.012, 7, false)), [curves]);
  const dockGeometry = useMemo(() => new THREE.CylinderGeometry(0.39, 0.45, 0.075, 6), []);
  const pulseGeometry = useMemo(() => new THREE.SphereGeometry(0.055, 16, 12), []);
  const boltGeometry = useMemo(() => new THREE.CylinderGeometry(0.035, 0.035, 0.03, 12), []);

  const materials = useMemo(() => MODULES.map(part => new THREE.MeshPhysicalMaterial({
    color: part.color,
    metalness: part.kind === "spine" ? 0.72 : 0.58,
    roughness: part.kind === "spine" ? 0.3 : 0.24,
    clearcoat: 0.72,
    clearcoatRoughness: 0.22
  })), []);
  const edgeMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: "#e7ecef", transparent: true, opacity: 0.3 }), []);
  const detailMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#1e2327", metalness: 0.72, roughness: 0.28, clearcoat: 0.6
  }), []);
  const boltMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#e7ecef", metalness: 0.82, roughness: 0.2 }), []);
  const dockMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#252b30", metalness: 0.68, roughness: 0.32 }), []);
  const pathMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: "#4fa7a3", transparent: true, opacity: 0.48 }), []);
  const pulseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#f4b942", emissive: "#f4b942", emissiveIntensity: 1.4, metalness: 0.25, roughness: 0.22
  }), []);

  useFrame(state => {
    const currentIndex = clamp(sectionIndex, 0, MODULES.length - 1);
    const pull = smoothStep((sectionProgress - 0.34) / 0.48);

    MODULES.forEach((part, index) => {
      const piece = partRefs.current[index];
      const dock = dockRefs.current[index];
      const path = pathRefs.current[index];
      const pulse = pulseRefs.current[index];
      if (!piece) return;

      if (index < currentIndex) {
        piece.visible = true;
        piece.position.set(...part.target);
        piece.rotation.set(...part.rotation);
        piece.scale.setScalar(1);
        if (dock) dock.visible = false;
        if (path) path.visible = false;
        if (pulse) pulse.visible = false;
        return;
      }

      if (index > currentIndex) {
        piece.visible = false;
        if (dock) dock.visible = false;
        if (path) path.visible = false;
        if (pulse) pulse.visible = false;
        return;
      }

      piece.visible = true;
      const point = curves[index].getPoint(pull);
      piece.position.copy(point);
      piece.rotation.set(
        THREE.MathUtils.lerp(part.startRotation[0], part.rotation[0], pull),
        THREE.MathUtils.lerp(part.startRotation[1], part.rotation[1], pull),
        THREE.MathUtils.lerp(part.startRotation[2], part.rotation[2], pull)
      );
      piece.scale.setScalar(0.9 + pull * 0.1);

      if (pull < 0.015) piece.position.y += Math.sin(state.clock.elapsedTime * 1.6) * 0.022;
      if (dock) dock.visible = pull < 0.96;
      if (path) path.visible = pull > 0.015 && pull < 0.995;
      if (pulse) {
        pulse.visible = pull > 0.015 && pull < 0.995;
        if (pulse.visible) pulse.position.copy(point);
      }
    });

    if (assemblyRef.current) assemblyRef.current.rotation.set(-0.035, -0.16, 0.012);
  });

  return (
    <>
      <group ref={assemblyRef}>
        {MODULES.map((part, index) => (
          <ModulePiece
            key={part.id}
            part={part}
            groupRef={node => { partRefs.current[index] = node; }}
            geometry={geometries[index]}
            edgeGeometry={edgeGeometries[index]}
            trimGeometry={trimGeometries[index]}
            boltGeometry={boltGeometry}
            material={materials[index]}
            edgeMaterial={edgeMaterial}
            detailMaterial={detailMaterial}
            boltMaterial={boltMaterial}
          />
        ))}

        {MODULES.map((part, index) => (
          <mesh
            key={part.id + "-dock"}
            ref={node => { dockRefs.current[index] = node; }}
            geometry={dockGeometry}
            material={dockMaterial}
            position={[part.source[0], part.source[1] - 0.39, part.source[2] - 0.22]}
            rotation={[Math.PI / 2, 0, 0]}
            visible={false}
          />
        ))}

        {MODULES.map((part, index) => (
          <group key={part.id + "-pull"}>
            <mesh
              ref={node => { pathRefs.current[index] = node; }}
              geometry={pathGeometries[index]}
              material={pathMaterial}
              visible={false}
            />
            <mesh
              ref={node => { pulseRefs.current[index] = node; }}
              geometry={pulseGeometry}
              material={pulseMaterial}
              visible={false}
            />
          </group>
        ))}
      </group>

      <ambientLight intensity={0.48} />
      <hemisphereLight args={["#f3eee4", "#1e2327", 1.18]} />
      <spotLight position={[3.8, 4.8, 6]} intensity={2.2} angle={0.5} penumbra={0.7} />
      <directionalLight position={[-4, 2, 4]} intensity={1.2} />
      <pointLight position={[-3, -2, 3]} intensity={0.9} color="#4fa7a3" />
    </>
  );
}

function Fallback() {
  return (
    <svg className="assembly-fallback" viewBox="0 0 280 280" role="img" aria-label="Interlocking modular structure">
      <g stroke="#1e2327" strokeWidth="2" strokeLinejoin="round">
        <rect x="117" y="34" width="46" height="212" rx="8" fill="#303b40" />
        <rect x="55" y="57" width="83" height="58" rx="7" fill="#f4b942" transform="rotate(-9 96 86)" />
        <rect x="142" y="57" width="83" height="58" rx="7" fill="#b8c0c5" transform="rotate(9 183 86)" />
        <rect x="48" y="112" width="88" height="58" rx="7" fill="#4fa7a3" transform="rotate(7 92 141)" />
        <rect x="144" y="112" width="88" height="58" rx="7" fill="#f4b942" transform="rotate(-7 188 141)" />
        <rect x="55" y="166" width="83" height="58" rx="7" fill="#b8c0c5" transform="rotate(9 96 195)" />
        <rect x="142" y="166" width="83" height="58" rx="7" fill="#4fa7a3" transform="rotate(-9 183 195)" />
      </g>
    </svg>
  );
}

export default function AssemblyScene() {
  const [scene, setScene] = useState(() => ({
    sectionIndex: 0,
    sectionProgress: 0,
    reducedMotion: false,
    placement: {
      name: "right-center",
      sectionId: "top",
      x: window.innerWidth * 0.8,
      y: window.innerHeight * 0.48,
      size: window.innerWidth <= 600 ? 140 : 260,
      score: 0
    }
  }));

  useEffect(() => {
    const sections = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousPlacement = null;

    const measure = () => {
      frame = 0;
      const anchorY = window.innerHeight * 0.48;
      const measured = sections.map(section => ({ section, rect: section.getBoundingClientRect() }));

      let active = measured.find(item => anchorY >= item.rect.top && anchorY < item.rect.bottom);
      if (!active) {
        active = measured.reduce((closest, item) => {
          const distance = anchorY < item.rect.top ? item.rect.top - anchorY : anchorY - item.rect.bottom;
          return !closest || distance < closest.distance ? { ...item, distance } : closest;
        }, null);
      }

      const sectionIndex = sections.indexOf(active.section);
      const sectionProgress = clamp((anchorY - active.rect.top) / Math.max(active.rect.height, 1), 0, 1);
      const placement = choosePlacement(active.section, previousPlacement);
      previousPlacement = placement;
      const reducedMotion = motion.matches;

      setScene(previous => {
        const positionChanged = previous.placement.name !== placement.name
          || Math.abs(previous.placement.x - placement.x) > 3
          || Math.abs(previous.placement.y - placement.y) > 3
          || Math.abs(previous.placement.size - placement.size) > 2;
        const progressChanged = Math.abs(previous.sectionProgress - sectionProgress) > 0.004;

        if (
          previous.sectionIndex === sectionIndex
          && !positionChanged
          && !progressChanged
          && previous.reducedMotion === reducedMotion
        ) {
          return previous;
        }

        return {
          sectionIndex,
          sectionProgress: reducedMotion ? 1 : sectionProgress,
          reducedMotion,
          placement
        };
      });
    };

    const scheduleMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleMeasure) : null;
    sections.forEach(section => resizeObserver?.observe(section));
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    motion.addEventListener?.("change", scheduleMeasure);
    scheduleMeasure();
    document.fonts?.ready.then(scheduleMeasure);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      motion.removeEventListener?.("change", scheduleMeasure);
    };
  }, []);

  const sectionId = SECTION_IDS[scene.sectionIndex] || "top";
  const pullProgress = scene.reducedMotion ? 100 : Math.round(smoothStep((scene.sectionProgress - 0.34) / 0.48) * 100);
  const overallProgress = clamp(((scene.sectionIndex + pullProgress / 100) / SECTION_IDS.length) * 100, 0, 100);

  return (
    <aside
      className="assembly-scene"
      aria-hidden="true"
      data-section={sectionId}
      data-step={scene.sectionIndex + 1}
      data-placement={scene.placement.name}
      data-pull-progress={pullProgress}
      style={{
        left: scene.placement.x + "px",
        top: scene.placement.y + "px",
        width: scene.placement.size + "px",
        height: scene.placement.size + "px",
        opacity: scene.placement.score > 0.64 ? 0.42 : 0.94
      }}
    >
      <div className="assembly-caption">
        <span>ASSEMBLY / {String(scene.sectionIndex + 1).padStart(2, "0")} OF 07</span>
        <div className="assembly-progress"><i style={{ width: overallProgress + "%" }} /></div>
      </div>

      {scene.reducedMotion ? (
        <Fallback />
      ) : (
        <Canvas
          fallback={<Fallback />}
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 8], fov: 36 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.12;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <AssemblyModel sectionIndex={scene.sectionIndex} sectionProgress={scene.sectionProgress} />
        </Canvas>
      )}
    </aside>
  );
}
