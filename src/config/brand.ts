// Edit these before going live.
export const brand = {
  name: 'Lite Weight',
  logoSrc: '/images/lite-weight-logo.png?v=2',
  wordmark: {
    line1: 'Lite',
    line2: 'Weight',
  },
  tagline: 'A training breakfast that tastes like home.',
  founders: 'Preethi and Mani',
  // Consumer / e-commerce disclosure (Consumer Protection Act & Rules). Fill before going live.
  sellerLegalName: '', // Registered or trading name; empty uses `name` above.
  sellerAddress: '', // Full postal address shown in Terms (required for online selling).
  grievanceEmail: 'Liteweight.kitchen@gmail.com',
  fssaiLicenseNumber: '', // Your FSSAI reg./licence no.; leave empty until issued — do not publish a fake number.
  // Country code + number, digits only, e.g. 919876543210.
  whatsappNumber: '918762352233',
  phoneDisplay: '8762352233',
  // Shown in the footer. The exact gym pin is shared on WhatsApp.
  pickupArea: 'Choodasandra, Hosur Road',
  pickupDays: 'Monday to Friday',
  pickupHours: '7:00 to 8:00 am',
  deliveryHours: '8:00 to 10:00 am',
  orderCutoff: '9 pm the night before',
  // Public URL for sharing (e.g. https://your-site.netlify.app). Empty = use the browser’s current origin.
  siteUrl: '',
  // Optional: a Google Apps Script web-app URL that appends a row to a Sheet. Leave empty to skip.
  sheetWebhookUrl: '',
} as const

export const PLACEHOLDER_WHATSAPP = '919999999999'
