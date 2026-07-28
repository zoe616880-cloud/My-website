import {
  Box,
  ClipboardList,
  DraftingCompass,
  Factory,
  Gauge,
  PackageCheck,
  Settings,
  ShieldCheck,
  Warehouse,
  Waves,
} from "@/components/icons";

export const products = [
  {
    title: "Industrial Bench Scales",
    type: "Bench Weighing",
    copy: "Compact bench scale platform for packing, counting, inspection and workstation weighing.",
    image: "/bench-scale-white.png",
    href: "/products?category=industrial-platform-scales",
    specs: ["Bench platform with indicator", "Stainless or painted steel options", "30 kg to 600 kg range"],
  },
  {
    title: "Mild Steel Floor Scale",
    type: "Industrial Floor Scales",
    copy: "Low profile floor scale for pallet, cart and heavy load weighing in warehouses and factories.",
    image: "/uploads/products/industrial-floor-scales-standard-mild-steel-floor-scale.jpg",
    href: "/products/industrial-floor-scales-standard-mild-steel-floor-scale",
    specs: ["Configured by model", "Mild steel or stainless steel options", "Ramp and low-profile installation"],
  },
  {
    title: "Mobile Floor Scale",
    type: "Industrial Floor Scales",
    copy: "Mobile floor scale for flexible pallet, cart and heavy load weighing in changing work areas.",
    image: "/uploads/products/industrial-floor-scales-mobile-floor-scale.jpg",
    href: "/products/industrial-floor-scales-mobile-floor-scale",
    specs: ["Configured by model", "Mild steel or stainless steel options", "Mobile structure for flexible use"],
  },
  {
    title: "Guardrail Platform Scale",
    type: "Industrial Platform Scales",
    copy: "Guardrail platform scale for packing, counting, receiving and controlled production line weighing.",
    image: "/uploads/products/industrial-platform-scales-guardrail-platform-scale.png",
    href: "/products/industrial-platform-scales-guardrail-platform-scale",
    specs: ["60 kg capacity option", "Mild steel or stainless steel options", "Guardrail structure for safer loading"],
  },
];
export const process = [
  { icon: ClipboardList, title: "Requirements", copy: "Application, target capacity and dimensions" },
  { icon: DraftingCompass, title: "Engineering", copy: "Structure, material and indicator selection" },
  { icon: Settings, title: "Prototype", copy: "Sample build and functional verification" },
  { icon: Factory, title: "Production", copy: "Controlled fabrication and assembly" },
  { icon: PackageCheck, title: "Delivery", copy: "Packaging prepared for your destination" },
];

export const applications = [
  { icon: Warehouse, title: "Warehouse & Logistics", copy: "Receiving, inventory, packing and dispatch weighing." },
  { icon: Factory, title: "Industrial Manufacturing", copy: "Process control, batching and production workflows." },
  { icon: Gauge, title: "Agriculture & Livestock", copy: "Stable weighing systems for animal and farm use." },
  { icon: Waves, title: "Wet Environments", copy: "Stainless steel configurations for frequent cleaning." },
];

export const faqs = [
  {
    question: "Can you customize the platform size and capacity?",
    answer: "Yes. Share your application, target capacity, accuracy and installation limits. Our team will review the structure and recommend a practical configuration.",
  },
  {
    question: "What materials are available?",
    answer: "Bench and floor scale structures can be configured in painted mild steel or stainless steel, depending on the environment and cleaning requirements.",
  },
  {
    question: "Which information should I provide for a quotation?",
    answer: "Please provide the product type, application, maximum load, required division, platform size, quantity, destination country and any interface requirements.",
  },
  {
    question: "Can you customize the structure and interface?",
    answer: "Yes. Custom support can cover dimensions, structure, material, indicator selection, data interface and brand presentation.",
  },
];

export const megaMenus = {
  products: {
    label: "Products",
    eyebrow: "Weighing equipment",
    title: "Industrial scales built for the way you work.",
    items: [
      { icon: Warehouse, title: "Truck Scales", copy: "Above-ground and pit-mounted truck weighing systems", href: "/products?category=truck-scales" },
      { icon: Box, title: "Industrial Platform Scales", copy: "Bench, counting and platform weighing equipment", href: "/products?category=industrial-platform-scales" },
      { icon: Factory, title: "Industrial Floor Scales", copy: "Low-profile, mobile and stainless steel floor scales", href: "/products?category=industrial-floor-scales" },
      { icon: ClipboardList, title: "Table Top Scales", copy: "Compact table top scales for daily weighing work", href: "/products?category=table-top-scales" },
      { icon: Gauge, title: "Balances", copy: "Analytical and electronic balances for precise weighing", href: "/products?category=balances" },
      { icon: Settings, title: "Weighing Solutions", copy: "Dynamic and static tank scale project solutions", href: "/products?category=weighing-solutions" },
      { icon: PackageCheck, title: "Weighing Module Systems", copy: "Module systems for tanks, hoppers and structures", href: "/products?category=weighing-module-systems" },
      { icon: ShieldCheck, title: "Scale Accessories", copy: "Load cells, indicators, cables and junction boxes", href: "/products?category=scale-accessories" },
    ],
  },
  news: {
    label: "News",
    eyebrow: "News and blog",
    title: "Updates, guides and practical weighing knowledge.",
    items: [
      { icon: ClipboardList, title: "Buying Guides", copy: "Selection and procurement notes", href: "/news" },
      { icon: Factory, title: "Factory Updates", copy: "Manufacturing and project news", href: "/news" },
      { icon: Gauge, title: "Product Knowledge", copy: "Scale application and configuration tips", href: "/news" },
      { icon: ShieldCheck, title: "Maintenance Notes", copy: "Care, inspection and usage guidance", href: "/news" },
    ],
  },
} as const;

