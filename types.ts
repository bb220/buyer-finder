export interface GroundingSource {
  uri: string;
  title: string;
}

export interface Buyer {
  name: string;
  website: string;
  fitReason: string;
  buyerProfile: string;
  portfolioHighlight: string;
}

export interface CompanyProfile {
  name: string;
  industry: string;
  location: string;
  size: string;
  offerings: string;
}

export interface Suitability {
  marketAnalysis: string;
  scalability: string;
  risks: string[];
  investmentThesis: string;
}

export interface AnalysisReport {
  companyProfile: CompanyProfile;
  suitability: Suitability;
  buyers: Buyer[];
}

export interface AnalysisResult {
  report: AnalysisReport;
  groundingSources: GroundingSource[];
}

export interface LoadingState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}