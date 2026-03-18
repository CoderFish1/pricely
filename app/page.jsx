import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Bell, Tag, LineChart } from "lucide-react";
import { AddProdForm } from "@/components/AddProdForm";

export default function Home() {
  const user = null;

  const products = [];

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

        <div className="authButton m-6">
          <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
            <LogIn className="w-5 h-5" />
            SignIn
          </Button>
        </div>
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
    </main>
  );
}
