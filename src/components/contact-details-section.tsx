import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  type SocialCard,
  contactInfoItems,
  socialCards,
} from '@/data/contacts';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const infoIconMap = {
  mail: Mail,
  phone: Phone,
  map: MapPin,
};

const socialIconMap = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  email: Mail,
};

const themeClasses: Record<SocialCard['theme'], string> = {
  sunset:
    'bg-gradient-to-br from-[#ff6a3d]/90 via-[#d64b8c]/90 to-[#7b3ff2]/90',
  ocean: 'bg-gradient-to-br from-[#0466c9]/90 to-[#0a7494]/90',
  charcoal: 'bg-gradient-to-br from-[#1c1d24]/90 to-[#353646]/90',
  emerald: 'bg-gradient-to-br from-[#0b6b4f]/90 to-[#0f8a5f]/90',
};

function SocialCardItem({ card }: { card: SocialCard }) {
  const Icon = socialIconMap[card.icon];

  return (
    <div
      data-scroll-reveal-item
      className={cn(
        'group relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-2xl border border-border p-5 text-white shadow-lg',
        themeClasses[card.theme],
      )}
    >
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_55%)]" />
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{card.label}</h3>
        <p className="text-sm text-white/80">{card.description}</p>
      </div>
      <div className="relative z-10 flex items-center justify-between gap-4">
        <Button variant="outline" size="sm" asChild>
          <a href={card.href} target="_blank" rel="noreferrer">
            {card.cta}
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
          </a>
        </Button>
        <div className="flex size-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
          <Icon className="size-6 text-white" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export function ContactDetailsSection() {
  return (
    <div className="flex flex-col gap-6">
      <div data-scroll-reveal-item className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Open to collaboration</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {contactInfoItems.map((item) => {
            const Icon = infoIconMap[item.icon];
            return (
              <div key={item.label} className="flex items-start gap-3">
                <Icon
                  data-icon="inline-start"
                  className="mt-1 text-muted-foreground"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    {item.label}
                  </p>
                  {item.href ? (
                    <Link
                      className="group text-base font-medium text-foreground"
                      href={item.href}
                    >
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
                        {item.value}
                      </span>
                    </Link>
                  ) : (
                    <p className="text-base font-medium text-foreground">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {socialCards.map((card) => (
          <SocialCardItem key={card.label} card={card} />
        ))}
      </div>
    </div>
  );
}
