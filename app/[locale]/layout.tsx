import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import "@/app/globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEN = params.locale === 'en';
  const isDE = params.locale === 'de';
  const title = isEN ? 'Turnes Machine' : 'Turnes Makina';
  const siteName = title;
  const localeTag = isDE ? 'de_DE' : (isEN ? 'en_US' : 'tr_TR');
  return {
    title,
    description: isEN 
      ? 'Turnes Machine — Experience, quality and reliability in precision machining'
      : (isDE 
         ? 'Turnes Maschine — Erfahrung, Qualität und Zuverlässigkeit in der Präzisionsfertigung'
         : 'Turnes Makina — Talaşlı imalatta deneyim, kalite ve güven'),
    openGraph: {
      title,
      description: isEN 
        ? 'Experience, quality and reliability in precision machining'
        : (isDE ? 'Erfahrung, Qualität und Zuverlässigkeit in der Präzisionsfertigung' : 'Talaşlı imalatta deneyim, kalite ve güven'),
      url: 'https://www.turnesmakina.com',
      siteName,
      locale: localeTag,
      type: 'website'
    },
    icons: { icon: '/favicon.ico' }
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  return (
    <html lang={params.locale}>
      <body className="min-h-screen flex flex-col">
        <NavBar locale={params.locale} dict={dict} />
        <main className="flex-1 container pt-20 sm:pt-28 md:pt-36 pb-10">{children}</main>
        <Footer locale={params.locale} dict={dict} />
      </body>
    </html>
  );
}

