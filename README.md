# gio-gamedev.github.io

Portfólio de QA de jogos de Giovanni S. Mariano: bilíngue, com tema claro e escuro, em React + Vite, publicado no GitHub Pages.

- **EN:** https://gio-gamedev.github.io
- **PT:** https://gio-gamedev.github.io/pt/
- **Catálogo completo:** `/projects/` e `/pt/projetos/`
- **Currículos:** `/cv/Giovanni-Mariano-Game-QA-EN.pdf` e `-PT.pdf` (e `.docx`)
- **Para IAs e ATS:** `/resume.json` (padrão JSON Resume) e `/llms.txt`

## Comandos

```bash
npm install
npm run dev            # desenvolvimento em http://localhost:5173 (e /pt/)
npm run build          # tipos + bundle + pré-renderização + checagem de "sem verde"
npm run preview        # serve o build localmente
npm run cv             # build + gera os currículos em PDF em public/cv/ (usa o Chrome local)
npm run og             # gera public/og-image.png a partir de scripts/og.html
npm run catalog        # confere as capas contra o manifesto do pacote de imagens (só local; precisa de images/)
npm run test:e2e       # Playwright + axe no build (rode npm run build antes)
```

## Como o build funciona

1. `tsc` checa os tipos.
2. `vite build` gera o bundle do navegador.
3. `vite build --ssr src/entry-server.tsx` gera uma versão do app que roda no Node.

   O código de cada página fica em `src/pages/` e é carregado sob demanda (`src/main.tsx`): a home não baixa o código do catálogo e vice-versa. Como a página já vem pré-renderizada, o HTML traz um `modulepreload` do próprio pedaço, para a hidratação não esperar uma segunda ida ao servidor. O CSS continua em um arquivo só (`cssCodeSplit: false`), embutido em todas as páginas.
4. `scripts/prerender.mjs` escreve:
   - as páginas completas por idioma: `/`, `/pt/`, `/projects/` e `/pt/projetos/`;
   - as páginas de currículo `dist/cv/` e `dist/pt/cv/` e os currículos em Word;
   - `resume.json`, `llms.txt` e `sitemap.xml`;
   - páginas de redirecionamento para os endereços que as pessoas digitam à mão (veja "Rotas").

   O CSS vai embutido no HTML e as fontes do topo têm preload.
5. `scripts/check-colors.mjs` falha o build se aparecer qualquer cor verde. É uma regra de design do site.

## Rotas

O site tem quatro páginas de verdade. O inglês fica na raiz; não existe `/en/`.

| Página | Inglês | Português |
|---|---|---|
| Home | `/` | `/pt/` |
| Catálogo | `/projects/` | `/pt/projetos/` |

O GitHub Pages não tem regra de redirecionamento, então o build gera páginas que encaminham (com `?busca` e `#âncora`) e ficam fora da busca: `/en/`, `/en/projects/`, `/pt/projects/`, `/projetos/` e `/pt-br/`. Qualquer outro endereço cai em `public/404.html`, que encaminha as variantes óbvias e, se não reconhecer, mostra os links das quatro páginas.

## Editar o conteúdo

Todo o texto fica em `src/content/`, separado dos componentes. Cada texto traduzível tem as duas versões: `{ en: '...', pt: '...' }`.

| Arquivo | O que tem |
|---|---|
| `profile.ts` | Nome, título, resumo, experiência (cada bullet abre com o assunto em `**negrito**`), QA toolkit, prêmio (com fotos), depoimento, formação, EF SET e certificados |
| `projects.ts` | O catálogo, os destaques (contexto, contribuição e página pública) e as categorias |
| `covers.ts` | Gerado: larguras reais e enquadramento de cada capa em `public/covers/` |
| `reach.ts` | Números públicos por projeto, com fonte e mês da consulta |
| `ui.ts` | Rótulos da interface e meta tags |
| `stats.ts` | Anos de experiência, calculados pela data do build |

O site, os currículos, o `resume.json` e o `llms.txt` saem do mesmo conteúdo. Depois de editar, rode `npm run cv` para atualizar os PDFs.

Os currículos são feitos para leitura automática (ATS): uma coluna, títulos padrão e o marcador "•" como texto de verdade, porque a extração de texto de um PDF só enxerga caracteres desenhados. Sem isso, um leitor simples emenda o fim de uma página no começo da outra.

Regras de conteúdo:

- Nada de fatos inventados: um dado pendente fica fora do site até ser confirmado.
- Números públicos aparecem só por projeto, com fonte e data; nunca somados.
- Um destaque precisa de capa, contexto, contribuição e página pública, ou o build falha.

## Arquivos públicos e locais

- `public/` vai para o site: capas (`covers/<slug>-<largura>.webp`, sem ampliar o original), a foto em três tamanhos (`avatar*.webp`), fotos do Testathon, certificados (data de nascimento mascarada nos diplomas; o PDF do EF SET é o original) e os currículos.
- `images/` (fotos e pacote de imagens) e `private/` (anotações locais) ficam fora do git. Só o site é público.
- Imagem coletada fora do pacote do manifesto vai para `images/extras/<slug>/` e é registrada em `images/extras/covers-extra.json` com a página de origem, a URL, a data e o hash. `npm run catalog` lê esse arquivo junto com o manifesto, então o relatório continua mostrando de onde veio cada capa.

### Tema

Na primeira visita, o site segue o tema do sistema. O botão no header alterna entre claro e escuro, e a escolha fica salva. As cores estão como tokens em `src/styles/global.css`, junto com a escala de espaçamento (`--space-1` a `--space-9`).

## Deploy e manutenção

- **Deploy:** cada push na `main` roda `.github/workflows/deploy.yml`, nesta ordem: build, testes Playwright + axe (desktop e celular, nos dois temas) e publicação no GitHub Pages. Configuração única no repositório: **Settings → Pages → Source: GitHub Actions**.
- **Rebuild mensal:** no dia 1 de cada mês, para atualizar os anos de experiência.
- **Links:** `.github/workflows/links.yml` confere mensalmente os links de lojas e perfis.
