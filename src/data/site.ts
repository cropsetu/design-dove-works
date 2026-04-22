// Central business + content data for Star Security & Bouncer
import {
  Shield, Users, Building2, Factory, Home, UserCheck, ShoppingBag,
  Warehouse, Banknote, Stethoscope, GraduationCap, UtensilsCrossed,
  Landmark, Truck, KeyRound, HeartHandshake, Crown, Headphones, Camera
} from "lucide-react";

export const SITE = {
  name: "Star Security & Bouncer",
  shortName: "Star Security",
  tagline: "It's time to upgrade your security — SWITCH TO STAR",
  description:
    "Pune-based, police-permitted security agency providing trained guards, bouncers, bodyguards and integrated protection across Maharashtra. ISO certified, 18+ years of trusted service.",
  phone: "+91 98765 43210",
  phoneDisplay: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "info@starsecuritybouncer.com",
  address: {
    line1: "Office No. 12, 2nd Floor, Star Plaza",
    line2: "Near Karve Statue, Kothrud",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411038",
    country: "India",
  },
  hours: "24 / 7 — Round-the-clock deployment & support",
  established: 2007,
  social: {
    facebook: "https://facebook.com/starsecuritybouncer",
    instagram: "https://instagram.com/starsecuritybouncer",
    linkedin: "https://linkedin.com/company/starsecuritybouncer",
    youtube: "https://youtube.com/@starsecuritybouncer",
  },
  badges: ["Police Permitted", "ISO 9001:2015 Certified", "PSARA Licensed", "18+ Years of Trust"],
};

