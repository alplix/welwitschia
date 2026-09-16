import type { Dictionary } from "../types";

const fi: Dictionary = {
  common: {
    tagline: "Katso, miten koodikanta kehittyy.",
    viewOnGithub: "Näytä GitHubissa",
    backToHome: "Takaisin etusivulle",
    close: "Sulje",
    refresh: "Päivitä",
    loadedFromCache: "Ladattu välimuistista",
    codedBy: "Koodannut Alperen Yavuz",
    language: "Kieli",
  },
  landing: {
    badge: "Kehittäjätyökalu",
    description:
      "Tutki minkä tahansa julkisen GitHub-repositorion historiaa, aktiivisuutta, tekijöitä ja rakenteellisia muutoksia.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Analysoi repositorio",
    tryLabel: "Kokeile:",
    supportNote: "Tukee tällä hetkellä julkisia GitHub-repositorioita.",
    invalidUrl: "Anna kelvollinen julkisen GitHub-repositorion URL, esim. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Analysoidaan repositoriota",
    steps: {
      fetching_repo: "Haetaan repositoriota...",
      analyzing_commits: "Analysoidaan commit-historiaa...",
      analyzing_contributors: "Analysoidaan tekijöitä...",
      building_timeline: "Rakennetaan aikajanaa...",
      preparing_visualization: "Valmistellaan visualisointia...",
    },
  },
  error: {
    heading: "Tämän repositorion analysointi epäonnistui",
    tryAgain: "Yritä uudelleen",
    connectionError: "Analysointipalveluun ei saatu yhteyttä. Tarkista yhteytesi ja yritä uudelleen.",
    streamingUnsupported: "Suoratoisto ei ole tuettu tässä ympäristössä.",
    codes: {
      INVALID_URL:
        "Tämä ei vaikuta kelvolliselta julkisen GitHub-repositorion URL-osoitteelta. Kokeile esimerkiksi https://github.com/vercel/next.js",
      NOT_FOUND: "Kyseistä repositoriota ei löytynyt. Tarkista omistaja ja repositorion nimi ja yritä uudelleen.",
      PRIVATE_REPOSITORY:
        "Tämä repositorio vaikuttaa olevan yksityinen tai ei saatavilla. Welwitschia tukee vain julkisia repositorioita.",
      RATE_LIMITED:
        "GitHubin API-käyttörajoitus saavutettiin tätä repositoriota analysoitaessa. Yritä uudelleen muutaman minuutin kuluttua.",
      NO_COMMIT_DATA: "Tällä repositoriolla ei vielä ole commit-historiaa analysoitavaksi.",
      UPSTREAM_ERROR: "GitHub palautti odottamattoman virheen tietoja kerättäessä. Yritä pian uudelleen.",
      TIMEOUT: "Analyysi kesti liian kauan. Yritä uudelleen tai kokeile pienempää repositoriota.",
      NETWORK_ERROR: "GitHubiin ei saatu yhteyttä. Tarkista yhteytesi ja yritä uudelleen.",
    },
  },
  overview: {
    stars: "Tähdet",
    forks: "Forkit",
    contributors: "Tekijät",
    analyzedCommits: "Analysoidut commitit",
    analyzedFiles: "Analysoidut tiedostot",
    created: "Luotu",
    defaultBranch: "Oletushaara: {branch}",
    lastUpdated: "Viimeksi päivitetty {date}",
  },
  timeline: {
    title: "Kehityksen aikajana",
    description:
      "Commit-aktiivisuus repositorion historian aikana. Napsauta ajanjaksoa nähdäksesi tiedot — meripihkanväriset palkit on merkitty epätavallisen aktiivisiksi.",
    noData: "Tälle repositoriolle ei ollut saatavilla commit-historiaa aikajanan rakentamiseksi.",
    tooltipSignificant: "Merkittävää aktiivisuutta havaittu",
  },
  periodDetail: {
    significantBadge: "Merkittävää repositorion aktiivisuutta havaittu",
    commits: "Commitit",
    contributors: "Tekijät",
    filesChanged: "Muutetut tiedostot",
    linesChanged: "Muutetut rivit",
    activityCompared: "Aktiivisuus {percent} verrattuna ajanjaksoon {period}",
    mostChangedDirectories: "Eniten muutetut hakemistot",
    mostChangedFiles: "Eniten muutetut tiedostot",
    noSampledChanges: "Ei otettuja muutoksia tällä ajanjaksolla.",
    explainButton: "Selitä tämä ajanjakso",
    thinking: "Analysoidaan...",
    explainUnavailable: "Tekoälyn selitys ei ole juuri nyt saatavilla.",
  },
  heatmap: {
    title: "Aktiivisuuden lämpökartta",
    description: "Kuukausittainen näkymä kehitystoiminnan intensiteettiin — rauhalliset jaksot verrattuna kehityspyrähdyksiin.",
    hoverHint: "Vie hiiri solun päälle nähdäksesi tiedot",
    quiet: "Rauhallinen",
    intense: "Intensiivinen",
  },
  architectureMoments: {
    title: "Arkkitehtuurihetket",
    description:
      "Ajanjaksot, joina aktiivisuus oli epätavallisen korkealla verrattuna ympäröivään historiaan, yksinkertaisen sääntöpohjaisen vertailun perusteella — ei vahvistettu tallenne siitä, mikä muuttui.",
    noneDetected: "Analysoidussa otoksessa ei havaittu epätavallisen aktiivisia ajanjaksoja.",
  },
  signalLabels: {
    elevated_commits: "Kohonnut commit-määrä",
    contributor_surge: "Tekijöiden määrän kasvu",
    large_churn: "Suuri koodin vaihtuvuus",
  },
  signals: {
    elevated_commits: "Commit-aktiivisuus oli noin {percent}% viimeaikaista keskiarvoa korkeampi.",
    contributor_surge: "Aktiivisten tekijöiden määrä kasvoi noin {percent}% verrattuna viimeaikaiseen keskiarvoon.",
    large_churn: "Lisätyt ja poistetut rivit olivat noin {percent}% viimeaikaista keskiarvoa korkeammat.",
  },
  mostChangedFiles: {
    title: "Eniten muutetut tiedostot",
    description: "Analysoidussa commit-otoksessa useimmin muutetut tiedostot. Valitse tiedosto nähdäksesi lisätietoja.",
    noData: "Analysoidussa otoksessa ei ollut tiedostotason tietoja saatavilla.",
    contributors: "Tekijät",
    firstObserved: "Ensin havaittu",
    lastObserved: "Viimeksi havaittu",
  },
  codebaseHeatmap: {
    title: "Koodikannan lämpökartta",
    description: "Mitkä osat tästä koodikannasta saavat eniten kehitystoimintaa? Suuremmat, kirkkaammat lohkot muuttuivat useammin.",
    noData: "Analysoidussa otoksessa ei ollut hakemistotason tietoja saatavilla.",
    hoverHint: "Vie hiiri lohkon päälle nähdäksesi tiedot",
    otherCount: "Muut ({count})",
  },
  contributorEvolution: {
    title: "Tekijöiden kehitys",
    description:
      "Miten tekijöiden aktiivisuus on muuttunut repositorion historian aikana, analysoidun commit-otoksen perusteella. Järjestetty otetun commit-määrän mukaan, ei panoksen laadun mukaan.",
    noData: "Tekijöiden aktiivisuutta ei ollut saatavilla analysoitavaksi.",
  },
  fileSurvival: {
    title: "Tiedostojen elinikä",
    description:
      "Tiedostot, jotka havaittiin aktiivisina analysoidun commit-otoksen pisimmän ajanjakson aikana — osoitus pitkäikäisestä, perustavanlaatuisesta koodista.",
    noData: "Analysoidussa otoksessa ei ollut tiedostotason tietoja saatavilla.",
    age: "Ikä",
    changes: "Muutokset",
    firstObserved: "Ensin havaittu",
    lastChanged: "Viimeksi muutettu",
  },
  footer: {
    summary: "{count} analysoitiin{partial}. Tiedot kuvastavat edustavaa otosta repositorion historiasta, ei täydellistä skannausta.",
    partialSuffix: " {sampled}/{total} historiasivulta",
  },
  units: {
    commit: { one: "commit", other: "commitia" },
    change: { one: "muutos", other: "muutosta" },
    contributor: { one: "tekijä", other: "tekijää" },
  },
};

export default fi;
