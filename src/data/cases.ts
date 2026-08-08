export interface Case {
  id: string;
  name: string;
  /** TODO(cliente): confirmar segmento oficial de cada caso */
  segment: string;
  /** TODO(cliente): texto de resultado por cliente (o que foi feito) */
  result: string;
  /** true enquanto a foto real da instalação não chega */
  imagePending: boolean;
  /** true enquanto o PDF do projeto não chega */
  pdfPending: boolean;
}

export const cases: Case[] = [
  {
    id: "vianense-recreio",
    name: "Supermercados Vianense Recreio",
    segment: "Varejo",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "bluefit",
    name: "Bluefit",
    segment: "Fitness",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "paineiras-corcovado",
    name: "Paineiras Corcovado",
    segment: "Turismo",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "drogarias-tamoio",
    name: "Drogarias Tamoio",
    segment: "Varejo",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "vianense-central",
    name: "Supermercados Vianense Central",
    segment: "Varejo",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "mr-cat",
    name: "Mr. Cat",
    segment: "Varejo",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "ibis-posto-cinco",
    name: "Hotel Ibis Posto Cinco",
    segment: "Hotelaria",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "localiza",
    name: "Localiza",
    segment: "Locação de veículos",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "elbo",
    name: "Elbo",
    segment: "Indústria",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "rio-pax",
    name: "Rio Pax",
    segment: "Serviços funerários",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "hospital-vital",
    name: "Hospital Vital",
    segment: "Saúde",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "basile-advogados",
    name: "Basile Advogados",
    segment: "Jurídico",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "sidon",
    name: "Sidon",
    segment: "Condomínio",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "tampico",
    name: "Tampico",
    segment: "Condomínio",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
  {
    id: "match",
    name: "Match",
    segment: "Condomínio",
    result: "Sistema de combate a incêndio projetado e instalado para operação em conformidade.",
    imagePending: true,
    pdfPending: true,
  },
];
