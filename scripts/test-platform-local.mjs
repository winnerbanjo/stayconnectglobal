import assert from "node:assert/strict";
import fs from "node:fs/promises";
const base = "http://127.0.0.1:3000";
let cookie = "";
let partnerToken = "";
const created = { properties: [], rooms: [], bookings: [], partners: [] };
const uploaded = [];
async function request(route, method = "GET", body, auth = false, token) {
  const res = await fetch(base + route, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(auth ? { Cookie: cookie } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  return { res, json };
}
let passed = 0;
function check(value, message) {
  assert.ok(value, message);
  passed++;
  console.log(`PASS ${message}`);
}
try {
  check(
    (await request("/api/admin/session")).json.localPreview === true,
    "Tests are isolated to local preview",
  );
  const publicProperties = (await request("/api/properties")).json.data;
  check(
    publicProperties.some((p) => p.id === "prop-lekki-1"),
    "Existing Residence identity is retained",
  );
  check(
    (await request("/api/properties?city=NoSuchLocation")).json.data.length ===
      0,
    "Empty search does not return unrelated seed properties",
  );
  check(
    (await request("/api/properties?city=Lekki")).json.data.length === 1,
    "Location search matches an area in the address",
  );
  check(
    (await request("/api/bookings")).res.status === 401,
    "Guest cannot read bookings",
  );
  check(
    (
      await request("/api/properties", "PATCH", {
        id: "prop-lekki-1",
        action: "approve",
      })
    ).res.status === 401,
    "Guest cannot approve properties",
  );
  const login = await request("/api/admin/session", "POST", {
    password: "stayconnect1",
  });
  cookie = login.res.headers.get("set-cookie").split(";")[0];
  check(login.res.ok, "Administrator signs in with server session");
  const upload = new FormData();
  upload.append(
    "file",
    new Blob([await fs.readFile("public/images/saffron/saffron-1.jpg")], {
      type: "image/jpeg",
    }),
    "test.jpg",
  );
  const uploadResult = await (
    await fetch(base + "/api/upload", { method: "POST", body: upload })
  ).json();
  check(
    uploadResult.success && uploadResult.url.startsWith("/uploads/"),
    "Image uploads persist locally",
  );
  uploaded.push(uploadResult.url);
  check((await fetch(base + uploadResult.url)).status === 200, 'Uploaded image is served immediately without restarting the app');
  const invalidUpload = new FormData();
  invalidUpload.append(
    "file",
    new Blob(["not an image"], { type: "image/jpeg" }),
    "fake.jpg",
  );
  check(
    (await fetch(base + "/api/upload", { method: "POST", body: invalidUpload }))
      .status === 400,
    "Invalid image contents rejected",
  );
  const partnerBody = {
    businessName: "Local Test Hospitality",
    contactName: "Test Partner",
    email: "partner@example.test",
    phone: "08012345678",
    propertyName: "Local Test Residence",
    propertyType: "Hotel",
    address: "Test Street, Lekki, Lagos",
    city: "Lagos",
    area: "Lekki Test",
    numberOfUnits: 15,
    expectedRate: 50000,
    description:
      "A local test listing used for verification of the complete property workflow.",
    amenities: ["Wi-Fi", "Accessible entrance"],
    images: [uploadResult.url],
  };
  check(
    (
      await request("/api/partners", "POST", {
        ...partnerBody,
        numberOfUnits: 0,
      })
    ).res.status === 400,
    "Invalid room/unit count rejected",
  );
  const partner = (await request("/api/partners", "POST", partnerBody)).json;
  check(partner.success, "Partner registration creates a real property draft");
  partnerToken = partner.data.accessToken;
  const propertyId = partner.data.propertyId;
  created.properties.push(propertyId);
  created.partners.push(partner.data.partnerId);
  let managed = (
    await request("/api/partner/manage", "GET", undefined, false, partnerToken)
  ).json.data;
  let property = managed.properties[0];
  check(
    property.numberOfUnits === 15 &&
      property.gallery[0] === uploadResult.url &&
      property.amenities.some((a) => a.name === "Accessible entrance"),
    "Units, images and custom amenities are saved to the correct property",
  );
  check(
    !(await request("/api/properties")).json.data.some(
      (p) => p.id === propertyId,
    ),
    "Draft is hidden from public search",
  );
  const update = await request(
    "/api/partner/manage",
    "PATCH",
    {
      id: propertyId,
      description: `${property.description} Updated by the owner.`,
    },
    false,
    partnerToken,
  );
  check(update.json.success, "Partner can edit a saved listing");
  check(
    (
      await request(
        "/api/partner/manage",
        "PATCH",
        { id: "prop-lekki-1", action: "submit" },
        false,
        partnerToken,
      )
    ).res.status === 400,
    "Partner cannot edit another owner’s property",
  );
  check(
    (
      await request(
        "/api/partner/manage",
        "PATCH",
        { id: propertyId, action: "submit" },
        false,
        partnerToken,
      )
    ).json.success,
    "Partner submits for verification",
  );
  check(
    (
      await request("/api/properties?manage=true", "GET", undefined, true)
    ).json.data.some(
      (p) =>
        p.id === propertyId && p.verificationStatus === "Pending Verification",
    ),
    "Admin receives the submitted verification request",
  );
  check(
    (
      await request(
        "/api/properties",
        "PATCH",
        {
          id: propertyId,
          action: "changes",
          reviewNote: "Please clarify access instructions.",
        },
        true,
      )
    ).json.success,
    "Admin can request changes with feedback",
  );
  managed = (
    await request("/api/partner/manage", "GET", undefined, false, partnerToken)
  ).json.data;
  check(
    managed.properties[0].reviewNote.includes("access"),
    "Partner sees review feedback",
  );
  await request(
    "/api/partner/manage",
    "PATCH",
    { id: propertyId, action: "submit" },
    false,
    partnerToken,
  );
  check(
    (
      await request(
        "/api/properties",
        "PATCH",
        { id: propertyId, action: "approve" },
        true,
      )
    ).json.success,
    "Admin approves and publishes property",
  );
  check(
    (await request("/api/properties?city=Lekki%20Test")).json.data.some(
      (p) => p.id === propertyId,
    ),
    "Approved listing is discoverable by its area",
  );
  const room = (
    await request(
      "/api/rooms",
      "POST",
      {
        propertyId,
        name: `Local Test Room ${Date.now()}`,
        numberOfUnits: 15,
        pricePerNight: 50000,
        heroImage: uploadResult.url,
        gallery: [uploadResult.url],
        amenities: ["Wi-Fi"],
      },
      true,
    )
  ).json;
  check(
    room.success,
    "Admin creates room inventory linked to approved partner property",
  );
  created.rooms.push(room.data.id);
  check(
    (await fetch(base + `/properties/${property.slug}`)).status === 200,
    "New property detail resolves from saved data",
  );
  check(
    (await fetch(base + `/rooms/${room.data.slug}`)).status === 200,
    "New room detail resolves from saved data",
  );
  const dates = {
    checkIn: new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10),
    checkOut: new Date(Date.now() + 62 * 86400000).toISOString().slice(0, 10),
  };
  const bookingBody = {
    roomId: room.data.id,
    ...dates,
    adults: 2,
    guestName: "Local Test Guest",
    guestEmail: "guest@example.test",
    guestPhone: "08012345678",
    paymentMethod: "Bank Transfer",
    agentCode: "AGENT-TEST",
    visitorId: "test-visitor",
    totalPrice: 1,
    status: "Confirmed",
    paymentStatus: "Paid",
  };
  check(
    (
      await request("/api/bookings", "POST", {
        ...bookingBody,
        checkOut: dates.checkIn,
      })
    ).res.status === 400,
    "Invalid booking dates rejected",
  );
  const booking = (await request("/api/bookings", "POST", bookingBody)).json;
  check(booking.success, "Customer creates reservation");
  created.bookings.push(booking.data.id);
  check(
    booking.data.status === "Pending" &&
      booking.data.paymentStatus === "Unpaid",
    "Reservation cannot self-confirm or self-mark paid",
  );
  check(
    booking.data.totalPrice === 112500,
    "Booking value is calculated server-side, ignoring client price tampering",
  );
  check(
    booking.data.agentCode === "AGENT-TEST" &&
      booking.data.visitorId === "test-visitor",
    "Agent → visitor → reservation → value is retained",
  );
  check(
    (
      await request("/api/bookings", "PATCH", {
        id: booking.data.id,
        action: "confirm-payment",
      })
    ).res.status === 401,
    "Customer cannot confirm their own payment",
  );
  const confirmed = (
    await request(
      "/api/bookings",
      "PATCH",
      { id: booking.data.id, action: "confirm-payment" },
      true,
    )
  ).json;
  check(
    confirmed.data.status === "Confirmed" &&
      confirmed.data.paymentStatus === "Paid" &&
      confirmed.data.paymentConfirmedAt &&
      confirmed.data.paymentConfirmedBy,
    "Payment confirmation records status, time and administrator",
  );
  const repeated = (
    await request(
      "/api/bookings",
      "PATCH",
      { id: booking.data.id, action: "confirm-payment" },
      true,
    )
  ).json;
  check(
    repeated.data.paymentConfirmedAt === confirmed.data.paymentConfirmedAt,
    "Repeated payment confirmation is idempotent",
  );
  await request(
    "/api/rooms",
    "PATCH",
    { id: room.data.id, numberOfUnits: 1 },
    true,
  );
  const overlapping = (await request("/api/bookings", "POST", bookingBody))
    .json;
  created.bookings.push(overlapping.data.id);
  check(
    (
      await request(
        "/api/bookings",
        "PATCH",
        { id: overlapping.data.id, action: "confirm-payment" },
        true,
      )
    ).res.status === 400,
    "Payment confirmation refuses overlapping inventory beyond available units",
  );
  await request(
    "/api/rooms",
    "PATCH",
    { id: room.data.id, numberOfUnits: 15 },
    true,
  );
  check(
    (
      await request(
        "/api/bookings",
        "PATCH",
        { id: overlapping.data.id, action: "confirm-payment" },
        true,
      )
    ).json.success,
    "Multiple room units support overlapping confirmed stays",
  );
  const status = (
    await request("/api/bookings/status", "POST", {
      bookingRef: booking.data.bookingRef,
      token: booking.data.lookupToken,
    })
  ).json;
  check(
    status.data.paymentStatus === "Paid",
    "Customer sees latest payment confirmation",
  );
  managed = (
    await request("/api/partner/manage", "GET", undefined, false, partnerToken)
  ).json.data;
  check(
    managed.bookings.some(
      (b) => b.id === booking.data.id && b.paymentStatus === "Paid",
    ),
    "Relevant property partner sees confirmed booking",
  );
  const residenceRoom = (await request("/api/rooms")).json.data.find(
    (r) => r.propertyId === "prop-lekki-1",
  );
  const residenceBooking = (
    await request("/api/bookings", "POST", {
      ...bookingBody,
      roomId: residenceRoom.id,
    })
  ).json;
  check(
    residenceBooking.success &&
      residenceBooking.data.propertyId === "prop-lekki-1",
    "Residence reservation uses existing property and booking infrastructure",
  );
  created.bookings.push(residenceBooking.data.id);
  check(
    (await request("/api/bookings", "GET", undefined, true)).json.data.some(
      (b) => b.id === residenceBooking.data.id,
    ),
    "Residence booking appears in administration",
  );
  check(
    (await fetch(base + "/properties/missing-property")).status === 404,
    "Unknown property returns 404 instead of wrong listing",
  );
  check(
    (await fetch(base + "/robots.txt")).status === 200,
    "Robots route is available",
  );
  check(
    (await fetch(base + "/flights")).status === 200,
    "Flights coming-soon page is available",
  );
  console.log(`\n${passed} local integration checks passed.`);
} finally {
  // Remove only fixtures created by this test, retaining all other local records.
  const filename = ".local-data/platform.json";
  try {
    const db = JSON.parse(await fs.readFile(filename, "utf8"));
    for (const [collection, ids] of Object.entries(created))
      db[collection] = db[collection].filter((item) => !ids.includes(item.id));
    await fs.writeFile(filename, JSON.stringify(db, null, 2));
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }
  for (const url of uploaded) await fs.unlink(`.local-data${url}`).catch(() => {});
}
