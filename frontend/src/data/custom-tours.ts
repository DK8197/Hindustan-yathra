export type CustomTourCategory = 'domestic' | 'island';

export type CustomTour = {
  id: string;
  name: string;
  category: CustomTourCategory;
  days: number;
  from: string | null;
  places: string[];
  message: string;
};

// Enquiry templates supplied by the business. Selecting a tour pre-fills the
// enquiry form with `message`; visitors can edit it before sending.
export const customTours: CustomTour[] = [
  {
    id: 'andaman-6',
    name: 'Andaman',
    category: 'domestic',
    days: 6,
    from: 'Bengaluru',
    places: ['Havelock', 'Port Blair', 'Baratang'],
    message:
      'Hello, we are planning to offer the Andaman 6 Days tour package departing from Bengaluru. Please share the complete day-wise itinerary covering Havelock, Port Blair and Baratang. Provide hotel accommodation details, ferry arrangements, local transportation, sightseeing activities, meals, inclusions, exclusions, package cost per person, minimum group size, availability and cancellation policy.',
  },
  {
    id: 'enchanting-kashmir',
    name: 'Enchanting Kashmir',
    category: 'domestic',
    days: 6,
    from: 'Srinagar',
    places: ['Sonamarg', 'Gulmarg', 'Pahalgam', 'Srinagar', 'Dal Lake'],
    message:
      'Hello, please share the complete package details for our Enchanting Kashmir 6 Days tour starting from Srinagar. We require a day-wise itinerary covering Sonamarg, Gulmarg, Pahalgam, Srinagar and Dal Lake. Please include hotel categories, houseboat accommodation options, local transportation, sightseeing, meals, applicable permits, package pricing, inclusions, exclusions and booking conditions.',
  },
  {
    id: 'amarnath-yatra',
    name: 'Amarnath Yatra',
    category: 'domestic',
    days: 5,
    from: 'Srinagar',
    places: ['Sonamarg', 'Amarnath Cave', 'Gulmarg', 'Srinagar', 'Dal Lake'],
    message:
      'Hello, please provide the complete 5 Days Amarnath Yatra package details departing from Srinagar. Share the day-wise itinerary, Amarnath Cave pilgrimage arrangements, registration and permit requirements, helicopter or trekking options, accommodation, transportation, meals, medical and safety arrangements, package cost, inclusions, exclusions and cancellation terms.',
  },
  {
    id: 'chardham-yatra',
    name: 'Chardham Yatra',
    category: 'domestic',
    days: 12,
    from: 'Dehradun',
    places: ['Yamunotri', 'Gangotri', 'Kedarnath', 'Badrinath', 'Haridwar'],
    message:
      'Hello, please share the detailed 12 Days Chardham Yatra itinerary starting from Dehradun, covering Yamunotri, Gangotri, Kedarnath by helicopter and Badrinath, with Haridwar as part of the route. Please provide daily travel distances, hotel accommodation, helicopter arrangements and charges for Kedarnath, ground transportation, meals, pilgrimage registration, medical support, package pricing, inclusions, exclusions and cancellation policy.',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    category: 'domestic',
    days: 6,
    from: 'Leh',
    places: ['Khardung La Pass', 'Nubra Valley', 'Pangong Lake', 'Leh'],
    message:
      'Hello, please provide the complete 6 Days Ladakh tour package details starting from Leh. We require a day-wise itinerary covering Khardung La Pass, Nubra Valley and Pangong Lake. Kindly share accommodation details, camp options, local transportation, permits, acclimatization arrangements, meals, sightseeing, package cost per person, inclusions, exclusions and cancellation conditions.',
  },
  {
    id: 'darjeeling-gangtok',
    name: 'Darjeeling - Gangtok',
    category: 'domestic',
    days: 6,
    from: 'Bagdogra',
    places: ['Darjeeling', 'Gangtok', 'Tsomgo Lake'],
    message:
      'Hello, please share the complete 6 Days Darjeeling and Gangtok tour package itinerary starting from Bagdogra. Include Darjeeling sightseeing, Gangtok sightseeing and Tsomgo Lake visits. Please provide hotel details, airport transfers, intercity transportation, applicable permits, sightseeing arrangements, meals, package pricing, inclusions, exclusions and booking terms.',
  },
  {
    id: 'assam-meghalaya',
    name: 'Assam - Meghalaya',
    category: 'domestic',
    days: 6,
    from: 'Guwahati',
    places: ['Guwahati', 'Shillong', 'Cherrapunji', 'Kaziranga'],
    message:
      'Hello, please provide the complete 6 Days Assam and Meghalaya tour itinerary starting from Guwahati. We require details covering Guwahati, Shillong, Cherrapunji and Kaziranga. Please share accommodation, intercity transportation, sightseeing activities, Kaziranga safari arrangements and charges, meals, entry fees, package cost, inclusions, exclusions and cancellation policy.',
  },
  {
    id: 'kashi-gaya-yatra',
    name: 'Kashi Gaya Yatra',
    category: 'domestic',
    days: 6,
    from: 'Varanasi',
    places: ['Triveni Sangam (Prayagraj)', 'Gaya', 'Bodhgaya', 'Kashi'],
    message:
      'Hello, please share the complete 6 Days Kashi Gaya Yatra package itinerary starting from Varanasi. Include Triveni Sangam at Prayagraj, Gaya, Bodhgaya and Kashi. Kindly provide temple darshan arrangements, Pooja and Pind Daan arrangements if available, hotel accommodation, transportation, meals, local guides, package pricing, inclusions, exclusions and booking conditions.',
  },
  {
    id: 'best-of-maharashtra',
    name: 'Best of Maharashtra',
    category: 'domestic',
    days: 5,
    from: 'Pune',
    places: ['Ajanta', 'Ellora', 'Aurangabad', 'Trimbakeshwar', 'Shani Shingnapur', 'Shirdi'],
    message:
      'Hello, please provide the complete 5 Days Best of Maharashtra tour package itinerary starting from Pune. We require details covering Ajanta, Ellora, Aurangabad, Trimbakeshwar, Shani Shingnapur and Shirdi. Please share hotel accommodation, transportation, temple darshan arrangements, monument entry fees, meals, package pricing, inclusions, exclusions and cancellation policy.',
  },
  {
    id: 'golden-triangle',
    name: 'Golden Triangle Tour',
    category: 'domestic',
    days: 6,
    from: 'Delhi',
    places: ['Delhi', 'Mathura', 'Agra', 'Fatehpur Sikri', 'Jaipur'],
    message:
      'Hello, please share the complete 6 Days Golden Triangle Tour itinerary starting from Delhi, covering Mathura, Agra, Fatehpur Sikri and Jaipur. Kindly provide sightseeing schedules, hotel categories, intercity transportation, monument entry fees, local guide arrangements, meals, package cost per person, inclusions, exclusions and booking terms.',
  },
  {
    id: 'royal-rajasthan',
    name: 'Royal Rajasthan',
    category: 'domestic',
    days: 10,
    from: 'Ahmedabad',
    places: ['Jaipur', 'Jaisalmer', 'Jodhpur', 'Mount Abu', 'Udaipur', 'Pushkar'],
    message:
      'Hello, please provide the detailed 10 Days Royal Rajasthan tour package itinerary starting from Ahmedabad. The tour should cover Jaipur, Jaisalmer, Jodhpur, Mount Abu, Udaipur and Pushkar. Please share the day-wise route, hotel accommodation, transportation, desert safari and cultural activities, sightseeing, meals, package pricing, inclusions, exclusions and cancellation conditions.',
  },
  {
    id: 'shimla-manali',
    name: 'Shimla - Manali',
    category: 'domestic',
    days: 7,
    from: 'Delhi',
    places: ['Shimla', 'Kullu', 'Manali', 'Rohtang Pass', 'Chandigarh'],
    message:
      'Hello, please share the complete 7 Days Shimla and Manali tour itinerary starting from Delhi and covering Shimla, Kullu, Manali, Rohtang Pass and Chandigarh. Include hotel accommodation, transportation, sightseeing, snow activities, Rohtang Pass permits and vehicle arrangements, meals, package cost, inclusions, exclusions and cancellation policy.',
  },
  {
    id: 'best-of-gujarat',
    name: 'Best of Gujarat',
    category: 'domestic',
    days: 6,
    from: 'Ahmedabad',
    places: ['Ahmedabad', 'Sasan Gir', 'Somnath', 'Veraval', 'Porbandar', 'Dwarka', 'Nageshwar'],
    message:
      'Hello, please provide the complete 6 Days Best of Gujarat tour package itinerary starting from Ahmedabad. Include Ahmedabad, Sasan Gir, Somnath, Veraval, Porbandar, Dwarka and Nageshwar. Please share Gir safari availability and charges, temple darshan arrangements, hotel details, transportation, meals, sightseeing, package pricing, inclusions, exclusions and booking conditions.',
  },
  {
    id: 'amritsar-vaishnodevi',
    name: 'Amritsar - Vaishnodevi',
    category: 'domestic',
    days: 5,
    from: 'Amritsar',
    places: ['Amritsar', 'Wagah Border', 'Vaishnodevi'],
    message:
      'Hello, please share the complete 5 Days Amritsar and Vaishnodevi tour package itinerary starting from Amritsar. Include Golden Temple, Wagah Border ceremony and Vaishnodevi pilgrimage arrangements. Kindly provide accommodation, transportation, pilgrimage registration, helicopter or other travel options for Vaishnodevi if available, meals, package pricing, inclusions, exclusions and cancellation policy.',
  },
  {
    id: 'kerala-special',
    name: 'Kerala Special',
    category: 'domestic',
    days: 7,
    from: 'Kochi',
    places: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey', 'Kovalam', 'Thiruvananthapuram'],
    message:
      'Hello, please provide the complete 7 Days Kerala Special tour package itinerary starting from Kochi. We require a detailed day-wise schedule covering Kochi, Munnar, Thekkady, Alleppey, Kovalam and Thiruvananthapuram. Please include hotel accommodation, houseboat arrangements, local transportation, sightseeing, boating and activity charges, meals, package pricing, inclusions, exclusions and cancellation conditions.',
  },
  {
    id: 'mauritius',
    name: 'Mauritius',
    category: 'island',
    days: 7,
    from: null,
    places: ['Mauritius'],
    message:
      'Hello, please share the complete 7 Days Mauritius international tour package details. Kindly confirm departure city, flight options, return airfare, day-wise itinerary, hotel accommodation, airport transfers, island sightseeing, water sports and activity charges, visa requirements, travel insurance options, meals, package pricing per person, inclusions, exclusions and cancellation policy.',
  },
  {
    id: 'maldives',
    name: 'Maldives',
    category: 'island',
    days: 5,
    from: null,
    places: ['Maldives'],
    message:
      'Hello, please provide the complete 5 Days Maldives international tour package details. Kindly confirm departure city, flight options, return airfare, resort categories, room and meal plans, speedboat or seaplane transfers, water sports, island activities, visa requirements, travel insurance options, package cost per person, inclusions, exclusions and cancellation conditions.',
  },
  {
    id: 'andaman-island-7',
    name: 'Andaman',
    category: 'island',
    days: 7,
    from: null,
    places: ['Andaman Islands'],
    message:
      'Hello, please share the complete 7 Days Andaman island tour package details. Kindly confirm departure city, flight options, return airfare, day-wise itinerary, hotel and resort accommodation, Port Blair and Havelock sightseeing, ferry transfers, water sports, island excursions, meals, airport transfers, package pricing per person, inclusions, exclusions and cancellation policy.',
  },
];
