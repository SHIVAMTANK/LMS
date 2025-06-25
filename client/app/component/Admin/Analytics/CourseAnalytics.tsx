"use client"
import type React from "react"
import { BarChart, Bar, ResponsiveContainer, XAxis, Label, YAxis, LabelList } from "recharts"
import Loader from "../../Loader/Loader"
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi"

type Props = {}

const CourseAnalytics: React.FC<Props> = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({})

  const analyticsData: any = []
  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count })
    })

  const minValue = 0

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] max-w-7xl mx-auto mt-8 mb-8">
          {/* Header Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-6">
            <div className="border-b pb-4 border-gray-200 dark:border-gray-700">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">📊 Courses Analytics</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Last 12 months analytics data</p>
            </div>
          </div>

          {/* Analytics Chart Card */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Course Enrollment Trends</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly course enrollment statistics</p>
            </div>

            {/* Chart Container */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-8 min-h-[700px]">
              <ResponsiveContainer width="100%" height={600}>
                <BarChart data={analyticsData} margin={{ top: 30, right: 40, left: 30, bottom: 30 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#1F2937", fontSize: 14, fontWeight: "500" }}
                    axisLine={{ stroke: "#D1D5DB" }}
                    tickLine={{ stroke: "#D1D5DB" }}
                  >
                    <Label offset={0} position="insideBottom" />
                  </XAxis>
                  <YAxis
                    domain={[minValue, "auto"]}
                    tick={{ fill: "#1F2937", fontSize: 14, fontWeight: "500" }}
                    axisLine={{ stroke: "#D1D5DB" }}
                    tickLine={{ stroke: "#D1D5DB" }}
                  />
                  <Bar dataKey="uv" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} className="drop-shadow-sm">
                    <LabelList
                      dataKey="uv"
                      position="top"
                      style={{ fill: "#111827", fontSize: "14px", fontWeight: "bold" }}
                    />
                  </Bar>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseAnalytics
