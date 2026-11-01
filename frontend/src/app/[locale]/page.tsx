import type { Metadata } from 'next';
import { getPathname } from '@/i18n/routing';

import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedTours } from '@/components/sections/FeaturedTours';
import { WhyUs } from '@/components/sections/WhyUs';
import { ContactSection } from '@/components/sections/ContactSection';
import SocialMediaFeed from '@/components/sections/SocialMediaFeed';

import { getSocialLinks } from '@/lib/social-repository';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'en' | 'kn' }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const href = '/';

  const seoTitle =
    locale === 'kn'
      ? 'ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ | ಹುಬ್ಬಳ್ಳಿಯ ಪ್ರವಾಸ ಸಂಸ್ಥೆ'
      : 'Hindustan Yatra | Travel Agency in Hubballi';

  const seoDescription =
    locale === 'kn'
      ? 'ಹುಬ್ಬಳ್ಳಿಯ ವಿಶ್ವಾಸಾರ್ಹ ಪ್ರವಾಸ ಸಂಸ್ಥೆ ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾದಿಂದ ಯಾತ್ರಾ ಪ್ರವಾಸಗಳು, ಕುಟುಂಬ ಪ್ರವಾಸ, ಕಸ್ಟಮೈಸ್ ಪ್ಯಾಕೇಜುಗಳು, ವೀಸಾ ಸಹಾಯ ಮತ್ತು ಅಂತರರಾಷ್ಟ್ರೀಯ ಪ್ರಯಾಣ ಯೋಜನೆಗಳನ್ನು ಬುಕ್ ಮಾಡಿ.'
      : 'Book pilgrimage tours, family holidays, customized vacation packages, visa support, and international travel experiences with Hindustan Yatra in Hubballi.';

  return {
    title: { absolute: seoTitle },
    description: seoDescription,
    keywords: [
      'Hindustan Yatra',
      'Travel Agency Hubballi',
      'Travel Agency Hubli',
      'Pilgrimage Tours',
      'Family Tour Packages',
      'International Tours',
      'Customized Holidays',
      'Tour Packages in Karnataka',
      'Visa Assistance',
    ],
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        en: getPathname({ locale: 'en', href }),
        kn: getPathname({ locale: 'kn', href }),
        'x-default': getPathname({ locale: 'en', href }),
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      locale: locale === 'kn' ? 'kn_IN' : 'en_IN',
      siteName: 'Hindustan Yatra',
      images: [{
        url: '/textures/hindustan-yatra-image.png',
        width: 1200,
        height: 630,
        alt: 'Hindustan Yatra',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ['/textures/hindustan-yatra-image.png'],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'kn' }>;
}) {
  const { locale } = await params;

  const social = await getSocialLinks();

  const faqItems = [
    {
      question:
        locale === 'kn'
          ? 'ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ ಯಾವ ರೀತಿಯ ಪ್ರವಾಸಗಳನ್ನು ಯೋಜಿಸುತ್ತದೆ?'
          : 'What kinds of tours does Hindustan Yatra offer?',
      answer:
        locale === 'kn'
          ? 'ನಾವು ಭಾರತದಲ್ಲಿನ ಧಾರ್ಮಿಕ ಯಾತ್ರೆಗಳು, ಕುಟುಂಬ ರಜೆಗಳು, ಗುಂಪು ಪ್ರವಾಸಗಳು ಮತ್ತು ವಿದೇಶಿ ಪ್ರವಾಸಗಳನ್ನು ಯೋಜಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ. ನಿಮ್ಮ ಆಸಕ್ತಿ, ಪ್ರಯಾಣದ ದಿನಗಳು ಮತ್ತು ಬಜೆಟ್ ಆಧರಿಸಿ ಆಯ್ಕೆಗಳನ್ನು ಚರ್ಚಿಸುತ್ತೇವೆ. ಲಭ್ಯವಿರುವ ಪ್ಯಾಕೇಜುಗಳು ಮತ್ತು ಅವುಗಳಲ್ಲಿ ಸೇರಿರುವ ಸೇವೆಗಳು ಗಮ್ಯಸ್ಥಾನಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಬದಲಾಗುತ್ತವೆ.'
          : 'We help plan pilgrimage journeys, family holidays, group trips, and international vacations. Tell us where you want to go, when you plan to travel, and who is travelling. Our team can discuss suitable options. Packages and included services vary by destination. We work with travellers from Hubballi and elsewhere.',
    },
    {
      question:
        locale === 'kn'
          ? 'ನನ್ನಿಗಾಗಿ ಕಸ್ಟಮ್ ಪ್ರವಾಸವನ್ನು ಹೇಗೆ ಯೋಜಿಸಬಹುದು?'
          : 'How can I plan a custom trip?',
      answer:
        locale === 'kn'
          ? 'ಗಮ್ಯಸ್ಥಾನ, ಪ್ರಯಾಣದ ದಿನಾಂಕಗಳು, ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ ಮತ್ತು ಅಂದಾಜು ಬಜೆಟ್ ಅನ್ನು ನಮ್ಮೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ. ನಿಮ್ಮ ಅಗತ್ಯಗಳಿಗೆ ತಕ್ಕ ಪ್ರವಾಸ ಆಯ್ಕೆಗಳು ಮತ್ತು ಪ್ರಯಾಣ ಯೋಜನೆಯನ್ನು ನಮ್ಮ ತಂಡ ಚರ್ಚಿಸುತ್ತದೆ. ಬುಕಿಂಗ್ ಮಾಡುವ ಮೊದಲು ದಿನಾಂಕಗಳು, ಬೆಲೆ ಮತ್ತು ಸೇವೆಗಳ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
          : 'Share your destination, travel dates, group size, and approximate budget with our team. We can discuss trip options and help plan an itinerary around your needs. Review the dates, price, inclusions, and booking terms before you confirm. Availability depends on your dates and destination.',
    },
    {
      question:
        locale === 'kn'
          ? 'ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ ಕಚೇರಿ ಎಲ್ಲಿದೆ?'
          : 'Where is Hindustan Yatra based?',
      answer:
        locale === 'kn'
          ? 'ನಮ್ಮ ಕಚೇರಿ ಕರ್ನಾಟಕದ ಹುಬ್ಬಳ್ಳಿಯಲ್ಲಿದೆ: #123, 3ನೇ ಮಹಡಿ, ಸ್ಯಾಟಲೈಟ್ ಕಾಂಪ್ಲೆಕ್ಸ್, ಕೊಪ್ಪಿಕರ್ ರಸ್ತೆ, ಹುಬ್ಬಳ್ಳಿ, ಕರ್ನಾಟಕ, ಭಾರತ. ಭೇಟಿಗೂ ಮೊದಲು ಸಂಪರ್ಕಿಸಿ ಸಮಯ ಮತ್ತು ಮಾರ್ಗವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
          : 'Our office is at #123, 3rd Floor, Satellite Complex, Koppikar Road, Hubballi, Karnataka, India. Contact our team before visiting to confirm office hours and directions. The contact page includes a map and ways to reach us. Please contact us if you need help planning an office visit.',
    },
    {
      question:
        locale === 'kn'
          ? 'ವೀಸಾ ಸಹಾಯವನ್ನು ಒದಗಿಸುತ್ತೀರಾ?'
          : 'Can your team help with visa arrangements?',
      answer:
        locale === 'kn'
          ? 'ಹೌದು, ನಮ್ಮ ತಂಡ ಪ್ರವಾಸಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ವೀಸಾ ಮಾರ್ಗದರ್ಶನ ನೀಡಬಹುದು. ನಿಯಮಗಳು ದೇಶ ಮತ್ತು ಪ್ರಯಾಣಿಕರ ಪರಿಸ್ಥಿತಿಗೆ ಅನುಗುಣವಾಗಿ ಬದಲಾಗುತ್ತವೆ. ಅರ್ಹತೆ ಮತ್ತು ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಸಂಬಂಧಿತ ಅಧಿಕಾರಿಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ; ವೀಸಾ ಅನುಮೋದನೆಯನ್ನು ನಾವು ಖಚಿತಪಡಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.'
          : 'Yes. Our team can provide guidance for travel-related visa arrangements. Rules and required documents vary by country and traveller. Check current requirements with the relevant authorities. Visa eligibility and approval are decided by the issuing authority, not by the travel agency. We can help explain the process before you apply.',
    },
    {
      question:
        locale === 'kn'
          ? 'ಪ್ರವಾಸ ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿ ಯಾವ ಸೇವೆಗಳು ಸೇರಿರುತ್ತವೆ?'
          : 'What is included in a tour package?',
      answer:
        locale === 'kn'
          ? 'ಸೇರಿರುವ ಸೇವೆಗಳು ಪ್ರವಾಸದ ಪ್ರಕಾರ ಬದಲಾಗುತ್ತವೆ. ಕೆಲವು ಪ್ಯಾಕೇಜುಗಳಲ್ಲಿ ವಸತಿ ಅಥವಾ ಸಾರಿಗೆ ಇರಬಹುದು. ಬುಕಿಂಗ್ ಮಾಡುವ ಮೊದಲು ನಿಮ್ಮ ಪ್ರವಾಸದ ವಿವರದಲ್ಲಿ ಸೇರಿರುವ ಮತ್ತು ಸೇರಿರದ ಸೇವೆಗಳು, ಬೆಲೆ, ಪಾವತಿ ಹಾಗೂ ರದ್ದತಿ ನಿಯಮಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'
          : 'Inclusions vary by trip. A package may include services such as accommodation or transport, depending on the itinerary. Before booking, review the tour details for inclusions, exclusions, total price, payment terms, and cancellation conditions. Ask our team to clarify any item before you pay.',
    },
  ];

  const planningSteps = locale === 'kn'
    ? [
        {
          name: 'ನಿಮ್ಮ ಪ್ರಯಾಣದ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
          text: 'ಗಮ್ಯಸ್ಥಾನ, ಪ್ರಯಾಣದ ದಿನಾಂಕಗಳು, ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ ಮತ್ತು ಅಂದಾಜು ಬಜೆಟ್ ಅನ್ನು ಸಂಪರ್ಕ ಫಾರ್ಮ್ ಅಥವಾ ಫೋನ್ ಮೂಲಕ ತಿಳಿಸಿ.',
        },
        {
          name: 'ಪ್ರವಾಸ ಯೋಜನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
          text: 'ಪ್ರಯಾಣ ಯೋಜನೆ, ಲಭ್ಯತೆ, ಬೆಲೆ ಮತ್ತು ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿ ಸೇರಿರುವ ಸೇವೆಗಳ ಬಗ್ಗೆ ತಂಡದೊಂದಿಗೆ ಚರ್ಚಿಸಿ. ನಿರ್ಧರಿಸುವ ಮೊದಲು ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.',
        },
        {
          name: 'ನಿಯಮಗಳನ್ನು ತಿಳಿದು ನಂತರ ಖಚಿತಪಡಿಸಿ',
          text: 'ನಿಮಗೆ ಸೂಕ್ತವಾದ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ. ಪಾವತಿ ಮತ್ತು ರದ್ದತಿ ನಿಯಮಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ನಂತರ ಬುಕಿಂಗ್ ವ್ಯವಸ್ಥೆ ಮಾಡಲು ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
        },
      ]
    : [
        {
          name: 'Share your trip details',
          text: 'Tell us your destination, preferred dates, group size, and approximate budget through the contact form or by phone.',
        },
        {
          name: 'Review the proposed plan',
          text: 'Discuss itinerary options, availability, pricing, and package inclusions with the team. Ask questions before deciding.',
        },
        {
          name: 'Confirm after reviewing the terms',
          text: 'Choose an option that works for your group. Review payment and cancellation terms, then contact the team to arrange the booking.',
        },
      ];

  const travelTerms = locale === 'kn'
    ? [
        {
          term: 'ಯಾತ್ರಾ ಪ್ರವಾಸ',
          definition: 'ಧಾರ್ಮಿಕ ಸ್ಥಳ ಅಥವಾ ತೀರ್ಥಯಾತ್ರೆಯನ್ನು ಕೇಂದ್ರವಾಗಿಟ್ಟು ಯೋಜಿಸುವ ಪ್ರಯಾಣ. ಮಾರ್ಗ, ದಿನಾಂಕಗಳು ಮತ್ತು ಸೇರಿರುವ ಸೇವೆಗಳು ಆಯ್ದ ಪ್ರವಾಸದ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತವೆ.',
        },
        {
          term: 'ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ಪ್ರವಾಸ',
          definition: 'ನಿಮ್ಮ ದಿನಾಂಕಗಳು, ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ, ಬಜೆಟ್ ಮತ್ತು ಇಚ್ಛಿತ ತಾಣಗಳನ್ನು ಆಧರಿಸಿ ಚರ್ಚಿಸುವ ಪ್ರವಾಸ ಯೋಜನೆ.',
        },
        {
          term: 'ವೀಸಾ ಮಾರ್ಗದರ್ಶನ',
          definition: 'ವೀಸಾ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನೀಡುವ ಮಾರ್ಗದರ್ಶನ. ಅರ್ಹತೆ ಮತ್ತು ಅನುಮೋದನೆಯನ್ನು ಗಮ್ಯಸ್ಥಾನದ ವಲಸೆ ಪ್ರಾಧಿಕಾರ ನಿರ್ಧರಿಸುತ್ತದೆ.',
        },
      ]
    : [
        {
          term: 'Pilgrimage tour',
          definition: 'A journey planned around a religious site or spiritual visit. Routes, dates, and included services depend on the selected tour.',
        },
        {
          term: 'Customized trip',
          definition: 'A travel plan discussed around your dates, group size, budget, and preferred destinations.',
        },
        {
          term: 'Visa guidance',
          definition: 'Help understanding visa steps and documents. The destination’s immigration authority decides eligibility and approval.',
        },
      ];

  const homepageDescription =
    locale === 'kn'
      ? 'ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ ಕರ್ನಾಟಕದ ಹುಬ್ಬಳ್ಳಿಯಲ್ಲಿರುವ ಪ್ರವಾಸ ಸಂಸ್ಥೆ. ಭಾರತದಲ್ಲಿನ ಯಾತ್ರೆಗಳು, ಕುಟುಂಬ ರಜೆಗಳು, ಗುಂಪು ಪ್ರವಾಸಗಳು ಮತ್ತು ಅಂತರರಾಷ್ಟ್ರೀಯ ಪ್ರಯಾಣಗಳನ್ನು ಯೋಜಿಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ. ಗಮ್ಯಸ್ಥಾನ ಮತ್ತು ಪ್ಯಾಕೇಜ್‌ಗೆ ಅನುಗುಣವಾಗಿ ಪ್ರಯಾಣ ಯೋಜನೆ, ಸಾರಿಗೆ, ವಸತಿ ಮತ್ತು ವೀಸಾ ಮಾರ್ಗದರ್ಶನದ ಕುರಿತು ನಮ್ಮ ತಂಡದೊಂದಿಗೆ ಚರ್ಚಿಸಿ.'
      : 'Hindustan Yatra is a travel agency based in Hubballi, Karnataka. We help travellers plan pilgrimage journeys, family holidays, group trips, and international vacations. Our team can discuss itineraries, transport, accommodation, and visa guidance based on your destination and chosen package. Check each tour plan for its price, inclusions, and booking terms.';
  const homepageTitle =
    locale === 'kn'
      ? 'ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ | ಹುಬ್ಬಳ್ಳಿಯ ಪ್ರವಾಸ ಸಂಸ್ಥೆ'
      : 'Hindustan Yatra | Travel Agency in Hubballi';

  const organizationId = 'https://hindustanyatra.com/#organization';
  const websiteId = 'https://hindustanyatra.com/#website';
  const pageUrl = `https://hindustanyatra.com${getPathname({ locale, href: '/' })}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': organizationId,
    name: 'Hindustan Yatra',
    slogan: 'Travel with New Experience',
    url: 'https://hindustanyatra.com',
    description: homepageDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '#123, 3rd Floor, Satellite Complex, Koppikar Road',
      addressLocality: 'Hubballi',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+919060085635',
      contactType: 'customer service',
      availableLanguage: ['English', 'Kannada'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'Hindustan Yatra',
    url: 'https://hindustanyatra.com',
    description: homepageDescription,
    inLanguage: ['en-IN', 'kn-IN'],
    publisher: { '@id': organizationId },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://hindustanyatra.com${getPathname({ locale: 'en', href: '/destinations' })}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: homepageTitle,
    description: homepageDescription,
    inLanguage: locale === 'kn' ? 'kn-IN' : 'en-IN',
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#home-intro', '#home-faq'],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    description: locale === 'kn'
      ? 'ಪ್ರವಾಸಗಳು, ಯೋಜನೆ, ಕಚೇರಿ, ವೀಸಾ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಪ್ಯಾಕೇಜ್ ವಿವರಗಳ ಕುರಿತು ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳು.'
      : 'Answers about tour types, trip planning, the office, visa guidance, and package inclusions.',
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      text: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  const definedTermsSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: locale === 'kn' ? 'ಪ್ರವಾಸ ಯೋಜನೆ ಪದಗಳು' : 'Travel planning terms',
    inLanguage: locale === 'kn' ? 'kn-IN' : 'en-IN',
    hasDefinedTerm: travelTerms.map(({ term, definition }) => ({
      '@type': 'DefinedTerm',
      name: term,
      description: definition,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: locale === 'kn' ? 'ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ ಜೊತೆ ಪ್ರವಾಸವನ್ನು ಹೇಗೆ ಯೋಜಿಸಬೇಕು' : 'How to plan a trip with Hindustan Yatra',
            description: homepageDescription,
            inLanguage: locale === 'kn' ? 'kn-IN' : 'en-IN',
            step: planningSteps.map((step, index) => ({
              '@type': 'HowToStep',
              position: index + 1,
              name: step.name,
              text: step.text,
              url: `${pageUrl}#plan-step-${index + 1}`,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermsSchema),
        }}
      />

        <HeroSection />

        <div
          className="
            relative
            z-20
            -mt-12
            rounded-t-[40px]
            bg-background
          "
        >
          <FeaturedTours locale={locale} />

          <section id="plan-trip" aria-labelledby="plan-trip-heading" className="bg-himalaya-50 px-6 py-16 md:px-12">
            <div className="mx-auto max-w-5xl">
              <h2 id="plan-trip-heading" className="font-display text-3xl font-semibold text-himalaya-900 md:text-4xl">
                {locale === 'kn' ? 'ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ ಜೊತೆ ಪ್ರವಾಸವನ್ನು ಹೇಗೆ ಯೋಜಿಸಬೇಕು' : 'How to plan a trip with Hindustan Yatra'}
              </h2>
              <ol className="mt-8 grid list-decimal gap-x-12 gap-y-7 pl-6 md:grid-cols-3">
                {planningSteps.map((step, index) => (
                  <li id={`plan-step-${index + 1}`} key={step.name} className="pl-2 text-saffron-700 marker:font-semibold">
                    <h3 id={`plan-step-heading-${index + 1}`} className="font-semibold text-himalaya-900">{step.name}</h3>
                    <p className="mt-3 text-base leading-relaxed text-himalaya-900">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            id="home-intro"
            aria-labelledby="home-intro-heading"
            className="bg-white px-6 py-16 md:px-12"
          >
            <div className="mx-auto max-w-4xl">
              <h2 id="home-intro-heading" className="font-display text-2xl font-semibold text-himalaya-900 md:text-3xl">
                {locale === 'kn' ? 'ಹುಬ್ಬಳ್ಳಿಯಿಂದ ನಿಮ್ಮ ಮುಂದಿನ ಪ್ರವಾಸವನ್ನು ಯೋಜಿಸಿ' : 'Plan your next trip with a Hubballi travel agency'}
              </h2>
              <p className="mt-4 max-w-[65ch] text-base leading-7 text-slate-700">
                {homepageDescription}
              </p>
            </div>
          </section>

          <section id="travel-terms" aria-labelledby="travel-terms-heading" className="bg-white px-6 py-14 md:px-12">
            <div className="mx-auto max-w-5xl">
              <h2 id="travel-terms-heading" className="font-display text-2xl font-semibold text-himalaya-900 md:text-3xl">
                {locale === 'kn' ? 'ಪ್ರವಾಸ ಯೋಜನೆಗೆ ಸಂಬಂಧಿಸಿದ ಪದಗಳು' : 'Travel planning terms'}
              </h2>
              <dl className="mt-6 grid gap-x-12 gap-y-7 md:grid-cols-3">
                {travelTerms.map(({ term, definition }) => (
                  <div key={term}>
                    <dt className="font-semibold text-himalaya-900">{term}</dt>
                    <dd className="mt-2 text-base leading-relaxed text-himalaya-900">{definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <SocialMediaFeed
            youtube={social.youtube}
            instagram={social.instagram}
          />

          <WhyUs locale={locale} />

          <section id="home-faq" aria-labelledby="home-faq-heading" className="bg-slate-50 px-6 py-16 md:px-12">
            <div className="mx-auto max-w-5xl">
              <h2 id="home-faq-heading" className="font-display text-2xl font-semibold text-himalaya-900 md:text-4xl">
                {locale === 'kn' ? 'ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ ಬಗ್ಗೆ ಹೆಚ್ಚಾಗಿ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು' : 'Frequently asked questions about Hindustan Yatra'}
              </h2>
              <div className="mt-10 space-y-8">
                {faqItems.map(({ question, answer }, index) => (
                  <article key={question} className="grid gap-x-12 gap-y-3 md:grid-cols-[minmax(14rem,5fr)_7fr]">
                    <h3 id={`home-faq-question-${index + 1}`} className="font-display text-lg font-semibold leading-snug text-himalaya-900">{question}</h3>
                    <p className="max-w-[65ch] text-base leading-relaxed text-himalaya-900">{answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <ContactSection />
        </div>
    </>
  );
}