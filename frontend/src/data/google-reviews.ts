export interface GoogleReview {
  id: string;
  author: string;
  avatarText: string;
  avatarBg: string;
  rating: number;
  timeAgo: {
    en: string;
    kn: string;
  };
  tourType?: {
    en: string;
    kn: string;
  };
  text: {
    en: string;
    kn: string;
  };
}

export const GOOGLE_REVIEWS_DATA: GoogleReview[] = [
  {
    id: 'rev-1',
    author: 'Basavaraj Patil',
    avatarText: 'B',
    avatarBg: 'bg-emerald-600',
    rating: 5,
    timeAgo: {
      en: '2 weeks ago',
      kn: '2 ವಾರಗಳ ಹಿಂದೆ',
    },
    tourType: {
      en: 'Chardham Yatra',
      kn: 'ಚಾರ್‌ಧಾಮ್ ಯಾತ್ರೆ',
    },
    text: {
      en: 'We had booked the Chardham Yatra package with Hindustan Yatra for our senior parents. The helicopter tickets, South Indian food arrangements, and hotel stays in Kedarnath & Badrinath were exceptionally well organised. Thank you Vilaskumar sir for personal guidance throughout the journey!',
      kn: 'ನಮ್ಮ ಹಿರಿಯ ಪೋಷಕರಿಗಾಗಿ ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ ಮೂಲಕ ಚಾರ್‌ಧಾಮ್ ಯಾತ್ರೆ ಬುಕ್ ಮಾಡಿದ್ದೆವು. ಹೆಲಿಕಾಪ್ಟರ್ ಟಿಕೆಟ್‌ಗಳು, ದಕ್ಷಿಣ ಭಾರತೀಯ ಊಟ ಹಾಗೂ ಕೇದಾರನಾಥ ಮತ್ತು ಬದರಿನಾಥದಲ್ಲಿನ ಹೋಟೆಲ್ ವಾಸ ಅತ್ಯಂತ ಅಚ್ಚುಕಟ್ಟಾಗಿತ್ತು. ಪ್ರಯಾಣದುದ್ದಕ್ಕೂ ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನ ನೀಡಿದ ವಿಲಾಸಕುಮಾರ್ ಸರ್ ಅವರಿಗೆ ಧನ್ಯವಾದಗಳು!',
    },
  },
  {
    id: 'rev-2',
    author: 'Ananya & Rakesh Kulkarni',
    avatarText: 'A',
    avatarBg: 'bg-sky-600',
    rating: 5,
    timeAgo: {
      en: '1 month ago',
      kn: '1 ತಿಂಗಳ ಹಿಂದೆ',
    },
    tourType: {
      en: 'Kashmir Holiday',
      kn: 'ಕಾಶ್ಮೀರ ರಜೆ ಪ್ರವಾಸ',
    },
    text: {
      en: 'Planned our 6-day Kashmir trip through Hindustan Yatra Hubballi. The Dal Lake houseboat stay in Srinagar, Gulmarg gondola ride, and Pahalgam cab services were seamless. Best travel agency in Hubli for family vacations!',
      kn: 'ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ ಹುಬ್ಬಳ್ಳಿ ಮೂಲಕ ನಮ್ಮ 6 ದಿನಗಳ ಕಾಶ್ಮೀರ ಪ್ರವಾಸ ಯೋಜಿಸಿದ್ದೆವು. ದಾಲ್ ಲೇಕ್ ಹೌಸ್‌ಬೋಟ್ ವಾಸ, ಗುಲ್ಮಾರ್ಗ್ ಗೊಂಡೋಲಾ ರೈಡ್ ಮತ್ತು ಪಹಲ್ಗಾಮ್ ಕ್ಯಾಬ್ ವ್ಯವಸ್ಥೆ ಅದ್ಭುತವಾಗಿತ್ತು. ಕುಟುಂಬ ಪ್ರವಾಸಕ್ಕೆ ಹುಬ್ಬಳ್ಳಿಯ ಅತ್ಯುತ್ತಮ ಪ್ರವಾಸ ಸಂಸ್ಥೆ!',
    },
  },
  {
    id: 'rev-3',
    author: 'Suresh Hiremath',
    avatarText: 'S',
    avatarBg: 'bg-amber-600',
    rating: 5,
    timeAgo: {
      en: '2 months ago',
      kn: '2 ತಿಂಗಳುಗಳ ಹಿಂದೆ',
    },
    tourType: {
      en: 'Kashi Gaya Yatra',
      kn: 'ಕಾಶಿ ಗಯಾ ಯಾತ್ರೆ',
    },
    text: {
      en: 'Very smooth pilgrimage experience to Varanasi, Prayagraj Sangam and Bodhgaya. The local priests and guide support for Pind Daan rituals was very respectful. Highly trustworthy service for pilgrimage lovers.',
      kn: 'ವಾರಣಾಸಿ, ಪ್ರಯಾಗ್‌ರಾಜ್ ಸಂಗಮ ಮತ್ತು ಬೋಧಗಯಾ ಯಾತ್ರೆ ಬಹಳ ಸುಗಮವಾಗಿ ನೆರವೇರಿತು. ಪಿಂಡದಾನ ಧಾರ್ಮಿಕ ವಿಧಿವಿಧಾನಗಳಿಗೆ ಸ್ಥಳೀಯ ಪುರೋಹಿತರು ಮತ್ತು ಮಾರ್ಗದರ್ಶಕರ ಬೆಂಬಲ ಗೌರವಯುತವಾಗಿತ್ತು. ಯಾತ್ರಿಕರಿಗೆ ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ.',
    },
  },
  {
    id: 'rev-4',
    author: 'Pooja Deshpande',
    avatarText: 'P',
    avatarBg: 'bg-indigo-600',
    rating: 5,
    timeAgo: {
      en: '3 months ago',
      kn: '3 ತಿಂಗಳುಗಳ ಹಿಂದೆ',
    },
    tourType: {
      en: 'Andaman Island Tour',
      kn: 'ಅಂಡಮಾನ್ ದ್ವೀಪ ಪ್ರವಾಸ',
    },
    text: {
      en: 'Outstanding experience covering Port Blair, Havelock and Radhanagar beach! The ferry tickets, sea walk, and luxury beach resort stays were managed on time without any delay. Truly memorable holiday.',
      kn: 'ಪೋರ್ಟ್ ಬ್ಲೇರ್, ಹ್ಯಾವ್‌ಲಾಕ್ ಮತ್ತು ರಾಧಾನಗರ ಬೀಚ್ ಪ್ರವಾಸ ಅದ್ಭುತವಾಗಿತ್ತು! ದೋಣಿ ಟಿಕೆಟ್‌ಗಳು, ವಾಟರ್ ಆಕ್ಟಿವಿಟಿಗಳು ಮತ್ತು ರೆಸಾರ್ಟ್ ವಾಸ ಎಲ್ಲವೂ ನಿಗದಿತ ಸಮಯಕ್ಕೆ ಅಚ್ಚುಕಟ್ಟಾಗಿ ಸಿಕ್ಕಿತು. ನಿಜಕ್ಕೂ ಮರೆಯಲಾಗದ ರಜೆ.',
    },
  },
  {
    id: 'rev-5',
    author: 'Dr. Chandrashekhar Angadi',
    avatarText: 'C',
    avatarBg: 'bg-teal-600',
    rating: 5,
    timeAgo: {
      en: '4 months ago',
      kn: '4 ತಿಂಗಳುಗಳ ಹಿಂದೆ',
    },
    tourType: {
      en: 'South India Temple Tour',
      kn: 'ದಕ್ಷಿಣ ಭಾರತ ದೇವಸ್ಥಾನ ಪ್ರವಾಸ',
    },
    text: {
      en: 'Traveled with a group of 14 family members from Hubballi. The AC coach, punctual pickup, and clean hotel rooms made our elders very comfortable. Transparent pricing with no hidden charges.',
      kn: 'ಹುಬ್ಬಳ್ಳಿಯಿಂದ 14 ಸದಸ್ಯರ ಕುಟುಂಬದೊಂದಿಗೆ ಪ್ರಯಾಣಿಸಿದ್ದೆವು. ಹವಾನಿಯಂತ್ರಿತ ವಾಹನ, ಸಮಯಕ್ಕೆ ಸರಿಯಾದ ಪಿಕಪ್ ಮತ್ತು ಸ್ವಚ್ಛ ಹೋಟೆಲ್ ಕೊಠಡಿಗಳು ನಮ್ಮ ಹಿರಿಯರಿಗೆ ತುಂಬಾ ಆರಾಮದಾಯಕ ಅನುಭವ ನೀಡಿದವು. ಪಾರದರ್ಶಕ ಬೆಲೆ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ.',
    },
  },
  {
    id: 'rev-6',
    author: 'Deepak Joshi',
    avatarText: 'D',
    avatarBg: 'bg-purple-600',
    rating: 5,
    timeAgo: {
      en: '5 months ago',
      kn: '5 ತಿಂಗಳುಗಳ ಹಿಂದೆ',
    },
    tourType: {
      en: 'Amarnath Yatra',
      kn: 'ಅಮರನಾಥ ಯಾತ್ರೆ',
    },
    text: {
      en: 'From medical clearance guidance to helicopter booking and Baltal camp arrangements, Hindustan Yatra supported us at every single step. Truly dedicated team in North Karnataka.',
      kn: 'ವೈದ್ಯಕೀಯ ಪ್ರಮಾಣಪತ್ರ ಮಾರ್ಗದರ್ಶನದಿಂದ ಹಿಡಿದು ಹೆಲಿಕಾಪ್ಟರ್ ಬುಕಿಂಗ್ ಮತ್ತು ಬಾಲ್ತಾಲ್ ಕ್ಯಾಂಪ್ ವ್ಯವಸ್ಥೆಯವರೆಗೆ, ಹಿಂದೂಸ್ತಾನ್ ಯಾತ್ರಾ ಪ್ರತಿ ಹೆಜ್ಜೆಯಲ್ಲೂ ನಮಗೆ ಬೆಂಬಲ ನೀಡಿದೆ. ಉತ್ತರ ಕರ್ನಾಟಕದ ಅತ್ಯಂತ ಸಮರ್ಪಿತ ತಂಡ.',
    },
  },
];
