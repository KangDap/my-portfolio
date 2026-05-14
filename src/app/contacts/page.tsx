import { Navbar } from '@/components/navbar';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const contactLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/dafaghani',
    icon: FaLinkedin,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/dafa.ghani',
    icon: FaInstagram,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/KangDap',
    icon: FaGithub,
  },
];

export default function ContactsPage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <ScrollReveal revealOnLoad>
        <section
          data-scroll-reveal
          data-scroll-reveal-group
          className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20"
        >
          <div className="flex flex-col gap-12">
            <div data-scroll-reveal-item className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                Contacts
              </p>
              <h1 className="font-heading text-3xl leading-tight sm:text-4xl">
                Let&apos;s build something worth sharing.
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
                Whether you have a project idea, a collaboration offer, or a
                quick question, reach out and I&apos;ll respond as soon as
                possible.
              </p>
            </div>

            <div
              data-scroll-reveal-item
              className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                  <CardDescription>
                    The fastest way to reach me is through email or LinkedIn.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Open to collaboration</Badge>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <Mail
                        data-icon="inline-start"
                        className="mt-1 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                          Email
                        </p>
                        <a
                          className="text-base font-medium text-foreground hover:underline"
                          href="mailto:hello@yourdomain.com"
                        >
                          hello@yourdomain.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone
                        data-icon="inline-start"
                        className="mt-1 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                          Phone
                        </p>
                        <p className="text-base font-medium text-foreground">
                          +62 812 0000 0000
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin
                        data-icon="inline-start"
                        className="mt-1 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                          Location
                        </p>
                        <p className="text-base font-medium text-foreground">
                          Bandung, Indonesia
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {contactLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a
                        href={link.href}
                        aria-label={link.label}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <link.icon
                          data-icon="inline-start"
                          aria-hidden="true"
                        />
                      </a>
                    </Button>
                  ))}
                </CardFooter>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Tell me about your project and I&apos;ll get back to you
                    soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="flex flex-col gap-6"
                    action="mailto:hello@yourdomain.com"
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
                        <FieldLabel htmlFor="contact-subject">
                          Subject
                        </FieldLabel>
                        <Input
                          id="contact-subject"
                          name="subject"
                          placeholder="What can we build together?"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="contact-message">
                          Message
                        </FieldLabel>
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
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
