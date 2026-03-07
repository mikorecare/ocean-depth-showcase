// info-card/HistoryRecordsTab.tsx

import { motion } from "framer-motion";
import { Anchor, Trophy, Clock, Landmark, Ship, User2Icon } from "lucide-react";
import Image from "next/image";
import { HistoryRecordsTabProps } from "./info-card.types";
import { SectionTitle } from "./card-components";

// Photo Card Component - Full images with contain, not cover
const PhotoCard = ({ item, color, type }: any) => {
  // Determine layout based on content type
  const isHorizontal = type === "timeline";
  const imageSize = isHorizontal ? 100 : 200;

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        gap: "1rem",
        borderRadius: "1rem",
        background: "rgba(0,0,0,0.6)",
        border: `1px solid ${color}30`,
        overflow: "hidden",
        backdropFilter: "blur(8px)",
      }}
      whileHover={{
        scale: 1.02,
        borderColor: color,
        boxShadow: `0 0 25px ${color}60`,
        transition: { duration: 0.2 },
      }}
    >
      {/* Image Section - Full image, not cropped */}
      {item.imageLink && (
        <div
          style={{
            position: "relative",
            width: isHorizontal ? imageSize : "100%",
            height: isHorizontal ? imageSize : 200,
            flexShrink: 0,
            background: `linear-gradient(135deg, ${color}20, ${color}05)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={item.imageLink}
              alt={item.title || item.landmark || item.mission || ""}
              fill
              style={{
                objectFit: "contain",
              }}
              sizes={isHorizontal ? "100px" : "200px"}
            />
          </div>
          {/* Subtle glow effect instead of overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: `inset 0 0 30px ${color}30`,
              borderRadius: "0.75rem",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      {/* Content Section */}
      <div
        style={{
          padding: isHorizontal ? "0.75rem 1rem 0.75rem 0" : "0 1rem 1rem 1rem",
          flex: 1,
        }}
      >
        {type === "exploration" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <h4
                style={{
                  fontWeight: 700,
                  color: "white",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                {item.title}
              </h4>
              <span
                style={{
                  background: color,
                  color: "black",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {item.year}
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                marginBottom: "0.75rem",
              }}
            >
              {item.description}
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {item.achievedBy && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <span><User2Icon /></span> {item.achievedBy}
                </span>
              )}
              {item.vessel && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Ship size={12} color={color} /> {item.vessel}
                </span>
              )}
            </div>
          </>
        )}

        {type === "record" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <h4
                style={{
                  fontWeight: 600,
                  color: "white",
                  fontSize: "1rem",
                  margin: 0,
                  maxWidth: "60%",
                }}
              >
                {item.title}
              </h4>
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: color,
                  fontSize: "1rem",
                  background: `${color}20`,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: `1px solid ${color}40`,
                }}
              >
                {item.value}
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.875rem",
                lineHeight: "1.5",
                marginBottom: "0.5rem",
              }}
            >
              {item.description}
            </p>
            {item.year && (
              <span
                style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }}
              >
                {item.year} • {item.achievedBy}
              </span>
            )}
          </>
        )}

        {type === "analogy" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <h4
                style={{
                  fontWeight: 700,
                  color: "white",
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                {item.landmark}
              </h4>
              <span
                style={{
                  color: color,
                  fontFamily: "monospace",
                  fontWeight: 600,
                  background: `${color}15`,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: `1px solid ${color}30`,
                }}
              >
                {item.depth}
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "0.875rem",
                lineHeight: "1.6",
              }}
            >
              {item.description}
            </p>
          </>
        )}

        {type === "timeline" && (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  color,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  background: `${color}20`,
                  padding: "0.2rem 0.5rem",
                  borderRadius: "0.5rem",
                }}
              >
                {item.year}
              </span>
              <span
                style={{ color: "white", fontWeight: 600, fontSize: "1rem" }}
              >
                {item.mission}
              </span>
              <span
                style={{
                  color: "black",
                  background: color,
                  padding: "0.2rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                {item.depth}
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.85rem",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              {item.notes}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Grid Card Component for compact items - Full images
const GridPhotoCard = ({ item, color }: any) => (
  <motion.div
    style={{
      display: "flex",
      flexDirection: "column",
      borderRadius: "1rem",
      background: "rgba(0,0,0,0.6)",
      border: `1px solid ${color}30`,
      overflow: "hidden",
      backdropFilter: "blur(8px)",
    }}
    whileHover={{
      scale: 1.03,
      borderColor: color,
      boxShadow: `0 0 20px ${color}60`,
      transition: { duration: 0.2 },
    }}
  >
    {/* Image - Full, not cropped */}
    {item.imageLink && (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 120,
          background: `linear-gradient(135deg, ${color}20, ${color}05)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.5rem",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={item.imageLink}
            alt={item.wreck || item.title || ""}
            fill
            style={{
              objectFit: "contain",
            }}
            sizes="120px"
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: `inset 0 0 20px ${color}30`,
            borderRadius: "0.75rem 0.75rem 0 0",
            pointerEvents: "none",
          }}
        />
      </div>
    )}

    {/* Content */}
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          fontWeight: 700,
          color: "white",
          fontSize: "0.9rem",
          marginBottom: "0.25rem",
        }}
      >
        {item.wreck || item.title}
      </div>
      <div
        style={{
          color,
          fontSize: "0.8rem",
          fontFamily: "monospace",
          fontWeight: 600,
          marginBottom: "0.5rem",
        }}
      >
        {item.depth}
      </div>
      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.75rem",
          lineHeight: "1.5",
          margin: 0,
        }}
      >
        {item.fact || item.comparison}
      </p>
    </div>
  </motion.div>
);

export const HistoryRecordsTab = ({
  zoneData,
  zoneIndex,
  neonColor,
}: HistoryRecordsTabProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      {/* Exploration History */}
      <div>
        <SectionTitle
          icon={Anchor}
          title="Human Exploration"
          color={neonColor}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {zoneData.explorationHistory.map((item, idx) => (
            <PhotoCard
              key={idx}
              item={item}
              color={neonColor}
              type="exploration"
            />
          ))}
        </div>
      </div>

      {/* Depth Records */}
      <div>
        <SectionTitle icon={Trophy} title="Depth Records" color={neonColor} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {zoneData.depthRecords.map((record, idx) => (
            <PhotoCard
              key={idx}
              item={record}
              color={neonColor}
              type="record"
            />
          ))}
        </div>
      </div>

      {/* Human Visits Timeline */}
      {zoneData.humanVisits && zoneData.humanVisits.length > 0 && (
        <div>
          <SectionTitle
            icon={Clock}
            title="Timeline of Visits"
            color={neonColor}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {zoneData.humanVisits.map((visit, idx) => (
              <PhotoCard
                key={idx}
                item={visit}
                color={neonColor}
                type="timeline"
              />
            ))}
          </div>
        </div>
      )}

      {/* Famous Landmarks Comparison */}
      {zoneData.analogies && zoneData.analogies.length > 0 && (
        <div>
          <SectionTitle
            icon={Landmark}
            title="Famous Landmarks"
            color={neonColor}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {zoneData.analogies.map((analogy, idx) => (
              <PhotoCard
                key={idx}
                item={analogy}
                color={neonColor}
                type="analogy"
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
