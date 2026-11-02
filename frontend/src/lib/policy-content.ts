export type PolicySection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
  note?: string;
};

export type PolicyDocument = {
  title: string;
  description: string;
  intro: string;
  sections: PolicySection[];
};

export const POLICY_CONTACT = {
  email: 'info@hindustanyatra.com',
  phones: ['+91 9060085635', '+91 7676768086', '0836-4850735'],
  address: '#123, 3rd Floor, Satellite Complex, Koppikar Road, Hubballi, Karnataka, India',
} as const;

// Content is sourced from the brochure (pages 18-19). Cancellation timings are
// intentionally not published as a table until the business confirms them.
export const cancellationPolicy: PolicyDocument = {
  title: 'Cancellation Policy',
  description:
    'Cancellation, refund and group tour terms for Hindustan Yatra tour packages.',
  intro:
    'These terms apply to group tour packages described in the Hindustan Yatra brochure. Private cab and customised tours may carry separately agreed terms, which will be shared with you in writing.',
  sections: [
    {
      id: 'cancellation-refunds',
      heading: 'Cancellation and refunds',
      paragraphs: [
        'Refund eligibility depends on how far ahead of departure a cancellation is made and on the amount already paid. Our brochure refers to a 50% refund for cancellations made well before departure, and no refund for late cancellations.',
      ],
      note: 'The exact cancellation periods and refund calculation are being confirmed. Please contact our team for the written cancellation terms that apply to your specific booking before you pay.',
    },
    {
      id: 'how-to-cancel',
      heading: 'How to request a cancellation',
      paragraphs: [
        `Contact our team by phone or email (${POLICY_CONTACT.email}) as early as possible and quote your name and tour details. We will confirm your cancellation and the applicable refund in writing.`,
      ],
    },
    {
      id: 'third-party-services',
      heading: 'Third-party travel services',
      paragraphs: [
        'Hindustan Yatra operates as a tour operator. Hotels, lodges, resorts, airlines, trains, cruises, coaches, taxis and helicopter services are provided by third parties, and we do not directly own or control them.',
      ],
    },
    {
      id: 'flights-helicopters',
      heading: 'Flight and helicopter disruptions',
      paragraphs: [
        'Where flights or helicopter services are cancelled or delayed on journeys to destinations such as Muktinath, Kedarnath, Amarnath and Vaishno Devi, travellers may have to bear resulting losses and additional expenses. Helicopter package costs include the helicopter service and transfers to and from the helipad.',
      ],
    },
    {
      id: 'package-pricing',
      heading: 'Package pricing',
      paragraphs: [
        'Tour packages are offered as a whole, with inclusions and exclusions as described in the brochure. The tour cost is not split into individual components. Brochure details reflect the information available at the time of publication.',
      ],
    },
    {
      id: 'additional-expenses',
      heading: 'Expenses payable by travellers',
      paragraphs: ['The following are not included in the package and are paid by passengers:'],
      items: [
        'Entry fees',
        'Mineral water and medicines',
        'Rickshaw and taxi charges',
        'Boating, cable car, doli/poni and coolie services',
        'Border customs',
        'Camera charges',
        'Food and breakfast during train journeys',
      ],
    },
    {
      id: 'hotel-timings',
      heading: 'Hotel check-in and check-out',
      paragraphs: [
        'Check-in and check-out times follow hotel rules. Early check-in and late check-out are chargeable; please inform us in advance if you need them.',
      ],
    },
    {
      id: 'disputes',
      heading: 'Disputes',
      paragraphs: [
        'Complaints, suits, claims and disputes relating to tour arrangements are subject to Hubli jurisdiction only.',
      ],
    },
  ],
};

