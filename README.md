# gio-gamedev.github.io

Portfólio de Game QA de Giovanni S. Mariano: bilíngue, com tema claro e escuro, em React + Vite, publicado no GitHub Pages.

- **EN:** https://gio-gamedev.github.io
- **PT:** https://gio-gamedev.github.io/pt/
- **Currículos:** `/cv/Giovanni-Mariano-Game-QA-EN.pdf` e `-PT.pdf`
- **Para IAs e ATS:** `/resume.json` (padrão JSON Resume) e `/llms.txt`

## Comandos

```bash
npm install
npm run dev            # desenvolvimento em http://localhost:5173 (e /pt/); mostra os rascunhos
npm run build          # tipos + bundle + pré-renderização + checagem de "sem verde"
npm run build:review   # build com os rascunhos visíveis (para revisar com npm run preview)
npm run preview        # serve o build localmente
npm run cv             # build + gera os currículos em PDF em public/cv/ (usa o Chrome local)
npm run og             # gera public/og-image.png a partir de scripts/og.html
npm run test:e2e       # Playwright + axe no build (rode npm run build antes)
```

## Como o build funciona

1. `tsc` checa os tipos.
2. `vite build` gera o bundle do navegador.
3. `vite build --ssr src/entry-server.tsx` gera uma versão do app que roda no Node.
4. `scripts/prerender.mjs` escreve:
   - uma página HTML completa por idioma: `dist/index.html` (EN) e `dist/pt/index.html` (PT);
   - as páginas de currículo `dist/cv/` e `dist/pt/cv/`;
   - `resume.json`, `llms.txt` e `sitemap.xml`.

   O CSS vai embutido no HTML e as fontes do topo têm preload.
5. `scripts/check-colors.mjs` falha o build se aparecer qualquer cor verde. É uma regra de design do site.

## Editar o conteúdo

Todo o texto fica em `src/content/`, separado dos componentes. Cada texto traduzível tem as duas versões: `{ en: '...', pt: '...' }`.

| Arquivo | O que tem |
|---|---|
| `profile.ts` | Nome, título, headline, resumo para recrutadores, experiência, competências, formação, certificações, idiomas, depoimentos |
| `projects.ts` | Os 60 projetos, os destaques e os mini cases (`caseStudy`) |
| `workSamples.ts` | Amostras de trabalho; as marcadas com `draft: true` são rascunhos |
| `ui.ts` | Rótulos da interface e meta tags |
| `stats.ts` | Anos de experiência, calculados pela data do build |

O site, o currículo em PDF, o `resume.json` e o `llms.txt` saem do mesmo conteúdo. Depois de editar, rode `npm run cv` para atualizar os PDFs.

### Rascunhos

Conteúdo com `draft: true` é fictício e precisa ser refeito. Ele aparece com uma faixa "RASCUNHO FICTÍCIO — REFAZER" só no `npm run dev` e no `npm run build:review`; **nunca** no site publicado (há um teste que garante isso). A lista do que falta está em [REVIEW.md](REVIEW.md).

### Tema

Na primeira visita, o site segue o tema do sistema. O botão no header alterna entre claro e escuro, e a escolha fica salva. As cores estão como tokens em `src/styles/global.css`: `:root` para o escuro e `[data-theme='light']` para o claro.

## Deploy e manutenção

- **Deploy:** cada push na `main` roda `.github/workflows/deploy.yml`, nesta ordem: build, testes Playwright + axe (desktop e celular, nos dois temas) e publicação no GitHub Pages. Configuração única no repositório: **Settings → Pages → Source: GitHub Actions**.
- **Rebuild mensal:** no dia 1 de cada mês, para atualizar os anos de experiência.
- **Links:** `.github/workflows/links.yml` confere mensalmente os links de lojas e perfis.
- **Fotos originais:** ficam em `images/`, que é ignorada pelo git; a versão otimizada está em `public/avatar.webp`.
