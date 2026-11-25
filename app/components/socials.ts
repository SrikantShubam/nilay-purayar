/**
 * Single source of truth for social links.
 *
 * These were previously hardcoded separately in Contact and Footer, and the
 * two lists had drifted apart. The shape here mirrors the Tina fields that
 * will replace it, so moving it into Site Settings is a swap rather than a
 * rewrite.
 *
 * Tracking parameters have been stripped from the Instagram and Snapchat
 * URLs. No phone number is listed anywhere public.
 */
export type Social = {
  label: string;
  href: string;
  showInContact: boolean;
  showInFooter: boolean;
};

export const EMAIL = 'purayar.nilay@gmail.com';

export const socials: Social[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/purayar-nilay/',
    showInContact: true,
    showInFooter: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/purayar06',
    showInContact: true,
    showInFooter: false,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/purayar.nilay_06',
    showInContact: true,
    showInFooter: true,
  },
  {
    label: 'Snapchat',
    href: 'https://www.snapchat.com/add/purayar.nilay06',
    showInContact: true,
    showInFooter: true,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/nilay.purayar.1',
    showInContact: true,
    showInFooter: false,
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    showInContact: true,
    showInFooter: true,
  },
];
