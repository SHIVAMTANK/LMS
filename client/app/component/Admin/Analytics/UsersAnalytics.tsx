"use client"
import type React from "react"

import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import Loader from "../../Loader/Loader"
import { styles } from "@/app/styles/style"

type Props = {
  isDashboard?: boolean
}

const UsersAnalytics: React.FC<Props> = ({ isDashboard = false }) => {
  // const analyticsData = [
  //   { name: "Jan", count: 440 },
  //   { name: "Feb", count: 8200 },
  //   { name: "Mar", count: 4033 },
  //   { name: "Apr", count: 4502 },
  //   { name: "May", count: 2042 },
  //   { name: "Jun", count: 3454 },
  //   { name: "Jul", count: 356 },
  //   { name: "Aug", count: 5667 },
  //   { name: "Sep", count: 1320 },
  //   { name: "Oct", count: 6526 },
  //   { name: "Nov", count: 5480 },
  //   { name: "Dec", count: 485 },
  // ]

  const { data, isLoading } = useGetUsersAnalyticsQuery({})

  const analyticsData:any = [];

  data &&
    data.users.last12Months.forEach((item:any)=>{
      analyticsData.push({name:item.month,count:item.count});
    })

  if (isLoading) return <Loader />

  return (
    <>
      {isDashboard ? (
        <div className="mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm">
          <div className="ml-5 mb-2">
            <h1 className={`${styles.title} !text-[20px] px-5 text-start`}>Users Analytics</h1>
            <p className={`${styles.label} px-5 text-sm text-gray-400`}>Last 12 months</p>
          </div>

          <div className="w-full h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="95%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4d62d9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4d62d9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} hide={true} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111C43", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="count" stroke="#4d62d9" fill="url(#colorCount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="w-[90%] max-w-7xl mx-auto mt-8 mb-8">
          {/* Header Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-6">
            <div className="border-b pb-4 border-gray-200 dark:border-gray-700">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">👥 Users Analytics</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Last 12 months analytics data</p>
            </div>
          </div>

          {/* Analytics Chart Card */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">User Registration Trends</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly user registration statistics</p>
            </div>

            {/* Chart Container */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-8 min-h-[700px]">
              <ResponsiveContainer width="100%" height={600}>
                <AreaChart data={analyticsData} margin={{ top: 30, right: 40, left: 30, bottom: 30 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4d62d9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4d62d9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area type="monotone" dataKey="count" stroke="#4d62d9" fill="url(#colorCount)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UsersAnalytics
