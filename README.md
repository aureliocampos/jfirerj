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
- Hospedagem no **cPanel** do cliente, deploy automático via GitHub Actions
  (build no runner + envio do `dist/` por FTPS a cada push em `main`).
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
(`SITE_URL`, `BASE_PATH`), com default para `https://jfirerj.com.br` na raiz
(`/`), já que o site é publicado diretamente no `public_html` do cPanel do
cliente.

## Deploy

Deploy automático via GitHub Actions a cada push em `main`
(`.github/workflows/deploy.yml`): a build roda inteira no runner (Node
completo) e só o `dist/` é enviado por FTPS ao cPanel — dispensa Node no
servidor. Requer os secrets `FTP_SERVER`, `FTP_USERNAME` e `FTP_PASSWORD`
cadastrados no repositório, apontando para uma conta FTP dedicada (restrita ao
diretório de destino, não o usuário master do cPanel).

## Convenções

- Commits no padrão **Conventional Commits**.
- Trabalho em branch → PR → merge em `main`. Sem commit direto em `main`, sem
  deploy manual.
- CSS com BEM para classes customizadas; cores, espaçamentos, tipografia e raios
  sempre via tokens `--jf-*`.

# jfirerj
