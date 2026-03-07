import { OceanZone } from "@/data/ocean-zones";
import { ZoneDepthData } from "@/data/ocean-depth-records";

export type TabType = "zone" | "records";

export interface ZoneInfoCardProps {
  zone: OceanZone;
  zoneIndex: number;
  onVisible: (index: number | null) => void;
  zoneContainerRef: HTMLDivElement | null;
}

export interface CardHeaderProps {
    zone: OceanZone;
    zoneIndex: number;
    neonColor: string;
    ZoneIcon: React.ElementType;
}

export interface TabNavigationProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    neonColor: string;
}

export interface ZoneInfoTabProps {
    zone: OceanZone;
    zoneIndex: number;
    neonColor: string;
}

export interface HistoryRecordsTabProps {
    zoneData: ZoneDepthData;
    zoneIndex: number;
    neonColor: string;
}

export interface CardContainerProps {
    children: React.ReactNode;
    neonColor: string;
    glassColor: string;
}

export interface SectionTitleProps {
    icon: React.ElementType;
    title: string;
    color: string;
}

export interface InfoCardProps {
    children: React.ReactNode;
    color: string;
    hover?: boolean;
    borderLeft?: boolean;
    onClick?: () => void;
}