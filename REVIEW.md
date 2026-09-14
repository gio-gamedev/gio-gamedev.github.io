# Revisão: o que falta refazer ou confirmar

Conteúdo marcado com `draft: true` é **fictício, escrito pelo Claude como exemplo**. Ele só aparece no modo de revisão, com a faixa listrada "RASCUNHO FICTÍCIO — REFAZER", e **nunca no site publicado**. O teste `draft samples never ship` garante isso no CI.

Para ver os rascunhos:

```bash
npm run dev                                  # http://localhost:5173 e /pt/
# ou, com o build de produção:
npm run build:review && npm run preview
```

Para aprovar um rascunho depois de refazer, troque `draft: true` por `draft: false` (ou apague a linha).

## Amostras de trabalho fictícias (refazer)

| Amostra | Onde | O que fazer |
|---|---|---|
| Casos de teste — FTUE mobile | `src/content/workSamples.ts`, `id: 'test-cases'` | Trocar pelos seus casos, no formato que você usa de verdade |
| Relatório de go/no-go — 1.9.0 RC3 | `src/content/workSamples.ts`, `id: 'go-no-go'` | Trocar pelo seu formato de relatório de release |
| Sessão exploratória — multiplayer Roblox | `src/content/workSamples.ts`, `id: 'exploratory-session'` | Trocar por uma sessão sua (anonimizada) |

## Conteúdo que depende de você

| Item | Onde entra |
|---|---|
| Métricas de impacto (bugs críticos pegos antes do lançamento, aprovação de loja, adoção do template de bug, testers treinados) | `experience` em `src/content/profile.ts` |
| Mini case dos 8 destaques | `caseStudy` em `src/content/projects.ts` |
| Depoimentos (com permissão) | `testimonials` em `src/content/profile.ts` |
| Capas de World Soccer Tycoon e Skate Tycoon | `public/covers/` + `cover` em `src/content/projects.ts` |
| NDA: Bolão GRE-NAL 2026, Bolão da UOL 2026, Tetragon 2 e marcas de clientes | `src/content/projects.ts` |
| Divergências com o currículo antigo: datas da Cooper Tec, nome do curso, "PSG Soccer" x "PSG Football" Freestyle | `src/content/profile.ts` e `src/content/projects.ts` |
| Resultado do EF SET | `languageList` em `src/content/profile.ts` |
| Prazo de início | `snapshot` em `src/content/profile.ts` |

Depois de mudar o conteúdo, rode `npm run cv` para gerar de novo os currículos em PDF.
