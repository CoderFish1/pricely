import { scrapeProduct } from "@/lib/firecrawl";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendPriceDropAlert } from "@/lib/email";

export async function GET() {
  return NextResponse.json({
    message: "Price check endpoint is working",
  });
}
export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (
      process.env.VERCEL &&
      authHeader !== `Bearer ${cronSecret}` &&
      request.headers.get("x-vercel-cron") !== "1"
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // use service role to bypass RLS(in simple words get god level access)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );

    const { data: products, error: productError } = await supabase
      .from("products")
      .select("*");

    if (productError) throw productError;

    console.log(`Found ${products.length} products`);

    const results = {
      total: products.length,
      updated: 0,
      failed: 0,
      priceChanges: 0,
      alertsSent: 0,
    };

    for (const product of products) {
      try {
        const productData = await scrapeProduct(product.url);

        if (!productData || !productData.currentPrice) {
          results.failed++;
          continue;
        }

        const newPrice = parseFloat(
          productData.currentPrice.replace(/[^0-9.]/g, ""),
        );
        const oldPrice = parseFloat(product.current_price) || 0;

        if (isNaN(newPrice)) {
          results.failed++;
          continue;
        }

        await supabase
          .from("products")
          .update({
            current_price: newPrice,
            currency: productData.currencyCode || product.currency,
            name: productData.productName || product.name,
            image_url: productData.productImageUrl || product.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id);

        if (oldPrice !== newPrice) {
          await supabase.from("price_history").insert({
            product_id: product.id,
            price: newPrice,
            currency: productData.currencyCode || product.currency,
          });

          results.priceChanges++;

          if (newPrice < oldPrice) {
            // Alert to user

            const {
              data: { user },
            } = await supabase.auth.admin.getUserById(product.user_id);

            if (user?.email) {
              // send email
              const emailResults = await sendPriceDropAlert(
                user.email,
                product,
                oldPrice,
                newPrice,
              );

              if (emailResults.success) {
                results.alertsSent++;
              }
            }
          }
        }
        results.updated++;
      } catch (error) {
        console.log(`Error processing product ${product.id}:`, error);
        results.failed++;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Price check completed",
      results,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// cmd to manually check if cronjobs or not by checking prices everyday
// curl.exe -X POST https://pricelydealchecker.vercel.app/api/cron/checkprices -H "Authorization: Bearer "
