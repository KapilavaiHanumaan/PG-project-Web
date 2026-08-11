export const LOCALITIES = [
  { id: 'all', name: 'All Areas' },
  { id: 'madhapur', name: 'Madhapur', tag: 'IT Hub' },
  { id: 'gachibowli', name: 'Gachibowli', tag: 'Financial District' },
  { id: 'ameerpet', name: 'Ameerpet', tag: 'Coaching Hub' },
  { id: 'kukatpally', name: 'Kukatpally', tag: 'Metro Connected' },
  { id: 'hitech', name: 'Hitech City', tag: 'Tech Hub' },
  { id: 'kondapur', name: 'Kondapur', tag: 'Residential' },
];

export const BUDGET_RANGES = [
  { label: 'Any Budget', min: 0, max: 99999 },
  { label: 'Under ₹8,000', min: 0, max: 8000 },
  { label: '₹8,000 - ₹12,000', min: 8000, max: 12000 },
  { label: '₹12,000 - ₹18,000', min: 12000, max: 18000 },
  { label: '₹18,000+', min: 18000, max: 99999 },
];

export const GENDER_OPTIONS = [
  { label: 'All Preferences', value: 'all' },
  { label: 'Boys PG', value: 'boys' },
  { label: 'Girls PG', value: 'girls' },
  { label: 'Unisex / Co-Living', value: 'co-living' },
];

