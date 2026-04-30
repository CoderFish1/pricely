"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";
import PriceChart from "./PriceChart";
import { toast } from "sonner";
import { deleteProduct } from "@/app/actions";

const ProductCard = ({ product }) => {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Do you want to remove the product from tracking?")) return;
    setDeleting(true);

    const result = await deleteProduct(product.id);

    if (result.error) toast.error(result.error);
    else toast.success(result.message || "Product deleted");

    setDeleting(false);
  };

  return (
    <Card className="group rounded-2xl border border-emerald-100 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 overflow-hidden bg-white flex flex-col">

      {/* Image Area */}
      <CardHeader className="p-0 relative">
        <div className="h-44 bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-emerald-200 text-5xl select-none">📦</div>
          )}
        </div>

        {/* Tracking badge overlay */}
        <div className="absolute top-3 right-3">
          <Badge className="gap-1 bg-emerald-500 text-white text-xs shadow-sm border-none">
            <TrendingDown className="w-3 h-3" />
            Tracking
          </Badge>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-3 px-4 pt-4 pb-2 flex-1">
        {/* Name */}
        <p className="font-semibold text-sm line-clamp-2 text-gray-800 leading-snug">
          {product.name}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-gray-400 font-medium">{product.currency}</span>
          <span className="text-2xl font-bold text-emerald-600 tracking-tight">
            {product.current_price?.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-emerald-50" />

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="flex-1 gap-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 text-xs"
          >
            {showChart ? (
              <><ChevronUp className="w-3 h-3" /> Hide Chart</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> Price Chart</>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 text-xs"
          >
            <Link
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              View
            </Link>
          </Button>
        </div>

        {/* Delete */}
        <Button
          variant="ghost"
          onClick={handleDelete}
          disabled={deleting}
          className="w-full text-xs text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          {deleting ? "Removing..." : "Remove from tracking"}
        </Button>
      </CardContent>

      {/* Chart */}
      {showChart && (
        <CardFooter className="px-4 pb-4 pt-0">
          <div className="w-full rounded-xl overflow-hidden border border-emerald-100 bg-emerald-50 p-2">
            <PriceChart productId={product.id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;