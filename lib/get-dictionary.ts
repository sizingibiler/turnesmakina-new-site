import type { Locale } from "@/lib/i18n";

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export async function getDictionary(locale: Locale) {
  switch (locale) {
    case "tr":
      return (await import("@/content/tr.json")).default;
    case "en":
      return (await import("@/content/en.json")).default;
    case "de":
      return (await import("@/content/de.json")).default;
    default:
      return (await import("@/content/tr.json")).default;
  }
}

