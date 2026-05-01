"use client";
import React, { useEffect, useState } from "react";
import { getPriceHistory } from "@/app/actions";
import { Loader2 } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PriceChart = ({ productId, currentPrice  }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    async function loadData() {
      try {
        const history = await getPriceHistory(productId);

        const safeHistory = history || [];

        let rawData = safeHistory.map((item) => ({
          rawDate: new Date(item.checked_at),
          price: parseFloat(item.price),
        }));

        if (
          rawData.length === 0 || 
          rawData[rawData.length - 1].price !== currentPrice
        ) {
          rawData.push({
            rawDate: new Date(), 
            price: currentPrice,
          });
        }

        rawData.sort((a, b) => a.rawDate - b.rawDate);

        const chartData = rawData.map((item) => ({
          date: item.rawDate.toLocaleDateString("en-GB"),
          price: item.price,
        }));

        setData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load price history:", error);
        setLoading(false); // Stop loading even if it fails
      }
    }
    loadData();
  }, [productId, currentPrice]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500 w-full">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading chart...
      </div>
    );
  }

  if (data.length < 2) {
    return (
      <div className="text-center py-8 text-gray-500 w-full">
        No price history yet. Check back after the first daily update!
      </div>
    );
  }

  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-gray-700 mb-2">Price History</p>
      
       <ResponsiveContainer width="100%" height={200}>  
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={{ stroke: "#d1d5db" }} // 👈 shows the axis line
            tickLine={{ stroke: "#d1d5db" }} // 👈 shows tick marks
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#888" }}
            axisLine={{ stroke: "#d1d5db" }} // 👈
            tickLine={{ stroke: "#d1d5db" }} // 👈
            tickFormatter={(v) => v.toLocaleString("en-IN")}
            domain={["auto", "auto"]}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
            }}
            formatter={(val) => [`₹${val.toLocaleString("en-IN")}`, "price"]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#059669"
            strokeWidth={2}
            dot={{ r: 4, fill: "#059669" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
