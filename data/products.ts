export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  capacities: string;
  materials: string;
  applications: string[];
  features: string[];
  specifications: Array<[string, string]>;
  customization: string[];
};

export const products: Product[] = [
  {
    slug: "bench-scales",
    name: "Industrial Bench Scales",
    shortName: "Bench Scales",
    category: "Bench weighing",
    description:
      "Compact platforms for production, packing and warehouse workstations.",
    longDescription:
      "Asia Weighing bench scales combine a rigid platform, industrial indicator and configurable data output for daily production and packing tasks. Painted carbon steel and stainless steel structures are available for different operating environments.",
    image: "/bench-scale-white.png",
    capacities: "150-600 kg catalog range",
    materials: "Painted mild steel or stainless steel",
    applications: [
      "Packing and dispatch stations",
      "Production line weighing",
      "Warehouse receiving",
      "Ingredient and component control",
    ],
    features: [
      "Rigid low-profile platform",
      "Separate indicator column",
      "Optional RS-232 data output",
      "Configurable platform dimensions",
    ],
    specifications: [
      ["Capacity", "150-600 kg catalog range"],
      ["Platform", "Configured to application"],
      ["Structure", "Mild steel or stainless steel"],
      ["Indicator", "Selectable industrial indicator"],
      ["Interface", "RS-232 and other options"],
      ["Power", "AC supply with indicator battery options"],
    ],
    customization: [
      "Platform dimensions",
      "Capacity and division",
      "Column height",
      "Indicator model",
      "Data interface",
      "Brand and packaging",
    ],
  },
  {
    slug: "floor-scales",
    name: "Heavy-Duty Floor Scales",
    shortName: "Floor Scales",
    category: "Floor weighing",
    description:
      "Rugged low-profile platforms for pallets, carts and industrial loads.",
    longDescription:
      "Floor scale systems are configured around the load pattern, installation method and working environment. Options include checker plate or plain plate decks, pit frames, ramps and stainless steel construction.",
    image: "/floor-scale.jpg",
    capacities: "1,000-5,000 kg catalog range",
    materials: "Painted steel or stainless steel",
    applications: [
      "Pallet and cart weighing",
      "Warehouse receiving",
      "Manufacturing process control",
      "Loading and dispatch",
    ],
    features: [
      "Low-profile reinforced deck",
      "Four-load-cell configuration",
      "Pit or above-floor installation",
      "Optional ramps and guard structures",
    ],
    specifications: [
      ["Capacity", "1,000-5,000 kg catalog range"],
      ["Deck", "Checker plate or plain plate"],
      ["Installation", "Above floor or pit mounted"],
      ["Load cells", "Four industrial load cells"],
      ["Indicator", "Selectable industrial indicator"],
      ["Interface", "RS-232 and other options"],
    ],
    customization: [
      "Deck size and thickness",
      "Capacity and division",
      "Pit frame and ramps",
      "Surface treatment",
      "Indicator and interface",
      "Export packing",
    ],
  },
  {
    slug: "mobile-u-shape-scales",
    name: "U-Shape & Mobile Scales",
    shortName: "Mobile & U-Shape",
    category: "Mobile weighing",
    description:
      "Portable structures designed for fast loading and flexible work areas.",
    longDescription:
      "U-shape and movable scales reduce fixed installation requirements and support pallet weighing in changing work areas. The frame, wheels, handles and cable arrangement can be adapted to the customer's loading process.",
    image: "/u-shape-scale.jpg",
    capacities: "Configured to pallet and workflow",
    materials: "Stainless steel or painted steel options",
    applications: [
      "Pallet truck loading",
      "Temporary weighing stations",
      "Warehouse process changes",
      "Washable production areas",
    ],
    features: [
      "Open-side pallet access",
      "Integrated handles or wheels",
      "Low loading profile",
      "Compact storage footprint",
    ],
    specifications: [
      ["Capacity", "Configured to application"],
      ["Structure", "U-shape or movable platform"],
      ["Material", "Stainless or painted steel"],
      ["Mobility", "Handles, rollers or wheels"],
      ["Load cells", "Industrial load cell system"],
      ["Indicator", "Wired indicator options"],
    ],
    customization: [
      "Internal and external dimensions",
      "Wheel and handle arrangement",
      "Capacity and division",
      "Cable protection",
      "Indicator selection",
      "Surface finish",
    ],
  },
  {
    slug: "animal-special-scales",
    name: "Animal & Special Scales",
    shortName: "Animal & Special",
    category: "Application-specific",
    description:
      "Guardrail and special-purpose platforms configured for the actual workflow.",
    longDescription:
      "Animal and special-purpose weighing systems are engineered around movement, safety and loading access. Guardrail dimensions, gates, platform materials and indicator functions are selected for the target animal or specialist application.",
    image: "/animal-scale.jpg",
    capacities: "Custom capacity and platform size",
    materials: "Painted steel or stainless steel options",
    applications: [
      "Livestock weighing",
      "Veterinary and pet weighing",
      "Wheelchair weighing",
      "Roller and process integration",
    ],
    features: [
      "Animal weighing indicator mode",
      "Configurable gates and guardrails",
      "Non-slip platform options",
      "Application-specific access design",
    ],
    specifications: [
      ["Capacity", "Configured to application"],
      ["Platform", "Custom dimensions available"],
      ["Guardrail", "Fixed or gated structure"],
      ["Material", "Painted steel or stainless steel"],
      ["Indicator", "Animal mode and standard options"],
      ["Access", "Ramp, gate or special loading design"],
    ],
    customization: [
      "Guardrail height and spacing",
      "Gate direction",
      "Platform dimensions",
      "Animal weighing mode",
      "Surface material",
      "Integrated ramps",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
