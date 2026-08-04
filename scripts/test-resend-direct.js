const fetch = require('node-fetch');

async function sendDirectResend() {
  const targetEmail = "winnerbanjochannel@gmail.com";
  console.log(`Sending direct email to ${targetEmail}...`);

  // Testing with Resend public API endpoint (Sends directly to recipient inbox)
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_123456789',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Stay Connect Hotels <onboarding@resend.dev>',
        to: [targetEmail],
        subject: 'Luxury Stay Reservation Voucher - Stay Connect Hotels Lekki',
        html: `
          <div style="font-family: Georgia, serif; background-color: #111111; color: #FAF9F6; padding: 30px; border-radius: 12px; max-width: 550px; border: 1px solid #C6A15B;">
            <h1 style="color: #C6A15B; text-align: center; font-size: 26px;">STAY CONNECT HOTELS</h1>
            <p style="text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8E8B85;">14B Providence Street, Lekki Phase 1, Lagos</p>
            <hr style="border: 0; border-top: 1px solid #2C2B29; margin: 20px 0;" />
            <h2 style="font-size: 20px; font-weight: normal;">Reservation Voucher Confirmed</h2>
            <p style="font-size: 14px;">Dear Winner Banjo,</p>
            <p style="font-size: 13px; color: #D1CDC7;">Your reservation for the <strong>Saffron Executive Suite</strong> has been confirmed.</p>
            <div style="background-color: #1A1918; border: 1px solid #C6A15B; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <div style="font-size: 10px; uppercase; color: #8E8B85;">Voucher Reference Code</div>
              <div style="font-size: 24px; color: #C6A15B; font-weight: bold; letter-spacing: 3px;">SC-2026-9901</div>
            </div>
            <p style="font-size: 12px; text-align: center; color: #8E8B85;">WhatsApp Concierge: +234 704 100 8351</p>
          </div>
        `
      })
    });
    console.log("Resend API Status:", res.status, await res.json());
  } catch (err) {
    console.log("Resend API error:", err.message);
  }
}

sendDirectResend();
