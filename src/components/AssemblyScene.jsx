import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const SECTION_IDS = ["top", "projects", "about", "experience", "skills", "ai", "contact"];

const PLACEMENT_OPTIONS = {
  top: [[0.88, 0.52], [0.12, 0.76]],
  projects: [[0.88, 0.22], [0.12, 0.78]],
  about: [[0.14, 0.76], [0.88, 0.78]],
  experience: [[0.88, 0.24], [0.14, 0.76]],
  skills: [[0.88, 0.76], [0.14, 0.22]],
  ai: [[0.88, 0.22], [0.14, 0.76]],
  contact: [[0.88, 0.24], [0.14, 0.24]]
};

const MODULES = [
  { id: "north-west", target: [-0.69, 0.94, 0.055], source: [-1.72, 1.46, 0.96], size: [1.32, 0.82, 0.22], accent: "#c99537", rotation: [0, 0, 0] },
  { id: "north-east", target: [0.69, 0.94, 0.055], source: [1.72, 1.46, 0.96], size: [1.32, 0.82, 0.22], accent: "#6caaa5", rotation: [0, 0, 0] },
  { id: "middle-west", target: [-0.94, 0, 0.055], source: [-1.78, 0.08, 0.96], size: [0.82, 0.82, 0.22], accent: "#6caaa5", rotation: [0, 0, 0] },
  { id: "middle-centre", target: [0, 0, 0.055], source: [0, -1.72, 0.96], size: [0.82, 0.82, 0.22], accent: "#c99537", rotation: [0, 0, 0] },
  { id: "middle-east", target: [0.94, 0, 0.055], source: [1.78, 0.08, 0.96], size: [0.82, 0.82, 0.22], accent: "#aab4b8", rotation: [0, 0, 0] },
  { id: "south-west", target: [-0.69, -0.94, 0.055], source: [-1.72, -1.46, 0.96], size: [1.32, 0.82, 0.22], accent: "#6caaa5", rotation: [0, 0, 0] },
  { id: "south-east", target: [0.69, -0.94, 0.055], source: [1.72, -1.46, 0.96], size: [1.32, 0.82, 0.22], accent: "#c99537", rotation: [0, 0, 0] }
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function smoothStep(value) {
  const amount = clamp(value, 0, 1);
  return amount * amount * (3 - 2 * amount);
}

function isVisible(rect) {
  return rect.width > 0
    && rect.height > 0
    && rect.right > 0
    && rect.left < window.innerWidth
    && rect.bottom > 0
    && rect.top < window.innerHeight;
}

function measureProtectedRects(section) {
  const root = document.querySelector("main") || section;
  const rects = [];
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
      if (!isVisible(rect)) continue;
      rects.push({
        left: rect.left - 10,
        right: rect.right + 10,
        top: rect.top - 10,
        bottom: rect.bottom + 10
      });
    }
  }

  const protectedElements = root.querySelectorAll(
    "img, video, canvas, figure, a, button, li, .project-visual, .pitch-visual, .workbench, .contact-links"
  );

  for (const element of protectedElements) {
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.08) continue;

    const rect = element.getBoundingClientRect();
    if (!isVisible(rect)) continue;
    rects.push({
      left: rect.left - 10,
      right: rect.right + 10,
      top: rect.top - 10,
      bottom: rect.bottom + 10
    });
  }

  return rects;
}

function hasCollision(candidate, obstacles) {
  return obstacles.some(rect => (
    candidate.left < rect.right
    && candidate.right > rect.left
    && candidate.top < rect.bottom
    && candidate.bottom > rect.top
  ));
}

function choosePlacement(section, sectionId, previousPlacement) {
  if (window.innerWidth < 1024 || window.innerHeight < 640) {
    return { visible: false, name: "hidden", sectionId, x: 0, y: 0, size: 0, overlap: 1 };
  }

  const size = window.innerWidth >= 1360 ? 300 : 260;
  const rect = section.getBoundingClientRect();
  const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom || 82;
  const minY = Math.max(size / 2 + 12, rect.top + size / 2 + 12, headerBottom + size / 2 + 16);
  const maxY = Math.min(window.innerHeight - size / 2 - 16, rect.bottom - size / 2 - 12);

  if (maxY < minY) {
    return { visible: false, name: "hidden", sectionId, x: 0, y: 0, size, overlap: 1 };
  }

  const obstacles = measureProtectedRects(section);
  const options = PLACEMENT_OPTIONS[sectionId] || PLACEMENT_OPTIONS.top;

  for (let index = 0; index < options.length; index += 1) {
    const [xRatio, yRatio] = options[index];
    const x = clamp(window.innerWidth * xRatio, size / 2 + 12, window.innerWidth - size / 2 - 12);
    const y = clamp(window.innerHeight * yRatio, minY, maxY);
    const candidate = {
      left: x - size / 2,
      right: x + size / 2,
      top: y - size / 2,
      bottom: y + size / 2
    };

    if (hasCollision(candidate, obstacles)) continue;

    const name = index === 0 ? "primary" : "alternate";
    if (
      previousPlacement
      && previousPlacement.sectionId === sectionId
      && previousPlacement.name === name
      && previousPlacement.visible
    ) {
      return { ...previousPlacement, x, y, size, visible: true, overlap: 0 };
    }

    return { visible: true, name, sectionId, x, y, size, overlap: 0 };
  }

  return { visible: false, name: "hidden", sectionId, x: 0, y: 0, size, overlap: 1 };
}

