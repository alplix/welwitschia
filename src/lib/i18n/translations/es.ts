import type { Dictionary } from "../types";

const es: Dictionary = {
  common: {
    tagline: "Descubre cómo evoluciona un código.",
    viewOnGithub: "Ver en GitHub",
    backToHome: "Volver al inicio",
    close: "Cerrar",
    refresh: "Actualizar",
    loadedFromCache: "Cargado desde caché",
    codedBy: "Programado por Alperen Yavuz",
    language: "Idioma",
  },
  landing: {
    badge: "Herramienta para desarrolladores",
    description:
      "Explora la historia, actividad, colaboradores y cambios estructurales de cualquier repositorio público de GitHub.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analizar repositorio",
    tryLabel: "Probar:",
    supportNote: "Actualmente admite repositorios públicos de GitHub.",
    invalidUrl: "Introduce una URL de repositorio público de GitHub válida, p. ej. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analizando repositorio",
    steps: {
      fetching_repo: "Obteniendo repositorio...",
      analyzing_commits: "Analizando historial de commits...",
      analyzing_contributors: "Analizando colaboradores...",
      building_timeline: "Construyendo cronología...",
      preparing_visualization: "Preparando visualización...",
    },
  },
  error: {
    heading: "No se pudo analizar este repositorio",
    tryAgain: "Reintentar",
    connectionError: "No se pudo contactar con el servicio de análisis. Comprueba tu conexión e inténtalo de nuevo.",
    streamingUnsupported: "El streaming no es compatible en este entorno.",
    codes: {
      INVALID_URL:
        "Eso no parece una URL de repositorio público de GitHub válida. Prueba algo como https://github.com/vercel/next.js",
      NOT_FOUND: "No se pudo encontrar ese repositorio. Comprueba el propietario y el nombre del repositorio e inténtalo de nuevo.",
      PRIVATE_REPOSITORY:
        "Este repositorio parece ser privado o inaccesible. Welwitschia solo admite repositorios públicos.",
      RATE_LIMITED:
        "Se alcanzó el límite de solicitudes de la API de GitHub al analizar este repositorio. Inténtalo de nuevo en unos minutos.",
      NO_COMMIT_DATA: "Este repositorio todavía no tiene historial de commits para analizar.",
      UPSTREAM_ERROR: "GitHub devolvió un error inesperado al recopilar los datos. Inténtalo de nuevo en breve.",
      TIMEOUT: "El análisis tardó demasiado en completarse. Inténtalo de nuevo, o prueba con un repositorio más pequeño.",
      NETWORK_ERROR: "No se pudo contactar con GitHub. Comprueba tu conexión e inténtalo de nuevo.",
    },
  },
  overview: {
    stars: "Estrellas",
    forks: "Forks",
    contributors: "Colaboradores",
    analyzedCommits: "Commits analizados",
    analyzedFiles: "Archivos analizados",
    created: "Creado",
    defaultBranch: "Rama predeterminada: {branch}",
    lastUpdated: "Última actualización {date}",
  },
  timeline: {
    title: "Cronología de evolución",
    description:
      "Actividad de commits a lo largo de la historia del repositorio. Haz clic en un periodo para ver detalles — las barras en ámbar se marcaron como inusualmente activas.",
    noData: "No había historial de commits disponible para construir una cronología de este repositorio.",
    tooltipSignificant: "Actividad significativa detectada",
  },
  periodDetail: {
    significantBadge: "Actividad significativa del repositorio detectada",
    commits: "Commits",
    contributors: "Colaboradores",
    filesChanged: "Archivos modificados",
    linesChanged: "Líneas modificadas",
    activityCompared: "Actividad {percent} en comparación con {period}",
    mostChangedDirectories: "Directorios más modificados",
    mostChangedFiles: "Archivos más modificados",
    noSampledChanges: "No hay cambios muestreados en este periodo.",
    explainButton: "Explicar este periodo",
    thinking: "Pensando...",
    explainUnavailable: "La explicación de IA no está disponible en este momento.",
  },
  heatmap: {
    title: "Mapa de calor de actividad",
    description: "Una vista mes a mes de la intensidad de desarrollo — periodos tranquilos frente a ráfagas de desarrollo.",
    hoverHint: "Pasa el cursor sobre una celda para ver detalles",
    quiet: "Tranquilo",
    intense: "Intenso",
  },
  architectureMoments: {
    title: "Momentos de arquitectura",
    description:
      "Periodos en los que la actividad fue inusualmente alta en comparación con la historia circundante, según una simple comparación basada en reglas — no un registro confirmado de lo que cambió.",
    noneDetected: "No se detectaron periodos inusualmente activos en la muestra analizada.",
  },
  signalLabels: {
    elevated_commits: "Volumen de commits elevado",
    contributor_surge: "Aumento de colaboradores",
    large_churn: "Alta rotación de código",
  },
  signals: {
    elevated_commits: "La actividad de commits fue aproximadamente un {percent}% superior a la media reciente.",
    contributor_surge: "El número de colaboradores activos aumentó aproximadamente un {percent}% respecto a la media reciente.",
    large_churn: "Las líneas añadidas y eliminadas fueron aproximadamente un {percent}% superiores a la media reciente.",
  },
  mostChangedFiles: {
    title: "Archivos más modificados",
    description: "Los archivos modificados con más frecuencia en la muestra de commits analizada. Selecciona un archivo para más detalles.",
    noData: "No había datos a nivel de archivo disponibles en la muestra analizada.",
    contributors: "Colaboradores",
    firstObserved: "Primera observación",
    lastObserved: "Última observación",
  },
  codebaseHeatmap: {
    title: "Mapa de calor del código",
    description: "¿Qué partes de este código reciben más actividad de desarrollo? Los bloques más grandes y brillantes cambiaron con más frecuencia.",
    noData: "No había datos a nivel de directorio disponibles en la muestra analizada.",
    hoverHint: "Pasa el cursor sobre un bloque para ver detalles",
    otherCount: "Otros ({count})",
  },
  contributorEvolution: {
    title: "Evolución de colaboradores",
    description:
      "Cómo ha cambiado la actividad de los colaboradores a lo largo de la historia del repositorio, según la muestra de commits analizada. Ordenado por volumen de commits muestreado, no es una clasificación de la calidad de las contribuciones.",
    noData: "No había actividad de colaboradores disponible para analizar.",
  },
  fileSurvival: {
    title: "Supervivencia de archivos",
    description:
      "Archivos observados como activos durante el periodo más largo de la muestra de commits analizada — un indicador de código duradero y fundamental.",
    noData: "No había datos a nivel de archivo disponibles en la muestra analizada.",
    age: "Antigüedad",
    changes: "Cambios",
    firstObserved: "Primera observación",
    lastChanged: "Última modificación",
  },
  footer: {
    summary: "Se analizaron {count}{partial}. Los datos reflejan una muestra representativa del historial del repositorio, no un análisis completo.",
    partialSuffix: " en {sampled} de {total} páginas de historial",
  },
  units: {
    commit: { one: "commit", other: "commits" },
    change: { one: "cambio", other: "cambios" },
    contributor: { one: "colaborador", other: "colaboradores" },
  },
};

export default es;
