import { brand } from '../config/brand'

export const LEGAL_LAST_UPDATED = '4 October 2026'

export type LegalSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

const sellerName = brand.sellerLegalName || brand.name
const operatorLine = brand.sellerAddress
  ? `${sellerName}, ${brand.sellerAddress}`
  : `${sellerName} (operated by ${brand.founders}, ${brand.pickupArea})`
const pickup = `gym pickup in ${brand.pickupArea}, ${brand.pickupHours}, or delivery ${brand.deliveryHours}, ${brand.pickupDays}`
const grievanceContact = brand.grievanceEmail
  ? `${brand.grievanceEmail} and WhatsApp on this website`
  : 'WhatsApp at the number shown on this website'

const fssaiLine = brand.fssaiLicenseNumber
  ? `Our FSSAI registration or licence number is ${brand.fssaiLicenseNumber}.`
  : 'We hold FSSAI registration or licence, or operate under the exemption or threshold applicable to us, as required by law for our kitchen in Karnataka. We will share our FSSAI reference on request before you order if you ask on WhatsApp.'

/** Shown above Terms and Privacy on the site. */
export const LEGAL_NOTICE =
  'These policies explain how we run Lite Weight. They are not a substitute for advice from your doctor or a qualified lawyer. Mandatory rights under Indian law always apply.'

/** Operational rules also shown on the cancellation policy page. */
export const CANCELLATION_POLICY: LegalSection[] = [
  {
    id: 'payment',
    title: 'Payment before cooking',
    paragraphs: [
      'We confirm every order on WhatsApp and share UPI details. Your box is cooked only after payment for that day or plan is received, unless we confirm a different arrangement with you on WhatsApp before cooking.',
    ],
  },
  {
    id: 'skip',
    title: 'Skipping a day',
    paragraphs: [
      `Tell us on WhatsApp by ${brand.orderCutoff} the night before. That morning’s box is not cooked and not charged, and the day moves to the end of your plan where applicable.`,
    ],
  },
  {
    id: 'missed-pickup',
    title: 'Late or missed pickup',
    paragraphs: [
      'Gym pickups not collected by 8:00 am, and deliveries not accepted in the 8:00 to 10:00 am window, are treated as supplied and charged where the box has already been cooked for you.',
    ],
  },
  {
    id: 'our-delay',
    title: 'If we are late',
    paragraphs: ['If your gym pickup is not ready by 7:00 am, that day is not charged.'],
  },
  {
    id: 'refunds',
    title: 'Refunds',
    paragraphs: [
      'Unused paid days are refunded to the same UPI account within a reasonable time, and normally within 3 working days, after we approve your request on WhatsApp.',
    ],
  },
  {
    id: 'prices',
    title: 'Prices',
    paragraphs: [
      'Prices on this website include applicable taxes unless we state otherwise. A 30% launch offer is on while we start; you pay the discounted price shown at checkout unless we publish a change here or confirm a different rate on WhatsApp before you pay.',
    ],
  },
  {
    id: 'food-safety-short',
    title: 'Food safety and allergies',
    paragraphs: [
      'Eat the box the same morning while it is still hot. Tell us about allergies before your first box. Our kitchen uses and may use nuts, dairy, egg, gluten, soy, and sesame.',
      'If you feel unwell after eating, see our Terms and Conditions for what to do and how we investigate.',
    ],
  },
]

