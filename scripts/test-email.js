const TOKEN = "93155a5bc54cbe235921b6d6844e05f4";

async function testHttpApi() {
  console.log("Testing Mailtrap HTTP API Endpoints...");

  // Endpoint 1: Live Sending API
  try {
    const res1 = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: "reservations@stayconnecthotels.com", name: "Stay Connect Hotels" },
        to: [{ email: "winnerbanjo@gmail.com" }],
        subject: "Reservation Confirmation Voucher",
        text: "Your reservation at 14B Providence Street, Lekki has been confirmed.",
      }),
    });
    const data1 = await res1.json();
    console.log("Live Sending API Response:", res1.status, data1);
  } catch (e1) {
    console.log("Live Sending API Error:", e1.message);
  }

  // Endpoint 2: Sandbox Inboxes List
  try {
    const res2 = await fetch("https://mailtrap.io/api/v1/inboxes", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
      },
    });
    const data2 = await res2.json();
    console.log("Inboxes API Response:", res2.status, data2);

    if (Array.isArray(data2) && data2.length > 0) {
      const inbox = data2[0];
      console.log("Found Inbox:", inbox.id, inbox.name);
      console.log("Inbox Credentials - Username:", inbox.username, "Password:", inbox.password);

      // Now test sending to this inbox via API or SMTP!
      const sendRes = await fetch(`https://sandbox.api.mailtrap.io/api/send/${inbox.id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: { email: "reservations@stayconnecthotels.com", name: "Stay Connect Hotels Lekki" },
          to: [{ email: "guest@stayconnecthotels.com", name: "Guest" }],
          subject: "Luxury Reservation Voucher - Stay Connect Hotels",
          html: "<h1>Reservation Voucher Confirmed</h1>",
        }),
      });
      console.log("Sandbox Send API Response:", sendRes.status, await sendRes.json());
    }
  } catch (e2) {
    console.log("Inboxes API Error:", e2.message);
  }
}

testHttpApi();
