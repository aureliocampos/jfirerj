# Design Doc — JFIRE One-Page

Documento de arquitetura e engenharia. O conteúdo e o layout de cada seção
estão em `SECTIONS.md`, que é a fonte única de estrutura. As regras de execução
resumidas estão no `CLAUDE.md` da raiz. Onde este doc e o `SECTIONS.md`
divergirem, o `SECTIONS.md` vence.

---

## 1. Objetivo e não-objetivos

**Objetivo.** Uma landing page única, estática e de altíssima performance para a
JFIRE, focada em conversão via WhatsApp e forte presença em SEO/GEO local (Rio
de Janeiro), substituindo o antigo site WordPress.

**Não-objetivos.**

- Sem CMS, sem backend, sem banco de dados.
- Sem envio de formulário por e-mail ou servidor. O formulário de contato compõe
  um deep link de WhatsApp a partir dos campos, mantendo a conversão 100% no
  WhatsApp e o site 100% estático (ver seção 10).
- Sem blog nem múltiplas páginas nesta versão.

Nota de escopo: os PDFs de projeto por cliente, que antes estavam fora do escopo,
agora entram como link de download dentro dos cards de caso (ver `SECTIONS.md`,
seção Casos de sucesso).

---

## 2. Stack e hospedagem

- **Astro**, saída estática, zero JS de framework.
- **GitHub Pages** como host. Deploy exclusivamente via GitHub Actions no merge
  para `main`. Sem deploy manual.
- CSS puro ancorado nos design tokens `--jf-*`.
- Otimização de imagens com `astro:assets`. Sitemap com `@astrojs/sitemap`.

Racional: Astro entrega o HTML estático que o GitHub Pages serve, mantém zero JS
de framework (bom para LCP/CLS) e ainda dá componentização, otimização de imagem
e geração de sitemap sem esforço.

**JS permitido (ilhas isoladas, hidratadas só onde indispensável).** A página é
estática por padrão. Vanilla mínimo, em ilha, é permitido para: toggle do menu
mobile, lightbox da galeria de casos (com foco preso e restaurado), animação dos
contadores da seção Números (uma vez, ao entrar na viewport) e composição do
deep link de WhatsApp no formulário de contato. Scroll suave é CSS
(`scroll-behavior`); o reposicionamento de foco na navegação por âncora usa JS
mínimo. Qualquer JS além destes exige justificativa no PR.

---

## 3. Configuração de domínio (ponto único)

Enquanto o `jfirerj.com.br` não é reapontado, o site roda no GitHub Pages. Para
trocar o domínio em um único lugar:

`src/config/site.ts` centraliza:

```ts
export const SITE_URL =
  import.meta.env.SITE_URL ?? "https://<usuario>.github.io";
export const BASE_PATH = import.meta.env.BASE_PATH ?? "/jfire-onepage/"; // repo project page
export const WHATSAPP_NUMBER = "5521982006834"; // oficial, confirmado
export const PHONE_DISPLAY = "21 96964-1666"; // telefone de exibição (não é destino de CTA)
```

`astro.config.mjs` consome esses valores em `site` e `base`. Todo canonical,
Open Graph URL, JSON-LD e sitemap derivam de `SITE_URL` + `BASE_PATH`. Nenhum
outro arquivo pode ter URL absoluta hardcoded.

**Migração para o domínio final (quando o cliente liberar):**

1. Definir env `SITE_URL=https://jfirerj.com.br` e `BASE_PATH=/`.
2. Adicionar `public/CNAME` com `jfirerj.com.br`.
3. Configurar o DNS e o custom domain no GitHub Pages.
4. Publicar os stubs de 301 de `/empresas` e `/condominios` (ver seção 11).

Nenhuma outra alteração de código deve ser necessária.

---

## 4. Estrutura de pastas

