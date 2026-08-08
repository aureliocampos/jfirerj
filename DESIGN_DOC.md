# Design Doc — JFIRE One-Page

Documento de arquitetura e engenharia. O conteúdo e o layout de cada seção
estão em `SECTIONS.md`. As regras de execução resumidas estão no `CLAUDE.md` da
raiz.

---

## 1. Objetivo e não-objetivos

**Objetivo.** Uma landing page única, estática e de altíssima performance para a
JFIRE, focada em conversão via WhatsApp e forte presença em SEO/GEO local (Rio
de Janeiro), substituindo o antigo site WordPress.

**Não-objetivos.**
- Sem CMS, sem backend, sem banco de dados.
- Sem formulário com envio por e-mail (conversão é 100% WhatsApp).
- Sem seção de projetos em PDF (era complexidade do WP; fora do escopo desta v1).
- Sem blog nem múltiplas páginas nesta versão.

---

## 2. Stack e hospedagem

- **Astro**, saída estática, zero JS por padrão.
- **GitHub Pages** como host. Deploy exclusivamente via GitHub Actions no merge
  para `main`. Sem deploy manual.
- CSS puro ancorado nos design tokens `--jf-*`.
- Otimização de imagens com `astro:assets`. Sitemap com `@astrojs/sitemap`.

Racional: Astro entrega o HTML estático que o GitHub Pages serve, mantém zero JS
(bom para LCP/CLS), e ainda dá componentização, otimização de imagem e geração
de sitemap sem esforço. Ganha-se performance sem abrir mão de organização.

---

## 3. Configuração de domínio (ponto único)

Enquanto o `jfirerj.com.br` não é reapontado, o site roda no GitHub Pages. Para
trocar o domínio em um único lugar:

`src/config/site.ts` centraliza:

```ts
export const SITE_URL   = import.meta.env.SITE_URL   ?? "https://<usuario>.github.io";
export const BASE_PATH  = import.meta.env.BASE_PATH  ?? "/jfire-onepage/"; // repo project page
export const WHATSAPP_NUMBER = "5521969641666"; // TODO(cliente): confirmar nº oficial
```

`astro.config.mjs` consome esses valores em `site` e `base`. Todo canonical,
Open Graph URL, JSON-LD e sitemap derivam de `SITE_URL` + `BASE_PATH`. Nenhum
outro arquivo pode ter URL absoluta hardcoded.

