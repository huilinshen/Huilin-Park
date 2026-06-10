"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { ParkDestination } from "@/data/projects";

function Petal({
  color,
  side,
  hovered,
}: {
  color: string;
  side: -1 | 0 | 1;
  hovered: boolean;
}) {
  const petalRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!petalRef.current) {
      return;
    }

    const closed = side === 0 ? 0 : side * 0.24;
    const open = side === 0 ? 0 : side * 0.78;
    const targetZ = hovered ? open : closed;
    const targetX = hovered ? -0.45 : -0.12;

    petalRef.current.rotation.z += (targetZ - petalRef.current.rotation.z) * delta * 7;
    petalRef.current.rotation.x += (targetX - petalRef.current.rotation.x) * delta * 7;
  });

  return (
    <group ref={petalRef} position={[side * 0.16, 0.86, 0]} rotation={[side === 0 ? -0.04 : -0.12, 0, side * 0.24]}>
      <mesh castShadow position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
        <meshStandardMaterial color={color} roughness={0.62} />
      </mesh>
    </group>
  );
}

export function TulipRide({
  destination,
  hovered,
}: {
  destination: ParkDestination;
  hovered: boolean;
}) {
  const rideRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (rideRef.current) {
      const targetY = hovered ? 0.08 : 0;
      rideRef.current.position.y += (targetY - rideRef.current.position.y) * delta * 5;
      rideRef.current.rotation.y += delta * (hovered ? 0.45 : 0.12);
    }
  });

  return (
    <group ref={rideRef}>
      <mesh receiveShadow castShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.58, 0.7, 0.16, 16]} />
        <meshStandardMaterial color="#f7d892" roughness={0.86} />
      </mesh>

      <mesh castShadow position={[0, 0.47, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 0.78, 10]} />
        <meshStandardMaterial color="#4f9b62" roughness={0.76} />
      </mesh>

      <mesh castShadow position={[-0.17, 0.42, 0]} rotation={[0.1, 0, 0.95]}>
        <sphereGeometry args={[0.18, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#6fbd79" roughness={0.78} />
      </mesh>
      <mesh castShadow position={[0.19, 0.5, 0]} rotation={[0.1, 0, -0.95]}>
        <sphereGeometry args={[0.2, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#6fbd79" roughness={0.78} />
      </mesh>

      <Petal color={destination.color} side={-1} hovered={hovered} />
      <Petal color="#ffc1d4" side={0} hovered={hovered} />
      <Petal color={destination.accent} side={1} hovered={hovered} />

      <mesh castShadow position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffe1ec" roughness={0.65} />
      </mesh>
    </group>
  );
}
