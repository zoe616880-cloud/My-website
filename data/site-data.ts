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
    type: "Bench weighing",
    copy: "Compact platforms for production, packing and warehouse workstations.",
    image: "/bench-scale-white.png",
    href: "/products/bench-scales",
    specs: ["Mild or stainless steel", "150–600 kg catalog range", "RS-232 options"],
  },
  {
    title: "Heavy-Duty Floor Scales",
    type: "Floor weighing",
    copy: "Rugged low-profile platforms for pallets, carts and industrial loads.",
    image: "/floor-scale.jpg",
    href: "/products/floor-scales",
    specs: ["Checker or plain plate", "1,000–5,000 kg catalog range", "Custom platform sizes"],
  },
  {
    title: "U-Shape & Mobile Scales",
    type: "Mobile weighing",
    copy: "Portable structures designed for fast loading and flexible work areas.",
    image: "/u-shape-scale.jpg",
    href: "/products/mobile-u-shape-scales",
    specs: ["Integrated mobility options", "Low loading profile", "Custom structure"],
  },
  {
    title: "Animal & Special Scales",
    type: "Application-specific",
    copy: "Guardrail and special-purpose platforms configured for the actual workflow.",
    image: "/animal-scale.jpg",
    href: "/products/animal-special-scales",
    specs: ["Animal weighing mode", "Custom capacity and size", "Custom guardrails"],
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
    question: "Can you provide OEM or ODM support?",
    answer: "Yes. OEM and ODM support can cover dimensions, structure, material, indicator selection, data interface and brand presentation.",
  },
];

export const megaMenus = {
  products: {
    label: "Products",
    eyebrow: "Weighing equipment",
    title: "Industrial scales built for the way you work.",
    items: [
      { icon: Gauge, title: "Bench Scales", copy: "Compact production and packing platforms", href: "/products/bench-scales" },
      { icon: Box, title: "Floor Scales", copy: "Heavy-duty pallet and industrial weighing", href: "/products/floor-scales" },
      { icon: Warehouse, title: "Mobile & U-Shape", copy: "Flexible loading for changing work areas", href: "/products/mobile-u-shape-scales" },
      { icon: ShieldCheck, title: "Animal & Special", copy: "Application-specific structures and guardrails", href: "/products/animal-special-scales" },
    ],
  },
  solutions: {
    label: "Solutions",
    eyebrow: "Application engineering",
    title: "Start with the load, environment and workflow.",
    items: [
      { icon: Warehouse, title: "Warehouse & Logistics", copy: "Receiving, inventory and dispatch weighing", href: "/solutions" },
      { icon: Factory, title: "Industrial Manufacturing", copy: "Process, batching and production workflows", href: "/solutions" },
      { icon: Gauge, title: "Farm & Livestock", copy: "Stable systems for animal and farm use", href: "/solutions" },
      { icon: Waves, title: "Wet Environments", copy: "Stainless configurations for frequent cleaning", href: "/solutions" },
    ],
  },
} as const;
