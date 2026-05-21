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
import { cn } from '@/lib/utils';
import {
  Heading3,
  Mail,
  MessageSquareText,
  Minus,
  SendHorizontal,
  User,
  X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Invalid email.';
  }

  if (!values.subject.trim()) {
    errors.subject = 'Subject is required.';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}

export const ContactFormCard = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clearFieldError = (field: keyof ContactFormValues, value: string) => {
    const nextValues: ContactFormValues = {
      name,
      email,
      subject,
      message,
      [field]: value,
    };

    const nextErrors = validateContactForm(nextValues);

    setErrors((currentErrors) => {
      if (!currentErrors[field] && !nextErrors[field]) {
        return currentErrors;
      }

      return {
        ...currentErrors,
        [field]: nextErrors[field],
      };
    });
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm({
      name,
      email,
      subject,
      message,
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsConfirmOpen(false);
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleSendEmail = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Something went wrong.');
      }

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
      setIsConfirmOpen(false);

      return data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmSend = () => {
    setIsConfirmOpen(false);
    void toast.promise(handleSendEmail(), {
      loading: 'Sending message...',
      success: "Message sent successfully! I'll get back to you soon.",
      error: 'Failed to send message. Please try again.',
    });
  };

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
            ref={formRef}
            className="flex flex-col gap-6"
            noValidate
            onSubmit={handleSubmit}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="contact-name">
                  Name <span className="text-destructive">*</span>
                </FieldLabel>
                <InputGroup aria-invalid={Boolean(errors.name)}>
                  <InputGroupAddon align="inline-start">
                    <User />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="contact-name"
                    name="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      clearFieldError('name', event.target.value);
                    }}
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? 'contact-name-error' : 'contact-name-hint'
                    }
                  />
                </InputGroup>
                <FieldDescription
                  id={errors.name ? 'contact-name-error' : 'contact-name-hint'}
                  className={cn(errors.name ? 'text-destructive' : undefined)}
                >
                  {errors.name ?? 'Use the name you want me to reply to.'}
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-email">
                  Email <span className="text-destructive">*</span>
                </FieldLabel>
                <InputGroup aria-invalid={Boolean(errors.email)}>
                  <InputGroupAddon align="inline-start">
                    <Mail />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      clearFieldError('email', event.target.value);
                    }}
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? 'contact-email-error'
                        : 'contact-email-hint'
                    }
                  />
                </InputGroup>
                <FieldDescription
                  id={
                    errors.email ? 'contact-email-error' : 'contact-email-hint'
                  }
                  className={cn(errors.email ? 'text-destructive' : undefined)}
                >
                  {errors.email ?? "I'll reply to this address."}
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-subject">
                  Subject <span className="text-destructive">*</span>
                </FieldLabel>
                <InputGroup aria-invalid={Boolean(errors.subject)}>
                  <InputGroupAddon align="inline-start">
                    <Heading3 />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="contact-subject"
                    name="subject"
                    placeholder="What can we build together?"
                    value={subject}
                    onChange={(event) => {
                      setSubject(event.target.value);
                      clearFieldError('subject', event.target.value);
                    }}
                    required
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject
                        ? 'contact-subject-error'
                        : 'contact-subject-hint'
                    }
                  />
                </InputGroup>
                <FieldDescription
                  id={
                    errors.subject
                      ? 'contact-subject-error'
                      : 'contact-subject-hint'
                  }
                  className={cn(
                    errors.subject ? 'text-destructive' : undefined,
                  )}
                >
                  {errors.subject ?? 'Summarize the topic in one short line.'}
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-message">
                  Message <span className="text-destructive">*</span>
                </FieldLabel>
                <InputGroup
                  aria-invalid={Boolean(errors.message)}
                  className="min-h-[200px] max-w-[19.25rem] items-start md:max-w-[39.75rem]"
                >
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
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      clearFieldError('message', event.target.value);
                    }}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message
                        ? 'contact-message-error'
                        : 'contact-message-hint'
                    }
                  />
                </InputGroup>
                <FieldDescription
                  id={
                    errors.message
                      ? 'contact-message-error'
                      : 'contact-message-hint'
                  }
                  className={cn(
                    errors.message ? 'text-destructive' : undefined,
                  )}
                >
                  {errors.message ?? 'This form using Resend for mailer.'}
                </FieldDescription>
              </Field>
            </FieldGroup>
            <Button type="submit">
              Send Message <SendHorizontal />
            </Button>

            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
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
                  <AlertDialogCancel disabled={isLoading}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    type="button"
                    onClick={handleConfirmSend}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send'} <SendHorizontal />
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
