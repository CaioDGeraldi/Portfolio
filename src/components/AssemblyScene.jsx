import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const modules = [
  { target: [0, 0, 0], scatter: [0, -2.2, 0], scale: [0.62, 0.62, 0.62], shape: "core" },
  { target: [1.12, 0.22, 0], scatter: [2.7, 1.6, -1.3], scale: [0.48, 0.68, 0.48] },
  { target: [-1.12, 0.22, 0], scatter: [-2.8, 1.2, 1.8], scale: [0.48, 0.68, 0.48] },
  { target: [0, 1.18, 0], scatter: [1.4, 3.2, 2.2], scale: [0.55, 0.45, 0.55] },
  { target: [0, -1.18, 0], scatter: [-1.5, -3.1, -2.2], scale: [0.55, 0.45, 0.55] },
  { target: [0, 0, 1.12], scatter: [3.1, -1.1, 2.8], scale: [0.48, 0.48, 0.68] },
  { target: [0, 0, -1.12], scatter: [-3.1, -1.6, -2.8], scale: [0.48, 0.48, 0.68] }
];

function Modules({ progress, reducedMotion }) {
  const refs = useRef([]);
  const group = useRef();
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: "#f4b942", metalness: 0.42, roughness: 0.36 }), []);
  const darkMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#303b40", metalness: 0.55, roughness: 0.32 }), []);
  useFrame((state, delta) => {
    modules.forEach((part, index) => {
      const mesh = refs.current[index];
      if (!mesh) return;
      const amount = index === 0 ? 1 : THREE.MathUtils.clamp(progress * modules.length - index, 0, 1);
      const eased = amount * amount * (3 - 2 * amount);
      mesh.position.lerpVectors(new THREE.Vector3(...part.scatter), new THREE.Vector3(...part.target), eased);
      mesh.scale.set(part.scale[0] * (0.76 + 0.24 * eased), part.scale[1] * (0.76 + 0.24 * eased), part.scale[2] * (0.76 + 0.24 * eased));
      mesh.rotation.set(0.35 * (1 - eased), index * 0.4 * (1 - eased), 0.4 * (1 - eased));
    });
    if (group.current && !reducedMotion) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.06;
    }
  });
  return <group ref={group}>
    {modules.map((part, index) => <mesh key={index} ref={node => refs.current[index] = node} material={index === 0 || index === 3 ? darkMaterial : material}>
      {part.shape === "core" ? <dodecahedronGeometry args={[0.72, 0]} /> : <boxGeometry args={[1, 1, 1]} />}
    </mesh>)}
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.82, 0.018, 8, 80]} /><meshStandardMaterial color="#4fa7a3" metalness={0.5} roughness={0.4} /></mesh>
    <mesh rotation={[0.4, 0.8, 0]}><torusGeometry args={[2.06, 0.012, 6, 80]} /><meshStandardMaterial color="#b8c0c5" metalness={0.35} roughness={0.5} /></mesh>
  </group>;
}

function Fallback() {
  return <svg className="assembly-fallback" viewBox="0 0 320 320" role="img" aria-label="Geometric modular object">
    <g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M160 42 212 72 212 132 160 162 108 132 108 72Z" /><path d="M160 162 212 132 264 162 264 222 212 252 160 222 108 252 56 222 56 162 108 132" /><path d="M160 42V162M212 72 160 162 108 72M56 162 160 222 264 162M108 252 160 162 212 252" /></g>
  </svg>;
}

export default function AssemblyScene() {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motion.matches);
    updateMotion();
    motion.addEventListener?.("change", updateMotion);
    const targets = ["top", "projects", "about", "experience", "skills", "ai", "contact"].map(id => document.getElementById(id)).filter(Boolean);
    const positions = targets.map(el => el.getBoundingClientRect().top + window.scrollY);
    const update = () => {
      if (motion.matches) { setProgress(1); return; }
      const anchor = window.scrollY + window.innerHeight * 0.48;
      let value = 0;
      if (anchor >= positions[positions.length - 1]) value = 1;
      else {
        for (let i = 0; i < positions.length - 1; i++) {
          if (anchor >= positions[i] && anchor < positions[i + 1]) {
            const segment = (anchor - positions[i]) / Math.max(1, positions[i + 1] - positions[i]);
            value = (i + segment) / (positions.length - 1);
            break;
          }
        }
      }
      setProgress(Math.max(0, Math.min(1, value)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { motion.removeEventListener?.("change", updateMotion); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <aside className="assembly-scene" aria-hidden="true">
    <div className="assembly-caption"><span>ASSEMBLY / {Math.round(progress * 100)}%</span><div className="assembly-progress"><i style={{ width: progress * 100 + "%" }} /></div></div>
    {reducedMotion ? <Fallback /> : <Canvas fallback={<Fallback />} dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 36 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}>
      <ambientLight intensity={1.3} /><directionalLight position={[4, 4, 6]} intensity={2} /><pointLight position={[-4, -3, 2]} intensity={1.1} color="#4fa7a3" />
      <Modules progress={progress} reducedMotion={reducedMotion} />
    </Canvas>}
  </aside>;
}