```
/
├─ CLAUDE.md
├─ README.md
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ .github/workflows/deploy.yml
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  ├─ og/og-default.jpg            # imagem de compartilhamento (placeholder)
│  ├─ empresas/index.html          # stub de 301 → #casos (canonical + meta refresh)
│  ├─ condominios/index.html       # stub de 301 → #casos (canonical + meta refresh)
│  └─ projetos/                    # PDFs de projeto por cliente (quando chegarem)
├─ src/
│  ├─ config/
│  │  └─ site.ts                   # SITE_URL, BASE_PATH, WHATSAPP_NUMBER, dados do negócio, mensagens de CTA
│  ├─ styles/
│  │  ├─ tokens.css                # tokens --jf-* (colar do Design System, sem alterar)
│  │  └─ base.css                  # reset, escala tipográfica clamp, container, utilitários
│  ├─ layouts/
│  │  └─ BaseLayout.astro          # <head>, meta, fontes, JSON-LD, slots
│  ├─ components/
│  │  ├─ Header.astro              # nav sticky por âncora + CTA + menu mobile
│  │  ├─ Hero.astro
│  │  ├─ TrustBar.astro            # barra de confiança (logos de clientes)
│  │  ├─ Problem.astro             # seção Problema (3 cards de dor)
│  │  ├─ Services.astro            # grid de serviços
│  │  ├─ HowItWorks.astro          # 5 etapas do processo
│  │  ├─ WhyJfire.astro            # diferenciais + faixa de credenciais
│  │  ├─ Cases.astro               # galeria de casos + lightbox + link de PDF
│  │  ├─ Stats.astro               # números de prova (contadores)
│  │  ├─ Contact.astro             # form (compõe WhatsApp) + dados + mapa
│  │  ├─ Footer.astro
│  │  ├─ WhatsAppFab.astro         # botão flutuante fixo
│  │  ├─ WhatsAppLink.astro        # helper: recebe uma chave e monta o deep link
│  │  ├─ CredentialBadge.astro     # selo real de credenciamento (astro:assets)
│  │  ├─ PlaceholderLogo.astro     # placeholder neutro para logo de cliente + data-pending
│  │  └─ SectionKicker.astro       # rótulo mono acima dos títulos
│  ├─ data/
│  │  ├─ services.ts               # 6 cards de serviços
│  │  ├─ cases.ts                  # casos: nome, segmento, imagem, linha de resultado, pdf
│  │  ├─ stats.ts                  # números de prova
│  │  ├─ clients.ts                # nomes/logos da barra de confiança
│  │  └─ credentials.ts            # selos (ativos reais recebidos)
│  ├─ assets/
│  │  ├─ brand/                    # logo da JFIRE (recebido)
│  │  ├─ credentials/              # CBMERJ, CAU/BR, CREA-RJ (recebidos)
│  │  ├─ cases/                    # fotos reais dos casos (recebidas)
│  │  └─ placeholders/             # fundos de stock/mock sinalizados
│  └─ pages/
│     └─ index.astro               # monta as seções na ordem final
```

Ordem em `index.astro`: `Header`, `Hero`, `TrustBar`, `Problem`, `Services`,
`HowItWorks`, `WhyJfire`, `Cases`, `Stats`, `Contact`, `Footer`, `WhatsAppFab`.

---

## 5. Design tokens

Tema claro. Colar o bloco de tokens em `src/styles/tokens.css` sem alterar os
valores. Consumo obrigatório via variáveis; proibido hex/tamanho mágico.

```css
:root {
  /* Vermelhos */
  --jf-red: #c43932; /* primário: CTA, kicker, ícone de destaque */
  --jf-red-deep: #9e2a24; /* hover de CTA, links, texto vermelho pequeno em fundo claro */
  --jf-red-bright: #e24b4a; /* realce vivo em ícone ou passo ativo. Nunca em texto pequeno */
  --jf-red-wash: #fbecea; /* fundo da seção Problema, badges de segmento, tints */
  --jf-wine: #5e1815; /* numerais grandes da seção Números, detalhe no rodapé */

  /* Neutros */
  --jf-bg: #fbfaf8; /* fundo base da página */
  --jf-surface: #ffffff; /* cards */
  --jf-bg-alt: #f1f0ec; /* alternância de seção para dar ritmo */
  --jf-border: #e4e2dc; /* hairlines, divisórias */
  --jf-anchor: #4b4b49; /* rodapé (o cinza que substitui o preto) */
  --jf-ink: #23241f; /* texto principal, grafite, não preto puro */
  --jf-ink-2: #5f5e5a; /* texto secundário, legendas */

  /* Layout */
  --jf-maxw: 1280px; /* largura máxima do container */
  --jf-u: 1vw; /* unidade fluida (100vw / base), só para layout/espaçamento */
}
```

