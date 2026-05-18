import { ContactEmailTemplate } from '@/lib/email/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@world.com';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Dafa Ghani | Portfolio <kangdap@resend.dev>',
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `${subject}`,
      react: ContactEmailTemplate({ name, email, subject, message }),
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(
      { success: true, message: 'Email sent successfully', data },
      { status: 200 },
    );
  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
