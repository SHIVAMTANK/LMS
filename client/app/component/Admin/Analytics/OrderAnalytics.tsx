"use client"
import type React from "react"
import { useGetOrderAnalyticsQuery } from "@/redux/features/analytics/analyticsApi"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import Loader from "../../Loader/Loader"

type Props = {
  isDashboard: boolean
}

const OrderAnalytics: React.FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetOrderAnalyticsQuery({})

  const analyticsData: any = []

  // Process API data if available
  data &&
    data.orders &&
    data.orders.last12Months &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, Count: item.count })
    })

  const chartData = analyticsData

  if (isLoading) return <Loader />

  return (
    <>
      {isDashboard ? (
        <div className="mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm">
          <div className="ml-5 mb-2">
            <h1 className="text-[20px] px-5 text-start font-bold text-gray-800 dark:text-white">Order Analytics</h1>
            <p className="px-5 text-sm text-gray-400">Last 12 months</p>
          </div>

          <div className="w-full h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="95%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis axisLine={false} tickLine={false} hide={true} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111C43", border: "none", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="Count"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#10B981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="w-[90%] max-w-7xl mx-auto mt-8 mb-8">
          {/* Header Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-6">
            <div className="border-b pb-4 border-gray-200 dark:border-gray-700">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">📈 Order Analytics</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Last 12 months analytics data</p>
            </div>
          </div>

          {/* Analytics Chart Card */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Order Trends</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly order statistics and trends</p>
            </div>

            {/* Chart Container */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-8 min-h-[700px]">
              <ResponsiveContainer width="100%" height={600}>
                <LineChart data={chartData} margin={{ top: 30, right: 40, left: 30, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" opacity={0.5} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#1F2937", fontSize: 14, fontWeight: "500" }}
                    axisLine={{ stroke: "#D1D5DB" }}
                    tickLine={{ stroke: "#D1D5DB" }}
                  />
                  <YAxis
                    tick={{ fill: "#1F2937", fontSize: 14, fontWeight: "500" }}
                    axisLine={{ stroke: "#D1D5DB" }}
                    tickLine={{ stroke: "#D1D5DB" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111C43",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Count"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 5 }}
                    activeDot={{
                      r: 8,
                      fill: "#10B981",
                      stroke: "#ffffff",
                      strokeWidth: 3,
                    }}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderAnalytics
