"use client";

import { OceanZone } from "@/data/ocean-zones";
import { useRef, useEffect } from "react";

interface ZoneBackgroundProps {
  zone: OceanZone;
  zoneIndex: number;
  children: React.ReactNode;
  onZoneRef?: (ref: HTMLDivElement | null, index: number) => void;
}

const getZoneGradient = (zoneIndex: number) => {
  if (zoneIndex === 0) {
    return `linear-gradient(180deg, 
      #4A9FC1 0%, #3A7F9E 30%, #2A5F7A 60%, #1F4A6E 90%, #1F4A6E 100%
    )`;
  } else if (zoneIndex === 1) {
    return `linear-gradient(180deg, 
      #1F4A6E 0%, #153B4F 30%, #0E2C3A 60%, #0A1A2A 90%, #0A1A2A 100%
    )`;
  } else if (zoneIndex === 2) {
    return `linear-gradient(180deg, 
      #0A1A2A 0%, #071521 30%, #05121C 60%, #030A12 90%, #030A12 100%
    )`;
  } else if (zoneIndex === 3) {
    return `linear-gradient(180deg, 
      #030A12 0%, #02080F 30%, #02060C 60%, #010509 90%, #010509 100%
    )`;
  } else {
    return `linear-gradient(180deg, 
      #010509 0%, #010407 30%, #010305 60%, #000000 90%, #000000 100%
    )`;
  }
};

export default function ZoneBackground({
  zone,
  zoneIndex,
  children,
  onZoneRef,
}: ZoneBackgroundProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const hasNotifiedRef = useRef(false);

  // Only notify parent once when ref is available
  useEffect(() => {
    if (zoneRef.current && onZoneRef && !hasNotifiedRef.current) {
      onZoneRef(zoneRef.current, zoneIndex);
      hasNotifiedRef.current = true;
    }
  }, [zoneIndex, onZoneRef]);

  return (
    <div
      ref={zoneRef}
      data-zone-index={zoneIndex}
      className="relative overflow-hidden"
      style={{
        height: "200vh",
        background: getZoneGradient(zoneIndex),
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            transparent 0px,
            rgba(255,255,255,${0.1 - zoneIndex * 0.015}) 2px,
            transparent 10px,
            rgba(255,255,255,${0.05 - zoneIndex * 0.01}) 15px,
            transparent 30px
          )`,
          pointerEvents: "none",
          opacity: Math.max(0.05, 0.2 - zoneIndex * 0.04),
        }}
      />

      {children}
    </div>
  );
}
