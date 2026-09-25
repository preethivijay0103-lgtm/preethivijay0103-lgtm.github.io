// Edit these before going live.
export const brand = {
  // The name is not decided yet.
  name: 'Our Kitchen',
  tagline: 'A training breakfast that tastes like home.',
  // Country code + number, digits only, e.g. 919876543210.
  whatsappNumber: '919999999999',
  // Shown as "Pickup from our gate, <pickupArea>". The exact address is shared on WhatsApp.
  pickupArea: 'Bangalore',
  pickupDays: 'Monday to Friday',
  pickupHours: '6:00 to 9:00 am',
  orderCutoff: '9 pm the night before',
  // Optional: a Google Apps Script web-app URL that appends a row to a Sheet. Leave empty to skip.
  sheetWebhookUrl: '',
} as const

export const PLACEHOLDER_WHATSAPP = '919999999999'
