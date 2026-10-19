# Cathay Pacific Flexible Date Benefit - Local Demo

A self-contained, dependency-free concept demo for a flexible-date airline
benefit. All fares, payments, account data, and mileage values are simulated.

This is an independent concept prototype. It is not an official Cathay Pacific
website or booking service.

## Package contents

- `index.html` - main page
- `app.js` - offline data, calculations, routing, and interactions
- `styles.css` - complete responsive styling
- `start-windows.bat` - one-click launcher for Windows
- `start-mac-linux.sh` - launcher for macOS and Linux

There are no npm packages, remote images, APIs, or other network dependencies.

## Windows

1. Extract the ZIP file.
2. Double-click `start-windows.bat`.
3. Open `http://127.0.0.1:4173` if the browser does not open automatically.

If Python is not installed, the script opens `index.html` directly. The site
still works from the local file.

## macOS / Linux

From a terminal in the extracted folder:

```bash
bash start-mac-linux.sh
```

Or run:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173`.

## Direct file launch

The simplest option is to open `index.html` in any current desktop browser.
The local server is optional.

## Demo data

Bookings and accumulated miles are stored in the browser's local storage.
They survive page reloads on the same browser and device.

The seeded account starts with two demo bookings and does not affect any real
airline account. To reset, use `Refresh account` on the My Account page.
To restore the seeded demo data after a refresh, clear this site's browser
storage and reload the page.

## Main experience

- Browse 12 simulated round-trip Economy fares.
- Run the offline model to calculate benefit fee K.
- Review fare, fee K, and the combined total before simulated payment.
- Choose from 12 dates in a 60-day change window.
- Confirm a lower or equal fare, or pay a fare difference.
- View Asia Miles compensation after a higher-fare change.
- Browse account bookings, booking details, and accumulated mileage.
- Use browser back and forward navigation throughout the experience.

All monetary values are in HKD.
