
export enum RarityTier {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export enum LifecycleStage {
  INCUBATION = 'INCUBATION',
  MONETIZATION = 'MONETIZATION',
  DOMINANCE = 'DOMINANCE',
}

export enum MatrixType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export interface SystemSetting {
  key: string;
  value: string;
  description: string | null;
  data_type: 'string' | 'int' | 'float' | 'bool';
  updated_at: string;
}

export interface Matrix {
  id: string;
  code: string;
  name: string | null;
  type: MatrixType;
  created_at: string;
}

export interface Asset {
  id: string;
  primary_matrix_id: string;
  secondary_matrix_id: string | null;
  sku_slug: string;
  drive_link: string | null;
  payhip_link: string | null;
  cached_traffic_score: number;
  cached_revenue_score: number;
  total_score: number;
  current_rarity: RarityTier;
  highest_rarity_achieved: RarityTier;
  lifecycle_state: LifecycleStage;
  created_at: string;
  last_synced_at: string | null;
}

export interface PinStats {
  impressions?: number;
  outbound_clicks?: number;
  saves?: number;
}
export interface Pin {
  id: string;
  external_pin_id: string;
  asset_id: string | null;
  title: string | null;
  description: string | null;
  image_url: string | null;
  last_stats: PinStats;
  is_active_on_platform: boolean;
  last_synced_at: string;
}

export interface Transaction {
  id: string;
  payhip_transaction_id: string;
  asset_id: string;
  amount: number;
  currency: string;
  occurred_at: string;
}
