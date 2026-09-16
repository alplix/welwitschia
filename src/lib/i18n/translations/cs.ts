import type { Dictionary } from "../types";

const cs: Dictionary = {
  common: {
    tagline: "Podívejte se, jak se vyvíjí codebase.",
    viewOnGithub: "Zobrazit na GitHubu",
    backToHome: "Zpět na domovskou stránku",
    close: "Zavřít",
    refresh: "Obnovit",
    loadedFromCache: "Načteno z mezipaměti",
    codedBy: "Naprogramoval Alperen Yavuz",
    language: "Jazyk",
  },
  landing: {
    badge: "Nástroj pro vývojáře",
    description:
      "Prozkoumejte historii, aktivitu, přispěvatele a strukturální změny libovolného veřejného GitHub repozitáře.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analyzovat repozitář",
    tryLabel: "Vyzkoušet:",
    supportNote: "Aktuálně podporuje veřejné GitHub repozitáře.",
    invalidUrl: "Zadejte platnou URL veřejného GitHub repozitáře, např. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analyzuje se repozitář",
    steps: {
      fetching_repo: "Načítání repozitáře...",
      analyzing_commits: "Analýza historie commitů...",
      analyzing_contributors: "Analýza přispěvatelů...",
      building_timeline: "Sestavování časové osy...",
      preparing_visualization: "Příprava vizualizace...",
    },
  },
  error: {
    heading: "Tento repozitář se nepodařilo analyzovat",
    tryAgain: "Zkusit znovu",
    connectionError: "Nepodařilo se připojit ke službě analýzy. Zkontrolujte připojení a zkuste to znovu.",
    streamingUnsupported: "Streamování není v tomto prostředí podporováno.",
    codes: {
      INVALID_URL:
        "Nevypadá to jako platná URL veřejného GitHub repozitáře. Zkuste například https://github.com/vercel/next.js",
      NOT_FOUND: "Tento repozitář se nepodařilo najít. Zkontrolujte vlastníka a název repozitáře a zkuste to znovu.",
      PRIVATE_REPOSITORY:
        "Zdá se, že tento repozitář je soukromý nebo nedostupný. Welwitschia podporuje pouze veřejné repozitáře.",
      RATE_LIMITED:
        "Při analýze tohoto repozitáře bylo dosaženo limitu požadavků na API GitHubu. Zkuste to prosím za pár minut znovu.",
      NO_COMMIT_DATA: "Tento repozitář zatím nemá žádnou historii commitů k analýze.",
      UPSTREAM_ERROR: "GitHub při shromažďování dat vrátil neočekávanou chybu. Zkuste to prosím brzy znovu.",
      TIMEOUT: "Analýza trvala příliš dlouho. Zkuste to znovu, nebo vyzkoušejte menší repozitář.",
      NETWORK_ERROR: "Nepodařilo se připojit ke GitHubu. Zkontrolujte připojení a zkuste to znovu.",
    },
  },
  overview: {
    stars: "Hvězdy",
    forks: "Forky",
    contributors: "Přispěvatelé",
    analyzedCommits: "Analyzované commity",
    analyzedFiles: "Analyzované soubory",
    created: "Vytvořeno",
    defaultBranch: "Výchozí větev: {branch}",
    lastUpdated: "Naposledy aktualizováno {date}",
  },
  timeline: {
    title: "Časová osa vývoje",
    description:
      "Aktivita commitů v historii repozitáře. Klikněte na období pro podrobnosti — jantarově zbarvené sloupce byly označeny jako neobvykle aktivní.",
    noData: "Pro tento repozitář nebyla k dispozici žádná historie commitů pro sestavení časové osy.",
    tooltipSignificant: "Zjištěna významná aktivita",
  },
  periodDetail: {
    significantBadge: "Zjištěna významná aktivita repozitáře",
    commits: "Commity",
    contributors: "Přispěvatelé",
    filesChanged: "Změněné soubory",
    linesChanged: "Změněné řádky",
    activityCompared: "Aktivita {percent} ve srovnání s obdobím {period}",
    mostChangedDirectories: "Nejčastěji měněné adresáře",
    mostChangedFiles: "Nejčastěji měněné soubory",
    noSampledChanges: "V tomto období nejsou žádné vzorkované změny.",
    explainButton: "Vysvětlit toto období",
    thinking: "Přemýšlím...",
    explainUnavailable: "Vysvětlení od AI momentálně není k dispozici.",
  },
  heatmap: {
    title: "Tepelná mapa aktivity",
    description: "Měsíční pohled na intenzitu vývoje — klidná období oproti nárazům vývoje.",
    hoverHint: "Najeďte na buňku pro podrobnosti",
    quiet: "Klidné",
    intense: "Intenzivní",
  },
  architectureMoments: {
    title: "Architektonické momenty",
    description:
      "Období, kdy byla aktivita neobvykle vysoká ve srovnání s okolní historií, na základě jednoduchého porovnání podle pravidel — nikoli potvrzený záznam toho, co se změnilo.",
    noneDetected: "V analyzovaném vzorku nebyla zjištěna žádná neobvykle aktivní období.",
  },
  signalLabels: {
    elevated_commits: "Zvýšený objem commitů",
    contributor_surge: "Nárůst přispěvatelů",
    large_churn: "Velká fluktuace kódu",
  },
  signals: {
    elevated_commits: "Aktivita commitů byla přibližně o {percent}% vyšší než nedávný průměr.",
    contributor_surge: "Počet aktivních přispěvatelů vzrostl přibližně o {percent}% oproti nedávnému průměru.",
    large_churn: "Přidané a odebrané řádky byly přibližně o {percent}% vyšší než nedávný průměr.",
  },
  mostChangedFiles: {
    title: "Nejčastěji měněné soubory",
    description: "Soubory, které byly nejčastěji měněny v analyzovaném vzorku commitů. Vyberte soubor pro více podrobností.",
    noData: "V analyzovaném vzorku nebyla k dispozici žádná data na úrovni souborů.",
    contributors: "Přispěvatelé",
    firstObserved: "Poprvé zaznamenáno",
    lastObserved: "Naposledy zaznamenáno",
  },
  codebaseHeatmap: {
    title: "Tepelná mapa codebase",
    description: "Které části této codebase mají nejvíce vývojové aktivity? Větší, jasnější bloky se měnily častěji.",
    noData: "V analyzovaném vzorku nebyla k dispozici žádná data na úrovni adresářů.",
    hoverHint: "Najeďte na blok pro podrobnosti",
    otherCount: "Ostatní ({count})",
  },
  contributorEvolution: {
    title: "Vývoj přispěvatelů",
    description:
      "Jak se aktivita přispěvatelů měnila v historii repozitáře, na základě analyzovaného vzorku commitů. Seřazeno podle vzorkovaného objemu commitů, nikoli podle kvality příspěvků.",
    noData: "Nebyla k dispozici žádná aktivita přispěvatelů k analýze.",
  },
  fileSurvival: {
    title: "Přežití souborů",
    description:
      "Soubory pozorované jako aktivní po nejdelší dobu analyzovaného vzorku commitů — ukazatel dlouhodobého, základního kódu.",
    noData: "V analyzovaném vzorku nebyla k dispozici žádná data na úrovni souborů.",
    age: "Stáří",
    changes: "Změny",
    firstObserved: "Poprvé zaznamenáno",
    lastChanged: "Naposledy změněno",
  },
  footer: {
    summary: "Bylo analyzováno {count}{partial}. Data odrážejí reprezentativní vzorek historie repozitáře, nikoli úplné skenování.",
    partialSuffix: " na {sampled} z {total} stránek historie",
  },
  units: {
    commit: { one: "commit", few: "commity", many: "commitu", other: "commitů" },
    change: { one: "změna", few: "změny", many: "změny", other: "změn" },
    contributor: { one: "přispěvatel", few: "přispěvatelé", many: "přispěvatele", other: "přispěvatelů" },
  },
};

export default cs;
