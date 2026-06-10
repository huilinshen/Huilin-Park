"use client";

import { Text } from "@react-three/drei";
import { parkDestinations } from "@/data/projects";
import { Booth } from "@/components/park/Booth";

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.7, 8]} />
        <meshStandardMaterial color="#8f633a" />
      </mesh>
      <mesh castShadow position={[0, 0.9, 0]}>
        <coneGeometry args={[0.45, 0.95, 8]} />
        <meshStandardMaterial color="#5e9c64" />
      </mesh>
    </group>
  );
}

function Path() {
  return (
    <group position={[0, 0.018, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.75, 48]} />
        <meshStandardMaterial color="#f7d892" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.004, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.1, 2.4, 0.02]} />
        <meshStandardMaterial color="#f7d892" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function ParkScene() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.3, 64]} />
        <meshStandardMaterial color="#95d27a" roughness={0.95} />
      </mesh>
      <Path />

      {parkDestinations.map((destination) => (
        <Booth key={destination.id} destination={destination} />
      ))}

      <Tree position={[-3.15, 0, -1.5]} />
      <Tree position={[3.05, 0, -1.55]} />
      <Tree position={[-3.25, 0, 1.55]} />
      <Tree position={[3.25, 0, 1.4]} />

      <Text
        color="#3d392f"
        fontSize={0.22}
        fontWeight={500}
        position={[0, 0.08, 2.42]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        Huilin Park
      </Text>
    </group>
  );
}
