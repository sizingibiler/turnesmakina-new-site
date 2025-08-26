import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turnes Makina",
  description: "Turnes Makina — Talaşlı imalatta deneyim, kalite ve güven",
  openGraph: {
    title: "Turnes Makina",
    description: "Talaşlı imalatta deneyim, kalite ve güven",
    url: "https://www.example.com",
    siteName: "Turnes Makina",
    locale: "tr_TR",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