export const FEATURED_PGS = [
  {
    id: 'pg-1',
    name: 'Stanza Living - Skyline House',
    locality: 'Madhapur',
    gender: 'co-living',
    price: 11500,
    rating: 4.8,
    reviewsCount: 142,
    verifiedCount: 128,
    distanceMetro: '350m from Durgam Cheruvu Metro',
    distanceIT: '5 mins to Cyber Towers',
    badge: 'Trending #1 in Madhapur',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    amenities: ['High-Speed WiFi', '3-Time Meals', 'Air Conditioned', 'Biometric Lock', 'Daily Housekeeping', 'Power Backup'],
    stayProofPercent: 96,
    foodRating: 4.6,
    hygieneRating: 4.9,
    securityRating: 4.9,
    ownerVerified: true,
    description: 'Ultra-modern co-living space with gaming lounge, high-speed fiber internet, and chef-curated meals. Ideal for software professionals working in Mindspace and Cyber Towers.',
    recentReviews: [
      {
        user: 'Rahul V.',
        role: 'Software Engineer at Microsoft',
        verified: true,
        rating: 5,
        date: '2 days ago',
        comment: 'Stayed here for 8 months. High-speed WiFi is legit 300 Mbps. Food quality is consistently good compared to typical PGs in Madhapur.'
      },
      {
        user: 'Priya Sharma',
        role: 'UX Designer',
        verified: true,
        rating: 4.5,
        date: '1 week ago',
        comment: 'Biometric security and daily cleaning are impressive. Metro is right at 5 min walk.'
      }
    ]
  },
  {
    id: 'pg-2',
    name: 'Sri Sai Luxury PG for Women',
    locality: 'Gachibowli',
    gender: 'girls',
    price: 9200,
    rating: 4.7,
    reviewsCount: 98,
    verifiedCount: 89,
    distanceMetro: '800m from Raidurg Metro Station',
    distanceIT: '3 mins to DLF Cybercity',
    badge: 'Top Rated for Security',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    amenities: ['24/7 CCTV & Security', 'South & North Indian Meals', 'Washing Machines', 'RO Drinking Water', 'Attached Balcony'],
    stayProofPercent: 94,
    foodRating: 4.5,
    hygieneRating: 4.8,
    securityRating: 5.0,
    ownerVerified: true,
    description: 'Secure, clean, and homely accommodation exclusively for women professionals and university students near DLF Gachibowli.',
    recentReviews: [
      {
        user: 'Ananya Roy',
        role: 'Mahindra Uni Student',
        verified: true,
        rating: 5,
        date: '3 days ago',
        comment: 'Very safe environment with female wardens. The owner responds within minutes to any maintenance issue.'
      }
    ]
  },
  {
    id: 'pg-3',
    name: 'Zolo Oasis Co-Living',
    locality: 'Hitech City',
    gender: 'co-living',
    price: 13500,
    rating: 4.9,
    reviewsCount: 215,
    verifiedCount: 198,
    distanceMetro: '200m from Hitech City Metro',
    distanceIT: 'Opposite L&T Next Galleria',
    badge: 'Premium Executive',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    amenities: ['Gym & Recreation Room', 'Ergonomic Workspace', 'Unlimited Tea/Coffee', 'Weekly Linen Change', 'Smart TV in Rooms'],
    stayProofPercent: 98,
    foodRating: 4.8,
    hygieneRating: 5.0,
    securityRating: 4.9,
    ownerVerified: true,
    description: 'Premium executive living tailored for tech employees, consultants, and remote workers with dedicated study desks and high-speed mesh networks.',
    recentReviews: [
      {
        user: 'Karthik Raja',
        role: 'Data Scientist at Amazon',
        verified: true,
        rating: 5,
        date: 'Yesterday',
        comment: 'Zero broker hassle, fast deposit return, and quiet working environment. Worth every rupee.'
      }
    ]
  },
  {
    id: 'pg-4',
    name: 'Venkateshwara Elite Boys PG',
    locality: 'Ameerpet',
    gender: 'boys',
    price: 7200,
    rating: 4.5,
    reviewsCount: 176,
    verifiedCount: 154,
    distanceMetro: '150m from Ameerpet Interchange Metro',
    distanceIT: 'Near Naresh i Technologies',
    badge: 'Best Value Student PG',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    amenities: ['3-Time Buffet Food', 'Free WiFi', 'Self-Laundry Area', '24h Hot Water', 'CCTV Monitoring'],
    stayProofPercent: 91,
    foodRating: 4.3,
    hygieneRating: 4.4,
    securityRating: 4.6,
    ownerVerified: true,
    description: 'Budget-friendly, highly popular PG for tech trainees, coaching students, and job seekers located right next to Ameerpet Metro.',
    recentReviews: [
      {
        user: 'Suresh Kumar',
        role: 'Java Student Trainee',
        verified: true,
        rating: 4.5,
        date: '4 days ago',
        comment: 'Unbeatable price for Ameerpet location. Metro interchange is just across the street. Meals are warm and unlimited.'
      }
    ]
  },
  {
    id: 'pg-5',
    name: 'Urban Nest Luxury PG',
    locality: 'Kondapur',
    gender: 'co-living',
    price: 10800,
    rating: 4.6,
    reviewsCount: 110,
    verifiedCount: 102,
    distanceMetro: '10 mins to Miyapur Metro',
    distanceIT: 'Near Botanical Garden',
    badge: 'Peaceful Green Views',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    amenities: ['Terrace Garden', 'Smart Lock Access', 'Bi-weekly Doctor Checkup', 'Air Conditioned', 'North-South Fusion Food'],
    stayProofPercent: 93,
    foodRating: 4.5,
    hygieneRating: 4.7,
    securityRating: 4.7,
    ownerVerified: true,
    description: 'Quiet green setting near Botanical Garden Kondapur with spacious single & double sharing rooms.',
    recentReviews: [
      {
        user: 'Sneha M.',
        role: 'Data Analyst at Deloitte',
        verified: true,
        rating: 5,
        date: '5 days ago',
        comment: 'Peaceful environment to work after a hectic shift. Terrace garden is awesome for evening tea.'
      }
    ]
  },
  {
    id: 'pg-6',
    name: 'Green View Executive Girls Hostel',
    locality: 'Kukatpally',
    gender: 'girls',
    price: 8500,
    rating: 4.7,
    reviewsCount: 84,
    verifiedCount: 79,
    distanceMetro: '400m from JNTU Metro Station',
    distanceIT: 'Direct Bus to Hitech City',
    badge: 'Student Favorite',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    amenities: ['Biometric Access', '3-Time Meals', 'Study Room', 'In-house Maid Service', 'Power Generator Backup'],
    stayProofPercent: 95,
    foodRating: 4.6,
    hygieneRating: 4.8,
    securityRating: 4.9,
    ownerVerified: true,
    description: 'Located right near JNTU, ideal for engineering students and young professionals seeking safety and home-cooked meals.',
    recentReviews: [
      {
        user: 'Divya Reddy',
        role: 'JNTU B.Tech Student',
        verified: true,
        rating: 5,
        date: '1 week ago',
        comment: 'Felt like home since day one. Biometric entrance gate gives my parents complete peace of mind.'
      }
    ]
  }
];

