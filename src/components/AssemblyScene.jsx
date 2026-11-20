import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const SECTION_IDS = ["top", "projects", "about", "experience", "skills", "ai", "contact"];
const SOURCE_POSITION = [0, -1.75, 0.48];

const PLACEMENT_PREFERENCES = {
  top: [0.86, 0.44],
  projects: [0.7, 0.44],
  about: [0.14, 0.68],
  experience: [0.86, 0.68],
  skills: [0.86, 0.76],
  ai: [0.86, 0.32],
  contact: [0.86, 0.68]
};

const MODULES = [
  {
    id: "top-left",
    target: [-0.69, 0.96, 0.025],
    size: [1.32, 0.82, 0.24],
    color: "#f4b942",
    rotation: [0, 0, -0.012]
  },
  {
    id: "top-right",
    target: [0.69, 0.96, 0.025],
    size: [1.32, 0.82, 0.24],
    color: "#b8c0c5",
    rotation: [0, 0, 0.012]
  },
  {
    id: "middle-left",
    target: [-0.94, 0, 0.025],
    size: [0.84, 0.82, 0.24],
    color: "#4fa7a3",
    rotation: [0, 0, -0.01]
  },
  {
    id: "middle-center",
    target: [0, 0, 0.025],
    size: [0.84, 0.82, 0.24],
    color: "#f4b942",
    rotation: [0, 0, 0]
  },
  {
    id: "middle-right",
    target: [0.94, 0, 0.025],
    size: [0.84, 0.82, 0.24],
    color: "#b8c0c5",
    rotation: [0, 0, 0.01]
  },
  {
    id: "bottom-left",
    target: [-0.69, -0.96, 0.025],
    size: [1.32, 0.82, 0.24],
    color: "#4fa7a3",
    rotation: [0, 0, 0.01]
  },
  {
    id: "bottom-right",
    target: [0.69, -0.96, 0.025],
    size: [1.32, 0.82, 0.24],
    color: "#f4b942",
    rotation: [0, 0, -0.01]
  }
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function smoothStep(value) {
  const amount = clamp(value, 0, 1);
  return amount * amount * (3 - 2 * amount);
}

function visibleRect(rect) {
  return rect.width > 0
    && rect.height > 0
    && rect.right > 0
    && rect.left < window.innerWidth
    && rect.bottom > 0
    && rect.top < window.innerHeight;
}

function measureContentRects() {
  const root = document.querySelector("main") || document.body;
  const obstacles = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.nodeValue.trim()) continue;

    const parent = node.parentElement;
    if (!parent || parent.closest("script, style, noscript, svg, [aria-hidden='true']")) continue;

    const style = window.getComputedStyle(parent);
    if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.08) continue;

    const range = document.createRange();
    range.selectNodeContents(node);

    for (const rect of range.getClientRects()) {
      if (!visibleRect(rect)) continue;
      obstacles.push({
        left: rect.left - 5,
        right: rect.right + 5,
        top: rect.top - 5,
        bottom: rect.bottom + 5
      });
    }
  }

  const media = root.querySelectorAll(
    "img, video, canvas, figure, .project-visual, .pitch-visual, .integration-visual, .workbench"
  );

  for (const element of media) {
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.08) continue;

    const rect = element.getBoundingClientRect();
    if (!visibleRect(rect)) continue;
    obstacles.push({
      left: rect.left - 7,
      right: rect.right + 7,
      top: rect.top - 7,
      bottom: rect.bottom + 7
    });
  }

  return obstacles;
}

function overlapScore(rect, obstacles) {
  const columns = 11;
  const rows = 11;
  let covered = 0;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = rect.left + ((column + 0.5) / columns) * rect.width;
      const y = rect.top + ((row + 0.5) / rows) * rect.height;

      if (obstacles.some(obstacle => (
        x >= obstacle.left
        && x <= obstacle.right
        && y >= obstacle.top
        && y <= obstacle.bottom
      ))) {
        covered += 1;
      }
    }
  }

  return covered / (columns * rows);
}