export const TERMS_AND_CONDITIONS: LegalSection[] = [
  {
    id: 'seller',
    title: '1. Seller details and scope',
    paragraphs: [
      `Seller: ${operatorLine}.`,
      `These Terms and Conditions (“Terms”) govern your use of the ${brand.name} website and your purchase of fresh breakfast boxes from us.`,
      'We are an independent food business. We are not a third-party food-delivery aggregator, restaurant marketplace, or quick-commerce retailer. We prepare food and offer ' +
        `${pickup}. The exact gym pin and delivery address are confirmed on WhatsApp.`,
      'By placing an order, registering on this site, ticking the policy acceptance box, or paying us, you agree to these Terms, our Privacy Policy, and our Cancellation Policy.',
    ],
  },
  {
    id: 'service',
    title: '2. The service',
    paragraphs: [
      'Menus, photos, and descriptions on the website are for guidance. We may substitute a dish with something similar in nutrition and portion if an ingredient is unavailable, especially in heat or supply disruption. We will tell you on WhatsApp the evening before when the change matters to you.',
      'Boxes are packed hot for morning consumption. They are not medical meals, diet prescriptions, or sports supplements. Calorie or macro figures, if ever shown, are estimates only and not health advice.',
    ],
  },
  {
    id: 'orders',
    title: '3. Orders, payment, and plans',
    paragraphs: [
      'Orders are placed through this website and confirmed on WhatsApp. Payment is by UPI or another method we specify on chat. A plan starts on the first agreed morning after payment clears.',
      'You must provide a correct name, mobile number, and pickup details. You are responsible for messages sent from your WhatsApp number.',
      'Operational rules (payment, skips, pickup times, refunds) are in our Cancellation Policy and form part of these Terms.',
    ],
  },
  {
    id: 'pickup-risk',
    title: '4. Pickup, time, and temperature',
    paragraphs: [
      'When you collect the box at gym pickup, when we deliver it to the address you gave us, or when a person you authorize collects on your behalf, you are responsible for safe handling and consumption afterwards.',
      'Eat the box the same morning while it is still hot. Do not leave it in a car, bag, or locker for hours. Refrigerate only if we label an item for chilling; most breakfast items are meant for immediate consumption.',
      'If you do not collect on time, see the Cancellation Policy for charges.',
    ],
  },
  {
    id: 'allergens',
    title: '5. Allergies, ingredients, and special diets',
    paragraphs: [
      'Tell us about allergies, intolerances, and religious dietary needs before your first box and again if they change. Our kitchen uses and may use nuts, dairy, egg, gluten, soy, sesame, and other common allergens. We take reasonable care but cannot guarantee zero cross-contact in a shared home kitchen.',
      'Veg and non-veg options are prepared with separate workflows where possible, but you must confirm your choice on each order. If you need strict allergen-free food, this service may not be suitable for you.',
    ],
  },
  {
    id: 'food-safety',
    title: '6. Food safety and illness',
    paragraphs: [
      'We follow hygienic cooking and same-morning packing practices appropriate to a home kitchen. ' + fssaiLine,
      'If you believe a box caused illness, discomfort, or allergic reaction:',
    ],
    bullets: [
      'Stop eating the food and seek medical help if symptoms are serious.',
      'Message us on WhatsApp within 24 hours with the date, menu, and symptoms.',
      'Keep any remaining food sealed and refrigerated; we may ask for photos or to inspect samples to investigate.',
      'Cooperate with any enquiry from us or from a food-safety authority.',
    ],
  },
  {
    id: 'liability-illness',
    title: '7. Liability',
    paragraphs: [
      'We provide food prepared by us directly to you. Subject to mandatory Indian law, if we are found liable for loss caused by our breach of these Terms or negligence, our maximum liability for any single incident is limited to the amount you paid for the affected box or day.',
      'We are not liable for illness or injury arising from: (a) allergens or dietary needs you did not disclose; (b) eating food after unsafe storage or delay on your side; (c) combining our food with other items; (d) your underlying health conditions; or (e) events outside our reasonable control.',
      'Nothing in these Terms excludes or limits liability that cannot be excluded or limited under the Consumer Protection Act, 2019, the Indian Contract Act, 1872, or other applicable law (including liability for death or personal injury caused by our negligence, or fraud).',
      'You may seek remedies before the appropriate consumer dispute redressal commission or court as per law.',
    ],
  },
  {
    id: 'conduct',
    title: '8. Your conduct',
    paragraphs: [
      'Be respectful on WhatsApp and at pickup. We may refuse or cancel service if there is abuse, repeated no-shows, or misuse of refunds.',
    ],
  },
  {
    id: 'ip',
    title: '9. Website and content',
    paragraphs: [
      'Our name, logo, menus, and site content belong to us or our licensors. You may not copy or reuse them without permission.',
    ],
  },
  {
    id: 'force-majeure',
    title: '10. Events outside our control',
    paragraphs: [
      'We are not in breach if we cannot cook or offer pickup because of events beyond our reasonable control (for example, extreme weather, power failure, illness in the kitchen, government order, or supply shortage). We will refund or reschedule affected paid days where fair.',
    ],
  },
  {
    id: 'changes',
    title: '11. Changes to these Terms',
    paragraphs: [
      'We may update these Terms. The “Last updated” date will change. We will give reasonable notice of material changes on this website and, where practicable, on WhatsApp. If you continue to order after the effective date, you accept the updated Terms. If you do not agree, please stop ordering and contact us about any prepaid balance.',
    ],
  },
  {
    id: 'law',
    title: '12. Governing law, grievances, and disputes',
    paragraphs: [
      'These Terms are governed by the laws of India. Courts and consumer forums in India may have jurisdiction depending on where you live or work and the value of the dispute.',
      `For product or service complaints, contact us first on ${grievanceContact}. We aim to acknowledge complaints within 48 hours and resolve them within 30 days where possible, in line with common e-commerce grievance practice.`,
    ],
  },
]

