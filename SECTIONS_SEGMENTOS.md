# Guia de implementação — Seções "Para Condomínios" e "Para Empresas"

Documento de escopo restrito. Cobre apenas as duas seções segmentadas por público.
Segue as convenções de `CLAUDE.md`, `DESIGN_DOC.md` e `SECTIONS.md` (tokens
`--jf-*`, container 1280 mobile-first, ícones Lucide, deep link de WhatsApp por
chave). Copy em pt-BR, sem travessão.

Fonte do conteúdo: `docs/guiatecnicojfirerj.pdf` (guia técnico de adequação e
regularização), que mapeia problema, impacto e solução por público.

---

## 1. Encaixe na página

As duas seções entram como um bloco pareado, logo após a seção **Problema** e
antes de **Serviços**:

```
... Problema  →  Para Condomínios  →  Para Empresas  →  Serviços ...
```

Papel: a seção Problema estabelece o risco de conformidade em nível macro; estas
duas fazem o leitor se reconhecer no próprio caso e ver as dores específicas dele.
É o momento de autoclassificação da OnePage, sem virar página ou item de menu.

Ajuste recomendado: deixar a seção Problema mais enxuta (as três dores macro de
conformidade) para não repetir o detalhamento que agora vive aqui.

Ordem em `src/pages/index.astro`:

```
Header, Hero, TrustBar, Problem,
SegmentCondos, SegmentCompanies,
Services, HowItWorks, WhyJfire, Cases, Stats, Contact, Footer, WhatsAppFab
```

---

## 2. Componente

Um único componente reutilizável, renderizado duas vezes a partir de dados. Evita
duplicação e mantem o padrão "dados em `src/data/*.ts`".

`src/components/SegmentSection.astro` recebe um objeto `Segment` e monta a seção.
`src/data/segments.ts` guarda os dois objetos.

```ts
// src/data/segments.ts
export interface Pain {
  icon: string;   // nome do ícone Lucide
  title: string;
  body: string;
}

export interface Segment {
  id: string;                    // 'condominios' | 'empresas' (vira o id da <section> e âncora)
  kicker: string;
  title: string;
  intro: string;
  pains: Pain[];
  image: { alt: string };        // asset via astro:assets; src resolvido no componente
  imageSide: 'left' | 'right';   // alterna entre as duas seções
  bg: 'bg' | 'bg-alt';           // --jf-bg ou --jf-bg-alt, para ritmo
  ctaKey: string;                // chave do WhatsAppLink
  ctaLabel: string;
}
```

O `SegmentSection` consome `WhatsAppLink` pela `ctaKey` e `astro:assets` para a
imagem de destaque. Sem JS.

---

## 3. Conteúdo

### 3.1 Para Condomínios

- `id`: `condominios`
- `kicker`: `Para condomínios`
- `title`: O que trava a segurança e onera o caixa do seu prédio
- `intro`: O síndico responde pela segurança dos moradores e pela conservação do prédio. A JFire resolve a exigência do Corpo de Bombeiros e, no mesmo serviço, os problemas de água e infiltração que pesam no orçamento do condomínio.
- `imageSide`: `right`
- `bg`: `bg`
- `ctaKey`: `segment_condos`
- `ctaLabel`: `Falar sobre meu condomínio`

Dores (`pains`):

| icon (Lucide) | title | body |
|---|---|---|
| `droplet` | Rede de hidrante vazando e sem pressão | Tubulação antiga de aço carbono que vaza, derruba a pressão da rede de incêndio e infiltra na garagem e no subsolo. Trocamos por tubulação nova de alta durabilidade e estanqueidade. |
| `gauge` | Sistema de pressurização parado | Sem manutenção, a casa de máquinas não entrega água pressurizada aos hidrantes na hora do incêndio. Readequamos a casa de máquinas, automatizamos o painel e trocamos quadro elétrico, válvulas e registros. |
| `cylinder` | Reservatórios e caixas d'água deteriorados | Vazamentos invisíveis que comprometem o suprimento mínimo de segurança e desperdiçam água. Recuperamos a estrutura interna e impermeabilizamos por completo. |
| `zap` | Para-raios (SPDA) sem aterramento em dia | Vulnerabilidade a raios, queima de portões e elevadores, e risco de recusa do seguro predial. Fazemos medição ôhmica, troca de aterramento e sinalização aérea. |
| `sliders-horizontal` | Colunas de água sem autonomia de registro | Impossibilita a manutenção setorial e incomoda os moradores, sobretudo nas coberturas. Instalamos caixas superiores e registros de esfera novos. |

