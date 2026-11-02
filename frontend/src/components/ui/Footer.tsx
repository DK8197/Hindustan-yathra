import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, PhoneCall } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const tCat = useTranslations('categories');
  const tContact = useTranslations('contact');
  const tNav = useTranslations('nav');

  const categories = ['pilgrimage', 'adventure', 'family', 'customized', 'school', 'honeymoon', 'international'] as const;

  const linkCls =
    'rounded-sm underline-offset-4 transition-colors duration-150 ease-out hover:text-sky-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400';
  const contactLinkCls = `break-all ${linkCls}`;
  const iconCls = 'shrink-0 text-sky-700';

  return (
    <footer className="relative border-t border-white/70 bg-gradient-to-b from-sky-200 to-sky-300/90 px-6 py-16 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <h3 id="footer-brand-heading" className="font-display text-lg font-semibold text-sky-950">Hindustan Yatra</h3>
          <p className="mt-4 text-base leading-relaxed text-slate-700">{t('about')}</p>
        </div>

        <div>
          <h4 id="footer-tour-categories-heading" className="text-base font-semibold text-sky-950">{t('tour_categories')}</h4>
          <ul className="mt-4 space-y-2 text-base">
            {categories.map((c) => (
              <li key={c}>{tCat(c)}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 id="footer-quick-links-heading" className="text-base font-semibold text-sky-950">{t('quick_links')}</h4>
          <ul className="mt-4 space-y-2 text-base">
            <li><Link className={linkCls} href="/destinations">{tNav('destinations')}</Link></li>
            <li><Link className={linkCls} href="/gallery">{tNav('gallery')}</Link></li>
            <li><Link className={linkCls} href="/contact">{tNav('contact')}</Link></li>
            <li><Link className={linkCls} href="/privacy-policy">{t('privacy_policy')}</Link></li>
            <li><Link className={linkCls} href="/cancellation-policy">{t('cancellation_policy')}</Link></li>
            <li><Link className={linkCls} href="/group-tour-terms">{t('group_tour_terms')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 id="footer-contact-heading" className="text-base font-semibold text-sky-950">{t('contact_us')}</h4>
          <ul className="mt-4 space-y-3 text-base text-slate-700">
            <li className="flex items-start gap-2"><MapPin aria-hidden="true" size={16} className={`mt-0.5 ${iconCls}`} /> <span>{tContact('address')}</span></li>
            <li className="flex items-center gap-2"><Phone aria-hidden="true" size={16} className={iconCls} /><a className={contactLinkCls} href="tel:+919060085635">+91 9060085635</a></li>
            <li className="flex items-center gap-2"><Phone aria-hidden="true" size={16} className={iconCls} /><a className={contactLinkCls} href="tel:+917676768086">+91 7676768086</a></li>
            <li className="flex items-center gap-2"><PhoneCall aria-hidden="true" size={16} className={iconCls} /><a className={contactLinkCls} href="tel:+918364850735">0836-4850735</a></li>
            <li className="flex items-center gap-2"><Mail aria-hidden="true" size={16} className={iconCls} /><a className={contactLinkCls} href="mailto:hindustanyatraa@gmail.com">hindustanyatraa@gmail.com</a></li>
            <li className="flex items-center gap-2"><Mail aria-hidden="true" size={16} className={iconCls} /><a className={contactLinkCls} href="mailto:info@hindustanyatra.com">info@hindustanyatra.com</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-sky-300/60 pt-4 text-base text-slate-600">
        © {new Date().getFullYear()} Hindustan Yatra. {t('rights')}
      </div>
    </footer>
  );
}