function choosePlacement(section, previousPlacement) {
  const mobile = window.innerWidth <= 760;
  const sizes = mobile ? [120, 104, 88] : [228, 204, 184, 164, 144, 128];
  const xPositions = mobile ? [0.16, 0.5, 0.84] : [0.14, 0.3, 0.5, 0.7, 0.86];
  const yPositions = mobile ? [0.22, 0.5, 0.78] : [0.2, 0.32, 0.44, 0.56, 0.68, 0.78];
  const preferred = PLACEMENT_PREFERENCES[section.id] || PLACEMENT_PREFERENCES.top;
  const sectionRect = section.getBoundingClientRect();
  const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom || 82;
  const obstacles = measureContentRects();

  for (const size of sizes) {
    const height = size * 1.25;
    const minY = Math.max(height / 2 + 12, sectionRect.top + height / 2 + 10, headerBottom + height / 2 + 12);
    const maxY = Math.min(
      window.innerHeight - height / 2 - 12,
      sectionRect.bottom - height / 2 - 10
    );

    if (maxY < minY) continue;

    const candidates = [];

    for (let xIndex = 0; xIndex < xPositions.length; xIndex += 1) {
      for (let yIndex = 0; yIndex < yPositions.length; yIndex += 1) {
        const xFraction = xPositions[xIndex];
        const yFraction = yPositions[yIndex];
        const centerX = clamp(
          window.innerWidth * xFraction,
          size / 2 + 12,
          window.innerWidth - size / 2 - 12
        );
        const centerY = clamp(window.innerHeight * yFraction, minY, maxY);
        const rect = {
          left: centerX - size / 2,
          right: centerX + size / 2,
          top: centerY - height / 2,
          bottom: centerY + height / 2,
          width: size,
          height
        };

        const overlap = overlapScore(rect, obstacles);
        const distance = Math.hypot(xFraction - preferred[0], yFraction - preferred[1]);
        const samePosition = previousPlacement
          && previousPlacement.sectionId !== section.id
          && previousPlacement.name === `${xIndex}-${yIndex}`;
        const movementPenalty = samePosition ? 0.018 : 0;

        candidates.push({
          name: `${xIndex}-${yIndex}`,
          x: centerX,
          y: centerY,
          size,
          height,
          score: overlap,
          rank: overlap * 5 + distance * 0.05 + movementPenalty
        });
      }
    }

    const safeCandidates = candidates
      .filter(candidate => candidate.score <= 0.06)
      .sort((a, b) => a.rank - b.rank);

    if (!safeCandidates.length) continue;

    const best = safeCandidates[0];
    const previous = previousPlacement
      && previousPlacement.sectionId === section.id
      && previousPlacement.size === size
      ? candidates.find(candidate => candidate.name === previousPlacement.name)
      : null;

    if (previous && previous.score <= best.score + 0.02) {
      return { ...previous, sectionId: section.id, visible: true };
    }

    return { ...best, sectionId: section.id, visible: true };
  }

  return {
    name: "hidden",
    sectionId: section.id,
    x: 0,
    y: 0,
    size: 0,
    height: 0,
    score: 1,
    visible: false
  };
}

function createPullCurves() {
  const start = new THREE.Vector3(...SOURCE_POSITION);

  return MODULES.map(part => {
    const end = new THREE.Vector3(...part.target).add(new THREE.Vector3(0, 0, 0.06));
    const horizontal = part.target[0] * 0.2;
    const firstControl = start.clone()
      .lerp(end, 0.3)
      .add(new THREE.Vector3(horizontal, 0.34, 0.42));
    const secondControl = start.clone()
      .lerp(end, 0.72)
      .add(new THREE.Vector3(horizontal * 0.35, 0.18, 0.3));

    return new THREE.CubicBezierCurve3(start, firstControl, secondControl, end);
  });
}

