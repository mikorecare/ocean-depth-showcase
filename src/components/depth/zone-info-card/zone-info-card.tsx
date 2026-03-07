"use client";

import { OceanZone } from "@/data/ocean-zones";
import { oceanDepthRecords } from "@/data/ocean-depth-records";
import { motion, useInView } from "framer-motion";
import {
  Ship,
  Shrimp,
  Fish,
  FishSymbol,
  EyeClosed,
  History,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { CardContainer, CardHeader } from "./card-components";
import { getNeonColor, getGlassColor, ZONE_ICONS } from "./constants";
import { HistoryRecordsTab } from "./history-records-tab";
import { ZoneInfoCardProps, TabType } from "./info-card.types";
import { TabNavigation } from "./tab-navigation";
import { ZoneInfoTab } from "./zone-info-tab";

// Global state to track minimized cards
const minimizedCards: { [key: number]: boolean } = {};

export default function ZoneInfoCard({
  zone,
  zoneIndex,
  onVisible,
  zoneContainerRef,
}: ZoneInfoCardProps) {
  const ref = useRef(null);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("zone");
  const [hovered, setHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    amount: 0.3,
    margin: "0px 0px 200px 0px",
  });

  const neonColor = getNeonColor(zoneIndex);
  const glassColor = getGlassColor(zoneIndex);
  const zoneData = oceanDepthRecords[zoneIndex];
  const ZoneIcon = ZONE_ICONS[zoneIndex];

  // Mark as viewed once it's been in view (only if not minimized)
  useEffect(() => {
    if (isInView && !hasBeenViewed && !isMinimized) {
      setHasBeenViewed(true);
    }
  }, [isInView, hasBeenViewed, isMinimized]);

  // Handle visibility for parent
  useEffect(() => {
    if (!isMinimized && isInView) {
      onVisible(zoneIndex);
    } else {
      onVisible(null);
    }
  }, [isInView, zoneIndex, onVisible, isMinimized]);

  // Handle minimize
  const handleMinimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  // Handle restore and scroll to zone
  const handleRestore = useCallback(() => {
    setIsMinimized(false);

    setTimeout(() => {
      if (zoneContainerRef) {
        zoneContainerRef.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  }, [zoneContainerRef]);

  // Reset state when zone changes
  useEffect(() => {
    setIsMinimized(false);
    setActiveTab("zone");
  }, [zoneIndex]);

  const shouldShow = !isMinimized && (isInView || hasBeenViewed);

  const getBubbleTop = () => {
    const baseOffset = 100; // Start from 100px from top
    const spacing = 80; // 80px between each bubble
    return baseOffset + zoneIndex * spacing;
  };

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

      {/* Minimized bubble - stacked vertically on the right */}
      {isMinimized && (
        <motion.div
          style={{
            position: "fixed",
            right: "1rem",
            top: `${getBubbleTop()}px`,
            zIndex: 1000,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
          initial={{ scale: 0, opacity: 0, x: 50 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ scale: 0, opacity: 0, x: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onClick={() => {
            // First restore the card
            setIsMinimized(false);

            // Then find and scroll to the zone
            setTimeout(() => {
              // Try to find the zone element by ID or data attribute
              const zoneElement = document.querySelector(
                `[data-zone-index="${zoneIndex}"]`,
              );

              if (zoneElement) {
                zoneElement.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              } else if (zoneContainerRef) {
                // Fallback to the passed ref
                zoneContainerRef.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              } else {
                // Last resort: try to find by zone name
                const allZones = document.querySelectorAll('[class*="zone-"]');
                if (allZones[zoneIndex]) {
                  allZones[zoneIndex].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }
            }, 100);
          }}
        >
          {/* Ripple effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: hovered ? [1, 1.5, 2] : 1,
              opacity: hovered ? [0.5, 0.2, 0] : 0,
            }}
            transition={{
              duration: 1,
              repeat: hovered ? Infinity : 0,
              repeatType: "loop",
            }}
            style={{
              background: neonColor,
              borderRadius: "50%",
            }}
          />

          {/* Main minimized button */}
          <motion.div
            style={{
              position: "relative",
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${neonColor}80, ${neonColor}20)`,
              backdropFilter: "blur(8px)",
              border: `2px solid ${neonColor}`,
              boxShadow: `0 0 30px ${neonColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
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
            <ZoneIcon size={20} />

            {/* Small indicator dot */}
            <motion.div
              style={{
                position: "absolute",
                top: "0.25rem",
                right: "0.25rem",
                width: "0.6rem",
                height: "0.6rem",
                borderRadius: "50%",
                background: "#10b981",
                border: `2px solid ${neonColor}`,
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Zone name label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
            style={{
              position: "absolute",
              right: "100%",
              marginRight: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              whiteSpace: "nowrap",
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(4px)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "2rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: `1px solid ${neonColor}60`,
              boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
              pointerEvents: "none",
            }}
          >
            {zone.name}
          </motion.div>
        </motion.div>
      )}

      {/* Full Card */}
      <motion.div
        style={{
          position: "absolute",
          left: "15%",
          top: "20%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          width: "91.666667%",
          maxWidth: "72rem",
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
        <CardContainer neonColor={neonColor} glassColor={glassColor}>
          {/* Minimize button */}
          <motion.button
            onClick={handleMinimize}
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
            aria-label="Minimize"
          >
            <Minimize2 size={16} />
          </motion.button>

          {/* Content container */}
          {shouldShow && (
            <div
              style={{
                position: "relative",
                zIndex: 20,
                padding: "2rem",
                color: "white",
                maxHeight: "70vh",
                overflowY: "auto",
              }}
              ref={scrollRef}
              className="custom-scrollbar"
            >
              {/* Header */}
              <CardHeader
                zone={zone}
                zoneIndex={zoneIndex}
                neonColor={neonColor}
                ZoneIcon={ZoneIcon}
              />

              {/* Tab navigation */}
              <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                neonColor={neonColor}
              />

              {/* Zone Info Tab */}
              {activeTab === "zone" && (
                <ZoneInfoTab
                  zone={zone}
                  zoneIndex={zoneIndex}
                  neonColor={neonColor}
                />
              )}

              {/* History & Records Tab */}
              {activeTab === "records" && (
                <HistoryRecordsTab
                  zoneData={zoneData}
                  zoneIndex={zoneIndex}
                  neonColor={neonColor}
                />
              )}
            </div>
          )}
        </CardContainer>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${neonColor}60;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${neonColor};
        }
      `}</style>
    </>
  );
}
