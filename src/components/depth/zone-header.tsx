"use client";

import { OceanZone } from "@/data/ocean-zones";

interface ZoneHeaderProps {
  zone: OceanZone;
  zoneIndex: number;
}

const getHeaderColor = (zoneIndex: number) => {
  const colors = ["#4A9FC1", "#1F4A6E", "#0A1A2A", "#030A12", "#010509"];
  return colors[zoneIndex];
};

export default function ZoneHeader({ zone, zoneIndex }: ZoneHeaderProps) {
  return (
    <div
      className="sticky top-0 z-40 flex items-center"
      style={{
        background: getHeaderColor(zoneIndex),
        height: "2vh",
        minHeight: "20px",
        maxHeight: "30px",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex justify-between items-center w-full px-4">
        <span className="text-xs font-bold text-white drop-shadow">
          {zone.name} · {zone.depthFeet.min}ft - {zone.depthFeet.max}ft
        </span>
        <span className="text-[8px] text-white/80 font-mono">
          {zone.depthMeters.min}m ↓
        </span>
      </div>
    </div>
  );
}
