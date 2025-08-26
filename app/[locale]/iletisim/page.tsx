import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { ContactForm } from "@/components/ContactForm";

export default async function Page({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const c = dict.contact;
  return (
    <section className="prose prose-invert max-w-none">
      <h1>{c.title}</h1>
      <p>
        <strong>Adres:</strong> {c.address}
        <br />
        <strong>Telefon:</strong> {c.phone}
        <br />
        <strong>E-posta:</strong> {c.emails.join(", ")}
      </p>

      {/* Client-side contact form to avoid event handler issues in Server Components */}
      <ContactForm dict={dict} />
    </section>
  );
}

