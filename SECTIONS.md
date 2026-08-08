# Especificação de Seções — JFIRE One-Page

Layout, copy e CTAs de cada seção. A arquitetura está em `DESIGN_DOC.md`; as
regras em `CLAUDE.md`. A copy abaixo é **pt-BR e está pronta para uso**, salvo
onde marcado `TODO(cliente)`. Direção de arte: industrial, fundo escuro nas
seções-âncora, acento fogo, kicker mono, cantos retos, cortes diagonais.

Ordem final da página (`src/pages/index.astro`):

1. Header · 2. Hero · 3. Faixa de credenciamento · 4. Serviços gerais ·
5. Condomínio vs Empresa · 6. Porque escolher a JFIRE · 7. Empresas que confiam ·
8. FAQ · 9. CTA final · 10. Rodapé · 11. Botão flutuante de WhatsApp

Convenções desta spec: **[IMG]** sinaliza imagem (com tipo), **[CTA]** sinaliza
ação e a chave de mensagem do WhatsApp (ver DESIGN_DOC › Sistema de CTAs).

---

## 1. Header (`Header.astro`)

**Layout.** Barra fixa (sticky) no topo, fundo `--jf-ink` sólido para contraste.
Logo da JFIRE à esquerda. Navegação por âncora à direita: Serviços · Condomínios ·
Empresas · Contato. À direita de tudo, botão de destaque em `--jf-fire-500`. No
mobile, navegação vira menu hambúrguer (único JS permitido do projeto).

**[IMG]** Logo JFIRE — recebido do cliente, em `src/assets/brand/jfire-logo.jpg`.

**[CTA]** Botão "Fale conosco" → WhatsApp, chave `header`.

Links de âncora: `#servicos`, `#condominios`, `#empresas`, `#contato`.

---

## 2. Hero (`Hero.astro`)

**Layout.** Seção alta, fundo escuro (`--jf-ink`) com **[IMG]** de fundo e overlay
escuro para leitura. Corte diagonal na base (`clip-path`) fazendo a transição
para a faixa de credenciamento. Conteúdo alinhado à esquerda. Kicker mono acima
do H1. Dois CTAs lado a lado.

**[IMG]** Fundo — foto real de bombeiro/técnico em ação ou sistema de sprinkler/
hidrante instalado. `TODO(cliente)`. Placeholder: stock industrial escuro em
`assets/placeholders/hero.*`; se ausente, fundo `--jf-graphite-900` + grafismo
blueprint SVG. `fetchpriority="high"`.

**Copy.**
- Kicker: `PREVENÇÃO E COMBATE A INCÊNDIO · RIO DE JANEIRO`
- H1: **Proteção contra incêndio que mantém seu imóvel seguro e regularizado**
- Descrição: Instalação e manutenção de sistemas de combate a incêndio para
  condomínios e empresas no Rio de Janeiro. Do projeto à execução, com
  conformidade junto ao Corpo de Bombeiros.

**[CTA]** Primário "Falar com um especialista" → WhatsApp, chave `hero_specialist`.
**[CTA]** Secundário "Solicitar orçamento" → âncora `#condominios` (rola para a
seção de segmentos, onde o usuário escolhe o perfil). Estilo outline sobre escuro.

---

## 3. Faixa de credenciamento (`CredentialBar.astro`)

**Layout.** Faixa fina logo abaixo do Hero, fundo claro (`--jf-surface`). Texto
curto à esquerda, selos à direita. Discreta, mas antes da dobra. Traz a prova de
confiança para cima, o que importa em segurança contra incêndio.

**Copy.** Texto: Empresa credenciada e regularizada para atuar na proteção contra
incêndio.

**[IMG]** 3 selos (CBMERJ, CAU/BR, CREA-RJ) — recebidos do cliente, em
`src/assets/credentials/`, renderizados via `CredentialBadge`.

---

## 4. Serviços gerais (`Services.astro`) — âncora `#servicos`

**Layout.** Fundo claro. Kicker mono + H2. Grid responsivo de cards (ícone SVG +
título + 1 linha + link). Cantos retos, borda fina `--jf-border`, hover com
acento `--jf-ember-500`. Dados em `src/data/services.ts`.

**Copy.**
- Kicker: `O QUE FAZEMOS`
- H2: **Soluções completas em prevenção e combate a incêndio**
- Apoio: Da instalação ao laudo, cuidamos de cada etapa do seu sistema de segurança.

**Cards** (título + descrição de uma linha):
1. **Sprinkler (chuveiros automáticos)** — Supressão que age no início do
   incêndio, antes que ele se alastre.
