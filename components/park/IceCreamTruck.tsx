"use client";

import { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { ParkDestination } from "@/data/projects";

function Wheel({ x }: { x: number }) {
  return (
    <mesh castShadow position={[x, 0.13, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.12, 0.12, 0.08, 18]} />
      <meshStandardMaterial color="#202018" roughness={0.72} />
    </mesh>
  );
}

function IceCream({ hovered }: { hovered: boolean }) {
  const iceCreamRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!iceCreamRef.current) {
      return;
    }

    const targetY = hovered ? 0.92 : 0.52;
    const targetScale = hovered ? 1 : 0.18;

    iceCreamRef.current.position.y += (targetY - iceCreamRef.current.position.y) * delta * 8;
    iceCreamRef.current.scale.x += (targetScale - iceCreamRef.current.scale.x) * delta * 8;
    iceCreamRef.current.scale.y += (targetScale - iceCreamRef.current.scale.y) * delta * 8;
    iceCreamRef.current.scale.z += (targetScale - iceCreamRef.current.scale.z) * delta * 8;
    iceCreamRef.current.rotation.y += delta * (hovered ? 1.8 : 0.4);
  });

  return (
    <group ref={iceCreamRef} position={[0.24, 0.52, -0.2]} scale={0.18}>
      <mesh castShadow position={[0, -0.12, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.12, 0.28, 12]} />
        <meshStandardMaterial color="#d49a48" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#ff9bb2" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0.07, 0.2, 0.02]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#fff5d6" roughness={0.55} />
      </mesh>
    </group>
  );
}

export function IceCreamTruck({
  destination,
  hovered,
}: {
  destination: ParkDestination;
  hovered: boolean;
}) {
  const truckRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!truckRef.current) {
      return;
    }

    const targetY = hovered ? 0.05 : 0;
    truckRef.current.position.y += (targetY - truckRef.current.position.y) * delta * 6;
  });

  return (
    <group ref={truckRef} scale={1.08}>
      <mesh castShadow receiveShadow position={[0, 0.27, 0]}>
        <boxGeometry args={[1.28, 0.45, 0.82]} />
        <meshStandardMaterial color="#fff5d6" roughness={0.72} />
      </mesh>

      <mesh castShadow position={[-0.34, 0.58, 0]}>
        <boxGeometry args={[0.54, 0.34, 0.78]} />
        <meshStandardMaterial color={destination.color} roughness={0.7} />
      </mesh>

      <mesh castShadow position={[0.3, 0.58, 0]}>
        <boxGeometry args={[0.56, 0.34, 0.78]} />
        <meshStandardMaterial color="#ffdbe6" roughness={0.68} />
      </mesh>

      <mesh castShadow position={[0.3, 0.82, -0.06]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.68, 0.08, 0.88]} />
        <meshStandardMaterial color={destination.accent} roughness={0.68} />
      </mesh>

      <mesh castShadow position={[0.32, 0.58, -0.43]}>
        <boxGeometry args={[0.36, 0.22, 0.04]} />
        <meshStandardMaterial color="#bfe7ff" roughness={0.44} />
      </mesh>

      <mesh castShadow position={[-0.36, 0.57, -0.43]}>
        <boxGeometry args={[0.34, 0.2, 0.04]} />
        <meshStandardMaterial color="#bfe7ff" roughness={0.44} />
      </mesh>

      <mesh castShadow position={[0.02, 0.84, -0.46]}>
        <boxGeometry args={[1.16, 0.12, 0.08]} />
        <meshStandardMaterial color="#ff9bb2" roughness={0.68} />
      </mesh>

      <Wheel x={-0.42} />
      <Wheel x={0.43} />
      <IceCream hovered={hovered} />

      <Text
        color="#202018"
        fontSize={0.12}
        fontWeight={500}
        maxWidth={0.62}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        position={[0.02, 0.31, -0.435]}
      >
        ABOUT
      </Text>
    </group>
  );
}
