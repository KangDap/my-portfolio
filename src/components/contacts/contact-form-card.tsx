'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/animate-ui/components/base/alert-dialog';
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { contactProfile } from '@/data/contacts';
import {
  Heading3,
  Mail,
  MessageSquareText,
  Minus,
  SendHorizontal,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';

export const ContactFormCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
                <FieldLabel htmlFor="contact-name">
                  Name <span className="text-destructive">*</span>
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <User />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="contact-name"
                    name="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-email">
                  Email <span className="text-destructive">*</span>
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <Mail />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-subject">
                  Subject <span className="text-destructive">*</span>
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <Heading3 />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="contact-subject"
                    name="subject"
                    placeholder="What can we build together?"
                    required
                  />
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-message">
                  Message <span className="text-destructive">*</span>
                </FieldLabel>
                <InputGroup className="min-h-[200px] items-start max-w-[19.25rem] md:max-w-[29.75rem]">
                  <InputGroupAddon align="block-start" className="border-b">
                    <InputGroupText className="font-mono">
                      <MessageSquareText />
                      msg.txt
                    </InputGroupText>
                    <InputGroupButton className="ml-auto" size="icon-xs">
                      <Minus />
                    </InputGroupButton>
                    <InputGroupButton size="icon-xs">
                      <X />
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupTextarea
                    id="contact-message"
                    name="message"
                    placeholder="Share the context, timeline, and goals."
                    required
                  />
                </InputGroup>
                <FieldDescription>
                  This form opens your email client to send the message.
                </FieldDescription>
              </Field>
            </FieldGroup>
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button type="submit">
                    Send Message <SendHorizontal />
                  </Button>
                }
              />
              <AlertDialogPopup from="top" className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Check Your Message Again! &apos;v&apos;)b
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Please kindly re-check your email and message.
                  </AlertDialogDescription>
                  <AlertDialogDescription>
                    I&apos;ll send reply to: <b>{email}</b>
                    <b>{name ? ` (for ${name})` : ''}</b>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>
                    Send <SendHorizontal />
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogPopup>
            </AlertDialog>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
