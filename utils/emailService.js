import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// Generic send function
const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"BloodCare Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (e) {
    console.log("Email error:", e.message);
    // Don't throw — email failure shouldn't break the main flow
  }
};

// ── Email Templates ──────────────────────────────────────────

export const sendVerificationEmail = async ({ email, name, verificationToken }) => {

  const verifyUrl = `${process.env.SERVER_URL || "http://localhost:8080"}/api/v1/auth/verify-email/${verificationToken}`;

  await sendEmail({
    to: email,
    subject: "✅ Verify your BloodCare Account",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
        
        <div style="background:linear-gradient(135deg,#dc2626,#ef4444);padding:32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:28px;">🩸 BloodCare</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Email Verification</p>
        </div>

        <div style="padding:32px;">
          <h2 style="color:#1f2937;margin-top:0;">Hello, ${name}</h2>

          <p style="color:#6b7280;line-height:1.6;">
            Thank you for registering with BloodCare.
            Please verify your email address to activate your account.
          </p>

          <div style="text-align:center;margin:32px 0;">
            <a href="${verifyUrl}" 
            style="background:#dc2626;color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:bold;">
              Verify Email
            </a>
          </div>

          <p style="color:#9ca3af;font-size:13px;">
            If you did not create this account, you can ignore this email.
          </p>

        </div>

        <div style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">
            BloodCare Portal — Saving Lives Together
          </p>
        </div>

      </div>
    `,
  });
};

export const sendDonationConfirmationEmail = async ({ donorEmail, donorName, bloodGroup, quantity, orgName }) => {
  await sendEmail({
    to: donorEmail,
    subject: "🩸 Thank you for your blood donation — BloodCare",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
        <div style="background:linear-gradient(135deg,#dc2626,#ef4444);padding:32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:28px;">🩸 BloodCare</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Donation Confirmation</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1f2937;margin-top:0;">Thank you, ${donorName}! 💙</h2>
          <p style="color:#6b7280;line-height:1.6;">Your blood donation has been successfully recorded. You are a hero!</p>
          <div style="background:#fef2f2;border-radius:10px;padding:20px;margin:24px 0;border-left:4px solid #ef4444;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Blood Group</td><td style="padding:6px 0;font-weight:bold;color:#dc2626;font-size:18px;">${bloodGroup}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Quantity</td><td style="padding:6px 0;font-weight:bold;color:#1f2937;">${quantity} units</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Organisation</td><td style="padding:6px 0;font-weight:bold;color:#1f2937;">${orgName}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Date</td><td style="padding:6px 0;font-weight:bold;color:#1f2937;">${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</td></tr>
            </table>
          </div>
          <p style="color:#6b7280;font-size:14px;">Every unit of blood can save up to 3 lives. Thank you for making a difference.</p>
        </div>
        <div style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">BloodCare Portal — Saving Lives Together</p>
        </div>
      </div>
    `,
  });
};

export const sendBloodIssuedEmail = async ({ hospitalEmail, hospitalName, bloodGroup, quantity, orgName }) => {
  await sendEmail({
    to: hospitalEmail,
    subject: "🏥 Blood Issued Successfully — BloodCare",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
        <div style="background:linear-gradient(135deg,#16a34a,#22c55e);padding:32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:28px;">🩸 BloodCare</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Blood Issued Confirmation</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1f2937;margin-top:0;">Blood Issued to ${hospitalName}</h2>
          <p style="color:#6b7280;line-height:1.6;">The following blood units have been issued to your hospital.</p>
          <div style="background:#f0fdf4;border-radius:10px;padding:20px;margin:24px 0;border-left:4px solid #22c55e;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Blood Group</td><td style="padding:6px 0;font-weight:bold;color:#dc2626;font-size:18px;">${bloodGroup}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Quantity</td><td style="padding:6px 0;font-weight:bold;color:#1f2937;">${quantity} units</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">From Organisation</td><td style="padding:6px 0;font-weight:bold;color:#1f2937;">${orgName}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Date</td><td style="padding:6px 0;font-weight:bold;color:#1f2937;">${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</td></tr>
            </table>
          </div>
        </div>
        <div style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">BloodCare Portal — Saving Lives Together</p>
        </div>
      </div>
    `,
  });
};

export const sendRequestStatusEmail = async ({ email, name, status, bloodGroup, quantity }) => {
  const isApproved = status === "approved";
  await sendEmail({
    to: email,
    subject: `${isApproved ? "✅" : "❌"} Blood Request ${isApproved ? "Approved" : "Rejected"} — BloodCare`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
        <div style="background:${isApproved ? "linear-gradient(135deg,#16a34a,#22c55e)" : "linear-gradient(135deg,#dc2626,#ef4444)"};padding:32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:28px;">🩸 BloodCare</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Request ${isApproved ? "Approved" : "Rejected"}</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1f2937;margin-top:0;">Hello, ${name}</h2>
          <p style="color:#6b7280;line-height:1.6;">Your blood request for <strong>${quantity} units of ${bloodGroup}</strong> has been <strong style="color:${isApproved ? "#16a34a" : "#dc2626"}">${status}</strong>.</p>
          ${isApproved ? `<p style="color:#6b7280;">The organisation will arrange the blood units shortly. Thank you for using BloodCare.</p>` : `<p style="color:#6b7280;">Please try requesting from another organisation or contact them directly.</p>`}
        </div>
        <div style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">BloodCare Portal — Saving Lives Together</p>
        </div>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async ({ email, name, resetToken }) => {
  const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password/${resetToken}`;
  await sendEmail({
    to: email,
    subject: "🔒 Password Reset Request — BloodCare",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
        <div style="background:linear-gradient(135deg,#dc2626,#ef4444);padding:32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:28px;">🩸 BloodCare</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Password Reset</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1f2937;margin-top:0;">Hello, ${name}</h2>
          <p style="color:#6b7280;line-height:1.6;">You requested a password reset. Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${resetUrl}" style="background:linear-gradient(135deg,#dc2626,#ef4444);color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:16px;">Reset Password</a>
          </div>
          <p style="color:#9ca3af;font-size:13px;">If you didn't request this, ignore this email. Your password won't change.</p>
        </div>
        <div style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #eee;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">BloodCare Portal — Saving Lives Together</p>
        </div>
      </div>
    `,
  });
};