Mapa rápido de uso:

| Papel                                         | Token                     |
| --------------------------------------------- | ------------------------- |
| Primária (botões, kicker, destaques)          | `--jf-red`                |
| Accent (hover, links, texto vermelho pequeno) | `--jf-red-deep`           |
| Highlight (ícone/realce grande, nunca texto)  | `--jf-red-bright`         |
| Fundo de ambiente da seção Problema           | `--jf-red-wash`           |
| Numerais de prova                             | `--jf-red` ou `--jf-wine` |
| Fundo de seção                                | `--jf-bg` / `--jf-bg-alt` |
| Superfície de card                            | `--jf-surface`            |
| Âncora (só rodapé)                            | `--jf-anchor`             |
| Texto                                         | `--jf-ink` / `--jf-ink-2` |

Contrastes validados (AA): branco sobre `--jf-red` 5,3:1; `--jf-ink` sobre
`--jf-bg` ~14:1; off-white sobre `--jf-anchor` 8,4:1. `--jf-red-bright` não
atinge AA em texto pequeno, então fica restrito a ícone e realce grande.

---

## 6. Tipografia fluida (regra crítica)

`--jf-u = 100vw / base` vale para **layout e espaçamento**. Para **tipografia**,
usar `clamp()` com piso e teto em `rem`, para respeitar zoom e preferências do
usuário (WCAG 1.4.4).

```css
:root {
  --fs-kicker: clamp(0.75rem, calc(14 * var(--jf-u)), 0.875rem);
  --fs-body: clamp(1rem, calc(18 * var(--jf-u)), 1.125rem);
  --fs-h3: clamp(1.25rem, calc(24 * var(--jf-u)), 1.5rem);
  --fs-h2: clamp(1.75rem, calc(38 * var(--jf-u)), 2.375rem);
  --fs-h1: clamp(2.25rem, calc(64 * var(--jf-u)), 4rem);
  --fs-proof: clamp(
    2.5rem,
    calc(72 * var(--jf-u)),
    4.5rem
  ); /* números grandes */
}
```

Famílias: `--jf-font-display` (Archivo) em pesos altos para títulos e números;
`--jf-font-body` (IBM Plex Sans) no corpo; `--jf-font-mono` (IBM Plex Mono) em
kickers e números técnicos.

Fontes com `preload` da principal, `font-display: swap`, self-hosted (evita
request a terceiros e melhora LCP).

---

## 7. Layout, grid e responsividade

**Mobile-first.** Escrever o CSS base para o mobile e progredir com media
queries `min-width`. A maior parte do tráfego é celular, e o site atual tem bugs
justamente no mobile.

**Container.** Todo o conteúdo vive dentro de um container centralizado com
largura máxima de 1280px. Fundos de ambiente (o `--jf-red-wash` da seção Problema
e o `--jf-anchor` do rodapé) sangram de borda a borda; só o conteúdo respeita o
container.

```css
.container {
  width: 100%;
  max-width: var(--jf-maxw); /* 1280px */
  margin-inline: auto;
  padding-inline: clamp(1rem, calc(24 * var(--jf-u)), 2rem);
}
```

**Breakpoints de referência** (min-width): `sm` 480px, `md` 768px, `lg` 1024px,
`xl` 1280px. Grids de cards (Serviços, Casos, Problema) usam
`repeat(auto-fit, minmax(...))` para refluir sozinhos, sem media query por
quantidade de colunas.

**Alvos de toque** com no mínimo 44x44px. O botão flutuante de WhatsApp fica na
zona de alcance do polegar no mobile.

---

## 8. Direção de arte (industrial claro, anti-genérico)

O tema é **claro**, conforme decisão com o cliente: fundo em off-white, vermelho
aplicado por intenção e um grafite quente só na âncora do rodapé. Nada de preto
como fundo. A linguagem industrial de segurança contra incêndio permanece, mas
em chave clara.

**Fazer:**

- **Ritmo por alternância clara**: seções alternam entre `--jf-bg` e `--jf-bg-alt`,
  com cards em `--jf-surface`. O único fundo colorido é o `--jf-red-wash` da seção
  Problema, que sinaliza urgência sem escurecer.
