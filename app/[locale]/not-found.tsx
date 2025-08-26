import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function NotFound({ params }: { params: { locale: Locale } }) {
  const isTr = params.locale === 'tr';
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-black mb-4">{isTr ? 'Sayfa Bulunamadı' : 'Page Not Found'}</h1>
      <p className="text-gray-300 mb-8 max-w-xl">
        {isTr
          ? 'Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.'
          : 'The page you are looking for may have been moved or never existed.'}
      </p>
      <Link href={`/${params.locale}`} className="px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-colors">
        {isTr ? 'Ana Sayfa' : 'Home'}
      </Link>
    </section>
  );
}