// Sourced from brochure page 18. Child-age basis and tax treatment are not
// stated there, so they are deliberately left out.
export const groupTourTerms: PolicyDocument = {
  title: 'Group Tour Terms and Conditions',
  description:
    'Transportation, accommodation, sightseeing, seating and child charges for Hindustan Yatra group tours.',
  intro:
    'These terms apply to Hindustan Yatra group tour packages. Private cab and customised tours may carry separately agreed terms, which will be shared with you in writing. Cancellation and refund terms are on our Cancellation Policy page.',
  sections: [
    {
      id: 'transportation',
      heading: 'Transportation',
      items: [
        'Train journeys use reserved second-class sleeper coaches, and other travel is by 2x2 super-deluxe bus.',
        'For smaller groups we may use a mini bus, Tempo Traveller or taxi, depending on group strength.',
        'Upper-class train tickets or flights can be arranged on written request well in advance, subject to availability, at extra cost to the passenger.',
      ],
    },
    {
      id: 'accommodation',
      heading: 'Accommodation',
      items: [
        'Separate rooms are allotted on a twin-sharing basis for overnight stays.',
        'Families with more than two members may be given a triple-bedded room, subject to hotel availability.',
        'If a triple-bedded room is not available, an extra rollaway bed may be provided.',
        'Check-in and check-out times follow hotel rules.',
      ],
    },
    {
      id: 'sightseeing',
      heading: 'Sightseeing',
      items: [
        'A tour manager accompanies the group throughout the journey.',
        'Local guides may be appointed at historical and pilgrimage sites, depending on requirements and availability.',
      ],
    },
    {
      id: 'seating',
      heading: 'Seating arrangements',
      items: [
        'Passengers must travel in their allotted bus seats.',
        'Seats are allotted by seniority and rotation.',
      ],
    },
    {
      id: 'child-charges',
      heading: 'Charges for children (3–11 years)',
      items: [
        '50% of the tour cost: no seat and no extra bed.',
        '75% of the tour cost: seat provided, no extra bed.',
        '100% of the tour cost: extra bed and seat.',
      ],
      paragraphs: [
        'These rates apply only when the child travels with two adults. If a child is accompanied by a single adult, the full amount is charged.',
      ],
    },
  ],
};

// Describes only what the website demonstrably does: enquiry, contact and
// brochure forms. Add cookie, analytics or payment sections once confirmed.
export const privacyPolicy: PolicyDocument = {
  title: 'Privacy Policy',
  description:
    'How Hindustan Yatra collects, uses and protects the personal information you share with us.',
  intro:
    'This policy explains what personal information we collect through our website enquiry, contact and brochure forms, why we collect it and the choices you have.',
  sections: [
    {
      id: 'who-we-are',
      heading: 'Who we are',
      paragraphs: [
        `Hindustan Yatra is a travel company based in Hubballi, Karnataka. You can reach us at ${POLICY_CONTACT.email} or ${POLICY_CONTACT.phones[0]}.`,
      ],
    },
    {
      id: 'information-we-collect',
      heading: 'Personal information we collect',
      paragraphs: ['When you submit an enquiry, contact or brochure request form, we ask for:'],
      items: [
        'Full name: to identify you and manage your enquiry or booking.',
        'Mobile number: to call you back, confirm bookings and share travel updates.',
        'Email address (required for brochure requests, optional for enquiries): to reply to your enquiry and send itineraries, invoices and booking communications.',
        'Preferred destination and message (optional): to understand the trip you want.',
      ],
    },
    {
      id: 'consent',
      heading: 'Your consent',
      paragraphs: [
        'Our forms ask you to agree to be contacted on the details you provide, by call, SMS or WhatsApp, about your travel enquiry. We only submit the form when you give that consent.',
      ],
    },
    {
      id: 'how-we-use',
      heading: 'How we use your information',
      items: [
        'Responding to enquiries and brochure requests.',
        'Planning, confirming and managing your tour bookings.',
        'Sending essential booking and travel communications.',
      ],
    },
    {
      id: 'sharing',
      heading: 'Sharing with travel suppliers',
      paragraphs: [
        'To arrange your trip we may need to share necessary traveller details with hotels, transport operators, guides and other suppliers. We share only what is needed for your booking.',
      ],
    },
    {
      id: 'retention-security',
      heading: 'Storage, security and retention',
      paragraphs: [
        'Your details are stored in our systems and used only for the purposes above. We keep enquiry and booking records for as long as needed to serve you and meet our legal and accounting obligations.',
      ],
    },
    {
      id: 'children',
      heading: "Children's information",
      paragraphs: [
        'Bookings and enquiries involving children should be made by a parent or guardian.',
      ],
    },
    {
      id: 'your-choices',
      heading: 'Your choices and requests',
      paragraphs: [
        `You can ask us to access, correct or delete the information we hold about you, or to stop contacting you, by writing to ${POLICY_CONTACT.email}. Some booking records may need to be retained to meet legal requirements.`,
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      paragraphs: [
        'We may update this policy from time to time. The latest version is always available on this page.',
      ],
    },
  ],
};
