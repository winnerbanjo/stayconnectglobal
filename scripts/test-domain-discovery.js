const nodemailer = require("nodemailer");

const TOKEN = "f8b86b71e617958e8126ec8c54a90162";
const targetEmail = "winnerbanjochannel@gmail.com";

const possibleSenders = [
  "info@demomailtrap.com",
  "test@mailtrap.io",
  "hello@mailtrap.io",
  "no-reply@mailtrap.io",
  "info@mailtrap.live",
  "hello@niletech.mailtrap.live",
  "info@nileagency.africa",
  "reservations@stayconnecthotels.com",
  "hello@stayconnectglobal.com"
];

async function discoverDomain() {
  console.log("Discovering active Mailtrap sender domain...");
  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: TOKEN,
    },
  });

  for (const sender of possibleSenders) {
    try {
      console.log(`Testing sender: ${sender}`);
      const info = await transporter.sendMail({
        from: `"Stay Connect Hotels" <${sender}>`,
        to: targetEmail,
        subject: "Luxury Reservation Voucher - Stay Connect Hotels",
        html: `
          <div style="font-family: Georgia, serif; background-color: #111111; color: #FAF9F6; padding: 30px; border-radius: 12px; max-width: 550px; border: 1px solid #C6A15B;">
            <h1 style="color: #C6A15B; text-align: center;">STAY CONNECT HOTELS</h1>
            <p style="text-align: center; color: #8E8B85;">14B Providence Street, Lekki Phase 1, Lagos</p>
            <hr style="border: 0; border-top: 1px solid #2C2B29; margin: 20px 0;" />
            <h2 style="color: #FFFFFF; text-align: center;">Reservation Voucher Confirmed</h2>
            <p>Dear Customer,</p>
            <p>Your luxury stay reservation at 14B Providence Street, Lekki Phase 1 has been confirmed.</p>
            <div style="background-[#1A1918]; border: 1px solid #C6A15B; padding: 15px; text-align: center; font-size: 24px; color: #C6A15B; font-weight: bold;">
              SC-2026-9901
            </div>
            <p style="text-align: center; color: #8E8B85; font-size: 12px; margin-top: 20px;">WhatsApp Concierge: +234 704 100 8351</p>
          </div>
        `,
      });
      console.log(`🎉 SUCCESS! Sent from ${sender}. Message ID: ${info.messageId}`);
      return sender;
    } catch (err) {
      console.log(`Failed for ${sender}:`, err.message);
    }
  }
}

discoverDomain();
