import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.TO_EMAIL || '{{CONTACT_TO_EMAIL}}';
const isMock = !resendApiKey || resendApiKey === '{{RESEND_API_KEY}}';

const resend = !isMock ? new Resend(resendApiKey) : null as unknown as Resend;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Mock mode: Do not send real emails if keys are missing or placeholders are used
    if (isMock) {
      return NextResponse.json({ ok: true, mock: true, name, email, message });
    }

    const { data, error } = await resend.emails.send({
      from: 'Turnes Makina <onboarding@resend.dev>', // Must be a verified domain on Resend
      to: [toEmail], // Your email address
      subject: `New Message from ${name} via Turnes Makina Website`,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
