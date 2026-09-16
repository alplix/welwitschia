import type { Dictionary } from "../types";

const tr: Dictionary = {
  common: {
    tagline: "Bir kod tabanının nasıl geliştiğini gör.",
    viewOnGithub: "GitHub'da görüntüle",
    backToHome: "Ana sayfaya dön",
    close: "Kapat",
    refresh: "Yenile",
    loadedFromCache: "Önbellekten yüklendi",
    codedBy: "Alperen Yavuz tarafından kodlandı",
    language: "Dil",
  },
  landing: {
    badge: "Geliştirici aracı",
    description:
      "Herhangi bir herkese açık GitHub deposunun geçmişini, aktivitesini, katkıda bulunanlarını ve yapısal değişikliklerini keşfet.",
    inputPlaceholder: "https://github.com/vercel/next.js",
    analyzeButton: "Depoyu Analiz Et",
    tryLabel: "Dene:",
    supportNote: "Şu anda yalnızca herkese açık GitHub depolarını destekler.",
    invalidUrl: "Geçerli bir herkese açık GitHub depo URL'si gir, örn. https://github.com/vercel/next.js",
  },
  loading: {
    heading: "Depo analiz ediliyor",
    steps: {
      fetching_repo: "Depo alınıyor...",
      analyzing_commits: "Commit geçmişi analiz ediliyor...",
      analyzing_contributors: "Katkıda bulunanlar analiz ediliyor...",
      building_timeline: "Zaman çizelgesi oluşturuluyor...",
      preparing_visualization: "Görselleştirme hazırlanıyor...",
    },
  },
  error: {
    heading: "Bu depo analiz edilemedi",
    tryAgain: "Tekrar dene",
    connectionError: "Analiz servisine ulaşılamadı. Bağlantını kontrol edip tekrar dene.",
    streamingUnsupported: "Bu ortamda akış (streaming) desteklenmiyor.",
    codes: {
      INVALID_URL:
        "Bu geçerli bir herkese açık GitHub depo URL'sine benzemiyor. Örneğin https://github.com/vercel/next.js gibi bir şey dene.",
      NOT_FOUND: "Bu depo bulunamadı. Sahibini ve depo adını kontrol edip tekrar dene.",
      PRIVATE_REPOSITORY:
        "Bu depo özel veya erişilemez görünüyor. Welwitschia yalnızca herkese açık depoları destekler.",
      RATE_LIMITED:
        "Bu depo analiz edilirken GitHub API istek limitine ulaşıldı. Lütfen birkaç dakika sonra tekrar dene.",
      NO_COMMIT_DATA: "Bu deponun henüz analiz edilecek bir commit geçmişi yok.",
      UPSTREAM_ERROR: "Veriler toplanırken GitHub beklenmedik bir hata döndürdü. Lütfen kısa süre sonra tekrar dene.",
      TIMEOUT: "Analiz tamamlanması çok uzun sürdü. Tekrar dene ya da daha küçük bir depo dene.",
      NETWORK_ERROR: "GitHub'a ulaşılamadı. Bağlantını kontrol edip tekrar dene.",
    },
  },
  overview: {
    stars: "Yıldız",
    forks: "Fork",
    contributors: "Katkıda Bulunan",
    analyzedCommits: "Analiz Edilen Commit",
    analyzedFiles: "Analiz Edilen Dosya",
    created: "Oluşturulma",
    defaultBranch: "Varsayılan branch: {branch}",
    lastUpdated: "Son güncelleme {date}",
  },
  timeline: {
    title: "Gelişim Zaman Çizelgesi",
    description:
      "Deponun tarihi boyunca commit aktivitesi. Ayrıntılar için herhangi bir döneme tıkla — amber renkli çubuklar olağandışı derecede aktif olarak işaretlendi.",
    noData: "Bu depo için zaman çizelgesi oluşturacak commit geçmişi bulunamadı.",
    tooltipSignificant: "Önemli aktivite tespit edildi",
  },
  periodDetail: {
    significantBadge: "Önemli depo aktivitesi tespit edildi",
    commits: "Commit",
    contributors: "Katkıda Bulunan",
    filesChanged: "Değişen Dosya",
    linesChanged: "Değişen Satır",
    activityCompared: "Aktivite, {period} dönemine göre {percent}",
    mostChangedDirectories: "En Çok Değişen Klasörler",
    mostChangedFiles: "En Çok Değişen Dosyalar",
    noSampledChanges: "Bu dönemde örneklenen bir değişiklik yok.",
    explainButton: "Bu Dönemi Açıkla",
    thinking: "Düşünülüyor...",
    explainUnavailable: "Yapay zeka açıklaması şu anda kullanılamıyor.",
  },
  heatmap: {
    title: "Aktivite Isı Haritası",
    description: "Geliştirme yoğunluğunun ay ay görünümü — sakin dönemler ile geliştirme patlamalarının karşılaştırması.",
    hoverHint: "Ayrıntılar için bir hücrenin üzerine gel",
    quiet: "Sakin",
    intense: "Yoğun",
  },
  architectureMoments: {
    title: "Mimari Anlar",
    description:
      "Aktivitenin çevresindeki geçmişe göre olağandışı derecede yüksek olduğu dönemler; basit, kural tabanlı bir karşılaştırmaya dayanır — neyin değiştiğine dair kesin bir kayıt değildir.",
    noneDetected: "Analiz edilen örneklemde olağandışı derecede aktif bir dönem tespit edilmedi.",
  },
  signalLabels: {
    elevated_commits: "Yüksek commit hacmi",
    contributor_surge: "Katkıda bulunan artışı",
    large_churn: "Yüksek kod değişim oranı",
  },
  signals: {
    elevated_commits: "Commit aktivitesi son ortalamanın yaklaşık %{percent} üzerindeydi.",
    contributor_surge: "Aktif katkıda bulunan sayısı son ortalamaya göre yaklaşık %{percent} arttı.",
    large_churn: "Eklenen ve silinen satır sayısı son ortalamanın yaklaşık %{percent} üzerindeydi.",
  },
  mostChangedFiles: {
    title: "En Çok Değişen Dosyalar",
    description: "Analiz edilen commit örnekleminde en sık değişen dosyalar. Daha fazla ayrıntı için bir dosya seç.",
    noData: "Analiz edilen örneklemde dosya düzeyinde veri bulunamadı.",
    contributors: "Katkıda Bulunan",
    firstObserved: "İlk gözlem",
    lastObserved: "Son gözlem",
  },
  codebaseHeatmap: {
    title: "Kod Tabanı Isı Haritası",
    description: "Bu kod tabanının hangi bölümleri en çok geliştirme aktivitesi alıyor? Daha büyük, daha parlak bloklar daha sık değişti.",
    noData: "Analiz edilen örneklemde klasör düzeyinde veri bulunamadı.",
    hoverHint: "Ayrıntılar için bir bloğun üzerine gel",
    otherCount: "Diğer ({count})",
  },
  contributorEvolution: {
    title: "Katkıda Bulunan Gelişimi",
    description:
      "Analiz edilen commit örneklemine göre katkıda bulunan aktivitesinin depo tarihinde nasıl değiştiği. Örneklenen commit hacmine göre sıralanmıştır, katkı kalitesine göre bir sıralama değildir.",
    noData: "Analiz edilecek katkıda bulunan aktivitesi bulunamadı.",
  },
  fileSurvival: {
    title: "Dosya Kalıcılığı",
    description:
      "Analiz edilen commit örnekleminin en uzun döneminde aktif olarak gözlemlenen dosyalar — uzun ömürlü, temel kodun bir göstergesi.",
    noData: "Analiz edilen örneklemde dosya düzeyinde veri bulunamadı.",
    age: "Yaş",
    changes: "Değişiklik",
    firstObserved: "İlk gözlem",
    lastChanged: "Son değişiklik",
  },
  footer: {
    summary: "{count} analiz edildi{partial}. Veriler, depo geçmişinin temsili bir örneklemini yansıtır, tam bir taramayı değil.",
    partialSuffix: ", toplam {total} geçmiş sayfasından {sampled} tanesi üzerinden",
  },
  units: {
    commit: { one: "commit", other: "commit" },
    change: { one: "değişiklik", other: "değişiklik" },
    contributor: { one: "katkıda bulunan", other: "katkıda bulunan" },
  },
};

export default tr;
