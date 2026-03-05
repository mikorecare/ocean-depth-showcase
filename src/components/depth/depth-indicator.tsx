"use client";

import { OceanZone } from "@/data/ocean-zones";

interface DepthIndicatorProps {
  zone: OceanZone;
}

export default function DepthIndicator({ zone }: DepthIndicatorProps) {
  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 p-1 rounded text-[8px] text-white/70 font-mono">
      <div>{zone.depthFeet.max}ft</div>
      <div className="h-16 w-1 bg-gray-700 mx-auto my-1">
        <div className="w-full bg-blue-400 h-1/2"></div>
      </div>
      <div>{zone.depthFeet.min}ft</div>
    </div>
  );
}
