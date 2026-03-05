"use client";

import { Creature, OceanZone } from "@/data/ocean-zones";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface CreatureModalProps {
  creature: Creature | null;
  zone: OceanZone;
  zoneIndex: number;
  onClose: () => void;
}

export default function CreatureModal({
  creature,
  zone,
  zoneIndex,
  onClose,
}: CreatureModalProps) {
  const getNeonColor = () => {
    const colors = ["#00f0ff", "#3a86ff", "#9d4edd", "#c147e9", "#a05eff"];
    return colors[zoneIndex];
  };

  const neonColor = getNeonColor();

  return (
    <AnimatePresence>
      {creature && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-[101]"
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{ width: "360px" }}
          >
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                background: "#0f1219",
                border: `2px solid ${neonColor}40`,
                boxShadow: `0 20px 40px -12px rgba(0,0,0,0.8), 0 0 30px ${neonColor}60`,
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              {/* Bubble shine */}
              <div
                className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(circle at 20% 20%, ${neonColor}30, transparent 70%)`,
                }}
              />

              {/* Floating bubbles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: `${10 + i * 8}px`,
                    height: `${10 + i * 8}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `${neonColor}20`,
                    filter: "blur(4px)",
                    zIndex: 0,
                  }}
                />
              ))}

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 flex items-center justify-center transition-all hover:scale-110"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9999px",
                  background: "rgba(0, 0, 0, 0.6)",
                  border: `1px solid ${neonColor}80`,
                  color: "white",
                  cursor: "pointer",
                  backdropFilter: "blur(4px)",
                  boxShadow: `0 0 15px ${neonColor}`,
                }}
              >
                <X size={18} />
              </button>

              <div
                className="relative w-full"
                style={{
                  height: "200px",
                  background: "#0a0c12", // Dark background
                  borderBottom: `1px solid ${neonColor}30`,
                }}
              >
                {/* Background gradient to make it look underwater */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${neonColor}15, #0a0c12)`,
                  }}
                />

                {creature.image ? (
                  <Image
                    src={creature.image}
                    alt={creature.name}
                    fill
                    className="object-contain p-4"
                    sizes="360px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl opacity-30">?</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                {/* Title and depth */}
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className="text-2xl font-bold"
                    style={{
                      color: "white",
                      textShadow: `0 0 10px ${neonColor}`,
                    }}
                  >
                    {creature.name}
                  </h3>
                  <span
                    className="text-xs font-mono px-2 py-1 rounded-full"
                    style={{
                      background: "rgba(0, 0, 0, 0.5)",
                      border: `1px solid ${neonColor}40`,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {zone.depthFeet.min}-{zone.depthFeet.max}ft
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-sm mb-5 leading-relaxed"
                  style={{ color: "rgba(255, 255, 255, 0.8)" }}
                >
                  {creature.description}
                </p>

                {/* Fun fact */}
                <div
                  className="p-4 rounded-xl mb-2"
                  style={{
                    background: `${neonColor}08`,
                    border: `1px solid ${neonColor}30`,
                    boxShadow: `0 4px 12px rgba(0,0,0,0.2)`,
                  }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-wider block mb-1"
                    style={{ color: neonColor }}
                  >
                    ✦ Fun Fact
                  </span>
                  <p
                    className="text-sm italic"
                    style={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {creature.fact}
                  </p>
                </div>

                {/* Stats */}
                <div
                  className="flex justify-between text-xs mt-4 pt-3 border-t"
                  style={{ borderColor: `${neonColor}20` }}
                >
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>
                    Depth zone
                  </span>
                  <span className="font-mono" style={{ color: neonColor }}>
                    {zone.depthRange}
                  </span>
                </div>
              </div>

              {/* Bottom glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${neonColor}, transparent)`,
                  filter: "blur(2px)",
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
