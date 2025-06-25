import type React from "react"
import UsersAnalytics from "../Analytics/UsersAnalytics"
import OrderAnalytics from "../Analytics/OrderAnalytics"
import AllInvoices from "../Order/AllInvoices"

type Props = {
  open?: boolean
}

const DashboardWidgets: React.FC<Props> = ({ open }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="max-w-[1900px] mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Monitor your platform performance and growth metrics
          </p>
        </div>

        {/* Top Row - Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-8 mb-8">
          {/* Users Analytics - Takes 4 columns */}
          <div className="xl:col-span-4">
            <div className="h-[520px]">
              <UsersAnalytics isDashboard={true} />
            </div>
          </div>

          {/* Stats Cards - Takes 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            {/* Sales Obtained Card */}
            <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-8 rounded-2xl shadow-xl border border-blue-200/50 dark:border-slate-600/50 h-[250px]">
              <div className="flex items-center justify-between h-full">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl">💰</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Sales Obtained</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Total Revenue</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      120
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        ↗ +120%
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">vs last month</span>
                    </div>
                  </div>
                </div>
                <div className="relative w-28 h-28 ml-4">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200 dark:text-slate-700"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-blue-500"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="75, 100"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">75%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* New Users Card */}
            <div className="bg-gradient-to-br from-white via-emerald-50 to-green-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-8 rounded-2xl shadow-xl border border-emerald-200/50 dark:border-slate-600/50 h-[250px]">
              <div className="flex items-center justify-between h-full">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">New Users</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">User Growth</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                      450
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        ↗ +150%
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">vs last month</span>
                    </div>
                  </div>
                </div>
                <div className="relative w-28 h-28 ml-4">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200 dark:text-slate-700"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="85, 100"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-8">
          {/* Order Analytics - Takes 4 columns */}
          <div className="xl:col-span-4">
            <div className="h-[520px]">
              <OrderAnalytics isDashboard={true} />
            </div>
          </div>

          {/* Recent Transactions - Takes 2 columns */}
          <div className="xl:col-span-2 h-[520px]">
            <AllInvoices isDashboard={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardWidgets
