import type { L } from './types';
import type { WorkSample } from './workSamples';

/**
 * Fictional examples written by Claude that Giovanni still has to redo (listed in REVIEW.md).
 * Imported only when __SHOW_DRAFTS__ is true, so this module never reaches the published bundle.
 */

const same = (value: string): L => ({ en: value, pt: value });

export const draftSamples: WorkSample[] = [
  {
    id: 'go-no-go',
    icon: 'flag',
    tab: { en: 'Go/no-go report', pt: 'Relatório go/no-go' },
    draft: true,
    title: { en: 'Release Readiness — Go/no-go for 1.9.0 RC3', pt: 'Prontidão de Release — Go/no-go da 1.9.0 RC3' },
    subtitle: {
      en: 'Recommendation · open defects by severity · coverage · accepted risks',
      pt: 'Recomendação · defeitos abertos por severidade · cobertura · riscos aceitos',
    },
    sections: [
      {
        heading: { en: 'Recommendation', pt: 'Recomendação' },
        blocks: [
          {
            kind: 'fields',
            rows: [
              { label: same('Build'), value: same('Skyline Drift 1.9.0-rc3') },
              {
                label: { en: 'Decision', pt: 'Decisão' },
                value: { en: 'GO — with known issues', pt: 'GO — com problemas conhecidos' },
              },
              {
                label: { en: 'Rollout', pt: 'Rollout' },
                value: {
                  en: 'Google Play staged at 10% · App Store phased release',
                  pt: 'Google Play escalonado em 10% · App Store com lançamento gradual',
                },
              },
            ],
          },
          {
            kind: 'p',
            text: {
              en: 'RC3 meets the exit criteria of the 1.9.0 test plan: no open Critical or P1 defects, high-risk areas fully regressed, and store compliance checklists complete for App Store and Google Play.',
              pt: 'A RC3 atende aos critérios de saída do plano de teste da 1.9.0: nenhum defeito Crítico ou P1 aberto, áreas de alto risco com regressão completa e checklists de compliance concluídos para App Store e Google Play.',
            },
          },
        ],
      },
      {
        heading: { en: 'Defects by severity', pt: 'Defeitos por severidade' },
        blocks: [
          {
            kind: 'table',
            head: {
              en: ['Severity', 'Open', 'Fixed in RC3', 'Notes'],
              pt: ['Severidade', 'Abertos', 'Corrigidos na RC3', 'Observações'],
            },
            rows: {
              en: [
                ['Critical', '0', '2', 'QA-1042 (progress loss) fixed and verified on 5 devices'],
                ['High', '1', '3', 'QA-1061: purchase receipt retry is slow on weak networks; Restore Purchases works'],
                ['Medium', '4', '6', 'Mostly UI overlap on small screens (e.g. QA-1066, results screen on iPhone SE)'],
                ['Low', '7', '5', 'Cosmetic; none visible in the first session'],
              ],
              pt: [
                ['Crítica', '0', '2', 'QA-1042 (perda de progresso) corrigido e verificado em 5 dispositivos'],
                ['Alta', '1', '3', 'QA-1061: nova tentativa do recibo de compra é lenta em rede fraca; Restaurar Compras funciona'],
                ['Média', '4', '6', 'Principalmente sobreposição de UI em telas pequenas (ex.: QA-1066, resultados no iPhone SE)'],
                ['Baixa', '7', '5', 'Cosméticos; nenhum visível na primeira sessão'],
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Coverage', pt: 'Cobertura' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'Regression: 212 of 214 cases passed; 2 were blocked by a sandbox outage and passed on re-run',
                'Device matrix: 7 of 7 devices, including the low-end Galaxy A14 and Redmi Note 12',
                'Store compliance: App Store and Google Play checklists complete',
              ],
              pt: [
                'Regressão: 212 de 214 casos aprovados; 2 ficaram bloqueados por instabilidade do sandbox e passaram na nova execução',
                'Matriz de dispositivos: 7 de 7, incluindo os de entrada Galaxy A14 e Redmi Note 12',
                'Compliance de loja: checklists de App Store e Google Play concluídos',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Accepted risks', pt: 'Riscos aceitos' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'QA-1061 accepted by Production; fix planned for the 1.9.1 hotfix',
                'Localization beyond pt-BR and en-US stays out of scope until 1.10.0',
              ],
              pt: [
                'QA-1061 aceito pela Produção; correção prevista para o hotfix 1.9.1',
                'Localização além de pt-BR e en-US segue fora do escopo até a 1.10.0',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Post-release monitoring', pt: 'Monitoramento pós-release' },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'Hold the rollout at 10% for 48 hours and expand only if Firebase Crashlytics shows at least 99.5% crash-free users and no new Critical reports.',
              pt: 'Manter o rollout em 10% por 48 horas e ampliar só se o Firebase Crashlytics mostrar pelo menos 99,5% de usuários sem crash e nenhum relato Crítico novo.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'exploratory-session',
    icon: 'compass',
    tab: { en: 'Exploratory session', pt: 'Sessão exploratória' },
    draft: true,
    title: {
      en: 'Exploratory Session — Roblox multiplayer match flow',
      pt: 'Sessão Exploratória — fluxo de partida multiplayer no Roblox',
    },
    subtitle: {
      en: 'Charter · time box · findings · follow-up ideas',
      pt: 'Charter · tempo · achados · próximas ideias',
    },
    sections: [
      {
        heading: same('Charter'),
        blocks: [
          {
            kind: 'fields',
            rows: [
              {
                label: { en: 'Mission', pt: 'Missão' },
                value: {
                  en: 'Explore players joining and leaving mid-match to find scoring and session-state issues',
                  pt: 'Explorar jogadores entrando e saindo no meio da partida para achar problemas de pontuação e de estado da sessão',
                },
              },
              { label: { en: 'Time box', pt: 'Tempo' }, value: same('60 min') },
              {
                label: same('Build'),
                value: { en: 'Goal Rush v0.14, published test place', pt: 'Goal Rush v0.14, place de teste publicado' },
              },
              {
                label: { en: 'Devices', pt: 'Dispositivos' },
                value: {
                  en: 'Windows PC + low-end Android (Galaxy A14)',
                  pt: 'PC Windows + Android de entrada (Galaxy A14)',
                },
              },
            ],
          },
        ],
      },
      {
        heading: { en: 'Areas covered', pt: 'Áreas cobertas' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'Joining a match already in progress',
                'Leaving during the goal celebration',
                'Teleport between lobby and arena servers',
                'Rejoining after a forced disconnect',
              ],
              pt: [
                'Entrar em uma partida já em andamento',
                'Sair durante a comemoração do gol',
                'Teleporte entre os servidores de lobby e arena',
                'Voltar depois de uma desconexão forçada',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Findings', pt: 'Achados' },
        blocks: [
          {
            kind: 'table',
            head: {
              en: ['#', 'Finding', 'Severity', 'Ticket'],
              pt: ['#', 'Achado', 'Severidade', 'Ticket'],
            },
            rows: {
              en: [
                ['F1', 'Goal counted twice when the scorer leaves during the celebration', 'High', 'QA-2210'],
                ['F2', 'A late joiner sees a stale scoreboard until the next goal', 'Medium', 'QA-2211'],
                ['F3', 'Rejoining places the player on the opposite team', 'Medium', 'QA-2212'],
                ['F4', 'Celebration camera freezes for about 2 s on low-end Android', 'Low', 'QA-2213'],
              ],
              pt: [
                ['F1', 'Gol contado duas vezes quando o autor sai durante a comemoração', 'Alta', 'QA-2210'],
                ['F2', 'Quem entra atrasado vê o placar desatualizado até o próximo gol', 'Média', 'QA-2211'],
                ['F3', 'Ao voltar, o jogador cai no time adversário', 'Média', 'QA-2212'],
                ['F4', 'A câmera da comemoração trava por cerca de 2 s em Android de entrada', 'Baixa', 'QA-2213'],
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Questions and next ideas', pt: 'Perguntas e próximas ideias' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'F1 suggests the client reports goals: is scoring authority on the server?',
                'Next session: server shutdown and host migration during a match',
                'Add a regression case for "leave during celebration"',
              ],
              pt: [
                'F1 sugere que o cliente reporta o gol: a autoridade da pontuação está no servidor?',
                'Próxima sessão: desligamento do servidor e migração de host durante a partida',
                'Criar um caso de regressão para "sair durante a comemoração"',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Session breakdown', pt: 'Divisão da sessão' },
        blocks: [
          {
            kind: 'fields',
            rows: [
              { label: same('Setup'), value: same('10%') },
              { label: { en: 'Testing', pt: 'Testes' }, value: same('70%') },
              { label: { en: 'Investigation & reporting', pt: 'Investigação e relato' }, value: same('20%') },
            ],
          },
        ],
      },
    ],
  },
];