export const STATS = [
  { value: "18+", label: "Years of Service" },
  { value: "500+", label: "Happy Clients" },
  { value: "2000+", label: "Trained Personnel" },
  { value: "24/7", label: "Rapid Response" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
  forWhom: string[];
  process: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
  image?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "manned-guarding",
    title: "Manned Guarding",
    short: "Trained, uniformed security guards for round-the-clock site protection.",
    description: "Our manned guarding service places PSARA-trained, background-verified guards at your premises 24×7 — backed by supervisors, mobile patrols and a central control room.",
    icon: Shield,
    highlights: ["Background-verified, PSARA-trained guards", "Day & night shifts with supervisor rounds", "Daily reporting and incident logs", "Replacement guarantee within hours"],
    forWhom: ["Corporate offices", "Residential societies", "Industrial sites", "Retail outlets"],
    process: [
      { step: "Site survey", detail: "Free risk assessment and manpower planning at your premises." },
      { step: "Deployment", detail: "Trained guards deployed in uniform within 48 hours." },
      { step: "Supervision", detail: "Daily supervisor checks, mobile patrol & central control." },
      { step: "Review", detail: "Monthly performance review and continuous training." },
    ],
    faqs: [
      { q: "Are your guards police verified?", a: "Yes. Every guard undergoes police verification, PSARA training and medical fitness checks before deployment." },
      { q: "How quickly can you deploy?", a: "Typically within 48 hours of contract sign-off; emergency deployments possible same-day." },
    ],
  },
  {
    slug: "bouncer-bodyguard",
    title: "Bouncer & Bodyguard",
    short: "Trained bouncers and personal bodyguards for events, clubs and individuals.",
    description: "Physically fit, combat-trained bouncers and close-protection bodyguards for nightlife venues, weddings, celebrities and high-profile individuals.",
    icon: Users,
    highlights: ["Combat & crowd-control trained", "Discreet plain-clothes or uniformed", "Single-day to long-term contracts", "Strict NDA & code of conduct"],
    forWhom: ["Pubs, clubs & lounges", "Weddings & private parties", "Celebrities & politicians", "Corporate VIPs"],
    process: [
      { step: "Brief", detail: "Understand venue, threat profile and dress code." },
      { step: "Team selection", detail: "Hand-picked bouncers matched to your event size." },
      { step: "On-site control", detail: "Entry screening, crowd control and incident response." },
      { step: "Debrief", detail: "Post-event report and improvement recommendations." },
    ],
    faqs: [
      { q: "Can I hire a bouncer for one night?", a: "Yes. We offer single-shift, single-day and recurring contracts." },
      { q: "Do bodyguards travel with the client?", a: "Yes — domestic travel within India is supported with prior notice." },
    ],
  },
  {
    slug: "event-security",
    title: "Event Security",
    short: "End-to-end security for weddings, concerts, exhibitions and conferences.",
    description: "From a 200-guest reception to a 20,000-attendee concert, we plan, staff and command event security with bouncers, guards, frisking teams and parking marshals.",
    icon: Camera,
    highlights: ["Pre-event recce & risk plan", "Frisking, baggage & metal-detector teams", "Crowd flow & emergency evacuation", "Coordination with local police"],
    forWhom: ["Weddings", "Concerts & festivals", "Exhibitions & expos", "Corporate conferences"],
    process: [
      { step: "Recce", detail: "Site walk-through and crowd-flow planning." },
      { step: "Plan", detail: "Manpower deployment chart and emergency SOPs." },
      { step: "Execute", detail: "On-ground command & control on event day." },
      { step: "Wrap-up", detail: "Post-event report and lost & found handover." },
    ],
    faqs: [
      { q: "Do you handle VIP movement at events?", a: "Yes — we provide dedicated close-protection for VIPs in addition to perimeter security." },
    ],
  },
  {
    slug: "corporate-security",
    title: "Corporate Security",
    short: "IT parks, business parks and head-offices — security tuned to corporate culture.",
    description: "Smartly-uniformed front-desk security, access control, visitor management and patrolling for India's most demanding corporate campuses.",
    icon: Building2,
    highlights: ["Visitor management & access control", "Soft-skill trained reception guards", "CCTV monitoring & patrol", "MIS reporting to facility teams"],
    forWhom: ["IT parks", "MNC offices", "Co-working spaces", "Business parks"],
    process: [
      { step: "Audit", detail: "Security audit aligned to your facility SOPs." },
      { step: "Onboarding", detail: "Vetted guards onboarded with site-specific training." },
      { step: "Operations", detail: "24×7 ops with daily, weekly & monthly reports." },
      { step: "Improvement", detail: "Quarterly business review with your admin team." },
    ],
    faqs: [
      { q: "Do guards know basic English / computer use?", a: "Yes — corporate guards are trained for visitor software, basic English communication and grooming standards." },
    ],
  },
  {
    slug: "industrial-security",
    title: "Industrial Security",
    short: "Factory, plant and warehouse security with material-movement control.",
    description: "Trained industrial security guards for MIDC plants and factories — gate control, vehicle inspection, material-out checks and night patrolling.",
    icon: Factory,
    highlights: ["Gate & vehicle control", "Material-in / material-out registers", "Fire-watch & emergency response", "Worker frisking & union-aware staff"],
    forWhom: ["MIDC plants", "Manufacturing units", "Warehouses & logistics hubs", "Pharma & chemical factories"],
    process: [
      { step: "Risk study", detail: "Plant-walk and threat-vector identification." },
      { step: "SOP design", detail: "Custom gate, fire and emergency SOPs." },
      { step: "Deployment", detail: "Shift-wise deployment with supervisor rotation." },
      { step: "Audit", detail: "Monthly compliance and incident audits." },
    ],
    faqs: [
      { q: "Do you handle multi-shift factories?", a: "Yes — three-shift, six-shift and continuous-process deployments are routine for us." },
    ],
  },
  {
    slug: "residential-society-security",
    title: "Residential & Society Security",
    short: "Polite, alert guards for housing societies, gated communities and bungalows.",
    description: "Society-trained guards who handle visitor entries, vehicle stickers, parcel deliveries and resident grievances with patience and professionalism.",
    icon: Home,
    highlights: ["Visitor & delivery management", "Vehicle pass & sticker control", "Polite, resident-first attitude", "Night patrol within the complex"],
    forWhom: ["Housing societies", "Gated communities", "Bungalows & villas", "Apartment complexes"],
    process: [
      { step: "Society meet", detail: "Meet the managing committee to align on rules." },
      { step: "Training", detail: "Site-specific SOP training for guards." },
      { step: "Deployment", detail: "Day & night guards with supervisor visits." },
      { step: "Feedback", detail: "Monthly committee review meeting." },
    ],
    faqs: [
      { q: "Can guards handle society software apps?", a: "Yes — we train guards on MyGate, NoBrokerHood, ADDA and similar visitor apps." },
    ],
  },
  {
    slug: "personal-security",
    title: "Personal Security Officer (PSO)",
    short: "Trained PSOs for businessmen, doctors, advocates and high-net-worth families.",
    description: "Discreet, well-groomed personal security officers who blend in socially and protect operationally — for daily routines, travel and family escorts.",
    icon: UserCheck,
    highlights: ["Plain-clothes or formal attire", "Defensive driving optional", "Multi-shift coverage available", "Strict confidentiality"],
    forWhom: ["Business owners", "Doctors & advocates", "HNI families", "Public personalities"],
    process: [
      { step: "Threat profile", detail: "Confidential one-on-one threat assessment." },
      { step: "Match", detail: "Match a PSO to your routine and personality." },
      { step: "Deploy", detail: "Trial period with daily check-ins." },
      { step: "Long-term", detail: "Long-term retainer with rotation backup." },
    ],
    faqs: [
      { q: "Can my PSO drive my vehicle?", a: "Yes — defensive-driving trained PSOs are available on request." },
    ],
  },
  {
    slug: "mall-retail-security",
    title: "Mall & Retail Security",
    short: "Loss-prevention and customer-facing security for malls, showrooms and stores.",
    description: "Polite, customer-friendly guards trained in loss-prevention, shoplifter handling, fitting-room policy and emergency evacuation drills.",
    icon: ShoppingBag,
    highlights: ["Loss-prevention training", "Customer-friendly demeanor", "Fitting room & POS area patrol", "CCTV monitoring support"],
    forWhom: ["Shopping malls", "Retail showrooms", "Brand stores", "Supermarkets"],
    process: [
      { step: "Floor study", detail: "Map blind spots and high-shrinkage zones." },
      { step: "Training", detail: "Brand-specific etiquette training." },
      { step: "Deployment", detail: "Shift coverage including peak hours." },
      { step: "Reporting", detail: "Weekly shrinkage & incident reports." },
    ],
    faqs: [
      { q: "Do you provide female guards for fitting rooms?", a: "Yes — trained female guards available on request." },
    ],
  },
  {
    slug: "warehouse-security",
    title: "Warehouse Security",
    short: "Inventory protection, loader supervision and dispatch-gate control.",
    description: "Specialised warehouse guards for D2C, e-commerce and 3PL warehouses — gate control, loader frisking, dispatch verification and night patrols.",
    icon: Warehouse,
    highlights: ["Gate & dock-door control", "Loader & vehicle frisking", "Inventory tally support", "CCTV review on demand"],
    forWhom: ["E-commerce fulfilment", "3PL warehouses", "Cold storage", "Distribution centres"],
    process: [
      { step: "Layout study", detail: "Identify pilferage-prone zones." },
      { step: "SOP design", detail: "Gate, dock and frisking SOPs." },
      { step: "Deployment", detail: "Trained warehouse guards." },
      { step: "Audit", detail: "Surprise night audits by supervisors." },
    ],
    faqs: [
      { q: "Can your team work with our WMS?", a: "Yes — guards can perform basic gate-pass entries in your WMS." },
    ],
  },
  {
    slug: "bank-atm-security",
    title: "Bank & ATM Security",
    short: "Armed and unarmed guards for banks, ATMs and cash-handling locations.",
    description: "Bank-trained guards with cash-handling awareness, alarm response training and strict adherence to RBI security guidelines for branches and ATMs.",
    icon: Banknote,
    highlights: ["RBI-compliant SOPs", "Alarm and panic-button response", "Customer queue management", "Armed guards on request (where licensed)"],
    forWhom: ["Bank branches", "ATM kiosks", "Cooperative banks", "NBFC offices"],
    process: [
      { step: "Compliance check", detail: "Align SOPs with RBI and bank policy." },
      { step: "Selection", detail: "Bank-experienced guards selected." },
      { step: "Deployment", detail: "Branch-hours and 24×7 ATM coverage." },
      { step: "Drill", detail: "Quarterly mock alarm drills." },
    ],
    faqs: [
      { q: "Do you provide armed guards?", a: "Armed guards can be arranged subject to licensing and regulatory approval." },
    ],
  },
  {
    slug: "hospital-security",
    title: "Hospital Security",
    short: "Empathetic security for hospitals, clinics and diagnostic centres.",
    description: "Patient-family-friendly guards trained in OPD queue control, ICU visitor restriction, emergency evacuation and night-shift supervision.",
    icon: Stethoscope,
    highlights: ["Patient-family-friendly conduct", "OPD & ICU visitor control", "Emergency evacuation training", "Female guards for maternity wards"],
    forWhom: ["Multispecialty hospitals", "Nursing homes", "Diagnostic centres", "Dental & IVF clinics"],
    process: [
      { step: "Hospital walk", detail: "Map OPD, IPD, ICU and ER zones." },
      { step: "SOP", detail: "Visitor pass and emergency SOPs." },
      { step: "Deploy", detail: "24×7 trained guards." },
      { step: "Review", detail: "Monthly review with administrator." },
    ],
    faqs: [
      { q: "Can guards manage agitated patient families?", a: "Yes — our guards are trained in de-escalation and empathy." },
    ],
  },
  {
    slug: "education-security",
    title: "School & Education Security",
    short: "Child-safe, parent-aware security for schools, colleges and coaching centres.",
    description: "Background-verified, child-protection-trained guards for schools, colleges and coaching centres — gate control, parent management and exam-day support.",
    icon: GraduationCap,
    highlights: ["POCSO-aware training", "Parent and visitor management", "Exam-day crowd control", "Female guards for girls' wings"],
    forWhom: ["Schools (CBSE/ICSE/State)", "Colleges & universities", "Coaching centres", "Hostels"],
    process: [
      { step: "Background check", detail: "Strict police verification of every guard." },
      { step: "Training", detail: "POCSO and child-safety training." },
      { step: "Deploy", detail: "Day-school and 24×7 hostel coverage." },
      { step: "Audit", detail: "Quarterly safety audit with the principal." },
    ],
    faqs: [
      { q: "Do you have female guards for girls' schools?", a: "Yes — we maintain a roster of trained female guards." },
    ],
  },
  {
    slug: "hotel-restaurant-security",
    title: "Hotel & Restaurant Security",
    short: "Hospitality-grade security for hotels, restaurants and banquet halls.",
    description: "Well-groomed, English-conversant guards for 3-star to 5-star hotels, fine-dining restaurants and banquet venues.",
    icon: UtensilsCrossed,
    highlights: ["Hospitality grooming standards", "Guest-first attitude", "Banquet & event support", "Discreet bouncer roster on call"],
    forWhom: ["Hotels", "Resorts", "Fine-dining restaurants", "Banquet halls"],
    process: [
      { step: "Brand brief", detail: "Understand brand SOPs and grooming standards." },
      { step: "Hand-pick", detail: "Curated guards matched to brand." },
      { step: "Deploy", detail: "Front-office, lobby & rear coverage." },
      { step: "Review", detail: "Monthly review with GM." },
    ],
    faqs: [
      { q: "Can you scale up for banquet nights?", a: "Yes — we maintain a flexible roster for peak banquet days." },
    ],
  },
  {
    slug: "banking-institutional-security",
    title: "Banking & Institutional Security",
    short: "Specialised security for cooperative banks, insurance and large institutions.",
    description: "Long-term security partnerships for cooperative banks, insurance HQs, large institutions and government PSUs across Maharashtra.",
    icon: Landmark,
    highlights: ["Multi-branch coordination", "Compliance reporting", "Senior supervisor liaison", "Vetted, long-tenure guards"],
    forWhom: ["Cooperative banks", "Insurance HQs", "Government PSUs", "Large institutions"],
    process: [
      { step: "Master plan", detail: "Multi-site security master plan." },
      { step: "Onboarding", detail: "Site-by-site staggered onboarding." },
      { step: "Operations", detail: "Centralised reporting dashboard." },
      { step: "Compliance", detail: "Quarterly compliance audit." },
    ],
    faqs: [
      { q: "Can you manage 20+ branches?", a: "Yes — we have multi-branch deployments across Maharashtra." },
    ],
  },
  {
    slug: "secure-transit-cash-escort",
    title: "Secure Transit & Cash Escort",
    short: "Armed and unarmed escort for high-value goods and cash movement.",
    description: "Trained escort teams for cash, jewellery, electronics and high-value document movement within Pune and across Maharashtra.",
    icon: Truck,
    highlights: ["Route planning & risk assessment", "Two-vehicle convoy on request", "Real-time tracking", "Insurance liaison support"],
    forWhom: ["Jewellers", "Banks & NBFCs", "High-value retailers", "Logistics companies"],
    process: [
      { step: "Route plan", detail: "Plan route, timing and contingency." },
      { step: "Brief", detail: "Brief escort team and driver." },
      { step: "Move", detail: "Live tracking and check-ins." },
      { step: "Handover", detail: "Verified handover at destination." },
    ],
    faqs: [
      { q: "Do you operate outside Pune?", a: "Yes — across Maharashtra and select neighbouring states." },
    ],
  },
  {
    slug: "real-estate-security",
    title: "Real Estate & Construction Security",
    short: "Site security for under-construction projects and sales galleries.",
    description: "Construction-site savvy guards for material protection, labour entry control, sales gallery hospitality and post-handover society security.",
    icon: KeyRound,
    highlights: ["Material & equipment protection", "Labour entry control", "Sales gallery hospitality guards", "Smooth handover to society security"],
    forWhom: ["Under-construction projects", "Sales galleries", "Township projects", "Plot developments"],
    process: [
      { step: "Site recce", detail: "Map perimeter and entry points." },
      { step: "SOP", detail: "Material & labour control SOPs." },
      { step: "Deploy", detail: "Day & night guards with supervisor." },
      { step: "Handover", detail: "Seamless transition to society security." },
    ],
    faqs: [
      { q: "Do you handle sales-gallery hospitality?", a: "Yes — well-groomed guards with guest-first etiquette." },
    ],
  },
  {
    slug: "women-safety-transport",
    title: "Women Safety Transport Escort",
    short: "Female-staff transport escort for late-shift IT and BPO companies.",
    description: "Vishakha-compliant female safety escort for night-shift cab drops and pickups for IT companies, BPOs and hospitals.",
    icon: HeartHandshake,
    highlights: ["Vishakha-compliant SOPs", "Trained female / male escorts", "Live drop confirmation", "Compliance MIS for HR"],
    forWhom: ["IT & BPO companies", "Hospitals & pharma", "Banks & financial services", "Any company with women on late shifts"],
    process: [
      { step: "Compliance check", detail: "Align with Vishakha & PoSH norms." },
      { step: "Roster", detail: "Match escorts to cab routes." },
      { step: "Operate", detail: "Daily drops with check-in protocols." },
      { step: "Report", detail: "Monthly compliance report to HR." },
    ],
    faqs: [
      { q: "Are escorts background-verified?", a: "Yes — every escort is police-verified and PoSH-trained." },
    ],
  },
  {
    slug: "vvip-close-protection",
    title: "VVIP Close Protection",
    short: "Elite close-protection teams for politicians, celebrities and foreign delegates.",
    description: "Discreet, multi-layer close-protection for VVIPs — advance recce, secure transport, venue sweeps and 24/7 detail rotation.",
    icon: Crown,
    highlights: ["Advance recce & route planning", "Multi-layer protection ring", "Liaison with local police", "Trained, ex-services operators"],
    forWhom: ["Politicians", "Celebrities", "Foreign delegates", "High-net-worth individuals"],
    process: [
      { step: "Threat assessment", detail: "Confidential threat assessment." },
      { step: "Plan", detail: "Detail plan with shift roster." },
      { step: "Execute", detail: "Multi-layer execution with comms." },
      { step: "Review", detail: "Daily debrief and improvement." },
    ],
    faqs: [
      { q: "Do you have ex-services operators?", a: "Yes — selected close-protection officers come from defence and police backgrounds." },
    ],
  },
  {
    slug: "control-room-cctv",
    title: "Control Room & CCTV Monitoring",
    short: "Centralised control room with live CCTV monitoring and incident response.",
    description: "24/7 manned control room offering live CCTV monitoring, alarm response coordination and rapid mobile-patrol dispatch.",
    icon: Headphones,
    highlights: ["24×7 manned control room", "Live CCTV review", "Alarm & panic response", "Mobile patrol dispatch"],
    forWhom: ["Multi-site enterprises", "Premium villas", "Banks", "Warehouses"],
    process: [
      { step: "Integration", detail: "Connect your CCTV / alarm systems." },
      { step: "Operate", detail: "24×7 monitoring by trained operators." },
      { step: "Respond", detail: "Coordinated mobile patrol response." },
      { step: "Report", detail: "Monthly incident analytics." },
    ],
    faqs: [
      { q: "Can you monitor existing CCTV?", a: "Yes — most IP CCTV systems can be integrated to our control room." },
    ],
  },
];

