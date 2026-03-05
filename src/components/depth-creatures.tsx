"use client";

import { challengerDeep, OceanZone } from "@/data/ocean-zones";
import { useEffect, useRef, useState } from "react";
import CreatureGrid from "./depth/creature-grid";
import DepthIndicator from "./depth/depth-indicator";
import ZoneBackground from "./depth/zone-background";
import ZoneHeader from "./depth/zone-header";
import ZoneInfoCard from "./depth/zone-info-card";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSound, setCurrentSound] = useState<string>("/sounds/wave.mp3");
  const zoneChangeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Sound mapping based on zone index
  const getSoundForZone = (zoneIndex: number | null): string => {
    if (zoneIndex === null || zoneIndex === 0) return "/sounds/wave.mp3";
    if (zoneIndex === 1) return "/sounds/wave2.mp3";
    if (zoneIndex === 2 || zoneIndex === 3) return "/sounds/wave3.mp3";
    return "/sounds/wave3.mp3";
  };

  // Handle zone changes with debounce
  useEffect(() => {
    if (!audioRef.current || !audioPlaying || activeZone === null) return;

    // Clear previous timeout
    if (zoneChangeTimeout.current) {
      clearTimeout(zoneChangeTimeout.current);
    }

    // Set new timeout to change sound after scrolling stops
    zoneChangeTimeout.current = setTimeout(() => {
      const newSound = getSoundForZone(activeZone);

      if (newSound !== currentSound) {
        const wasPlaying = !audioRef.current?.paused;

        if (audioRef.current) {
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
      }
    }, 500); // Wait 500ms after scrolling stops before changing sound

    return () => {
      if (zoneChangeTimeout.current) {
        clearTimeout(zoneChangeTimeout.current);
      }
    };
  }, [activeZone, audioPlaying, currentSound]);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/sounds/wave.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const startAudio = () => {
      if (audioRef.current && !audioPlaying) {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
        setAudioPlaying(true);
      }
    };

    window.addEventListener("scroll", startAudio, { once: true });
    document.addEventListener("click", startAudio, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener("scroll", startAudio);
      document.removeEventListener("click", startAudio);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Fixed depth indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white text-xs py-2 px-4 flex justify-between items-center">
        <span className="flex flex-row items-center gap-2"><WavesIcon size={16}/> SURFACE (0m / 0ft)</span>
        <span id="depth-indicator" className="font-mono">
          0m / 0ft
        </span>
        <span className="flex flex-row gap-2 items-center"><Mountain size={16}/> 11,000m / 36,000ft</span>
      </div>

      {/* Zones */}
      <div className="relative">
        {sortedZones.map((zone, zoneIndex) => (
          <ZoneBackground key={zone.id} zone={zone} zoneIndex={zoneIndex}>
            <ZoneHeader zone={zone} zoneIndex={zoneIndex} />
            <ZoneInfoCard
              zone={zone}
              zoneIndex={zoneIndex}
              onVisible={setActiveZone}
            />
            <CreatureGrid zone={zone} zoneIndex={zoneIndex} />
            <DepthIndicator zone={zone} />
          </ZoneBackground>
        ))}

        {/* Challenger Deep - separate component later if needed */}
        <div className="relative h-screen bg-black flex items-center justify-center">
          {/* ... Challenger Deep content ... */}
        </div>
      </div>

      {/* Scroll progress */}
      <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded border border-white/20">
        <div>
          Depth: <span id="scroll-depth">0%</span>
        </div>
        <div className="w-32 h-1 bg-gray-700 mt-1">
          <div
            id="scroll-bar"
            className="h-full bg-blue-400"
            style={{ width: "0%" }}
          />
        </div>
      </div>

      {/* Scale note */}
      <div className="fixed bottom-4 right-4 z-50 bg-black/60 text-white/60 text-[8px] p-1 rounded">
        1px = 1ft scale
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const percent = (scrollY / maxScroll) * 100;
            document.getElementById('scroll-depth').textContent = Math.round(percent) + '%';
            document.getElementById('scroll-bar').style.width = percent + '%';
            
            const depthFeet = Math.round(scrollY);
            const depthMeters = Math.round(scrollY * 0.3048);
            document.getElementById('depth-indicator').textContent = depthMeters + 'm / ' + depthFeet + 'ft';
          });
        `,
        }}
      />
    </div>
  );
}
