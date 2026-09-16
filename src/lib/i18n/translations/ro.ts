import type { Dictionary } from "../types";

const ro: Dictionary = {
  common: {
    tagline: "Vezi cum evoluează o bază de cod.",
    viewOnGithub: "Vezi pe GitHub",
    backToHome: "Înapoi la pagina principală",
    close: "Închide",
    refresh: "Reîmprospătare",
    loadedFromCache: "Încărcat din cache",
    codedBy: "Programat de Alperen Yavuz",
    language: "Limbă",
  },
  landing: {
    badge: "Instrument pentru dezvoltatori",
    description:
      "Explorează istoricul, activitatea, colaboratorii și schimbările structurale ale oricărui repository public de GitHub.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analizează repository",
    tryLabel: "Încearcă:",
    supportNote: "În prezent, sunt acceptate doar repository-uri publice de GitHub.",
    invalidUrl: "Introdu o adresă URL validă a unui repository public de GitHub, de ex. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Se analizează repository-ul",
    steps: {
      fetching_repo: "Se preia repository-ul...",
      analyzing_commits: "Se analizează istoricul commit-urilor...",
      analyzing_contributors: "Se analizează colaboratorii...",
      building_timeline: "Se construiește cronologia...",
      preparing_visualization: "Se pregătește vizualizarea...",
    },
  },
  error: {
    heading: "Acest repository nu a putut fi analizat",
    tryAgain: "Încearcă din nou",
    connectionError: "Serviciul de analiză nu a putut fi contactat. Verifică-ți conexiunea și încearcă din nou.",
    streamingUnsupported: "Streaming-ul nu este acceptat în acest mediu.",
    codes: {
      INVALID_URL:
        "Aceasta nu pare a fi o adresă URL validă a unui repository public de GitHub. Încearcă ceva de genul https://github.com/vercel/next.js",
      NOT_FOUND: "Acest repository nu a putut fi găsit. Verifică proprietarul și numele repository-ului și încearcă din nou.",
      PRIVATE_REPOSITORY:
        "Acest repository pare a fi privat sau inaccesibil. Welwitschia acceptă doar repository-uri publice.",
      RATE_LIMITED:
        "Limita de solicitări a API-ului GitHub a fost atinsă în timpul analizei acestui repository. Încearcă din nou în câteva minute.",
      NO_COMMIT_DATA: "Acest repository nu are încă un istoric de commit-uri de analizat.",
      UPSTREAM_ERROR: "GitHub a returnat o eroare neașteptată în timpul colectării datelor. Încearcă din nou în curând.",
      TIMEOUT: "Analiza a durat prea mult. Încearcă din nou sau încearcă un repository mai mic.",
      NETWORK_ERROR: "GitHub nu a putut fi contactat. Verifică-ți conexiunea și încearcă din nou.",
    },
  },
  overview: {
    stars: "Stele",
    forks: "Fork-uri",
    contributors: "Colaboratori",
    analyzedCommits: "Commit-uri analizate",
    analyzedFiles: "Fișiere analizate",
    created: "Creat",
    defaultBranch: "Ramură implicită: {branch}",
    lastUpdated: "Ultima actualizare {date}",
  },
  timeline: {
    title: "Cronologia evoluției",
    description:
      "Activitatea commit-urilor de-a lungul istoriei repository-ului. Fă clic pe o perioadă pentru detalii — barele chihlimbarii au fost marcate ca fiind neobișnuit de active.",
    noData: "Nu a fost disponibil niciun istoric de commit-uri pentru a construi o cronologie pentru acest repository.",
    tooltipSignificant: "S-a detectat activitate semnificativă",
  },
  periodDetail: {
    significantBadge: "S-a detectat activitate semnificativă a repository-ului",
    commits: "Commit-uri",
    contributors: "Colaboratori",
    filesChanged: "Fișiere modificate",
    linesChanged: "Linii modificate",
    activityCompared: "Activitate {percent} comparativ cu {period}",
    mostChangedDirectories: "Cele mai modificate directoare",
    mostChangedFiles: "Cele mai modificate fișiere",
    noSampledChanges: "Nu există modificări eșantionate în această perioadă.",
    explainButton: "Explică această perioadă",
    thinking: "Se analizează...",
    explainUnavailable: "Explicația AI nu este disponibilă momentan.",
  },
  heatmap: {
    title: "Hartă termică a activității",
    description: "O vedere lunară a intensității dezvoltării — perioade liniștite comparativ cu explozii de dezvoltare.",
    hoverHint: "Treci cu mouse-ul peste o celulă pentru detalii",
    quiet: "Liniștit",
    intense: "Intens",
  },
  architectureMoments: {
    title: "Momente de arhitectură",
    description:
      "Perioade în care activitatea a fost neobișnuit de ridicată comparativ cu istoricul înconjurător, pe baza unei comparații simple bazate pe reguli — nu o înregistrare confirmată a ceea ce s-a schimbat.",
    noneDetected: "Nu au fost detectate perioade neobișnuit de active în eșantionul analizat.",
  },
  signalLabels: {
    elevated_commits: "Volum ridicat de commit-uri",
    contributor_surge: "Creștere a colaboratorilor",
    large_churn: "Fluctuație mare de cod",
  },
  signals: {
    elevated_commits: "Activitatea commit-urilor a fost cu aproximativ {percent}% peste media recentă.",
    contributor_surge: "Numărul colaboratorilor activi a crescut cu aproximativ {percent}% față de media recentă.",
    large_churn: "Liniile adăugate și eliminate au fost cu aproximativ {percent}% peste media recentă.",
  },
  mostChangedFiles: {
    title: "Cele mai modificate fișiere",
    description: "Fișierele modificate cel mai des în eșantionul de commit-uri analizat. Selectează un fișier pentru mai multe detalii.",
    noData: "Nu au existat date la nivel de fișier disponibile în eșantionul analizat.",
    contributors: "Colaboratori",
    firstObserved: "Prima observare",
    lastObserved: "Ultima observare",
  },
  codebaseHeatmap: {
    title: "Harta termică a bazei de cod",
    description: "Ce părți ale acestei baze de cod primesc cea mai multă activitate de dezvoltare? Blocurile mai mari și mai luminoase s-au schimbat mai des.",
    noData: "Nu au existat date la nivel de director disponibile în eșantionul analizat.",
    hoverHint: "Treci cu mouse-ul peste un bloc pentru detalii",
    otherCount: "Altele ({count})",
  },
  contributorEvolution: {
    title: "Evoluția colaboratorilor",
    description:
      "Cum s-a schimbat activitatea colaboratorilor de-a lungul istoriei repository-ului, pe baza eșantionului de commit-uri analizat. Sortat după volumul de commit-uri eșantionat, nu o clasificare a calității contribuțiilor.",
    noData: "Nu a existat activitate a colaboratorilor disponibilă pentru analiză.",
  },
  fileSurvival: {
    title: "Longevitatea fișierelor",
    description:
      "Fișiere observate ca active pe cea mai lungă perioadă din eșantionul de commit-uri analizat — un indiciu al codului durabil și fundamental.",
    noData: "Nu au existat date la nivel de fișier disponibile în eșantionul analizat.",
    age: "Vechime",
    changes: "Modificări",
    firstObserved: "Prima observare",
    lastChanged: "Ultima modificare",
  },
  footer: {
    summary: "Au fost analizate {count}{partial}. Datele reflectă un eșantion reprezentativ al istoricului repository-ului, nu o scanare completă.",
    partialSuffix: " pe {sampled} din {total} pagini de istoric",
  },
  units: {
    commit: { one: "commit", few: "commit-uri", other: "de commit-uri" },
    change: { one: "modificare", few: "modificări", other: "de modificări" },
    contributor: { one: "colaborator", few: "colaboratori", other: "de colaboratori" },
  },
};

export default ro;
