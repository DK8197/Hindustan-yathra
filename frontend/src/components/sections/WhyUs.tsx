import { useTranslations } from 'next-intl';

import {
  Award,
  ShieldCheck,
  BadgeCheck, // only if your version supports it
  Train,
  MapPinned,
  Users,
  Briefcase,
  Headphones,
  Globe,
} from 'lucide-react';

const points = [
  { icon: BadgeCheck, key: 'certified' },
  { icon: Award, key: 'tourism_recognition' },
  { icon: Train , key: 'irctc' },
  { icon: MapPinned, key: 'coverage' },
  { icon: Users, key: 'local_experts' },
  { icon: ShieldCheck, key: 'safe_travel' },
  { icon: Briefcase, key: 'customized' },
  { icon: Headphones, key: 'support' },
] as const;


const copy = {
  certified: {
    en: 'ISO Certified travel company committed to quality, transparency, and customer satisfaction.',
    kn: 'ಗುಣಮಟ್ಟ, ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಗ್ರಾಹಕ ತೃಪ್ತಿಗೆ ಬದ್ಧವಾದ ISO ಪ್ರಮಾಣಿತ ಪ್ರವಾಸ ಸಂಸ್ಥೆ.'
  },

  tourism_recognition: {
    en: 'Recognized by the Department of Tourism, Government of Karnataka, reflecting our commitment to excellence in tourism services.',
    kn: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಪ್ರವಾಸೋದ್ಯಮ ಇಲಾಖೆಯಿಂದ ಮಾನ್ಯತೆ ಪಡೆದ ಸಂಸ್ಥೆ.'
  },

  irctc: {
    en: 'Authorized IRCTC travel partner providing trusted railway bookings and pilgrimage tour services.',
    kn: 'ವಿಶ್ವಾಸಾರ್ಹ ರೈಲು ಬುಕ್ಕಿಂಗ್ ಮತ್ತು ಯಾತ್ರಾ ಸೇವೆಗಳನ್ನು ಒದಗಿಸುವ ಅಧಿಕೃತ IRCTC ಪಾಲುದಾರ.'
  },

  coverage: {
    en: 'From sacred pilgrimages and family vacations to international holidays and adventure expeditions—all under one roof.',
    kn: 'ಪವಿತ್ರ ಯಾತ್ರೆಗಳು, ಕುಟುಂಬ ಪ್ರವಾಸಗಳು, ಅಂತರರಾಷ್ಟ್ರೀಯ ಪ್ರವಾಸಗಳು ಮತ್ತು ಸಾಹಸ ಯಾತ್ರೆಗಳು—ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ.'
  },

  local_experts: {
    en: 'Experienced travel specialists and destination experts ensuring authentic and hassle-free journeys.',
    kn: 'ಅನುಭವಸಂಪನ್ನ ಪ್ರವಾಸ ತಜ್ಞರು ಮತ್ತು ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಕರೊಂದಿಗೆ ಸುಗಮ ಪ್ರಯಾಣ.'
  },

  safe_travel: {
    en: 'Reliable transportation, verified accommodations, and carefully planned itineraries for a worry-free experience.',
    kn: 'ವಿಶ್ವಾಸಾರ್ಹ ಸಾರಿಗೆ, ಪರಿಶೀಲಿತ ವಸತಿ ಮತ್ತು ಸೂಕ್ತವಾಗಿ ಯೋಜಿತ ಪ್ರವಾಸ ಕಾರ್ಯಕ್ರಮಗಳು.'
  },

  customized: {
    en: 'Tailor-made packages for families, groups, corporate teams, educational tours, and special occasions.',
    kn: 'ಕುಟುಂಬಗಳು, ಗುಂಪುಗಳು, ಸಂಸ್ಥೆಗಳು ಮತ್ತು ವಿಶೇಷ ಸಂದರ್ಭಗಳಿಗಾಗಿ ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ಪ್ಯಾಕೇಜುಗಳು.'
  },

  support: {
    en: 'Dedicated 24×7 travel assistance before, during, and after your journey.',
    kn: 'ಪ್ರಯಾಣದ ಮೊದಲು, ವೇಳೆ ಮತ್ತು ನಂತರವೂ 24×7 ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ.'
  }
};



export function WhyUs({ locale }: { locale: 'en' | 'kn' }) {
  const t = useTranslations('sections');

  return (
    <section className="bg-himalaya-50 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-semibold text-himalaya-900 md:text-4xl">{t('why_us')}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, key }) => (
            <div key={key} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <Icon className="text-saffron-500" size={28} />
              <p className="mt-4 font-medium text-himalaya-900">{copy[key][locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
