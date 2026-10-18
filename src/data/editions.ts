import { CatalogEdition, StockistLocation } from '../types';

export const CATALOG_EDITIONS: CatalogEdition[] = [
  {
    id: 'or-01',
    dispatchNo: 'DISPATCH #OR-01',
    volTag: 'VOL. I',
    bannerBadge: 'Best for Cross-Country Journeys',
    badgeType: 'primary',
    title: 'The Trans-Continental Caesar Cipher & Substitution Grids',
    subtitle: '82 Enigmas for the Rails • Vol. I',
    description:
      'A restorative compendium of progressive rotation ciphers, polyalphabetic tables, and telegraph codes engineered for continuous journeys.',
    price: 24.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOvpMB1zZt0M3ff3u62FvKfc7tR8tA_lqd6rIWTs2K7ZvMfoPB9WjTymu_VLkZQaKZ8Zu9PZSJIKFGnClmVeWjTBLxH3zKm6-pr5iGJ_tfaHhVcsBXqwUc2Ku7fa7YcH7dhiXYH3b-0WSXDRHQht5EUkchZSxmFI14laU8KPPBu68z3DUE6fg_vBW2AEASa-NO6ntdYsqyNBuLmWB4iGmg1BAxmXXvu8RteWoFHVLzdVh-hZk9o2FlGQ',
    category: 'ciphers',
    paperDimension: 'Full Lay-Flat A5',
    journeyDurationMinutes: 840, // 14 hours
    specs: [
      { label: 'PAPER GROUND:', value: '120gsm unbleached warm cream' },
      { label: 'SOLVE ESTIMATE:', value: '14 Hours Total' },
      { label: 'BINDING:', value: 'Exposed thread sewn flat' },
    ],
    remainingCopies: 142,
    runTotal: 300,
    format: 'GOLD FOIL / RAW CARD',
    extent: '180 PAGES',
    cipherClass: 'CAESAR & VIGENÈRE',
  },
  {
    id: 'or-02',
    dispatchNo: 'DISPATCH #OR-02',
    volTag: 'VOL. II',
    bannerBadge: 'Quiet Commute',
    badgeType: 'secondary',
    title: 'Railway Terminus & Station Hall Word Searches',
    subtitle: 'Architectural Blueprint Matrices',
    description:
      "Cartographic word searches constructed around the architectural blueprints of Europe's great 19th-century terminal stations.",
    price: 22.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAosv_snvVIa8vpCIgYNM6LDF50bnDnOPLN9AT0X6VqDdBY61-aiRRfUn2yPX3luNBn84Nlc3eyYQb1y_7h2UQMljcnWl0snqGU6vFPXj0qru9aFMwk9DEMEg0LlTkHEC2zyUSKZxMpPfanhYH4aWwwj4LiuLS5ArlDkjIN90OWGmI3E959n2cynhhNgtdc-9m6BWx9jAz32oTiaYrY7rBVOmsvpNgCCW56U8L3ANckXh5uulZUUqPmkg',
    category: 'word-search',
    paperDimension: 'Full Lay-Flat A5',
    journeyDurationMinutes: 540, // 9 hours
    specs: [
      { label: 'PAPER GROUND:', value: 'Risograph hunter green & charcoal' },
      { label: 'SOLVE ESTIMATE:', value: '9 Hours Total' },
      { label: 'LAYOUT:', value: 'Full Lay-Flat A5' },
    ],
    remainingCopies: 89,
    runTotal: 300,
    format: 'RISO GREEN INK / SPIRAL',
    extent: '140 PAGES',
    cipherClass: 'CARTOGRAPHIC GRIDS',
  },
  {
    id: 'zn-01',
    dispatchNo: 'DISPATCH #ZN-01',
    volTag: 'ZINE NO. 01',
    bannerBadge: 'Hand-Folded Risograph',
    badgeType: 'highest',
    title: 'Conversations Overheard in Dining Cars',
    subtitle: 'Snippet Poetry & Interwoven Cryptics',
    description:
      'A hybrid zine weaving eavesdropped snippet poetry, dining car passenger lore, and interwoven quick cryptic puzzles.',
    price: 12.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9LJdhTUKuPr5HpnIUt5U7EKqBMtAzUB9_KwuBE5uE8UW9rQYjbZ_72ZyhSUnDWkfKbXKACOjIfvw1bmKQFX_mcNiCN6_nDgU13-_RirT6wzRf4D3H_GoVhdfDcrcR38j1HvSHcqI5-Qu1TCk78lbq6SSoXgRVsoe64sAvqrxoYxgVkf41vCAX2fwl8x2cX-DzoislkHF7YJXWG_kBmzBD8vYOtA57vhSMzOW7FxkpGlCJncPfdy4D4w',
    category: 'zines',
    paperDimension: 'Pocket A6',
    journeyDurationMinutes: 60,
    specs: [
      { label: 'PRINT METHOD:', value: 'Dual drum red/graphite Riso' },
      { label: 'PAPER GROUND:', value: 'FSC Recycled 90gsm newsprint' },
      { label: 'FORMAT:', value: 'Pocket Slim A6' },
    ],
    remainingCopies: 74,
    runTotal: 250,
    format: 'POCKET SLIM A6',
    extent: '44 PAGES',
    cipherClass: '12 CRYPTICS',
  },
  {
    id: 'zn-02',
    dispatchNo: 'DISPATCH #ZN-02',
    volTag: 'ZINE NO. 02',
    bannerBadge: 'Edition of 300',
    badgeType: 'tertiary',
    title: 'The Sleeper Train to Trieste',
    subtitle: '35mm Grain & Nocturnal Logic',
    description:
      'Nocturnal visual puzzles paired with 35mm grain photography captured along the overnight route from Venice to the Adriatic border.',
    price: 14.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-6yeJvrp2qzpt-E-mtpP5Ms4IUeJ2u9DVU9qy3EZhz-mPDbxCVcfvlKZ7m9KfCsGqf3ls2sD8NUAY43y-ORnrrn7uEJFDGFteXDZE3fBxjo5y7uuDvXZo1j7ZxC6lhAhzxta9l4s6rPEJdM85vfNNn8N80m_YrrYFfW6BVmcCx9MmqwEQ87NEZ4ukUqkMnkpzx9s3yNyJVQ6tFJtFp--nWPlNTy81LJ0qHD1i2xPKoFbzkPTz-IVqdw',
    category: 'zines',
    paperDimension: 'Pocket A6',
    journeyDurationMinutes: 120,
    specs: [
      { label: 'PAPER GROUND:', value: '110gsm tactile indigo card cover' },
      { label: 'SPECIAL INK:', value: 'Reflective metallic graphite' },
      { label: 'PUNCH CARD:', value: 'Includes perforated bookmark' },
    ],
    remainingCopies: 56,
    runTotal: 300,
    format: 'FLEXIBLE NEWSPRINT',
    extent: '52 PAGES',
    cipherClass: '18 VISUAL ENIGMAS',
  },
  {
    id: 'or-03',
    dispatchNo: 'DISPATCH #OR-03',
    volTag: 'VOL. III',
    bannerBadge: 'Master Level',
    badgeType: 'inverse',
    title: 'The Cryptographer’s Pocketbook',
    subtitle: 'Advanced Matrices & Diplomatic Enigmas',
    description:
      'Advanced polyalphabetic matrices, Vigenère tableaus, transposed book ciphers, and historical diplomatic transmission mysteries.',
    price: 28.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCm2FHJnAzBRz73d1LbwvqfOFdXWu-IvaRXyLIcVy8FSXBrtzU0vm_CaoiBnHu7ZYSoyCNOcm8zNd6K4LG6qZBVEVsR_33PapCg3_7CtfWkV5Xnmj-ASPB1FJC9y6MGE2QoYDzzlsKZpqqceJrPTqFvs_ICr6XYZ5BiK112IUWHUDDR6akHR8r1XfmbofYY9CTAYw-KxAI2wRPqpQmsEFL_xkXLOJNiJRhfrccGoqPAKc8_JAjJY74Nhw',
    category: 'ciphers',
    paperDimension: 'Full Lay-Flat A5',
    journeyDurationMinutes: 1320, // 22+ hours
    specs: [
      { label: 'PAPER GROUND:', value: '130gsm archivist vellum finish' },
      { label: 'SOLVE ESTIMATE:', value: '22+ Hours Demanded' },
      { label: 'EXTRA ATTACHMENT:', value: 'Rotating Die-cut Cipher Wheel' },
    ],
    remainingCopies: 41,
    runTotal: 250,
    format: 'VELLUM FINISH / EMBOSSED',
    extent: '210 PAGES',
    cipherClass: '95 ADVANCED CIPHERS',
  },
  {
    id: 'tool-01',
    dispatchNo: 'DISPATCH #TOOL-01',
    volTag: 'ACC-01',
    bannerBadge: 'Essential Tool',
    badgeType: 'primary',
    title: 'ORMA Solid Brass Transit Pencil & Linen Slipcase',
    subtitle: '2B Graphite • Refillable Brass Instrument',
    description:
      'Machined raw brass drawing tool designed specifically for newsprint annotations, cross-hatching decipherment grids, and train logs.',
    price: 18.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_niNMhyGMnpOO3J9mKXZBvSDXZUiAvVE4kvVFOjDIzFm7OrsGlPwOUw9LGFCNCS7ODoQ6LelBOZgDwvygvrPuptoRnkE0XgWNfs4SGDO-Ih9wCtqIQdM6Q5mUu48Rh3dDzCFg0WoQFWThl7ao5l_hjArD9C0F9jKdSw95t7fm4YBexHUFzwi-c9a5YKlLHsoV-XFdEfi_NrTOUvErLH9cJdYkjADpwZpTMdq1jeYqxxCRMkX_qbFg5g',
    category: 'stationery',
    paperDimension: 'Pocket A6',
    journeyDurationMinutes: 30,
    specs: [
      { label: 'BODY MATERIAL:', value: 'Untreated Italian Brass' },
      { label: 'SLEEVE TEXTILE:', value: 'Unbleached Bergamo Linen' },
      { label: 'LEAD CORE:', value: 'Soft 2B Japanese Polymer Lead' },
    ],
    remainingCopies: 110,
    runTotal: 200,
    format: 'UNTREATED BRASS & BERGAMO LINEN',
    extent: 'INSTRUMENT + 12 LEADS',
    cipherClass: 'REFILLABLE WRITING TOOL',
  },
];

