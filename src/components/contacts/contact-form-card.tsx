import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactProfile } from '@/data/contacts';

export function ContactFormCard() {
  return (
    <div data-scroll-reveal-item>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>
            Tell me about your project and I&apos;ll get back to you soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            action={`mailto:${contactProfile.email}`}
            method="post"
            encType="text/plain"
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
                <Input
                  id="contact-subject"
                  name="subject"
                  placeholder="What can we build together?"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Share the context, timeline, and goals."
                  required
                />
                <FieldDescription>
                  This form opens your email client to send the message.
                </FieldDescription>
              </Field>
            </FieldGroup>
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
