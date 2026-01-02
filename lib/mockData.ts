
import { SystemSetting, Matrix, Asset, Pin, Transaction, RarityTier, LifecycleStage, MatrixType } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const systemSettings: SystemSetting[] = [
    { key: 'ORPHAN_VIRALITY_TRIGGER', value: '50', description: 'Clicks mínimos para alerta de huérfano', data_type: 'int', updated_at: new Date().toISOString() },
    { key: 'INCUBATION_DAYS', value: '30', description: 'Días antes de exigir monetización', data_type: 'int', updated_at: new Date().toISOString() },
    { key: 'MATURITY_SCORE_TRIGGER', value: '500', description: 'Score para exigir Payhip', data_type: 'int', updated_at: new Date().toISOString() },
    { key: 'WEIGHT_IMPRESSION', value: '0.01', description: 'Peso de impresión en Score', data_type: 'float', updated_at: new Date().toISOString() },
    { key: 'WEIGHT_OUTBOUND', value: '5.0', description: 'Peso de click en Score', data_type: 'float', updated_at: new Date().toISOString() },
    { key: 'WEIGHT_DOLLAR_REVENUE', value: '50.0', description: 'Multiplicador de dinero', data_type: 'float', updated_at: new Date().toISOString() },
];

export const matrices: Matrix[] = [
    { id: 'matrix_1', code: 'TRAP26', name: 'Trap Music Vol. 26', type: MatrixType.PRIMARY, created_at: new Date().toISOString() },
    { id: 'matrix_2', code: 'ANUEL', name: 'Anuel AA Type Beats', type: MatrixType.PRIMARY, created_at: new Date().toISOString() },
    { id: 'matrix_3', code: 'POP-SMOKE', name: 'Pop Smoke Drill', type: MatrixType.SECONDARY, created_at: new Date().toISOString() },
    { id: 'matrix_4', code: 'LOFI-CHILL', name: 'Lofi Chillhop Beats', type: MatrixType.PRIMARY, created_at: new Date().toISOString() },
    { id: 'matrix_5', code: '80S-SYNTH', name: '80s Synthwave', type: MatrixType.SECONDARY, created_at: new Date().toISOString() },
];

export const assets: Asset[] = [
    { id: 'asset_1', primary_matrix_id: 'matrix_1', secondary_matrix_id: 'matrix_3', sku_slug: 'SKU-TRAP26-POPSMOKE-DARK', drive_link: 'https://drive.google.com/1', payhip_link: 'https://payhip.com/1', cached_traffic_score: 1250, cached_revenue_score: 2500, total_score: 3750, current_rarity: RarityTier.LEGENDARY, highest_rarity_achieved: RarityTier.LEGENDARY, lifecycle_state: LifecycleStage.DOMINANCE, created_at: new Date(Date.now() - 60 * 86400000).toISOString(), last_synced_at: new Date().toISOString() },
    { id: 'asset_2', primary_matrix_id: 'matrix_2', secondary_matrix_id: null, sku_slug: 'SKU-ANUEL-REALHASTA', drive_link: 'https://drive.google.com/2', payhip_link: 'https://payhip.com/2', cached_traffic_score: 800, cached_revenue_score: 1200, total_score: 2000, current_rarity: RarityTier.EPIC, highest_rarity_achieved: RarityTier.EPIC, lifecycle_state: LifecycleStage.MONETIZATION, created_at: new Date(Date.now() - 45 * 86400000).toISOString(), last_synced_at: new Date().toISOString() },
    { id: 'asset_3', primary_matrix_id: 'matrix_4', secondary_matrix_id: 'matrix_5', sku_slug: 'SKU-LOFI-CHILL-80S-NIGHTDRIVE', drive_link: 'https://drive.google.com/3', payhip_link: null, cached_traffic_score: 450, cached_revenue_score: 0, total_score: 450, current_rarity: RarityTier.RARE, highest_rarity_achieved: RarityTier.RARE, lifecycle_state: LifecycleStage.INCUBATION, created_at: new Date(Date.now() - 20 * 86400000).toISOString(), last_synced_at: new Date().toISOString() },
    { id: 'asset_4', primary_matrix_id: 'matrix_1', secondary_matrix_id: null, sku_slug: 'SKU-TRAP26-AMBIENT', drive_link: 'https://drive.google.com/4', payhip_link: 'https://payhip.com/4', cached_traffic_score: 150, cached_revenue_score: 300, total_score: 450, current_rarity: RarityTier.UNCOMMON, highest_rarity_achieved: RarityTier.UNCOMMON, lifecycle_state: LifecycleStage.MONETIZATION, created_at: new Date(Date.now() - 10 * 86400000).toISOString(), last_synced_at: new Date().toISOString() },
    { id: 'asset_5', primary_matrix_id: 'matrix_4', secondary_matrix_id: null, sku_slug: 'SKU-LOFI-CHILL-STUDYNIGHT', drive_link: 'https://drive.google.com/5', payhip_link: null, cached_traffic_score: 50, cached_revenue_score: 0, total_score: 50, current_rarity: RarityTier.COMMON, highest_rarity_achieved: RarityTier.COMMON, lifecycle_state: LifecycleStage.INCUBATION, created_at: new Date(Date.now() - 5 * 86400000).toISOString(), last_synced_at: new Date().toISOString() },
];

