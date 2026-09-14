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
  /** Fictional example written by Claude that Giovanni still has to redo (lives in workSamples.drafts.ts). */
  draft?: boolean;
  /** Replaces the default "fictional data" note, e.g. for a real anonymized document. */
  disclaimer?: L;
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
    id: 'test-cases',
    icon: 'list',
    tab: { en: 'Test cases', pt: 'Casos de teste' },
    disclaimer: {
      en: 'Real document from a 2022 technical assessment for a QA role, anonymized: the company and in-game names are left out. The full sheet has 74 scenarios; this is an excerpt.',
      pt: 'Documento real de um teste técnico para vaga de QA (2022), anonimizado: o nome da empresa e os nomes internos do jogo foram omitidos. A planilha completa tem 74 cenários; este é um trecho.',
    },
    title: {
      en: 'Test Cases & Beta Report — Technical assessment (2022)',
      pt: 'Casos de Teste e Relatório Beta — Teste técnico (2022)',
    },
    subtitle: {
      en: 'Test cases · pass/fail results · findings log',
      pt: 'Casos de teste · resultados OK/NOK · registro de achados',
    },
    sections: [
      {
        heading: { en: 'Context', pt: 'Contexto' },
        blocks: [
          {
            kind: 'fields',
            rows: [
              {
                label: { en: 'Game', pt: 'Jogo' },
                value: {
                  en: 'City water and sanitation management game (beta build)',
                  pt: 'Jogo de gestão de saneamento de uma cidade (build beta)',
                },
              },
              { label: { en: 'Beta test', pt: 'Teste beta' }, value: { en: 'Feb 14–18, 2022', pt: '14 a 18/02/2022' } },
              {
                label: { en: 'Written and run by', pt: 'Elaborado e executado por' },
                value: same('Giovanni S. Mariano'),
              },
              {
                label: { en: 'Coverage', pt: 'Cobertura' },
                value: {
                  en: 'Start flow and name input, tutorial, pause menu, audio, missions, calendar, every purchasable upgrade, and the 14-year economy total',
                  pt: 'Fluxo inicial e nome do jogador, tutorial, menu de pausa, áudio, missões, calendário, todas as melhorias compráveis e o total da economia em 14 anos',
                },
              },
            ],
          },
        ],
      },
      {
        heading: { en: 'Results', pt: 'Resultados' },
        blocks: [
          {
            kind: 'fields',
            rows: [
              { label: { en: 'Scenarios', pt: 'Cenários' }, value: same('74') },
              { label: { en: 'Passed', pt: 'OK' }, value: { en: '68 (91.9%)', pt: '68 (91,9%)' } },
              { label: { en: 'Failed', pt: 'NOK' }, value: { en: '6 (8.1%)', pt: '6 (8,1%)' } },
              { label: { en: 'Not run', pt: 'Não testados' }, value: same('0') },
            ],
          },
        ],
      },
      {
        heading: { en: 'Test cases (excerpt, every failure included)', pt: 'Casos de teste (trecho, com todas as falhas)' },
        blocks: [
          {
            kind: 'table',
            head: {
              en: ['ID', 'Area', 'Case', 'Expected result', 'Status', 'Note'],
              pt: ['ID', 'Área', 'Caso', 'Resultado esperado', 'Status', 'Observação'],
            },
            rows: {
              en: [
                ['TC-01', 'Start game', 'Start without a name', 'Next stays blocked until a name is typed', 'Pass', 'Suggested visual feedback that the name is required'],
                ['TC-02', 'Start game', 'Very long name', 'Name length is limited', 'Fail', 'No limit; a long name can break in-game text'],
                ['TC-03', 'Start game', 'Numbers and special characters in the name', 'Special characters are rejected', 'Fail', 'Accepted; a naming rule needs to be defined'],
                ['TC-04', 'Tutorial', 'First tutorial text box', 'Intro text shows the city name from the documentation', 'Fail', 'City name spelled differently; to confirm against the documentation'],
                ['TC-05', 'Tutorial', 'Second tutorial text box', 'Same as TC-04', 'Fail', 'Same city-name issue'],
                ['TC-10', 'Ranking', 'Ranking button on the start screen', 'Opens the ranking screen', 'Fail', 'No response; the feature may not be implemented yet'],
                ['TC-22', 'Upgrades', 'Buy an upgrade, then advance the year', 'Money is deducted, the art and history update, and yearly savings grow by the stated amount', 'Pass', '—'],
                ['TC-74', 'Economy', '14-year total without buying anything', 'Savings add up to the total in the specification', 'Fail', 'The total came out higher than specified'],
              ],
              pt: [
                ['TC-01', 'Iniciar jogo', 'Iniciar sem nome', 'Próximo fica bloqueado até digitar um nome', 'OK', 'Sugerido feedback visual de que o nome é obrigatório'],
                ['TC-02', 'Iniciar jogo', 'Nome muito longo', 'O tamanho do nome é limitado', 'NOK', 'Sem limite; um nome longo pode quebrar os textos do jogo'],
                ['TC-03', 'Iniciar jogo', 'Números e caracteres especiais no nome', 'Caracteres especiais são recusados', 'NOK', 'Aceitos; é preciso definir uma regra para o nome'],
                ['TC-04', 'Tutorial', 'Primeiro quadro do tutorial', 'O texto de introdução mostra o nome da cidade da documentação', 'NOK', 'Nome da cidade com outra grafia; conferir na documentação'],
                ['TC-05', 'Tutorial', 'Segundo quadro do tutorial', 'Igual ao TC-04', 'NOK', 'Mesmo problema no nome da cidade'],
                ['TC-10', 'Ranking', 'Botão de ranking na tela inicial', 'Abre a tela de ranking', 'NOK', 'Sem resposta; a funcionalidade pode não estar implementada'],
                ['TC-22', 'Melhorias', 'Comprar uma melhoria e avançar o ano', 'O dinheiro é descontado, a arte e o histórico atualizam, e a economia anual cresce no valor indicado', 'OK', '—'],
                ['TC-74', 'Economia', 'Total de 14 anos sem comprar nada', 'A economia soma o total da especificação', 'NOK', 'O total ficou acima do especificado'],
              ],
            },
          },
        ],
      },
      {
        heading: { en: 'Findings log', pt: 'Registro de achados' },
        blocks: [
          {
            kind: 'table',
            head: {
              en: ['#', 'Item', 'Type', 'Description'],
              pt: ['#', 'Item', 'Tipo', 'Descrição'],
            },
            rows: {
              en: [
                ['1', 'Ranking button does nothing', 'Bug', 'Clicking Ranking gives no response'],
                ['2', 'Character name length', 'Improvement', 'Limit the name length so long names do not break dialogue lines'],
                ['3', 'Name character rule', 'Improvement', 'Allow letters only, with validation on the text field'],
                ['4', 'Satisfaction HUD position', 'Improvement', 'The HUD covers houses on the map and suggests something playable underneath'],
                ['5', 'Affordable upgrades', 'Improvement', 'Highlight the upgrades the player can buy with the current money'],
                ['6', 'City name in the intro', 'Bug', 'Spelled differently from the documentation'],
                ['7', 'End-of-game feedback', 'Improvement', 'Different endings for positive or negative satisfaction and for low or high savings'],
                ['8', 'Skipping every year', 'Improvement', 'React when the player skips all years without buying anything'],
              ],
              pt: [
                ['1', 'Botão de ranking sem função', 'Falha', 'Clicar em Ranking não gera nenhuma resposta'],
                ['2', 'Tamanho do nome do personagem', 'Melhoria', 'Limitar o tamanho do nome para não quebrar as linhas dos textos'],
                ['3', 'Regra de caracteres do nome', 'Melhoria', 'Aceitar apenas letras, com validação no campo de texto'],
                ['4', 'Posição da HUD de satisfação', 'Melhoria', 'A HUD cobre casas do mapa e dá a impressão de haver algo jogável embaixo'],
                ['5', 'Melhorias ao alcance', 'Melhoria', 'Destacar as melhorias que o jogador pode comprar com o dinheiro atual'],
                ['6', 'Nome da cidade na introdução', 'Falha', 'Grafia diferente da documentação'],
                ['7', 'Feedback de fim de jogo', 'Melhoria', 'Finais diferentes para satisfação positiva ou negativa e para economia baixa ou alta'],
                ['8', 'Pular todos os anos', 'Melhoria', 'Dar retorno quando o jogador pula todos os anos sem comprar nada'],
              ],
            },
          },
          {
            kind: 'p',
            text: {
              en: '8 items: 2 bugs and 6 improvements, all still open when the report was delivered.',
              pt: '8 itens: 2 falhas e 6 melhorias, todos em aberto na entrega do relatório.',
            },
          },
        ],
      },
    ],
  },
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

];