2. **Rede de hidrantes** — Instalação e inspeção de redes hidráulicas de combate,
   com vazão e pressão dentro da norma.
3. **Detecção e alarme** — Monitoramento inteligente que identifica o foco e
   alerta em segundos.
4. **Iluminação de emergência** — Visibilidade e rota segura quando falta energia.
5. **Sinalização de emergência** — Identificação dos equipamentos e orientação
   da rota de fuga.
6. **Pressurização e detecção de fumaça** — Controle da fumaça para manter as
   saídas livres.

**[IMG]** Ícones de linha (SVG) por card. Ícones genéricos de segurança/incêndio,
sem depender de ativo do cliente.

**[CTA]** Rodapé da seção, texto: Não sabe do que precisa? → "Falar com a gente e
avaliar meu imóvel" → WhatsApp, chave `services`.

---

## 5. Condomínio vs Empresa (`Segments.astro`) — âncoras `#condominios` e `#empresas`

**Layout.** Seção-chave de conversão. Fundo escuro (`--jf-ink`) para peso e
contraste. Duas colunas lado a lado (empilham no mobile), cada uma com ícone e
acento próprios para leitura rápida. Bullets curtos. CTA por coluna. Dados em
`src/data/segments.ts`.

**Copy — cabeçalho da seção.**
- Kicker: `PARA CADA TIPO DE IMÓVEL`
- H2: **Soluções sob medida para o seu perfil**

**Coluna A — Condomínios** (`#condominios`)
- Título: Para o seu condomínio
- Contexto: Segurança dos moradores e regularização junto ao Corpo de Bombeiros,
  sem dor de cabeça para o síndico.
- Bullets: instalação de sprinkler e hidrantes · sinalização e iluminação de
  emergência · detecção de fumaça · pressurização automática · laudos e
  regularização.
- **[CTA]** "Solicitar avaliação para condomínio" → WhatsApp, chave `segment_condo`.

**Coluna B — Empresas** (`#empresas`)
- Título: Para a sua empresa
- Contexto: Proteção do patrimônio e dos colaboradores, com sistemas
  dimensionados para a sua operação.
- Bullets: projeto e instalação do zero · rede de sprinkler e hidrantes ·
  detecção e alarme · sinalização de emergência · manutenção preventiva.
- **[CTA]** "Solicitar avaliação para empresa" → WhatsApp, chave `segment_company`.

> Nota: os bullets são o ponto ideal para refinar depois com os serviços de
> destaque reais por categoria, que ficaram como lacuna do site fora do ar.
> Marcar em `segments.ts` com comentário `TODO(cliente): confirmar destaques`.

---

## 6. Porque escolher a JFIRE (`WhyJfire.astro`)

**Layout.** Fundo claro. Kicker + H2. Grid de 4 diferenciais (ícone + título +
1 linha). Números de prova podem entrar aqui ou na seção 7 (ver abaixo).

**Copy.**
- Kicker: `POR QUE A JFIRE`
- H2: **Porque escolher a JFIRE**

**Diferenciais:**
1. **Experiência comprovada** — Anos protegendo condomínios e empresas no Rio de
   Janeiro. `TODO(cliente): confirmar nº de anos`.
2. **Equipe qualificada** — Profissionais habilitados, do projeto à execução.
3. **Conformidade garantida** — Sistemas dentro das normas do CBMERJ, prontos
   para vistoria.
4. **Atendimento próximo** — Da primeira visita ao pós-instalação, você fala
   direto com quem executa.

---

## 7. Empresas que confiam na JFIRE (`ClientsLogos.astro`) — âncora `#empresas` (secundária)

**Layout.** Fundo escuro OU claro (alternar em relação à seção vizinha). Uma
linha de número de prova grande no topo (Archivo pesado + rótulo mono), seguida
do grid de logos. Logos em tamanho e proporção uniformes, bem espaçados; efeito
tom neutro → cor no hover.

**Copy.**
- Kicker: `PROVA REAL`
- Número de prova: **[TODO(cliente)] +XX imóveis protegidos** no Rio de Janeiro.
- H2 (ou apoio): Empresas que confiam na JFIRE.

**[IMG]** Grid de logos — `TODO(cliente)`. Usar `PlaceholderLogo` com o nome de
cada empresa em texto (Vianense, Paineiras Corcovado, Basile Advogados, Localiza
Hertz, Hospital Vital, Drogarias Tamoio, Hotel Ibis, Rio Pax, Elbo, etc.).
**Não gerar os logos reais.** Fonte dos nomes em `src/data/clients.ts`.

---

## 8. FAQ (`Faq.astro`) — âncora `#faq`