export const STOCKIST_LOCATIONS: StockistLocation[] = [
  {
    city: 'London',
    country: 'United Kingdom',
    badge: '2 STATIONS',
    name: 'St. Pancras International News & Daunt Books',
    address: 'Euston Rd • Marylebone High St',
    stockStatus: 'Vol I, II, Zine 01 in stock',
    restockNote: 'Restocked 2 days ago',
    mapImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWmUFUFos5gqyLCbLamwoNmWK-VFZN2HHNcCGd0X9dXx_gnLavQIBaD6OHEldDQh1WTl76XmAiTwbcT0fVnM48s0N7XBdUAoaf-5bnU0EkzzM6k6nqTd2KxGTrsWDeIdAA-ePTD8YAi7Mn1R3oi71G9p7gjZOTa1Da6YQzhqSTgfGOU2j-zpcoPTmqLUUuet94J5F5-f4e5Gg_vlMLpcKzWMX-VBUORFhf_ax3Pjqb4_SGjtq0m8X7Kg',
  },
  {
    city: 'Paris',
    country: 'France',
    badge: '3 STATIONS',
    name: 'Gare de Lyon Kiosque 12 & Librairie Delamain',
    address: 'Place Louis-Armand • 155 Rue Saint-Honoré',
    stockStatus: 'Vol I, III, Brass Pencil in stock',
    restockNote: 'Full catalogue available',
    mapImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWmUFUFos5gqyLCbLamwoNmWK-VFZN2HHNcCGd0X9dXx_gnLavQIBaD6OHEldDQh1WTl76XmAiTwbcT0fVnM48s0N7XBdUAoaf-5bnU0EkzzM6k6nqTd2KxGTrsWDeIdAA-ePTD8YAi7Mn1R3oi71G9p7gjZOTa1Da6YQzhqSTgfGOU2j-zpcoPTmqLUUuet94J5F5-f4e5Gg_vlMLpcKzWMX-VBUORFhf_ax3Pjqb4_SGjtq0m8X7Kg',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    badge: 'FLAGSHIP',
    name: 'Tokyo Station Gransta Marunouchi & Tsutaya Daikanyama',
    address: '1-9-1 Marunouchi, Chiyoda • Sarugakucho',
    stockStatus: 'Full Series • Japanese Translated Decipher Folio',
    restockNote: 'Exclusive Washi slipcase available',
    mapImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWmUFUFos5gqyLCbLamwoNmWK-VFZN2HHNcCGd0X9dXx_gnLavQIBaD6OHEldDQh1WTl76XmAiTwbcT0fVnM48s0N7XBdUAoaf-5bnU0EkzzM6k6nqTd2KxGTrsWDeIdAA-ePTD8YAi7Mn1R3oi71G9p7gjZOTa1Da6YQzhqSTgfGOU2j-zpcoPTmqLUUuet94J5F5-f4e5Gg_vlMLpcKzWMX-VBUORFhf_ax3Pjqb4_SGjtq0m8X7Kg',
  },
  {
    city: 'Berlin',
    country: 'Germany',
    badge: '2 STATIONS',
    name: 'Hauptbahnhof Buchhandlung & Do You Read Me?!',
    address: 'Europaplatz 1 • Auguststraße 28',
    stockStatus: 'Vol I, II, Zine 02 in stock',
    restockNote: 'Bi-weekly restock run',
    mapImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWmUFUFos5gqyLCbLamwoNmWK-VFZN2HHNcCGd0X9dXx_gnLavQIBaD6OHEldDQh1WTl76XmAiTwbcT0fVnM48s0N7XBdUAoaf-5bnU0EkzzM6k6nqTd2KxGTrsWDeIdAA-ePTD8YAi7Mn1R3oi71G9p7gjZOTa1Da6YQzhqSTgfGOU2j-zpcoPTmqLUUuet94J5F5-f4e5Gg_vlMLpcKzWMX-VBUORFhf_ax3Pjqb4_SGjtq0m8X7Kg',
  },
  {
    city: 'Kyoto',
    country: 'Japan',
    badge: '1 REPOSITORY',
    name: 'Keihan Sanjo Kiosk & Keibunsha Ichijoji',
    address: 'Sanjo Ohashi Bridge • Ichijoji Haraitonochō',
    stockStatus: 'Vol I & Special Kyoto Night Train Zine',
    restockNote: 'Limited stock of 15 copies',
    mapImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWmUFUFos5gqyLCbLamwoNmWK-VFZN2HHNcCGd0X9dXx_gnLavQIBaD6OHEldDQh1WTl76XmAiTwbcT0fVnM48s0N7XBdUAoaf-5bnU0EkzzM6k6nqTd2KxGTrsWDeIdAA-ePTD8YAi7Mn1R3oi71G9p7gjZOTa1Da6YQzhqSTgfGOU2j-zpcoPTmqLUUuet94J5F5-f4e5Gg_vlMLpcKzWMX-VBUORFhf_ax3Pjqb4_SGjtq0m8X7Kg',
  },
];
