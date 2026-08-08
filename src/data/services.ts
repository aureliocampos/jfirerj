export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "sprinkler",
    title: "Sistema de sprinkler",
    description:
      "Chuveiros automáticos que detectam e combatem o fogo no início, antes de se espalhar.",
    icon: "lucide:shower-head",
  },
  {
    id: "alarme",
    title: "Alarme e detecção",
    description:
      "Detectores e centrais que avisam a tempo de evacuar e agir.",
    icon: "lucide:siren",
  },
  {
    id: "hidrantes",
    title: "Hidrantes e mangueiras",
    description:
      "Rede dimensionada para garantir vazão e pressão no combate ao fogo.",
    icon: "lucide:fire-extinguisher",
  },
  {
    id: "para-raios",
    title: "Para-raios (SPDA)",
    description:
      "Proteção da edificação contra descargas atmosféricas, conforme norma.",
    icon: "lucide:zap",
  },
  {
    id: "projeto",
    title: "Projeto técnico e ART",
    description:
      "Projeto assinado por responsável técnico, base para a aprovação no Corpo de Bombeiros.",
    icon: "lucide:drafting-compass",
  },
  {
    id: "manutencao",
    title: "Manutenção e laudos",
    description: "Preventiva, recarga e laudos que mantêm seu AVCB válido.",
    icon: "lucide:wrench",
  },
];
