import type { Product } from "@/data/products";

const categories: Record<string, string> = {
  "Truck Scales": "Автомобильные весы",
  "Industrial Platform Scales": "Промышленные платформенные весы",
  "Industrial Floor Scales": "Промышленные напольные весы",
  "Balances": "Лабораторные и прецизионные весы",
  "Weighing Solutions": "Решения для взвешивания",
  "Weighing Module Systems": "Системы весовых модулей",
  "Scale Accessories": "Комплектующие для весов",
  "Test Weights": "Эталонные гири",
  "Crane Scales": "Крановые весы",
  "Table Top Scales": "Настольные весы",
};

const subcategories: Record<string, string> = {
  "Load cell": "Тензодатчики",
  "Adjustable feet": "Регулируемые опоры",
  "Junction box": "Соединительные коробки",
  "Indicator": "Весовые терминалы",
  "Cable": "Кабели",
  "Dust Cover": "Защитные чехлы",
  "Battery": "Аккумуляторы",
  "Waterproof Scale": "Влагозащищённые весы",
  "Table Top Scale": "Настольные весы",
  "Precision Balance": "Прецизионные весы",
  "Analytical Balance": "Аналитические весы",
  "Portable Balance": "Портативные весы",
};

const plainNumber = (value: string) => !/[A-Za-z]{3}/.test(value);

export function localizeCategory(category: string) {
  return categories[category] || "Весоизмерительное оборудование";
}

export function localizeSubcategory(subcategory: string) {
  return subcategories[subcategory] || "Специальное исполнение";
}

function modelOf(product: Product) {
  const specificationModel = product.specifications.find(([label]) => label === "Model")?.[1];
  const upperCaseModel = product.name.match(/\b[A-Z]{2,}[A-Z0-9-]*\b/g)?.join(" ");
  return specificationModel || upperCaseModel || "";
}

export function localizeProduct(product: Product): Product {
  const category = localizeCategory(product.category);
  const model = modelOf(product);
  const capacity = plainNumber(product.capacities) ? product.capacities : "По техническому заданию";
  const name = [category, model].filter(Boolean).join(" — ");
  return {
    ...product,
    name,
    shortName: name,
    category,
    subcategory: product.subcategory ? localizeSubcategory(product.subcategory) : undefined,
    description: `${category} для промышленного применения. Конфигурация подбирается по грузоподъёмности, условиям эксплуатации и задаче заказчика.`,
    longDescription: `${category} для промышленного применения. Доступны варианты по грузоподъёмности, размерам, материалу, индикации и условиям эксплуатации.`,
    capacities: capacity,
    materials: "Исполнение из конструкционной или нержавеющей стали — по запросу",
    applications: ["Производство", "Склад и логистика", "Контроль качества", "Проектные поставки"],
    features: ["Подбор конфигурации под задачу", "Надёжная конструкция для промышленной эксплуатации", "Варианты по материалу и степени защиты", "Поддержка экспортных поставок"],
    specifications: [
      ["Модель", model || "По техническому заданию"],
      ["Категория", category],
      ["Грузоподъёмность", capacity],
      ["Материал", "Конструкционная или нержавеющая сталь"],
      ["Конфигурация", "По техническому заданию заказчика"],
    ],
    customization: ["Грузоподъёмность и цена деления", "Размеры и материал", "Индикация и интерфейсы", "Упаковка для экспорта"],
  };
}