**Layout.** Fundo claro. Kicker + H2. Acordeão nativo `<details>/<summary>` (zero
JS, acessível por teclado). Uma coluna, largura de leitura confortável. Mesma
fonte de dados alimenta o JSON-LD `FAQPage` (`src/data/faq.ts`).

**Copy.**
- Kicker: `DÚVIDAS FREQUENTES`
- H2: **Perguntas frequentes**

**Perguntas (respostas em rascunho — `TODO(cliente): revisar respostas`):**
1. **O que é o AVCB e vocês cuidam disso?** — O AVCB é o Auto de Vistoria do
   Corpo de Bombeiros, documento que atesta que a edificação atende às normas de
   segurança contra incêndio. A JFIRE acompanha as etapas de projeto, instalação
   e adequação para a vistoria.
2. **De quanto em quanto tempo preciso fazer manutenção?** — Depende do sistema.
   Em geral, equipamentos como bombas e alarmes são testados periodicamente e
   itens como mangueiras e extintores seguem prazos próprios. Avaliamos o seu
   caso e indicamos o plano adequado. `TODO(cliente): confirmar prazos que a JFIRE pratica`.
3. **Vocês atendem condomínios e empresas em toda a cidade do Rio?** — Sim,
   atendemos condomínios e empresas na cidade do Rio de Janeiro. `TODO(cliente): confirmar região`.
4. **Vocês fazem o projeto e a instalação, ou só um dos dois?** — Atuamos do
   projeto à execução, incluindo a instalação do zero quando necessário.
5. **Como funciona a primeira avaliação?** — Você entra em contato pelo WhatsApp,
   entendemos a necessidade do imóvel e agendamos uma vistoria para indicar a
   melhor solução.
6. **Quais sistemas vocês instalam?** — Sprinkler, redes de hidrantes, detecção
   e alarme, iluminação e sinalização de emergência, pressurização e detecção de
   fumaça, entre outros.

**[CTA]** Após a lista, linha "Não encontrou sua dúvida?" → "Fale com a gente" →
WhatsApp, chave `faq`.

---

## 9. CTA final (`FinalCta.astro`) — âncora `#contato` (junto ao rodapé)

**Layout.** Faixa de fechamento, fundo escuro (`--jf-ink`) ou com o vermelho
`--jf-fire-500` como bloco de acento e corte diagonal. Título forte, uma linha de
apoio e os dois CTAs por segmento.

**Copy.**
- H2: **Pronto para proteger o seu imóvel?**
- Apoio: Fale com a JFIRE e receba uma avaliação para o seu condomínio ou empresa.

**[CTA]** "Orçamento para condomínio" → WhatsApp, chave `segment_condo`.
**[CTA]** "Orçamento para empresa" → WhatsApp, chave `segment_company`.

---

## 10. Rodapé (`Footer.astro`) — âncora `#contato`

**Layout.** Fundo escuro (`--jf-graphite-900`/`--jf-ink`), dividido em blocos.

Blocos:
- **Mapa** incorporado com o endereço correto: **Rua Pedro Ernesto, 83, Gamboa,
  Rio de Janeiro, RJ**. Usar embed leve (iframe com `loading="lazy"`) ou link
  estático para o mapa se o iframe pesar no LCP.
- **Contato:** os dois telefones e o WhatsApp. `TODO(cliente): confirmar números`.
  Placeholder: (21) 96964-1666 e (21) 98200-6834.
- **Redes sociais:** Facebook, Instagram e WhatsApp (ícones corretos, não Twitter/
  Youtube). URLs em `site.ts`; alimentam `sameAs` do JSON-LD.
- **Selos de credenciamento:** os 3 selos novamente (placeholder), reforçando
  confiança no fechamento.
- **Linha legal:** razão social, CNPJ (`TODO(cliente)`) e `© <ano> JFIRE`.

**[IMG]** Logo (rodapé) e selos — ativos reais, mesmos das seções anteriores.

---

## 11. Botão flutuante de WhatsApp (`WhatsAppFab.astro`)

**Layout.** Fixo no canto inferior direito, visível em toda a rolagem. Círculo em
verde WhatsApp com ícone SVG, `--jf-radius-pill`, sombra `--jf-shadow-md`, leve
animação de entrada (respeitando `prefers-reduced-motion`). No mobile, garantir
que não cubra os CTAs das seções (afastar da base o suficiente).

**Acessibilidade.** `aria-label="Falar com a JFIRE no WhatsApp"`; alvo de toque
mínimo confortável; foco visível.

**[CTA]** → WhatsApp, chave `float`.