**Migração para o domínio final (quando o cliente liberar):**
1. Definir env `SITE_URL=https://jfirerj.com.br` e `BASE_PATH=/`.
2. Adicionar `public/CNAME` com `jfirerj.com.br`.
3. Configurar o DNS e o custom domain no GitHub Pages.

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
│  └─ og/og-default.jpg            # imagem de compartilhamento (placeholder)
├─ src/
│  ├─ config/
│  │  └─ site.ts                   # SITE_URL, BASE_PATH, WHATSAPP_NUMBER, dados do negócio, mensagens de CTA
│  ├─ styles/
│  │  ├─ tokens.css                # tokens --jf-* (colar do Design System)
│  │  └─ base.css                  # reset, escala tipográfica clamp, utilitários, texturas
│  ├─ layouts/
│  │  └─ BaseLayout.astro          # <head>, meta, fontes, JSON-LD, slots
│  ├─ components/
│  │  ├─ Header.astro
│  │  ├─ Hero.astro
│  │  ├─ CredentialBar.astro
│  │  ├─ Services.astro
│  │  ├─ Segments.astro            # Condomínio vs Empresa
│  │  ├─ WhyJfire.astro
│  │  ├─ ClientsLogos.astro
│  │  ├─ Faq.astro
│  │  ├─ FinalCta.astro
│  │  ├─ Footer.astro
│  │  ├─ WhatsAppFab.astro         # botão flutuante
│  │  ├─ WhatsAppLink.astro        # helper: recebe uma chave e monta o deep link
│  │  ├─ PlaceholderLogo.astro     # placeholder neutro para logo/selo
│  │  └─ SectionKicker.astro       # rótulo mono acima dos títulos
│  ├─ data/
│  │  ├─ services.ts               # cards de serviços
│  │  ├─ segments.ts               # bullets de condomínio e empresa
│  │  ├─ faq.ts                    # perguntas e respostas (rascunho, revisar)
│  │  ├─ clients.ts                # nomes das empresas (placeholder de logo)
│  │  └─ credentials.ts            # nomes dos selos (placeholder)
│  ├─ assets/
│  │  └─ placeholders/             # imagens de mockup/stock sinalizadas
│  └─ pages/
│     └─ index.astro               # monta as seções na ordem final
```

---

## 5. Design tokens

Colar o bloco de tokens fornecido em `src/styles/tokens.css` sem alterar os
valores. Consumo obrigatório via variáveis; proibido hex/tamanho mágico.

Mapa rápido de uso:

| Papel | Token |
|---|---|
| Primária (botões, destaques) | `--jf-fire-500` |
| Accent (hover, detalhes) | `--jf-ember-500` |
| Highlight (micro-detalhe) | `--jf-flame-500` |
| Fundo claro de seção | `--jf-bg` / `--jf-surface` |
| Fundo escuro (âncora) | `--jf-ink` / `--jf-graphite-900` |
| Texto | `--jf-text` / `--jf-text-mut` |
| Sobre marca (texto em fundo colorido) | `--jf-on-brand` |

---

## 6. Tipografia fluida (regra crítica)

O Design System usa `--jf-u = 100vw / base` para escala proporcional. Isso vale
para **layout e espaçamento**. Para **tipografia**, usar `clamp()` com piso e
teto em `rem`, para respeitar zoom e preferências do usuário (WCAG 1.4.4).

Definir em `base.css` uma escala fluida:

```css
:root {
  --fs-kicker: clamp(.75rem, calc(14 * var(--jf-u)), .875rem);
  --fs-body:   clamp(1rem,  calc(18 * var(--jf-u)), 1.125rem);
  --fs-h3:     clamp(1.25rem, calc(24 * var(--jf-u)), 1.5rem);
  --fs-h2:     clamp(1.75rem, calc(38 * var(--jf-u)), 2.375rem);
  --fs-h1:     clamp(2.25rem, calc(64 * var(--jf-u)), 4rem);
  --fs-proof:  clamp(2.5rem,  calc(72 * var(--jf-u)), 4.5rem); /* números grandes */
}
```

Famílias: `--jf-font-display` (Archivo) em pesos altos para títulos e números;
`--jf-font-body` (IBM Plex Sans) no corpo; `--jf-font-mono` (IBM Plex Mono) em
rótulos/kickers e números técnicos.

Fontes com `preload` da fonte principal e `font-display: swap`. Preferir
self-host das fontes (evita request a terceiros e melhora LCP).

---

## 7. Direção de arte (industrial, anti-genérico)

Traduz a linguagem da referência industrial para a paleta de fogo do DS. O que
caracteriza e o que evitar:

**Fazer:**
- **Alternância de fundo** entre seções escuras-âncora (`--jf-ink`/`graphite-900`)
  e seções claras (`--jf-bg`/`surface`), criando ritmo. Escuras: Hero, faixa de
  prova/números, CTA final, rodapé. Claras: Serviços, Porque JFIRE, Logos.
- **Cortes diagonais** entre seções (via `clip-path: polygon(...)`), leves
  (~2–4vw de offset), evocando movimento industrial. Sem custo de JS.
- **Cantos retos** ou raio mínimo (`--jf-radius-sm`) em blocos estruturais.
  Raio maior só em botões; `--jf-radius-pill` no botão flutuante.
- **Fotos reais** de sistemas instalados (sprinkler, hidrante, central de
  alarme) e equipe em ação, com tratamento escuro e bom contraste.
- **Kicker mono**: rótulo curto em IBM Plex Mono, caixa alta, `letter-spacing`,
  em `--jf-ember-500`/`--jf-flame-500`, acima de cada `<h2>`.
- **Números de prova grandes** (Archivo pesado) com rótulo mono embaixo.
- **Textura de faixa de segurança** (listras amarelo/preto) via
  `repeating-linear-gradient`, usada com parcimônia como divisor fino ou detalhe
  de borda no kicker. Não poluir.
- **Grafismo de blueprint** opcional: SVG inline de linhas/tubulação a baixa
  opacidade como fundo de seção escura. Leve e performático.

**Evitar:**
- Vermelho como fundo dominante (usar como acento, não como base).
- Tudo branco/corporativo genérico.
- Stock de "aperto de mão", "reunião sorrindo", ilustração flat genérica.
- Sombras difusas grandes em excesso; a estética é mais seca/estrutural.

---

## 8. Componentes

Inventário e responsabilidade. Layout e copy detalhados em `SECTIONS.md`.

| Componente | Papel |
|---|---|
| `BaseLayout` | `<head>`, meta, OG/Twitter, JSON-LD, fontes, slot |
| `Header` | Nav sticky por âncora + CTA "Fale conosco" + menu mobile |
| `Hero` | H1, descrição, CTA primário/secundário, fundo escuro + foto |
| `CredentialBar` | Faixa fina com selos (placeholder) |
| `Services` | Grid de cards de serviços gerais |
| `Segments` | Duas colunas: Condomínio e Empresa, com bullets e CTA |
| `WhyJfire` | Grid de diferenciais |
| `ClientsLogos` | Grid de logos (placeholder neutro) + número de prova |
| `Faq` | Acordeão nativo `<details>/<summary>` |
| `FinalCta` | Bloco de fechamento com CTA por segmento |
| `Footer` | Mapa, contato, redes, selos, dados legais |
| `WhatsAppFab` | Botão flutuante fixo |
| `WhatsAppLink` | Helper que monta o deep link a partir de uma chave |
| `CredentialBadge` | Selo real de credenciamento (`astro:assets`), a partir de `src/data/credentials.ts` |
| `PlaceholderLogo` | Retângulo neutro com nome em texto + `data-pending` (ainda usado por `ClientsLogos`) |
| `SectionKicker` | Rótulo mono acima dos títulos |

---

## 9. Sistema de CTAs (WhatsApp)

Toda conversão é um deep link `https://wa.me/<numero>?text=<mensagem>`. As
mensagens ficam centralizadas em `site.ts` e são consumidas pelo `WhatsAppLink`
por **chave**, que faz `encodeURIComponent` no build. Não pré-encodar na fonte.

