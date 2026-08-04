const { MailtrapClient } = require("mailtrap");
const nodemailer = require("nodemailer");

const TOKEN = "f8b86b71e617958e8126ec8c54a90162";
const targetEmail = "winnerbanjochannel@gmail.com";

async function sendMailtrapEmail() {
  console.log(`Sending reservation voucher to ${targetEmail} using sender technile0@gmail.com...`);

  // Trial 1: Mailtrap Live SMTP with technile0@gmail.com
  try {
    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: TOKEN,
      },
    });

    const info = await transporter.sendMail({
      from: '"Stay Connect Hotels" <technile0@gmail.com>',
      to: targetEmail,
      subject: "Luxury Reservation Voucher SC-2026-9901 | Stay Connect Hotels",
      html: `
        <div style="font-family: Georgia, serif; background-color: #111111; color: #FAF9F6; padding: 30px; border-radius: 12px; max-width: 550px; border: 1px solid #C6A15B;">
          <h1 style="color: #C6A15B; text-align: center; font-size: 26px;">STAY CONNECT HOTELS</h1>
          <p style="text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8E8B85;">14B Providence Street, Lekki Phase 1, Lagos</p>
          <hr style="border: 0; border-top: 1px solid #2C2B29; margin: 20px 0;" />
          <h2 style="font-size: 20px; font-weight: normal; color: #FFFFFF; text-align: center;">Reservation Voucher Confirmed</h2>
          <p style="font-size: 14px;">Dear Winner Banjo,</p>
          <p style="font-size: 13px; color: #D1CDC7;">We are delighted to confirm your luxury stay reservation at Stay Connect Hotels Lekki Phase 1.</p>
          
          <div style="background-color: #1A1918; border: 1px solid #C6A15B; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <div style="font-size: 10px; text-transform: uppercase; color: #8E8B85;">Voucher Reference Code</div>
            <div style="font-size: 24px; color: #C6A15B; font-weight: bold; letter-spacing: 3px;">SC-2026-9901</div>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #FAF9F6; margin: 15px 0;">
            <tr style="border-bottom: 1px solid #2C2B29;">
              <td style="padding: 8px 0; color: #8E8B85;">Reserved Suite</td>
              <td style="padding: 8px 0; text-align: right; color: #C6A15B; font-weight: bold;">Saffron Executive Suite</td>
            </tr>
            <tr style="border-bottom: 1px solid #2C2B29;">
              <td style="padding: 8px 0; color: #8E8B85;">Check-In Date</td>
              <td style="padding: 8px 0; text-align: right;">Aug 10, 2026 (From 3:00 PM)</td>
            </tr>
            <tr style="border-bottom: 1px solid #2C2B29;">
              <td style="padding: 8px 0; color: #8E8B85;">Check-Out Date</td>
              <td style="padding: 8px 0; text-align: right;">Aug 13, 2026 (By 12:00 PM)</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-size: 14px; font-weight: bold;">Total Reserved Amount</td>
              <td style="padding: 12px 0; font-size: 16px; font-weight: bold; color: #C6A15B; text-align: right;">₦624,375</td>
            </tr>
          </table>

          <hr style="border: 0; border-top: 1px solid #2C2B29; margin: 20px 0;" />
          <p style="font-size: 12px; text-align: center; color: #8E8B85;">WhatsApp Concierge: +234 704 100 8351</p>
        </div>
      `,
    });
    console.log("SUCCESS via Mailtrap SMTP! Message ID:", info.messageId);
    return;
  } catch (err2) {
    console.log("Mailtrap SMTP notice:", err2.message);
  }

  // Trial 2: Official Mailtrap API Client
  try {
    const client = new MailtrapClient({ token: TOKEN });
    const response = await client.send({
      from: { email: "technile0@gmail.com", name: "Stay Connect Hotels" },
      to: [{ email: targetEmail }],
      subject: "Luxury Reservation Voucher SC-2026-9901 | Stay Connect Hotels",
      text: "Reservation confirmed for Saffron Executive Suite.",
    });
    console.log("SUCCESS via Mailtrap API! Response:", response);
  } catch (err) {
    console.log("Mailtrap API notice:", err.message);
  }
}

sendMailtrapEmail();
