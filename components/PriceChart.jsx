'use client'
import React, { useEffect, useState } from 'react'
import { getPriceHistory } from '@/app/actions'
import { Loader2 } from 'lucide-react'
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PriceChart = ({ productId }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const history = await getPriceHistory(productId);

            const chartData = history.map((item) => ({
                date: new Date(item.cheked_at).toLocaleDateString(),
                price: parseFloat(item.price),
            }));

            setData(chartData);
            setLoading(false);
        }
        loadData(); // ✅ called here
    }, [productId])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8 text-gray-500 w-full">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Loading chart...
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 w-full">
                No price history yet. Check back after the first daily update!
            </div>
        );
    }

    return (
        <div className="w-full">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Price History</h4>
            <ResponsiveContainer width="100%" aspect={1.618}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val) => [`₹${val}`, "Price"]} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PriceChart;