import { motion } from "framer-motion";
import { History } from "lucide-react";
import { TabNavigationProps } from "./info-card.types";

export const TabNavigation = ({
  activeTab,
  setActiveTab,
  neonColor,
}: TabNavigationProps) => (
  <div
    style={{
      display: "flex",
      gap: "0.5rem",
      marginBottom: "1.5rem",
      borderBottom: `1px solid ${neonColor}30`,
      paddingBottom: "0.5rem",
    }}
  >
    <motion.button
      onClick={() => setActiveTab("zone")}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "9999px",
        fontSize: "0.875rem",
        background: activeTab === "zone" ? `${neonColor}30` : "transparent",
        border: `1px solid ${activeTab === "zone" ? neonColor : `${neonColor}30`}`,
        color: activeTab === "zone" ? "white" : "rgba(255,255,255,0.6)",
        cursor: "pointer",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Zone Info
    </motion.button>

    <motion.button
      onClick={() => setActiveTab("records")}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "9999px",
        fontSize: "0.875rem",
        background: activeTab === "records" ? `${neonColor}30` : "transparent",
        border: `1px solid ${activeTab === "records" ? neonColor : `${neonColor}30`}`,
        color: activeTab === "records" ? "white" : "rgba(255,255,255,0.6)",
        cursor: "pointer",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <History size={14} />
        <span>History & Records</span>
      </div>
    </motion.button>
  </div>
);
