# JFire — SECTIONS.md

Referência de build da OnePage do site jfirerj.com.br. Este documento consolida a arquitetura de seções, o copy em pt-BR, os tokens de design e as diretrizes de execução. Serve de fonte única para o Claude Code implementar.

Regra de escrita do copy: sem travessão. Use vírgula, ponto ou dois-pontos.

---

## 1. Objetivo e stack

Transformar o site atual (4 páginas em WordPress + Elementor: Home, Empresas, Condomínios, Contato) numa OnePage estática que conduz o usuário por um fluxo único: o que é, por que me afeta, como resolvem, prova de que resolvem, falar agora. O objetivo de conversão é único: gerar contato via WhatsApp.

- Stack: Astro (saída estática, HTML semântico).
- Hospedagem: GitHub Pages.
- Meta de performance: Lighthouse 100.
- Fluxo de deploy: PR, sem commit direto em produção.

---

## 2. Diretrizes de execução

### Performance (Astro)

- Saída 100% estática. JavaScript só em ilhas isoladas, onde for indispensável: toggle do menu mobile, lightbox da galeria de casos, e envio do formulário.
- Imagens via `astro:assets` (`<Image />`) com AVIF e WebP, `width`/`height` sempre definidos para evitar CLS.
- Imagem do Hero com prioridade de carregamento (`loading="eager"`, `fetchpriority="high"`). Todo o resto abaixo da dobra com `loading="lazy"` e `decoding="async"`.
- Fontes self-hosted, `font-display: swap`, com preload da fonte de display.
- CSS crítico inline, sem recursos que bloqueiem a renderização.

### Acessibilidade (meta WCAG 2.1 AA)

- Um único `<h1>` na página (o título do Hero). Hierarquia de headings coerente do topo ao rodapé.
- Skip link para o conteúdo. Landmarks corretos: `<header>`, `<main>`, `<footer>`, e cada `<section>` com `aria-labelledby` apontando para seu heading.
- Navegação por âncora com scroll suave que também move o foco para o heading da seção de destino (`tabindex="-1"` no alvo), para não quebrar teclado e leitor de tela.
- Botão fixo de WhatsApp é um `<a href="wa.me/...">` real, com `aria-label`, abrindo a conversa direto, sem tela de instalação do app.
- Lightbox da galeria com foco preso enquanto aberto e foco restaurado ao ponto de origem ao fechar. Isso corrige o bug mobile em que a página volta ao topo ao fechar a imagem.
- Respeitar `prefers-reduced-motion` em qualquer animação de scroll ou transição.
- Contrastes já validados na seção de tokens.

### SEO e migração de URLs

- As URLs antigas `/empresas/` e `/condominios/` serão aposentadas. Como GitHub Pages não faz 301 de servidor, criar páginas-stub nesses caminhos com `<link rel="canonical">` para a home e redirect (meta refresh + fallback em JS) para as âncoras correspondentes (`#casos`), preservando o SEO e os links já indexados.
- JSON-LD `LocalBusiness` com nome, endereço (Gamboa), telefones, horário e geolocalização.
- Meta title, meta description e OpenGraph próprios.

### Ícones

