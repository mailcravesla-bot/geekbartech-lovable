export interface Flavor {
  name: string;
  /** HSL accent color for this flavor */
  color: string;
}

export interface Product {
  slug: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  banner?: string;
  gallery?: string[];
  flavors: Flavor[];
  specs: {
    puffs: string;
    battery: string;
    coil: string;
    nicotine: string;
    eLiquid?: string;
    charging?: string;
  };
  featured?: boolean;
  badge?: string;
}

// Live product imagery sourced from geekbar.com (oss.geekbar.com CDN).
const OSS = "https://oss.geekbar.com/uploads/upload/upload";

export const products: Product[] = [
  {
    slug: "geek-bar-pulse-x",
    name: "Geek Bar Pulse X",
    series: "Pulse",
    tagline: "25,000 puffs of pure performance",
    description:
      "The Pulse X is the flagship of the Geek Bar family. A dual-mode mesh coil, smart OLED display and ergonomic chassis deliver flavor that lasts.",
    price: 19.99,
    image: `${OSS}/202502141510478339_600X600.png`,
    banner: `${OSS}/202503142026357373_2200X1100.jpg`,
    flavors: [
      { name: "Strawberry Mango", color: "340 95% 65%" },
      { name: "Blue Razz Ice", color: "215 95% 60%" },
      { name: "Watermelon Ice", color: "150 75% 55%" },
      { name: "Peach Ice", color: "20 95% 65%" },
      { name: "Grape Ice", color: "275 75% 65%" },
      { name: "Tropical Rainbow Blast", color: "50 95% 60%" },
    ],
    specs: {
      puffs: "25,000",
      battery: "820 mAh rechargeable",
      coil: "Dual mesh 1.0 / 1.2 Ω",
      nicotine: "5% (50mg)",
      eLiquid: "16 mL prefilled",
      charging: "USB-C, ~25 min",
    },
    featured: true,
    badge: "Flagship",
  },
  {
    slug: "geek-bar-pulse",
    name: "Geek Bar Pulse",
    series: "Pulse",
    tagline: "Iconic dual-mode disposable",
    description:
      "The original Pulse — the disposable that started it all. Dual mode toggles between Pulse and Regular for personalized intensity.",
    price: 16.99,
    image: `${OSS}/202502141512552809_600X600.png`,
    banner: `${OSS}/202503142028373558_2200X1100.jpg`,
    flavors: [
      { name: "Miami Mint", color: "165 75% 55%" },
      { name: "Sour Apple Ice", color: "95 80% 55%" },
      { name: "California Cherry", color: "355 90% 60%" },
      { name: "Fcuking Fab", color: "300 90% 65%" },
      { name: "Blueberry Sour Raspberry", color: "230 85% 60%" },
    ],
    specs: {
      puffs: "15,000",
      battery: "650 mAh rechargeable",
      coil: "Dual mesh",
      nicotine: "5% (50mg)",
      eLiquid: "16 mL prefilled",
      charging: "USB-C",
    },
    featured: true,
    badge: "Best Seller",
  },
  {
    slug: "geek-bar-meloso-ultra",
    name: "Geek Bar Meloso Ultra",
    series: "Meloso",
    tagline: "Ultra-smooth, ultra-portable",
    description:
      "Meloso Ultra delivers concentrated flavor in a slim, pocketable shell. Built for understated, all-day vaping.",
    price: 14.99,
    image: `${OSS}/202504251533001132_600X600.png`,
    flavors: [
      { name: "Lemon Mint", color: "55 95% 55%" },
      { name: "Watermelon Bubblegum", color: "340 85% 65%" },
      { name: "Grape Apple", color: "270 70% 60%" },
    ],
    specs: {
      puffs: "9,000",
      battery: "600 mAh rechargeable",
      coil: "Mesh",
      nicotine: "5% (50mg)",
      eLiquid: "14 mL prefilled",
      charging: "USB-C",
    },
  },
  {
    slug: "geek-bar-mate-60k",
    name: "Geek Bar MATE 60K",
    series: "MATE",
    tagline: "60,000 puffs. Smart display.",
    description:
      "The MATE 60K pushes capacity to a new tier with a vivid screen and intelligent battery & e-liquid indicators.",
    price: 27.99,
    image: `${OSS}/202603162029028259_600X600.jpg`,
    flavors: [
      { name: "Strawberry Banana", color: "350 90% 65%" },
      { name: "Blue Razz Lemon", color: "210 90% 60%" },
      { name: "Tropical Rainbow", color: "45 95% 60%" },
    ],
    specs: {
      puffs: "60,000",
      battery: "1100 mAh rechargeable",
      coil: "Dual mesh adjustable",
      nicotine: "5% (50mg)",
      eLiquid: "28 mL prefilled",
      charging: "USB-C fast",
    },
    featured: true,
    badge: "New",
  },
  {
    slug: "geek-bar-somax-80k",
    name: "Geek Bar Somax 80K",
    series: "Somax",
    tagline: "Massive capacity, premium build",
    description:
      "Somax 80K combines class-leading puff count with refined ergonomics and intuitive controls.",
    price: 29.99,
    image: `${OSS}/202602091127297052_600X600.jpg`,
    banner: `${OSS}/202602271730513745_2200X1100.jpg`,
    flavors: [
      { name: "Mango Peach", color: "30 95% 60%" },
      { name: "Mixed Berries", color: "320 80% 55%" },
      { name: "Cool Mint", color: "175 70% 50%" },
    ],
    specs: {
      puffs: "80,000",
      battery: "1200 mAh rechargeable",
      coil: "Smart mesh",
      nicotine: "5% (50mg)",
      eLiquid: "32 mL prefilled",
      charging: "USB-C",
    },
    featured: true,
    badge: "Hero",
  },
  {
    slug: "geek-bar-clio-platinum",
    name: "Geek Bar Clio Platinum",
    series: "Clio",
    tagline: "Refined. Pocketable. Platinum.",
    description:
      "Clio Platinum is the everyday-carry hero — slim, polished, and tuned for clean, consistent flavor.",
    price: 17.99,
    image: `${OSS}/202602091143437627_600X600.jpg`,
    banner: `${OSS}/202602271729488500_2200X1100.jpg`,
    flavors: [
      { name: "Lemon Mint", color: "55 95% 55%" },
      { name: "Watermelon Ice", color: "340 85% 65%" },
      { name: "Cool Mint", color: "175 70% 50%" },
    ],
    specs: {
      puffs: "12,000",
      battery: "600 mAh rechargeable",
      coil: "Mesh",
      nicotine: "5% (50mg)",
      eLiquid: "13 mL prefilled",
      charging: "USB-C",
    },
  },
  {
    slug: "geek-bar-spark",
    name: "Geek Bar Spark",
    series: "Spark",
    tagline: "Light it up.",
    description:
      "Spark brings vibrant flavor in a compact body — designed for instant, on-demand satisfaction.",
    price: 12.99,
    image: `${OSS}/202603021010513159_600X600.png`,
    flavors: [
      { name: "Strawberry Ice", color: "350 90% 65%" },
      { name: "Mango Ice", color: "35 95% 60%" },
      { name: "Berry Blast", color: "320 85% 55%" },
    ],
    specs: {
      puffs: "8,000",
      battery: "550 mAh rechargeable",
      coil: "Mesh",
      nicotine: "5% (50mg)",
      eLiquid: "12 mL prefilled",
      charging: "USB-C",
    },
  },
  {
    slug: "geek-bar-clr",
    name: "Geek Bar CLR",
    series: "CLR",
    tagline: "Crystal-clear flavor",
    description:
      "CLR features a transparent design that shows off the engineering inside — pure, clean and bold.",
    price: 13.99,
    image: `${OSS}/202602110945481358_600X600.jpg`,
    flavors: [
      { name: "Cool Mint", color: "175 70% 50%" },
      { name: "Berry Mix", color: "320 85% 55%" },
      { name: "Peach Ice", color: "20 95% 65%" },
    ],
    specs: {
      puffs: "10,000",
      battery: "600 mAh rechargeable",
      coil: "Mesh",
      nicotine: "5% (50mg)",
      eLiquid: "12 mL prefilled",
      charging: "USB-C",
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getFeatured = () => products.filter((p) => p.featured);

export const HERO_VIDEO = "https://oss.geekbar.com/uploads/upload/upload/202503142025336393.mp4";
export const HERO_POSTER = `${OSS}/202503142026357373_2200X1100.jpg`;
