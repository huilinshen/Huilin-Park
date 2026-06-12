"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { ParkDestination } from "@/data/projects";

const cabinAngles = [0, Math.PI / 3, (Math.PI * 2) / 3, Math.PI, (Math.PI * 4) / 3, (Math.PI * 5) / 3];

function Cabin({
  angle,
  radius,
  color,
}: {
  angle: number;
  radius: number;
  color: string;
}) {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <group position={[x, y, 0.04]}>
      <mesh castShadow position={[0, -0.08, 0]}>
        <boxGeometry args={[0.22, 0.16, 0.16]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.03, 0]}>
        <boxGeometry args={[0.28, 0.06, 0.18]} />
        <meshStandardMaterial color="#fff5d6" roughness={0.75} />
      </mesh>
    </group>
  );
}

export function FerrisWheel({ destination }: { destination: ParkDestination }) {
  const wheelRef = useRef<Group>(null);
  const spokeAngles = useMemo(() => cabinAngles.concat(cabinAngles.map((angle) => angle + Math.PI / 6)), []);

  useFrame((_, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z += delta * 0.22;
    }
  });

  return (
    <group scale={1.15}>
      <mesh castShadow receiveShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[1.25, 0.16, 0.9]} />
        <meshStandardMaterial color="#f7d892" roughness={0.85} />
      </mesh>

      <group position={[0, 0.72, 0]}>
        <mesh castShadow position={[-0.34, -0.34, 0]} rotation={[0, 0, -0.28]}>
          <boxGeometry args={[0.08, 0.88, 0.08]} />
          <meshStandardMaterial color={destination.accent} roughness={0.65} />
        </mesh>
        <mesh castShadow position={[0.34, -0.34, 0]} rotation={[0, 0, 0.28]}>
          <boxGeometry args={[0.08, 0.88, 0.08]} />
          <meshStandardMaterial color={destination.accent} roughness={0.65} />
        </mesh>
        <mesh castShadow position={[0, -0.72, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.12]} />
          <meshStandardMaterial color="#fff5d6" roughness={0.78} />
        </mesh>

        <group ref={wheelRef}>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.62, 0.025, 8, 64]} />
            <meshStandardMaterial color={destination.color} roughness={0.5} />
          </mesh>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.43, 0.018, 8, 64]} />
            <meshStandardMaterial color="#fff5d6" roughness={0.55} />
          </mesh>

          {spokeAngles.map((angle) => (
            <mesh
              key={angle}
              castShadow
              position={[Math.cos(angle) * 0.29, Math.sin(angle) * 0.29, 0]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.58, 0.018, 0.028]} />
              <meshStandardMaterial color="#fff5d6" roughness={0.65} />
            </mesh>
          ))}

          {cabinAngles.map((angle) => (
            <Cabin key={angle} angle={angle} radius={0.62} color={destination.color} />
          ))}
        </group>

        <mesh castShadow position={[0, 0, 0.04]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={destination.accent} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
