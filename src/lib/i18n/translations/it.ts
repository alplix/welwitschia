import type { Dictionary } from "../types";

const it: Dictionary = {
  common: {
    tagline: "Scopri come si evolve un codebase.",
    viewOnGithub: "Vedi su GitHub",
    backToHome: "Torna alla home",
    close: "Chiudi",
    refresh: "Aggiorna",
    loadedFromCache: "Caricato dalla cache",
    codedBy: "Sviluppato da Alperen Yavuz",
    language: "Lingua",
  },
  landing: {
    badge: "Strumento per sviluppatori",
    description:
      "Esplora la storia, l'attività, i collaboratori e i cambiamenti strutturali di qualsiasi repository pubblico di GitHub.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analizza repository",
    tryLabel: "Prova:",
    supportNote: "Attualmente supporta repository pubblici di GitHub.",
    invalidUrl: "Inserisci un URL valido di un repository pubblico di GitHub, ad es. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analisi del repository in corso",
    steps: {
      fetching_repo: "Recupero del repository...",
      analyzing_commits: "Analisi della cronologia dei commit...",
      analyzing_contributors: "Analisi dei collaboratori...",
      building_timeline: "Creazione della cronologia...",
      preparing_visualization: "Preparazione della visualizzazione...",
    },
  },
  error: {
    heading: "Impossibile analizzare questo repository",
    tryAgain: "Riprova",
    connectionError: "Impossibile raggiungere il servizio di analisi. Controlla la connessione e riprova.",
    streamingUnsupported: "Lo streaming non è supportato in questo ambiente.",
    codes: {
      INVALID_URL:
        "Non sembra un URL valido di un repository pubblico di GitHub. Prova qualcosa come https://github.com/vercel/next.js",
      NOT_FOUND: "Impossibile trovare quel repository. Controlla il proprietario e il nome del repository e riprova.",
      PRIVATE_REPOSITORY:
        "Questo repository sembra essere privato o inaccessibile. Welwitschia supporta solo repository pubblici.",
      RATE_LIMITED:
        "È stato raggiunto il limite di richieste dell'API di GitHub durante l'analisi di questo repository. Riprova tra qualche minuto.",
      NO_COMMIT_DATA: "Questo repository non ha ancora una cronologia di commit da analizzare.",
      UPSTREAM_ERROR: "GitHub ha restituito un errore imprevisto durante la raccolta dei dati. Riprova a breve.",
      TIMEOUT: "L'analisi ha impiegato troppo tempo per essere completata. Riprova, oppure prova un repository più piccolo.",
      NETWORK_ERROR: "Impossibile raggiungere GitHub. Controlla la connessione e riprova.",
    },
  },
  overview: {
    stars: "Stelle",
    forks: "Fork",
    contributors: "Collaboratori",
    analyzedCommits: "Commit analizzati",
    analyzedFiles: "File analizzati",
    created: "Creato",
    defaultBranch: "Branch predefinito: {branch}",
    lastUpdated: "Ultimo aggiornamento {date}",
  },
  timeline: {
    title: "Cronologia dell'evoluzione",
    description:
      "Attività dei commit nella storia del repository. Fai clic su un periodo per i dettagli — le barre in ambra sono state segnalate come insolitamente attive.",
    noData: "Non era disponibile alcuna cronologia di commit per costruire una cronologia per questo repository.",
    tooltipSignificant: "Attività significativa rilevata",
  },
  periodDetail: {
    significantBadge: "Attività significativa del repository rilevata",
    commits: "Commit",
    contributors: "Collaboratori",
    filesChanged: "File modificati",
    linesChanged: "Righe modificate",
    activityCompared: "Attività {percent} rispetto a {period}",
    mostChangedDirectories: "Directory più modificate",
    mostChangedFiles: "File più modificati",
    noSampledChanges: "Nessuna modifica campionata in questo periodo.",
    explainButton: "Spiega questo periodo",
    thinking: "Sto elaborando...",
    explainUnavailable: "La spiegazione dell'IA non è al momento disponibile.",
  },
  heatmap: {
    title: "Mappa di calore dell'attività",
    description: "Una vista mese per mese dell'intensità di sviluppo — periodi tranquilli rispetto a picchi di sviluppo.",
    hoverHint: "Passa il mouse su una cella per i dettagli",
    quiet: "Tranquillo",
    intense: "Intenso",
  },
  architectureMoments: {
    title: "Momenti architetturali",
    description:
      "Periodi in cui l'attività è stata insolitamente alta rispetto alla storia circostante, in base a un semplice confronto basato su regole — non un resoconto confermato di ciò che è cambiato.",
    noneDetected: "Non sono stati rilevati periodi insolitamente attivi nel campione analizzato.",
  },
  signalLabels: {
    elevated_commits: "Volume di commit elevato",
    contributor_surge: "Aumento dei collaboratori",
    large_churn: "Elevato ricambio del codice",
  },
  signals: {
    elevated_commits: "L'attività di commit era circa il {percent}% superiore alla media recente.",
    contributor_surge: "Il numero di collaboratori attivi è aumentato di circa il {percent}% rispetto alla media recente.",
    large_churn: "Le righe aggiunte e rimosse erano circa il {percent}% superiori alla media recente.",
  },
  mostChangedFiles: {
    title: "File più modificati",
    description: "I file modificati più spesso nel campione di commit analizzato. Seleziona un file per maggiori dettagli.",
    noData: "Non erano disponibili dati a livello di file nel campione analizzato.",
    contributors: "Collaboratori",
    firstObserved: "Prima osservazione",
    lastObserved: "Ultima osservazione",
  },
  codebaseHeatmap: {
    title: "Mappa di calore del codebase",
    description: "Quali parti di questo codebase ricevono più attività di sviluppo? I blocchi più grandi e luminosi sono cambiati più spesso.",
    noData: "Non erano disponibili dati a livello di directory nel campione analizzato.",
    hoverHint: "Passa il mouse su un blocco per i dettagli",
    otherCount: "Altri ({count})",
  },
  contributorEvolution: {
    title: "Evoluzione dei collaboratori",
    description:
      "Come è cambiata l'attività dei collaboratori nella storia del repository, in base al campione di commit analizzato. Ordinato per volume di commit campionato, non una classifica della qualità dei contributi.",
    noData: "Non era disponibile alcuna attività dei collaboratori da analizzare.",
  },
  fileSurvival: {
    title: "Sopravvivenza dei file",
    description:
      "File osservati come attivi per il periodo più lungo del campione di commit analizzato — un indicatore di codice duraturo e fondamentale.",
    noData: "Non erano disponibili dati a livello di file nel campione analizzato.",
    age: "Età",
    changes: "Modifiche",
    firstObserved: "Prima osservazione",
    lastChanged: "Ultima modifica",
  },
  footer: {
    summary: "Sono stati analizzati {count}{partial}. I dati riflettono un campione rappresentativo della storia del repository, non una scansione completa.",
    partialSuffix: " su {sampled} di {total} pagine di cronologia",
  },
  units: {
    commit: { one: "commit", other: "commit" },
    change: { one: "modifica", other: "modifiche" },
    contributor: { one: "collaboratore", other: "collaboratori" },
  },
};

export default it;
