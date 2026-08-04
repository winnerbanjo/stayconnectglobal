import { MailtrapClient } from 'mailtrap';
import nodemailer from 'nodemailer';

const TOKEN = process.env.MAILTRAP_TOKEN || '93155a5bc54cbe235921b6d6844e05f4';

export const mailtrapClient = new MailtrapClient({ token: TOKEN });

export async function sendBookingConfirmationEmail(bookingDetails: {
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
}) {
  try {
    const sender = {
      email: 'reservations@stayconnecthotels.com',
      name: 'Stay Connect Hotels Lekki',
    };

    const recipients = [
      {
        email: bookingDetails.guestEmail,
      },
    ];

    // Using Nodemailer Mailtrap SMTP fallback for testing email delivery
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '93155a5bc54cbe',
        pass: TOKEN,
      },
    });

    await transporter.sendMail({
      from: '"Stay Connect Hotels Lekki" <reservations@stayconnecthotels.com>',
      to: bookingDetails.guestEmail,
      subject: `Reservation Confirmed - ${bookingDetails.bookingRef} | Stay Connect Hotels`,
      html: `
        <div style="font-family: Georgia, serif; background-color: #111111; color: #FAF9F6; padding: 40px; border-radius: 12px;">
          <h1 style="color: #C6A15B; font-size: 28px; margin-bottom: 8px;">STAY CONNECT HOTELS</h1>
          <p style="text-transform: uppercase; font-size: 11px; letter-spacing: 3px; color: #8E8B85;">14B Providence Street, Lekki Phase 1, Lagos</p>
          <hr style="border: 1px solid #2C2B29; margin: 24px 0;" />

          <h2 style="font-size: 22px; font-weight: normal;">Reservation Confirmation Voucher</h2>
          <p>Dear <strong>${bookingDetails.guestName}</strong>,</p>
          <p style="color: #D1CDC7; font-size: 14px;">We are delighted to confirm your luxury stay reservation under reference code:</p>

          <div style="background-color: #1A1918; border: 1px solid #C6A15B; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 26px; color: #C6A15B; font-weight: bold; letter-spacing: 4px;">${bookingDetails.bookingRef}</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #FAF9F6; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #2C2B29;">
              <td style="padding: 10px 0; color: #8E8B85;">Reserved Suite</td>
              <td style="padding: 10px 0; text-align: right; color: #C6A15B;">${bookingDetails.roomName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #2C2B29;">
              <td style="padding: 10px 0; color: #8E8B85;">Check-In Date</td>
              <td style="padding: 10px 0; text-align: right;">${bookingDetails.checkIn} (From 3:00 PM)</td>
            </tr>
            <tr style="border-bottom: 1px solid #2C2B29;">
              <td style="padding: 10px 0; color: #8E8B85;">Check-Out Date</td>
              <td style="padding: 10px 0; text-align: right;">${bookingDetails.checkOut} (By 12:00 PM)</td>
            </tr>
            <tr style="border-bottom: 1px solid #2C2B29;">
              <td style="padding: 10px 0; color: #8E8B85;">Duration</td>
              <td style="padding: 10px 0; text-align: right;">${bookingDetails.nights} Night(s)</td>
            </tr>
            <tr>
              <td style="padding: 14px 0; font-size: 16px; font-weight: bold;">Total Amount</td>
              <td style="padding: 14px 0; font-size: 18px; font-weight: bold; color: #C6A15B; text-align: right;">₦${bookingDetails.totalPrice.toLocaleString()}</td>
            </tr>
          </table>

          <hr style="border: 1px solid #2C2B29; margin: 24px 0;" />
          <p style="font-size: 12px; color: #8E8B85;">Should you require private airport chauffeur arrangements, please contact concierge@stayconnecthotels.com.</p>
        </div>
      `,
    });

    console.log(`Confirmation email sent via Mailtrap to ${bookingDetails.guestEmail}`);
  } catch (error) {
    console.warn('Mailtrap Email Dispatch Notice:', error);
  }
}
