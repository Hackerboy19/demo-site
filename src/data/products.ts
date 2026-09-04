import { Product, StatItem } from '../types';

export const COMPANY_DETAILS = {
  name: 'Abhay Polyplast',
  foundedYear: 2012,
  proprietor: 'Mr. Vivek Apani',
  gstNumber: '24AAXFA0572A1ZQ',
  address: 'Plot No. 7 & 8, Gokuldham Industrial Area, Near Kuvadva G.I.D.C, Rajkot, Gujarat, India - 360023',
  phone: '+91 98250 45892',
  secondaryPhone: '+91 94282 11980',
  email: 'contact@abhaypolyplast.com',
  salesEmail: 'sales@abhaypolyplast.com',
  workingHours: 'Mon - Sat: 8:30 AM - 7:30 PM IST',
  locationCity: 'Rajkot, Gujarat',
};

export const STATS_DATA: StatItem[] = [
  {
    id: 'experience',
    value: '10+ Years',
    label: 'Industrial Experience',
    description: 'Precision polymer manufacturing since establishment in 2012.',
    highlight: 'Est. 2012'
  },
  {
    id: 'certification',
    value: 'ISO Certified',
    label: 'Quality Assured',
    description: 'Compliant with BIS, ISO 9001:2015 & IS 4984 standard specifications.',
    highlight: 'Zero Rejection'
  },
  {
    id: 'staff',
    value: '15+ Dedicated',
    label: 'Skilled Engineering Staff',
    description: 'Experienced extrusion machine technicians & polymer specialists.',
    highlight: '24/7 Operations'
  },
  {
    id: 'material',
    value: '100% Virgin',
    label: 'Prime Polymer Material',
    description: 'Zero recycled fillers. Exclusively premium PE-100 & PE-80 certified resins.',
    highlight: '50-Year Design Life'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'agricultural-hdpe-pipes',
    name: 'Agricultural HDPE Pipes',
    category: 'HDPE Pipes',
    tagline: 'High-Density Polyethylene Agricultural & Irrigation Pressure Pipes (PE-100)',
    pricePerMeter: 70,
    priceFormatted: '₹70 / Meter',
    moq: '1,000 Meters',
    standard: 'IS 4984:2016 / ISO 4427',
    material: '100% Virgin PE-100 Polymer Grade',
    sizes: '63 mm to 200 mm OD (PN 6 - PN 16)',
    pressureRating: 'PN 6 - PN 16 (Up to 16 kg/cm²)',
    features: [
      'Engineered for deep-well submersible delivery and agricultural flood irrigation',
      'High resistance against corrosive fertilizers, pesticides, and alkaline Gujarat soils',
      'Co-extruded bright blue identification longitudinal stripes',
      'Flexible coils allow seamless contour following over rugged terrain'
    ],
    description: 'Heavy-duty agricultural grade polyethylene pipes crafted for Gujarat farmers and irrigation contractors. Zero scaling, 50-year design life, and guaranteed crack resistance under direct Saurashtra heat.',
    colorAccent: 'blue',
    pipeColor: '#090d16',
    stripeColor: '#3b82f6',
    badge: 'High Demand'
  },
  {
    id: 'hdpe-water-pipe',
    name: 'HDPE Municipal Water Pipe',
    category: 'HDPE Pipes',
    tagline: 'High-Density Polyethylene Pressure Pipes for Potable Water Infrastructure',
    pricePerMeter: 70,
    priceFormatted: '₹70 / Meter',
    moq: '1,000 Meters',
    standard: 'IS 4984:2016 / ISO 4427',
    material: '100% Virgin PE-100 Polymer Grade',
    sizes: '20 mm to 315 mm OD (PN 2.5 to PN 16)',
    pressureRating: 'PN 6 - PN 16 (Up to 16 kg/cm²)',
    features: [
      'Co-extruded bright blue identification stripes',
      'High chemical resistance against acidic soil & corrosive effluents',
      'Leak-free butt fusion & electrofusion welded joints',
      'Smooth hydraulic bore for minimal friction loss and pumping energy'
    ],
    description: 'Engineered for municipal water supply lines, industrial chemical conveyance, and heavy irrigation mains. Guaranteed 50+ year operational lifespan with zero internal scale formation.',
    colorAccent: 'blue',
    pipeColor: '#0f172a',
    stripeColor: '#3b82f6',
    badge: 'Flagship Product'
  },
  {
    id: 'mdpe-pipe',
    name: 'MDPE Pipe',
    category: 'MDPE Pipes',
    tagline: 'Medium-Density Polyethylene Gas & Potable Distribution Pipes',
    pricePerMeter: 12,
    priceFormatted: '₹12.0 / Meter',
    moq: '1,000 Meters',
    standard: 'ISO 4437 / IS 14885',
    material: 'Virgin High-Stress Crack Resistant MDPE',
    sizes: '16 mm to 63 mm OD',
    pressureRating: 'PN 4 - PN 10 (SDR 11 / SDR 17.6)',
    features: [
      'Superior flexibility enabling trenchless laying and directional drilling',
      'High Rapid Crack Propagation (RCP) and environmental stress crack resistance',
      'Co-extruded bright yellow or solid yellow for city gas distribution (CGD)',
      'Lightweight coils for rapid long-distance field deployment'
    ],
    description: 'Specialized medium-density pipes ideal for city gas distribution, underground fuel transport, and house-service potable water connections with exceptional bend radius.',
    colorAccent: 'amber',
    pipeColor: '#1e293b',
    stripeColor: '#f59e0b',
    badge: 'City Gas & Water'
  },
  {
    id: 'drip-irrigation-coil',
    name: 'Black Coil Pipes (Drip Irrigation)',
    category: 'Drip Irrigation',
    tagline: 'Agricultural Precision Micro-Irrigation Lateral Black Coils',
    pricePerMeter: 70,
    priceFormatted: '₹70 / Meter',
    moq: '1,000 Meters',
    standard: 'IS 12786 / IS 13488',
    material: 'Linear Low-Density PE with 2.5% Carbon Black UV Stabilizer',
    sizes: '12 mm & 16 mm (Class 1 & Class 2, 400m / 500m Coils)',
    pressureRating: '1.0 to 2.5 kg/cm²',
    features: [
      'Formulated with prime UV stabilizer masterbatch to endure intense Saurashtra sunlight',
      'Compatible with cylindrical inline drippers, flat drippers, and online punch emitters',
      'Resistant to agricultural chemicals, liquid fertilizers, and rodent nibbling',
      'Uniform wall thickness ensures consistent water discharge across vast hectares'
    ],
    description: 'Designed specifically for Indian farmers to maximize crop yield while saving up to 60% water. Ideal for groundnut, cotton, sugarcane, pomegranate, and greenhouse horticulture.',
    colorAccent: 'emerald',
    pipeColor: '#0a0f1d',
    stripeColor: '#10b981',
    badge: 'Farmer Choice'
  },
  {
    id: 'hdpe-cable-duct',
    name: 'HDPE Cable Duct Coil Pipes',
    category: 'Cable Ducts',
    tagline: 'Permanently Lubricated (PLB) High-Speed Optical Fiber Cable Ducts',
    pricePerMeter: 70,
    priceFormatted: '₹70 / Meter',
    moq: '1,000 Meters',
    standard: 'TEC / GR / TX / CDS-008 / DOT Approved',
    material: 'High-Density Polyethylene with Solid Silicone Co-Extruded Inner Layer',
    sizes: '32/26 mm, 40/33 mm, 50/42 mm Coils',
    pressureRating: 'Internal pressure resistance > 12 kg/cm²',
    features: [
      'Ultra-low internal friction coefficient (μ ≤ 0.06) for cable blowing up to 2 km',
      'Continuous internal longitudinal grooves reducing contact surface area',
      'Superior crush and impact resistance against road compaction and backfilling',
      'Colour-coded outer shell with pre-inserted anti-stretch nylon pull rope'
    ],
    description: 'Essential underground infrastructure for high-speed 5G optical fiber expansion, railway signaling, and smart city highway networking across Gujarat and Western India.',
    colorAccent: 'cyan',
    pipeColor: '#0f172a',
    stripeColor: '#06b6d4',
    badge: 'Telecom Grade'
  }
];

export const QUALITY_STANDARDS = [
  {
    title: 'Hydrostatic Pressure Test',
    parameter: '100h / 165h at 80°C & 20°C',
    result: 'Zero Ductile Failure',
    detail: 'Continuous sustained hydrostatic pressure testing in temperature-controlled water baths exceeding BIS specifications.'
  },
  {
    title: 'Melt Flow Index (MFI)',
    parameter: '190°C / 5.0 kg load',
    result: '0.2 to 0.4 g/10min',
    detail: 'Verifies prime molecular weight distribution of incoming virgin polymers to ensure maximum tensile toughness.'
  },
  {
    title: 'Carbon Black Dispersion',
    parameter: '2.50% ± 0.50% by mass',
    result: 'Grade ≤ 3 Homogeneous',
    detail: 'Guarantees uniform dispersion of micro-fine carbon black particles protecting the pipe against ultraviolet photodegradation.'
  },
  {
    title: 'Elongation at Break',
    parameter: 'Tensile crosshead speed 50mm/min',
    result: '> 350% Elongation',
    detail: 'Ensures extreme structural elasticity to absorb geological subsidence and seismic shockwaves without fracturing.'
  }
];