- **Rodapé como fecho**: único bloco em `--jf-anchor` com texto off-white, dando
  peso ao fim da rolagem.
- **Cortes diagonais** leves entre seções (via `clip-path: polygon(...)`, ~2–4vw
  de offset) para evocar movimento, sem custo de JS. Discretos no tema claro.
- **Cantos retos** ou raio mínimo em blocos estruturais; raio maior só em botões;
  pill no botão flutuante.
- **Fotos reais** de sistemas instalados (sprinkler, hidrante, central de alarme)
  e equipe em ação, bem enquadradas e com bom contraste sobre fundo claro.
- **Kicker mono**: rótulo curto em IBM Plex Mono, caixa alta, `letter-spacing`,
  em `--jf-red` (ou `--jf-red-deep` sobre o wash), acima de cada `<h2>`.
- **Números de prova grandes** (Archivo pesado) em `--jf-red`/`--jf-wine`, com
  rótulo mono embaixo.
- **Detalhe de faixa de segurança** (listras finas) via `repeating-linear-gradient`,
  usado com muita parcimônia como divisor ou detalhe de kicker. Não poluir.

**Evitar:**

- Preto ou cinza escuro como fundo de seção (o único cinza escuro é o rodapé).
- Vermelho como fundo dominante (é acento, exceto o wash da seção Problema).
- Tudo branco/corporativo genérico e stock de "aperto de mão" ou "reunião sorrindo".
- Foto de construção civil (erro do site atual).
- Sombras difusas grandes; a estética é mais seca e estrutural.

---

## 9. Componentes

Inventário e responsabilidade. Layout e copy detalhados em `SECTIONS.md`.

| Componente        | Papel                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `BaseLayout`      | `<head>`, meta, OG/Twitter, JSON-LD, fontes, slot                                          |
| `Header`          | Nav sticky por âncora (Serviços, Como funciona, Casos, Contato) + CTA + menu mobile        |
| `Hero`            | H1 único, subtítulo, CTA primário/secundário, fundo claro + foto                           |
| `TrustBar`        | Faixa de logos de clientes (grayscale, cor no hover)                                       |
| `Problem`         | 3 cards de dor sobre fundo `--jf-red-wash`                                                 |
| `Services`        | Grid de 6 cards de serviços                                                                |
| `HowItWorks`      | 5 etapas numeradas do processo                                                             |
| `WhyJfire`        | Grid de diferenciais + faixa de credenciais (selos)                                        |
| `Cases`           | Galeria de casos (foto, segmento, resultado, link de PDF) + lightbox                       |
| `Stats`           | Números de prova com contador                                                              |
| `Contact`         | Formulário que compõe WhatsApp + dados de contato + mapa da Gamboa                         |
| `Footer`          | Resumo, navegação, redes, contato, dados legais                                            |
| `WhatsAppFab`     | Botão flutuante fixo                                                                       |
| `WhatsAppLink`    | Helper que monta o deep link a partir de uma chave                                         |
| `CredentialBadge` | Selo real de credenciamento (`astro:assets`), de `src/data/credentials.ts`                 |
| `PlaceholderLogo` | Retângulo neutro com nome em texto + `data-pending`, para logos de cliente ainda pendentes |
| `SectionKicker`   | Rótulo mono acima dos títulos                                                              |

---

## 10. Sistema de CTAs (WhatsApp)

Toda conversão é um deep link `https://wa.me/<numero>?text=<mensagem>`. As
mensagens ficam centralizadas em `site.ts` e são consumidas pelo `WhatsAppLink`
por **chave**, que faz `encodeURIComponent` no build. Não pré-encodar na fonte.

Número oficial: `5521982006834`. Formatação: WhatsApp aceita `*negrito*`, emoji
e quebra de linha (`\n` → `%0A`). O marcador em negrito no início identifica a
origem da conversão sem precisar de analytics.

Tabela de mensagens (texto legível; o helper encoda):

