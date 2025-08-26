import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { ProductGallery } from "@/components/ProductGallery";

export default async function Page({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  return (
    <section>
      <div className="prose prose-invert max-w-none mb-8">
        <h1>{dict.nav.products}</h1>
        <p>
          {params.locale === "tr"
            ? "Aşağıda üretimden örnek parçalarımızı görebilirsiniz. Detaylı bilgi için lütfen bizimle iletişime geçin."
            : "Below you can find sample parts from our production. Please contact us for details."}
        </p>
      </div>
      <ProductGallery />
    </section>
  );
}