function createFlightCurve(part) {
  const start = new THREE.Vector3(...part.source);
  const end = new THREE.Vector3(...part.target);
  const direction = end.clone().sub(start);
  const lift = new THREE.Vector3(0, 0.36, 0.48);

  return new THREE.CubicBezierCurve3(
    start,
    start.clone().add(direction.clone().multiplyScalar(0.34)).add(lift),
    start.clone().add(direction.clone().multiplyScalar(0.76)).add(lift.clone().multiplyScalar(0.56)),
    end
  );
}

function ModulePiece({ part, groupRef, bodyGeometry, faceGeometry, insetGeometry, accentGeometry, hairlineGeometry, bodyMaterial, faceMaterial, insetMaterial, accentMaterial, hairlineMaterial, edgeMaterial, bodyEdgeGeometry }) {
  const faceZ = part.size[2] / 2 + 0.02;
  const insetZ = faceZ + 0.043;
  const detailZ = insetZ + 0.024;

  return (
    <group ref={groupRef}>
      <mesh geometry={bodyGeometry} material={bodyMaterial} castShadow receiveShadow />
      <lineSegments geometry={bodyEdgeGeometry} material={edgeMaterial} />
      <mesh geometry={faceGeometry} material={faceMaterial} position={[0, 0, faceZ]} />
      <mesh geometry={insetGeometry} material={insetMaterial} position={[0, 0, insetZ]} />
      <mesh geometry={accentGeometry} material={accentMaterial} position={[-part.size[0] * 0.24, part.size[1] * 0.22, detailZ]} />
      <mesh geometry={hairlineGeometry} material={hairlineMaterial} position={[part.size[0] * 0.06, -part.size[1] * 0.22, detailZ]} />
    </group>
  );
}

