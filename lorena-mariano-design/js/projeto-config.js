/* ============================================================
   MONTE SEU PROJETO — configuração de serviços, planos e valores
   ============================================================
   Este arquivo é a ÚNICA coisa que precisa mexer para trocar
   preços, nomes ou o escopo dos planos do "Monte seu projeto".
   Não precisa tocar no index.html nem no styles.css para isso.

   Valores de 15/09/2026, definidos pela Lorena a partir de uma
   análise própria dos produtos e da esteira de serviços — não são
   mais placeholder. Estrutura em duas partes:

   1) "servicos" — o menu avulso (usado quando o projeto é PONTUAL
      ou quando ainda não se sabe a frequência). Soma-se o que for
      marcado, cada um com sua faixa [mínimo, máximo].

   2) "planos" — os pacotes mensais fechados (usados quando a
      frequência é MENSAL). Diferente do avulso, aqui NÃO se soma
      item por item: a ferramenta mostra os 3 planos com escopo
      fixo e sugere um com base no que foi marcado na Etapa 2,
      mas a pessoa pode escolher outro. Isso segue a regra que a
      Lorena definiu: nunca vira um plano de R$590 em R$350 —
      move para um plano menor, com menos entregas.

   Um serviço com "foraDoPlano: true" NUNCA entra em nenhum plano
   mensal (cobertura presencial, escudo, campeonato, patrocínio
   avulso) — aparece à parte, somado ao plano escolhido, mesmo
   quando a frequência é mensal. Essa é a regra mais importante
   da estratégia dela: é o que protege a margem dos planos fechados.

   Como editar um serviço avulso:
     - "label"   → texto do botão na Etapa 2.
     - "pontual" → [mínimo, máximo] em reais.
     - "foraDoPlano": true → nunca entra em plano mensal, sempre
       aparece como item à parte.
     - "pontual: null" (só o item "Outro") → vira "sob consulta".

   Como editar um plano mensal:
     - "preco"  → valor fixo mensal.
     - "resumo" → lista do que entra (aparece no card do plano).
     - "elegiveis" → quais ids de "servicos" contam como sinal para
       sugerir esse plano (nunca inclua um id com foraDoPlano:true
       aqui — ver comentário na função de sugestão no index.html).
   ============================================================ */
window.PROJETO_CONFIG = {

  /* ETAPA 1 — Quem é você? (não afeta o cálculo, só personaliza o
     texto do resultado e a mensagem que vai pro WhatsApp) */
  quemEVoce: [
    { id: 'time',   label: 'Time' },
    { id: 'atleta', label: 'Atleta' },
    { id: 'outro',  label: 'Outro' }
  ],

  /* ETAPA 2 — O que você precisa? (seleção múltipla)
     Nomes trocados de "arte X" pra "comunicação/cobertura X" —
     decisão da Lorena: arte é commodity, comunicação esportiva é
     serviço especializado. */
  servicos: [
    { id: 'comunicacao-redes-sociais', label: 'Comunicação para Redes Sociais', pontual: [45, 80],   foraDoPlano: false },
    { id: 'kit-rodada',                label: 'Kit Rodada',                     pontual: [120, 120], foraDoPlano: true },
    { id: 'cobertura-partidas',        label: 'Cobertura de Partidas',          pontual: [200, 300], foraDoPlano: true },
    { id: 'reels-melhores-momentos',   label: 'Reels e Melhores Momentos',      pontual: [90, 200],  foraDoPlano: false },
    { id: 'criacao-redesign-escudo',   label: 'Criação e Redesign de Escudo',   pontual: [250, 500], foraDoPlano: true },
    { id: 'comunicacao-campeonatos',   label: 'Comunicação de Campeonatos',     pontual: [250, 450], foraDoPlano: true },
    { id: 'kit-patrocinadores',        label: 'Kit Comercial para Patrocinadores', pontual: [250, 400], foraDoPlano: true },
    { id: 'outro-servico',             label: 'Outro',                          pontual: null,       foraDoPlano: true }
  ],

  /* ETAPA 3 — Como é sua demanda? */
  frequencia: [
    { id: 'pontual', label: 'Projeto pontual' },
    { id: 'mensal',  label: 'Mensal' },
    { id: 'nao-sei', label: 'Ainda não sei' }
  ],

  /* PLANOS MENSAIS — a "esteira" que a Lorena desenhou. Escopo fixo de
     propósito (ela foi explícita: o segredo está no que NÃO entra —
     sem isso um plano de R$590 vira R$1.500 de trabalho). */
  planos: [
    {
      id: 'base',
      nome: 'Plano Base',
      preco: 290,
      resumo: [
        '5 peças mensais — jogos, resultados, comunicados, atletas e patrocinadores',
        'Adaptação das peças principais para Stories',
        'Até 2 ajustes por peça'
      ]
    },
    {
      id: 'clube',
      nome: 'Plano Clube',
      preco: 420,
      destaque: true,
      resumo: [
        '8 peças mensais + adaptação para Stories',
        '1 vídeo/Reel simples por mês',
        'Aplicação e valorização de patrocinadores',
        'Planejamento básico do conteúdo do mês'
      ]
    },
    {
      id: 'clube-pro',
      nome: 'Plano Clube Pro',
      preco: 590,
      resumo: [
        '10 peças mensais + adaptação para Stories',
        '2 vídeos/Reels simples por mês',
        'Calendário mensal de comunicação + reunião rápida no início do mês',
        'Conteúdo para patrocinadores e prioridade de atendimento'
      ]
    }
  ]
};
