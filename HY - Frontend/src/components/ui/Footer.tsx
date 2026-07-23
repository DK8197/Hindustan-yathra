import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, PhoneCall } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const tCat = useTranslations('categories');
  const tContact = useTranslations('contact');

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
            <li><Link href="/destinations">Destinations</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{t('contact_us')}</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16} /> {tContact('address')}</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +91 9060085635</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +91 7676768086</li>
            <li className="flex items-center gap-2"><PhoneCall size={16} /> 0836-4850735</li>
            <li className="flex items-center gap-2"><Mail size={16} /> hindustanyatraa@gmail.com</li>
            <li className="flex items-center gap-2"><Mail size={16} /> info@hindustanyatra.com</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/50">
        © {new Date().getFullYear()} Hindustan Yatra. {t('rights')}
      </div>
    </footer>
  );
}