export const PRIVACY_POLICY: LegalSection[] = [
  {
    id: 'scope',
    title: '1. Scope and data fiduciary',
    paragraphs: [
      `Data fiduciary: ${operatorLine}.`,
      `This Privacy Policy explains how we collect and use personal data when you use the ${brand.name} website, register for boxes, or message us.`,
      'We process personal data in accordance with the Digital Personal Data Protection Act, 2023 (India), the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, where applicable, and other law. When you use third-party apps (for example WhatsApp or your UPI app), their privacy terms also apply.',
    ],
  },
  {
    id: 'collect',
    title: '2. What we collect',
    paragraphs: ['We collect only what we need to run the breakfast service:'],
    bullets: [
      'Identity and contact: name, mobile number, area or gym/PG name, and messages you send us.',
      'Order details: box size, diet, plan, start day, drink choice, notes, and payment confirmation references (we do not store full card details; UPI is handled by your payment app).',
      'Technical: basic logs from our website host (for example IP address, browser type, and pages viewed) if the host records them.',
      'Optional backup: if enabled in our settings, order fields may be stored in a spreadsheet we control.',
    ],
  },
  {
    id: 'use',
    title: '3. How we use personal data',
    paragraphs: ['We use your information to:'],
    bullets: [
      'Confirm orders, cook the right box, and coordinate gym pickup or delivery.',
      'Send service messages (reminders, menu changes, payment) on WhatsApp or similar channels you use to contact us.',
      'Handle skips, refunds, food-safety enquiries, and grievances.',
      'Improve menus and fix website issues.',
      'Meet legal, tax, and food-safety record-keeping duties where required.',
    ],
  },
  {
    id: 'legal-basis',
    title: '4. Lawful processing (India)',
    paragraphs: [
      'We process data based on your consent (registration, policy acceptance, and messaging us), and where permitted for fulfilling your order, service communications you expect, safety, fraud prevention, and legal compliance. We do not sell or rent your personal data. You may withdraw consent for non-essential marketing at any time; that does not affect processing needed to complete an active order.',
    ],
  },
  {
    id: 'sharing',
    title: '5. Processors and sharing',
    paragraphs: ['We do not sell personal data. We may share limited data with service providers who process data on our instructions, such as:'],
    bullets: [
      'Messaging platforms you use to reach us.',
      'Website hosting providers.',
      'Spreadsheet or backup tools, only if we enable them.',
      'Government or regulatory authorities when required by law, court order, or a food-safety investigation.',
    ],
  },
  {
    id: 'retention',
    title: '6. Retention',
    paragraphs: [
      'We keep order and chat records for as long as needed to run your plan, handle refunds, and meet tax or food-safety rules, then delete or anonymise them unless a longer period is required by law.',
    ],
  },
  {
    id: 'security',
    title: '7. Security',
    paragraphs: [
      'We use reasonable technical and organisational safeguards (device locks, limited access, and not storing card data on our site). No system is completely secure. Please avoid sending detailed medical records on chat.',
    ],
  },
  {
    id: 'rights',
    title: '8. Your rights',
    paragraphs: [
      'You may request access, correction, or erasure of your personal data, and withdraw consent where processing is consent-based, by contacting us on ' +
        grievanceContact +
        '. We will respond within a reasonable period. You may lodge a complaint with the Data Protection Board of India under the DPDP Act when the Board is accepting complaints for your category of processing.',
    ],
  },
  {
    id: 'children',
    title: '9. Children',
    paragraphs: [
      'The service is intended for adults (18+). If you order for a minor, you confirm you are their parent or guardian and accept these policies on their behalf.',
    ],
  },
  {
    id: 'cookies',
    title: '10. Cookies and local storage',
    paragraphs: [
      'The site may store your order form details in your browser (local storage) so you do not retype them. We do not use advertising trackers. Hosting providers may set essential cookies for security.',
    ],
  },
  {
    id: 'contact',
    title: '11. Privacy contact and grievance',
    paragraphs: [
      `For privacy questions or grievances under the DPDP Act, contact ${brand.founders} at ${grievanceContact}.`,
      `Last updated: ${LEGAL_LAST_UPDATED}.`,
    ],
  },
]
