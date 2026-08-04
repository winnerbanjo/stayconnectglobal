const http = require('http');

async function testBookingApi() {
  console.log("Submitting test booking to localhost:3013/api/bookings...");
  const payload = JSON.stringify({
    guestName: "Prince Winner Banjo",
    guestEmail: "winnerbanjo@gmail.com",
    guestPhone: "+234 704 100 8351",
    roomName: "Saffron Executive Suite (14B Providence)",
    checkIn: "2026-08-10",
    checkOut: "2026-08-13",
    nights: 3,
    totalPrice: 624375,
    paymentMethod: "Bank Transfer",
  });

  const req = http.request(
    {
      hostname: "localhost",
      port: 3013,
      path: "/api/bookings",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
      },
    },
    (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        console.log("Booking API Status Code:", res.statusCode);
        console.log("Booking API Response Body:", data);
      });
    }
  );

  req.on("error", (e) => {
    console.error("Booking API Test Error:", e.message);
  });

  req.write(payload);
  req.end();
}

testBookingApi();
