# Revisão: o que falta refazer ou confirmar

As amostras marcadas com `draft: true` são **fictícias, escritas pelo Claude como exemplo**. Elas ficam em `src/content/workSamples.drafts.ts` e só aparecem no modo de revisão, com a faixa listrada "RASCUNHO FICTÍCIO — REFAZER". O build publicado **nem inclui esse arquivo no JavaScript** (a constante `__SHOW_DRAFTS__` em `vite.config.ts` é `false` nele). O teste `draft samples never ship` confere isso no CI.

Para ver os rascunhos:

```bash
npm run dev                                  # http://localhost:5173 e /pt/
# ou, com o build de produção:
npm run build:review && npm run preview
```

Para publicar uma amostra depois de refazer, mova o objeto dela para `src/content/workSamples.ts` e apague a linha `draft: true`.

## Amostras fictícias (refazer)

| Amostra | Onde | O que fazer |
|---|---|---|
| Relatório de go/no-go — 1.9.0 RC3 | `src/content/workSamples.drafts.ts`, `id: 'go-no-go'` | Trocar pelo seu formato de relatório de release |
| Sessão exploratória — multiplayer Roblox | `src/content/workSamples.drafts.ts`, `id: 'exploratory-session'` | Trocar por uma sessão sua (anonimizada) |

A amostra **Casos de teste** agora é real: sai do seu teste técnico de fevereiro de 2022, anonimizado (sem o nome da empresa e sem os nomes internos do jogo).

## Para conferir

| Item | Onde |
|---|---|
| Ano do TCC (Coração do Inverno): o Wix diz 2021, e o curso está como 2016–2018 | `gameDev` e `education` em `src/content/profile.ts` |
| Números públicos de alcance (conferidos em 14/09/2026) | `src/content/reach.ts` |
| Resultado do EF SET (inglês fica A2 até lá) | `languageList` em `src/content/profile.ts` |

Depois de mudar o conteúdo, rode `npm run cv` para gerar de novo os currículos em PDF (os de Word saem em todo build).
