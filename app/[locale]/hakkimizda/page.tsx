import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";

export default async function Page({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const a = dict.about;
  return (
    <section>
      {/* Banner */}
      <div className="relative w-full aspect-[16/6] rounded-2xl overflow-hidden mb-8 border border-white/10">
        <Image src="/assets/turnes/hero/header.avif" alt="Turnes Makina" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl md:text-5xl font-black">{a.title}</h1>
          <p className="opacity-80">{a.subtitle}</p>
        </div>
      </div>

      {/* Intro */}
      <div className="prose prose-invert max-w-none">
        <p>{a.intro}</p>
        <p>{a.body}</p>
      </div>

      {/* Media + Why */}
      <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
          <Image src="/assets/turnes/about/tesis.avif" alt="Tesis" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{a.why.title}</h2>
          <ul className="space-y-2">
            {a.why.points.map((x: string) => (
              <li key={x} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer style background video preview */}
      <div className="mt-10 relative rounded-2xl overflow-hidden border border-white/10">
        <video src="/assets/turnes/footer/footer.mp4" autoPlay muted loop playsInline className="w-full h-[300px] object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass px-6 py-3 rounded-full font-semibold">{params.locale === 'tr' ? 'Üretimden kısa bir sahne' : 'A short scene from production'}</div>
        </div>
      </div>

      {/* Mission/Vision */}
      <div className="prose prose-invert max-w-none mt-8 grid gap-8 grid-cols-1 md:grid-cols-2">
        <div>
          <h2>{a.mission.title}</h2>
          <p>{a.mission.text}</p>
        </div>
        <div>
          <h2>{a.vision.title}</h2>
          <p>{a.vision.text}</p>
        </div>
      </div>
    </section>
  );
}
