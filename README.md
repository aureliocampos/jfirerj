# JFIRE — One-Page

Landing page única da **JFIRE**, empresa de instalação e manutenção de sistemas
de combate a incêndio para condomínios e empresas no Rio de Janeiro. Substitui o
antigo site WordPress por uma página estática, rápida e otimizada para conversão
via WhatsApp e para SEO/GEO local.

## Cenário

O site anterior (WordPress) saiu do ar e tinha problemas de performance,
conteúdo e manutenção. Esta versão concentra tudo em uma página só, com foco em:

- **Conversão por WhatsApp** (sem formulário, sem backend), com mensagem
  pré-formatada por CTA para identificar a origem do contato.
- **Performance máxima** (HTML estático, zero JS por padrão).
- **SEO/GEO local** completo (meta tags, Open Graph, JSON-LD, sitemap).
- **Acessibilidade** AA.
- **Estética industrial** de segurança contra incêndio, ancorada no Design
  System da marca. Nada de cara de template corporativo genérico.

## Stack

- [Astro](https://astro.build) — saída 100% estática.
- Hospedagem em **GitHub Pages** (deploy via GitHub Actions no merge para `main`).
- CSS puro sobre os design tokens `--jf-*`.

## Começando

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera ./dist
npm run preview    # serve o build localmente
```

## Documentação

Antes de desenvolver, leia nesta ordem:

1. **[CLAUDE.md](./CLAUDE.md)** — regras de execução inegociáveis (guardrails,
   convenções, Definition of Done). É o primeiro arquivo a ler.
2. **[docs/DESIGN_DOC.md](./docs/DESIGN_DOC.md)** — arquitetura e engenharia:
   stack, estrutura de pastas, configuração de domínio, tokens, tipografia
   fluida, direção de arte, sistema de CTAs, SEO/GEO, performance, acessibilidade
   e deploy.
3. **[docs/SECTIONS.md](./docs/SECTIONS.md)** — especificação de cada seção:
   layout, copy pronta em pt-BR, imagens sinalizadas e CTAs.

## Configuração de domínio

Todo o comportamento de URL é controlado em `src/config/site.ts`
(`SITE_URL`, `BASE_PATH`). Enquanto o domínio final não é reapontado, o site roda
no GitHub Pages. A migração para `jfirerj.com.br` é uma troca de variável e a
adição de um `CNAME`, sem mexer no restante do código. Detalhes no DESIGN_DOC ›
Configuração de domínio.

## Convenções

- Commits no padrão **Conventional Commits**.
- Trabalho em branch → PR → merge em `main`. Sem commit direto em `main`, sem
  deploy manual.
- CSS com BEM para classes customizadas; cores, espaçamentos, tipografia e raios
  sempre via tokens `--jf-*`.

## Pendências do cliente

Alguns ativos ainda não foram entregues (logos das empresas, selos de
credenciamento, foto do Hero, números reais, respostas do FAQ, telefones). Até
lá, o projeto usa placeholders neutros marcados com `data-pending` /
`TODO(cliente)`. Lista completa e rastreável no DESIGN_DOC › Pendências.

Ativos de marca de terceiros (logos de clientes e selos oficiais) **não são
gerados nem simulados** — entram como placeholder até o cliente enviar os
arquivos reais.
# jfirerj
