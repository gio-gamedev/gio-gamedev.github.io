# gio-gamedev.github.io

Portfólio de Game QA de Giovanni S. Mariano, bilíngue (PT/EN), em React + Vite, publicado no GitHub Pages.

**Site:** https://gio-gamedev.github.io

## Rodar localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento em http://localhost:5173
npm run build     # checa tipos e gera a pasta dist/
npm run preview   # serve o build de produção localmente
```

## Editar o conteúdo

Todo o texto fica em `src/content/`, separado dos componentes. Cada texto traduzível tem as duas versões: `{ en: '...', pt: '...' }`.

| Arquivo | O que tem |
|---|---|
| `src/content/profile.ts` | Nome, links, números do topo, Sobre, experiência, expertise, prêmio, formação, idiomas |
| `src/content/projects.ts` | Os 60 projetos do índice e os destaques |
| `src/content/workSamples.ts` | Bug report, plano de teste e checklist de compliance |
| `src/content/ui.ts` | Rótulos da interface: menu, botões, títulos de seção |

### Adicionar um projeto

Em `projects.ts`, acrescente uma linha na categoria certa:

```ts
p('Nome do Projeto', 'Roblox'),
```

Plataformas e tipos de teste vêm do padrão da categoria; para mudar, passe `platforms` ou `testing`. Para colocar o projeto em **destaque**:

1. adicione `selected: true`, `focus` (EN/PT) e `link`;
2. coloque a imagem em `public/covers/` e informe o nome em `cover` (sem extensão, assume `.webp`; ex.: `cover: 'skate-tycoon'` ou `cover: 'skate-tycoon.jpg'`);
3. inclua o nome na lista `featuredOrder`.

Sem `cover`, o card mostra uma arte de placeholder com o nome do projeto.

### Trocar o currículo

Substitua `public/resume.pdf` pelo novo arquivo, mantendo o mesmo nome.

## Deploy

Cada push na branch `main` dispara o workflow `.github/workflows/deploy.yml`, que roda o build e publica a pasta `dist/` no GitHub Pages. Configuração única no repositório: **Settings → Pages → Source: GitHub Actions**.

Para usar um domínio próprio no futuro, crie `public/CNAME` com o domínio e configure o DNS conforme a documentação do GitHub Pages.
