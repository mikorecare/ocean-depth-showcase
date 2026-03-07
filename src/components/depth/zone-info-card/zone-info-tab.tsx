import { motion } from "framer-motion";
import { ZoneInfoTabProps } from "./info-card.types";
import { InfoCard } from "./card-components";

export const ZoneInfoTab = ({
  zone,
  zoneIndex,
  neonColor,
}: ZoneInfoTabProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
  >
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
        <InfoCard key={idx} color={neonColor}>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.75rem",
              margin: 0,
            }}
          >
            {fact}
          </p>
        </InfoCard>
      ))}
    </div>

    {/* Light meter */}
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>
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
          animate={{
            width:
              zoneIndex === 0
                ? "100%"
                : zoneIndex === 1
                  ? "30%"
                  : zoneIndex === 2
                    ? "5%"
                    : "0%",
          }}
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
  </motion.div>
);
