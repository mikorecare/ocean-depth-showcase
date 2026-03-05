"use client";

import { OceanZone, Creature } from "@/data/ocean-zones";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import CreatureModal from "./creature-modal";

interface CreatureGridProps {
  zone: OceanZone;
  zoneIndex: number;
}

interface Ball {
  id: string;
  creature: Creature;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  depth: number;
}

export default function CreatureGrid({ zone, zoneIndex }: CreatureGridProps) {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const getEmoji = (index: number) => {
    const emojis = ["☀️", "🌙", "✨", "🌑", "🦑"];
    return emojis[index];
  };

  // Initialize balls
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newBalls: Ball[] = zone.creatures.map((creature, idx) => ({
      id: `ball-${creature.name}-${idx}`,
      creature,
      x: Math.random() * (rect.width - 100),
      y: Math.random() * (rect.height - 100),
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      size: 90,
      depth: idx % 2 === 0 ? zone.depthFeet.min : zone.depthFeet.max,
    }));

    setBalls(newBalls);
  }, [zone.creatures, zoneIndex, zone.depthFeet.min, zone.depthFeet.max]);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!containerRef.current || balls.length === 0) return;

    const animate = () => {
      setBalls((prevBalls) => {
        return prevBalls.map((ball) => {
          let newX = ball.x + ball.vx;
          let newY = ball.y + ball.vy;
          let newVx = ball.vx;
          let newVy = ball.vy;

          // Bounce off walls
          if (newX <= 0) {
            newX = 0;
            newVx = Math.abs(ball.vx) * 0.95;
          } else if (newX >= dimensions.width - ball.size) {
            newX = dimensions.width - ball.size;
            newVx = -Math.abs(ball.vx) * 0.95;
          }

          if (newY <= 0) {
            newY = 0;
            newVy = Math.abs(ball.vy) * 0.95;
          } else if (newY >= dimensions.height - ball.size) {
            newY = dimensions.height - ball.size;
            newVy = -Math.abs(ball.vy) * 0.95;
          }

          // Add slight randomness
          if (Math.random() < 0.01) {
            newVx += (Math.random() - 0.5) * 0.2;
            newVy += (Math.random() - 0.5) * 0.2;
          }

          // Limit speed
          const maxSpeed = 4;
          if (Math.abs(newVx) > maxSpeed) newVx = Math.sign(newVx) * maxSpeed;
          if (Math.abs(newVy) > maxSpeed) newVy = Math.sign(newVy) * maxSpeed;

          return {
            ...ball,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, balls.length]);

  // Handle bubble click
  const handleBubbleClick = (creature: Creature) => {
    setSelectedCreature(creature);
  };

  const getNeonColor = () => {
    const colors = ["#00f0ff", "#3a86ff", "#9d4edd", "#c147e9", "#a05eff"];
    return colors[zoneIndex];
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
      >
        {/* Bouncing balls */}
        {balls.map((ball) => (
          <motion.div
            key={ball.id}
            className="absolute cursor-pointer"
            style={{
              left: ball.x,
              top: ball.y,
              width: ball.size,
              height: ball.size,
            }}
            whileHover={{ scale: 1.1 }}
            animate={{
              rotate: ball.vx * 5,
            }}
            transition={{
              type: "tween",
              ease: "linear",
              duration: 0.1,
            }}
            onClick={() => handleBubbleClick(ball.creature)}
          >
            {/* Bubble with creature - NOW SHOWING IMAGE! */}
            <div
              className="relative w-full h-full rounded-full overflow-hidden border-2"
              style={{
                borderColor: `${
                  zoneIndex === 0
                    ? "#00f0ff"
                    : zoneIndex === 1
                      ? "#3a86ff"
                      : zoneIndex === 2
                        ? "#9d4edd"
                        : zoneIndex === 3
                          ? "#c147e9"
                          : "#a05eff"
                }80`,
                boxShadow: `0 0 20px ${
                  zoneIndex === 0
                    ? "#00f0ff"
                    : zoneIndex === 1
                      ? "#3a86ff"
                      : zoneIndex === 2
                        ? "#9d4edd"
                        : zoneIndex === 3
                          ? "#c147e9"
                          : "#a05eff"
                }60`,
              }}
            >
              {/* Actual creature image */}
              {ball.creature.image ? (
                <Image
                  src={ball.creature.image}
                  alt={ball.creature.name}
                  fill
                  className="object-cover"
                  sizes="90px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-3xl">
                  {getEmoji(zoneIndex)}
                </div>
              )}

              {/* Bubble shine overlay */}
              <div className="absolute top-1 left-3 w-3 h-3 rounded-full bg-white/40 blur-[2px] z-10" />
            </div>
          </motion.div>
        ))}

        {/* Background bubbles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className="absolute rounded-full bg-white/5"
            style={{
              width: 40 + i * 20,
              height: 40 + i * 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <CreatureModal
        creature={selectedCreature}
        zone={zone}
        zoneIndex={zoneIndex}
        onClose={() => setSelectedCreature(null)}
      />
    </>
  );
}
