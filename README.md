# JFIRE — One-Page

Landing page única da **JFIRE**, empresa de instalação e manutenção de sistemas
de combate a incêndio para condomínios e empresas no Rio de Janeiro. Substitui o
antigo site WordPress por uma página estática, rápida e otimizada para conversão
via WhatsApp e para SEO/GEO local.

## Cenário

Esta versão tem como objetivo substituir o site anterior (WordPress), concentrando tudo em uma página só, com foco em:

- **Conversão por WhatsApp** (sem formulário, sem backend), com mensagem
  pré-formatada por CTA para identificar a origem do contato.
- **Performance máxima** (HTML estático, zero JS por padrão).
- **SEO/GEO local** completo (meta tags, Open Graph, JSON-LD, sitemap).
- **Acessibilidade** AA.
- **Estética industrial** de segurança contra incêndio, ancorada no Design
  System da marca.

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

# jfirerj