| Chave      | Origem          | Mensagem                                                                                   |
| ---------- | --------------- | ------------------------------------------------------------------------------------------ |
| `float`    | Botão flutuante | `Olá! Vim pelo site e quero falar com a JFire. *[Botão fixo]*`                             |
| `header`   | Header          | `Olá! Vim pelo site e quero falar com a JFire. *[Header]*`                                 |
| `hero`     | Hero (primário) | `Olá! Vim pelo site e quero solicitar um orçamento de sistema contra incêndio. *[Hero]*`   |
| `services` | Seção Serviços  | `Olá! Vim pelo site e quero entender qual sistema minha edificação precisa. *[Serviços]*`  |
| `how`      | Como funciona   | `Olá! Vim pelo site e quero solicitar um diagnóstico. *[Como funciona]*`                   |
| `case`     | Card de caso    | `Olá! Vim pelo site, vi o caso da {Cliente} e quero um projeto assim. *[Caso: {Cliente}]*` |
| `contact`  | Seção Contato   | `Olá! Vim pelo site e quero solicitar um orçamento. *[Contato]*`                           |

A chave `case` é dinâmica: o `WhatsAppLink` interpola `{Cliente}` a partir de
`cases.ts`. O CTA secundário do Hero ("Ver como funciona") é âncora para
`#como-funciona`, não gera link de WhatsApp.

**Formulário de contato (compõe o deep link).** O `Contact` não envia para
servidor. No submit, uma ilha vanilla monta a mensagem a partir dos campos e abre
o `wa.me` com a chave `contact`:

```
Olá! Vim pelo site e quero solicitar um orçamento. *[Contato]*
Nome: {nome}
Tipo: {Empresa|Condomínio}
Mensagem: {mensagem}
```

Isso mantém o site estático, sem backend, e a conversão dentro do WhatsApp. O
campo Tipo faz a autoclassificação (empresa ou condomínio) sem exigir seção
separada.

`WhatsAppLink` renderiza `<a target="_blank" rel="noopener">` com `aria-label`
descritivo.

---

## 11. SEO / GEO

**Meta (em `BaseLayout`):** `<title>` e `meta description` com intenção local;
`lang="pt-BR"`; `canonical` a partir de `SITE_URL`; `theme-color` (`--jf-red`);
favicon.

Sugestão de title: `Sistemas contra incêndio para condomínios e empresas | JFIRE — Rio de Janeiro`.

**Open Graph + Twitter Card:** título, descrição, `og:image` (`public/og/`),
`og:url` derivado de `SITE_URL`. Faz o link chegar bonito no WhatsApp.

**JSON-LD (scripts no `<head>`):**

- `LocalBusiness`: nome, endereço (Rua Pedro Ernesto, 83, Gamboa, RJ), telefone,
  `areaServed` = Rio de Janeiro, `geo`, `url`, `sameAs` (redes).
- `Service`: um item por serviço de `src/data/services.ts`.

**Migração de URLs (301).** As páginas antigas `/empresas/` e `/condominios/`
serão aposentadas. Como o GitHub Pages não faz 301 de servidor, publicar
stubs em `public/empresas/index.html` e `public/condominios/index.html` com
`<link rel="canonical">` para a home e redirect (meta refresh + fallback JS) para
`#casos`, preservando SEO e links indexados. Se houver Cloudflare ou CDN na
frente do domínio, trocar por 301 real.

**GEO (busca generativa/LLMs):** o JSON-LD rico e o texto em linguagem natural
são os vetores. Reforçar, de forma natural no copy, localização (Rio de Janeiro),
público (condomínios e empresas) e serviços, para casar com buscas
conversacionais.

Nota: a versão anterior deste doc usava uma seção de FAQ + `FAQPage` JSON-LD como
principal reforço de GEO. A estrutura atual do `SECTIONS.md` não tem FAQ, então o
GEO passa a se apoiar em `LocalBusiness` + `Service` + copy. Recomenda-se
reavaliar a inclusão de uma FAQ enxuta numa v1.1 pelo ganho de GEO (ver seção 15).

**Infra:** `@astrojs/sitemap` gera o sitemap; `public/robots.txt` referencia o
sitemap e libera indexação.

---

## 12. Performance (orçamento)

Metas: Lighthouse 100/100/100/100 (mínimo aceitável 95), **LCP < 2s**, **CLS ~0**,
zero JS de framework no cliente.

Táticas:

