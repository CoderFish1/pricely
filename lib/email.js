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

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: userEmail,
      subject: `🔥 ${product.name} just got a price drop`,
      html: `<div style="font-family: Arial, sans-serif; background:#ecfdf5; padding:20px;">
        <div style="max-width:520px;margin:auto;background:#fff;border-radius:16px;border:1px solid #d1fae5;overflow:hidden;">
          
          <div style="background:#10b981;padding:16px;text-align:center;color:white;font-weight:bold;">
            🔥 Price Drop Alert
          </div>

          <div style="padding:24px;text-align:center;">
            
            <img src="${product.image_url}" 
                 style="width:140px;height:140px;object-fit:cover;border-radius:12px;margin-bottom:16px;" />

            <h2 style="color:#064e3b;margin:0;">
              ${product.name}
            </h2>

            <p style="color:#6b7280;font-size:14px;">
              Tracked on Pricely
            </p>

            <div style="background:#f0fdf4;padding:16px;border-radius:12px;margin:20px 0;">
              
              <div style="text-decoration:line-through;color:#9ca3af;">
                ₹${oldPrice}
              </div>

              <div style="font-size:26px;font-weight:bold;color:#10b981;">
                ₹${newPrice}
              </div>

              <div style="margin-top:8px;">
                <span style="background:#d1fae5;padding:4px 10px;border-radius:999px;font-size:12px;">
                  SAVE ₹${savings} (${percentageDrop}%)
                </span>
              </div>

            </div>

            <a href="${product.url}" 
               style="display:inline-block;padding:12px 24px;background:#10b981;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
              View Deal →
            </a>

          </div>

          <div style="text-align:center;padding:12px;font-size:12px;color:#6b7280;">
            Pricely · You're tracking this product
          </div>

        </div>
      </div>`,
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
