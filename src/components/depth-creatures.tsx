"use client";

import { challengerDeep, OceanZone } from "@/data/ocean-zones";
import { useEffect, useRef, useState, useCallback } from "react";
import CreatureGrid from "./depth/creature-grid";
import DepthIndicator from "./depth/depth-indicator";
import ZoneBackground from "./depth/zone-background";
import ZoneHeader from "./depth/zone-header";
import ZoneInfoCard from "./depth/zone-info-card/zone-info-card";
import { Mountain, WavesIcon } from "lucide-react";

interface DepthCreaturesProps {
  zones: OceanZone[];
}

export default function DepthCreatures({ zones }: DepthCreaturesProps) {
  const sortedZones = [...zones].sort(
    (a, b) => a.depthMeters.min - b.depthMeters.max,
  );
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentDepth, setCurrentDepth] = useState({ meters: 0, feet: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSound, setCurrentSound] = useState<string>("/sounds/wave.mp3");
  const [zoneRefs, setZoneRefs] = useState<(HTMLDivElement | null)[]>([]);
  const zoneChangeTimeout = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);
  const refsInitialized = useRef(false);

  // Sound mapping based on zone index
  const getSoundForZone = useCallback((zoneIndex: number | null): string => {
    if (zoneIndex === null || zoneIndex === 0) return "/sounds/wave.mp3";
    if (zoneIndex === 1) return "/sounds/wave2.mp3";
    if (zoneIndex === 2 || zoneIndex === 3) return "/sounds/wave3.mp3";
    return "/sounds/wave3.mp3";
  }, []);

  // Handle zone changes with debounce
  useEffect(() => {
    if (!audioRef.current || !audioPlaying || activeZone === null) return;

    if (zoneChangeTimeout.current) {
      clearTimeout(zoneChangeTimeout.current);
    }

    zoneChangeTimeout.current = setTimeout(() => {
      if (!mountedRef.current) return;

      const newSound = getSoundForZone(activeZone);

      if (newSound !== currentSound && audioRef.current) {
        const wasPlaying = !audioRef.current.paused;

        audioRef.current.src = newSound;
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        setCurrentSound(newSound);

        if (wasPlaying) {
          audioRef.current
            .play()
            .catch((e) => console.log("Audio play failed:", e));
        }
      }
    }, 500);

    return () => {
      if (zoneChangeTimeout.current) {
        clearTimeout(zoneChangeTimeout.current);
      }
    };
  }, [activeZone, audioPlaying, currentSound, getSoundForZone]);

  // Initialize audio and mounted state
  useEffect(() => {
    setMounted(true);

    audioRef.current = new Audio("/sounds/wave.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const startAudio = () => {
      if (audioRef.current && !audioPlaying && mountedRef.current) {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
        setAudioPlaying(true);
      }
    };

    window.addEventListener("scroll", startAudio, { once: true });
    document.addEventListener("click", startAudio, { once: true });

    return () => {
      mountedRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener("scroll", startAudio);
      document.removeEventListener("click", startAudio);
    };
  }, []);

  // Handle scroll updates
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const percent = Math.min(100, (scrollY / maxScroll) * 100);

      setScrollPercent(percent);

      // Calculate depth based on scroll percentage (max depth 36,000ft)
      const depthFeet = Math.round((percent / 100) * 36000);
      const depthMeters = Math.round(depthFeet * 0.3048);

      setCurrentDepth({ meters: depthMeters, feet: depthFeet });
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Initialize zoneRefs array once
  useEffect(() => {
    if (!refsInitialized.current) {
      setZoneRefs(new Array(sortedZones.length).fill(null));
      refsInitialized.current = true;
    }
  }, [sortedZones.length]);

  // Handle zone ref - memoized with useCallback
  const handleZoneRef = useCallback(
    (ref: HTMLDivElement | null, index: number) => {
      setZoneRefs((prev) => {
        if (prev[index] === ref) return prev;
        const newRefs = [...prev];
        newRefs[index] = ref;
        return newRefs;
      });
    },
    [],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full">
        <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white text-xs py-2 px-4 flex justify-between items-center">
          <span className="flex flex-row items-center gap-2">
            <WavesIcon size={16} /> SURFACE (0m / 0ft)
          </span>
          <span className="font-mono">0m / 0ft</span>
          <span className="flex flex-row gap-2 items-center">
            <Mountain size={16} /> 11,000m / 36,000ft
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Fixed depth indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white text-xs py-2 px-4 flex justify-between items-center">
        <span className="flex flex-row items-center gap-2">
          <WavesIcon size={16} /> SURFACE (0m / 0ft)
        </span>
        <span className="font-mono">
          {currentDepth.meters}m / {currentDepth.feet}ft
        </span>
        <span className="flex flex-row gap-2 items-center">
          <Mountain size={16} /> 11,000m / 36,000ft
        </span>
      </div>

      {/* Zones */}
      <div className="relative">
        {sortedZones.map((zone, zoneIndex) => (
          <ZoneBackground
            key={zone.id}
            zone={zone}
            zoneIndex={zoneIndex}
            onZoneRef={handleZoneRef}
          >
            <ZoneHeader zone={zone} zoneIndex={zoneIndex} />
            <ZoneInfoCard
              zone={zone}
              zoneIndex={zoneIndex}
              onVisible={setActiveZone}
              zoneContainerRef={zoneRefs[zoneIndex]}
            />
            <CreatureGrid zone={zone} zoneIndex={zoneIndex} />
            <DepthIndicator zone={zone} />
          </ZoneBackground>
        ))}

        <div className="relative h-screen bg-black flex items-center justify-center">
          {/* ... Challenger Deep content ... */}
        </div>
      </div>

      {/* Scroll progress */}
      <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded border border-white/20">
        <div>
          Depth: <span>{Math.round(scrollPercent)}%</span>
        </div>
        <div className="w-32 h-1 bg-gray-700 mt-1">
          <div
            className="h-full bg-blue-400 transition-all duration-150"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </div>

      {/* Scale note */}
      <div className="fixed bottom-4 right-4 z-50 bg-black/60 text-white/60 text-[8px] p-1 rounded">
        1px = 1ft scale
      </div>
    </div>
  );
}
