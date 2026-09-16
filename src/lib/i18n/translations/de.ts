import type { Dictionary } from "../types";

const de: Dictionary = {
  common: {
    tagline: "Sieh, wie sich eine Codebasis entwickelt.",
    viewOnGithub: "Auf GitHub ansehen",
    backToHome: "Zurück zur Startseite",
    close: "Schließen",
    refresh: "Aktualisieren",
    loadedFromCache: "Aus dem Cache geladen",
    codedBy: "Programmiert von Alperen Yavuz",
    language: "Sprache",
  },
  landing: {
    badge: "Entwickler-Tool",
    description:
      "Erkunde die Geschichte, Aktivität, Mitwirkenden und strukturellen Änderungen jedes öffentlichen GitHub-Repositorys.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Repository analysieren",
    tryLabel: "Ausprobieren:",
    supportNote: "Unterstützt derzeit öffentliche GitHub-Repositorys.",
    invalidUrl: "Gib eine gültige öffentliche GitHub-Repository-URL ein, z. B. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Repository wird analysiert",
    steps: {
      fetching_repo: "Repository wird abgerufen...",
      analyzing_commits: "Commit-Verlauf wird analysiert...",
      analyzing_contributors: "Mitwirkende werden analysiert...",
      building_timeline: "Zeitachse wird erstellt...",
      preparing_visualization: "Visualisierung wird vorbereitet...",
    },
  },
  error: {
    heading: "Dieses Repository konnte nicht analysiert werden",
    tryAgain: "Erneut versuchen",
    connectionError: "Der Analysedienst konnte nicht erreicht werden. Prüfe deine Verbindung und versuche es erneut.",
    streamingUnsupported: "Streaming wird in dieser Umgebung nicht unterstützt.",
    codes: {
      INVALID_URL:
        "Das sieht nicht wie eine gültige öffentliche GitHub-Repository-URL aus. Versuche z. B. https://github.com/vercel/next.js",
      NOT_FOUND: "Dieses Repository wurde nicht gefunden. Prüfe Besitzer und Repository-Namen und versuche es erneut.",
      PRIVATE_REPOSITORY:
        "Dieses Repository scheint privat oder nicht zugänglich zu sein. Welwitschia unterstützt nur öffentliche Repositorys.",
      RATE_LIMITED:
        "Das API-Ratenlimit von GitHub wurde bei der Analyse dieses Repositorys erreicht. Bitte versuche es in einigen Minuten erneut.",
      NO_COMMIT_DATA: "Dieses Repository hat noch keinen Commit-Verlauf, der analysiert werden könnte.",
      UPSTREAM_ERROR: "GitHub hat beim Abrufen der Daten einen unerwarteten Fehler zurückgegeben. Bitte versuche es in Kürze erneut.",
      TIMEOUT: "Die Analyse hat zu lange gedauert. Bitte versuche es erneut oder wähle ein kleineres Repository.",
      NETWORK_ERROR: "GitHub konnte nicht erreicht werden. Prüfe deine Verbindung und versuche es erneut.",
    },
  },
  overview: {
    stars: "Sterne",
    forks: "Forks",
    contributors: "Mitwirkende",
    analyzedCommits: "Analysierte Commits",
    analyzedFiles: "Analysierte Dateien",
    created: "Erstellt",
    defaultBranch: "Standard-Branch: {branch}",
    lastUpdated: "Zuletzt aktualisiert {date}",
  },
  timeline: {
    title: "Entwicklungs-Zeitachse",
    description:
      "Commit-Aktivität über die Geschichte des Repositorys. Klicke auf einen Zeitraum für Details — bernsteinfarbene Balken wurden als ungewöhnlich aktiv markiert.",
    noData: "Für dieses Repository war kein Commit-Verlauf verfügbar, um eine Zeitachse zu erstellen.",
    tooltipSignificant: "Signifikante Aktivität erkannt",
  },
  periodDetail: {
    significantBadge: "Signifikante Repository-Aktivität erkannt",
    commits: "Commits",
    contributors: "Mitwirkende",
    filesChanged: "Geänderte Dateien",
    linesChanged: "Geänderte Zeilen",
    activityCompared: "Aktivität {percent} im Vergleich zu {period}",
    mostChangedDirectories: "Am häufigsten geänderte Verzeichnisse",
    mostChangedFiles: "Am häufigsten geänderte Dateien",
    noSampledChanges: "Keine erfassten Änderungen in diesem Zeitraum.",
    explainButton: "Diesen Zeitraum erklären",
    thinking: "Wird analysiert...",
    explainUnavailable: "Die KI-Erklärung ist derzeit nicht verfügbar.",
  },
  heatmap: {
    title: "Aktivitäts-Heatmap",
    description: "Eine monatliche Ansicht der Entwicklungsintensität — ruhige Phasen im Vergleich zu Entwicklungsschüben.",
    hoverHint: "Zelle für Details überfahren",
    quiet: "Ruhig",
    intense: "Intensiv",
  },
  architectureMoments: {
    title: "Architektur-Momente",
    description:
      "Zeiträume, in denen die Aktivität im Vergleich zur umgebenden Geschichte ungewöhnlich hoch war, basierend auf einem einfachen regelbasierten Vergleich — kein bestätigter Nachweis dessen, was geändert wurde.",
    noneDetected: "In der analysierten Stichprobe wurden keine ungewöhnlich aktiven Zeiträume erkannt.",
  },
  signalLabels: {
    elevated_commits: "Erhöhtes Commit-Volumen",
    contributor_surge: "Anstieg der Mitwirkenden",
    large_churn: "Große Code-Fluktuation",
  },
  signals: {
    elevated_commits: "Die Commit-Aktivität lag etwa {percent}% über dem letzten Durchschnitt.",
    contributor_surge: "Die Anzahl aktiver Mitwirkender stieg um etwa {percent}% im Vergleich zum letzten Durchschnitt.",
    large_churn: "Hinzugefügte und entfernte Zeilen lagen etwa {percent}% über dem letzten Durchschnitt.",
  },
  mostChangedFiles: {
    title: "Am häufigsten geänderte Dateien",
    description: "Die in der analysierten Commit-Stichprobe am häufigsten geänderten Dateien. Wähle eine Datei für mehr Details.",
    noData: "In der analysierten Stichprobe waren keine dateibezogenen Daten verfügbar.",
    contributors: "Mitwirkende",
    firstObserved: "Erstmals beobachtet",
    lastObserved: "Zuletzt beobachtet",
  },
  codebaseHeatmap: {
    title: "Codebasis-Heatmap",
    description: "Welche Teile dieser Codebasis erhalten die meiste Entwicklungsaktivität? Größere, hellere Blöcke änderten sich häufiger.",
    noData: "In der analysierten Stichprobe waren keine verzeichnisbezogenen Daten verfügbar.",
    hoverHint: "Block für Details überfahren",
    otherCount: "Weitere ({count})",
  },
  contributorEvolution: {
    title: "Entwicklung der Mitwirkenden",
    description:
      "Wie sich die Aktivität der Mitwirkenden über die Geschichte des Repositorys verändert hat, basierend auf der analysierten Commit-Stichprobe. Sortiert nach erfasstem Commit-Volumen, keine Bewertung der Beitragsqualität.",
    noData: "Es war keine Mitwirkenden-Aktivität zur Analyse verfügbar.",
  },
  fileSurvival: {
    title: "Datei-Langlebigkeit",
    description:
      "Dateien, die über den längsten Zeitraum der analysierten Commit-Stichprobe als aktiv beobachtet wurden — ein Hinweis auf langlebigen, grundlegenden Code.",
    noData: "In der analysierten Stichprobe waren keine dateibezogenen Daten verfügbar.",
    age: "Alter",
    changes: "Änderungen",
    firstObserved: "Erstmals beobachtet",
    lastChanged: "Zuletzt geändert",
  },
  footer: {
    summary: "{count} wurden analysiert{partial}. Die Daten spiegeln eine repräsentative Stichprobe der Repository-Geschichte wider, keinen vollständigen Scan.",
    partialSuffix: " über {sampled} von {total} Verlaufsseiten",
  },
  units: {
    commit: { one: "Commit", other: "Commits" },
    change: { one: "Änderung", other: "Änderungen" },
    contributor: { one: "Mitwirkender", other: "Mitwirkende" },
  },
};

export default de;
