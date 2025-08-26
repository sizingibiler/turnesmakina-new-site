import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-black mb-4">404</h1>
      <p className="text-gray-300 mb-8 max-w-xl">
        Sayfa bulunamadı · Page not found · Seite nicht gefunden
      </p>
      <Link href={`/tr`} className="px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-colors">
        Ana Sayfa
      </Link>
    </section>
  );
}

