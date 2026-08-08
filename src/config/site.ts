export const SITE_URL =
  import.meta.env.SITE_URL ?? "https://aureliocampos.github.io";
export const BASE_PATH = import.meta.env.BASE_PATH ?? "/jfirerj/";

/** TODO(cliente): confirmar número oficial de WhatsApp */
export const WHATSAPP_NUMBER = "5521969641666";

export const SITE = {
  title:
    "Sistemas contra incêndio para condomínios e empresas | JFIRE — Rio de Janeiro",
  description:
    "Instalação e manutenção de sistemas de combate a incêndio para condomínios e empresas no Rio de Janeiro. Sprinkler, hidrantes, detecção e laudos CBMERJ.",
  themeColor: "#dc2626",
  lang: "pt-BR",
} as const;

export const BUSINESS = {
  name: "JFIRE",
  /** TODO(cliente): razão social */
  legalName: "JFIRE",
  /** TODO(cliente): CNPJ */
  cnpj: "",
  address: {
    street: "Rua Pedro Ernesto, 83",
    neighborhood: "Gamboa",
    city: "Rio de Janeiro",
    state: "RJ",
    postalCode: "20220-110",
    country: "BR",
  },
  geo: {
    latitude: -22.8985,
    longitude: -43.1962,
  },
  /** TODO(cliente): confirmar telefones */
  phones: ["(21) 96964-1666", "(21) 98200-6834"],
  email: "",
  areaServed: "Rio de Janeiro",
} as const;

/** TODO(cliente): validar URLs oficiais */
export const SOCIAL = {
  facebook: "https://www.facebook.com/jfirerj",
  instagram: "https://www.instagram.com/jfirerj",
} as const;

export type WhatsAppMessageKey =
  | "float"
  | "header"
  | "hero_specialist"
  | "services"
  | "segment_condo"
  | "segment_company"
  | "faq"
  | "footer";

export const WHATSAPP_MESSAGES: Record<WhatsAppMessageKey, string> = {
  float: "Olá! Vim pelo site da JFIRE e gostaria de mais informações.",
  header:
    "*Contato pelo site* 👋\nOlá, JFIRE! Vim pelo site e gostaria de falar com vocês.",
  hero_specialist:
    "*Falar com especialista* 👋\nOlá, JFIRE! Vim pelo site e quero falar com um especialista sobre proteção contra incêndio.",
  services:
    "*Avaliação de imóvel* 🧯\nOlá, JFIRE! Vim pela seção de serviços e gostaria de uma avaliação do meu imóvel.",
  segment_condo:
    "*Orçamento · Condomínio* 🏢\nOlá, JFIRE! Vim pelo site e gostaria de um orçamento para o meu condomínio.",
  segment_company:
    "*Orçamento · Empresa* 🏭\nOlá, JFIRE! Vim pelo site e gostaria de um orçamento para a minha empresa.",
  faq: "*Dúvida pelo site* ❓\nOlá, JFIRE! Não encontrei minha dúvida no site e gostaria de ajuda.",
  footer:
    "*Contato pelo site* 👋\nOlá, JFIRE! Vim pelo rodapé do site.",
};

export function absoluteUrl(path: string = ""): string {
  const base = BASE_PATH.endsWith("/") ? BASE_PATH : `${BASE_PATH}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const site = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  return `${site}${base}${normalizedPath}`;
}

export function whatsappUrl(key: WhatsAppMessageKey): string {
  const text = WHATSAPP_MESSAGES[key];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+55${digits.startsWith("55") ? digits.slice(2) : digits}`;
}
