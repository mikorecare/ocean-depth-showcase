"use client";

import { OceanZone, Creature } from "@/data/ocean-zones";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
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
  gridCol: number;
  gridRow: number;
}

export default function CreatureGrid({ zone, zoneIndex }: CreatureGridProps) {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(
    null,
  );
  const [backgroundBubbles, setBackgroundBubbles] = useState<
    Array<{
      width: number;
      height: number;
      left: string;
      top: string;
      duration: number;
      delay: number;
    }>
  >([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMounted = useRef(true);

  const getEmoji = (index: number) => {
    const emojis = ["☀️", "🌙", "✨", "🌑", "🦑"];
    return emojis[index];
  };

  // Grid configuration
  const gridCols = 3;

  // Generate background bubbles only on client
  useEffect(() => {
    const bubbles = [...Array(6)].map((_, i) => ({
      width: 40 + i * 20,
      height: 40 + i * 20,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 10 + i * 2,
      delay: i * 0.5,
    }));
    setBackgroundBubbles(bubbles);
  }, []);

  // Initialize balls
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const cellWidth = rect.width / gridCols;
    const cellHeight = cellWidth;

    const newBalls: Ball[] = zone.creatures.map((creature, idx) => {
      const col = idx % gridCols;
      const row = Math.floor(idx / gridCols);

      const cellMinX = col * cellWidth;
      const cellMaxX = (col + 1) * cellWidth - 90;
      const cellMinY = row * cellHeight;
      const cellMaxY = (row + 1) * cellHeight - 90;

      return {
        id: `ball-${creature.name}-${idx}`,
        creature,
        x: cellMinX + Math.random() * (cellMaxX - cellMinX),
        y: cellMinY + Math.random() * (cellMaxY - cellMinY),
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: 90,
        depth: idx % 2 === 0 ? zone.depthFeet.min : zone.depthFeet.max,
        gridCol: col,
        gridRow: row,
      };
    });

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

  // Animation loop - FIXED
  useEffect(() => {
    if (!containerRef.current || balls.length === 0 || dimensions.width === 0)
      return;

    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;

    const animate = (currentTime: number) => {
      if (!isMounted.current) return;

      // Throttle animation to 60fps
      if (currentTime - lastTime < interval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime;

      setBalls((prevBalls) => {
        return prevBalls.map((ball) => {
          const cellWidth = dimensions.width / gridCols;
          const cellHeight = cellWidth;

          const cellMinX = ball.gridCol * cellWidth;
          const cellMaxX = (ball.gridCol + 1) * cellWidth - ball.size;
          const cellMinY = ball.gridRow * cellHeight;
          const cellMaxY = (ball.gridRow + 1) * cellHeight - ball.size;

          let newX = ball.x + ball.vx;
          let newY = ball.y + ball.vy;
          let newVx = ball.vx;
          let newVy = ball.vy;

          if (newX <= cellMinX) {
            newX = cellMinX;
            newVx = Math.abs(ball.vx) * 0.95;
          } else if (newX >= cellMaxX) {
            newX = cellMaxX;
            newVx = -Math.abs(ball.vx) * 0.95;
          }

          if (newY <= cellMinY) {
            newY = cellMinY;
            newVy = Math.abs(ball.vy) * 0.95;
          } else if (newY >= cellMaxY) {
            newY = cellMaxY;
            newVy = -Math.abs(ball.vy) * 0.95;
          }

          // Add slight randomness - but less frequently
          if (Math.random() < 0.005) {
            newVx += (Math.random() - 0.5) * 0.1;
            newVy += (Math.random() - 0.5) * 0.1;
          }

          // Limit speed
          const maxSpeed = 3;
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
      isMounted.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [dimensions, balls.length]); // Remove 'balls' from dependencies

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
            {/* Bubble with creature */}
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
        {backgroundBubbles.map((bubble, i) => (
          <motion.div
            key={`bg-${i}`}
            className="absolute rounded-full bg-white/5"
            style={{
              width: bubble.width,
              height: bubble.height,
              left: bubble.left,
              top: bubble.top,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bubble.delay,
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
