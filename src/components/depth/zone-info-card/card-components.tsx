// info-card/card-components.tsx

import { motion } from "framer-motion";
import {
  CardContainerProps,
  CardHeaderProps,
  SectionTitleProps,
  InfoCardProps,
} from "./info-card.types";
import { useEffect, useState } from "react";

// Floating particles animation - Fixed for hydration
export const FloatingParticles = ({ neonColor }: { neonColor: string }) => {
  // Generate stable values on the client only
  const [particles, setParticles] = useState<
    Array<{
      width: string;
      height: string;
      left: string;
      top: string;
      duration: number;
      delay: number;
      xDrift: number;
    }>
  >([]);

  useEffect(() => {
    // Only generate on client after mount
    const newParticles = [...Array(12)].map(() => ({
      width: `${Math.random() * 10 + 1}px`,
      height: `${Math.random() * 10 + 1}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 5,
      xDrift: Math.random() * 30 - 15,
    }));
    setParticles(newParticles);
  }, []);

  // Don't render on server, only after client hydration
  if (particles.length === 0) return null;

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "9999px",
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
            background: neonColor,
            boxShadow: `0 0 25px ${neonColor}`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, particle.xDrift, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
};

// Animated glow background - Fixed for hydration
export const AnimatedGlow = ({ neonColor }: { neonColor: string }) => {
  const [gradients, setGradients] = useState<string[]>([]);

  useEffect(() => {
    // Generate gradients only on client
    setGradients([
      `radial-gradient(circle at 20% 20%, ${neonColor}90, transparent 50%)`,
      `radial-gradient(circle at 80% 80%, ${neonColor}90, transparent 50%)`,
      `radial-gradient(circle at 20% 80%, ${neonColor}90, transparent 50%)`,
      `radial-gradient(circle at 80% 20%, ${neonColor}90, transparent 50%)`,
    ]);
  }, [neonColor]);

  if (gradients.length === 0) return null;

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.4,
      }}
      animate={{
        background: gradients,
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />
  );
};

// Main card container
export const CardContainer = ({
  children,
  neonColor,
  glassColor,
}: CardContainerProps) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      borderRadius: "32px",
      backdropFilter: "blur(12px)",
      border: `2px solid ${neonColor}80`,
      background: `linear-gradient(135deg, ${glassColor}, rgba(0,0,0,0.95))`,
      boxShadow: `
        0 25px 50px -12px rgba(0,0,0,0.9),
        0 0 50px ${neonColor}80,
        inset 0 0 30px ${neonColor}40
      `,
    }}
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

    {/* Animated elements - only render on client */}
    {typeof window !== "undefined" && (
      <>
        <AnimatedGlow neonColor={neonColor} />
        <FloatingParticles neonColor={neonColor} />
      </>
    )}

    {children}
  </div>
);

// Card header
export const CardHeader = ({
  zone,
  zoneIndex,
  neonColor,
  ZoneIcon,
}: CardHeaderProps) => {
  const [boxShadow, setBoxShadow] = useState(`0 0 20px ${neonColor}`);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxShadow((prev) =>
        prev === `0 0 20px ${neonColor}`
          ? `0 0 40px ${neonColor}`
          : `0 0 20px ${neonColor}`,
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [neonColor]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
            boxShadow,
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
          <ZoneIcon size={36} color="white" />
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
        {zone.depthFeet.min}ft - {zone.depthFeet.max}ft
      </motion.div>
    </div>
  );
};

// Section title component
export const SectionTitle = ({
  icon: Icon,
  title,
  color,
}: SectionTitleProps) => (
  <h4
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1.25rem",
      fontWeight: 600,
      marginBottom: "1rem",
      color,
      textShadow: `0 0 10px ${color}`,
    }}
  >
    <Icon size={20} />
    {title}
  </h4>
);

// Info card (reusable for facts, records, etc.)
export const InfoCard = ({
  children,
  color,
  hover = true,
  borderLeft = false,
  onClick,
}: InfoCardProps) => (
  <motion.div
    style={{
      padding: "0.875rem",
      borderRadius: "0.5rem",
      background: "rgba(0,0,0,0.5)",
      border: `1px solid ${color}20`,
      ...(borderLeft && { borderLeft: `4px solid ${color}` }),
      cursor: onClick ? "pointer" : "default",
    }}
    whileHover={
      hover
        ? {
            scale: 1.02,
            borderColor: color,
            boxShadow: `0 0 15px ${color}40`,
          }
        : {}
    }
    onClick={onClick}
  >
    {children}
  </motion.div>
);
