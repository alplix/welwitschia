import type { Dictionary } from "../types";

const nl: Dictionary = {
  common: {
    tagline: "Zie hoe een codebase evolueert.",
    viewOnGithub: "Bekijk op GitHub",
    backToHome: "Terug naar start",
    close: "Sluiten",
    refresh: "Vernieuwen",
    loadedFromCache: "Geladen uit cache",
    codedBy: "Gecodeerd door Alperen Yavuz",
    language: "Taal",
  },
  landing: {
    badge: "Ontwikkelaarstool",
    description:
      "Verken de geschiedenis, activiteit, bijdragers en structurele wijzigingen van elke openbare GitHub-repository.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Repository analyseren",
    tryLabel: "Probeer:",
    supportNote: "Ondersteunt momenteel openbare GitHub-repositories.",
    invalidUrl: "Voer een geldige openbare GitHub-repository-URL in, bijv. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Repository wordt geanalyseerd",
    steps: {
      fetching_repo: "Repository ophalen...",
      analyzing_commits: "Commitgeschiedenis analyseren...",
      analyzing_contributors: "Bijdragers analyseren...",
      building_timeline: "Tijdlijn opbouwen...",
      preparing_visualization: "Visualisatie voorbereiden...",
    },
  },
  error: {
    heading: "Deze repository kon niet worden geanalyseerd",
    tryAgain: "Opnieuw proberen",
    connectionError: "De analysedienst kon niet worden bereikt. Controleer je verbinding en probeer het opnieuw.",
    streamingUnsupported: "Streaming wordt niet ondersteund in deze omgeving.",
    codes: {
      INVALID_URL:
        "Dat lijkt geen geldige openbare GitHub-repository-URL. Probeer bijvoorbeeld https://github.com/vercel/next.js",
      NOT_FOUND: "Die repository is niet gevonden. Controleer de eigenaar en de repositorynaam en probeer het opnieuw.",
      PRIVATE_REPOSITORY:
        "Deze repository lijkt privé of ontoegankelijk te zijn. Welwitschia ondersteunt alleen openbare repositories.",
      RATE_LIMITED:
        "De API-snelheidslimiet van GitHub is bereikt tijdens het analyseren van deze repository. Probeer het over een paar minuten opnieuw.",
      NO_COMMIT_DATA: "Deze repository heeft nog geen commitgeschiedenis om te analyseren.",
      UPSTREAM_ERROR: "GitHub gaf een onverwachte fout terug tijdens het verzamelen van gegevens. Probeer het zo weer.",
      TIMEOUT: "De analyse duurde te lang. Probeer het opnieuw, of probeer een kleinere repository.",
      NETWORK_ERROR: "GitHub kon niet worden bereikt. Controleer je verbinding en probeer het opnieuw.",
    },
  },
  overview: {
    stars: "Sterren",
    forks: "Forks",
    contributors: "Bijdragers",
    analyzedCommits: "Geanalyseerde commits",
    analyzedFiles: "Geanalyseerde bestanden",
    created: "Aangemaakt",
    defaultBranch: "Standaardbranch: {branch}",
    lastUpdated: "Laatst bijgewerkt {date}",
  },
  timeline: {
    title: "Evolutietijdlijn",
    description:
      "Commitactiviteit gedurende de geschiedenis van de repository. Klik op een periode voor details — amberkleurige balken zijn gemarkeerd als ongewoon actief.",
    noData: "Er was geen commitgeschiedenis beschikbaar om een tijdlijn voor deze repository te bouwen.",
    tooltipSignificant: "Aanzienlijke activiteit gedetecteerd",
  },
  periodDetail: {
    significantBadge: "Aanzienlijke repository-activiteit gedetecteerd",
    commits: "Commits",
    contributors: "Bijdragers",
    filesChanged: "Gewijzigde bestanden",
    linesChanged: "Gewijzigde regels",
    activityCompared: "Activiteit {percent} vergeleken met {period}",
    mostChangedDirectories: "Meest gewijzigde mappen",
    mostChangedFiles: "Meest gewijzigde bestanden",
    noSampledChanges: "Geen bemonsterde wijzigingen in deze periode.",
    explainButton: "Leg deze periode uit",
    thinking: "Aan het nadenken...",
    explainUnavailable: "De AI-uitleg is momenteel niet beschikbaar.",
  },
  heatmap: {
    title: "Activiteitenheatmap",
    description: "Een maandelijks overzicht van ontwikkelingsintensiteit — rustige periodes versus ontwikkelingspieken.",
    hoverHint: "Beweeg over een cel voor details",
    quiet: "Rustig",
    intense: "Intens",
  },
  architectureMoments: {
    title: "Architectuurmomenten",
    description:
      "Periodes waarin de activiteit ongewoon hoog was vergeleken met de omringende geschiedenis, gebaseerd op een eenvoudige regelgebaseerde vergelijking — geen bevestigd verslag van wat er is veranderd.",
    noneDetected: "Er zijn geen ongewoon actieve periodes gedetecteerd in de geanalyseerde steekproef.",
  },
  signalLabels: {
    elevated_commits: "Verhoogd commitvolume",
    contributor_surge: "Toename van bijdragers",
    large_churn: "Grote codeomloop",
  },
  signals: {
    elevated_commits: "De commitactiviteit lag ongeveer {percent}% boven het recente gemiddelde.",
    contributor_surge: "Het aantal actieve bijdragers steeg met ongeveer {percent}% ten opzichte van het recente gemiddelde.",
    large_churn: "Toegevoegde en verwijderde regels lagen ongeveer {percent}% boven het recente gemiddelde.",
  },
  mostChangedFiles: {
    title: "Meest gewijzigde bestanden",
    description: "De bestanden die het vaakst zijn gewijzigd in de geanalyseerde commitsteekproef. Selecteer een bestand voor meer details.",
    noData: "Er waren geen gegevens op bestandsniveau beschikbaar in de geanalyseerde steekproef.",
    contributors: "Bijdragers",
    firstObserved: "Eerst waargenomen",
    lastObserved: "Laatst waargenomen",
  },
  codebaseHeatmap: {
    title: "Codebase-heatmap",
    description: "Welke delen van deze codebase krijgen de meeste ontwikkelactiviteit? Grotere, helderdere blokken zijn vaker gewijzigd.",
    noData: "Er waren geen gegevens op mapniveau beschikbaar in de geanalyseerde steekproef.",
    hoverHint: "Beweeg over een blok voor details",
    otherCount: "Overige ({count})",
  },
  contributorEvolution: {
    title: "Evolutie van bijdragers",
    description:
      "Hoe de activiteit van bijdragers is verschoven doorheen de geschiedenis van de repository, gebaseerd op de geanalyseerde commitsteekproef. Gesorteerd op bemonsterd commitvolume, geen rangschikking van bijdragekwaliteit.",
    noData: "Er was geen activiteit van bijdragers beschikbaar om te analyseren.",
  },
  fileSurvival: {
    title: "Bestandsoverleving",
    description:
      "Bestanden die actief werden waargenomen gedurende de langste periode van de geanalyseerde commitsteekproef — een indicatie van langlevende, fundamentele code.",
    noData: "Er waren geen gegevens op bestandsniveau beschikbaar in de geanalyseerde steekproef.",
    age: "Leeftijd",
    changes: "Wijzigingen",
    firstObserved: "Eerst waargenomen",
    lastChanged: "Laatst gewijzigd",
  },
  footer: {
    summary: "{count} zijn geanalyseerd{partial}. De gegevens weerspiegelen een representatieve steekproef van de repositorygeschiedenis, geen volledige scan.",
    partialSuffix: " over {sampled} van {total} geschiedenispagina's",
  },
  units: {
    commit: { one: "commit", other: "commits" },
    change: { one: "wijziging", other: "wijzigingen" },
    contributor: { one: "bijdrager", other: "bijdragers" },
  },
};

export default nl;