function AssemblyModel({ sectionIndex, sectionProgress }) {
  const pieces = useRef([]);
  const flightCurves = useMemo(() => MODULES.map(createFlightCurve), []);
  const bodyGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0], part.size[1], part.size[2], 8, 0.11)
  )), []);
  const faceGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0] - 0.14, part.size[1] - 0.14, 0.04, 7, 0.05)
  )), []);
  const insetGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0] - 0.3, part.size[1] - 0.3, 0.03, 7, 0.045)
  )), []);
  const accentGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(Math.max(0.24, part.size[0] * 0.27), 0.028, 0.014, 4, 0.012)
  )), []);
  const hairlineGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0] * 0.43, 0.012, 0.01, 3, 0.005)
  )), []);
  const socketRimGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0] + 0.12, part.size[1] + 0.12, 0.16, 7, 0.075)
  )), []);
  const socketWellGeometries = useMemo(() => MODULES.map(part => (
    new RoundedBoxGeometry(part.size[0] + 0.025, part.size[1] + 0.025, 0.08, 7, 0.06)
  )), []);
  const railGeometry = useMemo(() => new RoundedBoxGeometry(3.08, 0.075, 0.16, 6, 0.035), []);
  const sideRailGeometry = useMemo(() => new RoundedBoxGeometry(0.075, 3.08, 0.16, 6, 0.035), []);
  const dividerGeometry = useMemo(() => new RoundedBoxGeometry(2.76, 0.055, 0.1, 5, 0.025), []);
  const shortDividerGeometry = useMemo(() => new RoundedBoxGeometry(0.055, 0.88, 0.1, 5, 0.025), []);
  const middleDividerGeometry = useMemo(() => new RoundedBoxGeometry(0.055, 0.82, 0.1, 5, 0.025), []);

  const bodyMaterials = useMemo(() => [
    "#89969c", "#7d8b91", "#8b989e", "#9aa6ab", "#829097", "#85949a", "#909ca2"
  ].map(color => new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.5,
    roughness: 0.35,
    clearcoat: 0.54,
    clearcoatRoughness: 0.24
  })), []);
  const faceMaterials = useMemo(() => MODULES.map(() => new THREE.MeshPhysicalMaterial({
    color: "#a1adb2",
    metalness: 0.56,
    roughness: 0.31,
    clearcoat: 0.54,
    clearcoatRoughness: 0.22
  })), []);
  const insetMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#39474d",
    metalness: 0.55,
    roughness: 0.35,
    clearcoat: 0.42,
    clearcoatRoughness: 0.26
  }), []);
  const accentMaterials = useMemo(() => MODULES.map(part => new THREE.MeshStandardMaterial({
    color: part.accent,
    metalness: 0.48,
    roughness: 0.36
  })), []);
  const hairlineMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#c5cfd3",
    metalness: 0.42,
    roughness: 0.38
  }), []);
  const edgeMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: "#f0f4f5",
    transparent: true,
    opacity: 0.42
  }), []);
  const rimMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#6f7c83",
    metalness: 0.58,
    roughness: 0.34,
    clearcoat: 0.42
  }), []);
  const socketMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#253238",
    metalness: 0.48,
    roughness: 0.38
  }), []);
  const railMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#3f4d53",
    metalness: 0.56,
    roughness: 0.36,
    clearcoat: 0.42
  }), []);
  const railEdgeMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: "#d4dddf",
    transparent: true,
    opacity: 0.52
  }), []);

  const bodyEdgeGeometries = useMemo(() => bodyGeometries.map(geometry => new THREE.EdgesGeometry(geometry, 22)), [bodyGeometries]);

  const frame = useMemo(() => {
    const rails = [
      { geometry: railGeometry, position: [0, 1.52, -0.13] },
      { geometry: railGeometry, position: [0, -1.52, -0.13] },
      { geometry: sideRailGeometry, position: [-1.52, 0, -0.13] },
      { geometry: sideRailGeometry, position: [1.52, 0, -0.13] },
      { geometry: dividerGeometry, position: [0, 0.47, -0.13] },
      { geometry: dividerGeometry, position: [0, -0.47, -0.13] },
      { geometry: shortDividerGeometry, position: [0, 0.94, -0.13] },
      { geometry: shortDividerGeometry, position: [0, -0.94, -0.13] },
      { geometry: middleDividerGeometry, position: [-0.47, 0, -0.13] },
      { geometry: middleDividerGeometry, position: [0.47, 0, -0.13] }
    ];
    return rails;
  }, [railGeometry, sideRailGeometry, dividerGeometry, shortDividerGeometry, middleDividerGeometry]);

  const frameEdgeGeometries = useMemo(() => frame.map(rail => new THREE.EdgesGeometry(rail.geometry, 24)), [frame]);
  const curves = flightCurves;

  useFrame(() => {
    const activeIndex = clamp(sectionIndex, 0, MODULES.length - 1);
    const flight = smoothStep((sectionProgress - 0.08) / 0.78);

    MODULES.forEach((part, index) => {
      const piece = pieces.current[index];
      if (!piece) return;

      if (index < activeIndex) {
        piece.visible = true;
        piece.position.set(...part.target);
        piece.rotation.set(...part.rotation);
        piece.scale.setScalar(1);
        return;
      }

      if (index > activeIndex) {
        piece.visible = false;
        return;
      }

      piece.visible = true;
      const point = curves[index].getPoint(flight);
      piece.position.copy(point);
      const rotationAmount = 1 - flight;
      piece.rotation.set(
        THREE.MathUtils.lerp(0.17, part.rotation[0], flight),
        THREE.MathUtils.lerp(-0.2, part.rotation[1], flight),
        THREE.MathUtils.lerp(0.16, part.rotation[2], flight) * rotationAmount
      );
      const settle = smoothStep((flight - 0.88) / 0.12);
      piece.scale.setScalar(0.985 + settle * 0.015);
    });
  });

  return (
    <>
      <group rotation={[-0.29, -0.32, 0.014]}>
        {MODULES.map((part, index) => (
          <group key={part.id + "-socket"} position={part.target}>
            <mesh geometry={socketRimGeometries[index]} material={rimMaterial} position={[0, 0, -0.105]} />
            <mesh geometry={socketWellGeometries[index]} material={socketMaterial} position={[0, 0, -0.06]} />
          </group>
        ))}

        {frame.map((rail, index) => (
          <group key={"frame-" + index} position={rail.position}>
            <mesh geometry={rail.geometry} material={railMaterial} castShadow receiveShadow />
            <lineSegments geometry={frameEdgeGeometries[index]} material={railEdgeMaterial} />
          </group>
        ))}

        {MODULES.map((part, index) => (
          <ModulePiece
            key={part.id}
            part={part}
            groupRef={node => { pieces.current[index] = node; }}
            bodyGeometry={bodyGeometries[index]}
            faceGeometry={faceGeometries[index]}
            insetGeometry={insetGeometries[index]}
            accentGeometry={accentGeometries[index]}
            hairlineGeometry={hairlineGeometries[index]}
            bodyMaterial={bodyMaterials[index]}
            faceMaterial={faceMaterials[index]}
            insetMaterial={insetMaterial}
            accentMaterial={accentMaterials[index]}
            hairlineMaterial={hairlineMaterial}
            edgeMaterial={edgeMaterial}
            bodyEdgeGeometry={bodyEdgeGeometries[index]}
          />
        ))}
      </group>

      <ambientLight intensity={0.62} />
      <hemisphereLight args={["#f5f2e9", "#151d22", 1.45]} />
      <directionalLight position={[3.5, 4.5, 6]} intensity={2.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 1.5, 4]} intensity={0.95} color="#7eaaa6" />
      <pointLight position={[0, -3, 3]} intensity={0.72} color="#c99537" />
    </>
  );
}