- Biblioteca oficial: Lucide (https://lucide.dev/icons/). Usar os nomes indicados em cada seção.
- Atenção: o Lucide não distribui mais logos de marca. Para os ícones sociais e do WhatsApp (Facebook, Instagram, WhatsApp), usar `simple-icons` ou SVG inline. Não tentar puxar esses do Lucide.

### Assets

- Imagens dos casos de sucesso: todas fornecidas pelo cliente. Usar as reais.
- Imagens de plano de fundo (Hero, seções): há algumas fornecidas pelo cliente. Onde faltar, usar banco de imagens condizente (bombeiro, hidrante, sprinkler, projeto de incêndio) ou placeholder marcado com `data-pending`. Não usar foto de construção civil.
- Logo final: pendente. Usar placeholder com `data-pending`.
- Selos de credenciamento (CREA, CAU/BR, CBMERJ): pendentes. Placeholder com `data-pending`.

---

## 3. Tokens de design

### Cores (tema claro)

Site claro, com vermelho aplicado por intenção e um grafite quente só na âncora do rodapé. Nada de preto como fundo.

```css
:root {
  /* Vermelhos */
  --jf-red: #c43932; /* primário: fundo de CTA, kicker, ícones de destaque */
  --jf-red-deep: #9e2a24; /* hover de CTA, links, texto vermelho pequeno sobre fundo claro */
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
}
```

Regras de aplicação de cor:

- Fundo predominante em `--jf-bg` e `--jf-surface`. Seções alternam com `--jf-bg-alt` para criar ritmo sem depender de linhas.
- Vermelho concentrado em: kicker, CTA, ícone de destaque, numeral. Não pintar blocos inteiros de vermelho, exceto o fundo tênue da seção Problema (`--jf-red-wash`).
- Texto vermelho pequeno ou link: sempre `--jf-red-deep`, nunca `--jf-red-bright`.
- Rodapé é o único bloco em `--jf-anchor`, com texto off-white.

### Contrastes validados (AA)

- Branco sobre `--jf-red`: 5,3:1.
- `--jf-ink` sobre `--jf-bg`: ~14:1.
- Off-white sobre `--jf-anchor`: 8,4:1.
- `--jf-red-bright` reservado a ícone e realce grande, pois não atinge AA em texto pequeno.

### Tipografia

- Display e headings: Archivo.
- Corpo: IBM Plex Sans.
- Kicker: IBM Plex Mono, em caixa alta, com `letter-spacing` leve.
- Escala de tipo com `clamp()` e piso em `rem` (nunca `vw` puro em tipo, por causa da WCAG 1.4.4).
- Unidade fluida de layout `--jf-u` (`100vw / base`) reservada só a espaçamento e layout, nunca a tipo.

---

## 4. WhatsApp

Número oficial: 21 98200-6834 → `5521982006834`.
Segundo número, 21 96964-1666, é telefone, exibido no contato e rodapé, mas não é o destino dos CTAs.

Base do link: `https://wa.me/5521982006834?text=<mensagem-encodada>`

Cada CTA leva um marcador de origem em negrito (`*[...]*`, que o WhatsApp renderiza em negrito) para rastrear de onde veio a conversão.

| CTA                | Chave               | Mensagem                                                                                   |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------ |
| Hero               | `[Hero]`            | Olá! Vim pelo site e quero solicitar um orçamento de sistema contra incêndio. `*[Hero]*`   |
| Serviços           | `[Serviços]`        | Olá! Vim pelo site e quero entender qual sistema minha edificação precisa. `*[Serviços]*`  |
| Como funciona      | `[Como funciona]`   | Olá! Vim pelo site e quero solicitar um diagnóstico. `*[Como funciona]*`                   |
| Caso (por cliente) | `[Caso: {Cliente}]` | Olá! Vim pelo site, vi o caso da {Cliente} e quero um projeto assim. `*[Caso: {Cliente}]*` |
| Contato            | `[Contato]`         | Olá! Vim pelo site e quero solicitar um orçamento. `*[Contato]*`                           |
| Botão fixo         | `[Botão fixo]`      | Olá! Vim pelo site e quero falar com a JFire. `*[Botão fixo]*`                             |

Exemplo de href já encodado (Hero):

```
https://wa.me/5521982006834?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20solicitar%20um%20or%C3%A7amento%20de%20sistema%20contra%20inc%C3%AAndio.%20*%5BHero%5D*
```

As demais seguem o mesmo padrão de encoding.

---

## 5. Estrutura da página

Ordem do topo ao rodapé. Cada âncora alimenta a navegação fixa.

1. Hero — `#topo`
2. Barra de confiança (logos de clientes)
3. Problema — `#problema`
4. Serviços — `#servicos`
5. Como funciona — `#como-funciona`
6. Por que a JFire — `#por-que`
7. Casos de sucesso — `#casos`
8. Números
9. Contato — `#contato`
10. Rodapé

Elementos globais: navegação fixa com âncoras (Serviços, Como funciona, Casos, Contato) e botão fixo de WhatsApp no canto inferior direito.

---

## Seção 1 — Hero (`#topo`)

Função: matar a ambiguidade em três segundos, liderando pela consequência (operar seguro e em conformidade) e entregar a prova de autoridade numa frase.

- Kicker: `Projeto · Instalação · Regularização`
- H1: Segurança contra incêndio para sua empresa ou condomínio operar seguro e em conformidade
- Subtítulo: A JFire projeta, instala e regulariza sprinkler, alarme, hidrantes e para-raios. Equipe credenciada pelo CREA, CAU e Corpo de Bombeiros, com mais de 8 anos protegendo edificações no Rio.
- CTA primário: `Solicitar orçamento` → WhatsApp `[Hero]`
- CTA secundário: `Ver como funciona` → âncora `#como-funciona`

Layout: fundo `--jf-bg`, kicker em `--jf-red`, H1 em `--jf-ink`, subtítulo em `--jf-ink-2`. CTA primário com fundo `--jf-red` e texto branco (hover `--jf-red-deep`). CTA secundário em contorno `--jf-ink`. Este H1 é o único `<h1>` da página.

Imagem: bombeiro ou instalação real, com prioridade de carregamento. Se não houver asset, placeholder `data-pending`.

Ícones: `arrow-down` (CTA secundário). WhatsApp via simple-icons ou SVG inline.

---

## Seção 2 — Barra de confiança

Função: prova social imediata logo abaixo do Hero, para segurar o usuário na rolagem.

- Legenda: Empresas e condomínios que confiam na JFire

Layout: faixa com os logos reais dos clientes, em grayscale por padrão e cor no hover, para uniformizar o visual. Fundo `--jf-bg` ou `--jf-bg-alt`. Padronizar o formato dos logos (hoje Vianense e Rio Pax estão retangulares e os demais quadrados).

Observação: estes logos hoje aparecem rotulados como "Nossos parceiros" no site atual. São clientes, e o rótulo correto é o desta seção.

---

## Seção 3 — Problema (`#problema`)

Função: criar a urgência que justifica o orçamento. É a seção que não existe hoje e a que mais converte.

- Kicker: `Por que isso importa`
- H2: Estar fora de conformidade custa caro, e a responsabilidade é sua
- Abertura: No Rio de Janeiro, toda edificação comercial e todo condomínio precisam de sistemas de combate a incêndio aprovados e do AVCB em dia para funcionar. Quando isso falha, quem responde é o gestor ou o síndico.

Três cards de dor, nesta ordem (risco humano, consequência legal, financeiro):

1. Risco à vida e ao patrimônio. Um sistema mal dimensionado ou sem manutenção não protege ninguém na hora do incêndio. O prejuízo vai de danos estruturais à perda total.
2. Multa e interdição. Sem AVCB válido, a edificação fica sujeita a autuação, multa e interdição. Na prática, é parar de operar até regularizar.
3. Seguro negado. Seguradoras exigem sistemas dentro das normas. Fora da regra, a cobertura pode ser recusada quando você mais precisa dela.

- Linha-ponte (fecha a seção, puxa para a solução): A JFire cuida disso de ponta a ponta, do projeto técnico ao laudo de regularização, para sua edificação ficar segura e em conformidade.

Layout: fundo da seção em `--jf-red-wash` (único lugar onde o vermelho vira ambiente). Kicker em `--jf-red-deep` (melhor contraste em texto pequeno sobre o wash). Cards em `--jf-surface` com hairline `--jf-border`. Ícone de cada card em `--jf-red`, dentro de um quadrado com fundo `--jf-red-wash`.

Ícones Lucide: `flame` (card 1), `ban` (card 2), `shield-off` (card 3).

---

## Seção 4 — Serviços (`#servicos`)

Função: mostrar o ciclo completo, incluindo o que o site atual esconde (projeto, hidrante, manutenção).

- Kicker: `Serviços`
- H2: Soluções completas de combate a incêndio, do projeto à manutenção
- Abertura: Cobrimos o ciclo inteiro: projetamos, instalamos e mantemos os sistemas que sua edificação precisa para operar com segurança e passar na vistoria.

Cards (título + linha):

- Sistema de sprinkler. Chuveiros automáticos que detectam e combatem o fogo no início, antes de se espalhar.
- Alarme e detecção. Detectores e centrais que avisam a tempo de evacuar e agir.
- Hidrantes e mangueiras. Rede dimensionada para garantir vazão e pressão no combate ao fogo.
- Para-raios (SPDA). Proteção da edificação contra descargas atmosféricas, conforme norma.
- Projeto técnico e ART. Projeto assinado por responsável técnico, base para a aprovação no Corpo de Bombeiros.
- Manutenção e laudos. Preventiva, recarga e laudos que mantêm seu AVCB válido.

- CTA da seção: `Falar com um especialista` → WhatsApp `[Serviços]`

Layout: fundo alternado (`--jf-bg` ou `--jf-bg-alt`), grid de cards em `--jf-surface` com hairline. Ícone em `--jf-ink` por padrão, `--jf-red` quando em foco.

Ícones Lucide: `shower-head` (sprinkler), `siren` (alarme), `fire-extinguisher` (hidrantes), `zap` (para-raios), `drafting-compass` (projeto e ART), `wrench` (manutenção). Onde o nome exato não existir, usar o mais próximo do Lucide.

---

## Seção 5 — Como funciona (`#como-funciona`)

Função: reduzir o atrito de "como será trabalhar com eles". Substitui a seção que hoje está em lorem ipsum em inglês.

- Kicker: `Como funciona`
- H2: Do primeiro contato ao laudo, em cinco etapas

1. Diagnóstico e visita técnica. Avaliamos sua edificação e o que a norma exige para o seu caso.
2. Projeto e ART. Elaboramos o projeto técnico assinado, pronto para aprovação.
3. Instalação. Nossa equipe instala o sistema com material de alta performance.
4. Regularização e laudos. Cuidamos da documentação e do laudo para o AVCB.
5. Manutenção preventiva. Mantemos o sistema em dia para renovar a validade sem sustos.

- CTA da seção: `Solicitar diagnóstico` → WhatsApp `[Como funciona]`

Layout: passos numerados, com o numeral em `--jf-red` puxando o olho pela sequência. Fundo alternado.

Ícones Lucide (opcionais, além do numeral): `clipboard-list`, `pencil-ruler`, `hard-hat`, `badge-check`, `calendar-check`.

---

## Seção 6 — Por que a JFire (`#por-que`)

Função: autoridade. Funde os dois blocos que hoje aparecem separados (diferenciais e credenciamento), pois servem ao mesmo objetivo.

- Kicker: `Por que a JFire`
- H2: Responsabilidade técnica que você pode comprovar

Diferenciais:

- Experiência comprovada. Mais de 8 anos atuando em segurança contra incêndio no Rio.
- Atendimento sob medida. Soluções dimensionadas para a realidade de cada empresa ou condomínio.
- Equipe técnica especializada. Profissionais capacitados e em constante atualização.
- Compromisso com a qualidade. Material e equipamento de alta performance em cada instalação.

- Faixa de credenciais: Credenciada e reconhecida pelo CREA, CAU/BR e Corpo de Bombeiros, com serviços executados dentro das normas técnicas e exigências oficiais.

Layout: quatro diferenciais em grid, seguidos da faixa com os selos CREA-RJ, CAU/BR e CBMERJ. Selos como placeholder `data-pending` até chegarem os arquivos.

Ícones Lucide: `award` (experiência), `user-check` (atendimento), `graduation-cap` (equipe), `shield-check` (qualidade).

---

## Seção 7 — Casos de sucesso (`#casos`)

Função: o coração da consolidação. Substitui as páginas Empresas, Condomínios, Clientes e Projetos numa galeria única de casos.

- Kicker: `Casos de sucesso`
- H2: Empresas e condomínios que já confiam na JFire
- Abertura: De supermercados e hotéis a academias e condomínios, entregamos projetos que passam na vistoria e protegem quem está dentro.

Anatomia de cada card:

- Foto real da instalação (todas fornecidas pelo cliente).
- Nome do cliente.
- Tag de segmento (ex.: Varejo, Fitness, Hotelaria, Condomínio).
- Uma linha de resultado (segmento + o que foi feito). O texto de cada caso será selecionado depois, junto com o cliente.
- Link `Ver projeto (PDF)`, um PDF por cliente.
- CTA opcional por card: `Quero um projeto assim` → WhatsApp `[Caso: {Cliente}]`.

Ordem e nomes (conforme o PDF de ajustes, com grafias corrigidas e a duplicidade da Paineiras removida):

1. Supermercados Vianense Recreio
2. Bluefit
3. Paineiras Corcovado
4. Drogarias Tamoio
5. Supermercados Vianense Central
6. Mr. Cat
7. Hotel Ibis Posto Cinco
8. Localiza
9. Elbo
10. Rio Pax
11. Hospital Vital
12. Basile Advogados

Condomínios (mesma galeria, tag Condomínio): Sidon, Tampico, Match.

Layout: grid de cards em `--jf-surface` com hairline. Tag de segmento como badge em `--jf-red-wash` com texto `--jf-red-deep`. Link do PDF em `--jf-red-deep`. Galeria com lightbox acessível (foco preso e restaurado ao fechar).

Performance: a galeria é o ponto crítico de carregamento. Servir as imagens em AVIF/WebP com `srcset`, `width`/`height` definidos e `loading="lazy"` em tudo abaixo da dobra.

Ícones Lucide: `file-text` ou `file-down` (link do PDF).

---

## Seção 8 — Números

Função: solidez. Só entra com dado real.

- 789+ Sucesso em projetos
- 1.000+ Orçamentos
- Terceiro slot em aberto: usar `8+ Anos de atuação` ou a nota do Google, ou ficar só com os dois indicadores acima.

Layout: fundo `--jf-bg`, numerais grandes em `--jf-red` ou `--jf-wine`. Máximo impacto sem escurecer a página. Contadores animam só uma vez ao entrar na viewport, respeitando `prefers-reduced-motion`.

---

## Seção 9 — Contato (`#contato`)

Função: fechar num único objetivo de conversão.

- Kicker: `Contato`
- H2: Fale com um especialista e receba seu orçamento
- Subtítulo: Tire dúvidas, peça orientação ou solicite um orçamento. Atendimento por WhatsApp e e-mail, de segunda a sábado, das 08h às 20h.

Formulário: `Nome`, `Telefone / WhatsApp`, `Tipo (Empresa / Condomínio)`, `Mensagem`, botão `Enviar`. O campo Tipo faz o papel de autoclassificação sem fragmentar a página.

Contatos diretos:

- WhatsApp (oficial): 21 98200-6834
- Telefone: 21 96964-1666
- comercial@jfirerj.com.br
- Rua Pedro Ernesto, 83, Gamboa, RJ
- Seg a sáb, 08h às 20h

- CTA WhatsApp: `[Contato]`

Mapa: apontar para o endereço da Gamboa. Corrige o bug atual, em que o mapa exibe uma localização em Londres.

Ícones Lucide: `phone`, `mail`, `map-pin`, `clock`. WhatsApp via simple-icons ou SVG inline.

---

## Seção 10 — Rodapé

- Logo: placeholder `data-pending` até o arquivo final.
- Resumo: A JFire projeta, instala e regulariza sistemas de combate a incêndio para empresas e condomínios no Rio de Janeiro, com equipe credenciada e mais de 8 anos de atuação.
- Navegação: âncoras para Serviços, Como funciona, Casos e Contato.
- Redes: Facebook, Instagram e WhatsApp (substitui os ícones de Twitter e Youtube do site atual). Links corretos, ícones via simple-icons ou SVG inline.
- Contato: os dois telefones, e-mail, endereço da Gamboa e horário.
- Rodapé legal: © 2026 JFire.

Layout: fundo `--jf-anchor` com texto off-white. Ícones sociais em off-white, com hover em `--jf-red`.

---

## 6. Pendências

Materiais e definições que faltam para completar o build:

- Texto e seleção final de cada caso de sucesso (imagens já fornecidas).
- Arquivo final do logo.
- Selos de credenciamento (CREA, CAU/BR, CBMERJ).
- Terceiro indicador da seção Números (ou confirmação de ficar só com dois).
- Imagens de plano de fundo faltantes (Hero e seções), onde não houver asset do cliente.
