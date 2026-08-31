import nodemailer from "nodemailer";

export interface BookingEmailData {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  address: string;
  id: number;
}

/**
 * Sends a confirmation email to the customer when their booking is confirmed.
 * Uses SMTP settings from environment variables. Gracefully returns false if
 * email is not configured so the app never crashes.
 */
export async function sendConfirmationEmail(
  data: BookingEmailData
): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || "Diamond Clean Services";

  // If SMTP not configured, skip silently (log it) and don't break the flow.
  if (!host || !user || !pass) {
    console.log(
      "[email] SMTP not configured. Skipping confirmation email to",
      data.email
    );
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass },
    });

    const subject = `Booking confirmed for ${data.service}`;
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1e293b;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
        <div style="text-align:center;padding:20px;background:#2563eb;border-radius:10px 10px 0 0;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;">💎 Diamond Clean Services</h1>
        </div>
        <div style="padding:24px;background:#ffffff;border-radius:0 0 10px 10px;">
          <h2 style="color:#1e3a8a;margin-top:0;">Hi ${data.name},</h2>
          <p>Great news! Your booking has been <strong style="color:#16a34a;">confirmed</strong>. Here are your details:</p>

          <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px;">
            <tr style="background:#eff6ff;">
              <td style="padding:10px;border:1px solid #dbeafe;font-weight:bold;width:40%;">Booking Reference</td>
              <td style="padding:10px;border:1px solid #dbeafe;">#${data.id}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #dbeafe;font-weight:bold;">Service</td>
              <td style="padding:10px;border:1px solid #dbeafe;">${data.service}</td>
            </tr>
            <tr style="background:#eff6ff;">
              <td style="padding:10px;border:1px solid #dbeafe;font-weight:bold;">Date</td>
              <td style="padding:10px;border:1px solid #dbeafe;">${data.date}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #dbeafe;font-weight:bold;">Time</td>
              <td style="padding:10px;border:1px solid #dbeafe;">${data.time}</td>
            </tr>
            <tr style="background:#eff6ff;">
              <td style="padding:10px;border:1px solid #dbeafe;font-weight:bold;">Address</td>
              <td style="padding:10px;border:1px solid #dbeafe;">${data.address}</td>
            </tr>
          </table>

          <p style="margin-top:20px;">Our team will arrive at the scheduled time. If you have any questions, don't hesitate to contact us.</p>
          <p style="color:#64748b;font-size:13px;">This is an automated email from Diamond Clean Services.</p>
        </div>
      </div>
    `;

    const text = `Hi ${data.name},\n\nGreat news! Your booking has been confirmed.\n\n` +
      `Booking Reference: #${data.id}\nService: ${data.service}\n` +
      `Date: ${data.date}\nTime: ${data.time}\nAddress: ${data.address}\n\n` +
      `Our team will arrive at the scheduled time. If you have any questions, contact us.\n\n` +
      `- Diamond Clean Services`;

    const cc = process.env.SMTP_CC || process.env.SMTP_USER;
    const recipients = [data.email, cc].filter(
      (email): email is string => Boolean(email)
    );

    const info = await transporter.sendMail({
      from: `Diamond Clean Services <${user}>`,
      to: recipients[0],
      cc: recipients.length > 1 ? recipients.slice(1) : undefined,
      subject,
      text,
      html,
    });

    console.log("[email] Confirmation email sent to", recipients.join(", "));
    console.log("[email] Message ID:", info.messageId);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[email] Failed to send email:", message);
    return false;
  }
}