export const FEATURES = [
  {
    icon: 'ShieldCheck',
    title: 'Verified Stay Reviews',
    description: 'Every review is validated through rent receipts or rental agreements. Zero fake broker hype.',
    gradient: 'from-blue-500 to-indigo-600',
    stat: '100% Verified Proofs'
  },
  {
    icon: 'BrainCircuit',
    title: 'Smart Fraud Detection',
    description: 'AI algorithms analyze review patterns, IP telemetry, and photo metadata to flag fake marketing posts.',
    gradient: 'from-purple-500 to-pink-600',
    stat: '94% Detection Accuracy'
  },
  {
    icon: 'Coins',
    title: 'PGCoin Reward Points',
    description: 'Earn points for writing authentic reviews, uploading room photos, and voting on helpful feedback.',
    gradient: 'from-amber-500 to-orange-600',
    stat: 'Earn up to 50 pts/review'
  },
  {
    icon: 'MapPin',
    title: 'Hyperlocal Hyderabad Search',
    description: 'Discover PGs with real-world proximity metrics to Hyderabad Metro stations, IT parks, and coaching institutes.',
    gradient: 'from-emerald-500 to-teal-600',
    stat: '25+ Metro Corridors'
  }
];

export const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Search a PG',
    description: 'Filter by Hyderabad locality (Madhapur, Gachibowli, Ameerpet...), budget, room sharing, and amenities.',
    icon: 'Search'
  },
  {
    step: '02',
    title: 'Read Verified Reviews',
    description: 'Inspect authentic photos, food quality ratings, water supply reports, and deposit refund histories.',
    icon: 'FileCheck2'
  },
  {
    step: '03',
    title: 'Stay & Upload Proof',
    description: 'Submit simple stay proof (rent receipt or lease copy) to activate your reviewer status.',
    icon: 'UploadCloud'
  },
  {
    step: '04',
    title: 'Earn & Redeem Rewards',
    description: 'Collect PGCoin reward points and redeem for Metro recharges, Swiggy food vouchers & shopping cards.',
    icon: 'Gift'
  }
];

export const TRUST_STATS = [
  { label: 'Fake Review Detection Accuracy', value: '94%', subtext: 'Powered by AI stay proof verification' },
  { label: 'Monthly Hyderabad Searches', value: '18,000+', subtext: 'Students & IT professionals active monthly' },
  { label: 'User Trust Preference', value: '87%', subtext: 'Choose verified PGTrust over broker promises' }
];

export const VERIFICATION_PIPELINE = [
  { title: 'Upload Proof', desc: 'Tenant submits rent receipt or agreement copy', status: 'Step 1', color: 'bg-blue-500' },
  { title: 'AI Verification', desc: 'Metadata & document authenticity check', status: 'Step 2', color: 'bg-purple-500' },
  { title: 'Trust Score', desc: 'Rating weighted by stay duration & photo proof', status: 'Step 3', color: 'bg-amber-500' },
  { title: 'Published Review', desc: 'Verified badge added + 50 PGCoins credited', status: 'Step 4', color: 'bg-emerald-500' },
];

export const REWARD_ACTIONS = [
  { action: 'Submit Verified Stay Review', points: 50, badge: 'High Reward', icon: 'FileText' },
  { action: 'Add Real Room & Food Photos', points: 20, badge: 'Popular', icon: 'Camera' },
  { action: 'Receive Helpful Upvotes', points: 5, badge: 'Passive', icon: 'ThumbsUp' },
  { action: 'Report Fake Broker Review', points: 25, badge: 'Community', icon: 'Flag' },
];

export const REDEEMABLE_REWARDS = [
  { title: '₹50 Food Coupon', provider: 'Swiggy / Zomato', points: 50, category: 'Food & Dining', icon: 'Utensils' },
  { title: 'Hyderabad Metro Recharge', provider: 'L&T Metro Smart Card', points: 100, category: 'Travel', icon: 'Train' },
  { title: 'Express Laundry Voucher', provider: 'Laundrokart / In-House', points: 75, category: 'Services', icon: 'Shirt' },
  { title: '₹250 Gift Voucher', provider: 'Amazon Pay', points: 250, category: 'Shopping', icon: 'ShoppingBag' },
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Ananya Roy',
    role: 'Mahindra University Student',
    locality: 'Kukatpally / Bachupally',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'Finding a female PG in Hyderabad with good food and actual security felt impossible until I checked PGTrust. The stay-verified review showed the exact food menu and safety score!'
  },
  {
    id: 't-2',
    name: 'Rahul Verma',
    role: 'Software Engineer, Hitech City',
    locality: 'Madhapur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'Brokers in Madhapur charge half a month rent and show fake pictures. PGTrust saved me ₹8,000 in broker fees. Plus, my honest review earned me a ₹100 Metro card recharge!'
  },
  {
    id: 't-3',
    name: 'Sneha Kulkarni',
    role: 'Data Analyst at Deloitte',
    locality: 'Gachibowli',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'The deposit refund history flag on PGTrust is a lifesaver. I avoided a PG notorious for withholding deposits and found an executive co-living space with fast WiFi.'
  }
];
