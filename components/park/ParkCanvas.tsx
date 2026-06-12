"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { ParkScene } from "@/components/park/ParkScene";

export function ParkCanvas({
  onHoverDestination,
}: {
  onHoverDestination?: (title: string | null) => void;
}) {
  return (
    <Canvas
      camera={{ position: [4.8, 4.2, 6.2], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true }}
      shadows
      className="h-full min-h-[620px] w-full"
    >
      <color attach="background" args={["#bfe7ff"]} />
      <ambientLight intensity={0.8} />
      <directionalLight
        castShadow
        intensity={1.8}
        position={[3.5, 6, 4]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ParkScene onHoverDestination={onHoverDestination} />
      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        maxDistance={8}
        minDistance={4}
        maxPolarAngle={Math.PI / 2.25}
        minPolarAngle={Math.PI / 5}
        target={[0, 0.3, 0]}
      />
    </Canvas>
  );
}