function ModulePiece({
  part,
  groupRef,
  bodyGeometry,
  faceGeometry,
  edgeGeometry,
  accentGeometry,
  boltGeometry,
  bodyMaterial,
  faceMaterial,
  edgeMaterial,
  detailMaterial,
  boltMaterial
}) {
  const [width, height, depth] = part.size;
  const faceZ = depth / 2 + 0.02;
  const boltX = width / 2 - 0.11;
  const boltY = height / 2 - 0.11;

  return (
    <group ref={groupRef}>
      <mesh geometry={bodyGeometry} material={bodyMaterial} castShadow receiveShadow />
      <lineSegments geometry={edgeGeometry} material={edgeMaterial} />
      <mesh geometry={faceGeometry} material={faceMaterial} position={[0, 0, faceZ]} />
      <mesh geometry={accentGeometry} material={detailMaterial} position={[0, height * 0.28, faceZ + 0.018]} />
      {[-1, 1].flatMap(xSide => [-1, 1].map(ySide => (
        <mesh
          key={`${xSide}-${ySide}`}
          geometry={boltGeometry}
          material={boltMaterial}
          position={[xSide * boltX, ySide * boltY, faceZ + 0.035]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      )))}
    </group>
  );
}

function AssemblyModel({ sectionIndex, sectionProgress }) {
  const pieceRefs = useRef([]);
  const slotRefs = useRef([]);
  const pathRefs = useRef([]);
  const pulseRef = useRef();
  const dockRef = useRef();
  const pathMaterialRef = useRef();

  const boardGeometry = useMemo(
    () => new RoundedBoxGeometry(2.94, 2.94, 0.2, 8, 0.075),
    []
  );
  const boardEdgeGeometry = useMemo(() => new THREE.EdgesGeometry(boardGeometry, 24), [boardGeometry]);

  const bodyGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0], part.size[1], part.size[2], 6, 0.065)
  )), []);
  const faceGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0] - 0.12, part.size[1] - 0.12, 0.035, 5, 0.035)
  )), []);
  const edgeGeometries = useMemo(() => bodyGeometries.map(geometry => new THREE.EdgesGeometry(geometry, 22)), [bodyGeometries]);
  const accentGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0] * 0.5, 0.025, 0.018, 3, 0.009)
  )), []);
  const slotGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0] - 0.055, part.size[1] - 0.055, 0.065, 6, 0.055)
  )), []);
  const slotEdgeGeometries = useMemo(() => slotGeometries.map(geometry => new THREE.EdgesGeometry(geometry, 24)), [slotGeometries]);

  const curves = useMemo(createPullCurves, []);
  const pathGeometries = useMemo(() => curves.map(curve => (
    new THREE.TubeGeometry(curve, 54, 0.012, 8, false)
  )), [curves]);

  const boltGeometry = useMemo(() => new THREE.CylinderGeometry(0.032, 0.032, 0.028, 12), []);
  const dockGeometry = useMemo(() => new RoundedBoxGeometry(1.08, 0.15, 0.43, 6, 0.055), []);
  const dockRailGeometry = useMemo(() => new RoundedBoxGeometry(0.76, 0.025, 0.035, 4, 0.012), []);
  const pulseGeometry = useMemo(() => new THREE.SphereGeometry(0.045, 16, 12), []);

  const boardMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#252b30",
    metalness: 0.62,
    roughness: 0.34,
    clearcoat: 0.42,
    clearcoatRoughness: 0.32
  }), []);
  const boardEdgeMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: "#aeb9bd",
    transparent: true,
    opacity: 0.36
  }), []);
  const slotMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#151c20",
    metalness: 0.48,
    roughness: 0.52
  }), []);
  const slotEdgeMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: "#718087",
    transparent: true,
    opacity: 0.44
  }), []);
  const bodyMaterials = useMemo(() => MODULES.map(part => new THREE.MeshPhysicalMaterial({
    color: part.color,
    metalness: 0.58,
    roughness: 0.28,
    clearcoat: 0.82,
    clearcoatRoughness: 0.2
  })), []);
  const faceMaterials = useMemo(() => MODULES.map(part => new THREE.MeshPhysicalMaterial({
    color: part.color,
    metalness: 0.38,
    roughness: 0.23,
    clearcoat: 1,
    clearcoatRoughness: 0.16
  })), []);
  const edgeMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: "#edf2f3",
    transparent: true,
    opacity: 0.48
  }), []);
  const detailMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#303b40",
    metalness: 0.72,
    roughness: 0.28,
    clearcoat: 0.68
  }), []);
  const boltMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e7ecef",
    metalness: 0.86,
    roughness: 0.2
  }), []);
  const dockMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#303b40",
    metalness: 0.74,
    roughness: 0.28,
    clearcoat: 0.6
  }), []);
  const pathMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#4fa7a3",
    transparent: true,
    opacity: 0.24
  }), []);
  const pulseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#f4b942",
    emissive: "#f4b942",
    emissiveIntensity: 1.6,
    metalness: 0.2,
    roughness: 0.2
  }), []);

  useFrame(state => {
    const currentIndex = clamp(sectionIndex, 0, MODULES.length - 1);
    const pull = smoothStep((sectionProgress - 0.24) / 0.54);

    MODULES.forEach((part, index) => {
      const piece = pieceRefs.current[index];
      const slot = slotRefs.current[index];
      const path = pathRefs.current[index];
      if (!piece) return;

      if (slot) {
        slot.visible = index >= currentIndex;
      }

      if (index < currentIndex) {
        piece.visible = true;
        piece.position.set(...part.target);
        piece.rotation.set(...part.rotation);
        piece.scale.setScalar(1);
        if (path) path.visible = false;
        return;
      }

      if (index > currentIndex) {
        piece.visible = false;
        if (path) path.visible = false;
        return;
      }

      piece.visible = true;
      const point = curves[index].getPoint(pull);
      piece.position.copy(point);
      piece.rotation.set(
        THREE.MathUtils.lerp(0.16, part.rotation[0], pull),
        THREE.MathUtils.lerp(-0.24, part.rotation[1], pull),
        THREE.MathUtils.lerp(0.22, part.rotation[2], pull)
      );
      piece.scale.setScalar(0.72 + pull * 0.28);

      if (pull < 0.015) {
        piece.position.y += Math.sin(state.clock.elapsedTime * 1.25) * 0.016;
      }

      if (path) path.visible = true;
      if (pathMaterialRef.current) {
        pathMaterialRef.current.opacity = pull < 0.015 ? 0.2 : 0.66;
      }
      if (pulseRef.current) {
        pulseRef.current.visible = pull > 0.01 && pull < 0.995;
        if (pulseRef.current.visible) pulseRef.current.position.copy(point);
      }
    });

    if (dockRef.current) {
      dockRef.current.visible = pull < 0.98;
    }
  });

  return (
    <>
      <group rotation={[-0.035, -0.11, 0.008]}>
        <mesh geometry={boardGeometry} material={boardMaterial} position={[0, 0, -0.19]} castShadow receiveShadow />
        <lineSegments geometry={boardEdgeGeometry} material={boardEdgeMaterial} position={[0, 0, -0.19]} />

        {MODULES.map((part, index) => (
          <group key={part.id + "-slot"} ref={node => { slotRefs.current[index] = node; }} position={part.target}>
            <mesh geometry={slotGeometries[index]} material={slotMaterial} position={[0, 0, -0.075]} />
            <lineSegments geometry={slotEdgeGeometries[index]} material={slotEdgeMaterial} position={[0, 0, -0.075]} />
          </group>
        ))}

        {MODULES.map((part, index) => (
          <ModulePiece
            key={part.id}
            part={part}
            groupRef={node => { pieceRefs.current[index] = node; }}
            bodyGeometry={bodyGeometries[index]}
            faceGeometry={faceGeometries[index]}
            edgeGeometry={edgeGeometries[index]}
            accentGeometry={accentGeometries[index]}
            boltGeometry={boltGeometry}
            bodyMaterial={bodyMaterials[index]}
            faceMaterial={faceMaterials[index]}
            edgeMaterial={edgeMaterial}
            detailMaterial={detailMaterial}
            boltMaterial={boltMaterial}
          />
        ))}

        <mesh
          ref={dockRef}
          geometry={dockGeometry}
          material={dockMaterial}
          position={[0, -2.12, 0.14]}
          castShadow
        />
        <mesh geometry={dockRailGeometry} material={pathMaterial} position={[0, -2.12, 0.38]} />

        {MODULES.map((part, index) => (
          <mesh
            key={part.id + "-path"}
            ref={node => {
              pathRefs.current[index] = node;
              if (index === 0) pathMaterialRef.current = pathMaterial;
            }}
            geometry={pathGeometries[index]}
            material={pathMaterial}
            visible={false}
          />
        ))}
        <mesh ref={pulseRef} geometry={pulseGeometry} material={pulseMaterial} visible={false} />
      </group>

      <ambientLight intensity={0.54} />
      <hemisphereLight args={["#f6f0e5", "#1e2327", 1.12]} />
      <spotLight position={[3.6, 4.5, 6]} intensity={2.25} angle={0.48} penumbra={0.72} />
      <directionalLight position={[-4, 2, 5]} intensity={1.18} />
      <pointLight position={[-3, -2, 3]} intensity={0.9} color="#4fa7a3" />
    </>
  );
}

