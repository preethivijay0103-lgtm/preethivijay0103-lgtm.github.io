/**
 * Paste this into the Lite Weight orders spreadsheet:
 * https://docs.google.com/spreadsheets/d/1FCfv7IDKTj0A11EJRmeAE85lv3QiWBlzH_VLln4xEhk
 *
 * Extensions → Apps Script → replace the default file → Save.
 * Deploy → New deployment → Type: Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the web app URL into src/config/brand.ts → sheetWebhookUrl
 */

const HEADERS = [
  'Sent at (IST)',
  'Name',
  'Phone',
  'Area',
  'Diet',
  'Egg',
  'Size',
  'Protein g/day',
  'Protein g total',
  'Plan',
  'Start',
  'Days',
  'List INR',
  'Off %',
  'Pay INR',
  'Notes',
  'Status',
]

function doGet() {
  return ContentService.createTextOutput('Lite Weight orders')
}

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const data = parseBody(e)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
    ensureHeaders(sheet)
    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'),
      text(data.name),
      asPlainText(data.phone),
      text(data.area),
      text(data.diet),
      data.eatsEgg === true || data.eatsEgg === 'true' ? 'yes' : 'no',
      text(data.size),
      num(data.proteinGramsPerDay),
      num(data.proteinGramsTotal),
      text(data.plan),
      text(data.start),
      text(data.days),
      num(data.listTotal),
      num(data.discountPercent),
      num(data.payTotal != null ? data.payTotal : data.total),
      text(data.notes),
      'new',
    ])
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON,
    )
  } finally {
    lock.releaseLock()
  }
}

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) return {}
  try {
    return JSON.parse(e.postData.contents)
  } catch (err) {
    return {}
  }
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    return
  }
  if (String(sheet.getRange(1, 1).getValue()) !== HEADERS[0]) {
    sheet.insertRowBefore(1)
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
  }
}

function text(value) {
  return value == null ? '' : String(value)
}

/** Stop Sheets treating +91 / =... as a formula (#ERROR!). */
function asPlainText(value) {
  const s = text(value).replace(/^'/, '')
  return "'" + s
}

function num(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : ''
}
