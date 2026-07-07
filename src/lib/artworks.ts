export type Artwork = {
  id: string;
  title: string;
  ptTitle: string;
  year: number;
  medium: string;
  dimensions: string;
  price: number;
  edition?: string;
  status: "available" | "sold" | "reserved";
  /** deterministic seed for the generative artwork */
  seed: number;
  /** 3–4 hex colors used by the generative art */
  palette: string[];
  /** loose composition family for the generative renderer */
  motif: "field" | "fracture" | "bloom" | "current";
};

export const artworks: Artwork[] = [
  {
    id: "sim-i",
    title: "Affirmation I",
    ptTitle: "Sim I",
    year: 2025,
    medium: "Acrylic & oil stick on linen",
    dimensions: "150 × 120 cm",
    price: 4200,
    edition: "Original",
    status: "available",
    seed: 17,
    palette: ["#e11d2e", "#0a0a0a", "#f4f1ea", "#d9c4a3"],
    motif: "fracture",
  },
  {
    id: "nao-i",
    title: "Refusal I",
    ptTitle: "Não I",
    year: 2025,
    medium: "Oil on canvas",
    dimensions: "120 × 120 cm",
    price: 3800,
    edition: "Original",
    status: "available",
    seed: 42,
    palette: ["#0a0a0a", "#1e3a8a", "#c2b8a3", "#e8e2d4"],
    motif: "field",
  },
  {
    id: "talvez",
    title: "Perhaps",
    ptTitle: "Talvez",
    year: 2024,
    medium: "Mixed media on panel",
    dimensions: "90 × 90 cm",
    price: 2600,
    status: "reserved",
    seed: 88,
    palette: ["#d97706", "#7c2d12", "#fef3c7", "#1c1917"],
    motif: "bloom",
  },
  {
    id: "entre",
    title: "In Between",
    ptTitle: "Entre",
    year: 2024,
    medium: "Ink & gesso on paper",
    dimensions: "70 × 100 cm",
    price: 1900,
    edition: "1 of 1",
    status: "available",
    seed: 5,
    palette: ["#0f766e", "#042f2e", "#ccfbf1", "#f0fdfa"],
    motif: "current",
  },
  {
    id: "duplo",
    title: "Double",
    ptTitle: "Duplo",
    year: 2023,
    medium: "Acrylic on canvas",
    dimensions: "140 × 110 cm",
    price: 3400,
    status: "sold",
    seed: 63,
    palette: ["#be123c", "#4c0519", "#fecdd3", "#0a0a0a"],
    motif: "fracture",
  },
  {
    id: "silencio",
    title: "Silence",
    ptTitle: "Silêncio",
    year: 2023,
    medium: "Charcoal & wash on linen",
    dimensions: "100 × 80 cm",
    price: 2200,
    status: "available",
    seed: 29,
    palette: ["#1e293b", "#0a0a0a", "#94a3b8", "#e2e8f0"],
    motif: "field",
  },
];

export const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export const artistStatement = {
  short:
    "Paintings that live in the space between yes and no — where a decision is still being made.",
  long: "simnao is the working name of Simão, a Portuguese painter. The name folds his own into a single word — sim + não, yes and no — a small monument to indecision, to holding two truths at once. His canvases work the same way: warm against cold, gesture against restraint, the affirmation and its refusal sharing one surface.",
};
