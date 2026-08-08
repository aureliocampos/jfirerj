export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { id: "projetos", value: 789, suffix: "+", label: "Sucesso em projetos" },
  { id: "orcamentos", value: 1000, suffix: "+", label: "Orçamentos" },
  { id: "anos", value: 8, suffix: "+", label: "Anos de atuação" },
];
