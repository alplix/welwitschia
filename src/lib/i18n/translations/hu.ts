import type { Dictionary } from "../types";

const hu: Dictionary = {
  common: {
    tagline: "Nézd meg, hogyan fejlődik egy kódbázis.",
    viewOnGithub: "Megtekintés a GitHubon",
    backToHome: "Vissza a főoldalra",
    close: "Bezárás",
    refresh: "Frissítés",
    loadedFromCache: "Gyorsítótárból betöltve",
    codedBy: "Kódolta: Alperen Yavuz",
    language: "Nyelv",
  },
  landing: {
    badge: "Fejlesztői eszköz",
    description:
      "Fedezd fel bármely nyilvános GitHub-tárolónak a történetét, aktivitását, közreműködőit és szerkezeti változásait.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Tároló elemzése",
    tryLabel: "Próbáld ki:",
    supportNote: "Jelenleg csak nyilvános GitHub-tárolókat támogat.",
    invalidUrl: "Adj meg egy érvényes nyilvános GitHub-tároló URL-t, pl. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Tároló elemzése folyamatban",
    steps: {
      fetching_repo: "Tároló lekérése...",
      analyzing_commits: "Commit-előzmények elemzése...",
      analyzing_contributors: "Közreműködők elemzése...",
      building_timeline: "Idővonal összeállítása...",
      preparing_visualization: "Vizualizáció előkészítése...",
    },
  },
  error: {
    heading: "Nem sikerült elemezni ezt a tárolót",
    tryAgain: "Próbáld újra",
    connectionError: "Nem sikerült elérni az elemző szolgáltatást. Ellenőrizd a kapcsolatot, és próbáld újra.",
    streamingUnsupported: "A streamelés nem támogatott ebben a környezetben.",
    codes: {
      INVALID_URL:
        "Ez nem tűnik érvényes nyilvános GitHub-tároló URL-nek. Próbálj ki valami ilyesmit: https://github.com/vercel/next.js",
      NOT_FOUND: "Ez a tároló nem található. Ellenőrizd a tulajdonost és a tároló nevét, majd próbáld újra.",
      PRIVATE_REPOSITORY:
        "Úgy tűnik, ez a tároló privát vagy nem elérhető. A Welwitschia csak nyilvános tárolókat támogat.",
      RATE_LIMITED:
        "A GitHub API kérési korlátja elérve a tároló elemzése közben. Kérjük, próbáld újra néhány perc múlva.",
      NO_COMMIT_DATA: "Ennek a tárolónak még nincs elemezhető commit-előzménye.",
      UPSTREAM_ERROR: "A GitHub váratlan hibát adott vissza az adatgyűjtés során. Kérjük, próbáld újra hamarosan.",
      TIMEOUT: "Az elemzés túl sokáig tartott. Próbáld újra, vagy válassz egy kisebb tárolót.",
      NETWORK_ERROR: "Nem sikerült elérni a GitHubot. Ellenőrizd a kapcsolatot, és próbáld újra.",
    },
  },
  overview: {
    stars: "Csillagok",
    forks: "Forkok",
    contributors: "Közreműködők",
    analyzedCommits: "Elemzett commitok",
    analyzedFiles: "Elemzett fájlok",
    created: "Létrehozva",
    defaultBranch: "Alapértelmezett branch: {branch}",
    lastUpdated: "Utoljára frissítve {date}",
  },
  timeline: {
    title: "Fejlődési idővonal",
    description:
      "Commit-aktivitás a tároló története során. Kattints egy időszakra a részletekért — a borostyánszínű oszlopok szokatlanul aktívként lettek megjelölve.",
    noData: "Ehhez a tárolóhoz nem állt rendelkezésre commit-előzmény az idővonal összeállításához.",
    tooltipSignificant: "Jelentős aktivitás észlelve",
  },
  periodDetail: {
    significantBadge: "Jelentős tárolóaktivitás észlelve",
    commits: "Commitok",
    contributors: "Közreműködők",
    filesChanged: "Módosított fájlok",
    linesChanged: "Módosított sorok",
    activityCompared: "Aktivitás {percent} ehhez képest: {period}",
    mostChangedDirectories: "Leggyakrabban módosított könyvtárak",
    mostChangedFiles: "Leggyakrabban módosított fájlok",
    noSampledChanges: "Ebben az időszakban nincs mintavételezett módosítás.",
    explainButton: "Időszak magyarázata",
    thinking: "Gondolkodom...",
    explainUnavailable: "Az AI-magyarázat jelenleg nem elérhető.",
  },
  heatmap: {
    title: "Aktivitási hőtérkép",
    description: "A fejlesztési intenzitás havi bontású nézete — nyugodt időszakok a fejlesztési fellángolásokkal szemben.",
    hoverHint: "Vidd az egeret egy cellára a részletekért",
    quiet: "Nyugodt",
    intense: "Intenzív",
  },
  architectureMoments: {
    title: "Architektúrai pillanatok",
    description:
      "Időszakok, amikor az aktivitás szokatlanul magas volt a környező történethez képest, egy egyszerű, szabályalapú összehasonlítás alapján — nem megerősített feljegyzés arról, hogy mi változott.",
    noneDetected: "Az elemzett mintában nem észleltünk szokatlanul aktív időszakot.",
  },
  signalLabels: {
    elevated_commits: "Megnövekedett commit-mennyiség",
    contributor_surge: "Közreműködők számának ugrásszerű növekedése",
    large_churn: "Nagymértékű kódváltozás",
  },
  signals: {
    elevated_commits: "A commit-aktivitás körülbelül {percent}%-kal volt magasabb a legutóbbi átlagnál.",
    contributor_surge: "Az aktív közreműködők száma körülbelül {percent}%-kal nőtt a legutóbbi átlaghoz képest.",
    large_churn: "A hozzáadott és eltávolított sorok száma körülbelül {percent}%-kal volt magasabb a legutóbbi átlagnál.",
  },
  mostChangedFiles: {
    title: "Leggyakrabban módosított fájlok",
    description: "Az elemzett commit-mintában leggyakrabban módosított fájlok. Válassz egy fájlt a további részletekért.",
    noData: "Az elemzett mintában nem állt rendelkezésre fájlszintű adat.",
    contributors: "Közreműködők",
    firstObserved: "Első észlelés",
    lastObserved: "Utolsó észlelés",
  },
  codebaseHeatmap: {
    title: "Kódbázis-hőtérkép",
    description: "A kódbázis mely részei kapják a legtöbb fejlesztési aktivitást? A nagyobb, világosabb blokkok gyakrabban változtak.",
    noData: "Az elemzett mintában nem állt rendelkezésre könyvtárszintű adat.",
    hoverHint: "Vidd az egeret egy blokkra a részletekért",
    otherCount: "Egyéb ({count})",
  },
  contributorEvolution: {
    title: "Közreműködők fejlődése",
    description:
      "Hogyan változott a közreműködők aktivitása a tároló története során, az elemzett commit-minta alapján. Mintavételezett commit-mennyiség szerint rendezve, nem a hozzájárulás minőségének rangsora.",
    noData: "Nem állt rendelkezésre elemezhető közreműködői aktivitás.",
  },
  fileSurvival: {
    title: "Fájlok élettartama",
    description:
      "Az elemzett commit-minta leghosszabb időszakában aktívként megfigyelt fájlok — a hosszú élettartamú, alapvető kód mutatója.",
    noData: "Az elemzett mintában nem állt rendelkezésre fájlszintű adat.",
    age: "Kor",
    changes: "Módosítások",
    firstObserved: "Első észlelés",
    lastChanged: "Utolsó módosítás",
  },
  footer: {
    summary: "{count} lett elemezve{partial}. Az adatok a tároló történetének reprezentatív mintáját tükrözik, nem egy teljes átvizsgálást.",
    partialSuffix: " a {total} előzményoldalból {sampled} alapján",
  },
  units: {
    commit: { one: "commit", other: "commit" },
    change: { one: "módosítás", other: "módosítás" },
    contributor: { one: "közreműködő", other: "közreműködő" },
  },
};

export default hu;
