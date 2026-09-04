export type ProductCategory = 
  | 'HDPE Pipes' 
  | 'MDPE Pipes' 
  | 'Drip Irrigation' 
  | 'Cable Ducts' 
  | 'Industrial' 
  | 'Agricultural' 
  | 'Telecom' 
  | 'Gas & Water';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  pricePerMeter: number | null;
  priceFormatted: string;
  moq: string;
  standard: string;
  material: string;
  sizes: string;
  pressureRating: string;
  features: string[];
  description: string;
  colorAccent: 'blue' | 'emerald' | 'amber' | 'cyan';
  pipeColor: string;
  stripeColor?: string;
  badge?: string;
}

export interface RfqFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  productId: string;
  quantityMeters: number;
  diameterMm: string;
  deliveryLocation: string;
  notes: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
  highlight: string;
}
