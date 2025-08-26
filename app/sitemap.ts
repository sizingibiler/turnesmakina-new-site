/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const base = "https://www.turnesmakina.com";
  const now = new Date().toISOString();
  const routes = [
    "/tr",
    "/en",
    "/tr/makine-parkuru",
    "/en/makine-parkuru",
    "/tr/kalite",
    "/en/kalite",
    "/tr/urunler",
    "/en/urunler",
    "/tr/hakkimizda",
    "/en/hakkimizda",
    "/tr/iletisim",
    "/en/iletisim",
    "/de",
    "/de/makine-parkuru",
    "/de/kalite",
    "/de/urunler",
    "/de/hakkimizda",
    "/de/iletisim"
  ]; 
  return routes.map((url) => ({ url: base + url, lastModified: now }));
}

