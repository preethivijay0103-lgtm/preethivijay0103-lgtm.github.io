# Breakfast box website

A simple website for the breakfast box (Monday to Friday). Customers see the menu, photos and prices,
fill in a short form, and the order opens in WhatsApp. Payment is taken on WhatsApp by UPI.

## Before going live

1. Open `src/config/brand.ts` and set:
   - `name`: the brand name.
   - `whatsappNumber`: your WhatsApp number with country code, digits only (e.g. `919876543210`).
   - `pickupArea`: the area shown in the footer (the exact address is shared on WhatsApp).
2. Replace the photos in `public/images` with photos of your real boxes. Keep the same file names:
   `hero.jpg` and `{day}-{lean|build}-{veg|nonveg}.jpg` (for example `mon-lean-veg.jpg`).
   Lean photos are the 4-partition tray; Build photos are the 3-partition tray.
3. Menu, portions, drinks and prices are all in `src/features/catalog/data.ts`.
4. Cancellation policy text is in `src/pages/Policy.tsx`.

## Run it on your computer

```bash
npm install
npm run dev      # opens at http://localhost:5173
npx vitest run   # runs the checks
npm run build    # makes the site in dist/
```

## Put it online (free)

**Netlify:** sign in at netlify.com, choose "Add new site", then "Deploy manually", and drag the
`dist` folder in. Or connect a GitHub repo with build command `npm run build` and publish folder `dist`.

**Vercel:** sign in at vercel.com, import the repo, and keep the defaults (Vite is detected).

Both are already set up so links like `/menu` work when opened directly.

## Google Sheet (orders)

Kitchen sheet: https://docs.google.com/spreadsheets/d/1FCfv7IDKTj0A11EJRmeAE85lv3QiWBlzH_VLln4xEhk

The spreadsheet link itself cannot receive orders. You must deploy the Apps Script once:

1. Open that sheet → **Extensions** → **Apps Script**.
2. Delete the default code. Paste `scripts/orders-sheet.gs`. Save.
3. **Deploy** → **New deployment** → type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the web app URL (`https://script.google.com/macros/s/.../exec`).
5. Paste it into `sheetWebhookUrl` in `src/config/brand.ts`, then rebuild the site.

Each WhatsApp order also appends a row: diet, size, protein, days, list price, 30% off on the **final** amount, pay amount.

## Later, at more than 50 customers

Add the full box to `data.ts`, then phone OTP login, online payment (Razorpay), "My orders" with
skip-a-day, and an admin page with the 9 pm count.