export const pins: Pin[] = [
    { id: 'pin_1', external_pin_id: '111111', asset_id: 'asset_1', title: 'Dark Trap Beat - "GHOST"', description: 'Hard hitting trap beat', image_url: 'https://picsum.photos/400/600?random=1', last_stats: { impressions: 20000, outbound_clicks: 250, saves: 100 }, is_active_on_platform: true, last_synced_at: new Date().toISOString() },
    { id: 'pin_2', external_pin_id: '222222', asset_id: 'asset_2', title: 'Anuel Type Beat - "Diablo"', description: 'Latin trap banger', image_url: 'https://picsum.photos/400/600?random=2', last_stats: { impressions: 15000, outbound_clicks: 160, saves: 80 }, is_active_on_platform: true, last_synced_at: new Date().toISOString() },
    { id: 'pin_3', external_pin_id: '333333', asset_id: 'asset_3', title: 'Lofi Chillhop for Studying', description: 'Relaxing study beats', image_url: 'https://picsum.photos/400/600?random=3', last_stats: { impressions: 9000, outbound_clicks: 90, saves: 120 }, is_active_on_platform: true, last_synced_at: new Date().toISOString() },
    { id: 'pin_4', external_pin_id: '444444', asset_id: null, title: 'Viral Beat Loop #4', description: 'Crazy new loop going viral', image_url: 'https://picsum.photos/400/600?random=4', last_stats: { impressions: 50000, outbound_clicks: 75, saves: 300 }, is_active_on_platform: true, last_synced_at: new Date().toISOString() },
    { id: 'pin_5', external_pin_id: '555555', asset_id: 'asset_5', title: 'Calm beats for sleep', description: 'Sleep music', image_url: 'https://picsum.photos/400/600?random=5', last_stats: { impressions: 1000, outbound_clicks: 10, saves: 20 }, is_active_on_platform: true, last_synced_at: new Date().toISOString() },
    { id: 'pin_6', external_pin_id: '666666', asset_id: null, title: 'Unassigned melody', description: 'Needs a home', image_url: 'https://picsum.photos/400/600?random=6', last_stats: { impressions: 500, outbound_clicks: 2, saves: 5 }, is_active_on_platform: true, last_synced_at: new Date().toISOString() },
];

export const transactions: Transaction[] = [
    { id: 'txn_1', payhip_transaction_id: 'ph_1', asset_id: 'asset_1', amount: 25.00, currency: 'USD', occurred_at: new Date().toISOString() },
    { id: 'txn_2', payhip_transaction_id: 'ph_2', asset_id: 'asset_1', amount: 25.00, currency: 'USD', occurred_at: new Date(Date.now() - 1 * 86400000).toISOString() },
    { id: 'txn_3', payhip_transaction_id: 'ph_3', asset_id: 'asset_2', amount: 20.00, currency: 'USD', occurred_at: new Date(Date.now() - 2 * 86400000).toISOString() },
    { id: 'txn_4', payhip_transaction_id: 'ph_4', asset_id: 'asset_2', amount: 20.00, currency: 'USD', occurred_at: new Date(Date.now() - 3 * 86400000).toISOString() },
    { id: 'txn_5', payhip_transaction_id: 'ph_5', asset_id: 'asset_4', amount: 15.00, currency: 'USD', occurred_at: new Date(Date.now() - 4 * 86400000).toISOString() },
];
