import { TenantBusiness } from './tenant.models';

export const TENANTS: TenantBusiness[] = [
  {
    id: 'tenant-001',
    code: 'adq',
    username: 'royal-bike-wash',
    businessName: 'Royal Bike Wash',
    category: 'bike-wash',
    tagline: 'Premium foam wash and detailing for riders who notice everything.',
    description: 'A fast, polished bike care studio for daily commuters, weekend riders, and superbike owners.',
    coverImage: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=1600&q=80',
    phone: '+91 98765 41001',
    whatsapp: '+919876541001',
    address: '18 Service Lane, Indiranagar',
    city: 'Bengaluru',
    rating: 4.9,
    reviewCount: 428,
    services: [
      { name: 'Basic Wash', description: 'Pressure rinse, shampoo, dry wipe, and tyre shine.', price: 'Rs. 149', duration: '25 min' },
      { name: 'Foam Wash', description: 'Snow foam soak, microfiber hand wash, and wax finish.', price: 'Rs. 249', duration: '40 min', highlight: 'Most booked' },
      { name: 'Chain Cleaning', description: 'Degreasing, lubrication, and sprocket inspection.', price: 'Rs. 199', duration: '30 min' },
      { name: 'Ceramic Detail', description: 'Deep clean, polish correction, ceramic spray protection.', price: 'Rs. 1,299', duration: '3 hrs' }
    ],
    openingHours: [
      { day: 'Mon - Sat', hours: '8:00 AM - 8:30 PM' },
      { day: 'Sunday', hours: '9:00 AM - 6:00 PM' }
    ],
    theme: {
      primary: '#f7c948',
      secondary: '#111827',
      background: '#07090d',
      surface: '#121720',
      text: '#f8fafc',
      headingFont: 'Inter Tight, Inter, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '18px',
      buttonStyle: 'pill',
      cardStyle: 'glass'
    },
    layout: {
      navigation: 'transparent',
      hero: 'split',
      services: 'pricing',
      gallery: 'grid',
      footer: 'detailed'
    },
    content: {
      sections: ['hero', 'booking', 'pricing', 'services', 'gallery', 'testimonials', 'opening-hours', 'location', 'contact'],
      eyebrow: 'Ride in clean. Ride out royal.',
      primaryCta: 'Book a wash',
      secondaryCta: 'View packages',
      bookingTitle: 'Book your next wash',
      bookingFields: ['Bike model', 'Package', 'Preferred time'],
      gallery: [
        'Foam cannon wash bay',
        'Before and after detailing',
        'Chain care station',
        'Ceramic polish finish'
      ],
      testimonials: [
        { name: 'Arjun M.', quote: 'My matte black bike looked showroom fresh after the ceramic detail.', meta: 'KTM Duke 390' },
        { name: 'Sana P.', quote: 'Quick, careful, and the chain clean was worth every rupee.', meta: 'Royal Enfield owner' }
      ],
      locationNote: 'Two minutes from Indiranagar Metro, with a dedicated rider waiting zone.',
      highlights: ['Foam wash specialists', 'Premium microfiber process', 'UPI and card accepted']
    }
  },
  {
    id: 'tenant-002',
    code: 'k7x',
    username: 'grand-palace-hotel',
    businessName: 'Grand Palace Hotel',
    category: 'hotel',
    tagline: 'A refined city stay with quiet rooms, warm service, and skyline dining.',
    description: 'Luxury rooms, business facilities, rooftop dining, and a concierge team tuned for effortless stays.',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    phone: '+91 98765 42002',
    email: 'reservations@grandpalace.example',
    address: '7 Palace Road',
    city: 'Jaipur',
    rating: 4.8,
    reviewCount: 1190,
    services: [
      { name: 'Deluxe Room', description: 'King bed, city view, breakfast included.', price: 'Rs. 6,500/night' },
      { name: 'Heritage Suite', description: 'Separate lounge, bath, welcome platter.', price: 'Rs. 12,000/night', highlight: 'Signature' },
      { name: 'Airport Transfer', description: 'Private car pickup and drop.', price: 'On request' }
    ],
    openingHours: [{ day: 'Front desk', hours: '24 hours' }],
    theme: {
      primary: '#b88a44',
      secondary: '#23302b',
      background: '#fbfaf7',
      surface: '#ffffff',
      text: '#20241f',
      headingFont: 'Georgia, Times New Roman, serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '6px',
      buttonStyle: 'square',
      cardStyle: 'elevated'
    },
    layout: {
      navigation: 'centered',
      hero: 'full-image',
      services: 'horizontal',
      gallery: 'masonry',
      footer: 'detailed'
    },
    content: {
      sections: ['hero', 'booking', 'rooms', 'amenities', 'gallery', 'about', 'testimonials', 'location', 'contact'],
      eyebrow: 'Jaipur luxury hotel',
      primaryCta: 'Check availability',
      secondaryCta: 'Explore rooms',
      bookingTitle: 'Reserve your stay',
      bookingFields: ['Check-in', 'Check-out', 'Guests'],
      amenities: ['Rooftop restaurant', 'Airport transfers', 'Conference lounge', 'Spa access', 'High-speed Wi-Fi', 'Valet parking'],
      aboutTitle: 'Heritage calm, modern comfort',
      about: 'Grand Palace Hotel balances classic hospitality with crisp rooms, thoughtful dining, and attentive concierge support.',
      gallery: ['Royal suite', 'Rooftop dinner', 'Lobby lounge', 'Courtyard breakfast', 'Conference room'],
      testimonials: [
        { name: 'Meera S.', quote: 'Elegant rooms and a concierge team that handled every detail.', meta: 'Family stay' },
        { name: 'Daniel K.', quote: 'The rooftop dinner was the highlight of our Jaipur trip.', meta: 'International guest' }
      ],
      stats: [
        { label: 'Rooms', value: '82' },
        { label: 'Dining', value: '3 venues' },
        { label: 'Check-in', value: '24/7' }
      ]
    }
  },
  {
    id: 'tenant-003',
    code: 'm2p',
    username: 'glow-wellness-spa',
    businessName: 'Glow Wellness Spa',
    category: 'spa',
    tagline: 'Slow rituals, botanical care, and quiet rooms for real rest.',
    description: 'A premium wellness studio for massage, facials, aromatherapy, and restorative body treatments.',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
    phone: '+91 98765 43003',
    whatsapp: '+919876543003',
    address: '22 Lotus Avenue',
    city: 'Pune',
    rating: 4.9,
    reviewCount: 312,
    services: [
      { name: 'Aroma Therapy', description: 'A gentle full-body massage with custom essential oils.', price: 'Rs. 2,400', duration: '60 min' },
      { name: 'Deep Calm Ritual', description: 'Massage, steam, and herbal tea wind-down.', price: 'Rs. 3,900', duration: '90 min', highlight: 'Wellness pick' },
      { name: 'Radiance Facial', description: 'Hydrating cleanse, mask, and facial massage.', price: 'Rs. 2,100', duration: '50 min' }
    ],
    openingHours: [
      { day: 'Mon - Sat', hours: '10:00 AM - 9:00 PM' },
      { day: 'Sunday', hours: '10:00 AM - 5:00 PM' }
    ],
    theme: {
      primary: '#7a9b78',
      secondary: '#d8b98f',
      background: '#f6f4ef',
      surface: '#ffffff',
      text: '#28332d',
      headingFont: 'Cormorant Garamond, Georgia, serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '28px',
      buttonStyle: 'pill',
      cardStyle: 'flat'
    },
    layout: {
      navigation: 'compact',
      hero: 'centered',
      services: 'grid',
      gallery: 'carousel',
      footer: 'simple'
    },
    content: {
      sections: ['hero', 'booking', 'services', 'about', 'gallery', 'testimonials', 'opening-hours', 'contact'],
      eyebrow: 'Wellness, softly scheduled',
      primaryCta: 'Book appointment',
      secondaryCta: 'View treatments',
      bookingTitle: 'Choose a calming slot',
      bookingFields: ['Treatment', 'Therapist preference', 'Date'],
      aboutTitle: 'A pause you can feel',
      about: 'Every treatment is paced with warm towels, herbal oils, soft light, and time between appointments.',
      gallery: ['Treatment room', 'Botanical oils', 'Couples suite', 'Tea lounge'],
      testimonials: [
        { name: 'Priya R.', quote: 'The deep calm ritual genuinely reset my week.', meta: 'Monthly member' },
        { name: 'Anika D.', quote: 'Quiet, clean, and beautifully attentive.', meta: 'Facial treatment' }
      ],
      highlights: ['Certified therapists', 'Private rooms', 'Botanical products']
    }
  },
  {
    id: 'tenant-004',
    code: 't8r',
    username: 'math-with-rahul',
    businessName: 'Math with Rahul',
    category: 'home-tuition',
    tagline: 'Math tutoring that turns weak chapters into confident scores.',
    description: 'One-to-one and small group coaching for classes 6-12, with weekly practice, parent updates, and demo classes.',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80',
    phone: '+91 98765 44004',
    whatsapp: '+919876544004',
    email: 'hello@mathwithrahul.example',
    city: 'Delhi NCR',
    rating: 4.9,
    reviewCount: 176,
    services: [
      { name: 'Class 6-8 Foundation', description: 'Concept building, worksheets, and school exam prep.', price: 'Rs. 4,000/month' },
      { name: 'Class 9-10 Board Prep', description: 'NCERT, sample papers, and weekly doubt clearing.', price: 'Rs. 6,000/month', highlight: 'Popular' },
      { name: 'Class 11-12 Core Math', description: 'Calculus, algebra, vectors, and test strategy.', price: 'Rs. 8,000/month' }
    ],
    openingHours: [
      { day: 'Mon - Fri', hours: '4:00 PM - 9:00 PM' },
      { day: 'Sat - Sun', hours: '9:00 AM - 2:00 PM' }
    ],
    theme: {
      primary: '#2563eb',
      secondary: '#14b8a6',
      background: '#f8fbff',
      surface: '#ffffff',
      text: '#172033',
      headingFont: 'Inter, Arial, sans-serif',
      bodyFont: 'Inter, Arial, sans-serif',
      borderRadius: '14px',
      buttonStyle: 'rounded',
      cardStyle: 'bordered'
    },
    layout: {
      navigation: 'standard',
      hero: 'editorial',
      services: 'list',
      gallery: 'grid',
      footer: 'detailed'
    },
    content: {
      sections: ['hero', 'services', 'teaching-method', 'results', 'testimonials', 'booking', 'opening-hours', 'contact'],
      eyebrow: 'Classes 6-12 mathematics',
      primaryCta: 'Book free demo',
      secondaryCta: 'View subjects',
      bookingTitle: 'Schedule a demo class',
      bookingFields: ['Student class', 'Board', 'Preferred slot'],
      highlights: ['CBSE and ICSE', 'Weekly parent updates', 'Small batch option'],
      stats: [
        { label: 'Average score lift', value: '+22%' },
        { label: 'Students taught', value: '340+' },
        { label: 'Demo class', value: 'Free' }
      ],
      testimonials: [
        { name: 'Nisha K.', quote: 'Rahul sir made algebra feel manageable in three weeks.', meta: 'Class 10 parent' },
        { name: 'Vivaan S.', quote: 'The weekly tests helped me stop panicking before exams.', meta: 'Class 9 student' }
      ]
    }
  }
];