function StaticFallback() {
  return (
    <svg className="assembly-fallback" viewBox="0 0 320 320" role="img" aria-label="Modular industrial sculpture">
      <g strokeLinejoin="round">
        <rect x="12" y="12" width="296" height="296" rx="5" fill="none" stroke="#536168" strokeWidth="7" />
        <rect x="20" y="20" width="134" height="84" rx="5" fill="#58656c" stroke="#9aa6ab" strokeWidth="2" />
        <rect x="166" y="20" width="134" height="84" rx="5" fill="#58656c" stroke="#9aa6ab" strokeWidth="2" />
        <rect x="20" y="112" width="84" height="84" rx="5" fill="#58656c" stroke="#9aa6ab" strokeWidth="2" />
        <rect x="112" y="112" width="84" height="84" rx="5" fill="#66737a" stroke="#9aa6ab" strokeWidth="2" />
        <rect x="204" y="112" width="84" height="84" rx="5" fill="#58656c" stroke="#9aa6ab" strokeWidth="2" />
        <rect x="20" y="204" width="134" height="84" rx="5" fill="#58656c" stroke="#9aa6ab" strokeWidth="2" />
        <rect x="166" y="204" width="134" height="84" rx="5" fill="#58656c" stroke="#9aa6ab" strokeWidth="2" />
        <g stroke="#c99537" strokeWidth="4">
          <path d="M38 39h30M184 39h30M38 223h30" />
        </g>
        <g stroke="#6caaa5" strokeWidth="4">
          <path d="M38 131h24M222 131h24M184 223h30" />
        </g>
      </g>
    </svg>
  );
}

export default function AssemblyScene() {
  const [scene, setScene] = useState(() => ({
    sectionIndex: 0,
    sectionProgress: 0,
    reducedMotion: false,
    placement: { visible: false, name: "hidden", sectionId: "top", x: 0, y: 0, size: 0, overlap: 1 }
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
        : sectionIndex === sections.length - 1
          ? (() => {
            const sectionStart = Math.max(0, active.rect.top + window.scrollY - anchorY);
            const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            return clamp(
              (window.scrollY - sectionStart) / Math.max(maxScroll - sectionStart, 1),
              0,
              1
            );
          })()
          : clamp((anchorY - active.rect.top) / Math.max(active.rect.height, 1), 0, 1);

      const sectionId = active.section.id;
      const placement = choosePlacement(active.section, sectionId, previousPlacement);
      previousPlacement = placement;
      const reducedMotion = motion.matches;

      setScene(previous => {
        const positionChanged = previous.placement.name !== placement.name
          || Math.abs(previous.placement.x - placement.x) > 3
          || Math.abs(previous.placement.y - placement.y) > 3
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
    : Math.round(smoothStep((scene.sectionProgress - 0.08) / 0.78) * 100);
  const pieceState = pullProgress <= 5 ? "source" : pullProgress >= 95 ? "seated" : "moving";

  return (
    <aside
      className="assembly-scene"
      aria-hidden="true"
      data-section={sectionId}
      data-module-index={scene.sectionIndex}
      data-placement={scene.placement.name}
      data-hidden={!scene.placement.visible}
      data-overlap={scene.placement.overlap}
      data-pull-progress={pullProgress}
      data-piece-state={pieceState}
      style={{
        left: scene.placement.x + "px",
        top: scene.placement.y + "px",
        width: scene.placement.size + "px",
        height: scene.placement.size + "px",
        visibility: scene.placement.visible ? "visible" : "hidden",
        opacity: scene.placement.visible ? 1 : 0
      }}
    >
      {scene.reducedMotion ? (
        <StaticFallback />
      ) : scene.placement.visible ? (
        <Canvas
          shadows
          dpr={[1, 1.6]}
          camera={{ position: [0, 0, 7.8], fov: 34 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.18;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <AssemblyModel sectionIndex={scene.sectionIndex} sectionProgress={scene.sectionProgress} />
        </Canvas>
      ) : null}
    </aside>
  );
}