Formatação: WhatsApp aceita `*negrito*`, `_itálico_`, emoji e quebra de linha
(`\n`, que vira `%0A` ao encodar). O marcador em negrito no início identifica a
origem da conversão sem precisar de analytics.

Tabela de mensagens (texto legível; o helper encoda):

| Chave | Origem | Mensagem |
|---|---|---|
| `float` | Botão flutuante | `Olá! Vim pelo site da JFIRE e gostaria de mais informações.` |
| `header` | Header | `*Contato pelo site* 👋\nOlá, JFIRE! Vim pelo site e gostaria de falar com vocês.` |
| `hero_specialist` | Hero (primário) | `*Falar com especialista* 👋\nOlá, JFIRE! Vim pelo site e quero falar com um especialista sobre proteção contra incêndio.` |
| `services` | Seção Serviços | `*Avaliação de imóvel* 🧯\nOlá, JFIRE! Vim pela seção de serviços e gostaria de uma avaliação do meu imóvel.` |
| `segment_condo` | Coluna Condomínio | `*Orçamento · Condomínio* 🏢\nOlá, JFIRE! Vim pelo site e gostaria de um orçamento para o meu condomínio.` |
| `segment_company` | Coluna Empresa | `*Orçamento · Empresa* 🏭\nOlá, JFIRE! Vim pelo site e gostaria de um orçamento para a minha empresa.` |
| `faq` | FAQ | `*Dúvida pelo site* ❓\nOlá, JFIRE! Não encontrei minha dúvida no site e gostaria de ajuda.` |
| `footer` | Rodapé | `*Contato pelo site* 👋\nOlá, JFIRE! Vim pelo rodapé do site.` |

O CTA secundário do Hero ("Solicitar orçamento") e o bloco `FinalCta` reutilizam
`segment_condo` / `segment_company` (o usuário escolhe o segmento). Se no futuro
quiser distinguir a origem "final", criar chaves `final_condo`/`final_company`.

`WhatsAppLink` deve renderizar `<a target="_blank" rel="noopener">` com
`aria-label` descritivo. Camada opcional de evento GA4 por clique fica para
depois; não incluir nesta v1.

---

## 10. SEO / GEO

**Meta (em `BaseLayout`):** `<title>` e `meta description` com intenção local;
`lang="pt-BR"`; `canonical` a partir de `SITE_URL`; `theme-color`
(`--jf-fire-500`); favicon.

Sugestão de title: `Sistemas contra incêndio para condomínios e empresas | JFIRE — Rio de Janeiro`.

**Open Graph + Twitter Card:** título, descrição, `og:image` (`public/og/`),
`og:url` derivado de `SITE_URL`. Isso faz o link "chegar bonito" no WhatsApp.

