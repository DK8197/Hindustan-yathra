import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, PhoneCall } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const tCat = useTranslations('categories');
  const tContact = useTranslations('contact');
  const tNav = useTranslations('nav');

  const categories = ['pilgrimage', 'adventure', 'family', 'customized', 'school', 'honeymoon', 'international'] as const;

  return (
    <footer className="bg-himalaya-900 px-6 py-16 text-white/80 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">Hindustan Yatra</h3>
          <p className="mt-4 text-sm leading-relaxed">{t('about')}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{t('tour_categories')}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c}>{tCat(c)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{t('quick_links')}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400" href="/destinations">{tNav('destinations')}</Link></li>
            <li><Link className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400" href="/gallery">{tNav('gallery')}</Link></li>
            <li><Link className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400" href="/contact">{tNav('contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{t('contact_us')}</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin aria-hidden="true" size={16} className="mt-0.5 shrink-0" /> <span>{tContact('address')}</span></li>
            <li className="flex items-center gap-2"><Phone aria-hidden="true" size={16} /><a className="break-all underline-offset-4 hover:text-white hover:underline" href="tel:+919060085635">+91 9060085635</a></li>
            <li className="flex items-center gap-2"><Phone aria-hidden="true" size={16} /><a className="break-all underline-offset-4 hover:text-white hover:underline" href="tel:+917676768086">+91 7676768086</a></li>
            <li className="flex items-center gap-2"><PhoneCall aria-hidden="true" size={16} /><a className="break-all underline-offset-4 hover:text-white hover:underline" href="tel:+918364850735">0836-4850735</a></li>
            <li className="flex items-center gap-2"><Mail aria-hidden="true" size={16} /><a className="break-all underline-offset-4 hover:text-white hover:underline" href="mailto:hindustanyatraa@gmail.com">hindustanyatraa@gmail.com</a></li>
            <li className="flex items-center gap-2"><Mail aria-hidden="true" size={16} /><a className="break-all underline-offset-4 hover:text-white hover:underline" href="mailto:info@hindustanyatra.com">info@hindustanyatra.com</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/50">
        © {new Date().getFullYear()} Hindustan Yatra. {t('rights')}
      </div>
    </footer>
  );
}
