import type { Product } from "@/data/products";

const categories: Record<string, string> = {
  "Truck Scales": "Básculas camioneras",
  "Industrial Platform Scales": "Básculas de plataforma industriales",
  "Industrial Floor Scales": "Básculas de piso industriales",
  "Balances": "Balanzas de laboratorio y precisión",
  "Weighing Solutions": "Soluciones de pesaje",
  "Weighing Module Systems": "Sistemas de módulos de pesaje",
  "Scale Accessories": "Accesorios para básculas",
  "Test Weights": "Pesas de calibración",
  "Crane Scales": "Básculas grúa",
  "Table Top Scales": "Básculas de mesa",
};

const subcategories: Record<string, string> = {
  "Load cell": "Celdas de carga",
  "Adjustable feet": "Patas ajustables",
  "Junction box": "Cajas de conexiones",
  "Indicator": "Indicadores de pesaje",
  "Cable": "Cables",
  "Dust Cover": "Cubiertas antipolvo",
  "Battery": "Baterías",
  "Waterproof Scale": "Básculas impermeables",
  "Table Top Scale": "Básculas de mesa",
  "Precision Balance": "Balanzas de precisión",
  "Analytical Balance": "Balanzas analíticas",
  "Portable Balance": "Balanzas portátiles",
};

const plainNumber = (value: string) => !/[A-Za-z]{3}/.test(value);

export function localizeCategory(category: string) {
  return categories[category] || "Equipo de pesaje industrial";
}

export function localizeSubcategory(subcategory: string) {
  return subcategories[subcategory] || "Versión especial";
}

function modelOf(product: Product) {
  const specificationModel = product.specifications.find(([label]) => label === "Model")?.[1];
  const upperCaseModel = product.name.match(/\b[A-Z]{2,}[A-Z0-9-]*\b/g)?.join(" ");
  return specificationModel || upperCaseModel || "";
}

export function localizeProduct(product: Product): Product {
  const category = localizeCategory(product.category);
  const model = modelOf(product);
  const capacity = plainNumber(product.capacities) ? product.capacities : "Según la especificación técnica";
  const name = [category, model].filter(Boolean).join(" — ");
  return {
    ...product,
    name,
    shortName: name,
    category,
    subcategory: product.subcategory ? localizeSubcategory(product.subcategory) : undefined,
    description: `${category} para aplicaciones industriales. La configuración se selecciona según capacidad, entorno de trabajo y necesidad del cliente.`,
    longDescription: `${category} para aplicaciones industriales. Hay opciones de capacidad, dimensiones, material, indicador y protección según las condiciones de uso.`,
    capacities: capacity,
    materials: "Acero al carbono o acero inoxidable, según la especificación",
    applications: ["Producción industrial", "Almacén y logística", "Control de calidad", "Suministro para proyectos"],
    features: ["Configuración según la aplicación", "Estructura fiable para uso industrial", "Opciones de material y protección", "Soporte para suministro de exportación"],
    specifications: [
      ["Modelo", model || "Según la especificación técnica"],
      ["Categoría", category],
      ["Capacidad", capacity],
      ["Material", "Acero al carbono o acero inoxidable"],
      ["Configuración", "Según los requisitos del cliente"],
    ],
    customization: ["Capacidad y división", "Dimensiones y material", "Indicador e interfaces", "Embalaje de exportación"],
  };
}
