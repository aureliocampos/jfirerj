import type { WhatsAppMessageKey } from "../config/site.ts";

export interface Pain {
  /** nome do ícone Lucide, ex.: "lucide:droplet" */
  icon: string;
  title: string;
  body: string;
}

export interface Segment {
  /** vira o id da <section> e a âncora do menu */
  id: string;
  kicker: string;
  title: string;
  intro: string;
  pains: Pain[];
  image: {
    src: string;
    alt: string;
  };
  imageSide: "left" | "right";
  bg: "bg" | "bg-alt";
  ctaKey: WhatsAppMessageKey;
  ctaLabel: string;
}

export const segmentCondos: Segment = {
  id: "condominios",
  kicker: "Para condomínios",
  title: "O que trava a segurança e onera o caixa do seu prédio",
  intro:
    "O síndico responde pela segurança dos moradores e pela conservação do prédio. A JFire resolve a exigência do Corpo de Bombeiros e, no mesmo serviço, os problemas de água e infiltração que pesam no orçamento do condomínio.",
  imageSide: "right",
  bg: "bg",
  ctaKey: "segment_condos",
  ctaLabel: "Falar sobre meu condomínio",
  image: {
    src: `${import.meta.env.BASE_URL}segmentos/condominios.webp`,
    alt: "Casa de máquinas de incêndio de condomínio, com bombas de pressurização",
  },
  pains: [
    {
      icon: "lucide:droplet",
      title: "Rede de hidrante vazando e sem pressão",
      body: "Tubulação antiga de aço carbono que vaza, derruba a pressão da rede de incêndio e infiltra na garagem e no subsolo. Trocamos por tubulação nova de alta durabilidade e estanqueidade.",
    },
    {
      icon: "lucide:gauge",
      title: "Sistema de pressurização parado",
      body: "Sem manutenção, a casa de máquinas não entrega água pressurizada aos hidrantes na hora do incêndio. Readequamos a casa de máquinas, automatizamos o painel e trocamos quadro elétrico, válvulas e registros.",
    },
    {
      icon: "lucide:cylinder",
      title: "Reservatórios e caixas d'água deteriorados",
      body: "Vazamentos invisíveis que comprometem o suprimento mínimo de segurança e desperdiçam água. Recuperamos a estrutura interna e impermeabilizamos por completo.",
    },
    {
      icon: "lucide:zap",
      title: "Para-raios (SPDA) sem aterramento em dia",
      body: "Vulnerabilidade a raios, queima de portões e elevadores, e risco de recusa do seguro predial. Fazemos medição ôhmica, troca de aterramento e sinalização aérea.",
    },
    {
      icon: "lucide:sliders-horizontal",
      title: "Colunas de água sem autonomia de registro",
      body: "Impossibilita a manutenção setorial e incomoda os moradores, sobretudo nas coberturas. Instalamos caixas superiores e registros de esfera novos.",
    },
  ],
};

export const segmentCompanies: Segment = {
  id: "empresas",
  kicker: "Para empresas e comércios",
  title: "Conformidade e liberação de alvará sem parar sua operação",
  intro:
    "Empresas e redes comerciais precisam de segurança que cumpra a norma e o prazo, com a menor interrupção possível. A JFire entrega a solução completa, da instalação ao Certificado de Aprovação, para você abrir e operar dentro da lei.",
  imageSide: "left",
  bg: "bg-alt",
  ctaKey: "segment_companies",
  ctaLabel: "Solicitar avaliação da minha empresa",
  image: {
    src: `${import.meta.env.BASE_URL}segmentos/empresas.webp`,
    alt: "Rede de sprinklers instalada no teto de um galpão comercial",
  },
  pains: [
    {
      icon: "lucide:shower-head",
      title: "Sprinkler exigido para abrir ou operar a loja",
      body: "Sem o chuveiro automático dimensionado, não há inauguração nem funcionamento regular, e o risco é de interdição. Instalamos a rede de sprinklers com bicos termo-sensíveis, no prazo da obra.",
    },
    {
      icon: "lucide:siren",
      title: "Alarme disparando sem motivo",
      body: "Evacuações desnecessárias, pânico de clientes e hóspedes e perda de credibilidade. Diagnosticamos e trocamos os detectores com falha.",
    },
    {
      icon: "lucide:warehouse",
      title: "Hidrantes sem pressão em áreas grandes",
      body: "Em galpões e centros de distribuição, a despressurização impede combater o fogo em estoques massivos. Readequamos e automatizamos todo o sistema de pressurização.",
    },
    {
      icon: "lucide:heart-pulse",
      title: "Operação crítica que não pode parar",
      body: "Hospitais e serviços essenciais exigem segurança contínua, sem janela de interrupção. Fazemos manutenção preventiva de alta frequência, teste de bombas e reestruturação do recalque.",
    },
    {
      icon: "lucide:clipboard-check",
      title: "Documentação e rota de fuga irregulares",
      body: "Sem extintores, sinalização fotoluminescente e iluminação de emergência, a vistoria reprova e trava o Certificado de Aprovação. Instalamos tudo para liberar o alvará.",
    },
  ],
};

export const segments: Segment[] = [segmentCondos, segmentCompanies];
