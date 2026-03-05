"use client";

import { OceanZone } from "@/data/ocean-zones";
import { motion, useInView } from "framer-motion";
import { Fish, EyeClosed, Ship, Shrimp, FishSymbol } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface ZoneInfoCardProps {
  zone: OceanZone;
  zoneIndex: number;
  onVisible: (index: number | null) => void;
}

const getNeonColor = (zoneIndex: number) => {
  const colors = [
    "#00f0ff", // Cyan neon for Sunlight
    "#3a86ff", // Blue neon for Twilight
    "#9d4edd", // Purple neon for Midnight
    "#c147e9", // Brighter magenta for Abyss
    "#a05eff", // Brighter violet for Trenches
  ];
  return colors[zoneIndex];
};

const getGlassColor = (zoneIndex: number) => {
  const colors = [
    "rgba(0, 240, 255, 0.2)",
    "rgba(58, 134, 255, 0.2)",
    "rgba(157, 78, 221, 0.2)",
    "rgba(193, 71, 233, 0.2)",
    "rgba(160, 94, 255, 0.2)",
  ];
  return colors[zoneIndex];
};

export default function ZoneInfoCard({
  zone,
  zoneIndex,
  onVisible,
}: ZoneInfoCardProps) {
  const ref = useRef(null);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const isInView = useInView(ref, {
    amount: 0.3,
    margin: "0px 0px 200px 0px",
  });

  const neonColor = getNeonColor(zoneIndex);
  const glassColor = getGlassColor(zoneIndex);

  // Mark as viewed once it's been in view (only if not dismissed)
  useEffect(() => {
    if (isInView && !hasBeenViewed && !isDismissed) {
      setHasBeenViewed(true);
    }
  }, [isInView, hasBeenViewed, isDismissed]);

  // Handle visibility for parent
  useEffect(() => {
    if (!isDismissed && isInView) {
      onVisible(zoneIndex);
    } else {
      onVisible(null);
    }
  }, [isInView, zoneIndex, onVisible, isDismissed]);

  // Handle close button click
  const handleClose = () => {
    setIsDismissed(true);
    setHasBeenViewed(false);
    onVisible(null);
  };

  // Reset dismissed state when zone changes
  useEffect(() => {
    setIsDismissed(false);
  }, [zoneIndex]);

  // Determine if card should be visible
  const shouldShow = !isDismissed && (isInView || hasBeenViewed);

  return (
    <>
      {/* Trigger div */}
      <div
        ref={ref}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "10vh",
          height: "80vh",
          pointerEvents: "none",
          zIndex: 100,
        }}
      />

      {/* Card */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: "20%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          width: "91.666667%",
          maxWidth: "42rem",
          pointerEvents: shouldShow ? "auto" : "none",
        }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={
          shouldShow
            ? {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 90,
                  delay: 0.1,
                },
              }
            : {
                opacity: 0,
                scale: 0.8,
                y: 50,
                transition: { duration: 0.3 },
              }
        }
      >
        {/* Outer glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "32px",
            filter: "blur(24px)",
            background: neonColor,
            opacity: 0.25,
            zIndex: -10,
          }}
        />

        {/* Main card */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "32px",
            backdropFilter: "blur(12px)",
            border: `2px solid ${neonColor}80`,
            background: `linear-gradient(135deg, ${glassColor}, rgba(0,0,0,0.9))`,
            boxShadow: `
              0 25px 50px -12px rgba(0,0,0,0.9),
              0 0 50px ${neonColor}80,
              inset 0 0 30px ${neonColor}40
            `,
          }}
        >
          {/* Animated glow lines */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.4,
            }}
            animate={{
              background: [
                `radial-gradient(circle at 20% 20%, ${neonColor}90, transparent 50%)`,
                `radial-gradient(circle at 80% 80%, ${neonColor}90, transparent 50%)`,
                `radial-gradient(circle at 20% 80%, ${neonColor}90, transparent 50%)`,
                `radial-gradient(circle at 80% 20%, ${neonColor}90, transparent 50%)`,
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                borderRadius: "9999px",
                width: `${Math.random() * 10 + 1}px`,
                height: `${Math.random() * 10 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: neonColor,
                boxShadow: `0 0 25px ${neonColor}`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.3, 0.9, 0.3],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: Math.random() * 6 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}

          {/* Close button */}
          <motion.button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              zIndex: 30,
              width: "2rem",
              height: "2rem",
              borderRadius: "9999px",
              background: "rgba(0,0,0,0.5)",
              border: `1px solid ${neonColor}60`,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.25rem",
              backdropFilter: "blur(4px)",
              boxShadow: `0 0 15px ${neonColor}`,
            }}
            whileHover={{
              scale: 1.1,
              background: "rgba(0,0,0,0.7)",
              borderColor: neonColor,
              boxShadow: `0 0 25px ${neonColor}`,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Close"
          >
            ✕
          </motion.button>

          {/* Content container - only render if not dismissed */}
          {shouldShow && (
            <div
              style={{
                position: "relative",
                zIndex: 20,
                padding: "2rem",
                color: "white",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  {/* Icon */}
                  <motion.div
                    style={{
                      width: "4rem",
                      height: "4rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "9999px",
                      background: `radial-gradient(circle, ${neonColor}40, transparent 70%)`,
                      boxShadow: `0 0 30px ${neonColor}`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${neonColor}`,
                        `0 0 40px ${neonColor}`,
                        `0 0 20px ${neonColor}`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {zoneIndex === 0 && <Ship size={36} color="white" />}
                    {zoneIndex === 1 && <Shrimp size={36} color="white" />}
                    {zoneIndex === 2 && <Fish size={36} color="white" />}
                    {zoneIndex === 3 && <FishSymbol size={36} color="white" />}
                    {zoneIndex === 4 && <EyeClosed size={36} color="white" />}
                  </motion.div>

                  <div>
                    <motion.h3
                      style={{
                        fontSize: "1.875rem",
                        fontWeight: "bold",
                        color: "white",
                        textShadow: `0 0 15px ${neonColor}`,
                        margin: 0,
                      }}
                      animate={{
                        textShadow: [
                          `0 0 15px ${neonColor}`,
                          `0 0 30px ${neonColor}`,
                          `0 0 15px ${neonColor}`,
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {zone.name}
                    </motion.h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.875rem",
                        margin: 0,
                      }}
                    >
                      {zone.scientificName}
                    </p>
                  </div>
                </div>

                {/* Depth chip */}
                <motion.div
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontFamily: "monospace",
                    background: "rgba(0,0,0,0.7)",
                    border: `2px solid ${neonColor}`,
                    boxShadow: `0 0 20px ${neonColor}`,
                    color: neonColor,
                    whiteSpace: "nowrap",
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 15px ${neonColor}`,
                      `0 0 30px ${neonColor}`,
                      `0 0 15px ${neonColor}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {zone.depthFeet.min}ft
                </motion.div>
              </div>

              {/* Description */}
              <motion.div
                style={{
                  marginBottom: "1.5rem",
                  padding: "1.25rem",
                  borderRadius: "1rem",
                  background: "rgba(0,0,0,0.6)",
                  borderLeft: `4px solid ${neonColor}`,
                  boxShadow: `0 0 20px ${neonColor}30`,
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={shouldShow ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <p
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.875rem",
                    lineHeight: "1.625",
                    margin: 0,
                  }}
                >
                  {zone.description}
                </p>
              </motion.div>

              {/* Facts grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                {zone.facts.map((fact, idx) => (
                  <motion.div
                    key={idx}
                    style={{
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      background: "rgba(0,0,0,0.5)",
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.75rem",
                      border: `1px solid ${neonColor}40`,
                    }}
                    whileHover={{
                      scale: 1.02,
                      borderColor: neonColor,
                      boxShadow: `0 0 20px ${neonColor}60`,
                    }}
                  >
                    {fact}
                  </motion.div>
                ))}
              </div>

              {/* Light meter */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.75rem",
                  }}
                >
                  Light
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "0.5rem",
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: "9999px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    style={{
                      height: "100%",
                      borderRadius: "9999px",
                      background: `linear-gradient(90deg, ${neonColor}, white)`,
                    }}
                    initial={{ width: "0%" }}
                    animate={
                      shouldShow
                        ? {
                            width:
                              zoneIndex === 0
                                ? "100%"
                                : zoneIndex === 1
                                  ? "30%"
                                  : zoneIndex === 2
                                    ? "5%"
                                    : "0%",
                          }
                        : { width: "0%" }
                    }
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <span
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                  }}
                >
                  {zoneIndex === 0 && "100%"}
                  {zoneIndex === 1 && "1%"}
                  {zoneIndex === 2 && "0%"}
                  {zoneIndex === 3 && "0%"}
                  {zoneIndex === 4 && "0%"}
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
