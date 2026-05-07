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

import pulseXImg from "@/assets/pulse-x.jpg";
import pulseImg from "@/assets/pulse.jpg";
import skyviewImg from "@/assets/skyview.jpg";
import digiflavorImg from "@/assets/digiflavor.jpg";
import melosoImg from "@/assets/meloso.jpg";
import b5000Img from "@/assets/b5000.jpg";

// Curated catalog of the Geek Bar lineup.
export const products: Product[] = [
  {
    slug: "geek-bar-pulse-x",
    name: "Geek Bar Pulse X",
    series: "Pulse",
    tagline: "25,000 puffs of pure performance",
    description:
      "The Pulse X is the flagship of the Geek Bar family. A dual-mode mesh coil, smart OLED display and ergonomic chassis deliver flavor that lasts.",
    price: 19.99,
    image: pulseXImg,
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
    image: pulseImg,
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
    slug: "geek-bar-skyview",
    name: "Geek Bar Skyview",
    series: "Skyview",
    tagline: "A screen worth watching",
    description:
      "Skyview pairs a vivid HD animation display with smart e-liquid and battery indicators. Premium flavor, premium presentation.",
    price: 22.99,
    image: skyviewImg,
    flavors: [
      { name: "Strawberry Banana", color: "350 90% 65%" },
      { name: "Blue Razz Lemon", color: "210 90% 60%" },
      { name: "Tropical Rainbow", color: "45 95% 60%" },
      { name: "White Gummy Ice", color: "200 30% 80%" },
    ],
    specs: {
      puffs: "20,000",
      battery: "850 mAh rechargeable",
      coil: "Dual mesh adjustable",
      nicotine: "5% (50mg)",
      eLiquid: "20 mL prefilled",
      charging: "USB-C fast",
    },
    featured: true,
    badge: "New",
  },
  {
    slug: "geek-bar-digiflavor",
    name: "Geek Bar Digiflavor",
    series: "Digiflavor",
    tagline: "Smart digital flavor control",
    description:
      "Switch between profiles on the fly. Digiflavor's chip dynamically tunes wattage to coax the best from every puff.",
    price: 24.99,
    image: digiflavorImg,
    flavors: [
      { name: "Mango Peach", color: "30 95% 60%" },
      { name: "Mixed Berries", color: "320 80% 55%" },
      { name: "Cool Mint", color: "175 70% 50%" },
      { name: "Pineapple Coconut", color: "55 90% 60%" },
    ],
    specs: {
      puffs: "18,000",
      battery: "750 mAh rechargeable",
      coil: "Smart mesh",
      nicotine: "5% (50mg)",
      eLiquid: "18 mL prefilled",
      charging: "USB-C",
    },
  },
  {
    slug: "geek-bar-meloso-max",
    name: "Geek Bar Meloso Max",
    series: "Meloso",
    tagline: "Sleek. Silent. Saturated.",
    description:
      "The Meloso Max delivers concentrated flavor in a slim, pocketable shell. Built for understated, all-day vaping.",
    price: 14.99,
    image: melosoImg,
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
    slug: "geek-bar-b5000",
    name: "Geek Bar B5000",
    series: "Classic",
    tagline: "The dependable daily driver",
    description:
      "5,000 puffs of consistent, true-to-flavor performance in a compact form. The B5000 is the classic Geek Bar reimagined.",
    price: 11.99,
    image: b5000Img,
    flavors: [
      { name: "Strawberry Ice", color: "350 90% 65%" },
      { name: "Mango Ice", color: "35 95% 60%" },
      { name: "Berry Blast", color: "320 85% 55%" },
      { name: "Cool Mint", color: "175 70% 50%" },
    ],
    specs: {
      puffs: "5,000",
      battery: "650 mAh rechargeable",
      coil: "Mesh",
      nicotine: "5% (50mg)",
      eLiquid: "10 mL prefilled",
      charging: "USB-C",
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getFeatured = () => products.filter((p) => p.featured);
