export const SITE_URL =
  import.meta.env.SITE_URL ?? "https://aureliocampos.github.io";
export const BASE_PATH = import.meta.env.BASE_PATH ?? "/jfirerj/";

export const WHATSAPP_NUMBER = "5521982006834";
/** Telefone de exibição no Contato/Rodapé. Não é destino de CTA. */
export const PHONE_DISPLAY = "21 96964-1666";
export const WHATSAPP_DISPLAY = "21 98200-6834";

export const SITE = {
  title:
    "Sistemas contra incêndio para condomínios e empresas | JFIRE — Rio de Janeiro",
  description:
    "A JFIRE projeta, instala e regulariza sprinkler, alarme, hidrantes e para-raios para condomínios e empresas no Rio de Janeiro. Equipe credenciada CREA, CAU e Corpo de Bombeiros.",
  themeColor: "#c43932",
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
  phoneDisplay: PHONE_DISPLAY,
  whatsappDisplay: WHATSAPP_DISPLAY,
  email: "comercial@jfirerj.com.br",
  hours: "Seg a sáb, 08h às 20h",
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
  | "hero"
  | "services"
  | "how"
  | "contact";

export const WHATSAPP_MESSAGES: Record<WhatsAppMessageKey, string> = {
  float: "Olá! Vim pelo site e quero falar com a JFire. *[Botão fixo]*",
  header: "Olá! Vim pelo site e quero falar com a JFire. *[Header]*",
  hero: "Olá! Vim pelo site e quero solicitar um orçamento de sistema contra incêndio. *[Hero]*",
  services:
    "Olá! Vim pelo site e quero entender qual sistema minha edificação precisa. *[Serviços]*",
  how: "Olá! Vim pelo site e quero solicitar um diagnóstico. *[Como funciona]*",
  contact: "Olá! Vim pelo site e quero solicitar um orçamento. *[Contato]*",
};

export function absoluteUrl(path: string = ""): string {
  const base = BASE_PATH.endsWith("/") ? BASE_PATH : `${BASE_PATH}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const site = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  return `${site}${base}${normalizedPath}`;
}

export function whatsappUrl(key: WhatsAppMessageKey): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES[key])}`;
}

/** CTA por card de caso: interpola o nome do cliente na mensagem. */
export function whatsappCaseUrl(clientName: string): string {
  const text = `Olá! Vim pelo site, vi o caso da ${clientName} e quero um projeto assim. *[Caso: ${clientName}]*`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Composição do deep link a partir do formulário de contato (ilha vanilla). */
export function whatsappContactFormUrl(data: {
  nome: string;
  tipo: string;
  mensagem: string;
}): string {
  const text = [
    "Olá! Vim pelo site e quero solicitar um orçamento. *[Contato]*",
    `Nome: ${data.nome}`,
    `Tipo: ${data.tipo}`,
    `Mensagem: ${data.mensagem}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+55${digits.startsWith("55") ? digits.slice(2) : digits}`;
}