function Fallback() {
  return (
    <svg className="assembly-fallback" viewBox="0 0 280 320" role="img" aria-label="Interlocking modular structure">
      <g stroke="#1e2327" strokeWidth="2" strokeLinejoin="round">
        <rect x="16" y="10" width="248" height="248" rx="11" fill="#252b30" />
        <rect x="23" y="17" width="114" height="76" rx="6" fill="#f4b942" />
        <rect x="143" y="17" width="114" height="76" rx="6" fill="#b8c0c5" />
        <rect x="23" y="99" width="74" height="76" rx="6" fill="#4fa7a3" />
        <rect x="103" y="99" width="74" height="76" rx="6" fill="#f4b942" />
        <rect x="183" y="99" width="74" height="76" rx="6" fill="#b8c0c5" />
        <rect x="23" y="181" width="114" height="70" rx="6" fill="#4fa7a3" />
        <rect x="143" y="181" width="114" height="70" rx="6" fill="#f4b942" />
        <path d="M30 27h96M150 27h96M30 109h54M110 109h54M190 109h54" stroke="#ffffff" opacity=".46" strokeWidth="3" />
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
      x: window.innerWidth * 0.82,
      y: window.innerHeight * 0.48,
      size: window.innerWidth <= 760 ? 120 : 228,
      height: window.innerWidth <= 760 ? 150 : 285,
      score: 0,
      visible: true
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
          const distance = anchorY < item.rect.top
            ? item.rect.top - anchorY
            : anchorY - item.rect.bottom;
          return !closest || distance < closest.distance ? { ...item, distance } : closest;
        }, null);
      }

      const sectionIndex = sections.indexOf(active.section);
      const sectionProgress = sectionIndex === 0
        ? clamp(
          window.scrollY / Math.max(active.rect.height - window.innerHeight * 0.48, 1),
          0,
          1
        )
        : clamp(
          (anchorY - active.rect.top) / Math.max(active.rect.height, 1),
          0,
          1
        );
      const placement = choosePlacement(active.section, previousPlacement);
      previousPlacement = placement;
      const reducedMotion = motion.matches;

      setScene(previous => {
        const positionChanged = previous.placement.name !== placement.name
          || Math.abs(previous.placement.x - placement.x) > 3
          || Math.abs(previous.placement.y - placement.y) > 3
          || Math.abs(previous.placement.size - placement.size) > 2
          || previous.placement.visible !== placement.visible;
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

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(scheduleMeasure)
      : null;

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
  const pullProgress = scene.reducedMotion
    ? 100
    : Math.round(smoothStep((scene.sectionProgress - 0.24) / 0.54) * 100);

  return (
    <aside
      className="assembly-scene"
      aria-hidden="true"
      data-section={sectionId}
      data-step={scene.sectionIndex + 1}
      data-placement={scene.placement.name}
      data-hidden={!scene.placement.visible}
      data-overlap={scene.placement.score}
      data-pull-progress={pullProgress}
      style={{
        left: scene.placement.x + "px",
        top: scene.placement.y + "px",
        width: scene.placement.size + "px",
        height: scene.placement.height + "px",
        visibility: scene.placement.visible ? "visible" : "hidden",
        opacity: scene.placement.visible ? 0.96 : 0
      }}
    >
      {scene.reducedMotion ? (
        <Fallback />
      ) : scene.placement.visible ? (
        <Canvas
          fallback={<Fallback />}
          dpr={[1, 1.7]}
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
      ) : null}
    </aside>
  );
}
