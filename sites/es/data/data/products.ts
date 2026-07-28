export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  subcategory?: string;
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

const legacyLoadCellProduct = (model: string, image: string): Product => ({
  slug: `scale-accessories-${model.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name: `${model} Load Cell`,
  shortName: model,
  category: "Scale Accessories",
  subcategory: "Load cell",
  description: `${model} load cell from the original Asia Weighing load cell catalog, used for industrial scale production, maintenance and weighing system integration.`,
  longDescription: `${model} load cell from the original Asia Weighing load cell catalog, used for industrial scale production, maintenance and weighing system integration.`,
  image,
  capacities: "Configured by model",
  materials: "Alloy steel or stainless steel options",
  applications: [
    "Scale production",
    "Scale maintenance",
    "System integration",
    "Export project supply",
  ],
  features: [
    "Load cell option from the old Scale accessories catalog",
    "Configured by model, capacity and mounting requirement",
    "Matched with indicator and junction box systems",
    "Suitable for replacement parts or complete scale production",
  ],
  specifications: [
    ["Product style", `${model} Load Cell`],
    ["Category", "Scale Accessories"],
    ["Subcategory", "Load cell"],
    ["Model", model],
    ["Capacity range", "Configured by model"],
  ],
  customization: [
    "Capacity and division",
    "Material and protection rating",
    "Cable length and connector",
    "Indicator and junction box matching",
    "Mounting accessory selection",
    "Export packing and documentation",
  ],
});

type ImportedCatalogInput = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  subcategory?: string;
  description: string;
  details: string;
  image: string;
  model: string;
  capacity: string;
  accuracy: string;
};

const importedCatalogProduct = (input: ImportedCatalogInput): Product => {
  const isBalance = input.category === "Balances";
  const normalizedDetails = input.details.replace(/<=/g, "\u2264");
  const detailLines = normalizedDetails
    .split(/\n+/)
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);
  const features = detailLines.length
    ? detailLines.slice(0, 5)
    : isBalance
      ? ["Precision weighing configuration", "Stable laboratory display and operation", "Multiple weighing units", "External or internal calibration by model"]
      : ["Stable table top weighing structure", "Stainless steel weighing pan", "Counting and unit conversion functions", "Factory and wet-area weighing support"];
  const specifications: Array<[string, string]> = [
    ["Product style", input.name],
    ["Category", input.category],
    ...(input.subcategory ? [["Subcategory", input.subcategory] as [string, string]] : []),
    ["Model", input.model],
    ["Capacity", input.capacity],
    ["Readability / accuracy", input.accuracy],
  ];

  return {
    slug: input.slug,
    name: input.name,
    shortName: input.shortName,
    category: input.category,
    ...(input.subcategory ? { subcategory: input.subcategory } : {}),
    description: input.description,
    longDescription: normalizedDetails || input.description,
    image: input.image,
    capacities: input.capacity,
    materials: isBalance ? "Laboratory balance housing with stainless steel pan" : "Stainless steel weighing pan with industrial housing",
    applications: isBalance
      ? ["Laboratory weighing", "Sample measurement", "Precision counting", "Quality inspection"]
      : ["Food factory weighing", "Wet-area weighing", "Packing and counting", "Workshop tabletop weighing"],
    features,
    specifications,
    customization: isBalance
      ? ["Capacity and readability", "Calibration mode", "RS232 / USB output", "Draft shield and pan option", "Export packing and documentation"]
      : ["Capacity and division", "Display and power supply", "Interface and printer option", "Waterproof requirement", "Export packing and documentation"],
  };
};
export const products: Product[] = [
  {
    "slug": "truck-scales-steel-concrete-deck-above-ground-truck-scale",
    "name": "Steel Concrete Deck Above Ground Truck Scale",
    "shortName": "Steel Concrete Deck Above Ground Truck",
    "category": "Truck Scales",
    "description": "Best for coastal regions & cost-efficiency. Heavy steel frame with on-site concrete pouring. It naturally resists rust and lightning, while reducing long-distance shipping costs of heavy steel plates.",
    "longDescription": "Best for coastal regions & cost-efficiency. Heavy steel frame with on-site concrete pouring. It naturally resists rust and lightning, while reducing long-distance shipping costs of heavy steel plates.",
    "image": "/uploads/products/truck-scales-steel-concrete-deck-above-ground-truck-scale.png",
    "capacities": "60T, 80T, 100T, 120T, 150T",
    "materials": "Carbon steel frame with high tensile rebar mesh",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Heavy duty truck weighing structure",
      "Configurable platform length and capacity",
      "Digital or analog load cell options",
      "Suitable for factory, logistics, mining, and project sites",
      "7 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Steel Concrete Deck Above Ground Truck Scale"
      ],
      [
        "Category",
        "Truck Scales"
      ],
      [
        "Available sizes",
        "3x12m, 3x16m, 3x18m, 3x21m, 3.4x18m, 3.4x21m, 3.4x24m"
      ],
      [
        "Available capacities",
        "60T, 80T, 100T, 120T, 150T"
      ],
      [
        "Material",
        "Carbon steel frame with high tensile rebar mesh"
      ],
      [
        "Variant count",
        "7"
      ],
      [
        "Load cell options",
        "Zemic-HM9B"
      ],
      [
        "Signal type",
        "Digital or analog"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "truck-scales-steel-concrete-deck-pit-mounted-truck-scale",
    "name": "Steel Concrete Deck Pit Mounted Truck Scale",
    "shortName": "Steel Concrete Deck Pit Mounted Truck",
    "category": "Truck Scales",
    "description": "Best for harsh environments & heavy duty. Reinforced concrete slab flush with the ground. It perfectly solves the rust issue of underground moisture and withstands severe chemical corrosion.",
    "longDescription": "Best for harsh environments & heavy duty. Reinforced concrete slab flush with the ground. It perfectly solves the rust issue of underground moisture and withstands severe chemical corrosion.",
    "image": "/uploads/products/truck-scales-steel-concrete-deck-pit-mounted-truck-scale.png",
    "capacities": "60T, 80T, 100T, 120T, 150T",
    "materials": "Carbon steel frame with high tensile rebar mesh",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Heavy duty truck weighing structure",
      "Configurable platform length and capacity",
      "Digital or analog load cell options",
      "Suitable for factory, logistics, mining, and project sites",
      "7 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Steel Concrete Deck Pit Mounted Truck Scale"
      ],
      [
        "Category",
        "Truck Scales"
      ],
      [
        "Available sizes",
        "3x12m, 3x16m, 3x18m, 3x21m, 3.4x18m, 3.4x21m, 3.4x24m"
      ],
      [
        "Available capacities",
        "60T, 80T, 100T, 120T, 150T"
      ],
      [
        "Material",
        "Carbon steel frame with high tensile rebar mesh"
      ],
      [
        "Variant count",
        "7"
      ],
      [
        "Load cell options",
        "Zemic-HM9B"
      ],
      [
        "Signal type",
        "Digital or analog"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "truck-scales-steel-deck-above-ground-or-pit-mounted-truck-scale",
    "name": "Steel Deck Above Ground or Pit Mounted Truck Scale",
    "shortName": "Steel Deck Above Ground or Pit Mounted Truck",
    "category": "Truck Scales",
    "description": "Heavy duty vehicle weighing system for logistics yards, factories, mines and project sites. The structure can be configured by installation method, platform size, load cell signal type and site foundation requirements.",
    "longDescription": "Heavy duty vehicle weighing system for logistics yards, factories, mines and project sites. The structure can be configured by installation method, platform size, load cell signal type and site foundation requirements.",
    "image": "/uploads/products/truck-scales-steel-deck-above-ground-or-pit-mounted-truck-scale.png",
    "capacities": "30T, 60T, 80T, 100T, 120T, 150T",
    "materials": "Carbon steel, stainless steel, or galvanized options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Heavy duty truck weighing structure",
      "Configurable platform length and capacity",
      "Digital or analog load cell options",
      "Suitable for factory, logistics, mining, and project sites",
      "11 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Steel Deck Above Ground or Pit Mounted Truck Scale"
      ],
      [
        "Category",
        "Truck Scales"
      ],
      [
        "Available sizes",
        "3x8m, 3x12m, 3x14m, 3x16m, 3x18m, 3x20m, 3x22m, 3x24m, 3.4x18m, 3.4x21m, 3.4x24m"
      ],
      [
        "Available capacities",
        "30T, 60T, 80T, 100T, 120T, 150T"
      ],
      [
        "Material",
        "Carbon steel, stainless steel, or galvanized options"
      ],
      [
        "Variant count",
        "11"
      ],
      [
        "Signal type",
        "鏁板瓧"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "truck-scales-steel-deck-above-ground-truck-scale",
    "name": "Steel Deck Above Ground Truck Scale",
    "shortName": "Steel Deck Above Ground Truck",
    "category": "Truck Scales",
    "description": "Best for fast setup & wet areas. High-strength U-beam steel deck. Above-ground installation with ramps provides excellent drainage and ventilation, making it ideal for temporary sites and rainy regions.",
    "longDescription": "Best for fast setup & wet areas. High-strength U-beam steel deck. Above-ground installation with ramps provides excellent drainage and ventilation, making it ideal for temporary sites and rainy regions.",
    "image": "/uploads/products/truck-scales-steel-deck-above-ground-truck-scale.png",
    "capacities": "60T, 80T, 100T, 120T, 150T",
    "materials": "Carbon steel, stainless steel, or galvanized options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Heavy duty truck weighing structure",
      "Configurable platform length and capacity",
      "Digital or analog load cell options",
      "Suitable for factory, logistics, mining, and project sites",
      "7 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Steel Deck Above Ground Truck Scale"
      ],
      [
        "Category",
        "Truck Scales"
      ],
      [
        "Available sizes",
        "3x12m, 3x16m, 3x18m, 3x21m, 3.4x18m, 3.4x21m, 3.4x24m"
      ],
      [
        "Available capacities",
        "60T, 80T, 100T, 120T, 150T"
      ],
      [
        "Material",
        "Carbon steel, stainless steel, or galvanized options"
      ],
      [
        "Variant count",
        "7"
      ],
      [
        "Load cell options",
        "Zemic-HM9B"
      ],
      [
        "Signal type",
        "Digital or analog"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "truck-scales-steel-deck-pit-mounted-truck-scale",
    "name": "Steel Deck Pit Mounted Truck Scale",
    "shortName": "Steel Deck Pit Mounted Truck",
    "category": "Truck Scales",
    "description": "Best for space-saving & busy traffic. Premium steel deck installed flush with the ground. It occupies zero extra space, allowing trucks to drive over from any direction without obstacles.",
    "longDescription": "Best for space-saving & busy traffic. Premium steel deck installed flush with the ground. It occupies zero extra space, allowing trucks to drive over from any direction without obstacles.",
    "image": "/uploads/products/truck-scales-steel-deck-pit-mounted-truck-scale.jpg",
    "capacities": "60T, 80T, 100T, 120T, 150T",
    "materials": "Carbon steel, stainless steel, or galvanized options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Heavy duty truck weighing structure",
      "Configurable platform length and capacity",
      "Digital or analog load cell options",
      "Suitable for factory, logistics, mining, and project sites",
      "7 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Steel Deck Pit Mounted Truck Scale"
      ],
      [
        "Category",
        "Truck Scales"
      ],
      [
        "Available sizes",
        "3x12m, 3x16m, 3x18m, 3x21m, 3.4x18m, 3.4x21m, 3.4x24m"
      ],
      [
        "Available capacities",
        "60T, 80T, 100T, 120T, 150T"
      ],
      [
        "Material",
        "Carbon steel, stainless steel, or galvanized options"
      ],
      [
        "Variant count",
        "7"
      ],
      [
        "Load cell options",
        "Zemic-HM9B"
      ],
      [
        "Signal type",
        "Digital or analog"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "portable-axle-weighers-portable-axle-weigher",
    "name": "Portable Axle Weigher",
    "shortName": "Portable Axle Weigher",
    "category": "Truck Scales",
    "description": "Portable axle weighing pads for mobile overload inspection, temporary vehicle checks and flexible logistics weighing. Lightweight pads support fast setup and wireless data transmission options.",
    "longDescription": "Portable axle weighing pads for mobile overload inspection, temporary vehicle checks and flexible logistics weighing. Lightweight pads support fast setup and wireless data transmission options.",
    "image": "/uploads/products/portable-axle-weighers-portable-axle-weigher.png",
    "capacities": "15T, 20T, 30T, 40T",
    "materials": "Aluminum alloy",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Portable axle weighing pads",
      "Wireless data transmission option",
      "Static and dynamic weighing support",
      "Fast setup for mobile inspection work",
      "4 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Portable Axle Weigher"
      ],
      [
        "Category",
        "Truck Scales"
      ],
      [
        "Available sizes",
        "700x430mm, 900x500mm"
      ],
      [
        "Available capacities",
        "15T, 20T, 30T, 40T"
      ],
      [
        "Material",
        "Aluminum alloy"
      ],
      [
        "Variant count",
        "4"
      ],
      [
        "Signal type",
        "Wireless transmission"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "industrial-platform-scales-counting-bench-scale",
    "name": "Counting bench scale",
    "shortName": "Counting bench",
    "category": "Industrial Platform Scales",
    "description": "1. Thickened 304 stainless steel weighing pan with reinforced edge (anti-deformation) 2. Precision load cell 3. Quick-detach weighing pan with smooth surface for easy cleaning of industrial debris 4. High-resolution LCD indicators with quantity/weight display 5. Four 304 stainless steel shock-absorbing feet with rubber pads (anti-slip and anti-vibration) 6. Stainless steel adjustable pole with locking fixture for indicator stability",
    "longDescription": "1. Thickened 304 stainless steel weighing pan with reinforced edge (anti-deformation) 2. Precision load cell 3. Quick-detach weighing pan with smooth surface for easy cleaning of industrial debris 4. High-resolution LCD indicators with quantity/weight display 5. Four 304 stainless steel shock-absorbing feet with rubber pads (anti-slip and anti-vibration) 6. Stainless steel adjustable pole with locking fixture for indicator stability",
    "image": "/uploads/products/official-counting-bench-scale.png",
    "capacities": "30kg-600kg configurable range",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Thickened 304 stainless steel weighing pan with reinforced edge (anti-deformation)",
      "Precision load cell",
      "Quick-detach weighing pan with smooth surface for easy cleaning of industrial debris",
      "High-resolution LCD indicators with quantity/weight display",
      "Four 304 stainless steel shock-absorbing feet with rubber pads (anti-slip and anti-vibration)"
    ],
    "specifications": [
      [
        "Product style",
        "Counting bench scale"
      ],
      [
        "Category",
        "Industrial Platform Scales"
      ],
      [
        "Model",
        "Configured by product series"
      ],
      [
        "Capacity range",
        "30kg-600kg configurable range"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Platform or structure size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "industrial-platform-scales-guardrail-platform-scale",
    "name": "Guardrail Platform Scale",
    "shortName": "Guardrail Platform",
    "category": "Industrial Platform Scales",
    "description": "Compact industrial platform scale for packing, counting, receiving and production line weighing. Platform material, indicator stand, load cell and weighing range can be selected for the customer workflow.",
    "longDescription": "Compact industrial platform scale for packing, counting, receiving and production line weighing. Platform material, indicator stand, load cell and weighing range can be selected for the customer workflow.",
    "image": "/uploads/products/industrial-platform-scales-guardrail-platform-scale.png",
    "capacities": "60kg",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Compact platform for packing and production tasks",
      "Indicator stand and load cell options",
      "Painted mild steel or stainless steel options",
      "Suitable for counting, packing, and warehouse receiving"
    ],
    "specifications": [
      [
        "Product style",
        "Guardrail Platform Scale"
      ],
      [
        "Category",
        "Industrial Platform Scales"
      ],
      [
        "Available sizes",
        "40*40cm"
      ],
      [
        "Available capacities",
        "60kg"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
      [
        "Variant count",
        "1"
      ],
      [
        "Load cell options",
        "Mavin NA4"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "industrial-platform-scales-mild-steel-platform-scale-with-rubber-pad",
    "name": "Mild Steel Platform Scale With Rubber Pad",
    "shortName": "Mild Steel Platform With Rubber Pad",
    "category": "Industrial Platform Scales",
    "description": "Compact industrial platform scale for packing, counting, receiving and production line weighing. Platform material, indicator stand, load cell and weighing range can be selected for the customer workflow.",
    "longDescription": "Compact industrial platform scale for packing, counting, receiving and production line weighing. Platform material, indicator stand, load cell and weighing range can be selected for the customer workflow.",
    "image": "/uploads/products/industrial-platform-scales-mild-steel-platform-scale-with-rubber-pad.jpg",
    "capacities": "60kg, 150kg, 60-300kg, 300-600kg, 300kg, 500kg, 600kg",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Compact platform for packing and production tasks",
      "Indicator stand and load cell options",
      "Painted mild steel or stainless steel options",
      "Suitable for counting, packing, and warehouse receiving",
      "16 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Mild Steel Platform Scale With Rubber Pad"
      ],
      [
        "Category",
        "Industrial Platform Scales"
      ],
      [
        "Available sizes",
        "30*40cm, 40*50cm, 50*50cm, 45*60cm, 50*60cm, 60*60cm, 60*80cm"
      ],
      [
        "Available capacities",
        "60kg, 150kg, 60-300kg, 300-600kg, 300kg, 500kg, 600kg"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
      [
        "Variant count",
        "16"
      ],
      [
        "Load cell options",
        "Mavin NA2, Mavin NA4, Mavin NA3, Mavin NA116"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "industrial-platform-scales-round-tube-platform-scale",
    "name": "Round Tube Platform Scale",
    "shortName": "Round Tube Platform",
    "category": "Industrial Platform Scales",
    "description": "Compact industrial platform scale for packing, counting, receiving and production line weighing. Platform material, indicator stand, load cell and weighing range can be selected for the customer workflow.",
    "longDescription": "Compact industrial platform scale for packing, counting, receiving and production line weighing. Platform material, indicator stand, load cell and weighing range can be selected for the customer workflow.",
    "image": "/uploads/products/industrial-platform-scales-round-tube-platform-scale.jpg",
    "capacities": "60kg, 150kg, 300kg",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Compact platform for packing and production tasks",
      "Indicator stand and load cell options",
      "Painted mild steel or stainless steel options",
      "Suitable for counting, packing, and warehouse receiving",
      "6 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Round Tube Platform Scale"
      ],
      [
        "Category",
        "Industrial Platform Scales"
      ],
      [
        "Available sizes",
        "30*40cm, 40*50cm, 50*60cm"
      ],
      [
        "Available capacities",
        "60kg, 150kg, 300kg"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
      [
        "Variant count",
        "6"
      ],
      [
        "Load cell options",
        "Mavin NA2, Mavin NA4, Mavin NA3"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "industrial-platform-scales-waterproof-bench-scale",
    "name": "Waterproof bench scale",
    "shortName": "Waterproof bench",
    "category": "Industrial Platform Scales",
    "description": "1. Full 304 stainless steel polished frame and plate 2. Load cell with Waterproof cover (Mavin, zemic, Keli...) 3.Removable stainless steel plate for easy cleaning 4. Various indicators can be selected (Yaohua, Caisun, Dini argeo...) 5. Four adjustable waterproof 304 stainless steel feet",
    "longDescription": "1. Full 304 stainless steel polished frame and plate 2. Load cell with Waterproof cover (Mavin, zemic, Keli...) 3.Removable stainless steel plate for easy cleaning 4. Various indicators can be selected (Yaohua, Caisun, Dini argeo...) 5. Four adjustable waterproof 304 stainless steel feet",
    "image": "/uploads/products/official-waterproof-bench-scale.png",
    "capacities": "30kg-600kg configurable range",
    "materials": "Stainless steel options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Full 304 stainless steel polished frame and plate",
      "Load cell with Waterproof cover (Mavin, zemic, Keli...)",
      "Removable stainless steel plate for easy cleaning",
      "Various indicators can be selected (Yaohua, Caisun, Dini argeo...)",
      "Four adjustable waterproof 304 stainless steel feet"
    ],
    "specifications": [
      [
        "Product style",
        "Waterproof bench scale"
      ],
      [
        "Category",
        "Industrial Platform Scales"
      ],
      [
        "Model",
        "Configured by product series"
      ],
      [
        "Capacity range",
        "30kg-600kg configurable range"
      ],
      [
        "Material",
        "Stainless steel options"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Platform or structure size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "industrial-floor-scales-mobile-floor-scale",
    "name": "Mobile Floor Scale",
    "shortName": "Mobile Floor",
    "category": "Industrial Floor Scales",
    "description": "Low profile floor scale for pallet, cart and heavy load weighing in warehouses and factories. Ramp, mobile, washable and stainless steel options are available for different working environments.",
    "longDescription": "Low profile floor scale for pallet, cart and heavy load weighing in warehouses and factories. Ramp, mobile, washable and stainless steel options are available for different working environments.",
    "image": "/uploads/products/industrial-floor-scales-mobile-floor-scale.jpg",
    "capacities": "Configured by model",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Low profile industrial floor platform",
      "Junction box and load cell configuration options",
      "Ramp, column, or mobile options by style",
      "Suitable for pallet, cart, and heavy load weighing",
      "12 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Mobile Floor Scale"
      ],
      [
        "Category",
        "Industrial Floor Scales"
      ],
      [
        "Available sizes",
        "0.8*0.8m, 1.0*1.0m, 1.0*1.2m, 1.5*1.2m, 1.2*1.5m, 1.5*1.5m"
      ],
      [
        "Available capacities",
        "Configured by load range"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
      [
        "Variant count",
        "12"
      ],
      [
        "Load cell options",
        "KELI SQB, KELI SQB-SS"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "industrial-floor-scales-standard-mild-steel-floor-scale",
    "name": "Standard Mild Steel Floor Scale",
    "shortName": "Standard Mild Steel Floor",
    "category": "Industrial Floor Scales",
    "description": "Low profile floor scale for pallet, cart and heavy load weighing in warehouses and factories. Ramp, mobile, washable and stainless steel options are available for different working environments.",
    "longDescription": "Low profile floor scale for pallet, cart and heavy load weighing in warehouses and factories. Ramp, mobile, washable and stainless steel options are available for different working environments.",
    "image": "/uploads/products/industrial-floor-scales-standard-mild-steel-floor-scale.jpg",
    "capacities": "Configured by model",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Low profile industrial floor platform",
      "Junction box and load cell configuration options",
      "Ramp, column, or mobile options by style",
      "Suitable for pallet, cart, and heavy load weighing",
      "6 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Standard Mild Steel Floor Scale"
      ],
      [
        "Category",
        "Industrial Floor Scales"
      ],
      [
        "Available sizes",
        "0.8*0.8m, 1.2*1.5m, 1.5*2.0m"
      ],
      [
        "Available capacities",
        "Configured by load range"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
      [
        "Variant count",
        "6"
      ],
      [
        "Load cell options",
        "KELI SQB, KELI SQB-SS"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "industrial-floor-scales-ultra-low-profile-floor-scale",
    "name": "Ultra Low Profile Floor Scale",
    "shortName": "Ultra Low Profile Floor",
    "category": "Industrial Floor Scales",
    "description": "Low profile floor scale for pallet, cart and heavy load weighing in warehouses and factories. Ramp, mobile, washable and stainless steel options are available for different working environments.",
    "longDescription": "Low profile floor scale for pallet, cart and heavy load weighing in warehouses and factories. Ramp, mobile, washable and stainless steel options are available for different working environments.",
    "image": "/uploads/products/industrial-floor-scales-ultra-low-profile-floor-scale.jpg",
    "capacities": "Configured by model",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Low profile industrial floor platform",
      "Junction box and load cell configuration options",
      "Ramp, column, or mobile options by style",
      "Suitable for pallet, cart, and heavy load weighing",
      "12 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Ultra Low Profile Floor Scale"
      ],
      [
        "Category",
        "Industrial Floor Scales"
      ],
      [
        "Available sizes",
        "0.8*0.8m, 1.0*1.0m, 1.2*1.2m, 1.2*1.5m, 1.5*1.5m, 1.5*2.0m"
      ],
      [
        "Available capacities",
        "Configured by load range"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
      [
        "Variant count",
        "12"
      ],
      [
        "Load cell options",
        "KELI SQB, KELI SQB-SS"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "industrial-floor-scales-washable-stainless-steel-floor-scale",
    "name": "Washable Stainless Steel Floor Scale",
    "shortName": "Washable Stainless Steel Floor",
    "category": "Industrial Floor Scales",
    "description": "Low profile floor scale for pallet, cart and heavy load weighing in warehouses and factories. Ramp, mobile, washable and stainless steel options are available for different working environments.",
    "longDescription": "Low profile floor scale for pallet, cart and heavy load weighing in warehouses and factories. Ramp, mobile, washable and stainless steel options are available for different working environments.",
    "image": "/uploads/products/industrial-floor-scales-washable-stainless-steel-floor-scale.jpg",
    "capacities": "Configured by model",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Factory weighing",
      "Warehouse receiving",
      "Logistics and freight control",
      "Export project supply"
    ],
    "features": [
      "Low profile industrial floor platform",
      "Junction box and load cell configuration options",
      "Ramp, column, or mobile options by style",
      "Suitable for pallet, cart, and heavy load weighing",
      "6 size/capacity variants available within this style"
    ],
    "specifications": [
      [
        "Product style",
        "Washable Stainless Steel Floor Scale"
      ],
      [
        "Category",
        "Industrial Floor Scales"
      ],
      [
        "Available sizes",
        "0.8*0.8m, 1.0*1.0m, 1.0*1.2m, 1.5*1.2m, 1.2*1.5m, 1.5*1.5m"
      ],
      [
        "Available capacities",
        "Configured by load range"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
      [
        "Variant count",
        "6"
      ],
      [
        "Load cell options",
        "KELI SQB-SS"
      ]
    ],
    "customization": [
      "Capacity and division",
      "Platform size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "balances-analytical-balance",
    "name": "Analytical balance",
    "shortName": "Analytical balance",
    "category": "Balances",
    "description": "1.Automatic calibration, timed calibration 2.7 unit conversions: grams, carats, troy ounces, ounces, gram chills, coins, pounds 3.Counting function (sample count: 1/10/20/50/100) 路 Full-range tare 4.Aluminum alloy housing/windproof cover 5.Stainless steel weighing pan 6.LED LCD display with green backlight",
    "longDescription": "1.Automatic calibration, timed calibration 2.7 unit conversions: grams, carats, troy ounces, ounces, gram chills, coins, pounds 3.Counting function (sample count: 1/10/20/50/100) 路 Full-range tare 4.Aluminum alloy housing/windproof cover 5.Stainless steel weighing pan 6.LED LCD display with green backlight",
    "image": "/uploads/products/official-analytical-balance.png",
    "capacities": "Precision range by model",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Laboratory weighing",
      "Sample measurement",
      "Quality control",
      "Precision counting"
    ],
    "features": [
      "Automatic calibration, timed calibration",
      "7 unit conversions: grams, carats, troy ounces, ounces, gram chills, coins, pounds",
      "Counting function (sample count: 1/10/20/50/100) 路 Full-range tare",
      "Aluminum alloy housing/windproof cover",
      "Stainless steel weighing pan"
    ],
    "specifications": [
      [
        "Product style",
        "Analytical balance"
      ],
      [
        "Category",
        "Balances"
      ],
      [
        "Model",
        "Configured by product series"
      ],
      [
        "Capacity range",
        "Precision range by model"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Platform or structure size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "balances-electronic-balance",
    "name": "Electronic balance",
    "shortName": "Electronic balance",
    "category": "Balances",
    "description": "1. CE model certified with serial number verification 2. Weight units: grams, milligrams, and carats 3. Percentage calculation function 4. Internal calibration or external calibration 5. RS232 data output 6. Power supply: 230V/50Hz",
    "longDescription": "1. CE model certified with serial number verification 2. Weight units: grams, milligrams, and carats 3. Percentage calculation function 4. Internal calibration or external calibration 5. RS232 data output 6. Power supply: 230V/50Hz",
    "image": "/uploads/products/official-electronic-balance.png",
    "capacities": "Precision range by model",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Laboratory weighing",
      "Sample measurement",
      "Quality control",
      "Precision counting"
    ],
    "features": [
      "CE model certified with serial number verification",
      "Weight units: grams, milligrams, and carats",
      "Percentage calculation function",
      "Internal calibration or external calibration",
      "RS232 data output"
    ],
    "specifications": [
      [
        "Product style",
        "Electronic balance"
      ],
      [
        "Category",
        "Balances"
      ],
      [
        "Model",
        "Configured by product series"
      ],
      [
        "Capacity range",
        "Precision range by model"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Platform or structure size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "weighing-solutions-dynamic-tank-scale",
    "name": "Dynamic tank scale",
    "shortName": "Dynamic tank",
    "category": "Weighing Solutions",
    "description": "1.High-speed weighing enhances production line efficiency. 2.Multiple communication interfaces facilitate easy system integration. 3.Adaptive algorithms adapt to different products. 4.Modular design ensures simple and convenient maintenance. 5.Complies with international safety standards for safe operation.",
    "longDescription": "1.High-speed weighing enhances production line efficiency. 2.Multiple communication interfaces facilitate easy system integration. 3.Adaptive algorithms adapt to different products. 4.Modular design ensures simple and convenient maintenance. 5.Complies with international safety standards for safe operation.",
    "image": "/uploads/products/official-dynamic-tank-scale.png",
    "capacities": "Configured by model",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Process weighing",
      "Production line inspection",
      "Material batching",
      "Automation integration"
    ],
    "features": [
      "High-speed weighing enhances production line efficiency.",
      "Multiple communication interfaces facilitate easy system integration.",
      "Adaptive algorithms adapt to different products.",
      "Modular design ensures simple and convenient maintenance.",
      "Complies with international safety standards for safe operation."
    ],
    "specifications": [
      [
        "Product style",
        "Dynamic tank scale"
      ],
      [
        "Category",
        "Weighing Solutions"
      ],
      [
        "Model",
        "Configured by product series"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Platform or structure size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "weighing-solutions-static-tank-scale",
    "name": "Static tank scale",
    "shortName": "Static tank",
    "category": "Weighing Solutions",
    "description": "1.Made of stainless steel, corrosion-resistant and with a long service life. 2.High-precision sensor ensures accurate measurements. 3.Multiple measurement ranges are available to suit various applications. 4.Waterproof and dustproof design, suitable for harsh environments. 5.Includes convenient data management software.",
    "longDescription": "1.Made of stainless steel, corrosion-resistant and with a long service life. 2.High-precision sensor ensures accurate measurements. 3.Multiple measurement ranges are available to suit various applications. 4.Waterproof and dustproof design, suitable for harsh environments. 5.Includes convenient data management software.",
    "image": "/uploads/products/official-static-tank-scale.png",
    "capacities": "Configured by model",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Process weighing",
      "Production line inspection",
      "Material batching",
      "Automation integration"
    ],
    "features": [
      "Made of stainless steel, corrosion-resistant and with a long service life.",
      "High-precision sensor ensures accurate measurements.",
      "Multiple measurement ranges are available to suit various applications.",
      "Waterproof and dustproof design, suitable for harsh environments.",
      "Includes convenient data management software."
    ],
    "specifications": [
      [
        "Product style",
        "Static tank scale"
      ],
      [
        "Category",
        "Weighing Solutions"
      ],
      [
        "Model",
        "Configured by product series"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Platform or structure size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "weighing-module-systems-weighing-module-system",
    "name": "Weighing module system",
    "shortName": "Weighing module system",
    "category": "Weighing Module Systems",
    "description": "1.High-precision sensor with an accuracy of 0.01% 2.Temperature compensation technology ensures environmental stability 3.Multiple installation methods for flexible equipment adaptation 4.Explosion-proof certification, suitable for hazardous locations 5.Good long-term stability reduces calibration frequency",
    "longDescription": "1.High-precision sensor with an accuracy of 0.01% 2.Temperature compensation technology ensures environmental stability 3.Multiple installation methods for flexible equipment adaptation 4.Explosion-proof certification, suitable for hazardous locations 5.Good long-term stability reduces calibration frequency",
    "image": "/uploads/products/official-weighing-module-system.png",
    "capacities": "Configured by model",
    "materials": "Mild steel or stainless steel options",
    "applications": [
      "Tank weighing",
      "Hopper weighing",
      "Process control",
      "System integration"
    ],
    "features": [
      "High-precision sensor with an accuracy of",
      "01%",
      "Temperature compensation technology ensures environmental stability",
      "Multiple installation methods for flexible equipment adaptation",
      "Explosion-proof certification, suitable for hazardous locations"
    ],
    "specifications": [
      [
        "Product style",
        "Weighing module system"
      ],
      [
        "Category",
        "Weighing Module Systems"
      ],
      [
        "Model",
        "Configured by product series"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
      [
        "Material",
        "Mild steel or stainless steel options"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Platform or structure size",
      "Material and surface treatment",
      "Indicator and signal output",
      "Load cell selection",
      "Export packing and documentation"
    ]
  },
  {
    "slug": "scale-accessories-keli-sqb",
    "name": "Keli-SQB Load Cell",
    "shortName": "Keli-SQB",
    "category": "Scale Accessories",
    "description": "Shear beam load cell option for floor scales, platform scales and industrial weighing systems. Suitable for stable medium and heavy duty weighing with junction box integration.",
    "longDescription": "Shear beam load cell option for floor scales, platform scales and industrial weighing systems. Suitable for stable medium and heavy duty weighing with junction box integration.",
    "image": "/uploads/products/load-cell-keli-sqb.jpg",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Floor scale sensing",
      "Platform scale sensing",
      "Hopper weighing",
      "Industrial system integration"
    ],
    "features": [
      "Shear beam structure for industrial platform weighing",
      "Compatible with junction box and weighing indicator systems",
      "Configured by capacity, division and installation layout",
      "Suitable for replacement or new scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Keli-SQB Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Model",
        "Keli-SQB"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
      [
        "Material",
        "Alloy steel or stainless steel options"
      ],
      [
        "Signal type",
        "Analog load cell"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "subcategory": "Load cell"
  },
  {
    "slug": "scale-accessories-keli-uda",
    "name": "Keli-UDA Load Cell",
    "shortName": "Keli-UDA",
    "category": "Scale Accessories",
    "description": "Keli UDA load cell for weighing platforms and industrial equipment where stable signal output and dependable installation are required.",
    "longDescription": "Keli UDA load cell for weighing platforms and industrial equipment where stable signal output and dependable installation are required.",
    "image": "/uploads/products/load-cell-keli-uda.jpg",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Platform scale production",
      "Bench and floor scale systems",
      "Process weighing",
      "Equipment retrofit"
    ],
    "features": [
      "Keli sensor series for industrial weighing",
      "Stable output for indicator and control systems",
      "Capacity selected by project requirement",
      "Usable for replacement parts or complete scale supply"
    ],
    "specifications": [
      [
        "Product style",
        "Keli-UDA Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Model",
        "Keli-UDA"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
      [
        "Material",
        "Alloy steel or stainless steel options"
      ],
      [
        "Signal type",
        "Analog load cell"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "subcategory": "Load cell"
  },
  {
    "slug": "scale-accessories-mavin-nb2",
    "name": "Mavin Floor Scale Load Cell NB2",
    "shortName": "Mavin NB2",
    "category": "Scale Accessories",
    "description": "Mavin NB2 floor scale load cell for pallet, platform and floor scale systems requiring dependable medium and heavy load sensing.",
    "longDescription": "Mavin NB2 floor scale load cell for pallet, platform and floor scale systems requiring dependable medium and heavy load sensing.",
    "image": "/uploads/products/load-cell-mavin-nb2.jpg",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Floor scale systems",
      "Pallet weighing",
      "Warehouse receiving",
      "Scale maintenance and replacement"
    ],
    "features": [
      "Floor scale load cell option from the Mavin series",
      "Suitable for pallet and heavy platform weighing",
      "Works with junction box and standard weighing indicators",
      "Available for new production or spare part supply"
    ],
    "specifications": [
      [
        "Product style",
        "Mavin Floor Scale Load Cell NB2"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Model",
        "Mavin NB2"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
      [
        "Material",
        "Alloy steel or stainless steel options"
      ],
      [
        "Signal type",
        "Analog load cell"
      ],
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "subcategory": "Load cell"
  },
  {
    "category": "Scale Accessories",
    "capacities": "Configured by model",
    "materials": "Industrial weighing accessories",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Model selection",
      "Quantity and packaging",
      "Scale compatibility",
      "Cable length or fitting requirement",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-adjustable-feet",
    "name": "Adjustable Feet",
    "shortName": "Adjustable Feet",
    "description": "Adjustable feet for bench scales and platform scales, used for leveling, stable support and practical installation on factory or warehouse floors.",
    "image": "/uploads/products/adjustable-feet-assorted-leveling-feet.png",
    "features": [
      "Leveling support for bench and platform scales",
      "Helps improve stability on uneven working surfaces",
      "Selected by thread, load and structure requirement",
      "Available for replacement parts or complete scale kits"
    ],
    "longDescription": "Adjustable feet for bench scales and platform scales, used for leveling, stable support and practical installation on factory or warehouse floors.",
    "specifications": [
      [
        "Product style",
        "Adjustable Feet"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Accessory type",
        "Scale feet"
      ],
      [
        "Application",
        "Bench scale and platform scale leveling"
      ],
    ],
    "subcategory": "Adjustable feet"
  },
  {
    "category": "Scale Accessories",
    "capacities": "Configured by model",
    "materials": "Industrial weighing accessories",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Model selection",
      "Quantity and packaging",
      "Scale compatibility",
      "Cable length or fitting requirement",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-junction-box",
    "name": "Junction Box",
    "shortName": "Junction Box",
    "description": "Junction box for multi-load-cell weighing systems, used for signal connection, corner adjustment and integration with weighing indicators.",
    "image": "/uploads/products/adjustable-feet-stainless-junction-box.png",
    "features": [
      "Signal connection for multiple load cell systems",
      "Used in floor scales, truck scales and platform scales",
      "Matched with indicator, cable and load cell configuration",
      "Suitable for maintenance kits and complete project supply"
    ],
    "longDescription": "Junction box for multi-load-cell weighing systems, used for signal connection, corner adjustment and integration with weighing indicators.",
    "specifications": [
      [
        "Product style",
        "Junction Box"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Accessory type",
        "Junction box"
      ],
      [
        "Application",
        "Multi-load-cell scale systems"
      ],
    ],
    "subcategory": "Junction box"
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Load cell",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-keli-udb",
    "name": "Keli-UDB Load Cell",
    "shortName": "Keli-UDB",
    "description": "Keli UDB load cell for industrial scale structures and weighing equipment requiring stable analog signal output.",
    "longDescription": "Keli UDB load cell for industrial scale structures and weighing equipment requiring stable analog signal output.",
    "image": "/uploads/products/load-cell-keli-udb.jpg",
    "features": [
      "Load cell option from the old Scale accessories catalog",
      "Configured by model, capacity and mounting requirement",
      "Matched with indicator, cable and junction box systems",
      "Suitable for replacement parts or complete scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Keli-UDB Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Load cell"
      ],
      [
        "Model",
        "Keli-UDB"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Load cell",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-keli-udj",
    "name": "Keli-UDJ Load Cell",
    "shortName": "Keli-UDJ",
    "description": "Keli UDJ load cell selected for industrial platform, floor scale and custom weighing system requirements.",
    "longDescription": "Keli UDJ load cell selected for industrial platform, floor scale and custom weighing system requirements.",
    "image": "/uploads/products/load-cell-keli-udj.jpg",
    "features": [
      "Load cell option from the old Scale accessories catalog",
      "Configured by model, capacity and mounting requirement",
      "Matched with indicator, cable and junction box systems",
      "Suitable for replacement parts or complete scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Keli-UDJ Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Load cell"
      ],
      [
        "Model",
        "Keli-UDJ"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Load cell",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-keli-udn",
    "name": "Keli-UDN Load Cell",
    "shortName": "Keli-UDN",
    "description": "Keli UDN load cell for scale production, spare part supply and industrial weighing equipment integration.",
    "longDescription": "Keli UDN load cell for scale production, spare part supply and industrial weighing equipment integration.",
    "image": "/uploads/products/load-cell-keli-udn.jpg",
    "features": [
      "Load cell option from the old Scale accessories catalog",
      "Configured by model, capacity and mounting requirement",
      "Matched with indicator, cable and junction box systems",
      "Suitable for replacement parts or complete scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Keli-UDN Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Load cell"
      ],
      [
        "Model",
        "Keli-UDN"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Load cell",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-mavin-na1",
    "name": "Mavin NA1 Load Cell",
    "shortName": "Mavin NA1",
    "description": "Mavin NA1 load cell for compact bench scales, platform scales and OEM weighing equipment.",
    "longDescription": "Mavin NA1 load cell for compact bench scales, platform scales and OEM weighing equipment.",
    "image": "/uploads/products/load-cell-mavin-na1.jpg",
    "features": [
      "Load cell option from the old Scale accessories catalog",
      "Configured by model, capacity and mounting requirement",
      "Matched with indicator, cable and junction box systems",
      "Suitable for replacement parts or complete scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Mavin NA1 Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Load cell"
      ],
      [
        "Model",
        "Mavin NA1"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Load cell",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-mavin-na2",
    "name": "Mavin NA2 Load Cell",
    "shortName": "Mavin NA2",
    "description": "Mavin NA2 load cell option for bench scale and platform scale sensing applications.",
    "longDescription": "Mavin NA2 load cell option for bench scale and platform scale sensing applications.",
    "image": "/uploads/products/load-cell-mavin-na2.jpg",
    "features": [
      "Load cell option from the old Scale accessories catalog",
      "Configured by model, capacity and mounting requirement",
      "Matched with indicator, cable and junction box systems",
      "Suitable for replacement parts or complete scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Mavin NA2 Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Load cell"
      ],
      [
        "Model",
        "Mavin NA2"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Load cell",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-mavin-na3",
    "name": "Mavin NA3 Load Cell",
    "shortName": "Mavin NA3",
    "description": "Mavin NA3 load cell for compact industrial weighing structures and replacement sensor supply.",
    "longDescription": "Mavin NA3 load cell for compact industrial weighing structures and replacement sensor supply.",
    "image": "/uploads/products/load-cell-mavin-na3.jpg",
    "features": [
      "Load cell option from the old Scale accessories catalog",
      "Configured by model, capacity and mounting requirement",
      "Matched with indicator, cable and junction box systems",
      "Suitable for replacement parts or complete scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Mavin NA3 Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Load cell"
      ],
      [
        "Model",
        "Mavin NA3"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Load cell",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-mavin-na4",
    "name": "Mavin NA4 Load Cell",
    "shortName": "Mavin NA4",
    "description": "Mavin NA4 load cell for guardrail platform scales, bench scales and industrial scale production.",
    "longDescription": "Mavin NA4 load cell for guardrail platform scales, bench scales and industrial scale production.",
    "image": "/uploads/products/load-cell-mavin-na4.jpg",
    "features": [
      "Load cell option from the old Scale accessories catalog",
      "Configured by model, capacity and mounting requirement",
      "Matched with indicator, cable and junction box systems",
      "Suitable for replacement parts or complete scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Mavin NA4 Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Load cell"
      ],
      [
        "Model",
        "Mavin NA4"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Load cell",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-mavin-na116",
    "name": "Mavin NA116 Load Cell",
    "shortName": "Mavin NA116",
    "description": "Mavin NA116 load cell for selected weighing structures and matched scale accessory supply.",
    "longDescription": "Mavin NA116 load cell for selected weighing structures and matched scale accessory supply.",
    "image": "/uploads/products/load-cell-mavin-na116.jpg",
    "features": [
      "Load cell option from the old Scale accessories catalog",
      "Configured by model, capacity and mounting requirement",
      "Matched with indicator, cable and junction box systems",
      "Suitable for replacement parts or complete scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Mavin NA116 Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Load cell"
      ],
      [
        "Model",
        "Mavin NA116"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Load cell",
    "capacities": "Configured by model",
    "materials": "Alloy steel or stainless steel options",
    "applications": [
      "Scale production",
      "Scale maintenance",
      "System integration",
      "Export project supply"
    ],
    "customization": [
      "Capacity and division",
      "Material and protection rating",
      "Cable length and connector",
      "Indicator and junction box matching",
      "Mounting accessory selection",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-mavin-na117",
    "name": "Mavin NA117 Load Cell",
    "shortName": "Mavin NA117",
    "description": "Mavin NA117 load cell for industrial weighing equipment, sensor replacement and system integration.",
    "longDescription": "Mavin NA117 load cell for industrial weighing equipment, sensor replacement and system integration.",
    "image": "/uploads/products/load-cell-mavin-na117.jpg",
    "features": [
      "Load cell option from the old Scale accessories catalog",
      "Configured by model, capacity and mounting requirement",
      "Matched with indicator, cable and junction box systems",
      "Suitable for replacement parts or complete scale production"
    ],
    "specifications": [
      [
        "Product style",
        "Mavin NA117 Load Cell"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Load cell"
      ],
      [
        "Model",
        "Mavin NA117"
      ],
      [
        "Capacity range",
        "Configured by model"
      ],
    ]
  },
  ...[
    ["Mavin NA164", "/uploads/products/load-cell-mavin-na164.jpg"],
    ["Zemic B6E", "/uploads/products/load-cell-zemic-b6e.jpg"],
    ["Zemic B6E3", "/uploads/products/load-cell-zemic-b6e3.jpg"],
    ["Zemic B6F", "/uploads/products/load-cell-zemic-b6f.jpg"],
    ["Zemic B6G", "/uploads/products/load-cell-zemic-b6g.jpg"],
    ["Zemic B8D", "/uploads/products/load-cell-zemic-b8d.jpg"],
    ["Zemic H8C", "/uploads/products/load-cell-zemic-h8c.jpg"],
    ["Zemic L6E", "/uploads/products/load-cell-zemic-l6e.jpg"],
    ["Zemic L6E3", "/uploads/products/load-cell-zemic-l6e3.jpg"],
    ["Zemic L6F", "/uploads/products/load-cell-zemic-l6f.jpg"],
    ["Zemic L6G", "/uploads/products/load-cell-zemic-l6g.jpg"],
  ].map(([model, image]) => legacyLoadCellProduct(model, image)),
  {
    "category": "Scale Accessories",
    "subcategory": "Indicator",
    "capacities": "Matched by scale system",
    "materials": "Industrial weighing indicator",
    "applications": [
      "Bench scale display",
      "Floor scale display",
      "Truck scale display",
      "Industrial system integration"
    ],
    "customization": [
      "Signal type",
      "Display and enclosure requirement",
      "Communication interface",
      "Power supply",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-indicator-xk315a1gb-lf",
    "name": "XK315A1GB-LF Water Proof Indicator",
    "shortName": "XK315A1GB-LF Water Proof Indicator",
    "description": "Waterproof IP66 weighing indicator for industrial scales, with rechargeable battery operation and load cell driving capability.",
    "longDescription": "Waterproof IP66 weighing indicator for industrial scales, with rechargeable battery operation and load cell driving capability.",
    "image": "/uploads/products/indicator-xk315a1gb-lf.jpg",
    "features": [
      "Waterproof IP66 indicator option",
      "Drives 4x350 ohm or 8x700 ohm load cells",
      "Manual and automatic accumulation",
      "Optional RS-232 or RS485 communication"
    ],
    "specifications": [
      [
        "Product style",
        "XK315A1GB-LF Water Proof Indicator"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Indicator"
      ],
      [
        "Brand",
        "CaiSun"
      ],
      [
        "Signal type",
        "Analog load cell indicator"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Indicator",
    "capacities": "Matched by scale system",
    "materials": "Industrial weighing indicator",
    "applications": [
      "Bench scale display",
      "Floor scale display",
      "Truck scale display",
      "Industrial system integration"
    ],
    "customization": [
      "Signal type",
      "Display and enclosure requirement",
      "Communication interface",
      "Power supply",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-indicator-xk315a1x",
    "name": "XK315A1X Indicator",
    "shortName": "XK315A1X Indicator",
    "description": "CaiSun XK315A1X weighing indicator for platform and floor scales with accumulation, filtering and counting functions.",
    "longDescription": "CaiSun XK315A1X weighing indicator for platform and floor scales with accumulation, filtering and counting functions.",
    "image": "/uploads/products/indicator-xk315a1x.jpg",
    "features": [
      "Rechargeable battery operation",
      "Programmable zero tracking and digital filter",
      "Selectable kg and lb units",
      "Counting and hold function support"
    ],
    "specifications": [
      [
        "Product style",
        "XK315A1X Indicator"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Indicator"
      ],
      [
        "Brand",
        "CaiSun"
      ],
      [
        "Signal type",
        "Analog load cell indicator"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Indicator",
    "capacities": "Matched by scale system",
    "materials": "Industrial weighing indicator",
    "applications": [
      "Bench scale display",
      "Floor scale display",
      "Truck scale display",
      "Industrial system integration"
    ],
    "customization": [
      "Signal type",
      "Display and enclosure requirement",
      "Communication interface",
      "Power supply",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-indicator-xk3190-a12-ss",
    "name": "XK3190-A12+SS Indicator",
    "shortName": "XK3190-A12+SS Indicator",
    "description": "YaoHua XK3190-A12+SS indicator for precision weighing display, counting and optional communication output.",
    "longDescription": "YaoHua XK3190-A12+SS indicator for precision weighing display, counting and optional communication output.",
    "image": "/uploads/products/indicator-xk3190-a12-ss.jpg",
    "features": [
      "High precision A/D conversion",
      "Digital filtering and zero tracking setup",
      "Counting function support",
      "Optional RS232 and scoreboard interface"
    ],
    "specifications": [
      [
        "Product style",
        "XK3190-A12+SS Indicator"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Indicator"
      ],
      [
        "Brand",
        "YaoHua"
      ],
      [
        "Signal type",
        "Analog load cell indicator"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Indicator",
    "capacities": "Matched by scale system",
    "materials": "Industrial weighing indicator",
    "applications": [
      "Bench scale display",
      "Floor scale display",
      "Truck scale display",
      "Industrial system integration"
    ],
    "customization": [
      "Signal type",
      "Display and enclosure requirement",
      "Communication interface",
      "Power supply",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-indicator-xk3190-a12-e",
    "name": "XK3190-A12+(E) Indicator",
    "shortName": "XK3190-A12+(E) Indicator",
    "description": "YaoHua XK3190-A12+(E) weighing indicator with rechargeable battery, selectable backlight and optional livestock averaging function.",
    "longDescription": "YaoHua XK3190-A12+(E) weighing indicator with rechargeable battery, selectable backlight and optional livestock averaging function.",
    "image": "/uploads/products/indicator-xk3190-a12-e.jpg",
    "features": [
      "High precision A/D conversion",
      "Selectable backlight mode",
      "Low battery alarm and auto power off",
      "Optional KG/LB and averaging functions"
    ],
    "specifications": [
      [
        "Product style",
        "XK3190-A12+(E) Indicator"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Indicator"
      ],
      [
        "Brand",
        "YaoHua"
      ],
      [
        "Signal type",
        "Analog load cell indicator"
      ],
    ]
  },
  {
    "category": "Scale Accessories",
    "subcategory": "Indicator",
    "capacities": "Matched by scale system",
    "materials": "Industrial weighing indicator",
    "applications": [
      "Bench scale display",
      "Floor scale display",
      "Truck scale display",
      "Industrial system integration"
    ],
    "customization": [
      "Signal type",
      "Display and enclosure requirement",
      "Communication interface",
      "Power supply",
      "Export packing and documentation"
    ],
    "slug": "scale-accessories-indicator-a27-e",
    "name": "A27 E Indicator",
    "shortName": "A27 E Indicator",
    "description": "YaoHua A27 E indicator with large LED display, peak hold, accumulation and high-low limit alarm functions.",
    "longDescription": "YaoHua A27 E indicator with large LED display, peak hold, accumulation and high-low limit alarm functions.",
    "image": "/uploads/products/indicator-a27-e.jpg",
    "features": [
      "Large highlight LED display",
      "Peak hold and average value functions",
      "High-low limits alarm",
      "RS232 and scoreboard communication options"
    ],
    "specifications": [
      [
        "Product style",
        "A27 E Indicator"
      ],
      [
        "Category",
        "Scale Accessories"
      ],
      [
        "Subcategory",
        "Indicator"
      ],
      [
        "Brand",
        "YaoHua"
      ],
      [
        "Signal type",
        "Analog load cell indicator"
      ],
    ]
  },
  // Imported product catalog 4.0 start
  {
      "slug": "scale-accessories-indicator-yaohua-xk3190-a12-e",
      "name": "Yaohua XK3190-A12+E",
      "shortName": "XK3190-A12+E",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "Yaohua XK3190-A12+E weighing indicator for compact weighing systems with stable display and practical battery operation.",
      "longDescription": "The Yaohua XK3190-A12+E is a practical weighing indicator for compact scale systems. It supports stable weighing display, rechargeable battery operation and routine industrial weighing use.",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-yaohua-xk3190-a12-e.png",
      "capacities": "30kg,50kg,100kg,150kg,200kg,300kg",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Stable reading response for compact weighing applications",
          "Rechargeable battery support for flexible daily operation",
          "Overload alarm protection for routine scale use",
          "Suitable for industrial weighing and service replacement"
      ],
      "specifications": [
          [
              "Product style",
              "Yaohua XK3190-A12+E"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "XK3190-A12+E"
          ],
          [
              "Capacity",
              "30kg,50kg,100kg,150kg,200kg,300kg"
          ],
          [
              "Accuracy",
              "0.01/0.005kg\n0.02/0.01kg\n0.05/0.02kg\n0.05/0.02kg\n0.10/0.05kg\n0.10/0.05kg"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-indicator-yaohua-xk3190-a15e",
      "name": "Yaohua XK3190-A15E",
      "shortName": "XK3190-A15E",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "Yaohua XK3190-A15E counting and price computing indicator with high-precision A/D conversion.",
      "longDescription": "High-precision A/D conversion, max 30000 external divisions, counting precision over 1/10000\nBuilt-in raw code display for tolerance analysis without test weights\nAdjustable zero tracking, zero-set range and zeroing speed\nOptional price computing & counting modes\nAccumulation & total value display\nFlexible sample weight input with auto counting precision correction\nOptional backlight modes for A15 LCD version\nPower-saving display options for A15E LED version\nAC/DC dual power, built-in 6V/4AH maintenance-free rechargeable battery\nReal-time battery level indicator, low voltage alarm & auto power-off protection\nOptional RS-232 port with adjustable baud rat",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-yaohua-xk3190-a15e.png",
      "capacities": "Configured by model",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "High-precision A/D conversion with up to 30000 external divisions",
          "Counting and optional price computing modes",
          "Accumulation and total value display for batch work",
          "AC/DC dual power with rechargeable battery support"
      ],
      "specifications": [
          [
              "Product style",
              "Yaohua XK3190-A15E"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "XK3190-A15E"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "1/30,000"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-indicator-yaohua-xk3190-t8",
      "name": "Yaohua XK3190-T8",
      "shortName": "XK3190-T8",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "Yaohua XK3190-T8 stainless steel indicator for waterproof industrial weighing applications.",
      "longDescription": "Large multifunction LCD display\nPeak hold & animal weighing function\nMultiple units (kg/lb/t)\nManual & automatic accumulation\nPreset tare and High/Low limit alarm\nHigh-precision A/D conversion (1/30,000 readability)\nAuto sleep, backlight adjustment & power saving\nOptional RS-232/RS485 communication and external printer support",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-yaohua-xk3190-t8.png",
      "capacities": "Configured by model",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "IP67 waterproof stainless steel indicator housing",
          "Large multifunction LCD display for clear operation",
          "Peak hold, animal weighing and accumulation functions",
          "Optional RS232 or RS485 communication support"
      ],
      "specifications": [
          [
              "Product style",
              "Yaohua XK3190-T8"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "XK3190-T8"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Class III"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-indicator-yaohua-xk3190-a27e",
      "name": "Yaohua XK3190-A27E",
      "shortName": "XK3190-A27E",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "Yaohua XK3190-A27E large LED display indicator with peak hold, accumulation and limit alarm functions.",
      "longDescription": "2-inch bright single-window large LED display\nPeak hold & average display\nManual & auto accumulation\n4-stage battery indicator, low voltage alarm & auto shutoff\nHi/OK/Lo limit alarm indication\nAuto sleep functionPreset tare\n10x auto precision magnification\nHigh-precision ADC, 1/30000 readability\nBuilt-in 6V/4AH rechargeable maintenance-free battery\nOptional RS232C port with adjustable baud rate\nOptional 20mA current loop port for external large screen",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-yaohua-xk3190-a27e.png",
      "capacities": "Configured by model",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Bright single-window large LED display",
          "Peak hold and average display functions",
          "Manual and automatic accumulation modes",
          "Battery level indication with low-voltage alarm",
          "Hi/OK/Lo limit alarm indication"
      ],
      "specifications": [
          [
              "Product style",
              "Yaohua XK3190-A27E"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "XK3190-A27E"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Class III"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-indicator-yaohua-xk3190-a35ep",
      "name": "Yaohua XK3190-A35EP",
      "shortName": "XK3190-A35EP",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "Label printing weighing indicator with built-in printer, counting, accumulation and optional Bluetooth support.",
      "longDescription": "High precision, max capacity 5000\nBuilt-in label printer, custom printable formats supported\n15 keys: 0-9 numeric keys + 5 function keys\nCounting, accumulation & animal weighing functions\nOptional Bluetooth with matched Android APP\nStandard RS232 port for PC weighing management software\nSafe eco-friendly AC/DC dual power supply\n4\u00d72200mAh lithium batteries for long standby time",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-yaohua-xk3190-a35ep.png",
      "capacities": "Configured by model",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Built-in label printer with customizable print formats",
          "Counting, accumulation and animal weighing functions",
          "Standard RS232 port for PC weighing management software",
          "Optional Bluetooth connection with matched Android application"
      ],
      "specifications": [
          [
              "Product style",
              "Yaohua XK3190-A35EP"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "XK3190-A35EP"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "n=5000"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-indicator-dfwl-multifunction-weight-indicator",
      "name": "DFWL Multifunction Weight Indicator",
      "shortName": "DFWL",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "Dini Argeo DFWL multifunction weighing indicator with ABS case, backlit LCD display and waterproof keypad.",
      "longDescription": "The Dini Argeo DFWL is a versatile multifunction weight indicator with an ABS case, backlit LCD display and waterproof 5-key keypad. It is easy to program and suitable for a wide range of industrial and commercial weighing applications.",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-dfwl-multifunction-weight-indicator.jpg",
      "capacities": "Configured by model",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Backlit LCD display with high-contrast digits and function icons",
          "Easy-to-clean ABS IP54 case for demanding industrial environments",
          "Adjustable support bracket for table, column or wall installation",
          "Digital calibration and setup from keypad or PC through DINITOOLS"
      ],
      "specifications": [
          [
              "Product style",
              "DFWL Multifunction Weight Indicator"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "DFWL"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Class III"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-indicator-yaohua-xk3190-a9p-indicator",
      "name": "Yaohua XK3190-A9P Indicator",
      "shortName": "XK3190-A9P",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "Yaohua XK3190-A9P weighing indicator with Sigma-Delta A/D conversion and built-in micro-printer.",
      "longDescription": "The XK3190-A9P is a Sigma-Delta A/D weighing indicator for platform, floor and truck scales. It supports 1 to 8 load cells and includes a built-in pin micro-printer for tickets and reports.",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-yaohua-xk3190-a9p-indicator.jpg",
      "capacities": "Configured by model",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Sigma-Delta A/D conversion for -16 mV to +18 mV input signals",
          "Strong anti-interference capability for industrial weighing sites",
          "AC/DC dual power supply with standard battery configuration",
          "LED display with three-level battery indication"
      ],
      "specifications": [
          [
              "Product style",
              "Yaohua XK3190-A9P Indicator"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "XK3190-A9P"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Class III"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-indicator-keli-d2008-type-dx-indicator",
      "name": "Keli D2008 Type (DX) Indicator",
      "shortName": "Keli D2008 Type (DX)",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "KELI D2008 Type (DX) digital truck scale indicator for vehicle weighing and weighbridge systems.",
      "longDescription": "The KELI D2008 Type (DX) is a digital truck scale weighing indicator for vehicle weighing projects where a stable indicator is needed for digital truck scale systems.",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-keli-d2008-type-dx-indicator.png",
      "capacities": "Configured by model",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Designed for digital truck scale systems",
          "Suitable for weighbridge and vehicle weighing stations",
          "Reliable option for industrial truck weighing operation",
          "Recognized KELI indicator choice for project supply"
      ],
      "specifications": [
          [
              "Product style",
              "Keli D2008 Type (DX) Indicator"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "Keli D2008 Type (DX)"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Class III"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-indicator-keli-xk3118t1-a1-indicator",
      "name": "Keli XK3118T1-A1 Indicator",
      "shortName": "Keli XK3118T1-A1",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "KELI XK3118T1-A1 analog indicator for compact floor scale and platform scale systems.",
      "longDescription": "The KELI XK3118T1-A1 is an analog small floor scale indicator for compact industrial floor scale and platform scale applications. It is suitable for weighing systems that require a practical indicator solution for daily production, inspection and maintenance.",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-keli-xk3118t1-a1-indicator.png",
      "capacities": "Configured by model",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Analog indicator for compact floor scale applications",
          "Suitable for platform scale and small industrial weighing systems",
          "Practical option for production, maintenance and project supply"
      ],
      "specifications": [
          [
              "Product style",
              "Keli XK3118T1-A1 Indicator"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "Keli XK3118T1-A1"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Class III"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-indicator-d39-wb-indicator",
      "name": "D39-WB Indicator",
      "shortName": "D39-WB",
      "category": "Scale Accessories",
      "subcategory": "Indicator",
      "description": "KELI D39-WB digital truck scale indicator for vehicle weighing and weighbridge applications.",
      "longDescription": "The KELI D39-WB is a digital truck scale indicator used for vehicle weighing and weighbridge systems. It is suitable for industrial weighing projects that require stable display, reliable signal processing and practical truck scale integration.",
      "image": "/uploads/products/import-4-0/scale-accessories-indicator-d39-wb-indicator.jpg",
      "capacities": "Configured by model",
      "materials": "Industrial weighing equipment material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Designed for digital truck scale and weighbridge applications",
          "Stable signal processing for vehicle weighing projects",
          "Suitable for industrial installation, inspection and maintenance",
          "Practical indicator option for export truck scale systems"
      ],
      "specifications": [
          [
              "Product style",
              "D39-WB Indicator"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Indicator"
          ],
          [
              "Model",
              "D39-WB"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Class III"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-cable-standard-load-cell-cable",
      "name": "Standard Load Cell Cable",
      "shortName": "Standard Load Cell Cable",
      "category": "Scale Accessories",
      "subcategory": "Cable",
      "description": "Standard shielded load cell cable for stable signal transmission in weighing systems.",
      "longDescription": "High-quality load cell cable with durable PVC sheath, designed for stable signal transmission and reliable connection in weighing systems. Suitable for various industrial weighing applications.",
      "image": "/uploads/products/standard-load-cell-cable.png",
      "capacities": "Configured by model",
      "materials": "Shielded weighing system cable",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Shielded cable structure for stable weighing signal transmission",
          "Suitable for load cell, junction box and indicator connection",
          "Durable sheath for routine industrial scale installation",
          "Practical accessory for scale production and maintenance"
      ],
      "specifications": [
          [
              "Product style",
              "Standard Load Cell Cable"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Cable"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-cable-rat-proof-cable",
      "name": "Rat-proof Cable",
      "shortName": "Rat-proof Cable",
      "category": "Scale Accessories",
      "subcategory": "Cable",
      "description": "Rat-proof load cell cable with anti-chewing protection for harsh weighing environments.",
      "longDescription": "Specially designed rat-proof cable with anti-chewing protection, providing enhanced durability and preventing damage in harsh environments.",
      "image": "/uploads/products/rat-proof-cable.png",
      "capacities": "Configured by model",
      "materials": "Shielded weighing system cable",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Anti-chewing protection helps prevent rodent damage",
          "Designed for harsh factory, warehouse and outdoor environments",
          "Supports reliable signal transmission for weighing systems",
          "Useful for maintenance replacement and new scale installation"
      ],
      "specifications": [
          [
              "Product style",
              "Rat-proof Cable"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Cable"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-dust-cover-ss-dust-cover-stainless",
      "name": "SS Dust Cover (Stainless)",
      "shortName": "Big",
      "category": "Scale Accessories",
      "subcategory": "Dust Cover",
      "description": "Large stainless steel dust cover for protecting weighing indicators and terminals.",
      "longDescription": "Stainless steel dust cover with excellent durability and corrosion resistance, providing reliable protection against dust and external impact for weighing equipment.",
      "image": "/uploads/products/import-4-0/scale-accessories-dust-cover-ss-dust-cover-stainless.jpg",
      "capacities": "Configured by model",
      "materials": "Stainless steel construction",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Stainless steel construction for corrosion resistance",
          "Washable surface for easier daily cleaning",
          "Protects weighing indicators from dust and light impact",
          "Suitable for factory, warehouse and export scale systems"
      ],
      "specifications": [
          [
              "Product style",
              "SS Dust Cover (Stainless)"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Dust Cover"
          ],
          [
              "Model",
              "Big"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-dust-cover-ss-dust-cover-stainless-2",
      "name": "SS Dust Cover (Stainless)",
      "shortName": "Small",
      "category": "Scale Accessories",
      "subcategory": "Dust Cover",
      "description": "Small stainless steel dust cover for protecting compact weighing indicators and terminals.",
      "longDescription": "Stainless steel dust cover with excellent durability and corrosion resistance, providing reliable protection against dust and external impact for weighing equipment.",
      "image": "/uploads/products/import-4-0/scale-accessories-dust-cover-ss-dust-cover-stainless-2.jpg",
      "capacities": "Configured by model",
      "materials": "Stainless steel construction",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Compact stainless steel protective cover",
          "Corrosion-resistant and washable surface",
          "Helps protect indicator terminals from dust and impact",
          "Suitable for compact scale systems and service replacement"
      ],
      "specifications": [
          [
              "Product style",
              "SS Dust Cover (Stainless)"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Dust Cover"
          ],
          [
              "Model",
              "Small"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-dust-cover-plastic-dust-cover",
      "name": "Plastic Dust Cover",
      "shortName": "Big",
      "category": "Scale Accessories",
      "subcategory": "Dust Cover",
      "description": "Large plastic dust cover for daily protection of weighing terminals and scale components.",
      "longDescription": "Lightweight plastic dust cover with good dust protection and easy installation, suitable for protecting weighing components in daily working environments.",
      "image": "/uploads/products/import-4-0/scale-accessories-dust-cover-plastic-dust-cover.jpg",
      "capacities": "Configured by model",
      "materials": "Protective cover material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Lightweight plastic cover for daily dust protection",
          "Easy installation on compatible weighing terminals",
          "Suitable for routine factory and warehouse environments",
          "Practical accessory for protecting scale components"
      ],
      "specifications": [
          [
              "Product style",
              "Plastic Dust Cover"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Dust Cover"
          ],
          [
              "Model",
              "Big"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-dust-cover-plastic-dust-cover-2",
      "name": "Plastic Dust Cover",
      "shortName": "Small",
      "category": "Scale Accessories",
      "subcategory": "Dust Cover",
      "description": "Small plastic dust cover for compact weighing terminals and scale component protection.",
      "longDescription": "Lightweight plastic dust cover with good dust protection and easy installation, suitable for protecting weighing components in daily working environments.",
      "image": "/uploads/products/import-4-0/scale-accessories-dust-cover-plastic-dust-cover-2.jpg",
      "capacities": "Configured by model",
      "materials": "Protective cover material by model",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Compact plastic cover for weighing terminal protection",
          "Lightweight structure with easy installation",
          "Helps reduce dust exposure during daily use",
          "Suitable for small scale systems and maintenance replacement"
      ],
      "specifications": [
          [
              "Product style",
              "Plastic Dust Cover"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Dust Cover"
          ],
          [
              "Model",
              "Small"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-battery-lead-acid-battery-4v4ah",
      "name": "Lead-acid Battery 4V4AH",
      "shortName": "Lead-acid Battery 4V4AH",
      "category": "Scale Accessories",
      "subcategory": "Battery",
      "description": "4V4AH rechargeable lead-acid battery for electronic scales and weighing equipment.",
      "longDescription": "Rechargeable lead-acid battery with stable power output and long service life, suitable for electronic scales and weighing equipment.",
      "image": "/uploads/products/import-4-0/scale-accessories-battery-lead-acid-battery-4v4ah.jpg",
      "capacities": "Configured by model",
      "materials": "Rechargeable lead-acid battery",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Rechargeable lead-acid battery for weighing equipment",
          "Stable power output for compatible electronic scales",
          "Maintenance-free design for daily operation",
          "Suitable for service replacement and spare parts supply"
      ],
      "specifications": [
          [
              "Product style",
              "Lead-acid Battery 4V4AH"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Battery"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-battery-lead-acid-battery-6v2-8ah",
      "name": "Lead-acid Battery 6V2.8AH",
      "shortName": "Lead-acid Battery 6V2.8AH",
      "category": "Scale Accessories",
      "subcategory": "Battery",
      "description": "6V2.8AH compact rechargeable lead-acid battery for small weighing equipment.",
      "longDescription": "Compact rechargeable lead-acid battery with stable voltage output, ideal for small weighing equipment and electronic scale applications.",
      "image": "/uploads/products/import-4-0/scale-accessories-battery-lead-acid-battery-6v2-8ah.jpg",
      "capacities": "Configured by model",
      "materials": "Rechargeable lead-acid battery",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Compact rechargeable battery for small scale systems",
          "Stable voltage output for compatible weighing indicators",
          "Suitable for portable and bench weighing equipment",
          "Useful spare part for maintenance and export supply"
      ],
      "specifications": [
          [
              "Product style",
              "Lead-acid Battery 6V2.8AH"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Battery"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-battery-lead-acid-battery-6v4ah",
      "name": "Lead-acid Battery 6V4AH",
      "shortName": "Lead-acid Battery 6V4AH",
      "category": "Scale Accessories",
      "subcategory": "Battery",
      "description": "6V4AH rechargeable lead-acid battery for weighing indicators and portable scale devices.",
      "longDescription": "High-performance rechargeable battery providing reliable power supply for weighing indicators and portable weighing devices.",
      "image": "/uploads/products/import-4-0/scale-accessories-battery-lead-acid-battery-6v4ah.jpg",
      "capacities": "Configured by model",
      "materials": "Rechargeable lead-acid battery",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Reliable rechargeable power source for weighing indicators",
          "Designed for portable scales and compatible scale devices",
          "Stable output for routine daily operation",
          "Practical spare part for scale maintenance projects"
      ],
      "specifications": [
          [
              "Product style",
              "Lead-acid Battery 6V4AH"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Battery"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-load-cell-keli-qs-30t-40t-load-cell",
      "name": "Keli QS-30T 40t Load Cell",
      "shortName": "QS-30T 40t Load Cell",
      "category": "Scale Accessories",
      "subcategory": "Load cell",
      "description": "High-performance load cell designed for industrial weighing systems with excellent stability and durability.",
      "longDescription": "Double ended shear beam load cell with robust metal construction, providing high accuracy and reliable performance. Suitable for truck scales, platform scales, and other heavy-duty weighing applications. Designed for stable operation in demanding industrial environments.",
      "image": "/uploads/products/import-4-0/scale-accessories-load-cell-keli-qs-30t-40t-load-cell.jpg",
      "capacities": "Configured by model",
      "materials": "Alloy steel or stainless steel load cell options",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Double ended shear beam structure for heavy-duty weighing",
          "Robust metal construction for stable industrial operation",
          "Suitable for truck scales, platform scales and heavy weighing systems",
          "Designed for reliable performance in demanding environments"
      ],
      "specifications": [
          [
              "Product style",
              "Keli QS-30T 40t Load Cell"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Load cell"
          ],
          [
              "Model",
              "QS-30T 40t Load Cell"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "scale-accessories-load-cell-zemic-hm9b-load-cell",
      "name": "Zemic HM9B Load Cell",
      "shortName": "HM9B Load Cell",
      "category": "Scale Accessories",
      "subcategory": "Load cell",
      "description": "High-accuracy dual shear beam load cell with nickel plated alloy steel construction, designed for heavy-duty weighing applications.",
      "longDescription": "Nickel plated alloy steel dual shear beam load cell with IP67 protection, offering excellent durability, corrosion resistance and stable performance. Suitable for truck scales, hopper scales and other industrial electronic weighing systems.",
      "image": "/uploads/products/import-4-0/scale-accessories-load-cell-zemic-hm9b-load-cell.png",
      "capacities": "Configured by model",
      "materials": "Alloy steel or stainless steel load cell options",
      "applications": [
          "Scale production",
          "Scale maintenance",
          "System integration",
          "Export project supply"
      ],
      "features": [
          "Dual shear beam load cell for heavy-duty weighing applications",
          "Nickel plated alloy steel construction for durability",
          "IP67 protection for industrial weighing environments",
          "Suitable for truck scales, hopper scales and electronic weighing systems"
      ],
      "specifications": [
          [
              "Product style",
              "Zemic HM9B Load Cell"
          ],
          [
              "Category",
              "Scale Accessories"
          ],
          [
              "Subcategory",
              "Load cell"
          ],
          [
              "Model",
              "HM9B Load Cell"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "test-weights-m1-cast-iron-weights",
      "name": "M1 Cast iron weights",
      "shortName": "M1 Cast iron weights",
      "category": "Test Weights",
      "description": "Durable cast iron test weights available in multiple capacities, suitable for scale calibration and testing.",
      "longDescription": "Grey cast iron, painted.\nDurable cast iron test weight with painted surface, suitable for scale calibration.",
      "image": "/uploads/products/import-4-0/test-weights-m1-cast-iron-weights.jpg",
      "capacities": "5kg\u300110kg\u300120kg\u3001500kg\u30011000kg",
      "materials": "Painted cast iron",
      "applications": [
          "Scale calibration",
          "Accuracy verification",
          "Laboratory measurement",
          "Factory inspection"
      ],
      "features": [
          "Painted cast iron body for durable calibration use",
          "Portable handle for easier lifting and positioning",
          "Available in multiple heavy weight capacities",
          "Suitable for scale calibration and factory inspection"
      ],
      "specifications": [
          [
              "Product style",
              "M1 Cast iron weights"
          ],
          [
              "Category",
              "Test Weights"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "5kg\u300110kg\u300120kg\u3001500kg\u30011000kg"
          ],
          [
              "Accuracy",
              "M1"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "test-weights-f1-ss-weights",
      "name": "F1 SS weights",
      "shortName": "F1 SS weights",
      "category": "Test Weights",
      "description": "High-precision stainless steel weight set for accurate calibration and laboratory applications.",
      "longDescription": "304 Stainless Steel.\nStainless steel test weight with good corrosion resistance for accurate calibration.",
      "image": "/uploads/products/import-4-0/test-weights-stainless-steel-box-set.png",
      "capacities": "SS 1mg-2kg Set\u30011mg-200g Set",
      "materials": "Stainless steel construction",
      "applications": [
          "Scale calibration",
          "Accuracy verification",
          "Laboratory measurement",
          "Factory inspection"
      ],
      "features": [
          "304 stainless steel construction for corrosion resistance",
          "High-precision F1 class option for accurate calibration",
          "Available as 1mg-2kg or 1mg-200g weight sets",
          "Suitable for laboratory calibration and accuracy verification"
      ],
      "specifications": [
          [
              "Product style",
              "F1 SS weights"
          ],
          [
              "Category",
              "Test Weights"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "SS 1mg-2kg Set\u30011mg-200g Set"
          ],
          [
              "Accuracy",
              "F1"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "test-weights-f2-ss-weights",
      "name": "F2 SS weights",
      "shortName": "F2 SS weights",
      "category": "Test Weights",
      "description": "Reliable stainless steel weight set with various capacities, suitable for scale testing and verification.",
      "longDescription": "Complete weight set packed in a durable protective box, including multiple standard weights for convenient storage and transportation. Suitable for scale calibration, testing, and accuracy verification in laboratories and industrial applications.",
      "image": "/uploads/products/import-4-0/test-weights-f2-ss-weights.jpg",
      "capacities": "SS 1mg-2kg Set\u30011mg-200g Set\u3001SS 10kg\uff08with box\uff09\u3001SS 5kg\uff08with box\uff09\u3001SS 1kg\uff08with box\uff09",
      "materials": "Stainless steel construction",
      "applications": [
          "Scale calibration",
          "Accuracy verification",
          "Laboratory measurement",
          "Factory inspection"
      ],
      "features": [
          "Complete stainless steel weight set with protective box",
          "Multiple standard weights for convenient calibration work",
          "Durable storage case for transportation and organization",
          "Suitable for scale testing, verification and laboratory use"
      ],
      "specifications": [
          [
              "Product style",
              "F2 SS weights"
          ],
          [
              "Category",
              "Test Weights"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "SS 1mg-2kg Set\u30011mg-200g Set\u3001SS 10kg\uff08with box\uff09\u3001SS 5kg\uff08with box\uff09\u3001SS 1kg\uff08with box\uff09"
          ],
          [
              "Accuracy",
              "F2"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "test-weights-e1-ss-weights",
      "name": "E1 SS weights",
      "shortName": "E1 SS weights",
      "category": "Test Weights",
      "description": "Ultra-precision stainless steel weight set for laboratory calibration and measurement applications.",
      "longDescription": "Non-magnetic SS.\nHigh-precision reference weight made of non-magnetic stainless steel.",
      "image": "/uploads/products/import-4-0/test-weights-stainless-steel-box-set.png",
      "capacities": "1mg-200g",
      "materials": "Stainless steel construction",
      "applications": [
          "Scale calibration",
          "Accuracy verification",
          "Laboratory measurement",
          "Factory inspection"
      ],
      "features": [
          "Ultra-precision E1 class reference weight set",
          "Non-magnetic stainless steel construction",
          "Suitable for laboratory calibration and high-accuracy measurement",
          "Designed for controlled testing and verification environments"
      ],
      "specifications": [
          [
              "Product style",
              "E1 SS weights"
          ],
          [
              "Category",
              "Test Weights"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "1mg-200g"
          ],
          [
              "Accuracy",
              "E1"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "test-weights-e2-ss-weights",
      "name": "E2 SS weights",
      "shortName": "E2 SS weights",
      "category": "Test Weights",
      "description": "Precision stainless steel weight set designed for high-accuracy calibration requirements.",
      "longDescription": "High-precision stainless steel weight set with excellent corrosion resistance and stable performance, designed for accurate scale calibration, testing and verification in laboratories and industrial applications.",
      "image": "/uploads/products/import-4-0/test-weights-e2-ss-weights.jpg",
      "capacities": "1mg-200g",
      "materials": "Stainless steel construction",
      "applications": [
          "Scale calibration",
          "Accuracy verification",
          "Laboratory measurement",
          "Factory inspection"
      ],
      "features": [
          "High-precision E2 class stainless steel weight set",
          "Excellent corrosion resistance for stable calibration use",
          "Suitable for laboratory and industrial verification work",
          "Designed for accurate scale testing and measurement checks"
      ],
      "specifications": [
          [
              "Product style",
              "E2 SS weights"
          ],
          [
              "Category",
              "Test Weights"
          ],
          [
              "Model",
              "Configured by model"
          ],
          [
              "Capacity",
              "1mg-200g"
          ],
          [
              "Accuracy",
              "E2"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "crane-scales-xz-gse",
      "name": "XZ-GSE",
      "shortName": "XZ-GSE",
      "category": "Crane Scales",
      "description": "Economical LED crane scale.",
      "longDescription": "Attractive design with light engineering plastic housing\nConvenient 360\u00b0 swivel shackle and hook  Special Alloy Steel Sensor, high accuracy\n5 digit super bright LED display  With AA battery, built-in lithium battery or Ni-H battery selectable\nSelectable division value and weight unit",
      "image": "/uploads/products/import-4-0/crane-scales-xz-gse.png",
      "capacities": "50kg 100kg 150kg 200kg 300kg",
      "materials": "Industrial crane scale body with alloy steel sensor",
      "applications": [
          "Lifting weighing",
          "Warehouse handling",
          "Steel and material loading",
          "Industrial crane weighing"
      ],
      "features": [
          "Time to Stable Reading\u22648s",
          "Maximum Safe Load 150%F.S.",
          "Limited Over load 400%F.S.",
          "Overload Alarm 100%F.S.+9e",
          "Operating Temperature -10\u00b0C~55\u00b0C"
      ],
      "specifications": [
          [
              "Product style",
              "XZ-GSE"
          ],
          [
              "Category",
              "Crane Scales"
          ],
          [
              "Model",
              "XZ-GSE"
          ],
          [
              "Capacity",
              "50kg 100kg 150kg 200kg 300kg"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "crane-scales-xz-gsc",
      "name": "XZ-GSC",
      "shortName": "XZ-GSC",
      "category": "Crane Scales",
      "description": "Economical LCD crane scale.",
      "longDescription": "Attractive design with light engineering plastic housing\nConvenient 360\u00b0 swivel shackle and hook  Special Alloy Steel Sensor, high accuracy\n5 \u00bd digit 20mm FSTN LCD display with backlighting  With AA battery, built-in lithium battery or Ni-H battery selectable\nSelectable division value and weight unit",
      "image": "/uploads/products/import-4-0/crane-scales-xz-gsc.png",
      "capacities": "50kg,100kg,150kg,200kg,300kg",
      "materials": "Industrial crane scale body with alloy steel sensor",
      "applications": [
          "Lifting weighing",
          "Warehouse handling",
          "Steel and material loading",
          "Industrial crane weighing"
      ],
      "features": [
          "Time to Stable Reading\u22648s",
          "Maximum Safe Load 150%F.S.",
          "Limited Over load 400%F.S.",
          "Overload Alarm 100%F.S.+9e",
          "Operating Temperature -10\u00b0C~55\u00b0C"
      ],
      "specifications": [
          [
              "Product style",
              "XZ-GSC"
          ],
          [
              "Category",
              "Crane Scales"
          ],
          [
              "Model",
              "XZ-GSC"
          ],
          [
              "Capacity",
              "50kg,100kg,150kg,200kg,300kg"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "crane-scales-xz-gge-plus",
      "name": "XZ_GGE PLUS",
      "shortName": "XZ-GGE-PLUS",
      "category": "Crane Scales",
      "description": "Heavy-duty rechargeable crane scale.",
      "longDescription": "High Strength Aluminum die-casting shell, strong, beautiful and lightwaterproof and dust-proof\nConvenient 3360\u00b0 swivel shackle and hook\nIP65 industrial grade to protect from extremely environment\nSpecial Alloy Steel Sensor, high precision, high resolution\nBuilt-in rechargeable long-life lithium iron battery, the perfect combination of new energy and energy-saving technology",
      "image": "/uploads/products/import-4-0/crane-scales-xz-gge-plus.png",
      "capacities": "30kg,50kg,100kg,150kg,200kg,300kg",
      "materials": "Industrial crane scale body with alloy steel sensor",
      "applications": [
          "Lifting weighing",
          "Warehouse handling",
          "Steel and material loading",
          "Industrial crane weighing"
      ],
      "features": [
          "Time to Stable Reading\u22648s",
          "Maximum Safe Load 150%F.S.",
          "Limited Over load 400%F.S.",
          "Overload Alarm 100%F.S.+9e",
          "Operating Temperature -10\u00b0C~55\u00b0C"
      ],
      "specifications": [
          [
              "Product style",
              "XZ_GGE PLUS"
          ],
          [
              "Category",
              "Crane Scales"
          ],
          [
              "Model",
              "XZ-GGE-PLUS"
          ],
          [
              "Capacity",
              "30kg,50kg,100kg,150kg,200kg,300kg"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "crane-scales-xz-aae-lux",
      "name": "XZ-AAE LUX",
      "shortName": "XZ_AAE",
      "category": "Crane Scales",
      "description": "GS certified aluminum die-casting crane scale for industrial lifting and weighing applications.",
      "longDescription": "Aluminum die-casting.\nLightweight aluminum die-casting crane scale with reliable performance and easy operation.",
      "image": "/uploads/products/import-4-0/crane-scales-xz-aae-lux.png",
      "capacities": "600kg-15t",
      "materials": "Industrial crane scale body with alloy steel sensor",
      "applications": [
          "Lifting weighing",
          "Warehouse handling",
          "Steel and material loading",
          "Industrial crane weighing"
      ],
      "features": [
          "Aluminum die-casting body for lightweight crane scale operation",
          "Capacity range from 600kg to 15t for industrial lifting weighing",
          "Reliable performance for warehouse and material loading work",
          "Suitable for crane weighing projects and export supply"
      ],
      "specifications": [
          [
              "Product style",
              "XZ-AAE LUX"
          ],
          [
              "Category",
              "Crane Scales"
          ],
          [
              "Model",
              "XZ_AAE"
          ],
          [
              "Capacity",
              "600kg-15t"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "crane-scales-xpliii",
      "name": "XPLIII",
      "shortName": "XPLIII",
      "category": "Crane Scales",
      "description": "Wireless crane scale indicator.",
      "longDescription": "Third gernation of Palm series Weighing indicator\n International standard 433HZ radio spectrum, with 32 frequency spots\n Optional Bluetooth module to connect the printer\n At most two sets optocoupler output optional\n With standard RS 232 output\n High definition FSTN display with backlighting easy for reading\n Standard with 4 AA battery or optional with Ni-H battery and EVA sets",
      "image": "/uploads/products/import-4-0/crane-scales-xpliii.png",
      "capacities": "Configured by model",
      "materials": "Industrial crane scale body with alloy steel sensor",
      "applications": [
          "Lifting weighing",
          "Warehouse handling",
          "Steel and material loading",
          "Industrial crane weighing"
      ],
      "features": [
          "Executive Standard : Refer to OIML R76",
          "Power supply :DC4.8V~6V",
          "Frequency: Radio 433MHZ",
          "Transmit more than 250 feet without obstacle"
      ],
      "specifications": [
          [
              "Product style",
              "XPLIII"
          ],
          [
              "Category",
              "Crane Scales"
          ],
          [
              "Model",
              "XPLIII"
          ],
          [
              "Capacity",
              "Configured by model"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "crane-scales-ocs-t",
      "name": "OCS(T)",
      "shortName": "OCS(T)",
      "category": "Crane Scales",
      "description": "Heat-resistant crane scale.",
      "longDescription": "High-strength aluminum housing\nBright LED display for easy readin\nHigh precision load cell\nRechargeable battery with long working time\nLow power consumption and overload protection\nSuitable for warehouses, factories and logistics applications",
      "image": "/uploads/products/import-4-0/crane-scales-ocs-t.png",
      "capacities": "10-5000kg",
      "materials": "Industrial crane scale body with alloy steel sensor",
      "applications": [
          "Lifting weighing",
          "Warehouse handling",
          "Steel and material loading",
          "Industrial crane weighing"
      ],
      "features": [
          "OIML Class III Accuracy",
          "Stable and reliable performance",
          "Easy operation",
          "Durable structure",
          "Fast weighing response"
      ],
      "specifications": [
          [
              "Product style",
              "OCS(T)"
          ],
          [
              "Category",
              "Crane Scales"
          ],
          [
              "Model",
              "OCS(T)"
          ],
          [
              "Capacity",
              "10-5000kg"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "crane-scales-ocs-l",
      "name": "OCS(L)",
      "shortName": "OCS(L)",
      "category": "Crane Scales",
      "description": "Lightweight LED crane scale.",
      "longDescription": "Wireless data transmission\nHigh-strength alloy steel structure\nBright LED display\nRechargeable battery\nHigh precision sensor\nSuitable for industrial weighing applications",
      "image": "/uploads/products/import-4-0/crane-scales-ocs-l.png",
      "capacities": "30kg\u2013500kg",
      "materials": "Industrial crane scale body with alloy steel sensor",
      "applications": [
          "Lifting weighing",
          "Warehouse handling",
          "Steel and material loading",
          "Industrial crane weighing"
      ],
      "features": [
          "OIML Class III Accuracy",
          "Stable wireless communication",
          "Long operating distance",
          "Easy maintenance",
          "Reliable performance"
      ],
      "specifications": [
          [
              "Product style",
              "OCS(L)"
          ],
          [
              "Category",
              "Crane Scales"
          ],
          [
              "Model",
              "OCS(L)"
          ],
          [
              "Capacity",
              "30kg\u2013500kg"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  {
      "slug": "crane-scales-ocs-y",
      "name": "OCS(Y)",
      "shortName": "OCS(Y)",
      "category": "Crane Scales",
      "description": "High accuracy hanging crane scale.",
      "longDescription": "Aluminum alloy housing\nCompact structure\nHigh accuracy\nLED display\nRechargeable battery\nRemote control\nStable performance",
      "image": "/uploads/products/import-4-0/crane-scales-ocs-y.png",
      "capacities": "30kg\u20131000kg",
      "materials": "Industrial crane scale body with alloy steel sensor",
      "applications": [
          "Lifting weighing",
          "Warehouse handling",
          "Steel and material loading",
          "Industrial crane weighing"
      ],
      "features": [
          "Capacity: 30kg\u20131000kg",
          "Accuracy Class: OIML III",
          "Display: LED",
          "Power Supply: Rechargeable battery",
          "Material: Aluminum alloy"
      ],
      "specifications": [
          [
              "Product style",
              "OCS(Y)"
          ],
          [
              "Category",
              "Crane Scales"
          ],
          [
              "Model",
              "OCS(Y)"
          ],
          [
              "Capacity",
              "30kg\u20131000kg"
          ],
          [
              "Accuracy",
              "Configured by model"
          ],
      ],
      "customization": [
          "Model and capacity selection",
          "Accuracy and display requirement",
          "Matched accessory configuration",
          "Export packing and documentation"
      ]
  },
  // Imported product catalog 4.0 end
  // Imported table top scale and balance catalog start
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-new5-waterproof-scale-1-5kg-0-5g",
    name: "SUPER SS NEW5 Waterproof Scale 1.5kg/0.5g",
    shortName: "SUPER SS NEW5",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with red LED display, suitable for food factories and wet weighing environments.",
    details: "1. Max Capacity: 1.5kg\n2. Test division: 0.5g\n3. Display division: 0.2g\n4. Minimum division: 0.1g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Load cell protection is more effective, improving the overall weighing accuracy.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-new5-waterproof-scale.jpg",
    model: "SUPER SS NEW5",
    capacity: "1.5kg",
    accuracy: "0.5g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-new5-waterproof-scale-3kg-1g",
    name: "SUPER SS NEW5 Waterproof Scale 3kg/1g",
    shortName: "SUPER SS NEW5",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with red LED display, suitable for food factories and wet weighing environments.",
    details: "1. Max Capacity: 3kg\n2. Test division: 1g\n3. Display division: 0.5g\n4. Minimum division: 0.2g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Load cell protection is more effective, improving the overall weighing accuracy.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-new5-waterproof-scale.jpg",
    model: "SUPER SS NEW5",
    capacity: "3kg",
    accuracy: "1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-new5-waterproof-scale-6-7-5kg-2g",
    name: "SUPER SS NEW5 Waterproof Scale 6/7.5kg/2g",
    shortName: "SUPER SS NEW5",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with red LED display, suitable for food factories and wet weighing environments.",
    details: "1. Max Capacity: 6/7.5kg\n2. Test division: 2g\n3. Display division: 1g\n4. Minimum division: 0.5g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Load cell protection is more effective, improving the overall weighing accuracy.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-new5-waterproof-scale.jpg",
    model: "SUPER SS NEW5",
    capacity: "6/7.5kg",
    accuracy: "2g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-new5-waterproof-scale-15kg-5g",
    name: "SUPER SS NEW5 Waterproof Scale 15kg/5g",
    shortName: "SUPER SS NEW5",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with red LED display, suitable for food factories and wet weighing environments.",
    details: "1. Max Capacity: 15kg\n2. Test division: 5g\n3. Display division: 2g\n4. Minimum division: 1g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Load cell protection is more effective, improving the overall weighing accuracy.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-new5-waterproof-scale.jpg",
    model: "SUPER SS NEW5",
    capacity: "15kg",
    accuracy: "5g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-new5-waterproof-scale-30kg-10g",
    name: "SUPER SS NEW5 Waterproof Scale 30kg/10g",
    shortName: "SUPER SS NEW5",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with red LED display, suitable for food factories and wet weighing environments.",
    details: "1. Max Capacity: 30kg\n2. Test division: 10g\n3. Display division: 5g\n4. Minimum division: 2g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Load cell protection is more effective, improving the overall weighing accuracy.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-new5-waterproof-scale.jpg",
    model: "SUPER SS NEW5",
    capacity: "30kg",
    accuracy: "10g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-waterproof-scale-1-5kg-0-5g",
    name: "SUPER-SS Waterproof Scale 1.5kg/0.5g",
    shortName: "SUPER-SS",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with durable structure, counting function and fast red LED display.",
    details: "1. Max Capacity: 1.5kg\n2. Test division: 0.5g\n3. Display division: 0.2g\n4. Minimum division: 0.1g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Waterproof load cell design for stable weighing in humid commercial environments.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-waterproof-scale.png",
    model: "SUPER-SS",
    capacity: "1.5kg",
    accuracy: "0.5g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-waterproof-scale-3kg-1g",
    name: "SUPER-SS Waterproof Scale 3kg/1g",
    shortName: "SUPER-SS",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with durable structure, counting function and fast red LED display.",
    details: "1. Max Capacity: 3kg\n2. Test division: 1g\n3. Display division: 0.5g\n4. Minimum division: 0.2g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Waterproof load cell design for stable weighing in humid commercial environments.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-waterproof-scale.png",
    model: "SUPER-SS",
    capacity: "3kg",
    accuracy: "1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-waterproof-scale-6-7-5kg-2g",
    name: "SUPER-SS Waterproof Scale 6/7.5kg/2g",
    shortName: "SUPER-SS",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with durable structure, counting function and fast red LED display.",
    details: "1. Max Capacity: 6/7.5kg\n2. Test division: 2g\n3. Display division: 1g\n4. Minimum division: 0.5g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Waterproof load cell design for stable weighing in humid commercial environments.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-waterproof-scale.png",
    model: "SUPER-SS",
    capacity: "6/7.5kg",
    accuracy: "2g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-waterproof-scale-15kg-5g",
    name: "SUPER-SS Waterproof Scale 15kg/5g",
    shortName: "SUPER-SS",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with durable structure, counting function and fast red LED display.",
    details: "1. Max Capacity: 15kg\n2. Test division: 5g\n3. Display division: 2g\n4. Minimum division: 1g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Waterproof load cell design for stable weighing in humid commercial environments.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-waterproof-scale.png",
    model: "SUPER-SS",
    capacity: "15kg",
    accuracy: "5g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-ss-waterproof-scale-30kg-10g",
    name: "SUPER-SS Waterproof Scale 30kg/10g",
    shortName: "SUPER-SS",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "IP68 stainless steel waterproof counting scale with durable structure, counting function and fast red LED display.",
    details: "1. Max Capacity: 30kg\n2. Test division: 10g\n3. Display division: 5g\n4. Minimum division: 2g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Waterproof load cell design for stable weighing in humid commercial environments.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-ss-waterproof-scale.png",
    model: "SUPER-SS",
    capacity: "30kg",
    accuracy: "10g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-6-waterproof-scale-1-5kg-0-5g",
    name: "SUPER 6 Waterproof Scale 1.5kg/0.5g",
    shortName: "SUPER 6",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "Latest SUPER 6 IP68 stainless steel waterproof counting scale for food factory, seafood and wet working environments.",
    details: "1. Max Capacity: 1.5kg\n2. Test division: 0.5g\n3. Display division: 0.2g\n4. Minimum division: 0.1g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Strengthened load cell waterproof and dustproof protection, suitable for harsher working conditions.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-6-waterproof-scale.jpg",
    model: "SUPER 6",
    capacity: "1.5kg",
    accuracy: "0.5g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-6-waterproof-scale-3kg-1g",
    name: "SUPER 6 Waterproof Scale 3kg/1g",
    shortName: "SUPER 6",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "Latest SUPER 6 IP68 stainless steel waterproof counting scale for food factory, seafood and wet working environments.",
    details: "1. Max Capacity: 3kg\n2. Test division: 1g\n3. Display division: 0.5g\n4. Minimum division: 0.2g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Strengthened load cell waterproof and dustproof protection, suitable for harsher working conditions.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-6-waterproof-scale.jpg",
    model: "SUPER 6",
    capacity: "3kg",
    accuracy: "1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-6-waterproof-scale-6-7-5kg-2g",
    name: "SUPER 6 Waterproof Scale 6/7.5kg/2g",
    shortName: "SUPER 6",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "Latest SUPER 6 IP68 stainless steel waterproof counting scale for food factory, seafood and wet working environments.",
    details: "1. Max Capacity: 6/7.5kg\n2. Test division: 2g\n3. Display division: 1g\n4. Minimum division: 0.5g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Strengthened load cell waterproof and dustproof protection, suitable for harsher working conditions.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-6-waterproof-scale.jpg",
    model: "SUPER 6",
    capacity: "6/7.5kg",
    accuracy: "2g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-6-waterproof-scale-15kg-5g",
    name: "SUPER 6 Waterproof Scale 15kg/5g",
    shortName: "SUPER 6",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "Latest SUPER 6 IP68 stainless steel waterproof counting scale for food factory, seafood and wet working environments.",
    details: "1. Max Capacity: 15kg\n2. Test division: 5g\n3. Display division: 2g\n4. Minimum division: 1g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Strengthened load cell waterproof and dustproof protection, suitable for harsher working conditions.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-6-waterproof-scale.jpg",
    model: "SUPER 6",
    capacity: "15kg",
    accuracy: "5g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-super-6-waterproof-scale-30kg-10g",
    name: "SUPER 6 Waterproof Scale 30kg/10g",
    shortName: "SUPER 6",
    category: "Table Top Scales",
    subcategory: "Waterproof Scale",
    description: "Latest SUPER 6 IP68 stainless steel waterproof counting scale for food factory, seafood and wet working environments.",
    details: "1. Max Capacity: 30kg\n2. Test division: 10g\n3. Display division: 5g\n4. Minimum division: 2g\n5. Plate size: 190 mm x 230 mm\n6. Housing material: 304 stainless steel, safe and hygienic.\n7. Waterproof grade: IP68, suitable for food factory and wet environments.\n8. A/D chip: ADS1232 high-precision A/D chip from TI.\n9. Circuit board and keypad are manufactured according to Samsung standard.\n10. Function: weighing and counting.\n11. Display: red LED quick display.\n12. Stainless steel keys protect the panel from damage.\n13. Strengthened load cell waterproof and dustproof protection, suitable for harsher working conditions.\n14. Power supply: waterproof direct charging power supply.",
    image: "/uploads/products/table-top-super-6-waterproof-scale.jpg",
    model: "SUPER 6",
    capacity: "30kg",
    accuracy: "10g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-wt300001x-table-top-scale-30000g-0-1g",
    name: "WT300001X Table Top Scale 30000g/0.1g",
    shortName: "WT300001X",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "WT-X series electronic balance with stainless steel pan, ABS base and stable tabletop weighing performance. Front and rear dual display is available as an optional configuration.",
    details: "1. Max Capacity: 30000g\n2. Accuracy / Readability: 0.1g\n3. Model: WT300001X\n4. Stainless steel weighing pan with plastic upper housing and reinforced ABS base.\n5. Dual-layer pan structure with 130 mm large aluminum load cell bracket for stable performance.\n6. Front and rear dual display is available as an optional configuration.`n7. Function: unit conversion, counting, percentage weighing, full range tare, adjustable range weighing, weighing tracking and automatic zero tracking.\n8. Optional configurations: calibration weight, underhook weighing, rechargeable battery, dynamic weighing, RS232 interface, front and rear dual display.",
    image: "/uploads/products/table-top-wt300001x-electronic-scale.jpg",
    model: "WT300001X",
    capacity: "30000g",
    accuracy: "0.1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy10ma-table-top-scale-11kg-1g",
    name: "XY10MA Table Top Scale 11kg/1g",
    shortName: "XY10MA",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 11kg\n2. Readability: 1g\n3. Repeatability: +/-2g\n4. Linearity: +/-3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY10MA",
    capacity: "11kg",
    accuracy: "1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy15ma-table-top-scale-16kg-1g",
    name: "XY15MA Table Top Scale 16kg/1g",
    shortName: "XY15MA",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 16kg\n2. Readability: 1g\n3. Repeatability: +/-2g\n4. Linearity: +/-3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY15MA",
    capacity: "16kg",
    accuracy: "1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy20ma-table-top-scale-21kg-1g",
    name: "XY20MA Table Top Scale 21kg/1g",
    shortName: "XY20MA",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 21kg\n2. Readability: 1g\n3. Repeatability: +/-2g\n4. Linearity: +/-3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY20MA",
    capacity: "21kg",
    accuracy: "1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy30ma-table-top-scale-31kg-1g",
    name: "XY30MA Table Top Scale 31kg/1g",
    shortName: "XY30MA",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 31kg\n2. Readability: 1g\n3. Repeatability: +/-2g\n4. Linearity: +/-3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY30MA",
    capacity: "31kg",
    accuracy: "1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy5mb-table-top-scale-5-1kg-0-1g",
    name: "XY5MB Table Top Scale 5.1kg/0.1g",
    shortName: "XY5MB",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 5.1kg\n2. Readability: 0.1g\n3. Repeatability: +/-0.2g\n4. Linearity: +/-0.3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY5MB",
    capacity: "5.1kg",
    accuracy: "0.1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy10mb-table-top-scale-11kg-0-1g",
    name: "XY10MB Table Top Scale 11kg/0.1g",
    shortName: "XY10MB",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 11kg\n2. Readability: 0.1g\n3. Repeatability: +/-0.2g\n4. Linearity: +/-0.3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY10MB",
    capacity: "11kg",
    accuracy: "0.1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy15mb-table-top-scale-16kg-0-1g",
    name: "XY15MB Table Top Scale 16kg/0.1g",
    shortName: "XY15MB",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 16kg\n2. Readability: 0.1g\n3. Repeatability: +/-0.2g\n4. Linearity: +/-0.3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY15MB",
    capacity: "16kg",
    accuracy: "0.1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy20mb-table-top-scale-21kg-0-1g",
    name: "XY20MB Table Top Scale 21kg/0.1g",
    shortName: "XY20MB",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 21kg\n2. Readability: 0.1g\n3. Repeatability: +/-0.2g\n4. Linearity: +/-0.3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY20MB",
    capacity: "21kg",
    accuracy: "0.1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy25mb-table-top-scale-26kg-0-1g",
    name: "XY25MB Table Top Scale 26kg/0.1g",
    shortName: "XY25MB",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 26kg\n2. Readability: 0.1g\n3. Repeatability: +/-0.2g\n4. Linearity: +/-0.3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY25MB",
    capacity: "26kg",
    accuracy: "0.1g",
  }),
  importedCatalogProduct({
    slug: "table-top-scales-xy28mb-table-top-scale-28kg-0-1g",
    name: "XY28MB Table Top Scale 28kg/0.1g",
    shortName: "XY28MB",
    category: "Table Top Scales",
    subcategory: "Table Top Scale",
    description: "XY-M series industrial scale with large stainless steel pan, LCD backlight display, AC/DC power supply, counting and unit conversion functions.",
    details: "1. Capacity: 28kg\n2. Readability: 0.1g\n3. Repeatability: +/-0.2g\n4. Linearity: +/-0.3g\n5. Pan size: 315 x 230 mm\n6. Stable time: \u003c=2s\n7. Overall size: 365 x 320 x 110 mm\n8. Display: LCD with white backlight and black font.\n9. Power supply: AC and DC power supply with rechargeable battery.\n10. Functions: full range tare, counting, unit conversion, overload alarm and level indicator.\n11. Unit conversion: g / ct / oz; lb is optional.\n12. Optional configurations: interface and printer.",
    image: "/uploads/products/table-top-xy-m-industrial-scale.png",
    model: "XY28MB",
    capacity: "28kg",
    accuracy: "0.1g",
  }),
  importedCatalogProduct({
    slug: "balances-ja-p-series-precision-balance-ja103p-110g-0-001g",
    name: "JA-P Series Precision Balance JA103P 110g/0.001g",
    shortName: "JA103P",
    category: "Balances",
    subcategory: "Precision Balance",
    description: "JA-P series precision balance with LCD display, draft shield, external calibration, full range tare, counting and unit conversion functions.",
    details: "1. Capacity: 110g\n2. Readability: 0.001g\n3. Minimum weighing: 0.001g-0.004g\n4. Repeatability: +/-0.002g\n5. Linearity: +/-0.003g\n6. Stable time: \u003c=3s\n7. Pan size: Dia.90mm\n8. Appearance size: 270 x 200 x 280 mm\n9. Draft shield size: 170 x 165 x 180 mm inner diameter.\n10. Calibration: external calibration; calibration weight: 100g.\n11. Power supply: LCD, AC and DC power supply, AA battery available.\n12. Functions: tare, counting, unit conversion, minimum weighing set, overload alarm and level indicator.\n13. Unit conversion: g / ct / oz.\n14. Optional configurations: dual display, interface, printer and dust cover.\n15. Packing size: 360 x 265 x 350 mm, or 560 x 380 x 730 mm for 4 units per box.\n16. Gross weight: 4kg per unit, or 16kg for 4 units per box.",
    image: "/uploads/products/balance-ja-p-precision-balance.jpg",
    model: "JA103P",
    capacity: "110g",
    accuracy: "0.001g",
  }),
  importedCatalogProduct({
    slug: "balances-ja-p-series-precision-balance-ja203p-210g-0-001g",
    name: "JA-P Series Precision Balance JA203P 210g/0.001g",
    shortName: "JA203P",
    category: "Balances",
    subcategory: "Precision Balance",
    description: "JA-P series precision balance with LCD display, draft shield, external calibration, full range tare, counting and unit conversion functions.",
    details: "1. Capacity: 210g\n2. Readability: 0.001g\n3. Minimum weighing: 0.001g-0.004g\n4. Repeatability: +/-0.002g\n5. Linearity: +/-0.003g\n6. Stable time: \u003c=3s\n7. Pan size: Dia.90mm\n8. Appearance size: 270 x 200 x 280 mm\n9. Draft shield size: 170 x 165 x 180 mm inner diameter.\n10. Calibration: external calibration; calibration weight: 200g.\n11. Power supply: LCD, AC and DC power supply, AA battery available.\n12. Functions: tare, counting, unit conversion, minimum weighing set, overload alarm and level indicator.\n13. Unit conversion: g / ct / oz.\n14. Optional configurations: dual display, interface, printer and dust cover.",
    image: "/uploads/products/balance-ja-p-precision-balance.jpg",
    model: "JA203P",
    capacity: "210g",
    accuracy: "0.001g",
  }),
  importedCatalogProduct({
    slug: "balances-ja-p-series-precision-balance-ja303p-310g-0-001g",
    name: "JA-P Series Precision Balance JA303P 310g/0.001g",
    shortName: "JA303P",
    category: "Balances",
    subcategory: "Precision Balance",
    description: "JA-P series precision balance with LCD display, draft shield, external calibration, full range tare, counting and unit conversion functions.",
    details: "1. Capacity: 310g\n2. Readability: 0.001g\n3. Minimum weighing: 0.001g-0.004g\n4. Repeatability: +/-0.002g\n5. Linearity: +/-0.003g\n6. Stable time: \u003c=3s\n7. Pan size: Dia.90mm\n8. Appearance size: 270 x 200 x 280 mm\n9. Draft shield size: 170 x 165 x 180 mm inner diameter.\n10. Calibration: external calibration; calibration weight: 200g.\n11. Power supply: LCD, AC and DC power supply, AA battery available.\n12. Functions: tare, counting, unit conversion, minimum weighing set, overload alarm and level indicator.\n13. Unit conversion: g / ct / oz.\n14. Optional configurations: dual display, interface, printer and dust cover.",
    image: "/uploads/products/balance-ja-p-precision-balance.jpg",
    model: "JA303P",
    capacity: "310g",
    accuracy: "0.001g",
  }),
  importedCatalogProduct({
    slug: "balances-precision-balance-ja103pl-110g-610g-0-001g-0-01g",
    name: "Precision Balance JA103PL 110g/610g/0.001g/0.01g",
    shortName: "JA103PL",
    category: "Balances",
    subcategory: "Precision Balance",
    description: "JA-P series precision balance with LCD display, draft shield, external calibration, full range tare, counting and unit conversion functions.",
    details: "1. Capacity: 110g/610g\n2. Readability: 0.001g/0.01g\n3. Minimum weighing: 1d-4d\n4. Repeatability: +/-2d\n5. Linearity: +/-3d\n6. Stable time: \u003c=3s\n7. Pan size: Dia.110mm\n8. Appearance size: 270 x 200 x 280 mm\n9. Draft shield size: 170 x 165 x 180 mm inner diameter.\n10. Calibration: external calibration; calibration weight: 200g.\n11. Power supply: LCD, AC and DC power supply, AA battery available.\n12. Functions: tare, counting, unit conversion, minimum weighing set, overload alarm and level indicator.\n13. Unit conversion: g / ct / oz.\n14. Optional configurations: dual display, interface, printer and dust cover.",
    image: "/uploads/products/balance-ja-p-precision-balance.jpg",
    model: "JA103PL",
    capacity: "110g/610g",
    accuracy: "0.001g/0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa1004e-100g-0-0001g",
    name: "Analytical Balance FA1004E 100g/0.0001g",
    shortName: "FA1004E",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, External calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 100g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: External calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA1004E",
    capacity: "100g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa1104e-110g-0-0001g",
    name: "Analytical Balance FA1104E 110g/0.0001g",
    shortName: "FA1104E",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, External calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 110g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: External calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA1104E",
    capacity: "110g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa1204e-120g-0-0001g",
    name: "Analytical Balance FA1204E 120g/0.0001g",
    shortName: "FA1204E",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, External calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 120g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: External calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA1204E",
    capacity: "120g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa2004e-200g-0-0001g",
    name: "Analytical Balance FA2004E 200g/0.0001g",
    shortName: "FA2004E",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, External calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 200g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: External calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA2004E",
    capacity: "200g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa2104e-210g-0-0001g",
    name: "Analytical Balance FA2104E 210g/0.0001g",
    shortName: "FA2104E",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, External calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 210g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: External calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA2104E",
    capacity: "210g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa2204e-220g-0-0001g",
    name: "Analytical Balance FA2204E 220g/0.0001g",
    shortName: "FA2204E",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, External calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 220g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: External calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA2204E",
    capacity: "220g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa1004en-100g-0-0001g",
    name: "Analytical Balance FA1004EN 100g/0.0001g",
    shortName: "FA1004EN",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, Internal calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 100g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: Internal calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.\n17. Power: 100-240V, 50/60Hz.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA1004EN",
    capacity: "100g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa1104en-110g-0-0001g",
    name: "Analytical Balance FA1104EN 110g/0.0001g",
    shortName: "FA1104EN",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, Internal calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 110g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: Internal calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.\n17. Power: 100-240V, 50/60Hz.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA1104EN",
    capacity: "110g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa1204en-120g-0-0001g",
    name: "Analytical Balance FA1204EN 120g/0.0001g",
    shortName: "FA1204EN",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, Internal calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 120g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: Internal calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.\n17. Power: 100-240V, 50/60Hz.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA1204EN",
    capacity: "120g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa2004en-200g-0-0001g",
    name: "Analytical Balance FA2004EN 200g/0.0001g",
    shortName: "FA2004EN",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, Internal calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 200g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: Internal calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.\n17. Power: 100-240V, 50/60Hz.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA2004EN",
    capacity: "200g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa2104en-210g-0-0001g",
    name: "Analytical Balance FA2104EN 210g/0.0001g",
    shortName: "FA2104EN",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, Internal calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 210g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: Internal calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.\n17. Power: 100-240V, 50/60Hz.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA2104EN",
    capacity: "210g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-analytical-balance-fa2204en-220g-0-0001g",
    name: "Analytical Balance FA2204EN 220g/0.0001g",
    shortName: "FA2204EN",
    category: "Balances",
    subcategory: "Analytical Balance",
    description: "FA-E/FA-EN analytical balance with electromagnetic force sensor, LCD backlight display, Internal calibration, RS232 interface and advanced weighing functions.",
    details: "1. Capacity: 220g\n2. Readability: 0.0001g\n3. Minimum weighing: 0.0004g\n4. Calibration: Internal calibration\n5. Stable time: \u003c=3s\n6. Display: LCD with white backlight and black font.\n7. Pan size: Dia.80mm standard; Dia.90mm optional.\n8. Operation temperature: 5-35 C.\n9. Repeatability: +/-0.0002g\n10. Linearity: +/-0.0003g\n11. Dimension: 305 x 210 x 305 mm\n12. Draft shield size: 175 x 165 x 200 mm inner diameter.\n13. LCD size: 96 x 24 mm\n14. Interface: RS232 standard; USB and printer are optional.\n15. Functions: tare, counting, unit conversion, percentage, accumulation, peak holding, upper and lower limit setting, dynamic weighing, net/gross weighing and clock function.\n16. Alarm functions: overload alarm, fault alarm and level indicator.\n17. Power: 100-240V, 50/60Hz.",
    image: "/uploads/products/balance-fa-e-analytical-balance.png",
    model: "FA2204EN",
    capacity: "220g",
    accuracy: "0.0001g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmb302-300g-0-01g",
    name: "Portable Balance GMB302 300g/0.01g",
    shortName: "GMB302",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 300g\n2. Resolution: 0.01g\n3. Repeatability: +/-0.02g\n4. Linearity error: +/-0.02g\n5. Draft shield: With draft shield\n6. Pan size: Round pan 150 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMB302",
    capacity: "300g",
    accuracy: "0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmb602-600g-0-01g",
    name: "Portable Balance GMB602 600g/0.01g",
    shortName: "GMB602",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 600g\n2. Resolution: 0.01g\n3. Repeatability: +/-0.02g\n4. Linearity error: +/-0.02g\n5. Draft shield: With draft shield\n6. Pan size: Round pan 150 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMB602",
    capacity: "600g",
    accuracy: "0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmb1002-1000g-0-01g",
    name: "Portable Balance GMB1002 1000g/0.01g",
    shortName: "GMB1002",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 1000g\n2. Resolution: 0.01g\n3. Repeatability: +/-0.02g\n4. Linearity error: +/-0.02g\n5. Draft shield: With draft shield\n6. Pan size: Round pan 150 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMB1002",
    capacity: "1000g",
    accuracy: "0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmb2002-2000g-0-01g",
    name: "Portable Balance GMB2002 2000g/0.01g",
    shortName: "GMB2002",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 2000g\n2. Resolution: 0.01g\n3. Repeatability: +/-0.02g\n4. Linearity error: +/-0.02g\n5. Draft shield: With draft shield\n6. Pan size: Round pan 150 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMB2002",
    capacity: "2000g",
    accuracy: "0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmb3002-3000g-0-01g",
    name: "Portable Balance GMB3002 3000g/0.01g",
    shortName: "GMB3002",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 3000g\n2. Resolution: 0.01g\n3. Repeatability: +/-0.02g\n4. Linearity error: +/-0.02g\n5. Draft shield: With draft shield\n6. Pan size: Round pan 150 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMB3002",
    capacity: "3000g",
    accuracy: "0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmc1002-1000g-0-01g",
    name: "Portable Balance GMC1002 1000g/0.01g",
    shortName: "GMC1002",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 1000g\n2. Resolution: 0.01g\n3. Repeatability: +/-0.02g\n4. Linearity error: +/-0.02g\n5. Draft shield: No draft shield\n6. Pan size: Round pan 150 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMC1002",
    capacity: "1000g",
    accuracy: "0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmc2002-2000g-0-01g",
    name: "Portable Balance GMC2002 2000g/0.01g",
    shortName: "GMC2002",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 2000g\n2. Resolution: 0.01g\n3. Repeatability: +/-0.02g\n4. Linearity error: +/-0.02g\n5. Draft shield: No draft shield\n6. Pan size: Round pan 150 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMC2002",
    capacity: "2000g",
    accuracy: "0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmc3002-3000g-0-01g",
    name: "Portable Balance GMC3002 3000g/0.01g",
    shortName: "GMC3002",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 3000g\n2. Resolution: 0.01g\n3. Repeatability: +/-0.02g\n4. Linearity error: +/-0.02g\n5. Draft shield: No draft shield\n6. Pan size: Round pan 150 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMC3002",
    capacity: "3000g",
    accuracy: "0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmc5002-5000g-0-01g",
    name: "Portable Balance GMC5002 5000g/0.01g",
    shortName: "GMC5002",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 5000g\n2. Resolution: 0.01g\n3. Repeatability: +/-0.03g\n4. Linearity error: +/-0.03g\n5. Draft shield: No draft shield\n6. Pan size: Round pan 150 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMC5002",
    capacity: "5000g",
    accuracy: "0.01g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmd3001-3000g-0-1g",
    name: "Portable Balance GMD3001 3000g/0.1g",
    shortName: "GMD3001",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 3000g\n2. Resolution: 0.1g\n3. Repeatability: +/-0.2g\n4. Linearity error: +/-0.2g\n5. Draft shield: No draft shield\n6. Pan size: Round pan 180 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMD3001",
    capacity: "3000g",
    accuracy: "0.1g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gmd6001-6000g-0-1g",
    name: "Portable Balance GMD6001 6000g/0.1g",
    shortName: "GMD6001",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 6000g\n2. Resolution: 0.1g\n3. Repeatability: +/-0.2g\n4. Linearity error: +/-0.2g\n5. Draft shield: No draft shield\n6. Pan size: Round pan 180 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GMD6001",
    capacity: "6000g",
    accuracy: "0.1g",
  }),
  importedCatalogProduct({
    slug: "balances-portable-balance-gme6000-6000g-1g",
    name: "Portable Balance GME6000 6000g/1g",
    shortName: "GME6000",
    category: "Balances",
    subcategory: "Portable Balance",
    description: "GM Series portable balance with LCD backlight display, AC/rechargeable battery power, unit conversion, external calibration and RS232 interface.",
    details: "1. Capacity: 6000g\n2. Resolution: 1g\n3. Repeatability: +/-2g\n4. Linearity error: +/-2g\n5. Draft shield: No draft shield\n6. Pan size: Round pan 180 mm\n7. Response time: \u003c=2 sec\n8. Calibration: calibration with external weight.\n9. Weighing units: g, ct, lb, oz, ozt, dwt, kg, PCS, GSM, TMR, PKT, etc.\n10. Construction: static resistant ABS housing with stainless steel pan.\n11. Display: large LCD display with backlight.\n12. Body dimension: 230 x 270 x 70 mm.\n13. Battery: rechargeable battery 6V 2.5A or lithium battery 7.4V.\n14. Power: 110V-240V, 50Hz/60Hz.\n15. Operational temperature: 10 C to 40 C.\n16. Connectivity: configurable RS232 interface.\n17. Features: lab precision entry-level model, large keys, precise tare button, non-slip rubber feet and detachable pan.\n18. Optional configurations: second display or rear display.",
    image: "/uploads/products/balance-gm-portable-balance.png",
    model: "GME6000",
    capacity: "6000g",
    accuracy: "1g",
  }),
  // Imported table top scale and balance catalog end
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}



