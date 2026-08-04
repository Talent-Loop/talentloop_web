export interface BonusStats {
  totalBonusesIssued: number;
  activeBonuses: number;
  monthlyBonusSpend: number;
}

export interface BonusStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: BonusStats;
}