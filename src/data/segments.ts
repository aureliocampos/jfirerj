export interface Segment {
  id: "condo" | "company";
  anchor: string;
  title: string;
  context: string;
  /** TODO(cliente): confirmar destaques por categoria */
  bullets: string[];
  ctaLabel: string;
  whatsappKey: "segment_condo" | "segment_company";
  icon: "building" | "factory";
}

export const segments: Segment[] = [
  {
    id: "condo",
    anchor: "condominios",
    title: "Para o seu condomínio",
    context:
      "Segurança dos moradores e regularização junto ao Corpo de Bombeiros, sem dor de cabeça para o síndico.",
    bullets: [
      "Instalação de sprinkler e hidrantes",
      "Sinalização e iluminação de emergência",
      "Detecção de fumaça",
      "Pressurização automática",
      "Laudos e regularização",
    ],
    ctaLabel: "Solicitar avaliação para condomínio",
    whatsappKey: "segment_condo",
    icon: "building",
  },
  {
    id: "company",
    anchor: "empresas",
    title: "Para a sua empresa",
    context:
      "Proteção do patrimônio e dos colaboradores, com sistemas dimensionados para a sua operação.",
    bullets: [
      "Projeto e instalação do zero",
      "Rede de sprinkler e hidrantes",
      "Detecção e alarme",
      "Sinalização de emergência",
      "Manutenção preventiva",
    ],
    ctaLabel: "Solicitar avaliação para empresa",
    whatsappKey: "segment_company",
    icon: "factory",
  },
];
