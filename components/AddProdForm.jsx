"use client";
import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { addProduct } from "@/app/actions";
import { toast } from "sonner";

export const AddProdForm = ({ user }) => {
  const [url, setUrl] = useState("");
  const [loading, setloading] = useState(false);
  const [showAuthModal, setshowAuthModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setshowAuthModal(true);
      return;
    }

    setloading(true);

    const formData = new FormData();
    formData.append("url", url);

    const result = await addProduct(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Products tracked successfully");
      setUrl("");
    }

    setloading(false);
  };

  return (
  <>
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
      
      {/* input + button */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste product URL"
          required
          disabled={loading}
          className="h-12 text-base w-full border-2 focus:border-emerald-500"
        />

        <Button
          className="h-12 bg-emerald-800 hover:bg-emerald-700 w-full sm:w-auto px-6"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Adding...
            </span>
          ) : (
            "Track Price"
          )}
        </Button>
      </div>

      {/* helper text BELOW (correct placement) */}
      <p className="text-xs sm:text-sm text-gray-500 mt-2 text-left px-1 leading-relaxed">
        Works with most shopping sites like Amazon, Flipkart and more
      </p>

    </form>

    {/* authentication modal */}
    <AuthModal
      isOpen={showAuthModal}
      onClose={() => setshowAuthModal(false)}
    />
  </>
);
};
