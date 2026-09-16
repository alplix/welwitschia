import type { Dictionary } from "../types";

const fr: Dictionary = {
  common: {
    tagline: "Découvrez comment un code évolue.",
    viewOnGithub: "Voir sur GitHub",
    backToHome: "Retour à l'accueil",
    close: "Fermer",
    refresh: "Actualiser",
    loadedFromCache: "Chargé depuis le cache",
    codedBy: "Codé par Alperen Yavuz",
    language: "Langue",
  },
  landing: {
    badge: "Outil pour développeurs",
    description:
      "Explorez l'historique, l'activité, les contributeurs et les changements structurels de tout dépôt GitHub public.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analyser le dépôt",
    tryLabel: "Essayer :",
    supportNote: "Prend actuellement en charge les dépôts GitHub publics.",
    invalidUrl: "Saisissez une URL de dépôt GitHub public valide, par ex. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analyse du dépôt en cours",
    steps: {
      fetching_repo: "Récupération du dépôt...",
      analyzing_commits: "Analyse de l'historique des commits...",
      analyzing_contributors: "Analyse des contributeurs...",
      building_timeline: "Construction de la chronologie...",
      preparing_visualization: "Préparation de la visualisation...",
    },
  },
  error: {
    heading: "Impossible d'analyser ce dépôt",
    tryAgain: "Réessayer",
    connectionError: "Impossible de contacter le service d'analyse. Vérifiez votre connexion et réessayez.",
    streamingUnsupported: "Le streaming n'est pas pris en charge dans cet environnement.",
    codes: {
      INVALID_URL:
        "Cela ne ressemble pas à une URL de dépôt GitHub public valide. Essayez par exemple https://github.com/vercel/next.js",
      NOT_FOUND: "Ce dépôt est introuvable. Vérifiez le propriétaire et le nom du dépôt, puis réessayez.",
      PRIVATE_REPOSITORY:
        "Ce dépôt semble être privé ou inaccessible. Welwitschia ne prend en charge que les dépôts publics.",
      RATE_LIMITED:
        "La limite de requêtes de l'API GitHub a été atteinte lors de l'analyse de ce dépôt. Veuillez réessayer dans quelques minutes.",
      NO_COMMIT_DATA: "Ce dépôt n'a pas encore d'historique de commits à analyser.",
      UPSTREAM_ERROR: "GitHub a renvoyé une erreur inattendue lors de la collecte des données. Veuillez réessayer sous peu.",
      TIMEOUT: "L'analyse a pris trop de temps. Réessayez, ou essayez un dépôt plus petit.",
      NETWORK_ERROR: "Impossible de contacter GitHub. Vérifiez votre connexion et réessayez.",
    },
  },
  overview: {
    stars: "Étoiles",
    forks: "Forks",
    contributors: "Contributeurs",
    analyzedCommits: "Commits analysés",
    analyzedFiles: "Fichiers analysés",
    created: "Créé le",
    defaultBranch: "Branche par défaut : {branch}",
    lastUpdated: "Dernière mise à jour {date}",
  },
  timeline: {
    title: "Chronologie de l'évolution",
    description:
      "Activité des commits sur l'histoire du dépôt. Cliquez sur une période pour plus de détails — les barres ambrées ont été signalées comme inhabituellement actives.",
    noData: "Aucun historique de commits n'était disponible pour construire une chronologie pour ce dépôt.",
    tooltipSignificant: "Activité significative détectée",
  },
  periodDetail: {
    significantBadge: "Activité significative du dépôt détectée",
    commits: "Commits",
    contributors: "Contributeurs",
    filesChanged: "Fichiers modifiés",
    linesChanged: "Lignes modifiées",
    activityCompared: "Activité {percent} par rapport à {period}",
    mostChangedDirectories: "Répertoires les plus modifiés",
    mostChangedFiles: "Fichiers les plus modifiés",
    noSampledChanges: "Aucun changement échantillonné pour cette période.",
    explainButton: "Expliquer cette période",
    thinking: "Analyse en cours...",
    explainUnavailable: "L'explication par IA n'est pas disponible pour le moment.",
  },
  heatmap: {
    title: "Carte thermique d'activité",
    description: "Une vue mois par mois de l'intensité de développement — périodes calmes contre pics d'activité.",
    hoverHint: "Survolez une cellule pour plus de détails",
    quiet: "Calme",
    intense: "Intense",
  },
  architectureMoments: {
    title: "Moments d'architecture",
    description:
      "Périodes où l'activité était inhabituellement élevée par rapport à l'historique environnant, selon une simple comparaison basée sur des règles — pas une preuve confirmée de ce qui a changé.",
    noneDetected: "Aucune période inhabituellement active n'a été détectée dans l'échantillon analysé.",
  },
  signalLabels: {
    elevated_commits: "Volume de commits élevé",
    contributor_surge: "Afflux de contributeurs",
    large_churn: "Fort taux de changement du code",
  },
  signals: {
    elevated_commits: "L'activité de commits était environ {percent}% au-dessus de la moyenne récente.",
    contributor_surge: "Le nombre de contributeurs actifs a augmenté d'environ {percent}% par rapport à la moyenne récente.",
    large_churn: "Les lignes ajoutées et supprimées étaient environ {percent}% au-dessus de la moyenne récente.",
  },
  mostChangedFiles: {
    title: "Fichiers les plus modifiés",
    description: "Les fichiers les plus souvent modifiés dans l'échantillon de commits analysé. Sélectionnez un fichier pour plus de détails.",
    noData: "Aucune donnée au niveau des fichiers n'était disponible dans l'échantillon analysé.",
    contributors: "Contributeurs",
    firstObserved: "Première observation",
    lastObserved: "Dernière observation",
  },
  codebaseHeatmap: {
    title: "Carte thermique du code",
    description: "Quelles parties de ce code reçoivent le plus d'activité de développement ? Les blocs plus grands et plus clairs changent plus souvent.",
    noData: "Aucune donnée au niveau des répertoires n'était disponible dans l'échantillon analysé.",
    hoverHint: "Survolez un bloc pour plus de détails",
    otherCount: "Autres ({count})",
  },
  contributorEvolution: {
    title: "Évolution des contributeurs",
    description:
      "Comment l'activité des contributeurs a évolué au fil de l'histoire du dépôt, selon l'échantillon de commits analysé. Trié par volume de commits échantillonné, pas un classement de la qualité des contributions.",
    noData: "Aucune activité de contributeur n'était disponible à analyser.",
  },
  fileSurvival: {
    title: "Longévité des fichiers",
    description:
      "Fichiers observés comme actifs sur la plus longue période de l'échantillon de commits analysé — un indicateur de code durable et fondamental.",
    noData: "Aucune donnée au niveau des fichiers n'était disponible dans l'échantillon analysé.",
    age: "Âge",
    changes: "Changements",
    firstObserved: "Première observation",
    lastChanged: "Dernière modification",
  },
  footer: {
    summary: "{count} ont été analysés{partial}. Les données reflètent un échantillon représentatif de l'historique du dépôt, pas une analyse complète.",
    partialSuffix: " sur {sampled} des {total} pages d'historique",
  },
  units: {
    commit: { one: "commit", other: "commits" },
    change: { one: "changement", other: "changements" },
    contributor: { one: "contributeur", other: "contributeurs" },
  },
};

export default fr;
