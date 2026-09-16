import type { Dictionary } from "../types";

const pl: Dictionary = {
  common: {
    tagline: "Zobacz, jak rozwija się kod.",
    viewOnGithub: "Zobacz na GitHub",
    backToHome: "Powrót do strony głównej",
    close: "Zamknij",
    refresh: "Odśwież",
    loadedFromCache: "Wczytano z pamięci podręcznej",
    codedBy: "Zaprogramowane przez Alperena Yavuza",
    language: "Język",
  },
  landing: {
    badge: "Narzędzie dla programistów",
    description:
      "Poznaj historię, aktywność, współtwórców i zmiany strukturalne dowolnego publicznego repozytorium GitHub.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analizuj repozytorium",
    tryLabel: "Wypróbuj:",
    supportNote: "Obecnie obsługuje publiczne repozytoria GitHub.",
    invalidUrl: "Wpisz prawidłowy adres URL publicznego repozytorium GitHub, np. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analizowanie repozytorium",
    steps: {
      fetching_repo: "Pobieranie repozytorium...",
      analyzing_commits: "Analizowanie historii commitów...",
      analyzing_contributors: "Analizowanie współtwórców...",
      building_timeline: "Budowanie osi czasu...",
      preparing_visualization: "Przygotowywanie wizualizacji...",
    },
  },
  error: {
    heading: "Nie udało się przeanalizować tego repozytorium",
    tryAgain: "Spróbuj ponownie",
    connectionError: "Nie udało się połączyć z usługą analizy. Sprawdź połączenie i spróbuj ponownie.",
    streamingUnsupported: "Strumieniowanie nie jest obsługiwane w tym środowisku.",
    codes: {
      INVALID_URL:
        "To nie wygląda na prawidłowy adres URL publicznego repozytorium GitHub. Spróbuj np. https://github.com/vercel/next.js",
      NOT_FOUND: "Nie znaleziono tego repozytorium. Sprawdź właściciela i nazwę repozytorium i spróbuj ponownie.",
      PRIVATE_REPOSITORY:
        "To repozytorium wydaje się być prywatne lub niedostępne. Welwitschia obsługuje tylko publiczne repozytoria.",
      RATE_LIMITED:
        "Osiągnięto limit żądań API GitHub podczas analizowania tego repozytorium. Spróbuj ponownie za kilka minut.",
      NO_COMMIT_DATA: "To repozytorium nie ma jeszcze historii commitów do analizy.",
      UPSTREAM_ERROR: "GitHub zwrócił nieoczekiwany błąd podczas zbierania danych. Spróbuj ponownie wkrótce.",
      TIMEOUT: "Analiza trwała zbyt długo. Spróbuj ponownie lub wybierz mniejsze repozytorium.",
      NETWORK_ERROR: "Nie udało się połączyć z GitHub. Sprawdź połączenie i spróbuj ponownie.",
    },
  },
  overview: {
    stars: "Gwiazdki",
    forks: "Forki",
    contributors: "Współtwórcy",
    analyzedCommits: "Przeanalizowane commity",
    analyzedFiles: "Przeanalizowane pliki",
    created: "Utworzono",
    defaultBranch: "Domyślna gałąź: {branch}",
    lastUpdated: "Ostatnia aktualizacja {date}",
  },
  timeline: {
    title: "Oś czasu rozwoju",
    description:
      "Aktywność commitów na przestrzeni historii repozytorium. Kliknij okres, aby zobaczyć szczegóły — bursztynowe słupki oznaczono jako nietypowo aktywne.",
    noData: "Brak historii commitów do zbudowania osi czasu dla tego repozytorium.",
    tooltipSignificant: "Wykryto istotną aktywność",
  },
  periodDetail: {
    significantBadge: "Wykryto istotną aktywność repozytorium",
    commits: "Commity",
    contributors: "Współtwórcy",
    filesChanged: "Zmienione pliki",
    linesChanged: "Zmienione linie",
    activityCompared: "Aktywność {percent} w porównaniu z {period}",
    mostChangedDirectories: "Najczęściej zmieniane katalogi",
    mostChangedFiles: "Najczęściej zmieniane pliki",
    noSampledChanges: "Brak próbkowanych zmian w tym okresie.",
    explainButton: "Wyjaśnij ten okres",
    thinking: "Analizowanie...",
    explainUnavailable: "Wyjaśnienie AI jest obecnie niedostępne.",
  },
  heatmap: {
    title: "Mapa cieplna aktywności",
    description: "Miesięczny widok intensywności rozwoju — spokojne okresy kontra fale intensywnego rozwoju.",
    hoverHint: "Najedź na komórkę, aby zobaczyć szczegóły",
    quiet: "Spokojnie",
    intense: "Intensywnie",
  },
  architectureMoments: {
    title: "Momenty architektoniczne",
    description:
      "Okresy, w których aktywność była nietypowo wysoka w porównaniu z otaczającą historią, na podstawie prostego porównania opartego na regułach — nie potwierdzony zapis tego, co się zmieniło.",
    noneDetected: "W przeanalizowanej próbce nie wykryto nietypowo aktywnych okresów.",
  },
  signalLabels: {
    elevated_commits: "Podwyższona liczba commitów",
    contributor_surge: "Wzrost liczby współtwórców",
    large_churn: "Duża rotacja kodu",
  },
  signals: {
    elevated_commits: "Aktywność commitów była około {percent}% wyższa niż ostatnia średnia.",
    contributor_surge: "Liczba aktywnych współtwórców wzrosła o około {percent}% w porównaniu z ostatnią średnią.",
    large_churn: "Liczba dodanych i usuniętych linii była około {percent}% wyższa niż ostatnia średnia.",
  },
  mostChangedFiles: {
    title: "Najczęściej zmieniane pliki",
    description: "Pliki zmieniane najczęściej w przeanalizowanej próbce commitów. Wybierz plik, aby zobaczyć więcej szczegółów.",
    noData: "Brak danych na poziomie plików w przeanalizowanej próbce.",
    contributors: "Współtwórcy",
    firstObserved: "Pierwsza obserwacja",
    lastObserved: "Ostatnia obserwacja",
  },
  codebaseHeatmap: {
    title: "Mapa cieplna kodu",
    description: "Które części tego kodu otrzymują najwięcej aktywności rozwojowej? Większe, jaśniejsze bloki zmieniały się częściej.",
    noData: "Brak danych na poziomie katalogów w przeanalizowanej próbce.",
    hoverHint: "Najedź na blok, aby zobaczyć szczegóły",
    otherCount: "Pozostałe ({count})",
  },
  contributorEvolution: {
    title: "Ewolucja współtwórców",
    description:
      "Jak zmieniała się aktywność współtwórców na przestrzeni historii repozytorium, na podstawie przeanalizowanej próbki commitów. Posortowane według próbkowanej liczby commitów, nie jest to ranking jakości wkładu.",
    noData: "Brak aktywności współtwórców do przeanalizowania.",
  },
  fileSurvival: {
    title: "Trwałość plików",
    description:
      "Pliki obserwowane jako aktywne przez najdłuższy okres w przeanalizowanej próbce commitów — wskaźnik długowiecznego, fundamentalnego kodu.",
    noData: "Brak danych na poziomie plików w przeanalizowanej próbce.",
    age: "Wiek",
    changes: "Zmiany",
    firstObserved: "Pierwsza obserwacja",
    lastChanged: "Ostatnia zmiana",
  },
  footer: {
    summary: "Przeanalizowano {count}{partial}. Dane odzwierciedlają reprezentatywną próbkę historii repozytorium, a nie pełne skanowanie.",
    partialSuffix: " z {sampled} z {total} stron historii",
  },
  units: {
    commit: { one: "commit", few: "commity", many: "commitów", other: "commita" },
    change: { one: "zmiana", few: "zmiany", many: "zmian", other: "zmiany" },
    contributor: { one: "współtwórca", few: "współtwórców", many: "współtwórców", other: "współtwórcy" },
  },
};

export default pl;