- HTML estático; CSS crítico inline no `<head>` do `BaseLayout`.
- Imagens via `astro:assets` em WebP/AVIF, com `width`/`height` explícitos para
  não gerar layout shift. `loading="lazy"` fora da dobra; `fetchpriority="high"`
  na imagem do Hero. A galeria de casos é o ponto crítico: `srcset` + lazy em tudo.
- Fontes self-hosted, `preload` da principal, `font-display: swap`.
- Ícones do Lucide (https://lucide.dev/icons/) inlinados como SVG no build (via
  `astro-icon` com o set lucide, ou SVG por componente). Sem runtime de ícone no
  cliente. Ícones de marca (WhatsApp, Facebook, Instagram) não existem mais no
  Lucide: usar `simple-icons` ou SVG inline.
- Diagonais e detalhes via CSS (`clip-path`, `linear-gradient`), não imagem.
- Ilhas de JS mínimas e isoladas (ver seção 2), hidratadas com `client:visible`
  ou `client:idle`.

---

## 13. Acessibilidade

Requisito, não extra:

- Contraste mínimo AA (combinações já validadas na seção 5).
- Foco visível em todos os interativos (`:focus-visible` com contorno claro).
- Navegação completa por teclado; ordem de tabulação lógica.
- Navegação por âncora move o foco para o heading da seção de destino
  (`tabindex="-1"`), não só a rolagem.
- `alt` descritivo em toda imagem de conteúdo; `alt=""` em decorativas.
- `aria-label` no botão flutuante de WhatsApp e no toggle do menu mobile.
- Lightbox da galeria com foco preso enquanto aberto e restaurado ao ponto de
  origem ao fechar (corrige o bug mobile de voltar ao topo).
- Formulário de contato com `<label>` associado a cada campo e mensagens de erro
  claras.
- Respeitar `prefers-reduced-motion` em animações de entrada e nos contadores.

---

## 14. Deploy e CI

`.github/workflows/deploy.yml`: build do Astro e publicação no GitHub Pages,
disparado no merge para `main`. Sem deploy manual. Rodar verificação (build +
checagem básica) no PR antes do merge.

Fluxo: branch de feature → PR → revisão → merge → deploy automático.
Conventional Commits em todos os commits.

---

## 15. Pendências (rastreável)

Itens que dependem do cliente. Até chegarem, usar placeholder + marcador
`data-pending` / `<!-- TODO(cliente): ... -->`. **Nunca** gerar ativo de marca
de terceiro.

| Pendência                     | Onde impacta                | Situação                                                                                            |
| ----------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------- |
| Logo da JFIRE                 | `Header`, `Footer`          | Resolvido: `src/assets/brand/`                                                                      |
| Selos de credenciamento       | `WhyJfire`, `Footer`        | Resolvido: CBMERJ, CAU/BR, CREA-RJ em `src/assets/credentials/`                                     |
| Fotos dos casos               | `Cases`                     | Resolvido: recebidas, em `src/assets/cases/`                                                        |
| WhatsApp oficial              | `site.ts`, todos os CTAs    | Resolvido: `5521982006834`                                                                          |
| Números de prova              | `Stats`                     | Parcial: 789+ Sucesso em projetos, 1.000+ Orçamentos. 3º slot em aberto (8+ anos ou nota do Google) |
| Texto de cada caso            | `Cases` / `cases.ts`        | Pendente: linha de resultado por cliente (segmento + o que foi feito)                               |
| PDFs de projeto               | `public/projetos/`, `Cases` | Pendente: um PDF por cliente                                                                        |
| Foto real do Hero             | `Hero`                      | Pendente: stock/placeholder `data-pending` até chegar                                               |
| Fundos de seção faltantes     | seções com fundo            | Parcial: alguns fornecidos; resto de banco de imagens ou placeholder                                |
| Logos dos clientes (TrustBar) | `TrustBar`                  | Pendente: `PlaceholderLogo` até receber                                                             |
| Imagem OG                     | `public/og/`                | Pendente: placeholder                                                                               |
| URLs de redes sociais         | `Footer`, `sameAs`          | Facebook e Instagram conhecidos; validar                                                            |

---

## 16. Fora de escopo (v1)

Blog, formulário com backend/e-mail, múltiplas páginas, integração de analytics
avançada, multi-idioma e uma seção de FAQ. Podem entrar em versões futuras (a FAQ
é forte candidata a v1.1 pelo ganho de GEO).
