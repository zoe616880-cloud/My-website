export type BlogImagePlan = {
  purpose: string;
  insertAfter: string;
  caption: string;
  alt: string;
  prompt: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  targetKeyword: string;
  searchIntent: string;
  whyThisBlog: string;
  h1: string;
  category: string;
  intro: string[];
  sections: {
    h2: string;
    paragraphs: string[];
    h3?: { title: string; paragraphs: string[] }[];
  }[];
  faq: { question: string; answer: string }[];
  conclusion: string[];
  cta: {
    midArticle: string;
    final: string;
    popup: {
      trigger: string;
      title: string;
      copy: string;
      fields: string[];
      button: string;
    };
  };
  imagePlans: BlogImagePlan[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "industrial-floor-scale-buying-guide",
    title: "How to Choose an Industrial Floor Scale for Warehouse and Manufacturing Projects",
    seoTitle: "Industrial Floor Scale Buying Guide: Capacity, Size, Accuracy and Installation",
    metaDescription:
      "Learn how to choose an industrial floor scale for warehouses, factories and export projects, including capacity, platform size, installation, testing and RFQ details.",
    targetKeyword: "industrial floor scale buying guide",
    searchIntent:
      "Commercial investigation. The buyer is comparing floor scale specifications before requesting a quotation or sending project requirements.",
    whyThisBlog:
      "Floor scales are a core product for industrial buyers. The topic matches procurement questions that often appear in AI summaries: capacity, platform size, installation type, accuracy, environment and what to send to a supplier.",
    h1: "How to Choose an Industrial Floor Scale for Warehouse and Manufacturing Projects",
    category: "Buying Guide",
    intro: [
      "Choosing an industrial floor scale is not only a question of maximum capacity. In real warehouse and factory projects, the useful scale is the one that fits the load, loading method, floor condition, operating environment, indicator requirements and shipment constraints. Two scales with the same rated capacity can perform very differently if the platform size, steel structure, load cell arrangement or installation plan is not suitable.",
      "At factory quotation stage, many customers send a simple request such as \"3 ton floor scale\" or \"platform scale for pallets.\" That is a starting point, but it is not enough for a dependable recommendation. A better RFQ explains what will be weighed, how the load is moved, whether the scale will be pit mounted or above floor, how often it is used, and what data output is required. This guide explains the practical details buyers should define before ordering an industrial floor scale."
    ],
    sections: [
      {
        h2: "Start with the load, not the catalog model",
        paragraphs: [
          "The first decision is the real load profile. A floor scale used for palletized goods in a warehouse may need a different structure from a scale used for drums, carts, steel components or irregular machinery parts. Maximum weight matters, but so does how the load touches the platform. A pallet truck concentrates force through wheels. A forklift may create impact during loading. A tank or container can put weight through a small footprint. These details affect deck thickness, frame support, load cell capacity and safety margin.",
          "For common industrial applications, buyers often consider capacities such as 1,000 kg, 2,000 kg, 3,000 kg or 5,000 kg. The correct choice should include normal maximum weight, occasional overload risk and the required division. If a process needs tighter reading resolution, the supplier should confirm whether the requested division is realistic for the capacity and environment. A floor scale in a dusty warehouse, a wet processing area or an outdoor loading point may not behave like a laboratory instrument."
        ],
        h3: [
          {
            title: "Information to send with your RFQ",
            paragraphs: [
              "A practical RFQ should include maximum load, typical load type, platform size, loading method, installation method, material preference, power supply, indicator location, data output and destination country. If the scale will be exported, packaging requirements and container loading limits also matter. This information helps the factory quote a complete weighing system rather than only a steel platform."
            ]
          }
        ]
      },
      {
        h2: "Choose platform size around the object and handling method",
        paragraphs: [
          "Platform size should be selected around the object being weighed and the way operators move it onto the scale. A small platform can save cost, but it may create daily handling problems. A platform that is too large can increase freight cost, reduce stiffness if not designed correctly, and take up unnecessary floor space. For pallet weighing, the platform should allow stable placement with enough clearance for the pallet truck or forklift workflow.",
          "In factory communication, drawings or photos of the load are helpful. If a customer weighs cartons on pallets, a standard platform may work. If the customer weighs long parts, wheeled bins or custom racks, the supplier may need to adjust the platform dimensions and support structure. Before production, a responsible factory should confirm dimensions, capacity, deck surface and ramp requirements in writing."
        ]
      },
      {
        h2: "Above-floor, pit-mounted or mobile installation",
        paragraphs: [
          "Installation changes the user experience. Above-floor scales are easier to install and move, especially when used with ramps. They are suitable for many warehouses and production areas. Pit-mounted floor scales provide a flush surface and can improve traffic flow, but they require civil work, drainage planning and accurate pit dimensions. Mobile or U-shape scales are useful when the weighing position changes or when pallet trucks need direct access without a fixed ramp.",
          "Before shipment, installation preparation should be reviewed. For a pit-mounted scale, the customer should confirm pit drawings, frame dimensions and cable routing. For an above-floor scale, the customer should confirm ramp direction, available space and floor flatness. Good installation preparation reduces after-sales problems more effectively than any marketing promise."
        ]
      },
      {
        h2: "Material selection and environment",
        paragraphs: [
          "Painted mild steel is common for dry industrial environments. It offers good strength and cost efficiency for warehouses, general manufacturing and logistics. Stainless steel is considered when the scale is used in wet areas, cleaning environments, food-related processes or corrosive surroundings. The indicator enclosure and cable protection should match the environment as well. It is not enough to make the platform stainless if the electronics are not suitable for the site.",
          "During factory testing, the platform should be assembled with load cells, junction box and indicator to check basic function. For export orders, shipment inspection should also review surface finish, cable routing, accessories, ramps, documents and packaging. These steps do not replace local calibration after installation, but they help reduce obvious delivery issues."
        ]
      },
      {
        h2: "Accuracy, calibration and data output",
        paragraphs: [
          "Buyers often ask for high accuracy without describing the use case. For industrial floor scales, stable and repeatable weighing is usually more important than chasing unrealistic divisions. Accuracy depends on load cell quality, structure, installation, calibration weight, floor condition, vibration and operator behavior. The supplier should explain what is practical for the requested capacity and platform size.",
          "Data output should be planned early. Many projects require RS-232, printer connection, external display or integration with a simple data collection system. If the weighing result must enter ERP, WMS or production software, the buyer should describe the interface requirement before ordering. Changing the indicator or communication method after shipment is possible, but it creates avoidable cost and delay."
        ]
      }
    ],
    faq: [
      {
        question: "What capacity should I choose for a floor scale?",
        answer:
          "Choose a capacity above the heaviest normal load and include a safety margin for uneven loading or occasional overload. The supplier should also confirm whether your required division is practical for that capacity."
      },
      {
        question: "Do I need a pit-mounted floor scale?",
        answer:
          "Pit mounting is useful when you need a flush floor and frequent traffic across the scale. Above-floor scales are easier to install and are often enough for warehouse pallet weighing."
      },
      {
        question: "What should be checked before shipment?",
        answer:
          "Typical shipment inspection includes platform dimensions, surface finish, load cells, junction box, indicator function, accessories, cable routing, packing strength and documents."
      }
    ],
    conclusion: [
      "A good industrial floor scale starts with the application, not the model name. Capacity, platform size, loading method, installation, material, indicator and data output should be reviewed together. When buyers send complete requirements, factories can provide a more accurate quotation and reduce clarification time.",
      "If you are preparing a warehouse or manufacturing weighing project, collect the load details, site photos, installation preference and destination information before asking for a quote. That preparation usually leads to a better scale and a smoother delivery."
    ],
    cta: {
      midArticle:
        "Mid-article CTA after the installation section: Send Your Requirements - share capacity, platform size, loading method and destination so our team can review a suitable floor scale configuration.",
      final:
        "Final CTA: Get a Quote for Your Floor Scale Project - send your load details, installation plan and quantity for a practical quotation.",
      popup: {
        trigger: "Show after 40% scroll or 30 seconds on page. Also show exit intent on desktop.",
        title: "Need help choosing a floor scale?",
        copy: "Send your load, platform size and installation requirements. We will review a practical configuration before quotation.",
        fields: ["Name - required", "Email - required", "Phone - required", "Company", "Capacity", "Platform size", "Destination country"],
        button: "Send Floor Scale Requirements"
      }
    },
    imagePlans: [
      {
        purpose: "Hero image showing industrial application",
        insertAfter: "Introduction",
        caption: "Industrial floor scale used for pallet weighing in a warehouse workflow.",
        alt: "Industrial floor scale for pallet weighing in a warehouse",
        prompt:
          "Realistic factory photo, industrial floor scale installed in a clean warehouse, pallet truck nearby, blue and white technical lighting, no people faces, professional B2B product photography"
      },
      {
        purpose: "Factory testing image",
        insertAfter: "Accuracy, calibration and data output",
        caption: "Factory function testing helps confirm the complete weighing system before shipment.",
        alt: "Factory testing an industrial floor scale with indicator and load cells",
        prompt:
          "Realistic industrial workshop photo, floor scale platform being tested with digital indicator, load cell cables visible, engineer hands only, clean manufacturing environment"
      },
      {
        purpose: "Shipment inspection image",
        insertAfter: "Conclusion",
        caption: "Shipment inspection should review platform, accessories and export packaging.",
        alt: "Industrial floor scale packed for export shipment inspection",
        prompt:
          "Realistic export shipment photo, industrial floor scale packed on wooden pallet, accessories and documents arranged, factory warehouse background, professional lighting"
      }
    ]
  },
  {
    slug: "bench-scale-vs-floor-scale",
    title: "Bench Scale vs Floor Scale: Which Industrial Weighing System Fits Your Application?",
    seoTitle: "Bench Scale vs Floor Scale: Industrial Scale Selection Guide",
    metaDescription:
      "Compare bench scales and floor scales for industrial use. Learn when to choose each option based on load size, workflow, accuracy, installation and buyer requirements.",
    targetKeyword: "bench scale vs floor scale",
    searchIntent:
      "Comparison and product selection. The buyer is deciding which weighing system fits a workstation, warehouse, packing line or production process.",
    whyThisBlog:
      "Comparison content works well for overseas procurement because buyers often know the application but not the correct product category. It can capture both bench scale and floor scale searches and guide users toward an inquiry.",
    h1: "Bench Scale vs Floor Scale: Which Industrial Weighing System Fits Your Application?",
    category: "Comparison",
    intro: [
      "Bench scales and floor scales both measure industrial loads, but they solve different problems. A bench scale is usually selected for smaller items, packing stations, production workbenches, counting tasks and quality checks. A floor scale is selected for pallets, drums, containers, carts and heavy components that cannot be placed safely on a bench.",
      "The difference is not only capacity. Workflow, operator posture, loading method, platform size, accuracy expectation, material and installation space all influence the decision. This article explains how buyers can compare bench scales and floor scales before sending an RFQ."
    ],
    sections: [
      {
        h2: "What is an industrial bench scale?",
        paragraphs: [
          "An industrial bench scale is a compact weighing platform used on a table, stand or workstation. It is common in packing, parts counting, ingredient preparation, incoming inspection and light production. Platform sizes are smaller than floor scales, and capacities often range from light loads to several hundred kilograms depending on structure.",
          "Bench scales are useful when operators need the display close to the working area. They can improve speed in repetitive tasks because products are handled by hand rather than by pallet truck or forklift. Stainless steel bench scales may be used in wet or cleaning environments, while painted steel options are common for dry industrial areas."
        ]
      },
      {
        h2: "What is an industrial floor scale?",
        paragraphs: [
          "A floor scale is a larger platform placed on or in the floor for heavy or bulky loads. It is normally used for pallets, drums, carts, livestock cages, large containers or production components. Loading is often done by pallet truck, forklift, ramp, cart or direct placement.",
          "Floor scales require more installation planning than bench scales. Buyers should confirm floor flatness, ramp direction, pit dimensions if needed, cable routing, indicator mounting and traffic flow. For export projects, platform dimensions and packaging method also affect freight cost."
        ]
      },
      {
        h2: "Main comparison points for buyers",
        paragraphs: [
          "The simplest comparison is load size. If the item can be safely handled by an operator and fits a workstation, a bench scale may be the better choice. If the item is large, palletized, wheeled or heavy, a floor scale is usually more practical. However, buyers should also consider process speed. A bench scale near the packing station can reduce walking and handling time. A floor scale near receiving or dispatch can improve logistics flow.",
          "Accuracy expectations should be realistic. A bench scale may offer finer divisions for smaller loads. A floor scale can be accurate and stable for heavy loads, but the requested division must match capacity, environment and installation quality. Vibration, uneven floors and impact loading can affect performance."
        ],
        h3: [
          {
            title: "When a bench scale is the better fit",
            paragraphs: [
              "Choose a bench scale for packing lines, small parts, cartons, counting operations, ingredient weighing, inspection desks and compact workstations. It is also suitable when operators need frequent weighing at arm level and the product can be lifted safely."
            ]
          },
          {
            title: "When a floor scale is the better fit",
            paragraphs: [
              "Choose a floor scale for pallets, drums, heavy bins, steel parts, livestock platforms and loads moved by pallet truck or forklift. It is also the better option when the load footprint is too large for a bench platform."
            ]
          }
        ]
      },
      {
        h2: "How material and environment affect the choice",
        paragraphs: [
          "Both bench scales and floor scales can be built for different environments. Painted steel is a practical choice for dry warehouses and general manufacturing. Stainless steel is considered for washdown, food-related, chemical or corrosive areas. For bench scales, the platform surface is often cleaned more frequently because it is close to manual handling. For floor scales, water, dust and floor cleaning methods should be reviewed.",
          "The indicator and cable protection are part of the system. If the application requires regular cleaning, the buyer should discuss enclosure rating, cable routing and junction box protection. A mismatch between platform material and electronics can create maintenance problems later."
        ]
      },
      {
        h2: "Factory testing and shipment inspection",
        paragraphs: [
          "Before shipment, bench scales should be checked for platform stability, indicator function, zero return, basic weighing response and packing accessories. Floor scales should also be checked for platform dimensions, deck finish, load cell installation, junction box connection, ramp or pit frame accessories, and export packing strength.",
          "For overseas customers, clear photos and short inspection videos can be useful. They do not replace final calibration at the destination, but they provide confidence that the ordered configuration was built and packed correctly."
        ]
      }
    ],
    faq: [
      {
        question: "Is a bench scale more accurate than a floor scale?",
        answer:
          "Not always. Bench scales often have finer divisions because they weigh smaller loads. Floor scale accuracy depends on capacity, structure, installation and calibration. The right comparison should be based on the application."
      },
      {
        question: "Can I use a bench scale for 300 kg loads?",
        answer:
          "It may be possible if the platform and structure are designed for that capacity, but handling safety and product size must be considered. A low floor scale may be better if the load is bulky."
      },
      {
        question: "Which scale is better for packing operations?",
        answer:
          "For cartons, small products and repetitive manual tasks, a bench scale is usually better. For palletized packing or final shipment verification, a floor scale is more suitable."
      }
    ],
    conclusion: [
      "Bench scales and floor scales should not be chosen by capacity alone. The better choice depends on the object, loading method, operator workflow, environment and data requirement. A workstation task usually points toward a bench scale. A pallet, cart or heavy component usually points toward a floor scale.",
      "If you are not sure which scale type fits your process, describe the load and workflow before requesting a quote. A short explanation can prevent an unsuitable purchase."
    ],
    cta: {
      midArticle:
        "Mid-article CTA after the comparison section: Ask for Product Catalog - receive bench scale and floor scale options based on your weighing range.",
      final:
        "Final CTA: Contact Us - send photos of your load and working area so we can suggest the right scale type.",
      popup: {
        trigger: "Show after 40% scroll or when the user moves from the comparison table area toward the top of the page.",
        title: "Bench scale or floor scale?",
        copy: "Tell us your load size, capacity and workflow. We will suggest the practical product direction.",
        fields: ["Name - required", "Email - required", "Phone - required", "Load type", "Maximum capacity", "Application"],
        button: "Ask for Product Catalog"
      }
    },
    imagePlans: [
      {
        purpose: "Comparison hero image",
        insertAfter: "Introduction",
        caption: "Bench scales and floor scales support different industrial workflows.",
        alt: "Bench scale and floor scale comparison for industrial weighing",
        prompt:
          "Realistic industrial product comparison photo, bench scale on workstation and floor scale in warehouse area, clean blue white factory lighting, professional catalog style"
      },
      {
        purpose: "Bench scale application image",
        insertAfter: "What is an industrial bench scale?",
        caption: "Bench scales are often used in packing, counting and inspection workstations.",
        alt: "Industrial bench scale used at a packing workstation",
        prompt:
          "Realistic packing workstation photo, stainless industrial bench scale weighing cartons, organized tools, clean factory background, no brand labels"
      },
      {
        purpose: "Floor scale application image",
        insertAfter: "What is an industrial floor scale?",
        caption: "Floor scales are suitable for pallet, cart and heavy-load workflows.",
        alt: "Industrial floor scale used for pallet weighing",
        prompt:
          "Realistic warehouse photo, low profile floor scale with pallet truck and loaded pallet, technical blue white lighting, professional B2B equipment photography"
      }
    ]
  },
  {
    slug: "stainless-vs-painted-steel-industrial-scales",
    title: "Stainless Steel vs Painted Steel Industrial Scales: How to Choose the Right Material",
    seoTitle: "Stainless Steel vs Painted Steel Industrial Scales: Material Selection Guide",
    metaDescription:
      "Compare stainless steel and painted steel industrial scales for dry, wet, washdown and corrosive environments. Learn how material affects cost, maintenance and service life.",
    targetKeyword: "stainless steel vs painted steel industrial scales",
    searchIntent:
      "Specification and application research. The buyer is deciding material before ordering bench scales, floor scales or custom weighing platforms.",
    whyThisBlog:
      "Material selection is a common RFQ blocker for importers and project buyers. It connects product application, environment, maintenance and cost, making it valuable for SEO and AI-answer style queries.",
    h1: "Stainless Steel vs Painted Steel Industrial Scales: How to Choose the Right Material",
    category: "Application Guide",
    intro: [
      "Material selection is one of the most important decisions in an industrial scale project. Many buyers ask whether they need stainless steel or whether painted mild steel is enough. The answer depends on the operating environment, cleaning method, corrosion risk, hygiene expectation, budget and service life target.",
      "A stainless steel scale is not automatically the best choice for every project. A painted steel scale is not automatically a low-quality choice. Each material has a practical place. The goal is to match the structure, surface, load cells, junction box, indicator and cable protection with the actual application."
    ],
    sections: [
      {
        h2: "Where painted steel scales work well",
        paragraphs: [
          "Painted mild steel is widely used in dry warehouses, general factories, logistics areas and many production environments. It offers strong structure, practical cost and flexible fabrication. For many floor scales and heavy-duty platforms, painted steel is a sensible choice when the scale is not exposed to frequent washing, chemical contact or corrosive moisture.",
          "The surface coating should be inspected before shipment. Good factory preparation includes checking weld areas, edges, deck surface, underside and accessory parts. For export projects, packing should protect the coating during transport. Scratches can happen in heavy industrial use, so buyers should consider maintenance practices and the site environment."
        ]
      },
      {
        h2: "When stainless steel is worth the investment",
        paragraphs: [
          "Stainless steel is usually considered for wet areas, washdown processes, food-related handling, chemical environments, coastal humidity or applications where cleaning is frequent. It improves corrosion resistance and can support better hygiene practices. For bench scales, stainless steel is common when the platform is close to product handling or cleaning procedures. For floor scales, stainless steel may be required when water or corrosive materials reach the platform regularly.",
          "Buyers should still define the grade and system details. A stainless platform with unsuitable electronics may not solve the problem. The indicator, junction box, load cell sealing, cable gland and installation position should be discussed together. If water collects in a pit or under a platform, drainage planning is also important."
        ]
      },
      {
        h2: "Cost should be compared with maintenance risk",
        paragraphs: [
          "Stainless steel generally costs more than painted steel. The higher initial cost may be justified if the scale is used in a wet, corrosive or cleaning-intensive environment. In a dry warehouse, however, stainless steel may not deliver enough additional value to justify the cost. The right decision compares purchase price with maintenance, downtime risk, cleaning requirements and expected service life.",
          "For importers and distributors, offering both material options can help serve different customer segments. For project buyers, the specification should be based on site conditions rather than a generic preference. Photos of the working area and cleaning method are often more useful than a simple statement such as \"industrial use.\""
        ]
      },
      {
        h2: "Material selection by application",
        paragraphs: [
          "For dry logistics and pallet weighing, painted steel floor scales are often suitable. For food ingredient weighing or frequent washdown, stainless steel bench scales or stainless floor scales may be more appropriate. For farm and livestock environments, the decision depends on moisture, cleaning and animal waste exposure. For chemical plants, corrosion risk should be reviewed carefully before selecting material.",
          "Custom structures may combine material choices. For example, some projects use a painted steel frame with a specific surface treatment, while others require more stainless components. The supplier should avoid overpromising and should explain what is included in the material specification."
        ]
      },
      {
        h2: "Inspection before shipment",
        paragraphs: [
          "Material-related inspection should include surface finish, weld cleaning, coating condition, platform flatness, sharp edges, cable protection and accessory material. If the buyer requested stainless steel, the factory should confirm which parts are stainless and which parts are not. If the buyer requested painted steel, photos of coating and packing can help reduce disputes after arrival.",
          "For international shipments, packing must protect the surface. Wooden cases, pallets, foam protection and accessory boxes should be arranged according to the product size and route. A scale may be well built, but poor packing can damage the finish before the customer receives it."
        ]
      }
    ],
    faq: [
      {
        question: "Is stainless steel always better for industrial scales?",
        answer:
          "No. Stainless steel is better for wet, washdown, food-related or corrosive environments. Painted steel is often practical and cost-effective for dry warehouses and general industrial use."
      },
      {
        question: "Can painted steel floor scales be used outdoors?",
        answer:
          "They can be used in some covered or controlled outdoor areas, but exposure to rain, humidity and corrosion risk should be reviewed. Stainless steel or additional protection may be needed for harsh conditions."
      },
      {
        question: "What should I ask the supplier before choosing material?",
        answer:
          "Ask which parts use the specified material, what surface treatment is included, how electronics are protected, and how the product will be packed for shipment."
      }
    ],
    conclusion: [
      "The choice between stainless steel and painted steel should follow the environment. Painted steel is a practical choice for dry industrial work. Stainless steel is worth considering when cleaning, moisture, corrosion or hygiene requirements are important.",
      "A reliable RFQ should describe the site, cleaning process, product being weighed and expected service conditions. With that information, the supplier can recommend a material choice that balances performance and cost."
    ],
    cta: {
      midArticle:
        "Mid-article CTA after the cost comparison section: Send Your Requirements - describe your environment and cleaning method so we can suggest a material direction.",
      final:
        "Final CTA: Get a Quote - request stainless steel or painted steel scale options for your application.",
      popup: {
        trigger: "Show after 40% scroll, 30 seconds on page, or exit intent from material comparison pages.",
        title: "Not sure which material to choose?",
        copy: "Tell us your weighing environment, cleaning method and capacity. We will suggest a practical material option.",
        fields: ["Name - required", "Email - required", "Phone - required", "Environment", "Capacity", "Material preference"],
        button: "Send Material Requirements"
      }
    },
    imagePlans: [
      {
        purpose: "Material comparison image",
        insertAfter: "Introduction",
        caption: "Material choice should match the real operating environment.",
        alt: "Stainless steel and painted steel industrial scales comparison",
        prompt:
          "Realistic product comparison photo, stainless steel bench scale and painted steel floor scale side by side in factory, blue white technical background, clean B2B catalog style"
      },
      {
        purpose: "Stainless application image",
        insertAfter: "When stainless steel is worth the investment",
        caption: "Stainless steel scales are suitable for wet and frequent-cleaning applications.",
        alt: "Stainless steel industrial scale in wet processing environment",
        prompt:
          "Realistic clean wet processing room, stainless steel industrial bench scale, water resistant indicator, bright factory lighting, hygienic environment, no people faces"
      },
      {
        purpose: "Painted steel warehouse image",
        insertAfter: "Where painted steel scales work well",
        caption: "Painted steel platforms are practical for dry warehouse and logistics use.",
        alt: "Painted steel floor scale in dry warehouse",
        prompt:
          "Realistic dry warehouse photo, painted mild steel floor scale with pallet, clean logistics environment, professional industrial equipment photography"
      },
      {
        purpose: "Shipment protection image",
        insertAfter: "Inspection before shipment",
        caption: "Surface protection and export packing reduce shipment damage risk.",
        alt: "Industrial scale surface protection and export packing",
        prompt:
          "Realistic factory shipment inspection photo, industrial weighing scale protected with foam and wooden pallet packing, accessories arranged, clean export warehouse"
      }
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
