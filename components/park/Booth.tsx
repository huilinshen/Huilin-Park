"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Text, useCursor } from "@react-three/drei";
import type { ParkDestination } from "@/data/projects";
import { DestinationModel } from "@/components/park/DestinationModel";
import { FerrisWheel } from "@/components/park/FerrisWheel";
import { IceCreamTruck } from "@/components/park/IceCreamTruck";
import { TulipRide } from "@/components/park/TulipRide";

export function Booth({ destination }: { destination: ParkDestination }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const isFerrisWheel = destination.landmark === "ferris-wheel";
  const isTulip = destination.landmark === "tulip";
  const isIceCreamTruck = destination.landmark === "ice-cream-truck";
  const labelPosition: [number, number, number] = isFerrisWheel
    ? [0, 1.66, -0.105]
    : isTulip
      ? [0, 1.2, -0.105]
      : isIceCreamTruck
        ? [0, 1.05, -0.105]
        : [0, 0.88, -0.105];
  const hoverLabelPosition: [number, number, number] = isFerrisWheel
    ? [0, 1.92, 0]
    : isTulip
      ? [0, 1.5, 0]
      : isIceCreamTruck
        ? [0, 1.42, 0]
        : [0, 1.28, 0];

  const openDestination = () => {
    if (destination.href.startsWith("mailto:")) {
      window.location.href = destination.href;
      return;
    }

    router.push(destination.href);
  };

  return (
    <group position={destination.position}>
      <group
        onClick={openDestination}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.06 : 1}
      >
        {destination.modelPath ? (
          <DestinationModel path={destination.modelPath} />
        ) : isFerrisWheel ? (
          <FerrisWheel destination={destination} />
        ) : isTulip ? (
          <TulipRide destination={destination} hovered={hovered} />
        ) : isIceCreamTruck ? (
          <IceCreamTruck destination={destination} hovered={hovered} />
        ) : (
          <group>
            <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
              <boxGeometry args={[1.15, 0.32, 1.05]} />
              <meshStandardMaterial color={destination.color} roughness={0.82} />
            </mesh>

            <mesh castShadow position={[0, 0.55, 0]}>
              <coneGeometry args={[0.78, 0.58, 4]} />
              <meshStandardMaterial color={destination.accent} roughness={0.76} />
            </mesh>

            <mesh castShadow position={[0, 0.88, -0.06]}>
              <boxGeometry args={[0.92, 0.32, 0.08]} />
              <meshStandardMaterial color="#fff8df" roughness={0.7} />
            </mesh>
          </group>
        )}
      </group>

      <Text
        color="#33291f"
        fontSize={0.14}
        fontWeight={800}
        maxWidth={0.82}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        position={labelPosition}
      >
        {destination.label}
      </Text>

      {hovered ? (
        <Text
          color="#33291f"
          fontSize={0.11}
          maxWidth={1.4}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          position={hoverLabelPosition}
        >
          {destination.title}
        </Text>
      ) : null}
    </group>
  );
}
