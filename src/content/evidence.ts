import type { L } from './types';

export type Table = { head: L<string[]>; rows: L<string[][]> };

const same = (value: string): L => ({ en: value, pt: value });

/**
 * The real Feb-2022 technical assessment for a QA role (hiring test; Giovanni allowed publishing
 * it). The site shows an excerpt; the full document is a rewritten, anonymized PDF with the cases
 * and results as in the original (company, client and the game's own names left out).
 */
export const assessment = {
  id: 'evidence-2022',
  badge: { en: 'Historical material · Feb 2022', pt: 'Material histórico · fev/2022' } as L,
  title: {
    en: 'Technical QA assessment: test cases and beta report',
    pt: 'Avaliação técnica de QA: casos de teste e relatório beta',
  } as L,
  summary: {
    en: 'A real document from a hiring test for a QA role. I wrote and ran every test case on a beta build of a city water and sanitation management game, then logged the findings.',
    pt: 'Documento real de um teste técnico para vaga de QA. Escrevi e executei todos os casos de teste em uma build beta de um jogo de gestão de saneamento de uma cidade e registrei os achados.',
  } as L,
  fields: [
    { label: { en: 'Beta test', pt: 'Teste beta' }, value: { en: 'Feb 14–18, 2022', pt: '14 a 18/02/2022' } },
    { label: { en: 'Written and run by', pt: 'Elaborado e executado por' }, value: same('Giovanni S. Mariano') },
    {
      label: { en: 'Coverage', pt: 'Cobertura' },
      value: {
        en: 'Start flow and name input, tutorial, pause menu, audio, missions, calendar, every purchasable upgrade, and the 14-year economy total',
        pt: 'Fluxo inicial e nome do jogador, tutorial, menu de pausa, áudio, missões, calendário, todas as melhorias compráveis e o total da economia em 14 anos',
      },
    },
  ] as { label: L; value: L }[],
  stats: [
    { value: '74', label: { en: 'test cases', pt: 'casos de teste' } },
    { value: '68', label: { en: 'passed (91.9%)', pt: 'OK (91,9%)' } },
    { value: '6', label: { en: 'failed (8.1%)', pt: 'NOK (8,1%)' }, fail: true },
    { value: '8', label: { en: 'findings: 2 bugs, 6 improvements', pt: 'achados: 2 falhas, 6 melhorias' } },
  ] as { value: string; label: L; fail?: boolean }[],
  pdf: `${import.meta.env.BASE_URL}docs/avaliacao-qa-2022-anonimizada.pdf`,
  pdfNote: {
    en: 'Anonymized rewrite: the client, the company and the game’s own names are left out; cases, steps, results and notes follow the original. In Portuguese, 28 pages.',
    pt: 'Reescrita anonimizada: cliente, empresa e nomes próprios do jogo foram omitidos; casos, passos, resultados e observações seguem o original. 28 páginas.',
  } as L,
  cases: {
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
  } as Table,
  findings: {
    head: { en: ['#', 'Item', 'Type', 'Description'], pt: ['#', 'Item', 'Tipo', 'Descrição'] },
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
  } as Table,
  findingsNote: {
    en: 'All 8 items were still open when the report was delivered.',
    pt: 'Os 8 itens estavam em aberto na entrega do relatório.',
  } as L,
};