export const INDUSTRIES = [
  { name: "Corporate & IT", icon: Building2 },
  { name: "Industrial & MIDC", icon: Factory },
  { name: "Residential", icon: Home },
  { name: "Retail & Malls", icon: ShoppingBag },
  { name: "Banking & Finance", icon: Banknote },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Education", icon: GraduationCap },
  { name: "Hospitality & Events", icon: UtensilsCrossed },
];

// Pune localities for SEO landing pages
export const PUNE_LOCALITIES = [
  "Kothrud","Hinjewadi","Baner","Wakad","Aundh","Hadapsar","Viman Nagar","Kharadi",
  "Kalyani Nagar","Koregaon Park","Magarpatta","Bavdhan","Pashan","Sus","Balewadi",
  "Pimple Saudagar","Pimpri","Chinchwad","Akurdi","Nigdi","Ravet","Tathawade",
  "Wagholi","Lohegaon","Yerwada","Camp","Shivajinagar","Deccan","Erandwane","Karve Nagar",
  "Warje","Dhayari","Sinhagad Road","Ambegaon","Katraj","Kondhwa","NIBM Road",
  "Undri","Pisoli","Mohammadwadi","Manjri","Phursungi","Loni Kalbhor","Uruli Kanchan",
  "Talegaon","Dehu Road","Chakan","Moshi","Bhosari","Charholi","Dighi",
  "Alandi","Khed Shivapur","Saswad","Sasvad Road","Kondhwa Budruk","Salisbury Park",
  "Sahakarnagar","Bibwewadi","Parvati","Swargate","Market Yard","Dhankawadi","Gultekdi",
];

