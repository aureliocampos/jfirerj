export interface FaqItem {
  question: string;
  answer: string;
  /** true quando a resposta ainda depende de confirmação do cliente */
  pending?: boolean;
}

export const faqItems: FaqItem[] = [
  {
    question: "O que é o AVCB e vocês cuidam disso?",
    answer:
      "O AVCB é o Auto de Vistoria do Corpo de Bombeiros, documento que atesta que a edificação atende às normas de segurança contra incêndio. A JFIRE acompanha as etapas de projeto, instalação e adequação para a vistoria.",
  },
  {
    question: "De quanto em quanto tempo preciso fazer manutenção?",
    answer:
      "Depende do sistema. Em geral, equipamentos como bombas e alarmes são testados periodicamente e itens como mangueiras e extintores seguem prazos próprios. Avaliamos o seu caso e indicamos o plano adequado.",
    /** TODO(cliente): confirmar prazos que a JFIRE pratica. */
    pending: true,
  },
  {
    question: "Vocês atendem condomínios e empresas em toda a cidade do Rio?",
    answer:
      "Sim, atendemos condomínios e empresas na cidade do Rio de Janeiro.",
    /** TODO(cliente): confirmar região. */
    pending: true,
  },
  {
    question: "Vocês fazem o projeto e a instalação, ou só um dos dois?",
    answer:
      "Atuamos do projeto à execução, incluindo a instalação do zero quando necessário.",
  },
  {
    question: "Como funciona a primeira avaliação?",
    answer:
      "Você entra em contato pelo WhatsApp, entendemos a necessidade do imóvel e agendamos uma vistoria para indicar a melhor solução.",
  },
  {
    question: "Quais sistemas vocês instalam?",
    answer:
      "Sprinkler, redes de hidrantes, detecção e alarme, iluminação e sinalização de emergência, pressurização e detecção de fumaça, entre outros.",
  },
];
