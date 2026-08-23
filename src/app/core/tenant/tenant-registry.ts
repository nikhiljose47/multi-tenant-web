import { TenantBusiness } from './tenant.models';
import { THEME_PRESETS } from './theme-presets';

export const TENANTS: TenantBusiness[] = [
  {
    id: 'tenant-001',
    code: 'adq',
    username: 'royal-bike-wash',
    businessName: 'Royal Bike Wash',
    category: 'bike-wash',
    layoutStyle: 'bold',
    composition: 'conversion',
    tagline: 'Premium foam wash and detailing for riders who notice everything.',
    description: 'A fast, polished bike care studio for daily commuters, weekend riders, and superbike owners.',
    coverImage: '/media/placeholder.svg',
    phone: '+91 98765 41001',
    whatsapp: '+919876541001',
    address: '18 Service Lane, Indiranagar',
    city: 'Bengaluru',
    lat: 12.9716,
    lng: 77.6412,
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
    theme: THEME_PRESETS.midnight,
    layout: {
      navigation: 'transparent',
      hero: 'split',
      services: 'pricing',
      gallery: 'grid',
      footer: 'detailed'
    },
    content: {
      sections: ['booking', 'pricing', 'services', 'gallery', 'testimonials', 'opening-hours', 'location', 'contact'],
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
    layoutStyle: 'elegant',
    composition: 'story',
    tagline: 'A refined city stay with quiet rooms, warm service, and skyline dining.',
    description: 'Luxury rooms, business facilities, rooftop dining, and a concierge team tuned for effortless stays.',
    coverImage: '/media/placeholder.svg',
    phone: '+91 98765 42002',
    email: 'reservations@grandpalace.example',
    address: '7 Palace Road',
    city: 'Jaipur',
    lat: 26.9124,
    lng: 75.7873,
    rating: 4.8,
    reviewCount: 1190,
    services: [
      { name: 'Deluxe Room', description: 'King bed, city view, breakfast included.', price: 'Rs. 6,500/night' },
      { name: 'Heritage Suite', description: 'Separate lounge, bath, welcome platter.', price: 'Rs. 12,000/night', highlight: 'Signature' },
      { name: 'Airport Transfer', description: 'Private car pickup and drop.', price: 'On request' }
    ],
    openingHours: [{ day: 'Front desk', hours: '24 hours' }],
    theme: THEME_PRESETS.classic,
    layout: {
      navigation: 'centered',
      hero: 'full-image',
      services: 'horizontal',
      gallery: 'masonry',
      footer: 'detailed'
    },
    content: {
      sections: ['booking', 'rooms', 'amenities', 'gallery', 'about', 'testimonials', 'location', 'contact'],
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
    layoutStyle: 'minimal',
    composition: 'showcase',
    tagline: 'Slow rituals, botanical care, and quiet rooms for real rest.',
    description: 'A premium wellness studio for massage, facials, aromatherapy, and restorative body treatments.',
    coverImage: '/media/placeholder.svg',
    phone: '+91 98765 43003',
    whatsapp: '+919876543003',
    address: '22 Lotus Avenue',
    city: 'Pune',
    lat: 18.5204,
    lng: 73.8567,
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
    theme: THEME_PRESETS.meadow,
    layout: {
      navigation: 'compact',
      hero: 'centered',
      services: 'grid',
      gallery: 'carousel',
      footer: 'simple'
    },
    content: {
      sections: ['booking', 'services', 'about', 'gallery', 'testimonials', 'opening-hours', 'contact'],
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
    id: 'tenant-005',
    code: 'q9f',
    username: 'crispy-bucket-kitchen',
    businessName: 'Crispy Bucket Kitchen',
    category: 'food',
    layoutStyle: 'modern',
    composition: 'catalog',
    tagline: 'Hand-breaded crispy chicken, loaded burgers, and buckets built for sharing.',
    description: 'A fast-casual fried chicken and burger kitchen serving crispy buckets, smash burgers, wraps, and sides for delivery or pickup.',
    coverImage: '/media/placeholder.svg',
    phone: '+91 98765 45005',
    whatsapp: '+919876545005',
    address: '4 High Street, Koramangala',
    city: 'Bengaluru',
    lat: 12.9352,
    lng: 77.6245,
    rating: 4.6,
    reviewCount: 2140,
    services: [
      { name: '6pc Crispy Bucket', description: 'Six pieces of our signature hand-breaded crispy chicken.', price: 'Rs. 449', group: 'Buckets & Combos', veg: false, highlight: 'Bestseller', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80' },
      { name: 'Family Feast Bucket', description: '12pc crispy chicken, 4 hot wings, fries, and dips for the table.', price: 'Rs. 899', group: 'Buckets & Combos', veg: false, highlight: 'Feeds 4', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=80' },
      { name: 'Classic Zinger Burger', description: 'Crispy fillet, spiced mayo, lettuce, in a toasted bun.', price: 'Rs. 199', group: 'Burgers', veg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80' },
      { name: 'Smoky BBQ Chicken Burger', description: 'Grilled chicken, smoky BBQ sauce, crunchy slaw.', price: 'Rs. 229', group: 'Burgers', veg: false, highlight: 'New', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80' },
      { name: 'Paneer Tikka Burger', description: 'Char-grilled paneer patty, mint mayo, pickled onion.', price: 'Rs. 189', group: 'Burgers', veg: true, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80' },
      { name: 'Peri Peri Chicken Wrap', description: 'Grilled peri chicken, crunchy veggies, garlic sauce, rolled tight.', price: 'Rs. 179', group: 'Wraps & Rolls', veg: false, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80' },
      { name: 'Veggie Delight Wrap', description: 'Crispy vegetable patty, cheese, and tangy sauce.', price: 'Rs. 149', group: 'Wraps & Rolls', veg: true, image: 'https://images.unsplash.com/photo-1626200758897-193ecc3f6b09?auto=format&fit=crop&w=900&q=80' },
      { name: 'Loaded Fries', description: 'Crinkle fries topped with cheese sauce and jalapenos.', price: 'Rs. 149', group: 'Sides', veg: true, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80' },
      { name: 'Hot Wings (6pc)', description: 'Spicy glazed chicken wings with a cool dip.', price: 'Rs. 219', group: 'Sides', veg: false, image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=900&q=80' },
      { name: 'Cheesy Fries', description: 'Golden fries drenched in melted cheese sauce.', price: 'Rs. 129', group: 'Sides', veg: true, image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80' },
      { name: 'Cold Coffee Shake', description: 'Thick, chilled coffee shake topped with cream.', price: 'Rs. 129', group: 'Beverages', veg: true, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80' },
      { name: 'Fresh Lime Soda', description: 'Sweet, salted, or mixed — served chilled.', price: 'Rs. 79', group: 'Beverages', veg: true, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80' }
    ],
    openingHours: [
      { day: 'Mon - Sun', hours: '11:00 AM - 11:30 PM' }
    ],
    theme: THEME_PRESETS.sunrise,
    layout: {
      navigation: 'standard',
      hero: 'full-image',
      services: 'grid',
      gallery: 'masonry',
      footer: 'detailed'
    },
    content: {
      sections: ['offers', 'menu', 'about', 'gallery', 'testimonials', 'opening-hours', 'location', 'contact'],
      eyebrow: 'Order online for delivery or pickup',
      primaryCta: 'Order now',
      secondaryCta: 'See offers',
      deliveryEta: '30-35 min delivery',
      orderNote: 'Tap add on any item to build your order, then send it straight to us on WhatsApp.',
      menuGroups: ['Buckets & Combos', 'Burgers', 'Wraps & Rolls', 'Sides', 'Beverages'],
      offers: [
        { title: 'Flat 20% off on Family Feast Bucket', description: 'Valid on orders above Rs. 800, all week.', tag: 'COMBO', code: 'FEAST20', offerType: 'discount' },
        { title: 'Buy 1 Get 1 on Burgers', description: 'Every Tuesday, dine-in and delivery.', tag: 'TUESDAY', code: 'BOGOBURGER', offerType: 'bogo' },
        { title: 'Free Cold Coffee above Rs. 500', description: 'Automatically added at checkout.', tag: 'FREEBIE', offerType: 'freebie' }
      ],
      aboutTitle: 'Crispy on the outside, always fresh inside',
      about: 'Every piece is hand-breaded and cooked to order in small batches, so buckets, burgers, and wraps reach you hot, crisp, and never sitting under a heat lamp.',
      gallery: [
        'Signature crispy bucket',
        'Smash burger stack',
        'Fresh out of the fryer',
        'Packed for delivery'
      ],
      testimonials: [
        { name: 'Rohit K.', quote: 'The family feast bucket is unbeatable value and always hot on arrival.', meta: 'Regular, Koramangala' },
        { name: 'Fatima A.', quote: 'Paneer tikka burger is better than most non-veg options out there.', meta: 'Weekly order' }
      ],
      highlights: ['Hand-breaded daily', '30 min delivery promise', 'Veg and non-veg options']
    }
  },
  {
    id: 'tenant-004',
    code: 't8r',
    username: 'math-with-rahul',
    businessName: 'Math with Rahul',
    category: 'home-tuition',
    layoutStyle: 'friendly',
    composition: 'directory',
    tagline: 'Math tutoring that turns weak chapters into confident scores.',
    description: 'One-to-one and small group coaching for classes 6-12, with weekly practice, parent updates, and demo classes.',
    coverImage: '/media/placeholder.svg',
    phone: '+91 98765 44004',
    whatsapp: '+919876544004',
    email: 'hello@mathwithrahul.example',
    city: 'Delhi NCR',
    lat: 28.6139,
    lng: 77.2090,
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
    theme: THEME_PRESETS.ocean,
    layout: {
      navigation: 'standard',
      hero: 'editorial',
      services: 'list',
      gallery: 'grid',
      footer: 'detailed'
    },
    content: {
      sections: ['services', 'teaching-method', 'results', 'testimonials', 'booking', 'opening-hours', 'contact'],
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
