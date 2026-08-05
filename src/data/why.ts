export interface WhyItem {
  title: string;
  description: string;
  icon: "experience" | "team" | "compliance" | "support";
  /** TODO(cliente): confirmar dado */
  pending?: boolean;
}

export const whyItems: WhyItem[] = [
  {
    title: "Experiência comprovada",
    description:
      "Anos protegendo condomínios e empresas no Rio de Janeiro.",
    icon: "experience",
    pending: true,
  },
  {
    title: "Equipe qualificada",
    description: "Profissionais habilitados, do projeto à execução.",
    icon: "team",
  },
  {
    title: "Conformidade garantida",
    description:
      "Sistemas dentro das normas do CBMERJ, prontos para vistoria.",
    icon: "compliance",
  },
  {
    title: "Atendimento próximo",
    description:
      "Da primeira visita ao pós-instalação, você fala direto com quem executa.",
    icon: "support",
  },
];
