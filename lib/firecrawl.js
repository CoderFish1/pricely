import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrapeUrl(url, {
      formats: ["json"],
      jsonOptions: {
        schema: {
          type: "object",
          required: ["productName", "currentPrice"],
          properties: {
            productName: { type: "string" },
            currentPrice: { type: "string" },
            currencyCode: { type: "string" },
            productImageUrl: { type: "string" },
          },
        },
        prompt:
          "Extract the product name as 'productName', current price as 'currentPrice', currency code as 'currencyCode', and image URL as 'productImageUrl'",
      },
    });

    console.log("FireCrawl raw result:", JSON.stringify(result, null, 2)); // 👈 add this temporarily

    const extractedData = result.json;

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.log("FireCrawl Scrape error: ", error);
    return null;
  }
}