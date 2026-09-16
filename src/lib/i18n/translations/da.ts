import type { Dictionary } from "../types";

const da: Dictionary = {
  common: {
    tagline: "Se hvordan en kodebase udvikler sig.",
    viewOnGithub: "Se på GitHub",
    backToHome: "Tilbage til forsiden",
    close: "Luk",
    refresh: "Opdater",
    loadedFromCache: "Indlæst fra cache",
    codedBy: "Kodet af Alperen Yavuz",
    language: "Sprog",
  },
  landing: {
    badge: "Udviklerværktøj",
    description:
      "Udforsk historikken, aktiviteten, bidragyderne og de strukturelle ændringer i ethvert offentligt GitHub-repository.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analysér repository",
    tryLabel: "Prøv:",
    supportNote: "Understøtter i øjeblikket offentlige GitHub-repositories.",
    invalidUrl: "Indtast en gyldig URL til et offentligt GitHub-repository, f.eks. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analyserer repository",
    steps: {
      fetching_repo: "Henter repository...",
      analyzing_commits: "Analyserer commit-historik...",
      analyzing_contributors: "Analyserer bidragydere...",
      building_timeline: "Bygger tidslinje...",
      preparing_visualization: "Forbereder visualisering...",
    },
  },
  error: {
    heading: "Kunne ikke analysere dette repository",
    tryAgain: "Prøv igen",
    connectionError: "Kunne ikke kontakte analysetjenesten. Tjek din forbindelse, og prøv igen.",
    streamingUnsupported: "Streaming understøttes ikke i dette miljø.",
    codes: {
      INVALID_URL:
        "Det ligner ikke en gyldig URL til et offentligt GitHub-repository. Prøv f.eks. https://github.com/vercel/next.js",
      NOT_FOUND: "Det repository kunne ikke findes. Tjek ejeren og repository-navnet, og prøv igen.",
      PRIVATE_REPOSITORY:
        "Dette repository ser ud til at være privat eller utilgængeligt. Welwitschia understøtter kun offentlige repositories.",
      RATE_LIMITED:
        "GitHubs API-grænse blev nået under analysen af dette repository. Prøv igen om nogle minutter.",
      NO_COMMIT_DATA: "Dette repository har endnu ikke nogen commit-historik at analysere.",
      UPSTREAM_ERROR: "GitHub returnerede en uventet fejl under indsamling af data. Prøv igen om lidt.",
      TIMEOUT: "Analysen tog for lang tid. Prøv igen, eller prøv et mindre repository.",
      NETWORK_ERROR: "Kunne ikke kontakte GitHub. Tjek din forbindelse, og prøv igen.",
    },
  },
  overview: {
    stars: "Stjerner",
    forks: "Forks",
    contributors: "Bidragydere",
    analyzedCommits: "Analyserede commits",
    analyzedFiles: "Analyserede filer",
    created: "Oprettet",
    defaultBranch: "Standardgren: {branch}",
    lastUpdated: "Senest opdateret {date}",
  },
  timeline: {
    title: "Udviklingstidslinje",
    description:
      "Commit-aktivitet gennem repositoryets historie. Klik på en periode for detaljer — ravfarvede søjler er markeret som usædvanligt aktive.",
    noData: "Ingen commit-historik var tilgængelig til at bygge en tidslinje for dette repository.",
    tooltipSignificant: "Betydelig aktivitet registreret",
  },
  periodDetail: {
    significantBadge: "Betydelig repository-aktivitet registreret",
    commits: "Commits",
    contributors: "Bidragydere",
    filesChanged: "Ændrede filer",
    linesChanged: "Ændrede linjer",
    activityCompared: "Aktivitet {percent} sammenlignet med {period}",
    mostChangedDirectories: "Mest ændrede mapper",
    mostChangedFiles: "Mest ændrede filer",
    noSampledChanges: "Ingen samplede ændringer i denne periode.",
    explainButton: "Forklar denne periode",
    thinking: "Tænker...",
    explainUnavailable: "AI-forklaringen er ikke tilgængelig lige nu.",
  },
  heatmap: {
    title: "Aktivitets-heatmap",
    description: "Et måned-for-måned-overblik over udviklingsintensitet — rolige perioder kontra udviklingsudbrud.",
    hoverHint: "Hold musen over en celle for detaljer",
    quiet: "Roligt",
    intense: "Intenst",
  },
  architectureMoments: {
    title: "Arkitektoniske øjeblikke",
    description:
      "Perioder hvor aktiviteten var usædvanligt høj sammenlignet med den omgivende historik, baseret på en simpel regelbaseret sammenligning — ikke en bekræftet redegørelse for, hvad der ændrede sig.",
    noneDetected: "Der blev ikke fundet usædvanligt aktive perioder i den analyserede stikprøve.",
  },
  signalLabels: {
    elevated_commits: "Forhøjet commit-volumen",
    contributor_surge: "Stigning i bidragydere",
    large_churn: "Stor kodeudskiftning",
  },
  signals: {
    elevated_commits: "Commit-aktiviteten lå cirka {percent}% over det seneste gennemsnit.",
    contributor_surge: "Antallet af aktive bidragydere steg med cirka {percent}% i forhold til det seneste gennemsnit.",
    large_churn: "Tilføjede og fjernede linjer lå cirka {percent}% over det seneste gennemsnit.",
  },
  mostChangedFiles: {
    title: "Mest ændrede filer",
    description: "Filerne der er ændret oftest i den analyserede commit-stikprøve. Vælg en fil for flere detaljer.",
    noData: "Ingen data på filniveau var tilgængelige i den analyserede stikprøve.",
    contributors: "Bidragydere",
    firstObserved: "Først observeret",
    lastObserved: "Sidst observeret",
  },
  codebaseHeatmap: {
    title: "Kodebase-heatmap",
    description: "Hvilke dele af denne kodebase modtager mest udviklingsaktivitet? Større, lysere blokke ændrede sig oftere.",
    noData: "Ingen data på mappeniveau var tilgængelige i den analyserede stikprøve.",
    hoverHint: "Hold musen over en blok for detaljer",
    otherCount: "Andre ({count})",
  },
  contributorEvolution: {
    title: "Bidragydernes udvikling",
    description:
      "Hvordan bidragydernes aktivitet har ændret sig gennem repositoryets historie, baseret på den analyserede commit-stikprøve. Sorteret efter samplet commit-volumen, ikke en rangering af bidragskvalitet.",
    noData: "Ingen bidragyderaktivitet var tilgængelig til analyse.",
  },
  fileSurvival: {
    title: "Filoverlevelse",
    description:
      "Filer observeret som aktive i den længste periode af den analyserede commit-stikprøve — en indikator for langlivet, grundlæggende kode.",
    noData: "Ingen data på filniveau var tilgængelige i den analyserede stikprøve.",
    age: "Alder",
    changes: "Ændringer",
    firstObserved: "Først observeret",
    lastChanged: "Sidst ændret",
  },
  footer: {
    summary: "{count} er analyseret{partial}. Data afspejler en repræsentativ stikprøve af repositoryets historik, ikke en fuldstændig scanning.",
    partialSuffix: " på tværs af {sampled} af {total} historiksider",
  },
  units: {
    commit: { one: "commit", other: "commits" },
    change: { one: "ændring", other: "ændringer" },
    contributor: { one: "bidragyder", other: "bidragydere" },
  },
};

export default da;
