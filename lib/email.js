import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPriceDropAlert(
  userEmail,
  product,
  oldPrice,
  newPrice,
) {
  try {
    const priceDrop = oldPrice - newPrice;

    const savings = Math.max(0, priceDrop);

    const percentageDrop =
      oldPrice > 0 ? ((priceDrop / oldPrice) * 100).toFixed(1) : "0.0";


    const cleanName = product.name.split(",")[0];
    const shortName =
      cleanName.length > 70 ? cleanName.slice(0, 70) + "..." : cleanName;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: userEmail,

      
      subject: `💸 Price Drop: ${shortName}`,

      html: `
<div style="font-family: Arial, sans-serif; background:#ecfdf5; padding:24px;">
  <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:18px;border:1px solid #d1fae5;overflow:hidden;">

    <!-- Header -->
    <div style="background:#10b981;padding:18px;text-align:center;color:white;">
      <div style="font-size:18px;font-weight:600;">
        💸 Price Drop Alert
      </div>
      <div style="font-size:12px;color:#d1fae5;margin-top:4px;">
        Pricely Tracker
      </div>
    </div>

    <!-- Content -->
    <div style="padding:26px 20px;text-align:center;">

      <!-- Image -->
      <img 
        src="${product.image_url}" 
        alt="${shortName}"
        style="width:140px;height:140px;object-fit:cover;border-radius:12px;margin-bottom:16px;border:1px solid #e5e7eb;"
      />

      <!-- Product Title -->
      <h2 style="
        color:#064e3b;
        margin:10px 0 6px;
        font-size:18px;
        font-weight:600;
        line-height:1.4;
        padding:0 10px;
      ">
        ${shortName}
      </h2>

      <!-- Subtitle -->
      <p style="color:#6b7280;font-size:13px;margin:6px 0 18px;">
        Price updated just now
      </p>

      <!-- Price Box -->
      <div style="background:#f0fdf4;padding:18px;border-radius:12px;margin:20px 0;border:1px solid #d1fae5;">
        
        <div style="text-decoration:line-through;color:#9ca3af;font-size:13px;">
          ₹${oldPrice}
        </div>

        <div style="font-size:28px;font-weight:700;color:#059669;margin-top:4px;">
          ₹${newPrice}
        </div>

        <div style="margin-top:8px;">
          <span style="background:#d1fae5;padding:5px 12px;border-radius:999px;font-size:12px;font-weight:600;color:#065f46;">
            You save ₹${savings} (${percentageDrop}%)
          </span>
        </div>

      </div>

      <!-- CTA -->
      <a href="${product.url}" 
         style="display:inline-block;padding:13px 26px;background:#059669;color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
        View Deal →
      </a>

    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:14px;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;">
      <strong style="color:#10b981;">Pricely</strong><br/>
      You're receiving this because you're tracking this product.
    </div>

  </div>
</div>
`,
    });

    if (error) {
      console.log("Resend error", error);
      return { error };
    }

    return { success: true, data };
  } catch (error) {
    console.log("Email error", error);
    return { error: error.message };
  }
}