export const SERVICE_CITY_COMBOS = [
  { service: "bouncer-bodyguard", city: "Pune" },
  { service: "event-security", city: "Pune" },
  { service: "corporate-security", city: "Pune" },
  { service: "industrial-security", city: "Pune" },
  { service: "residential-society-security", city: "Pune" },
  { service: "personal-security", city: "Pune" },
  { service: "vvip-close-protection", city: "Pune" },
  { service: "manned-guarding", city: "Pune" },
];

export const TESTIMONIALS = [
  { name: "Rohan Mehta", role: "Facility Head, IT Park Hinjewadi", quote: "Star Security has handled our 24×7 corporate gate for 4 years — zero incidents and consistently smart guards." },
  { name: "Dr. Suchitra Joshi", role: "Director, Multispecialty Hospital", quote: "Their guards manage agitated patient families with empathy. Best decision we made for hospital security." },
  { name: "Aman Kapoor", role: "Wedding Planner", quote: "We've used their bouncer team for 30+ weddings. Always disciplined, always on time." },
  { name: "Vikram Shah", role: "Society Chairperson, Baner", quote: "Polite with residents, firm with outsiders — exactly what a society needs." },
];

export const CLIENT_LOGOS = [
  "Tata Motors","Bajaj Finserv","Mahindra","Kohinoor Group","Panchshil","Marvel Realtors",
  "Symbiosis","Sahyadri Hospital","Inox Multiplex","Phoenix Marketcity","Amanora","ICICI Bank",
];

export const AWARDS = [
  { year: "2023", title: "Best Security Agency — Pune", body: "Awarded by Maharashtra Industries Association." },
  { year: "2021", title: "ISO 9001:2015 Re-certification", body: "Quality management excellence." },
  { year: "2018", title: "PSARA License Renewal", body: "Government compliance milestone." },
  { year: "2012", title: "1000+ Personnel Strength", body: "Crossed thousand trained guards on roster." },
  { year: "2007", title: "Founded by Late Anil Kamble", body: "A vision for trusted, ethical private security." },
];

export const CONCERNS = [
  "Untrained or unverified guards",
  "Frequent staff turnover",
  "No supervision or reporting",
  "Slow incident response",
  "Lack of female guards",
  "No backup during emergencies",
];

export const SOLUTIONS = [
  "PSARA-trained, police-verified personnel",
  "Long-tenure guards with low attrition",
  "Daily reports + monthly business review",
  "24×7 control room with mobile patrols",
  "Trained female guards on roster",
  "Same-day replacement guarantee",
];
