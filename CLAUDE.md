# CLAUDE.md — Contexto do projeto JFIRE One-Page

> Este arquivo é lido automaticamente pelo Claude Code. Ele define as regras
> inegociáveis do projeto. Leia por completo antes de qualquer tarefa.
> A estrutura, o copy e o layout de cada seção estão em `docs/SECTIONS.md`
> (fonte única de estrutura). A arquitetura está em `docs/DESIGN_DOC.md`.
> **Sempre consulte os dois antes de codar. Onde houver divergência, o
> `SECTIONS.md` vence.**

## O que é este projeto

Landing page única (one-page) da **JFIRE**, empresa de instalação e manutenção
de sistemas de combate a incêndio para **condomínios e empresas** no Rio de
Janeiro. Substitui um site WordPress antigo. Objetivo: **conversão via WhatsApp**
e **máxima performance/SEO/GEO**. Público: síndicos e gestores prediais.

Estética: **clara, industrial, segurança contra incêndio**. Fundo claro, vermelho
por acento, grafite só no rodapé, nada de preto como fundo. NÃO pode parecer site
de agência ou template corporativo genérico. Ver direção de arte no DESIGN_DOC.

## Stack

- **Astro** (saída 100% estática, zero JS de framework).
- **GitHub Pages** como host, deploy só via GitHub Actions no merge para `main`.
- Sem backend. Conversão por **deep link de WhatsApp**. O formulário de contato
  compõe o link a partir dos campos; não envia para servidor.
- CSS puro com os **design tokens** do projeto (`src/styles/tokens.css`).

## Regras de ouro (não violar)

1. **Não invente ativos de marca de terceiros.** Logos de clientes (Vianense,
   Paineiras, etc.) NÃO devem ser gerados nem simulados: use `PlaceholderLogo`
   com o nome em texto e `data-pending`. Os selos de credenciamento (CBMERJ,
   CAU/BR, CREA-RJ) e o logo da JFIRE já foram recebidos e são renderizados a
   partir de `src/assets/` via os componentes reais.
2. **Não invente conteúdo do cliente.** Onde não houver dado real (texto de cada
   caso, 3º número de prova, fundos faltantes), use os placeholders documentados
   e marque com `<!-- TODO(cliente): ... -->`. Ver PENDÊNCIAS no DESIGN_DOC.
3. **JS só em ilha, e só onde indispensável.** Permitido, em ilha vanilla mínima:
   toggle do menu mobile, lightbox da galeria de casos (com foco preso e
   restaurado), animação dos contadores da seção Números, e composição do deep
   link de WhatsApp no formulário de contato. Scroll suave é CSS
   (`scroll-behavior`). Qualquer outro JS ou dependência client-side exige
   justificativa no PR.
4. **Não adicione dependências** sem necessidade. Prefira recursos nativos do
   Astro (`astro:assets`, `@astrojs/sitemap`). `astro-icon` com o set do Lucide é
   permitido para inlinar ícones no build. Ao precisar de algo novo, pare e
   registre o motivo no PR.
5. **Nada de deploy manual.** Nunca faça push na branch de publicação. O deploy
   é feito só pela Action no merge. Fluxo: branch → PR → merge → deploy.
6. **Tokens sempre.** Nenhum hex, tamanho de fonte, espaçamento ou raio "mágico"
   no CSS. Tudo vem das variáveis `--jf-*`. Se faltar um token, proponha no PR.
7. **Domínio em um lugar só.** URLs absolutas vêm de `SITE_URL` em
   `src/config/site.ts`. Nunca escreva o domínio hardcoded em outro arquivo.
8. **Acessibilidade é requisito, não extra.** AA de contraste, foco visível,
   navegação por teclado, foco movido para o heading na navegação por âncora,
   `alt` em toda imagem, `aria-label` no botão flutuante e no menu mobile,
   lightbox com foco restaurado ao fechar, `<label>` em todo campo do formulário.
9. **Tipografia não pode ser `vw` puro.** Use os helpers `clamp()` com piso em
   `rem` (WCAG 1.4.4). `--jf-u` é só para layout/espaçamento.
10. **HTML semântico.** Um único `<h1>` (o do Hero), hierarquia de headings
    correta, `<header> <main> <section> <footer>`, cada `<section>` com
    `aria-labelledby`.
11. **Layout mobile-first, container 1280.** CSS base para mobile, media queries
    `min-width`. Conteúdo dentro de um container de `max-width: var(--jf-maxw)`
    (1280px) centralizado; só fundos de ambiente sangram de borda a borda.

## Convenções

- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`...).
- **Branches:** `feat/<slug>`, `fix/<slug>`. PR para `main`. Sem commit direto em `main`.
- **CSS:** BEM para classes customizadas; um bloco de estilo por componente.
- **Arquivos:** componentes em PascalCase (`Hero.astro`), dados em `src/data/*.ts`.
- **Idioma:** conteúdo/copy em pt-BR, sem travessão; identificadores de código em inglês.

## Comandos

```bash
npm install       # instalar
npm run dev       # desenvolvimento
npm run build     # build estático em ./dist
npm run preview   # servir o build localmente
```

## Definition of Done (checar antes de abrir PR)

- [ ] `npm run build` sem erros nem warnings.
- [ ] Lighthouse ≥ 95 em Performance, Acessibilidade, Best Practices e SEO
      (alvo 100). LCP < 2s, CLS ~0.
- [ ] Nenhum token/hex mágico; tudo via `--jf-*`.
- [ ] Nenhuma URL hardcoded fora de `site.ts`.
- [ ] Container em `max-width: var(--jf-maxw)`; layout valida em mobile, tablet e desktop.
- [ ] Todo placeholder de marca/dado tem `data-pending` / `TODO(cliente)`.
- [ ] JSON-LD válido (LocalBusiness, Service).
- [ ] Navegação por teclado e foco visível; foco movido na âncora; `alt`/`aria-label` presentes.
- [ ] Galeria de casos com lazy-load e lightbox acessível.
- [ ] Sem JS além das ilhas documentadas (menu, lightbox, contadores, form→WhatsApp).

## Pendências do cliente (usar placeholder até chegar)

Texto de cada caso · 3º número de prova · PDFs de projeto por cliente · foto real
do Hero · fundos de seção faltantes · logos dos clientes da barra de confiança ·
imagem OG · validação das URLs de redes sociais. Já recebidos: logo da JFIRE,
selos de credenciamento, fotos dos casos, número oficial de WhatsApp
(`5521982006834`) e os números 789+ (projetos) e 1.000+ (orçamentos). Lista
completa e rastreável no DESIGN_DOC › Pendências.

## Quando estiver em dúvida

Siga a decisão documentada nos docs. Se a decisão não existir, **crie um
placeholder + TODO e siga em frente**, não bloqueie a tarefa. A única exceção é
ativo de marca de terceiro: nesse caso o placeholder neutro é a resposta final,
nunca gere o ativo real.
