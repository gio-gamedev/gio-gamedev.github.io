import type { L } from './types';

export type Block =
  | { kind: 'p'; text: L }
  | { kind: 'fields'; rows: { label: L; value: L }[] }
  | { kind: 'list'; ordered?: boolean; items: L<string[]> }
  | { kind: 'checklist'; items: L<string[]> }
  | { kind: 'table'; head: L<string[]>; rows: L<string[][]> };

export type SampleSection = { heading: L; blocks: Block[] };

export type WorkSample = {
  id: string;
  icon: 'bug' | 'clipboard' | 'shield' | 'list' | 'flag' | 'compass';
  /** Short label for the tab. */
  tab: L;
  /** Fictional example written by Claude that Giovanni still has to review or redo (see src/content/review.ts). */
  draft?: boolean;
  title: L;
  subtitle: L;
  sections: SampleSection[];
};

export const sampleDisclaimer: L = {
  en: 'Work sample. Fictional game, fictional data — written to demonstrate method and documentation standards, not real client work.',
  pt: 'Amostra de trabalho. Jogo e dados fictícios — escrita para demonstrar método e padrão de documentação, não trabalho real de cliente.',
};

const same = (value: string): L => ({ en: value, pt: value });

export const workSamples: WorkSample[] = [
  {
    id: 'bug-report',
    icon: 'bug',
    tab: { en: 'Bug report', pt: 'Bug report' },
    title: {
      en: 'Bug Report — Progress loss on background/resume',
      pt: 'Bug Report — Perda de progresso ao ir para segundo plano e voltar',
    },
    subtitle: {
      en: 'Repro steps · severity vs priority · evidence · workaround',
      pt: 'Passos de reprodução · severidade vs prioridade · evidências · workaround',
    },
    sections: [
      {
        heading: { en: 'Summary', pt: 'Resumo' },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'Player progress made after the last checkpoint is lost when the app is backgrounded and resumed during the checkpoint save window.',
              pt: 'O progresso feito pelo jogador após o último checkpoint é perdido quando o app vai para segundo plano e é retomado durante a janela de salvamento do checkpoint.',
            },
          },
        ],
      },
      {
        heading: { en: 'Classification', pt: 'Classificação' },
        blocks: [
          {
            kind: 'fields',
            rows: [
              { label: same('ID'), value: same('QA-1042') },
              {
                label: { en: 'Severity', pt: 'Severidade' },
                value: {
                  en: 'Critical — permanent data loss, no user recovery',
                  pt: 'Crítica — perda permanente de dados, sem recuperação pelo usuário',
                },
              },
              {
                label: { en: 'Priority', pt: 'Prioridade' },
                value: { en: 'P1 — blocks release candidate', pt: 'P1 — bloqueia o release candidate' },
              },
              { label: { en: 'Type', pt: 'Tipo' }, value: { en: 'Functional / Persistence', pt: 'Funcional / Persistência' } },
              {
                label: { en: 'Frequency', pt: 'Frequência' },
                value: { en: '5 of 5 attempts (100%)', pt: '5 de 5 tentativas (100%)' },
              },
              { label: { en: 'Found in', pt: 'Encontrado em' }, value: same('Build 1.8.3-rc2 (staging)') },
              {
                label: { en: 'Regression', pt: 'Regressão' },
                value: { en: 'No — also reproduces on 1.8.2', pt: 'Não — também reproduz na 1.8.2' },
              },
            ],
          },
        ],
      },
      {
        heading: { en: 'Environment', pt: 'Ambiente' },
        blocks: [
          {
            kind: 'fields',
            rows: [
              { label: { en: 'Device', pt: 'Dispositivo' }, value: same('Samsung Galaxy A54 (SM-A546E), 6 GB RAM') },
              { label: { en: 'OS', pt: 'SO' }, value: same('Android 14, One UI 6.1') },
              { label: same('Build'), value: same('1.8.3-rc2 (staging), Unity 2022.3.21f1') },
              { label: { en: 'Network', pt: 'Rede' }, value: { en: 'Wi-Fi, stable', pt: 'Wi-Fi, estável' } },
              {
                label: { en: 'Account', pt: 'Conta' },
                value: { en: 'New account, tutorial completed', pt: 'Conta nova, tutorial concluído' },
              },
            ],
          },
        ],
      },
      {
        heading: { en: 'Preconditions', pt: 'Pré-condições' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'Fresh install, tutorial completed',
                'At least one checkpoint already reached in Stage 3',
                "Battery optimization set to default (not 'unrestricted')",
              ],
              pt: [
                'Instalação limpa, tutorial concluído',
                'Pelo menos um checkpoint já alcançado na Fase 3',
                "Otimização de bateria no padrão (não 'sem restrições')",
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Steps to reproduce', pt: 'Passos para reproduzir' },
        blocks: [
          {
            kind: 'list',
            ordered: true,
            items: {
              en: [
                'Launch the game and load the Stage 3 save',
                'Drive to the second checkpoint and cross it',
                'Within 2 seconds of the checkpoint banner appearing, press the device Home button',
                'Wait 30 seconds with the app in background',
                'Reopen the app from the launcher',
              ],
              pt: [
                'Abrir o jogo e carregar o save da Fase 3',
                'Dirigir até o segundo checkpoint e cruzá-lo',
                'Em até 2 segundos após o banner do checkpoint aparecer, pressionar o botão Home do dispositivo',
                'Aguardar 30 segundos com o app em segundo plano',
                'Reabrir o app pelo launcher',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Expected result', pt: 'Resultado esperado' },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'The game resumes at the second checkpoint of Stage 3, with progress and collected items intact.',
              pt: 'O jogo retoma no segundo checkpoint da Fase 3, com o progresso e os itens coletados intactos.',
            },
          },
        ],
      },
      {
        heading: { en: 'Actual result', pt: 'Resultado obtido' },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'The game resumes at the first checkpoint. All progress and items collected between the first and second checkpoint are lost. No error is shown to the player.',
              pt: 'O jogo retoma no primeiro checkpoint. Todo o progresso e os itens coletados entre o primeiro e o segundo checkpoint são perdidos. Nenhum erro é exibido ao jogador.',
            },
          },
        ],
      },
      {
        heading: { en: 'Evidence', pt: 'Evidências' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'Screen recording, 0:00–0:48 — full reproduction',
                'Logcat excerpt around the save call, filtered by the save-system tag',
                'Save file before and after, for byte comparison',
              ],
              pt: [
                'Gravação de tela, 0:00–0:48 — reprodução completa',
                'Trecho do Logcat em torno da chamada de save, filtrado pela tag do sistema de save',
                'Arquivo de save antes e depois, para comparação byte a byte',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Workaround', pt: 'Workaround' },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'Wait for the checkpoint banner to fully dismiss (about 3 seconds) before backgrounding the app. No workaround available to a player who is unaware of the timing.',
              pt: 'Aguardar o banner do checkpoint desaparecer por completo (cerca de 3 segundos) antes de colocar o app em segundo plano. Não há workaround para um jogador que desconhece esse tempo.',
            },
          },
        ],
      },
      {
        heading: { en: 'Notes for development', pt: 'Notas para o desenvolvimento' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'The checkpoint write appears to be asynchronous and not flushed on the application-pause lifecycle event',
                'Reproduces on Android 13 and 14; not attempted on iOS in this pass',
                'Suggest verifying whether the same window exists on app termination, which would widen the impact',
              ],
              pt: [
                'A gravação do checkpoint parece ser assíncrona e não é concluída (flush) no evento de pausa do ciclo de vida da aplicação',
                'Reproduz no Android 13 e 14; não testado no iOS nesta rodada',
                'Sugiro verificar se a mesma janela existe no encerramento do app, o que ampliaria o impacto',
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'test-plan',
    icon: 'clipboard',
    tab: { en: 'Test plan', pt: 'Plano de teste' },
    title: {
      en: 'Test Plan — Mobile release, with device matrix',
      pt: 'Plano de Teste — Release mobile, com matriz de dispositivos',
    },
    subtitle: {
      en: 'Scope · risk-based priority · entry/exit criteria · device coverage',
      pt: 'Escopo · prioridade por risco · critérios de entrada/saída · cobertura de dispositivos',
    },
    sections: [
      {
        heading: { en: 'Objective', pt: 'Objetivo' },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'Validate the 1.9.0 mobile release of Skyline Drift for store submission, covering functional regression, device compatibility and store compliance.',
              pt: 'Validar a release mobile 1.9.0 de Skyline Drift para submissão às lojas, cobrindo regressão funcional, compatibilidade de dispositivos e compliance das lojas.',
            },
          },
        ],
      },
      {
        heading: { en: 'In scope', pt: 'No escopo' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'Core gameplay loop: race start, checkpoints, finish, rewards',
                'Progression and save persistence, including background/resume',
                'First-time user experience and tutorial',
                'In-app purchase flow, sandbox accounts',
                'Store compliance for App Store and Google Play',
              ],
              pt: [
                'Loop principal de gameplay: largada, checkpoints, chegada, recompensas',
                'Progressão e persistência de save, incluindo segundo plano/retomada',
                'Experiência de primeiro uso (FTUE) e tutorial',
                'Fluxo de compra no app, contas sandbox',
                'Compliance de loja para App Store e Google Play',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Out of scope', pt: 'Fora do escopo' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'Server-side load and stress testing — owned by the backend team',
                'Localization beyond pt-BR and en-US — deferred to 1.10.0',
                'Save migration from the legacy 1.x format — covered by a separate plan',
              ],
              pt: [
                'Testes de carga e estresse no servidor — responsabilidade do time de backend',
                'Localização além de pt-BR e en-US — adiada para a 1.10.0',
                'Migração de save do formato legado 1.x — coberta por um plano separado',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Risk-based priority', pt: 'Prioridade por risco' },
        blocks: [
          {
            kind: 'table',
            head: { en: ['Area', 'Risk', 'Depth'], pt: ['Área', 'Risco', 'Profundidade'] },
            rows: {
              en: [
                ['Save & progression', 'High — data loss is unrecoverable', 'Full regression + edge cases'],
                ['In-app purchase', 'High — revenue and store rejection', 'Full regression, sandbox'],
                ['Core race loop', 'Medium — highly visible, well covered', 'Full regression'],
                ['FTUE / tutorial', 'Medium — affects retention', 'Exploratory + scripted'],
                ['Cosmetics & UI polish', 'Low — no functional impact', 'Smoke only'],
              ],
              pt: [
                ['Save e progressão', 'Alto — perda de dados é irrecuperável', 'Regressão completa + casos de borda'],
                ['Compra no app', 'Alto — receita e rejeição na loja', 'Regressão completa, sandbox'],
                ['Loop principal de corrida', 'Médio — muito visível, bem coberto', 'Regressão completa'],
                ['FTUE / tutorial', 'Médio — afeta retenção', 'Exploratório + roteirizado'],
                ['Cosméticos e polimento de UI', 'Baixo — sem impacto funcional', 'Apenas smoke'],
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Device compatibility matrix', pt: 'Matriz de compatibilidade de dispositivos' },
        blocks: [
          {
            kind: 'table',
            head: {
              en: ['Device', 'OS', 'Tier', 'Rationale'],
              pt: ['Dispositivo', 'SO', 'Faixa', 'Justificativa'],
            },
            rows: {
              en: [
                ['Samsung Galaxy A14', 'Android 13', 'Low-end', 'Highest install share in target market'],
                ['Samsung Galaxy A54', 'Android 14', 'Mid', 'Volume device, current OS'],
                ['Google Pixel 7', 'Android 15', 'Reference', 'Clean Android, newest OS'],
                ['Xiaomi Redmi Note 12', 'Android 13', 'Low-end', 'Aggressive battery management'],
                ['iPhone SE (2022)', 'iOS 17', 'Low-end', 'Smallest supported screen'],
                ['iPhone 14', 'iOS 18', 'Mid', 'Volume device'],
                ['iPad 10th gen', 'iPadOS 18', 'Tablet', 'Only tablet form factor supported'],
              ],
              pt: [
                ['Samsung Galaxy A14', 'Android 13', 'Entrada', 'Maior base instalada no mercado-alvo'],
                ['Samsung Galaxy A54', 'Android 14', 'Intermediário', 'Aparelho de volume, SO atual'],
                ['Google Pixel 7', 'Android 15', 'Referência', 'Android puro, SO mais recente'],
                ['Xiaomi Redmi Note 12', 'Android 13', 'Entrada', 'Gerenciamento agressivo de bateria'],
                ['iPhone SE (2022)', 'iOS 17', 'Entrada', 'Menor tela suportada'],
                ['iPhone 14', 'iOS 18', 'Intermediário', 'Aparelho de volume'],
                ['iPad 10ª geração', 'iPadOS 18', 'Tablet', 'Único formato tablet suportado'],
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Entry criteria', pt: 'Critérios de entrada' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'Release candidate build deployed to the staging track',
                'No open Critical or P1 defects from the previous cycle',
                'Store metadata and assets frozen',
              ],
              pt: [
                'Build release candidate publicada no track de staging',
                'Nenhum defeito Crítico ou P1 aberto do ciclo anterior',
                'Metadados e assets da loja congelados',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Exit criteria', pt: 'Critérios de saída' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'Zero open Critical or P1 defects',
                'All High-risk areas fully regressed and passing',
                'Compliance checklist complete for both stores',
                'Known issues documented with severity and workaround',
              ],
              pt: [
                'Zero defeitos Críticos ou P1 abertos',
                'Todas as áreas de risco Alto com regressão completa e aprovadas',
                'Checklist de compliance completo para as duas lojas',
                'Problemas conhecidos documentados com severidade e workaround',
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'compliance-checklist',
    icon: 'shield',
    tab: { en: 'Compliance checklist', pt: 'Checklist de compliance' },
    title: {
      en: 'Compliance Checklist — Roblox experience',
      pt: 'Checklist de Compliance — Experiência Roblox',
    },
    subtitle: {
      en: 'Platform requirements · pass criteria · submission readiness',
      pt: 'Requisitos da plataforma · critérios de aprovação · prontidão para submissão',
    },
    sections: [
      {
        heading: { en: 'Purpose', pt: 'Objetivo' },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'Pre-publish verification for a branded Roblox experience, run before handing the build to the client for approval. Each item is verified in a live session on the published test place, not in Studio only.',
              pt: 'Verificação pré-publicação de uma experiência Roblox de marca, executada antes de entregar a build ao cliente para aprovação. Cada item é verificado em uma sessão ao vivo no place de teste publicado, não apenas no Studio.',
            },
          },
        ],
      },
      {
        heading: { en: 'Content & policy', pt: 'Conteúdo e políticas' },
        blocks: [
          {
            kind: 'checklist',
            items: {
              en: [
                'No content violating Roblox Community Standards in assets, text or audio',
                'All text passes the platform text filter, including UI and NPC dialogue',
                'Age recommendation set and consistent with the actual content',
                'Brand assets used within the limits of the client brand guide',
                'No external links outside the platform allowlist',
              ],
              pt: [
                'Nenhum conteúdo que viole os Community Standards do Roblox em assets, textos ou áudio',
                'Todo texto passa pelo filtro de texto da plataforma, incluindo UI e diálogos de NPCs',
                'Recomendação de idade definida e coerente com o conteúdo real',
                'Assets de marca usados dentro dos limites do guia de marca do cliente',
                'Nenhum link externo fora da allowlist da plataforma',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Experience setup', pt: 'Configuração da experiência' },
        blocks: [
          {
            kind: 'checklist',
            items: {
              en: [
                'Experience name, description and thumbnails match the approved copy',
                'Icon and thumbnails meet the platform resolution requirements',
                'Genre and tags correctly assigned',
                'Private servers configured as agreed with the client',
              ],
              pt: [
                'Nome, descrição e thumbnails da experiência correspondem ao texto aprovado',
                'Ícone e thumbnails atendem aos requisitos de resolução da plataforma',
                'Gênero e tags atribuídos corretamente',
                'Servidores privados configurados conforme acordado com o cliente',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Gameplay & stability', pt: 'Gameplay e estabilidade' },
        blocks: [
          {
            kind: 'checklist',
            items: {
              en: [
                'Spawn works with 1, 2 and the maximum configured number of players',
                'No fall-through-world or out-of-bounds reachable from spawn',
                'Core loop completes end to end in a live session',
                'Session survives a full server rotation without progress loss',
                'Client frame rate acceptable on a low-end device profile',
              ],
              pt: [
                'Spawn funciona com 1, 2 e o número máximo configurado de jogadores',
                'Nenhuma queda através do mapa ou área fora dos limites acessível a partir do spawn',
                'Loop principal completa de ponta a ponta em sessão ao vivo',
                'Sessão sobrevive a uma rotação completa de servidor sem perda de progresso',
                'Frame rate do cliente aceitável em perfil de dispositivo de entrada',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Monetization', pt: 'Monetização' },
        blocks: [
          {
            kind: 'checklist',
            items: {
              en: [
                'Every Developer Product and Game Pass grants exactly what it describes',
                'Purchase prompt copy matches the item granted',
                'Failed and cancelled purchases leave no partial state',
              ],
              pt: [
                'Todo Developer Product e Game Pass concede exatamente o que descreve',
                'O texto do prompt de compra corresponde ao item concedido',
                'Compras com falha ou canceladas não deixam estado parcial',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Analytics', pt: 'Analytics' },
        blocks: [
          {
            kind: 'checklist',
            items: {
              en: [
                'Session start and end events fire once per session',
                'Funnel events fire in order and only once per step',
                'No personally identifiable information in any event payload',
              ],
              pt: [
                'Eventos de início e fim de sessão disparam uma vez por sessão',
                'Eventos de funil disparam em ordem e apenas uma vez por etapa',
                'Nenhuma informação pessoal identificável em qualquer payload de evento',
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Sign-off', pt: 'Aprovação final' },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'Submission is recommended only when every item above passes. Any item that cannot pass is raised as a defect with severity and a written risk assessment, so the decision to ship regardless is made by the client with full information.',
              pt: 'A submissão só é recomendada quando todos os itens acima passam. Qualquer item que não possa passar é registrado como defeito com severidade e uma avaliação de risco por escrito, para que a decisão de publicar mesmo assim seja tomada pelo cliente com informação completa.',
            },
          },
        ],
      },
    ],
  },

  // ─── Drafts: fictional examples written by Claude. Review mode only until Giovanni redoes them. ───
  {
    id: 'test-cases',
    icon: 'list',
    tab: { en: 'Test cases', pt: 'Casos de teste' },
    draft: true,
    title: { en: 'Test Cases — Mobile FTUE (excerpt)', pt: 'Casos de Teste — FTUE mobile (trecho)' },
    subtitle: {
      en: 'Preconditions · steps · expected result · priority · traceability',
      pt: 'Pré-condições · passos · resultado esperado · prioridade · rastreabilidade',
    },
    sections: [
      {
        heading: { en: 'Scope', pt: 'Escopo' },
        blocks: [
          {
            kind: 'p',
            text: {
              en: 'Excerpt from the first-time user experience suite of Skyline Drift 1.9.0: from first launch to the first race reward.',
              pt: 'Trecho da suíte de experiência de primeiro uso de Skyline Drift 1.9.0: do primeiro acesso até a recompensa da primeira corrida.',
            },
          },
        ],
      },
      {
        heading: { en: 'Test cases', pt: 'Casos de teste' },
        blocks: [
          {
            kind: 'table',
            head: {
              en: ['ID', 'Case', 'Preconditions', 'Steps', 'Expected result', 'Priority'],
              pt: ['ID', 'Caso', 'Pré-condições', 'Passos', 'Resultado esperado', 'Prioridade'],
            },
            rows: {
              en: [
                ['TC-FTUE-001', 'Consent screen on first launch', 'Fresh install; device language pt-BR', '1. Launch the app · 2. Read the first screen', 'Consent screen in pt-BR; Continue stays disabled until the privacy box is ticked', 'P1'],
                ['TC-FTUE-002', 'Tutorial skip is gated', 'Consent accepted', '1. Look for Skip during tutorial steps 1–3', 'Skip appears only from step 4; the progress bar advances once per step', 'P2'],
                ['TC-FTUE-003', 'Tutorial progress survives app kill', 'At tutorial step 3', '1. Force-close the app · 2. Relaunch', 'Resumes at step 3 with the same car and currency', 'P1'],
                ['TC-FTUE-004', 'First race reward granted once', 'First race finished', '1. Collect the reward · 2. Background and resume · 3. Reopen results', 'Reward credited once; the results screen shows "Collected"', 'P1'],
                ['TC-FTUE-005', 'Offline first launch', 'Airplane mode on', '1. Launch the app', 'Offline message with Retry; no crash and no endless loader', 'P2'],
                ['TC-FTUE-006', 'Small-screen layout', 'iPhone SE (2022)', '1. Play tutorial steps 1–6', 'No clipped buttons; tap targets of at least 44 pt', 'P3'],
              ],
              pt: [
                ['TC-FTUE-001', 'Tela de consentimento no primeiro acesso', 'Instalação limpa; idioma do aparelho pt-BR', '1. Abrir o app · 2. Ler a primeira tela', 'Tela de consentimento em pt-BR; Continuar fica desabilitado até marcar a caixa de privacidade', 'P1'],
                ['TC-FTUE-002', 'Pular tutorial é bloqueado', 'Consentimento aceito', '1. Procurar Pular nos passos 1–3 do tutorial', 'Pular só aparece a partir do passo 4; a barra de progresso avança uma vez por passo', 'P2'],
                ['TC-FTUE-003', 'Progresso do tutorial sobrevive ao fechar o app', 'No passo 3 do tutorial', '1. Forçar o fechamento do app · 2. Reabrir', 'Retoma no passo 3 com o mesmo carro e a mesma moeda', 'P1'],
                ['TC-FTUE-004', 'Recompensa da primeira corrida concedida uma vez', 'Primeira corrida concluída', '1. Coletar a recompensa · 2. Ir para segundo plano e voltar · 3. Reabrir os resultados', 'Recompensa creditada uma vez; a tela de resultados mostra "Coletado"', 'P1'],
                ['TC-FTUE-005', 'Primeiro acesso offline', 'Modo avião ligado', '1. Abrir o app', 'Mensagem offline com Tentar de novo; sem crash e sem carregamento infinito', 'P2'],
                ['TC-FTUE-006', 'Layout em tela pequena', 'iPhone SE (2022)', '1. Jogar os passos 1–6 do tutorial', 'Nenhum botão cortado; áreas de toque com pelo menos 44 pt', 'P3'],
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Execution status', pt: 'Status da execução' },
        blocks: [
          {
            kind: 'fields',
            rows: [
              { label: { en: 'Executed', pt: 'Executados' }, value: same('6 / 6') },
              { label: { en: 'Passed', pt: 'Aprovados' }, value: same('4') },
              {
                label: { en: 'Failed', pt: 'Reprovados' },
                value: { en: '1 — TC-FTUE-004, reported as QA-1057', pt: '1 — TC-FTUE-004, reportado como QA-1057' },
              },
              {
                label: { en: 'Blocked', pt: 'Bloqueados' },
                value: {
                  en: '1 — TC-FTUE-005, offline build not available yet',
                  pt: '1 — TC-FTUE-005, build offline ainda indisponível',
                },
              },
            ],
          },
        ],
      },
      {
        heading: { en: 'Traceability', pt: 'Rastreabilidade' },
        blocks: [
          {
            kind: 'list',
            items: {
              en: [
                'Requirements FTUE-REQ-12 (tutorial flow) and FTUE-REQ-15 (first reward)',
                'Risk "FTUE affects retention" in the 1.9.0 test plan (Medium: exploratory + scripted)',
              ],
              pt: [
                'Requisitos FTUE-REQ-12 (fluxo do tutorial) e FTUE-REQ-15 (primeira recompensa)',
                'Risco "FTUE afeta retenção" no plano de teste da 1.9.0 (Médio: exploratório + roteirizado)',
              ],
            },
          },
        ],
      },
    ],
  },
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
