# gio-gamedev.github.io

Portfólio de Game QA de Giovanni S. Mariano, bilíngue, em React + Vite, publicado no GitHub Pages.

- **EN:** https://gio-gamedev.github.io
- **PT:** https://gio-gamedev.github.io/pt/

## Rodar localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento em http://localhost:5173 (e /pt/)
npm run build     # checa tipos, gera o bundle e pré-renderiza as páginas em dist/
npm run preview   # serve o build de produção localmente
```

### Como o build funciona

1. `tsc` checa os tipos.
2. `vite build` gera o bundle do navegador.
3. `vite build --ssr src/entry-server.tsx` gera uma versão do app que roda no Node.
4. `scripts/prerender.mjs` renderiza cada idioma em HTML estático (`dist/index.html` para EN e `dist/pt/index.html` para PT). O script também gera `sitemap.xml` e grava no `<head>` o título, a descrição, as tags Open Graph, os links `hreflang` e os dados estruturados (JSON-LD).

O navegador recebe a página já com o conteúdo, e o React só "hidrata" a interação. É isso que permite ao Google e aos previews de link lerem tudo, inclusive a versão em português.

## Editar o conteúdo

Todo o texto fica em `src/content/`, separado dos componentes. Cada texto traduzível tem as duas versões: `{ en: '...', pt: '...' }`.

| Arquivo | O que tem |
|---|---|
| `src/content/profile.ts` | Nome, links, disponibilidade, "Como eu conduzo QA", experiência, depoimentos, expertise, prêmio, formação e idiomas |
| `src/content/projects.ts` | Os 60 projetos, os destaques e os mini cases |
| `src/content/workSamples.ts` | Bug report, plano de teste e checklist de compliance |
| `src/content/ui.ts` | Rótulos da interface, meta tags e títulos de seção |
| `src/content/stats.ts` | Anos de experiência, calculados a partir da data do build |

### Adicionar um projeto

Em `projects.ts`, acrescente uma linha na categoria certa:

```ts
p('Nome do Projeto', 'Roblox'),
```

Plataformas e tipos de teste vêm do padrão da categoria; para mudar, passe `platforms` ou `testing`. Para colocar o projeto em **destaque**:

1. adicione `selected: true`, `focus` (EN/PT), `link` e, se quiser, `caseStudy: { did, highlight }`;
2. coloque a imagem em `public/covers/` e informe o nome em `cover` (sem extensão, assume `.webp`);
3. inclua o nome na lista `featuredOrder`.

Sem `cover`, o card mostra uma arte de placeholder com o nome do projeto.

### Depoimentos

Acrescente itens em `testimonials` (`profile.ts`), sempre com a permissão da pessoa. A seção só aparece quando a lista tem pelo menos um item.

### Experiência

Em cada cargo, `bullets` aparecem sempre (os pontos mais fortes) e `more` fica recolhido em "Ver todas as responsabilidades".

### Trocar o currículo

Substitua `public/resume.pdf` pelo novo arquivo, mantendo o mesmo nome.

## Deploy e manutenção

- **Deploy:** cada push na `main` dispara `.github/workflows/deploy.yml`, que roda o build e publica `dist/` no GitHub Pages. Configuração única no repositório: **Settings → Pages → Source: GitHub Actions**.
- **Rebuild mensal:** o mesmo workflow roda no dia 1 de cada mês, para atualizar os anos de experiência e a data do sitemap.
- **Links:** `.github/workflows/links.yml` confere mensalmente os links de lojas e perfis e falha se algum quebrar.
- **Domínio próprio (opcional):** crie `public/CNAME` com o domínio, configure o DNS e troque `SITE_URL` em `src/seo.ts`, além das URLs em `public/robots.txt`.
