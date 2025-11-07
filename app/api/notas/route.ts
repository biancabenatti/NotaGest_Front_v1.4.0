import { NextResponse } from "next/server";

const notas = [
  {
    id: 1,
    title: "Nota 001",
    value: 1500.50,
    purchaseDate: "2025-08-01",
    property: "Apartamento A",
    category: "Material de Construção",
    subcategory: "Cimento"
  },
  {
    id: 2,
    title: "Nota 002",
    value: 750.00,
    purchaseDate: "2025-08-03",
    property: "Casa B",
    category: "Ferramentas",
    subcategory: "Martelo"
  },
  {
    id: 3,
    title: "Nota 003",
    value: 1200.00,
    purchaseDate: "2025-08-05",
    property: "Apartamento C",
    category: "Materiais Elétricos",
    subcategory: "Fios e Cabos"
  },
  {
    id: 4,
    title: "Nota 004",
    value: 980.75,
    purchaseDate: "2025-08-06",
    property: "Casa D",
    category: "Acabamento",
    subcategory: "Cerâmica"
  },
  {
    id: 5,
    title: "Nota 005",
    value: 450.30,
    purchaseDate: "2025-08-07",
    property: "Apartamento E",
    category: "Pintura",
    subcategory: "Tintas"
  },
  {
    id: 6,
    title: "Nota 006",
    value: 2100.00,
    purchaseDate: "2025-08-08",
    property: "Casa F",
    category: "Material de Construção",
    subcategory: "Areia"
  },
  {
    id: 7,
    title: "Nota 007",
    value: 560.90,
    purchaseDate: "2025-08-09",
    property: "Apartamento G",
    category: "Ferramentas",
    subcategory: "Chave de Fenda"
  },
  {
    id: 8,
    title: "Nota 008",
    value: 1340.00,
    purchaseDate: "2025-08-10",
    property: "Casa H",
    category: "Materiais Hidráulicos",
    subcategory: "Tubos"
  },
  {
    id: 9,
    title: "Nota 009",
    value: 890.60,
    purchaseDate: "2025-08-11",
    property: "Apartamento I",
    category: "Materiais Elétricos",
    subcategory: "Tomadas"
  },
  {
    id: 10,
    title: "Nota 010",
    value: 3200.00,
    purchaseDate: "2025-08-12",
    property: "Casa J",
    category: "Acabamento",
    subcategory: "Porcelanato"
  },
  {
    id: 11,
    title: "Nota 011",
    value: 150.00,
    purchaseDate: "2025-08-13",
    property: "Apartamento K",
    category: "Pintura",
    subcategory: "Rolo e Pincéis"
  },
  {
    id: 12,
    title: "Nota 012",
    value: 2450.75,
    purchaseDate: "2025-08-14",
    property: "Casa L",
    category: "Material de Construção",
    subcategory: "Blocos"
  },
  {
    id: 13,
    title: "Nota 013",
    value: 670.40,
    purchaseDate: "2025-08-15",
    property: "Apartamento M",
    category: "Ferramentas",
    subcategory: "Furadeira"
  },
  {
    id: 14,
    title: "Nota 014",
    value: 980.00,
    purchaseDate: "2025-08-16",
    property: "Casa N",
    category: "Materiais Hidráulicos",
    subcategory: "Caixa d’Água"
  },
  {
    id: 15,
    title: "Nota 015",
    value: 430.25,
    purchaseDate: "2025-08-17",
    property: "Apartamento O",
    category: "Materiais Elétricos",
    subcategory: "Disjuntores"
  },
  {
    id: 16,
    title: "Nota 016",
    value: 1900.00,
    purchaseDate: "2025-08-18",
    property: "Casa P",
    category: "Acabamento",
    subcategory: "Revestimento"
  },
  {
    id: 17,
    title: "Nota 017",
    value: 600.80,
    purchaseDate: "2025-08-19",
    property: "Apartamento Q",
    category: "Pintura",
    subcategory: "Massa Corrida"
  },
  {
    id: 18,
    title: "Nota 018",
    value: 890.10,
    purchaseDate: "2025-08-20",
    property: "Casa R",
    category: "Ferramentas",
    subcategory: "Esmerilhadeira"
  },
  {
    id: 19,
    title: "Nota 019",
    value: 2700.00,
    purchaseDate: "2025-08-21",
    property: "Apartamento S",
    category: "Material de Construção",
    subcategory: "Cal"
  },
  {
    id: 20,
    title: "Nota 020",
    value: 360.00,
    purchaseDate: "2025-08-22",
    property: "Casa T",
    category: "Materiais Hidráulicos",
    subcategory: "Torneiras"
  }
];

export async function GET() {
  return NextResponse.json(notas);
}
