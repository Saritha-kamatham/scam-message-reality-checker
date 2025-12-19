
export enum VerdictType {
  SCAM = 'Likely Scam',
  GENUINE = 'Likely Genuine',
  SUSPICIOUS = 'Suspicious'
}

export interface AnalysisPart {
  text: string;
  reason: string;
  category: 'Urgency' | 'Financial' | 'Technical' | 'Social' | 'Other';
}

export interface ScamAnalysis {
  verdict: VerdictType;
  score: number; // 0 (Safe) to 100 (Scam)
  redFlags: string[];
  explanation: string;
  advice: string;
  highlightedParts: AnalysisPart[];
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  message: string;
  analysis: ScamAnalysis;
}
