import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";

export default async function Page({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  return (
    <section>
      <div className="prose prose-invert max-w-none mb-8">
        <h1>{dict.quality.title}</h1>
        <p className="opacity-80">{params.locale === 'tr' ? 'Ölçüm altyapımızdan bazı cihazlar:' : 'Some of our metrology equipment:'}</p>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
          <Image src="/assets/turnes/quality/devices.avif" alt="Ölçüm Cihazları" fill className="object-cover" />
        </div>
        <div className="glass rounded-2xl p-6">
          <ul className="space-y-2">
            {dict.quality.items.map((x: string) => (
              <li key={x} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
