import { Ship, Shrimp, Fish, FishSymbol, EyeClosed } from "lucide-react";

export const COLORS = {
    neon: ["#00f0ff", "#3a86ff", "#9d4edd", "#c147e9", "#a05eff"],
    glass: [
        "rgba(0, 240, 255, 0.2)",
        "rgba(58, 134, 255, 0.2)",
        "rgba(157, 78, 221, 0.2)",
        "rgba(193, 71, 233, 0.2)",
        "rgba(160, 94, 255, 0.2)",
    ],
};

export const ZONE_ICONS = [Ship, Shrimp, Fish, FishSymbol, EyeClosed];

export const getNeonColor = (zoneIndex: number) => COLORS.neon[zoneIndex];
export const getGlassColor = (zoneIndex: number) => COLORS.glass[zoneIndex];