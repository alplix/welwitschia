import type { Dictionary } from "../types";

const pt: Dictionary = {
  common: {
    tagline: "Veja como um código evolui.",
    viewOnGithub: "Ver no GitHub",
    backToHome: "Voltar ao início",
    close: "Fechar",
    refresh: "Atualizar",
    loadedFromCache: "Carregado da cache",
    codedBy: "Desenvolvido por Alperen Yavuz",
    language: "Idioma",
  },
  landing: {
    badge: "Ferramenta para desenvolvedores",
    description:
      "Explore o histórico, a atividade, os colaboradores e as mudanças estruturais de qualquer repositório público do GitHub.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analisar repositório",
    tryLabel: "Experimente:",
    supportNote: "Atualmente com suporte a repositórios públicos do GitHub.",
    invalidUrl: "Insira uma URL de repositório público do GitHub válida, por exemplo, https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analisando repositório",
    steps: {
      fetching_repo: "Buscando repositório...",
      analyzing_commits: "Analisando histórico de commits...",
      analyzing_contributors: "Analisando colaboradores...",
      building_timeline: "Construindo linha do tempo...",
      preparing_visualization: "Preparando visualização...",
    },
  },
  error: {
    heading: "Não foi possível analisar este repositório",
    tryAgain: "Tentar novamente",
    connectionError: "Não foi possível contatar o serviço de análise. Verifique sua conexão e tente novamente.",
    streamingUnsupported: "O streaming não é compatível com este ambiente.",
    codes: {
      INVALID_URL:
        "Isso não parece uma URL válida de repositório público do GitHub. Tente algo como https://github.com/vercel/next.js",
      NOT_FOUND: "Não foi possível encontrar esse repositório. Verifique o proprietário e o nome do repositório e tente novamente.",
      PRIVATE_REPOSITORY:
        "Este repositório parece ser privado ou inacessível. O Welwitschia só oferece suporte a repositórios públicos.",
      RATE_LIMITED:
        "O limite de requisições da API do GitHub foi atingido ao analisar este repositório. Tente novamente em alguns minutos.",
      NO_COMMIT_DATA: "Este repositório ainda não possui histórico de commits para analisar.",
      UPSTREAM_ERROR: "O GitHub retornou um erro inesperado ao coletar os dados. Tente novamente em breve.",
      TIMEOUT: "A análise demorou demais para concluir. Tente novamente ou use um repositório menor.",
      NETWORK_ERROR: "Não foi possível contatar o GitHub. Verifique sua conexão e tente novamente.",
    },
  },
  overview: {
    stars: "Estrelas",
    forks: "Forks",
    contributors: "Colaboradores",
    analyzedCommits: "Commits analisados",
    analyzedFiles: "Arquivos analisados",
    created: "Criado em",
    defaultBranch: "Branch padrão: {branch}",
    lastUpdated: "Última atualização {date}",
  },
  timeline: {
    title: "Linha do tempo de evolução",
    description:
      "Atividade de commits ao longo da história do repositório. Clique em um período para ver detalhes — barras em âmbar foram marcadas como incomumente ativas.",
    noData: "Não havia histórico de commits disponível para construir uma linha do tempo para este repositório.",
    tooltipSignificant: "Atividade significativa detectada",
  },
  periodDetail: {
    significantBadge: "Atividade significativa do repositório detectada",
    commits: "Commits",
    contributors: "Colaboradores",
    filesChanged: "Arquivos alterados",
    linesChanged: "Linhas alteradas",
    activityCompared: "Atividade {percent} em comparação com {period}",
    mostChangedDirectories: "Diretórios mais alterados",
    mostChangedFiles: "Arquivos mais alterados",
    noSampledChanges: "Nenhuma alteração amostrada neste período.",
    explainButton: "Explicar este período",
    thinking: "Pensando...",
    explainUnavailable: "A explicação por IA não está disponível no momento.",
  },
  heatmap: {
    title: "Mapa de calor de atividade",
    description: "Uma visão mês a mês da intensidade de desenvolvimento — períodos calmos versus picos de desenvolvimento.",
    hoverHint: "Passe o mouse sobre uma célula para ver detalhes",
    quiet: "Calmo",
    intense: "Intenso",
  },
  architectureMoments: {
    title: "Momentos de arquitetura",
    description:
      "Períodos em que a atividade foi incomumente alta em comparação com o histórico ao redor, com base em uma comparação simples baseada em regras — não um registro confirmado do que mudou.",
    noneDetected: "Nenhum período incomumente ativo foi detectado na amostra analisada.",
  },
  signalLabels: {
    elevated_commits: "Volume elevado de commits",
    contributor_surge: "Aumento de colaboradores",
    large_churn: "Alta rotatividade de código",
  },
  signals: {
    elevated_commits: "A atividade de commits ficou cerca de {percent}% acima da média recente.",
    contributor_surge: "O número de colaboradores ativos aumentou cerca de {percent}% em relação à média recente.",
    large_churn: "As linhas adicionadas e removidas ficaram cerca de {percent}% acima da média recente.",
  },
  mostChangedFiles: {
    title: "Arquivos mais alterados",
    description: "Os arquivos mais alterados na amostra de commits analisada. Selecione um arquivo para mais detalhes.",
    noData: "Não havia dados no nível de arquivo disponíveis na amostra analisada.",
    contributors: "Colaboradores",
    firstObserved: "Primeira observação",
    lastObserved: "Última observação",
  },
  codebaseHeatmap: {
    title: "Mapa de calor do código",
    description: "Quais partes deste código recebem mais atividade de desenvolvimento? Blocos maiores e mais claros mudaram com mais frequência.",
    noData: "Não havia dados no nível de diretório disponíveis na amostra analisada.",
    hoverHint: "Passe o mouse sobre um bloco para ver detalhes",
    otherCount: "Outros ({count})",
  },
  contributorEvolution: {
    title: "Evolução dos colaboradores",
    description:
      "Como a atividade dos colaboradores mudou ao longo da história do repositório, com base na amostra de commits analisada. Ordenado pelo volume de commits amostrado, não um ranking da qualidade das contribuições.",
    noData: "Não havia atividade de colaboradores disponível para análise.",
  },
  fileSurvival: {
    title: "Sobrevivência de arquivos",
    description:
      "Arquivos observados como ativos pelo período mais longo da amostra de commits analisada — um indicador de código duradouro e fundamental.",
    noData: "Não havia dados no nível de arquivo disponíveis na amostra analisada.",
    age: "Idade",
    changes: "Alterações",
    firstObserved: "Primeira observação",
    lastChanged: "Última alteração",
  },
  footer: {
    summary: "Foram analisados {count}{partial}. Os dados refletem uma amostra representativa do histórico do repositório, não uma varredura completa.",
    partialSuffix: " em {sampled} de {total} páginas de histórico",
  },
  units: {
    commit: { one: "commit", other: "commits" },
    change: { one: "alteração", other: "alterações" },
    contributor: { one: "colaborador", other: "colaboradores" },
  },
};

export default pt;
