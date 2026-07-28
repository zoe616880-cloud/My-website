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
    label: "Productos",
    eyebrow: "Equipos de pesaje",
    title: "Básculas industriales para la forma en que usted trabaja.",
    items: [
      { icon: Warehouse, title: "Básculas camioneras", copy: "Sistemas de pesaje para camiones sobre superficie o empotrados", href: "/products?category=truck-scales" },
      { icon: Box, title: "Básculas de plataforma industriales", copy: "Equipos de pesaje de mesa, conteo y plataforma", href: "/products?category=industrial-platform-scales" },
      { icon: Factory, title: "Básculas de piso industriales", copy: "Básculas de piso de bajo perfil, móviles y de acero inoxidable", href: "/products?category=industrial-floor-scales" },
      { icon: ClipboardList, title: "Básculas de mesa", copy: "Básculas compactas para el pesaje diario", href: "/products?category=table-top-scales" },
      { icon: Gauge, title: "Balanzas de precisión", copy: "Balanzas analíticas y electrónicas para mediciones precisas", href: "/products?category=balances" },
      { icon: Settings, title: "Soluciones de pesaje", copy: "Soluciones para proyectos de pesaje estático y dinámico de tanques", href: "/products?category=weighing-solutions" },
      { icon: PackageCheck, title: "Sistemas de módulos de pesaje", copy: "Sistemas modulares para tanques, tolvas y estructuras", href: "/products?category=weighing-module-systems" },
      { icon: ShieldCheck, title: "Accesorios para básculas", copy: "Celdas de carga, indicadores, cables y cajas de conexiones", href: "/products?category=scale-accessories" },
    ],
  },
  news: {
    label: "Noticias",
    eyebrow: "Noticias y blog",
    title: "Actualizaciones, guías y conocimiento práctico de pesaje.",
    items: [
      { icon: ClipboardList, title: "Guías de compra", copy: "Notas para la selección y adquisición", href: "/news" },
      { icon: Factory, title: "Novedades de fábrica", copy: "Noticias de fabricación y proyectos", href: "/news" },
      { icon: Gauge, title: "Conocimiento de productos", copy: "Consejos de aplicación y configuración de básculas", href: "/news" },
      { icon: ShieldCheck, title: "Notas de mantenimiento", copy: "Guía de cuidado, inspección y uso", href: "/news" },
    ],
  },
} as const;

