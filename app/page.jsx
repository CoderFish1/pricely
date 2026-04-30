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
      <header className="flex justify-between border-emerald-200 border bg-linear-to-br from-emerald-50 to-emerald-200 h-20 sticky top-0">
        <div className="logo">
          <Image
            src={"/pricely-logo.png"}
            alt="Pricely Logo"
            width={600}
            height={200}
            className="h-20 w-auto"
          />
        </div>

        {/* authButton */}
        <AuthButton user={user} />
      </header>

      <section>
        <div className="max-w-2xl mx-auto text-center p-10">
          <div className="madeby inline-flex items-center font-small mb-4 mt-5 bg-emerald-200 rounded-full border font-medium text-emerald-800 p-1">
            Made By Shrey with 💻
          </div>

          <h2 className="font-semibold mb-1 text-4xl tracking-tight ">
            Get Deals fast with Pricely
          </h2>

          <p className="text-2xl mx-auto text-center max-w-2xl">
            Track prices, get instant drop alerts, and make smarter buying
            decisions with Pricely.
          </p>
        </div>

        {/* add product form */}
        <div className="mx-auto">
          <AddProdForm user={user} />
        </div>

        {/* features */}
        {products.length === 0 && (
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-16">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-2xl border border-teal-400"
              >
                <div className="w-12 h-12 bg-emerald-200 flex items-center justify-center mx-auto ">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>

                <h3 className="text-center font-semibold">{title}</h3>
                <p className="text-center mx-auto p-2">{description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {user && products.length > 0 && (
        <section className="max-w-6xl mx-auto mb-24 px-6 mt-16">
          {/* Header */}
          <div className="mb-8">
            <h3 className="font-bold text-3xl text-emerald-900">
              Your Tracked Products
            </h3>
            <p className="text-emerald-700 mt-1 text-lg">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              tracked
            </p>
          </div>

          {/* Container */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 shadow-sm">
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <section className="max-w-2xl mx-auto mt-16 mb-20 px-6">
          <div className="relative bg-white rounded-2xl p-16 text-center shadow-sm border-2 border-dashed border-emerald-300">
            {/* icon */}
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center justify-center">
              <PackagePlus className="w-7 h-7 text-emerald-600" />
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Products Added Yet
            </h3>

            <p className="text-gray-600 text-lg">
              Add your first product and start tracking prices instantly.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
