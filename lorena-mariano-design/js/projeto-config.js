/* ============================================================
   MONTE SEU PROJETO — opções do briefing
   ============================================================
   Reconstruído em 29/10/2026: o "Monte seu projeto" deixou de
   calcular e mostrar preço (planos e valores de referência saíram
   do site inteiro, pedido dela). Virou um briefing guiado — a
   pessoa escolhe quem é, o que precisa e a frequência, e no final
   isso vira uma mensagem pronta pro WhatsApp, onde os valores são
   consultados direto na conversa.

   Pra trocar o texto de uma opção ou acrescentar/remover um
   serviço, mexa só aqui — não precisa tocar no index.html. */
window.PROJETO_CONFIG = {

  /* ETAPA 1 — Quem é você? */
  quemEVoce: [
    { id: 'time',   label: 'Time' },
    { id: 'atleta', label: 'Atleta' },
    { id: 'outro',  label: 'Outro' }
  ],

  /* ETAPA 2 — O que você precisa? (seleção múltipla) */
  servicos: [
    { id: 'comunicacao-redes-sociais', label: 'Comunicação para Redes Sociais' },
    { id: 'kit-rodada',                label: 'Kit Rodada' },
    { id: 'cobertura-partidas',        label: 'Cobertura de Partidas' },
    { id: 'reels-melhores-momentos',   label: 'Reels e Melhores Momentos' },
    { id: 'criacao-redesign-escudo',   label: 'Criação e Redesign de Escudo' },
    { id: 'comunicacao-campeonatos',   label: 'Comunicação de Campeonatos' },
    { id: 'kit-patrocinadores',        label: 'Kit Comercial para Patrocinadores' },
    { id: 'outro-servico',             label: 'Outro' }
  ],

  /* ETAPA 3 — Como é sua demanda? */
  frequencia: [
    { id: 'pontual', label: 'Projeto pontual' },
    { id: 'mensal',  label: 'Mensal' },
    { id: 'nao-sei', label: 'Ainda não sei' }
  ]
};