**JSON-LD (scripts no `<head>`):**
- `LocalBusiness`: nome, endereço (Rua Pedro Ernesto, 83, Gamboa, RJ), telefone,
  `areaServed` = Rio de Janeiro, `geo`, `url`, `sameAs` (redes). Campos sem dado
  → TODO(cliente).
- `FAQPage`: gerado a partir de `src/data/faq.ts` (mesma fonte da seção visual).
- `Service`: um item por serviço de `src/data/services.ts`.

**GEO (busca generativa/LLMs):** a FAQ em linguagem natural e o JSON-LD rico são
os principais vetores. Reforçar no texto, de forma natural, localização
(Rio de Janeiro), público (condomínios e empresas) e serviços, para casar com
buscas conversacionais ("empresa de sprinkler para condomínio no Rio").

**Infra:** `@astrojs/sitemap` gera o sitemap; `public/robots.txt` referencia o
sitemap e libera indexação.

---

## 11. Performance (orçamento)

Metas: Lighthouse 100/100/100/100 (mínimo aceitável 95), **LCP < 2s**, **CLS ~0**,
zero JS de framework no cliente.

Táticas:
- HTML estático; CSS crítico inline no `<head>` do `BaseLayout`.
- Imagens via `astro:assets` em WebP/AVIF, com `width`/`height` explícitos para
  não gerar layout shift. `loading="lazy"` fora da dobra; `fetchpriority="high"`
  na imagem do Hero.
- Fontes self-hosted, `preload` da principal, `font-display: swap`.
- Sem bibliotecas de ícone pesadas: usar SVG inline (sprite ou por componente).
- Diagonais e texturas via CSS (`clip-path`, `linear-gradient`), não imagem.

---

## 12. Acessibilidade

Requisito, não extra:
- Contraste mínimo AA (validar combinações fogo/branco e texto sobre fundo escuro).
- Foco visível em todos os interativos (`:focus-visible` com contorno claro).
- Navegação completa por teclado; ordem de tabulação lógica.
- `alt` descritivo em toda imagem de conteúdo; `alt=""` em decorativas.
- `aria-label` no botão flutuante de WhatsApp e no toggle do menu mobile.
- FAQ com `<details>/<summary>` nativo (acessível e sem JS).
- Respeitar `prefers-reduced-motion` em qualquer animação de entrada.

---

## 13. Deploy e CI

`.github/workflows/deploy.yml`: build do Astro e publicação no GitHub Pages,
disparado no merge para `main`. Sem deploy manual. Sugerido rodar um passo de
verificação (build + checagem básica) no PR antes do merge.

Fluxo de trabalho: branch de feature → PR → revisão → merge → deploy automático.
Conventional Commits em todos os commits.

---

## 14. Pendências (rastreável)

Itens que dependem do cliente. Até chegarem, usar placeholder + marcador
`data-pending` / `<!-- TODO(cliente): ... -->`. **Nunca** gerar ativo de marca
de terceiro.

| Pendência | Onde impacta | Placeholder até lá |
|---|---|---|
| Logos das empresas | `ClientsLogos` | `PlaceholderLogo` com nome em texto |
| ~~3 selos de credenciamento~~ | `CredentialBar`, `Footer` | **Resolvido:** CBMERJ, CAU/BR e CREA-RJ recebidos do cliente; ativos reais em `src/assets/credentials/`, renderizados via `CredentialBadge` |
| ~~Logo da JFIRE~~ | `Header`, `Footer` | **Resolvido:** logo recebido do cliente em `src/assets/brand/jfire-logo.jpg` |
| Foto real do Hero | `Hero` | Stock/mock em `assets/placeholders` + fundo escuro |
| Números reais (imóveis/anos/tempo) | `Hero`, `WhyJfire`, `ClientsLogos` | Valor placeholder visível + TODO |
| Respostas oficiais do FAQ | `Faq`, JSON-LD | Rascunho marcado "revisar com cliente" |
| Telefones e WhatsApp oficial | `site.ts`, `Header`, `Footer` | `WHATSAPP_NUMBER` provisório + TODO |
| Imagem OG de compartilhamento | `public/og/` | Placeholder |
| Redes sociais (URLs) | `Footer`, JSON-LD `sameAs` | Facebook e Instagram conhecidos; validar |

---

## 15. Fora de escopo (v1)

Seção de projetos em PDF, blog, formulário com backend, múltiplas páginas,
integração de analytics avançada, multi-idioma. Podem entrar em versões futuras.
