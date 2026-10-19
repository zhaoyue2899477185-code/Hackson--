(function () {
  "use strict";

  const ICONS = {
    arrowRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    chevronLeft:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    plane:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    calendar:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
    shield:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z"/><path d="m9 12 2 2 4-4"/></svg>',
    star:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    card:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>',
    spark:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9z"/><path d="M5 19v2"/><path d="M19 19v2"/></svg>',
    home:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 11 9-8 9 8"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></svg>',
    user:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    refresh:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6v5h-5"/><path d="M4 18v-5h5"/><path d="M6.1 9a7 7 0 0 1 11.5-2.4L20 11"/><path d="M4 13l2.4 4.4A7 7 0 0 0 17.9 15"/></svg>',
    receipt:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h4"/></svg>',
    chevronRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  };

  const ROUTES = [
    {
      id: "tokyo",
      city: "Tokyo",
      country: "Japan",
      code: "NRT",
      airport: "Narita",
      baseFare: 3640,
      outboundDate: "2026-11-13",
      returnDate: "2026-11-20",
      outbound: { flight: "CX548", dep: "09:10", arr: "14:10", duration: "4h 00m" },
      inbound: { flight: "CX549", dep: "15:35", arr: "19:50", duration: "4h 15m" },
      seed: 1,
    },
    {
      id: "seoul",
      city: "Seoul",
      country: "South Korea",
      code: "ICN",
      airport: "Incheon",
      baseFare: 2724,
      outboundDate: "2026-11-19",
      returnDate: "2026-11-26",
      outbound: { flight: "CX410", dep: "08:45", arr: "13:05", duration: "3h 20m" },
      inbound: { flight: "CX411", dep: "14:20", arr: "17:25", duration: "3h 05m" },
      seed: 2,
    },
    {
      id: "beijing",
      city: "Beijing",
      country: "Mainland China",
      code: "PEK",
      airport: "Capital",
      baseFare: 3609,
      outboundDate: "2026-11-27",
      returnDate: "2026-12-04",
      outbound: { flight: "CX390", dep: "09:00", arr: "12:20", duration: "3h 20m" },
      inbound: { flight: "CX391", dep: "13:45", arr: "17:35", duration: "3h 50m" },
      seed: 3,
    },
    {
      id: "shanghai",
      city: "Shanghai",
      country: "Mainland China",
      code: "PVG",
      airport: "Pudong",
      baseFare: 2889,
      outboundDate: "2026-12-04",
      returnDate: "2026-12-11",
      outbound: { flight: "CX368", dep: "08:30", arr: "11:10", duration: "2h 40m" },
      inbound: { flight: "CX367", dep: "12:30", arr: "15:25", duration: "2h 55m" },
      seed: 4,
    },
  ];

  const FAMILIES = [
    {
      id: "light",
      name: "Light",
      priceFactor: 1,
      changeFee: 390,
      className: "family-light",
    },
    {
      id: "essential",
      name: "Essential",
      priceFactor: 1.07,
      changeFee: 240,
      className: "family-essential",
    },
    {
      id: "flex",
      name: "Flex",
      priceFactor: 1.19,
      changeFee: 0,
      className: "family-flex",
    },
  ];

  const MODEL = {
    changeProbability: 0.05,
    sigma: 0.1,
    drift: 0,
    alpha: 0.5,
    milesCap: 20000,
    passengerMileValue: 1.2 * 0.01 * 7.8,
    carrierMileCost: 0.69 * 0.01 * 7.8,
    fixedCost: 2,
    processingCost: 20,
    inventoryCost: 15,
    riskBuffer: 0.3,
    margin: 0.2,
    changeWindowDays: 60,
    deadlineDays: 7,
  };

  const CHANGE_OFFSETS = [-21, -17, -13, -9, -5, -1, 3, 7, 11, 15, 19, 24];
  const CHANGE_FACTORS = [-0.14, -0.105, -0.07, -0.04, -0.018, 0, 0.032, 0.068, 0.105, 0.148, 0.195, 0.25];

  const numberFormat = new Intl.NumberFormat("en-US");
  const decimalFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const STORAGE_KEY = "cathay-flex-demo-account-v2";

  const app = document.getElementById("app");
  const modalRoot = document.getElementById("modal-root");
  const liveRegion = document.getElementById("live-region");

  let activeReview = null;
  let previousFocus = null;
  let toastTimer = null;
  let modalBusy = false;
  let accountData = null;

  const state = {
    screen: "home",
    route: { screen: "home" },
    filter: "all",
    ticket: null,
    fee: null,
    pricing: false,
    options: [],
    activeBooking: null,
  };

  function createTickets() {
    const tickets = [];
    ROUTES.forEach(function (route) {
      FAMILIES.forEach(function (family) {
        tickets.push({
          id: route.id + "-" + family.id,
          fare: roundToTen(route.baseFare * family.priceFactor),
          route: route,
          family: family,
        });
      });
    });
    return tickets;
  }

  const TICKETS = createTickets();

  function newMembershipNumber() {
    return "CX " + Math.floor(100 + Math.random() * 900) + " " +
      Math.floor(100 + Math.random() * 900) + " " +
      Math.floor(100 + Math.random() * 900);
  }

  function createSeedBookings() {
    const tokyo = getTicket("tokyo-light");
    const seoul = getTicket("seoul-essential");
    const tokyoFee = calculateBenefit(tokyo);
    const seoulFee = calculateBenefit(seoul);

    return [
      {
        id: "demo-booking-tokyo",
        reference: "CXA7K2Q9",
        ticketId: tokyo.id,
        status: "not-changed",
        fare: tokyo.fare,
        benefitFee: tokyoFee.fee,
        benefitPaidAt: "2026-10-10T09:20:00.000Z",
        originalOutboundDate: tokyo.route.outboundDate,
        originalReturnDate: tokyo.route.returnDate,
        newOutboundDate: null,
        newReturnDate: null,
        newFare: null,
        fareDifference: null,
        changePaid: 0,
        milesEarned: 0,
        changedAt: null,
      },
      {
        id: "demo-booking-seoul",
        reference: "CXB4M8R3",
        ticketId: seoul.id,
        status: "changed",
        fare: seoul.fare,
        benefitFee: seoulFee.fee,
        benefitPaidAt: "2026-09-21T13:05:00.000Z",
        originalOutboundDate: seoul.route.outboundDate,
        originalReturnDate: seoul.route.returnDate,
        newOutboundDate: "2026-11-23",
        newReturnDate: "2026-11-30",
        newFare: seoul.fare + 420,
        fareDifference: 420,
        changePaid: 420,
        milesEarned: calculateMiles(420).miles,
        changedAt: "2026-10-08T07:40:00.000Z",
      },
    ];
  }

  function defaultAccountData() {
    return {
      account: {
        name: "Alex Morgan",
        membershipNumber: "CX 482 913 760",
        memberSince: "2024",
      },
      bookings: createSeedBookings(),
    };
  }

  function loadAccountData() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          parsed.account &&
          Array.isArray(parsed.bookings)
        ) {
          return parsed;
        }
      }
    } catch (error) {
      // The demo still works in memory if storage is unavailable.
    }

    const seeded = defaultAccountData();
    saveAccountData(seeded);
    return seeded;
  }

  function saveAccountData(data) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data || accountData)
      );
    } catch (error) {
      // Ignore storage failures in restricted browser contexts.
    }
  }

  function getBooking(bookingId) {
    return accountData.bookings.find(function (booking) {
      return booking.id === bookingId;
    });
  }

  function findOpenBookingForTicket(ticketId) {
    return accountData.bookings.find(function (booking) {
      return booking.ticketId === ticketId && booking.status === "not-changed";
    });
  }

  function totalMiles() {
    return accountData.bookings.reduce(function (sum, booking) {
      return sum + (Number(booking.milesEarned) || 0);
    }, 0);
  }

  function bookingTotalPaid(booking) {
    return (
      Number(booking.fare) +
      Number(booking.benefitFee) +
      (Number(booking.changePaid) || 0)
    );
  }

  function bookingReference(booking) {
    return (
      booking.reference ||
      "CX" +
        String(booking.id)
          .replace(/[^a-z0-9]/gi, "")
          .slice(-6)
          .toUpperCase()
    );
  }

  function makeBooking(ticket, fee) {
    return {
      id: "booking-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      reference:
        "CX" +
        Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "0"),
      ticketId: ticket.id,
      status: "not-changed",
      fare: ticket.fare,
      benefitFee: fee.fee,
      benefitPaidAt: new Date().toISOString(),
      originalOutboundDate: ticket.route.outboundDate,
      originalReturnDate: ticket.route.returnDate,
      newOutboundDate: null,
      newReturnDate: null,
      newFare: null,
      fareDifference: null,
      changePaid: 0,
      milesEarned: 0,
      changedAt: null,
    };
  }

  function roundToTen(value) {
    return Math.round(value / 10) * 10;
  }

  function normCdf(value) {
    return 0.5 * (1 + erf(value / Math.sqrt(2)));
  }

  function erf(value) {
    const sign = value < 0 ? -1 : 1;
    const x = Math.abs(value);
    const t = 1 / (1 + 0.3275911 * x);
    const polynomial =
      0.254829592 * t -
      0.284496736 * Math.pow(t, 2) +
      1.421413741 * Math.pow(t, 3) -
      1.453152027 * Math.pow(t, 4) +
      1.061405429 * Math.pow(t, 5);
    return sign * (1 - polynomial * Math.exp(-x * x));
  }

  function callStyleUnit(mu, sigma) {
    const z = mu / sigma;
    return (
      Math.exp(mu + 0.5 * sigma * sigma) * normCdf(z + sigma) - normCdf(z)
    );
  }

  function calculateBenefit(ticket) {
    const params = MODEL;
    const expectedPositiveDifference =
      ticket.fare * callStyleUnit(params.drift, params.sigma);
    const estimatedMilesPerChange = Math.min(
      (params.alpha / params.passengerMileValue) * expectedPositiveDifference,
      params.milesCap
    );
    const expectedMiles =
      params.changeProbability * estimatedMilesPerChange;
    const processingReserve =
      params.fixedCost +
      params.changeProbability *
        (params.processingCost + params.inventoryCost);
    const changeFeeReserve =
      params.changeProbability * ticket.family.changeFee;
    const mileageReserve = params.carrierMileCost * expectedMiles;
    const cost = processingReserve + changeFeeReserve + mileageReserve;
    const riskBuffer = cost * params.riskBuffer;
    const margin = (cost + riskBuffer) * params.margin;
    const fee = cost + riskBuffer + margin;

    return {
      expectedPositiveDifference: expectedPositiveDifference,
      estimatedMilesPerChange: estimatedMilesPerChange,
      expectedMiles: expectedMiles,
      processingReserve: processingReserve,
      changeFeeReserve: changeFeeReserve,
      mileageReserve: mileageReserve,
      cost: cost,
      riskBuffer: riskBuffer,
      margin: margin,
      fee: fee,
    };
  }

  function calculateMiles(difference) {
    if (difference <= 0) {
      return {
        miles: 0,
        cashEquivalent: 0,
      };
    }
    const cashEquivalent = difference * MODEL.alpha;
    return {
      miles: Math.floor(
        Math.min(cashEquivalent / MODEL.passengerMileValue, MODEL.milesCap)
      ),
      cashEquivalent: cashEquivalent,
    };
  }

  function generateChangeOptions(booking) {
    const ticket = getTicket(booking.ticketId);
    const originalFare = booking.fare;
    return CHANGE_OFFSETS.map(function (offset, index) {
      let factor = CHANGE_FACTORS[index];
      if (index !== 5) {
        factor += ((ticket.route.seed + index * 3) % 5 - 2) * 0.004;
      }

      let fare = roundToTen(originalFare * (1 + factor));
      if (index < 5 && fare >= originalFare) {
        fare = originalFare - (5 - index) * 10;
      }
      if (index === 5) {
        fare = originalFare;
      }
      if (index > 5 && fare <= originalFare) {
        fare = originalFare + (index - 4) * 10;
      }

      return {
        id: booking.id + "-change-" + index,
        newOutboundDate: addDays(booking.originalOutboundDate, offset),
        newReturnDate: addDays(booking.originalReturnDate, offset),
        fare: fare,
        difference: fare - originalFare,
      };
    });
  }

  function getTicket(ticketId) {
    return TICKETS.find(function (ticket) {
      return ticket.id === ticketId;
    });
  }

  function money(value, decimals) {
    const digits = typeof decimals === "number" ? decimals : 0;
    if (digits > 0) {
      return "HKD " + decimalFormat.format(value);
    }
    return "HKD " + numberFormat.format(Math.round(value));
  }

  function signedMoney(value) {
    if (value === 0) return money(0);
    return (value > 0 ? "+" : "-") + money(Math.abs(value));
  }

  function formatDate(isoDate, includeYear) {
    const options = includeYear
      ? { weekday: "short", day: "numeric", month: "short", year: "numeric" }
      : { weekday: "short", day: "numeric", month: "short" };
    return new Intl.DateTimeFormat("en-GB", Object.assign(options, { timeZone: "UTC" })).format(
      parseDate(isoDate)
    );
  }

  function formatShortDate(isoDate) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(parseDate(isoDate));
  }

  function dateParts(isoDate) {
    const date = parseDate(isoDate);
    return {
      day: new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        timeZone: "UTC",
      }).format(date),
      month: new Intl.DateTimeFormat("en-GB", {
        month: "short",
        timeZone: "UTC",
      })
        .format(date)
        .toUpperCase(),
      weekday: new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        timeZone: "UTC",
      }).format(date),
    };
  }

  function parseDate(isoDate) {
    return new Date(isoDate + "T12:00:00Z");
  }

  function addDays(isoDate, days) {
    const date = parseDate(isoDate);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function pluralize(value, singular, plural) {
    return value + " " + (value === 1 ? singular : plural);
  }

  function escapeMarkup(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render(options) {
    const shouldFocus = options && options.focus;

    if (state.screen === "account") {
      app.innerHTML = renderAccount();
      document.title = "My account | Cathay Pacific Concept";
    } else if (state.screen === "miles") {
      app.innerHTML = renderMiles();
      document.title = "Asia Miles | Cathay Pacific Concept";
    } else if (state.screen === "booking" && state.activeBooking) {
      app.innerHTML = renderBookingDetail();
      document.title = "Booking details | Cathay Pacific Concept";
    } else if (state.screen === "detail" && state.ticket) {
      app.innerHTML = renderDetail();
      document.title = "Benefit pricing | Cathay Pacific Concept";
    } else if (state.screen === "changes" && state.ticket && state.activeBooking) {
      app.innerHTML = renderChanges();
      document.title = "Choose a new date | Cathay Pacific Concept";
    } else if (state.screen === "receipt" && state.activeBooking) {
      app.innerHTML = renderReceipt();
      document.title = "Date changed | Cathay Pacific Concept";
    } else if (
      state.screen === "booking" ||
      state.screen === "changes" ||
      state.screen === "receipt" ||
      state.screen === "missing"
    ) {
      app.innerHTML = renderMissingBooking();
      document.title = "Booking not found | Cathay Pacific Concept";
    } else {
      state.screen = "home";
      app.innerHTML = renderResults();
      document.title = "Cathay Pacific | Flexible Date Benefit Concept";
    }

    syncHeaderNav();

    if (shouldFocus) {
      window.scrollTo(0, 0);
      window.requestAnimationFrame(function () {
        app.focus({ preventScroll: true });
        window.scrollTo(0, 0);
      });
    }
  }

  function syncHeaderNav() {
    document.querySelectorAll("[data-icon]").forEach(function (element) {
      if (element.dataset.icon === "home") element.innerHTML = ICONS.home;
      if (element.dataset.icon === "user") element.innerHTML = ICONS.user;
    });

    document.querySelectorAll("[data-nav]").forEach(function (link) {
      const nav = link.dataset.nav;
      const active =
        (nav === "home" && state.screen === "home") ||
        (nav === "account" &&
          (state.screen === "account" ||
            state.screen === "miles" ||
            state.screen === "booking" ||
            state.screen === "receipt"));
      link.classList.toggle("is-active", active);
    });
  }

  function renderResults() {
    const filtered =
      state.filter === "all"
        ? TICKETS
        : TICKETS.filter(function (ticket) {
            return ticket.route.id === state.filter;
          });
    const bookingCount = accountData.bookings.length;
    const miles = totalMiles();

    return (
      '<section class="page-enter">' +
      '<div class="page-heading">' +
      "<div>" +
      '<p class="eyebrow">Book with more flexibility</p>' +
      "<h1>Flights from Hong Kong</h1>" +
      "<p>Simulated round-trip fares for a one-date-change benefit.</p>" +
      "</div>" +
      "</div>" +
      '<div class="home-account-strip">' +
      '<div class="home-account-person">' +
      '<span class="account-avatar" aria-hidden="true">' +
      accountInitials() +
      "</span>" +
      '<span class="account-person-copy"><strong>' +
      escapeMarkup(accountData.account.name) +
      "</strong><span>" +
      pluralize(bookingCount, "booking", "bookings") +
      " · " +
      numberFormat.format(miles) +
      " Asia Miles</span></span>" +
      "</div>" +
      '<a class="home-account-link" href="#/account">View my account ' +
      ICONS.arrowRight +
      "</a>" +
      "</div>" +
      '<div class="trip-summary" aria-label="Search summary">' +
      '<div class="summary-cell"><span class="summary-label">Route</span><span class="summary-value">Hong Kong (HKG) to four destinations</span></div>' +
      '<div class="summary-cell"><span class="summary-label">Travel window</span><span class="summary-value">13 Nov - 11 Dec 2026</span></div>' +
      '<div class="summary-cell"><span class="summary-label">Cabin</span><span class="summary-value">Economy · 1 adult</span></div>' +
      '<span class="summary-icon" aria-hidden="true">' +
      ICONS.plane +
      "</span>" +
      "</div>" +
      '<div class="filter-row">' +
      '<div class="filter-chips" aria-label="Filter fares by destination">' +
      renderFilterChip("all", "All routes") +
      ROUTES.map(function (route) {
        return renderFilterChip(route.id, route.city);
      }).join("") +
      "</div>" +
      '<span class="result-count">' +
      filtered.length +
      " fares</span>" +
      "</div>" +
      '<div class="fare-grid">' +
      filtered.map(renderFareCard).join("") +
      "</div>" +
      "</section>"
    );
  }

  function accountInitials() {
    return accountData.account.name
      .split(/\s+/)
      .map(function (part) {
        return part.charAt(0);
      })
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function sortedBookings() {
    return accountData.bookings
      .slice()
      .sort(function (left, right) {
        return String(right.benefitPaidAt || "").localeCompare(
          String(left.benefitPaidAt || "")
        );
      });
  }

  function statusTag(booking) {
    return booking.status === "changed"
      ? '<span class="status-tag status-changed">Date changed</span>'
      : '<span class="status-tag status-open">Not changed</span>';
  }

  function renderAccount() {
    const bookings = sortedBookings();

    return (
      '<section class="account-page page-enter">' +
      '<button class="back-button" type="button" data-action="go-home">' +
      ICONS.chevronLeft +
      "Back to home</button>" +
      '<div class="page-heading"><div><p class="eyebrow">My account</p>' +
      "<h1>Your trips and miles</h1>" +
      "<p>Bookings and mileage activity in this demo profile.</p></div></div>" +
      '<div class="account-hero">' +
      '<div class="account-profile">' +
      '<span class="account-avatar" aria-hidden="true">' +
      accountInitials() +
      "</span>" +
      "<div><h1>" +
      escapeMarkup(accountData.account.name) +
      "</h1><p>Member since " +
      escapeMarkup(accountData.account.memberSince) +
      " · " +
      escapeMarkup(accountData.account.membershipNumber) +
      "</p></div>" +
      "</div>" +
      '<a class="miles-summary" href="#/miles"><div><span class="miles-summary-label">Asia Miles balance</span>' +
      '<strong class="miles-summary-value">' +
      numberFormat.format(totalMiles()) +
      "</strong></div>" +
      '<span class="miles-summary-link">View miles activity ' +
      ICONS.arrowRight +
      "</span></a>" +
      "</div>" +
      '<div class="account-section-head"><h2>My bookings</h2><span>' +
      pluralize(bookings.length, "booking", "bookings") +
      "</span></div>" +
      (bookings.length
        ? '<div class="booking-list">' +
          bookings.map(renderBookingRow).join("") +
          "</div>"
        : '<div class="account-empty"><h3>No bookings yet</h3><p>Start a booking from the fare page to build this demo account.</p><a class="button" href="#/home">Browse fares ' +
          ICONS.arrowRight +
          "</a></div>") +
      '<div class="account-footer"><p>Demo account data is stored only in this browser.</p>' +
      '<button class="button button-secondary" type="button" data-action="refresh-account">' +
      ICONS.refresh +
      "Refresh account</button></div>" +
      "</section>"
    );
  }

  function renderBookingRow(booking) {
    const ticket = getTicket(booking.ticketId);
    if (!ticket) return "";
    const route = ticket.route;
    const changed = booking.status === "changed";
    const displayOutbound = changed
      ? booking.newOutboundDate
      : booking.originalOutboundDate;
    const displayReturn = changed
      ? booking.newReturnDate
      : booking.originalReturnDate;

    return (
      '<button class="booking-row" type="button" data-action="open-booking" data-booking-id="' +
      booking.id +
      '">' +
      '<span class="booking-route"><h3>Hong Kong to ' +
      escapeMarkup(route.city) +
      " " +
      statusTag(booking) +
      "</h3><p>" +
      route.outbound.flight +
      " · " +
      ticket.family.name +
      " · Booked " +
      formatShortDate(booking.benefitPaidAt.slice(0, 10)) +
      "</p></span>" +
      '<span class="booking-dates"><strong>' +
      formatShortDate(displayOutbound) +
      " - " +
      formatShortDate(displayReturn) +
      "</strong>" +
      (changed ? "Updated itinerary" : "Original itinerary") +
      "</span>" +
      '<span class="booking-paid"><span>Total paid</span><strong>' +
      money(bookingTotalPaid(booking), 2) +
      "</strong></span>" +
      '<span class="booking-arrow">' +
      ICONS.chevronRight +
      "</span>" +
      "</button>"
    );
  }

  function renderMiles() {
    const activity = sortedBookings().filter(function (booking) {
      return Number(booking.milesEarned) > 0;
    });

    return (
      '<section class="miles-page page-enter">' +
      '<button class="back-button" type="button" data-action="go-account">' +
      ICONS.chevronLeft +
      "Back to account</button>" +
      '<div class="page-heading"><div><p class="eyebrow">Asia Miles</p>' +
      "<h1>Mileage activity</h1><p>Miles earned from flexible date changes.</p></div></div>" +
      '<div class="miles-balance"><span class="miles-balance-label">Total accumulated miles</span>' +
      "<strong>" +
      numberFormat.format(totalMiles()) +
      "</strong><p>From " +
      pluralize(activity.length, "qualifying change", "qualifying changes") +
      " in this account.</p></div>" +
      '<div class="miles-activity"><div class="account-section-head"><h2>Activity</h2><span>' +
      pluralize(activity.length, "entry", "entries") +
      "</span></div>" +
      (activity.length
        ? '<div class="miles-activity-list">' +
          activity.map(renderMilesActivityRow).join("") +
          "</div>"
        : '<div class="account-empty"><h3>No miles activity</h3><p>A higher-fare date change will add miles here.</p></div>') +
      "</div></section>"
    );
  }

  function renderMilesActivityRow(booking) {
    const ticket = getTicket(booking.ticketId);
    if (!ticket) return "";
    return (
      '<button class="miles-activity-row" type="button" data-action="open-booking" data-booking-id="' +
      booking.id +
      '"><span><strong>Hong Kong to ' +
      escapeMarkup(ticket.route.city) +
      " · " +
      ticket.family.name +
      "</strong><span>Date changed " +
      formatShortDate(booking.changedAt.slice(0, 10)) +
      " · Fare difference " +
      money(booking.fareDifference) +
      "</span></span>" +
      '<span class="miles-activity-value">' +
      numberFormat.format(booking.milesEarned) +
      "<span>miles</span></span></button>"
    );
  }

  function renderBookingDetail() {
    const booking = state.activeBooking;
    const ticket = getTicket(booking.ticketId);
    if (!ticket) return renderMissingBooking();
    const route = ticket.route;
    const changed = booking.status === "changed";
    const outboundDate = changed
      ? booking.newOutboundDate
      : booking.originalOutboundDate;
    const returnDate = changed
      ? booking.newReturnDate
      : booking.originalReturnDate;

    return (
      '<section class="page-enter">' +
      '<button class="back-button" type="button" data-action="go-account">' +
      ICONS.chevronLeft +
      "Back to my account</button>" +
      '<div class="booking-detail-head"><div><p class="eyebrow">Booking details</p>' +
      "<h1>Hong Kong to " +
      route.city +
      "</h1><p>" +
      route.outbound.flight +
      " · " +
      ticket.family.name +
      " · Economy</p></div>" +
      statusTag(booking) +
      "</div>" +
      '<div class="booking-detail-grid">' +
      '<div><article class="panel itinerary-panel">' +
      '<header class="itinerary-header"><div><h1>' +
      (changed ? "Your updated trip" : "Your booked trip") +
      "</h1><p>" +
      (changed
        ? "This booking has used its one flexible date change."
        : "Your flexible date benefit is active.") +
      "</p></div><span class=\"family-badge " +
      ticket.family.className +
      '">' +
      ticket.family.name +
      "</span></header>" +
      renderFlightLeg("Outbound", outboundDate, "HKG", route.code, route.outbound) +
      renderFlightLeg("Return", returnDate, route.code, "HKG", route.inbound) +
      "</article></div>" +
      '<aside class="panel booking-side"><h2>Booking summary</h2>' +
      '<div class="account-info-list">' +
      renderAccountInfoRow("Booking reference", bookingReference(booking)) +
      renderAccountInfoRow("Fare", money(booking.fare)) +
      renderAccountInfoRow("Benefit fee K", money(booking.benefitFee, 2)) +
      renderAccountInfoRow("Booking total", money(booking.fare + booking.benefitFee, 2)) +
      (changed
        ? renderAccountInfoRow("Fare difference", money(booking.fareDifference)) +
          renderAccountInfoRow("Miles earned", numberFormat.format(booking.milesEarned)) +
          renderAccountInfoRow("Total paid", money(bookingTotalPaid(booking), 2))
        : "") +
      "</div>" +
      (changed
        ? '<button class="button" type="button" style="margin-top: 20px" data-action="open-receipt" data-booking-id="' +
          booking.id +
          '">' +
          ICONS.receipt +
          "View change receipt</button>"
        : '<button class="button" type="button" style="margin-top: 20px" data-action="enter-change" data-booking-id="' +
          booking.id +
          '">' +
          ICONS.calendar +
          "Enter date change</button>") +
      "</aside></div></section>"
    );
  }

  function renderAccountInfoRow(label, value) {
    return (
      '<div class="account-info-row"><span>' +
      escapeMarkup(label) +
      "</span><strong>" +
      escapeMarkup(value) +
      "</strong></div>"
    );
  }

  function renderMissingBooking() {
    return (
      '<section class="empty-state page-enter"><h2>Booking not found</h2>' +
      "<p>The booking may have been cleared by refreshing the demo account.</p>" +
      '<a class="button" style="margin-top: 18px" href="#/account">Back to my account</a>' +
      "</section>"
    );
  }

  function renderFilterChip(id, label) {
    return (
      '<button class="filter-chip" type="button" data-action="filter" data-filter="' +
      id +
      '" aria-pressed="' +
      (state.filter === id ? "true" : "false") +
      '">' +
      escapeMarkup(label) +
      "</button>"
    );
  }

  function renderFareCard(ticket) {
    const route = ticket.route;
    return (
      '<article class="fare-card">' +
      '<div class="fare-topline">' +
      '<span class="route-codes">HKG ' +
      ICONS.arrowRight +
      " " +
      route.code +
      "</span>" +
      '<span class="family-badge ' +
      ticket.family.className +
      '">' +
      ticket.family.name +
      "</span>" +
      "</div>" +
      '<div class="fare-city"><h2>' +
      route.city +
      "</h2><span>" +
      route.country +
      "</span></div>" +
      '<div class="time-row">' +
      '<div class="time-block"><span class="time-date">' +
      formatDate(route.outboundDate) +
      '</span><strong class="time-value">' +
      route.outbound.dep +
      "</strong></div>" +
      '<div class="flight-line">' +
      route.outbound.flight +
      "<br>" +
      route.outbound.duration +
      "</div>" +
      '<div class="time-block"><span class="time-date">' +
      formatDate(route.outboundDate) +
      '</span><strong class="time-value">' +
      route.outbound.arr +
      "</strong></div>" +
      "</div>" +
      '<p class="return-line">Return ' +
      formatDate(route.returnDate) +
      " · " +
      route.inbound.flight +
      "</p>" +
      '<div class="fare-footer">' +
      '<div class="fare-price"><small>Round trip</small><strong>' +
      money(ticket.fare) +
      "</strong></div>" +
      '<button class="button" type="button" data-action="select-ticket" data-ticket-id="' +
      ticket.id +
      '">View benefit ' +
      ICONS.arrowRight +
      "</button>" +
      "</div>" +
      "</article>"
    );
  }

  function renderStepper(activeIndex) {
    const labels = ["Fare", "Benefit fee", "New date", "Confirmed"];
    return (
      '<div class="stepper" aria-label="Booking progress">' +
      labels
        .map(function (label, index) {
          let className = "step";
          if (index < activeIndex) className += " is-complete";
          if (index === activeIndex) className += " is-active";
          return (
            '<span class="' +
            className +
            '">' +
            escapeMarkup(label) +
            "</span>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderDetail() {
    const ticket = state.ticket;
    const route = ticket.route;
    const existingBooking = findOpenBookingForTicket(ticket.id);
    const availableFee =
      state.fee || (existingBooking ? calculateBenefit(ticket) : null);
    const feePanel = state.pricing
      ? renderModelLoader()
      : availableFee
        ? renderFeeOutput(ticket, availableFee, existingBooking)
        : renderFeeWaiting();

    return (
      '<section class="page-enter">' +
      renderStepper(1) +
      '<button class="back-button" type="button" data-action="go-home">' +
      ICONS.chevronLeft +
      "Back to home</button>" +
      '<div class="detail-grid">' +
      '<div>' +
      '<article class="panel itinerary-panel">' +
      '<header class="itinerary-header">' +
      "<div><h1>Hong Kong to " +
      route.city +
      "</h1><p>" +
      route.airport +
      " · Round trip · Economy · 1 adult</p></div>" +
      '<span class="family-badge ' +
      ticket.family.className +
      '">' +
      ticket.family.name +
      "</span>" +
      "</header>" +
      renderFlightLeg("Outbound", route.outboundDate, "HKG", route.code, route.outbound) +
      renderFlightLeg("Return", route.returnDate, route.code, "HKG", route.inbound) +
      "</article>" +
      '<article class="panel benefit-panel">' +
      '<p class="eyebrow">Included with the fee</p>' +
      '<h2 class="section-title">One flexible date change</h2>' +
      '<div class="benefit-grid">' +
      renderBenefitItem(
        ICONS.calendar,
        "60-day window",
        "Choose from available dates around your original trip."
      ) +
      renderBenefitItem(
        ICONS.shield,
        "Change fee waived",
        ticket.family.changeFee === 0
          ? "Flex already includes a free date change."
          : "One change fee of " + money(ticket.family.changeFee) + " is covered."
      ) +
      renderBenefitItem(
        ICONS.star,
        "Asia Miles return",
        "Receive miles when the new fare is higher."
      ) +
      "</div>" +
      "</article>" +
      "</div>" +
      '<aside class="panel booking-panel" aria-label="Fare and benefit summary">' +
      '<p class="booking-label">' +
      ticket.family.name +
      " fare</p>" +
      '<div class="booking-fare"><strong>' +
      money(ticket.fare) +
      "</strong><span>Round trip</span></div>" +
      '<div id="fee-panel">' +
      feePanel +
      "</div>" +
      "</aside>" +
      "</div>" +
      "</section>"
    );
  }

  function renderFlightLeg(label, isoDate, fromCode, toCode, leg) {
    return (
      '<div class="flight-leg">' +
      '<div class="leg-date">' +
      label +
      "<strong>" +
      formatDate(isoDate, true) +
      "</strong></div>" +
      '<div class="leg-route">' +
      '<div class="leg-place"><span class="leg-time">' +
      leg.dep +
      '</span><span class="leg-airport">' +
      fromCode +
      "</span></div>" +
      '<div class="leg-middle">' +
      ICONS.plane +
      leg.flight +
      " · " +
      leg.duration +
      "</div>" +
      '<div class="leg-place"><span class="leg-time">' +
      leg.arr +
      '</span><span class="leg-airport">' +
      toCode +
      "</span></div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderBenefitItem(icon, title, copy) {
    return (
      '<div class="benefit-item"><span class="benefit-icon">' +
      icon +
      "</span><div><strong>" +
      escapeMarkup(title) +
      "</strong><span>" +
      escapeMarkup(copy) +
      "</span></div></div>"
    );
  }

  function renderFeeWaiting() {
    return (
      '<div class="fee-waiting">' +
      "<h2>Benefit fee K</h2>" +
      "<p>Price the fare-risk and mileage-return components for this ticket.</p>" +
      '<button class="button pay-button" type="button" data-action="run-model">' +
      ICONS.spark +
      "Run benefit model</button>" +
      '<p class="fee-note">Offline calculation · Instant result</p>' +
      "</div>"
    );
  }

  function renderModelLoader() {
    return (
      '<div class="model-loader" role="status" aria-live="polite">' +
      "<div>" +
      '<div class="radar" aria-hidden="true"></div>' +
      "<strong>Evaluating fare movement</strong>" +
      "<span>Risk, expected mileage, and service cost</span>" +
      "</div>" +
      "</div>"
    );
  }

  function renderFeeOutput(ticket, fee, existingBooking) {
    const total = ticket.fare + fee.fee;
    return (
      '<div class="fee-output">' +
      '<div class="fee-kicker">' +
      ICONS.check +
      (existingBooking ? "Benefit already active" : "Model complete") +
      "</div>" +
      '<div class="fee-total" id="fee-total" tabindex="-1"><strong>' +
      decimalFormat.format(fee.fee) +
      "</strong><span>HKD</span></div>" +
      '<p class="fee-subtitle">One-time benefit fee K</p>' +
      '<div class="model-facts">' +
      '<div class="model-fact"><strong>5%</strong><span>Change rate</span></div>' +
      '<div class="model-fact"><strong>10%</strong><span>Volatility</span></div>' +
      '<div class="model-fact"><strong>' +
      numberFormat.format(Math.round(fee.estimatedMilesPerChange)) +
      "</strong><span>Est. miles</span></div>" +
      "</div>" +
      '<div class="payment-total-list">' +
      '<div class="payment-total-row"><span>Fare</span><strong>' +
      money(ticket.fare) +
      "</strong></div>" +
      '<div class="payment-total-row"><span>Benefit fee K</span><strong>' +
      money(fee.fee, 2) +
      "</strong></div>" +
      '<div class="payment-total-row grand-total"><span>' +
      (existingBooking ? "Booking total" : "Total due") +
      "</span><strong>" +
      money(total, 2) +
      "</strong></div>" +
      "</div>" +
      (existingBooking
        ? '<button class="button pay-button" type="button" data-action="continue-booking" data-booking-id="' +
          existingBooking.id +
          '">' +
          ICONS.calendar +
          "Continue to date change</button>" +
          '<p class="fee-note">Fare and benefit fee were paid with this booking</p>'
        : '<button class="button pay-button" type="button" data-action="pay-benefit">' +
          ICONS.card +
          "Pay " +
          money(total, 2) +
          "</button>" +
          '<p class="fee-note">Fare + benefit fee K · Simulated payment</p>') +
      '<details class="model-breakdown">' +
      "<summary>Fee breakdown</summary>" +
      '<div class="breakdown-list">' +
      renderBreakdownRow("Service and processing", fee.processingReserve) +
      renderBreakdownRow("Change-fee reserve", fee.changeFeeReserve) +
      renderBreakdownRow("Mileage reserve", fee.mileageReserve) +
      renderBreakdownRow("Risk buffer", fee.riskBuffer) +
      renderBreakdownRow("Service margin", fee.margin) +
      "</div>" +
      "</details>" +
      "</div>"
    );
  }

  function renderBreakdownRow(label, value) {
    return (
      '<div class="breakdown-row"><span>' +
      escapeMarkup(label) +
      "</span><span>" +
      money(value, 2) +
      "</span></div>"
    );
  }

  function renderChanges() {
    const ticket = state.ticket;
    const booking = state.activeBooking;
    const route = ticket.route;
    const deadline = addDays(booking.originalOutboundDate, -MODEL.deadlineDays);

    return (
      '<section class="page-enter">' +
      renderStepper(2) +
      '<button class="back-button" type="button" data-action="go-booking" data-booking-id="' +
      booking.id +
      '">' +
      ICONS.chevronLeft +
      "Back to booking</button>" +
      '<div class="change-heading">' +
      '<div><p class="eyebrow">Benefit active</p><h1>Choose your new date</h1>' +
      "<p>" +
      route.city +
      " · " +
      ticket.family.name +
      " · " +
      "Original travel " +
      formatShortDate(booking.originalOutboundDate) +
      "</p></div>" +
      '<span class="change-window-badge">Change by ' +
      formatShortDate(deadline) +
      "</span>" +
      "</div>" +
      '<div class="change-toolbar">' +
      '<span class="change-toolbar-route">' +
      ICONS.calendar +
      formatShortDate(booking.originalOutboundDate) +
      " → " +
      formatShortDate(booking.originalReturnDate) +
      "</span>" +
      '<span class="change-toolbar-meta">' +
      pluralize(state.options.length, "available date", "available dates") +
      " · 60-day change window</span>" +
      "</div>" +
      '<div class="change-grid">' +
      state.options.map(renderChangeOption).join("") +
      "</div>" +
      '<p class="change-footnote">All fares and payments in HKD. Fares are simulated and subject to the demo inventory.</p>' +
      "</section>"
    );
  }

  function renderChangeOption(option) {
    const parts = dateParts(option.newOutboundDate);
    const deltaClass =
      option.difference < 0
        ? "delta-lower"
        : option.difference > 0
          ? "delta-higher"
          : "delta-equal";
    const deltaText =
      option.difference === 0 ? "HKD 0" : signedMoney(option.difference);

    return (
      '<button class="date-option" type="button" data-action="select-change" data-option-id="' +
      option.id +
      '">' +
      '<span class="date-top"><span><span class="date-month">' +
      parts.month +
      '</span><span class="date-day">' +
      parts.day +
      '</span><span class="date-weekday">' +
      parts.weekday +
      '</span></span><span class="delta-badge ' +
      deltaClass +
      '">' +
      deltaText +
      "</span></span>" +
      '<span class="return-date">Return ' +
      formatDate(option.newReturnDate, true) +
      "</span>" +
      '<span class="change-price"><small>New fare</small><strong>' +
      money(option.fare) +
      "</strong></span>" +
      '<span class="select-date">Select date ' +
      ICONS.arrowRight +
      "</span>" +
      "</button>"
    );
  }

  function renderReceipt() {
    const booking = state.activeBooking;
    const ticket = getTicket(booking.ticketId);
    if (!ticket) return renderMissingBooking();
    const route = ticket.route;
    const isHigher = Number(booking.fareDifference) > 0;
    const miles = Number(booking.milesEarned) || 0;
    const cashEquivalent = isHigher ? Number(booking.fareDifference) * MODEL.alpha : 0;

    return (
      '<section class="success-page page-enter">' +
      renderStepper(3) +
      '<div class="success-hero">' +
      '<div class="success-mark">' +
      ICONS.check +
      "</div>" +
      "<h1>" +
      (isHigher ? "Date changed successfully" : "Your new date is confirmed") +
      "</h1>" +
      "<p>" +
      (isHigher
        ? "The fare difference is paid and your new itinerary is ready."
        : "The date change is complete at no additional fare cost.") +
      "</p>" +
      "</div>" +
      '<article class="panel success-card">' +
      '<div class="success-route">' +
      "<div><h2>Hong Kong to " +
      route.city +
      "</h2><p>" +
      route.outbound.flight +
      " · " +
      ticket.family.name +
      " · Economy · " +
      bookingReference(booking) +
      "</p></div>" +
      '<div class="success-dates"><span>New travel dates</span>' +
      formatShortDate(booking.newOutboundDate) +
      " - " +
      formatShortDate(booking.newReturnDate) +
      "</div>" +
      "</div>" +
      '<div class="success-summary">' +
      '<div class="summary-block"><h3>Itinerary</h3><div class="summary-list">' +
      renderSummaryRow("Outbound", formatShortDate(booking.newOutboundDate)) +
      renderSummaryRow("Return", formatShortDate(booking.newReturnDate)) +
      renderSummaryRow("Change fee", "HKD 0") +
      "</div></div>" +
      '<div class="summary-block"><h3>Settlement</h3><div class="summary-list">' +
      renderSummaryRow("Original fare", money(booking.fare)) +
      renderSummaryRow("Benefit fee K", money(booking.benefitFee, 2)) +
      renderSummaryRow("New fare", money(booking.newFare)) +
      renderSummaryRow("Fare difference", signedMoney(booking.fareDifference)) +
      '<div class="summary-list-row total"><span>' +
      (isHigher ? "Paid today" : "Additional payment") +
      "</span><strong>" +
      money(isHigher ? booking.changePaid : 0) +
      "</strong></div>" +
      "</div></div>" +
      "</div>" +
      (isHigher
        ? renderMilesPanel(booking.fareDifference, miles, cashEquivalent)
        : '<div class="miles-panel"><div class="info-box info-success" style="margin: 0">' +
          (booking.fareDifference < 0
            ? "The lower fare is non-refundable. Your date change is complete and the change fee has been waived."
            : "There is no fare difference. Your date change is complete and the change fee has been waived.") +
          "</div></div>") +
      "</article>" +
      '<div class="success-actions">' +
      '<button class="button button-secondary" type="button" data-action="go-booking" data-booking-id="' +
      booking.id +
      '">' +
      ICONS.chevronLeft +
      "Back to booking</button>" +
      '<button class="button" type="button" data-action="go-account">' +
      ICONS.user +
      "Go to my account</button>" +
      "</div>" +
      "</section>"
    );
  }

  function renderSummaryRow(label, value) {
    return (
      '<div class="summary-list-row"><span>' +
      escapeMarkup(label) +
      "</span><strong>" +
      escapeMarkup(value) +
      "</strong></div>"
    );
  }

  function renderMilesPanel(difference, miles, cashEquivalent) {
    return (
      '<div class="miles-panel">' +
      '<div class="miles-head"><div><h3>Asia Miles compensation</h3><p class="fee-subtitle" style="margin: 4px 0 0">Cash-equivalent return on the paid difference</p></div>' +
      '<div class="miles-total">' +
      numberFormat.format(miles) +
      "<span>miles</span></div></div>" +
      '<div class="miles-grid">' +
      '<div class="miles-fact"><strong>' +
      money(difference) +
      "</strong><span>Paid difference</span></div>" +
      '<div class="miles-fact"><strong>' +
      money(cashEquivalent) +
      "</strong><span>50% cash-equivalent</span></div>" +
      '<div class="miles-fact"><strong>HKD ' +
      decimalFormat.format(MODEL.passengerMileValue) +
      "</strong><span>Value per mile</span></div>" +
      "</div>" +
      '<p class="fee-subtitle" style="margin: 14px 0 0">' +
      numberFormat.format(miles) +
      " miles will be credited to the linked Asia Miles account after travel. The 20,000-mile cap was not exceeded.</p>" +
      "</div>"
    );
  }

  function openReviewModal(option) {
    removeToast();
    activeReview = option;
    modalBusy = false;
    previousFocus = document.activeElement;
    modalRoot.innerHTML = renderReviewModal(option);
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(function () {
      const target = modalRoot.querySelector("[data-autofocus]");
      if (target) target.focus();
    });
  }

  function renderReviewModal(option) {
    const booking = state.activeBooking;
    const isHigher = option.difference > 0;
    const milesData = calculateMiles(option.difference);

    return (
      '<div class="modal-backdrop" data-action="close-modal">' +
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="review-title">' +
      '<div class="modal-header"><div><p class="eyebrow">Date change review</p><h2 id="review-title">' +
      (isHigher ? "Fare difference due" : "Confirm your new date") +
      "</h2></div>" +
      '<button class="icon-button" type="button" data-action="close-modal" aria-label="Close">' +
      ICONS.close +
      "</button></div>" +
      '<div class="modal-body">' +
      '<div class="date-review">' +
      '<div><span class="date-review-label">Original outbound</span><span class="date-review-date">' +
      formatShortDate(booking.originalOutboundDate) +
      "</span></div>" +
      '<span class="date-review-arrow">' +
      ICONS.arrowRight +
      "</span>" +
      '<div><span class="date-review-label">New outbound</span><span class="date-review-date">' +
      formatShortDate(option.newOutboundDate) +
      "</span></div>" +
      "</div>" +
      '<div class="price-table">' +
      renderPriceRow("Original fare", money(booking.fare)) +
      renderPriceRow("New fare", money(option.fare)) +
      renderPriceRow("Change fee", "HKD 0 · waived") +
      '<div class="price-row price-total"><span>' +
      (isHigher ? "Fare difference to pay" : "Additional payment") +
      "</span><strong>" +
      money(isHigher ? option.difference : 0) +
      "</strong></div>" +
      "</div>" +
      (isHigher
        ? '<div class="info-box">After payment, a cash-equivalent 50% of the fare difference returns as ' +
          numberFormat.format(milesData.miles) +
          " Asia Miles.</div>"
        : '<div class="info-box info-success">No additional payment is needed. ' +
          (option.difference < 0
            ? "The lower fare is not refundable."
            : "The new fare is the same as the original fare.") +
          "</div>") +
      '<div class="modal-actions">' +
      '<button class="button button-secondary" type="button" data-action="close-modal">Cancel</button>' +
      (isHigher
        ? '<button class="button" type="button" data-autofocus data-action="pay-difference">Pay ' +
          money(option.difference) +
          " difference " +
          ICONS.card +
          "</button>"
        : '<button class="button" type="button" data-autofocus data-action="confirm-change">Confirm change ' +
          ICONS.check +
          "</button>") +
      "</div>" +
      '<p class="fee-note">Simulated payment · No card details required</p>' +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderPriceRow(label, value) {
    return (
      '<div class="price-row"><span>' +
      escapeMarkup(label) +
      "</span><strong>" +
      escapeMarkup(value) +
      "</strong></div>"
    );
  }

  function closeModal(options) {
    if (modalBusy) return;
    const shouldRestoreFocus = !options || options.restoreFocus !== false;
    activeReview = null;
    modalRoot.innerHTML = "";
    document.body.style.overflow = "";
    if (shouldRestoreFocus && previousFocus && document.contains(previousFocus)) {
      previousFocus.focus();
    }
    previousFocus = null;
  }

  function confirmChange(option) {
    removeToast();
    closeModal({ restoreFocus: false });
    completeChange(option, 0);
    announce("Date change confirmed.");
  }

  function payDifference(option) {
    if (modalBusy) return;
    modalBusy = true;
    modalRoot.innerHTML =
      '<div class="modal-backdrop">' +
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="processing-title">' +
      '<div class="processing-state"><div><div class="spinner" aria-hidden="true"></div>' +
      '<strong id="processing-title">Processing fare difference</strong>' +
      "<span>" +
      money(option.difference) +
      " · Simulated payment</span></div></div>" +
      "</div></div>";
    announce("Processing simulated fare difference payment.");

    window.setTimeout(function () {
      const milesData = calculateMiles(option.difference);
      removeToast();
      modalBusy = false;
      closeModal({ restoreFocus: false });
      completeChange(option, milesData.miles);
      announce(
        "Payment complete. " +
          numberFormat.format(milesData.miles) +
          " Asia Miles compensation added."
      );
    }, 900);
  }

  function completeChange(option, milesEarned) {
    const booking = state.activeBooking;
    if (!booking) return;
    booking.status = "changed";
    booking.newOutboundDate = option.newOutboundDate;
    booking.newReturnDate = option.newReturnDate;
    booking.newFare = option.fare;
    booking.fareDifference = option.difference;
    booking.changePaid = Math.max(0, option.difference);
    booking.milesEarned = milesEarned;
    booking.changedAt = new Date().toISOString();
    saveAccountData();
    replaceRoute("#/receipt/" + booking.id);
  }

  function showToast(message) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    if (toastTimer) window.clearTimeout(toastTimer);

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = ICONS.check + "<span>" + escapeMarkup(message) + "</span>";
    document.body.appendChild(toast);
    toastTimer = window.setTimeout(function () {
      toast.remove();
      toastTimer = null;
    }, 2600);
  }

  function removeToast() {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    if (toastTimer) {
      window.clearTimeout(toastTimer);
      toastTimer = null;
    }
  }

  function announce(message) {
    liveRegion.textContent = "";
    window.setTimeout(function () {
      liveRegion.textContent = message;
    }, 20);
  }

  function parseRoute() {
    const raw = (window.location.hash || "#/home").replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean);
    const section = parts[0] || "home";

    if (section === "home") return { screen: "home" };
    if (section === "account") return { screen: "account" };
    if (section === "miles") return { screen: "miles" };
    if (section === "fare" && parts[1]) {
      return { screen: "detail", ticketId: decodeURIComponent(parts[1]) };
    }
    if (section === "booking" && parts[1]) {
      return { screen: "booking", bookingId: decodeURIComponent(parts[1]) };
    }
    if (section === "changes" && parts[1]) {
      return { screen: "changes", bookingId: decodeURIComponent(parts[1]) };
    }
    if (section === "receipt" && parts[1]) {
      return { screen: "receipt", bookingId: decodeURIComponent(parts[1]) };
    }
    return { screen: "missing" };
  }

  function handleRoute() {
    let route = parseRoute();
    state.activeBooking = null;
    state.ticket = null;
    state.fee = null;
    state.pricing = false;
    state.options = [];

    if (route.screen === "detail") {
      state.ticket = getTicket(route.ticketId);
      if (!state.ticket) route = { screen: "missing" };
    }

    if (
      route.screen === "booking" ||
      route.screen === "changes" ||
      route.screen === "receipt"
    ) {
      const booking = getBooking(route.bookingId);
      if (!booking) {
        route = { screen: "missing" };
      } else {
        state.activeBooking = booking;
        state.ticket = getTicket(booking.ticketId);
        if (!state.ticket) route = { screen: "missing" };
      }
    }

    if (
      route.screen === "changes" &&
      state.activeBooking &&
      state.activeBooking.status === "changed"
    ) {
      route = { screen: "receipt", bookingId: state.activeBooking.id };
      window.history.replaceState(null, "", "#/receipt/" + state.activeBooking.id);
    }

    if (
      route.screen === "receipt" &&
      state.activeBooking &&
      state.activeBooking.status !== "changed"
    ) {
      route = { screen: "booking", bookingId: state.activeBooking.id };
      window.history.replaceState(null, "", "#/booking/" + state.activeBooking.id);
    }

    if (route.screen === "changes" && state.activeBooking) {
      state.options = generateChangeOptions(state.activeBooking);
    }

    state.route = route;
    state.screen = route.screen;
    render({ focus: true });
  }

  function go(path) {
    removeToast();
    if (window.location.hash === path) {
      handleRoute();
      return;
    }
    window.location.hash = path;
  }

  function replaceRoute(path) {
    removeToast();
    window.history.replaceState(null, "", path);
    handleRoute();
  }

  function refreshDemoAccount() {
    accountData.account.membershipNumber = newMembershipNumber();
    accountData.bookings = [];
    saveAccountData();
    state.activeBooking = null;
    state.ticket = null;
    state.fee = null;
    state.pricing = false;
    state.options = [];

    if (window.location.hash === "#/account") {
      render({ focus: true });
    } else {
      go("#/account");
    }
    showToast("Account refreshed. Bookings and miles cleared.");
    announce("Demo account refreshed. Bookings and miles cleared.");
  }

  app.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    const action = trigger.dataset.action;

    if (action === "filter") {
      state.filter = trigger.dataset.filter;
      render();
      return;
    }

    if (action === "select-ticket") {
      const ticket = getTicket(trigger.dataset.ticketId);
      if (!ticket) return;
      go("#/fare/" + ticket.id);
      announce("Benefit details opened for " + ticket.route.city + ".");
      return;
    }

    if (action === "go-home") {
      go("#/home");
      return;
    }

    if (action === "go-account") {
      go("#/account");
      return;
    }

    if (action === "open-booking") {
      const bookingId = trigger.dataset.bookingId;
      if (bookingId) go("#/booking/" + bookingId);
      return;
    }

    if (action === "enter-change" || action === "continue-booking") {
      const bookingId = trigger.dataset.bookingId;
      const booking = getBooking(bookingId);
      if (!booking) {
        go("#/account");
        return;
      }
      go("#/changes/" + booking.id);
      return;
    }

    if (action === "go-booking") {
      const bookingId = trigger.dataset.bookingId;
      if (bookingId) go("#/booking/" + bookingId);
      return;
    }

    if (action === "open-receipt") {
      const bookingId = trigger.dataset.bookingId;
      if (bookingId) go("#/receipt/" + bookingId);
      return;
    }

    if (action === "refresh-account") {
      refreshDemoAccount();
      return;
    }

    if (action === "run-model" && state.screen === "detail" && state.ticket) {
      if (state.pricing) return;
      state.pricing = true;
      render();
      window.setTimeout(function () {
        if (state.screen !== "detail" || !state.ticket) return;
        state.fee = calculateBenefit(state.ticket);
        state.pricing = false;
        render();
        window.requestAnimationFrame(function () {
          const feeElement = document.getElementById("fee-total");
          if (feeElement) feeElement.focus({ preventScroll: true });
        });
        announce(
          "Benefit fee calculated: " + money(state.fee.fee, 2) + "."
        );
      }, 900);
      return;
    }

    if (action === "pay-benefit" && state.fee && state.screen === "detail") {
      const ticket = state.ticket;
      const fee = state.fee;
      const total = ticket.fare + fee.fee;
      trigger.disabled = true;
      trigger.innerHTML =
        '<span class="spinner" style="width: 16px; height: 16px; margin: 0; border-width: 2px"></span> Processing';
      announce("Processing simulated payment of " + money(total, 2) + ".");
      window.setTimeout(function () {
        let booking = findOpenBookingForTicket(ticket.id);
        if (!booking) {
          booking = makeBooking(ticket, fee);
          accountData.bookings.unshift(booking);
          saveAccountData();
        }
        go("#/changes/" + booking.id);
        showToast(
          "Payment of " +
            money(total, 2) +
            " complete. Choose a new date."
        );
        announce(
          "Payment of " +
            money(total, 2) +
            " complete. Choose a new date."
        );
      }, 800);
      return;
    }

    if (action === "select-change" && state.screen === "changes") {
      const option = state.options.find(function (item) {
        return item.id === trigger.dataset.optionId;
      });
      if (option) openReviewModal(option);
      return;
    }

    if (action === "restart") {
      state.filter = "all";
      go("#/home");
    }
  });

  modalRoot.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal-backdrop")) {
      closeModal();
      return;
    }

    const trigger = event.target.closest("[data-action]");
    if (!trigger) return;
    const action = trigger.dataset.action;

    if (action === "close-modal") {
      closeModal();
      return;
    }

    if (action === "confirm-change" && activeReview) {
      confirmChange(activeReview);
      return;
    }

    if (action === "pay-difference" && activeReview) {
      payDifference(activeReview);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeReview) {
      closeModal();
    }
  });

  accountData = loadAccountData();
  if (!window.location.hash || window.location.hash === "#top") {
    window.history.replaceState(null, "", "#/home");
  }
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
})();