Imagem de destaque: foto real de casa de máquinas de incêndio, hidrante de
recalque ou reservatório recuperado.
`alt` sugerido: "Casa de máquinas de incêndio de condomínio, com bombas de pressurização".

### 3.2 Para Empresas

- `id`: `empresas`
- `kicker`: `Para empresas e comércios`
- `title`: Conformidade e liberação de alvará sem parar sua operação
- `intro`: Empresas e redes comerciais precisam de segurança que cumpra a norma e o prazo, com a menor interrupção possível. A JFire entrega a solução completa, da instalação ao Certificado de Aprovação, para você abrir e operar dentro da lei.
- `imageSide`: `left`
- `bg`: `bg-alt`
- `ctaKey`: `segment_companies`
- `ctaLabel`: `Solicitar avaliação da minha empresa`

Dores (`pains`):

| icon (Lucide) | title | body |
|---|---|---|
| `shower-head` | Sprinkler exigido para abrir ou operar a loja | Sem o chuveiro automático dimensionado, não há inauguração nem funcionamento regular, e o risco é de interdição. Instalamos a rede de sprinklers com bicos termo-sensíveis, no prazo da obra. |
| `siren` | Alarme disparando sem motivo | Evacuações desnecessárias, pânico de clientes e hóspedes e perda de credibilidade. Diagnosticamos e trocamos os detectores com falha. |
| `warehouse` | Hidrantes sem pressão em áreas grandes | Em galpões e centros de distribuição, a despressurização impede combater o fogo em estoques massivos. Readequamos e automatizamos todo o sistema de pressurização. |
| `heart-pulse` | Operação crítica que não pode parar | Hospitais e serviços essenciais exigem segurança contínua, sem janela de interrupção. Fazemos manutenção preventiva de alta frequência, teste de bombas e reestruturação do recalque. |
| `clipboard-check` | Documentação e rota de fuga irregulares | Sem extintores, sinalização fotoluminescente e iluminação de emergência, a vistoria reprova e trava o Certificado de Aprovação. Instalamos tudo para liberar o alvará. |

Imagem de destaque: foto real de rede de sprinkler em loja, galpão ou instalação
comercial em operação.
`alt` sugerido: "Rede de sprinklers instalada no teto de um galpão comercial".

