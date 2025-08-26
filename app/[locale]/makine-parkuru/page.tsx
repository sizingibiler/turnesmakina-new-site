import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { MachineParkGrid } from "@/components/MachineParkGrid";

export default async function Page({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  return (
    <section>
      <div className="prose prose-invert max-w-none mb-8">
        <h1>{dict.machinePark.title}</h1>
        <p className="opacity-80">
          {params.locale === 'tr' 
            ? 'Makine parkurumuzdan seçili tezgahlar:'
            : 'Selected machines from our park:'}
        </p>
      </div>
      <MachineParkGrid />
    </section>
  );
}
