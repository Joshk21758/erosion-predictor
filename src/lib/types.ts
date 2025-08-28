import type { GenerateErosionSummaryOutput } from "@/ai/flows/generate-erosion-summary";

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface LocationMarker {
  id: string;
  position: { lat: number; lng: number };
  name: string;
  riskLevel: RiskLevel;
}

export type ErosionReport = GenerateErosionSummaryOutput;
