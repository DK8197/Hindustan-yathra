'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const points = [
  'certified',
  'tourism_recognition',
  'irctc',
  'coverage',
  'local_experts',
  'safe_travel',
  'customized',
  'support',
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
    en: 'Carefully planned itineraries with clear information about the arrangements for your journey.',
    kn: 'ನಿಮ್ಮ ಪ್ರಯಾಣದ ವ್ಯವಸ್ಥೆಗಳ ಬಗ್ಗೆ ಸ್ಪಷ್ಟ ಮಾಹಿತಿಯೊಂದಿಗೆ ಸೂಕ್ತವಾಗಿ ಯೋಜಿಸಿದ ಪ್ರವಾಸ ಕಾರ್ಯಕ್ರಮಗಳು.'
  },

  customized: {
    en: 'Tailor-made packages for families, groups, corporate teams, educational tours, and special occasions.',
    kn: 'ಕುಟುಂಬಗಳು, ಗುಂಪುಗಳು, ಸಂಸ್ಥೆಗಳು ಮತ್ತು ವಿಶೇಷ ಸಂದರ್ಭಗಳಿಗಾಗಿ ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ಪ್ಯಾಕೇಜುಗಳು.'
  },

  support: {
    en: 'Speak with our team for guidance while planning your journey and arranging the details.',
    kn: 'ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಯೋಜಿಸಲು ಮತ್ತು ವಿವರಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲು ನಮ್ಮ ತಂಡದ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.'
  }
};



export function WhyUs({ locale }: { locale: 'en' | 'kn' }) {
  const t = useTranslations('sections');
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="why-hindustan-yatra" aria-labelledby="why-hindustan-yatra-heading" className="bg-himalaya-50 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 id="why-hindustan-yatra-heading" className="font-display text-3xl font-semibold text-himalaya-900 md:text-4xl">{t('why_us')}</h2>
        <ul className="mt-10 grid gap-x-16 gap-y-8 md:grid-cols-2">
          {points.map((key, index) => (
            <motion.li
              key={key}
              initial={shouldReduceMotion ? false : { opacity: 0.92, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.65, delay: index * 0.07 }}
              className="max-w-[56ch]"
            >
              <p className="text-base leading-relaxed text-himalaya-900">{copy[key][locale]}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
