import type { Dictionary } from "../types";

const sv: Dictionary = {
  common: {
    tagline: "Se hur en kodbas utvecklas.",
    viewOnGithub: "Visa på GitHub",
    backToHome: "Tillbaka till startsidan",
    close: "Stäng",
    refresh: "Uppdatera",
    loadedFromCache: "Laddad från cache",
    codedBy: "Kodat av Alperen Yavuz",
    language: "Språk",
  },
  landing: {
    badge: "Utvecklarverktyg",
    description:
      "Utforska historik, aktivitet, bidragsgivare och strukturella förändringar för alla offentliga GitHub-repositorier.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analysera repository",
    tryLabel: "Prova:",
    supportNote: "Stöder för närvarande offentliga GitHub-repositorier.",
    invalidUrl: "Ange en giltig URL till ett offentligt GitHub-repository, t.ex. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analyserar repository",
    steps: {
      fetching_repo: "Hämtar repository...",
      analyzing_commits: "Analyserar commit-historik...",
      analyzing_contributors: "Analyserar bidragsgivare...",
      building_timeline: "Bygger tidslinje...",
      preparing_visualization: "Förbereder visualisering...",
    },
  },
  error: {
    heading: "Kunde inte analysera detta repository",
    tryAgain: "Försök igen",
    connectionError: "Kunde inte nå analystjänsten. Kontrollera din anslutning och försök igen.",
    streamingUnsupported: "Streaming stöds inte i den här miljön.",
    codes: {
      INVALID_URL:
        "Det ser inte ut som en giltig URL till ett offentligt GitHub-repository. Prova något i stil med https://github.com/vercel/next.js",
      NOT_FOUND: "Det gick inte att hitta det repositoryt. Kontrollera ägare och repository-namn och försök igen.",
      PRIVATE_REPOSITORY:
        "Det här repositoryt verkar vara privat eller otillgängligt. Welwitschia stöder endast offentliga repositorier.",
      RATE_LIMITED:
        "GitHubs API-gräns nåddes vid analys av detta repository. Försök igen om några minuter.",
      NO_COMMIT_DATA: "Det här repositoryt har ännu ingen commit-historik att analysera.",
      UPSTREAM_ERROR: "GitHub returnerade ett oväntat fel vid datainsamling. Försök igen strax.",
      TIMEOUT: "Analysen tog för lång tid. Försök igen, eller prova ett mindre repository.",
      NETWORK_ERROR: "Kunde inte nå GitHub. Kontrollera din anslutning och försök igen.",
    },
  },
  overview: {
    stars: "Stjärnor",
    forks: "Forkar",
    contributors: "Bidragsgivare",
    analyzedCommits: "Analyserade commits",
    analyzedFiles: "Analyserade filer",
    created: "Skapad",
    defaultBranch: "Standardgren: {branch}",
    lastUpdated: "Senast uppdaterad {date}",
  },
  timeline: {
    title: "Utvecklingstidslinje",
    description:
      "Commit-aktivitet genom repositoryts historia. Klicka på en period för detaljer — bärnstensfärgade staplar har flaggats som ovanligt aktiva.",
    noData: "Ingen commit-historik fanns tillgänglig för att bygga en tidslinje för detta repository.",
    tooltipSignificant: "Betydande aktivitet upptäckt",
  },
  periodDetail: {
    significantBadge: "Betydande repository-aktivitet upptäckt",
    commits: "Commits",
    contributors: "Bidragsgivare",
    filesChanged: "Ändrade filer",
    linesChanged: "Ändrade rader",
    activityCompared: "Aktivitet {percent} jämfört med {period}",
    mostChangedDirectories: "Mest ändrade mappar",
    mostChangedFiles: "Mest ändrade filer",
    noSampledChanges: "Inga samplade ändringar under denna period.",
    explainButton: "Förklara denna period",
    thinking: "Tänker...",
    explainUnavailable: "AI-förklaringen är inte tillgänglig just nu.",
  },
  heatmap: {
    title: "Aktivitetsvärmekarta",
    description: "En månad-för-månad-vy av utvecklingsintensitet — lugna perioder jämfört med utvecklingsskurar.",
    hoverHint: "Håll muspekaren över en cell för detaljer",
    quiet: "Lugnt",
    intense: "Intensivt",
  },
  architectureMoments: {
    title: "Arkitektoniska ögonblick",
    description:
      "Perioder där aktiviteten var ovanligt hög jämfört med den omgivande historiken, baserat på en enkel regelbaserad jämförelse — inte en bekräftad redogörelse för vad som ändrades.",
    noneDetected: "Inga ovanligt aktiva perioder upptäcktes i det analyserade urvalet.",
  },
  signalLabels: {
    elevated_commits: "Förhöjd commit-volym",
    contributor_surge: "Ökning av bidragsgivare",
    large_churn: "Stor kodomsättning",
  },
  signals: {
    elevated_commits: "Commit-aktiviteten låg ungefär {percent}% över det senaste genomsnittet.",
    contributor_surge: "Antalet aktiva bidragsgivare ökade med ungefär {percent}% jämfört med det senaste genomsnittet.",
    large_churn: "Tillagda och borttagna rader låg ungefär {percent}% över det senaste genomsnittet.",
  },
  mostChangedFiles: {
    title: "Mest ändrade filer",
    description: "Filerna som ändrats oftast i det analyserade commit-urvalet. Välj en fil för mer information.",
    noData: "Ingen data på filnivå fanns tillgänglig i det analyserade urvalet.",
    contributors: "Bidragsgivare",
    firstObserved: "Först observerad",
    lastObserved: "Senast observerad",
  },
  codebaseHeatmap: {
    title: "Kodbas-värmekarta",
    description: "Vilka delar av den här kodbasen får mest utvecklingsaktivitet? Större, ljusare block ändrades oftare.",
    noData: "Ingen data på mappnivå fanns tillgänglig i det analyserade urvalet.",
    hoverHint: "Håll muspekaren över ett block för detaljer",
    otherCount: "Övriga ({count})",
  },
  contributorEvolution: {
    title: "Bidragsgivarnas utveckling",
    description:
      "Hur bidragsgivarnas aktivitet har förändrats genom repositoryts historia, baserat på det analyserade commit-urvalet. Sorterat efter samplad commit-volym, ingen rangordning av bidragskvalitet.",
    noData: "Ingen bidragsgivaraktivitet fanns tillgänglig att analysera.",
  },
  fileSurvival: {
    title: "Filöverlevnad",
    description:
      "Filer som observerats som aktiva under den längsta perioden i det analyserade commit-urvalet — en indikator på långlivad, grundläggande kod.",
    noData: "Ingen data på filnivå fanns tillgänglig i det analyserade urvalet.",
    age: "Ålder",
    changes: "Ändringar",
    firstObserved: "Först observerad",
    lastChanged: "Senast ändrad",
  },
  footer: {
    summary: "{count} har analyserats{partial}. Data speglar ett representativt urval av repositoryts historik, ingen fullständig genomsökning.",
    partialSuffix: " över {sampled} av {total} historiksidor",
  },
  units: {
    commit: { one: "commit", other: "commits" },
    change: { one: "ändring", other: "ändringar" },
    contributor: { one: "bidragsgivare", other: "bidragsgivare" },
  },
};

export default sv;
