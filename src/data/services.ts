export interface Service {
  id: string;
  title: string;
  description: string;
  icon: "sprinkler" | "hydrant" | "alarm" | "light" | "sign" | "smoke";
}

export const services: Service[] = [
  {
    id: "sprinkler",
    title: "Sprinkler (chuveiros automáticos)",
    description:
      "Supressão que age no início do incêndio, antes que ele se alastre.",
    icon: "sprinkler",
  },
  {
    id: "hydrant",
    title: "Rede de hidrantes",
    description:
      "Instalação e inspeção de redes hidráulicas de combate, com vazão e pressão dentro da norma.",
    icon: "hydrant",
  },
  {
    id: "alarm",
    title: "Detecção e alarme",
    description:
      "Monitoramento inteligente que identifica o foco e alerta em segundos.",
    icon: "alarm",
  },
  {
    id: "light",
    title: "Iluminação de emergência",
    description: "Visibilidade e rota segura quando falta energia.",
    icon: "light",
  },
  {
    id: "sign",
    title: "Sinalização de emergência",
    description:
      "Identificação dos equipamentos e orientação da rota de fuga.",
    icon: "sign",
  },
  {
    id: "smoke",
    title: "Pressurização e detecção de fumaça",
    description: "Controle da fumaça para manter as saídas livres.",
    icon: "smoke",
  },
];
