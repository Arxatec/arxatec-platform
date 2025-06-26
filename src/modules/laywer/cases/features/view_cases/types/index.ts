export interface CasesSummaryData {
  totalClients: number;
  totalExternalClients: number;
  totalCases: number;
  casesInReview: number;
  casesInProcess: number;
  casesClosed: number;
  casesArchived: number;
  externalClientsArchived: number;
}

export interface CasesSummaryResponse {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: CasesSummaryData;
}
