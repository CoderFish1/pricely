import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Bell, Tag, LineChart, PackagePlus } from "lucide-react";
import { AddProdForm } from "@/components/AddProdForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const features = [
    {
      icon: Bell,
      title: "Price Drop Alerts",
      description:
        "Get instant notifications when the price of your tracked products drops so you never miss a deal.",
    },
    {
      icon: Tag,
      title: "Smart Price Tracking",
      description:
        "Automatically monitor product prices across websites and view historical trends in one place.",
    },
    {
      icon: LineChart,
      title: "Price Insights",
      description:
        "Analyze price patterns and decide the best time to buy with intelligent data-driven insights.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 sm:px-8 border-emerald-200 border bg-linear-to-br from-emerald-50 to-emerald-200 h-18 sm:h-20 sticky top-0 z-50">
        <Image
          src={"/pricely-logo.png"}
          alt="Pricely Logo"
          width={600}
          height={200}
          className="h-14 sm:h-16 md:h-20 w-auto"
        />

        <AuthButton user={user} />
      </header>

      {/* HERO */}
      <section>
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 py-8 sm:py-12">
          <div className="inline-flex items-center text-xs sm:text-sm mb-4 mt-4 bg-emerald-200 rounded-full border font-medium text-emerald-800 px-3 py-1">
            Made By Shrey with 💻
          </div>

          <h2 className="font-semibold mb-2 text-2xl sm:text-3xl md:text-4xl tracking-tight">
            Get Deals fast with Pricely
          </h2>

          <p className="text-base sm:text-lg md:text-xl mx-auto max-w-xl">
            Track prices, get instant drop alerts, and make smarter buying
            decisions with Pricely.
          </p>
        </div>

        {/* add product form */}
        <div className="px-4 sm:px-6">
          <AddProdForm user={user} />
        </div>

        {/* features */}
        {products.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 sm:px-6 max-w-5xl mx-auto mt-12">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-teal-400"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-200 flex items-center justify-center mx-auto rounded-lg">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                </div>

                <h3 className="text-center font-semibold mt-3 text-sm sm:text-base">
                  {title}
                </h3>
                <p className="text-center text-sm sm:text-base mt-2">
                  {description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* products */}
      {user && products.length > 0 && (
        <section className="max-w-6xl mx-auto mb-20 px-4 sm:px-6 mt-12">
          <div className="mb-6">
            <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-emerald-900">
              Your Tracked Products
            </h3>
            <p className="text-emerald-700 mt-1 text-sm sm:text-base">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"} tracked
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="transition-transform duration-300 hover:-translate-y-1"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {products.length === 0 && user && (
        <section className="max-w-xl mx-auto mt-12 mb-16 px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-sm border-2 border-dashed border-emerald-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center justify-center">
              <PackagePlus className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
              No Products Added Yet
            </h3>

            <p className="text-sm sm:text-base text-gray-600">
              Add your first product and start tracking prices instantly.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