Nota sobre ícones: usar o nome exato do Lucide (https://lucide.dev/icons/). Onde
o nome não existir, escolher o mais próximo (ex.: `cylinder` para reservatório).

---

## 4. Layout

Duas colunas: texto e lista de dores de um lado, imagem de destaque do outro. O
lado da imagem alterna (`imageSide`) entre as duas seções para criar ritmo.

- Grid `minmax(0, 1.35fr) minmax(0, 1fr)` no desktop, coluna da imagem no lado
  definido por `imageSide` (usar `order` no CSS).
- Mobile-first: uma coluna. A imagem de destaque vai para o topo do bloco, antes
  do texto, em qualquer `imageSide`.
- Tudo dentro do `.container` (`max-width: var(--jf-maxw)`, 1280px).
- Lista de dores como `<ul>`; cada item com um chip de ícone à esquerda e
  título + descrição à direita.
- CTA ao fim da coluna de texto.

Estrutura semântica:

```html
<section id="condominios" aria-labelledby="condominios-title" class="segment">
  <div class="container segment__grid">
    <div class="segment__text">
      <p class="kicker">Para condomínios</p>
      <h2 id="condominios-title">O que trava a segurança e onera o caixa do seu prédio</h2>
      <p class="segment__intro">...</p>
      <ul class="segment__pains">
        <li>
          <span class="segment__icon" aria-hidden="true"><!-- svg lucide --></span>
          <div>
            <p class="segment__pain-title">Rede de hidrante vazando e sem pressão</p>
            <p class="segment__pain-body">...</p>
          </div>
        </li>
        <!-- demais dores -->
      </ul>
      <!-- WhatsAppLink key="segment_condos" -->
    </div>
    <figure class="segment__media">
      <!-- astro:assets Image -->
    </figure>
  </div>
</section>
```

---

## 5. Cores

Tema claro, tokens `--jf-*`.

| Elemento | Token |
|---|---|
| Fundo da seção | `--jf-bg` (Condomínios) / `--jf-bg-alt` (Empresas) |
| Kicker | `--jf-red-deep` |
| Título | `--jf-ink` |
| Intro | `--jf-ink-2` |
| Chip do ícone (fundo) | `--jf-red-wash` |
| Ícone | `--jf-red` |
| Título da dor | `--jf-ink` |
| Descrição da dor | `--jf-ink-2` |
| Moldura/fundo da imagem | `--jf-bg-alt` + `--jf-border` |
| CTA | fundo `--jf-red`, texto branco, hover `--jf-red-deep` |

Nenhum hex mágico; tudo via variável.

---

## 6. WhatsApp

Adicionar duas chaves em `src/config/site.ts`, consumidas pelo `WhatsAppLink`.
Não pré-encodar; o helper faz `encodeURIComponent` no build.

| Chave | Mensagem (texto legível) |
|---|---|
| `segment_condos` | `Olá! Vim pelo site e quero falar sobre o meu condomínio. *[Para Condomínios]*` |
| `segment_companies` | `Olá! Vim pelo site e quero solicitar uma avaliação da minha empresa. *[Para Empresas]*` |

O marcador em negrito identifica a origem da conversão por seção.

---

## 7. Imagens

- Uma imagem de destaque por seção, via `astro:assets` (`<Image />`).
- WebP/AVIF, `width`/`height` explícitos para não gerar CLS.
- `loading="lazy"` e `decoding="async"` (as duas seções ficam abaixo da dobra).
- `alt` descritivo (sugestões na seção 3). Nunca `alt` vazio aqui, é imagem de
  conteúdo.
- Enquanto a foto real não chegar, usar placeholder de `src/assets/placeholders/`
  com marcador `data-pending` e `<!-- TODO(cliente): foto real -->`.

---

## 8. Acessibilidade

- Cada `<section>` com `id` e `aria-labelledby` apontando para o `<h2>`.
- Títulos como `<h2>` (as seções ficam abaixo do `<h1>` do Hero); não usar `<h1>`.
- Lista de dores em `<ul>`/`<li>`. Ícones decorativos com `aria-hidden="true"`.
- CTA com `aria-label` descritivo (ex.: "Falar sobre meu condomínio no WhatsApp").
- Contraste AA já garantido pelos tokens (kicker em `--jf-red-deep`, texto em
  `--jf-ink`/`--jf-ink-2`).
- Respeitar `prefers-reduced-motion` se houver animação de entrada.

---

## 9. Definition of Done (destas seções)

- [ ] `SegmentSection.astro` monta as duas seções a partir de `src/data/segments.ts`.
- [ ] Ordem correta: após Problema, antes de Serviços. Âncoras `#condominios` e `#empresas`.
- [ ] Layout de duas colunas com `imageSide` alternado; empilha no mobile com imagem no topo.
- [ ] Conteúdo dentro do `.container` (1280); mobile-first validado.
- [ ] Chaves `segment_condos` e `segment_companies` em `site.ts`, CTAs funcionando.
- [ ] Ícones Lucide inlinados no build; nenhum runtime de ícone.
- [ ] Imagens via `astro:assets`, lazy, com `alt`; placeholder + `data-pending` onde faltar foto.
- [ ] Tokens `--jf-*` em tudo; nenhum hex mágico.
- [ ] `<section>` com `aria-labelledby`, dores em `<ul>`, ícones `aria-hidden`.
- [ ] Sem JS.

---

## 10. Pendências e cuidado com nomes

- Fotos reais de destaque das duas seções (casa de máquinas / sprinkler). Até lá, placeholder.
- Os condomínios citados no guia técnico (Viriato Correa, Marco Angelo, Lord,
  Plaza Etoile, Levy Gasparian, Open, Charlie Chapli) servem de referência real
  por trás de cada dor, mas condomínio é sensível quanto a exposição pública.
  **Confirmar com o cliente quais nomes podem ser publicados antes de citá-los.**
  Não exibir nome de condomínio sem confirmação. Os casos de empresa (Drogarias
  Tamoio, Localiza, Ibis, Vianense, Hospital Vital, Rio Pax, Elbo, Basile) têm
  risco menor por já serem clientes assumidos no site.
