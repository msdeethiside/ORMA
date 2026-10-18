export type ScreenId =
  | 'station-kiosk'
  | 'editions-and-archive'
  | 'featured-solve-caesar-cipher'
  | 'dispatch-and-submissions';

export interface CartItem {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag: string;
  binding?: string;
  quantity: number;
}

export interface CatalogEdition {
  id: string;
  dispatchNo: string;
  volTag: string;
  bannerBadge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary' | 'highest' | 'inverse';
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  image: string;
  category: 'ciphers' | 'word-search' | 'zines' | 'stationery';
  paperDimension: 'Pocket A6' | 'Full Lay-Flat A5' | 'Hand-Folded Broadside';
  journeyDurationMinutes: number;
  specs: {
    label: string;
    value: string;
  }[];
  remainingCopies: number;
  runTotal: number;
  format?: string;
  extent?: string;
  cipherClass?: string;
}

export interface StockistLocation {
  city: string;
  country: string;
  badge: string;
  name: string;
  address: string;
  stockStatus: string;
  restockNote: string;
  mapImage: string;
}
