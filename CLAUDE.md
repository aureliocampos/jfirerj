# CLAUDE.md — Contexto do projeto JFIRE One-Page

> Este arquivo é lido automaticamente pelo Claude Code. Ele define as regras
> inegociáveis do projeto. Leia por completo antes de qualquer tarefa.
> Detalhes de arquitetura estão em `docs/DESIGN_DOC.md` e o conteúdo/layout de
> cada seção em `docs/SECTIONS.md`. **Sempre consulte os dois antes de codar.**

## O que é este projeto

Landing page única (one-page) da **JFIRE**, empresa de instalação e manutenção
de sistemas de combate a incêndio para **condomínios e empresas** no Rio de
Janeiro. Substitui um site WordPress antigo. Objetivo: **conversão via WhatsApp**
e **máxima performance/SEO/GEO**. Público: síndicos e gestores prediais.

Estética: **industrial / segurança contra incêndio**. NÃO pode parecer site de
agência ou template corporativo genérico. Ver direção de arte no DESIGN_DOC.

## Stack

- **Astro** (saída 100% estática, zero JS por padrão).
- **GitHub Pages** como host, deploy só via GitHub Actions no merge para `main`.
- Sem backend. Sem formulário. Conversão 100% por **deep link de WhatsApp**.
- CSS puro com os **design tokens** do projeto (`src/styles/tokens.css`).

## Regras de ouro (não violar)

1. **Não invente ativos de marca de terceiros.** Logos de clientes (Vianense,
   Paineiras, etc.) e selos de credenciamento (CBMERJ, CREA, 3º) NÃO devem ser
   gerados nem simulados. Use os componentes de placeholder neutro definidos no
   DESIGN_DOC, com o nome em texto e marcador `data-pending`.
2. **Não invente conteúdo do cliente.** Números (imóveis protegidos, anos),
   telefones, respostas de FAQ: onde não houver dado real, use os placeholders
   documentados e marque com `<!-- TODO(cliente): ... -->`. Ver seção PENDÊNCIAS.
3. **Zero JS por padrão.** Só é permitido JS vanilla mínimo para: toggle do menu
   mobile. Scroll suave deve ser CSS (`scroll-behavior`). Qualquer outro JS ou
   dependência client-side exige justificativa antes de adicionar.
4. **Não adicione dependências** sem necessidade. Prefira recursos nativos do
   Astro (`astro:assets`, `@astrojs/sitemap`). Ao precisar de algo novo, pare e
   registre o motivo no PR.
5. **Nada de deploy manual.** Nunca faça push na branch de publicação. O deploy
   é feito só pela Action no merge. Fluxo: branch → PR → merge → deploy.
6. **Tokens sempre.** Nenhum hex, tamanho de fonte, espaçamento ou raio "mágico"
   no CSS. Tudo vem das variáveis `--jf-*`. Se faltar um token, proponha no PR.
7. **Domínio em um lugar só.** URLs absolutas vêm de `SITE_URL` em
   `src/config/site.ts`. Nunca escreva o domínio hardcoded em outro arquivo.
8. **Acessibilidade é requisito, não extra.** AA de contraste, foco visível,
   navegação por teclado, `alt` em toda imagem, `aria-label` no botão flutuante
   e no menu mobile, FAQ com `<details>/<summary>` nativo.
9. **Tipografia não pode ser `vw` puro.** Use os helpers `clamp()` com piso em
   `rem` (WCAG 1.4.4). Ver DESIGN_DOC › Tipografia fluida. `--jf-u` é só para
   layout/espaçamento.
10. **HTML semântico.** Um único `<h1>`, hierarquia de headings correta,
    `<header> <main> <section> <footer>`.

## Convenções

- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`...).
- **Branches:** `feat/<slug>`, `fix/<slug>`. PR para `main`. Sem commit direto em `main`.
- **CSS:** BEM para classes customizadas; um bloco de estilo por componente.
- **Arquivos:** componentes em PascalCase (`Hero.astro`), dados em `src/data/*.ts`.
- **Idioma:** conteúdo/copy em pt-BR; identificadores de código em inglês.

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
- [ ] Todo placeholder de marca/dado tem marcador `data-pending` / `TODO(cliente)`.
- [ ] JSON-LD válido (LocalBusiness, FAQPage, Service).
- [ ] Navegação por teclado e foco visível funcionando; `alt`/`aria-label` presentes.
- [ ] Sem JS além do toggle do menu mobile.

## Pendências do cliente (usar placeholder até chegar)

Logos das empresas · 3 selos de credenciamento · foto real do Hero · números
reais (imóveis/anos/tempo de resposta) · respostas oficiais do FAQ · confirmação
dos telefones e do número oficial de WhatsApp. Lista completa e rastreável no
DESIGN_DOC › Pendências.

## Quando estiver em dúvida

Siga a decisão documentada nos docs. Se a decisão não existir, **crie um
placeholder + TODO e siga em frente** — não bloqueie a tarefa. A única exceção
é ativo de marca de terceiro: nesse caso o placeholder neutro é a resposta
final, nunca gere o ativo real.
