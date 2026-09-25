# Breakfast box website

A simple website for the breakfast box (Monday to Friday). Customers see the menu, photos and prices,
fill in a short form, and the order opens in WhatsApp. Payment is taken on WhatsApp by UPI.

## Before going live

1. Open `src/config/brand.ts` and set:
   - `name`: the brand name.
   - `whatsappNumber`: your WhatsApp number with country code, digits only (e.g. `919876543210`).
   - `pickupArea`: the area shown in the footer (the exact address is shared on WhatsApp).
2. Replace the photos in `public/images` with photos of your real boxes. Keep the same file names:
   `hero.jpg`, `mon.jpg`, `tue.jpg`, `wed.jpg`, `thu.jpg`, `fri.jpg`.
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

## Optional: keep a list of customers in Google Sheets

1. Make a Google Sheet, then Extensions, Apps Script, and paste:

   ```js
   function doPost(e) {
     const data = JSON.parse(e.postData.contents)
     SpreadsheetApp.getActiveSheet().appendRow([
       data.sentAt, data.name, data.phone, data.area, data.size, data.diet,
       data.eatsEgg, data.plan, data.start, data.total, data.notes,
     ])
     return ContentService.createTextOutput('ok')
   }
   ```

2. Deploy it as a web app (access: anyone) and paste the URL into `sheetWebhookUrl` in
   `src/config/brand.ts`.

## Later, at more than 50 customers

Add the full box to `data.ts`, then phone OTP login, online payment (Razorpay), "My orders" with
skip-a-day, and an admin page with the 9 pm count.
