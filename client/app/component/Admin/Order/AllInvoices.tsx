"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Box } from "@mui/material"
import { useTheme } from "next-themes"
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi"
import Loader from "../../Loader/Loader"
import { useGetAllUsersQuery } from "@/redux/features/user/userApi"
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi"
import { AiOutlineMail } from "react-icons/ai"
import { format } from "timeago.js"

type Props = {
  isDashboard?: boolean
}

const AllInvoices: React.FC<Props> = ({ isDashboard }) => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isLoading, data } = useGetAllOrdersQuery({})
  const { data: userData } = useGetAllUsersQuery()
  const { data: courseData } = useGetAllCoursesQuery()

  const [orderData, setOrderData] = useState<any>([])

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Use a consistent theme value with fallback
  const currentTheme = mounted ? resolvedTheme || theme || "light" : "light"
  const isDark = currentTheme === "dark"

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = userData?.users.find((user: any) => user._id === item.userId)
        const course = courseData?.courses.find((course: any) => course._id === item.courseId)
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        }
      })
      setOrderData(temp)
    }
  }, [data, userData, courseData])

  const columns: any = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.4,
      minWidth: 120,
    },
    {
      field: "userName",
      headerName: "Name",
      flex: isDashboard ? 0.8 : 0.6,
      minWidth: isDashboard ? 140 : 150,
    },

    // Additional columns for non-dashboard view
    ...(isDashboard
      ? []
      : [
          {
            field: "userEmail",
            headerName: "Email",
            flex: 1,
            minWidth: 200,
          },
          {
            field: "title",
            headerName: "Course Title",
            flex: 1,
            minWidth: 200,
          },
        ]),

    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      minWidth: 100,
    },

    // Conditional "Created At" or custom email button
    ...(isDashboard
      ? [
          {
            field: "created_at",
            headerName: "Created At",
            flex: 0.7,
            minWidth: 120,
          },
        ]
      : [
          {
            field: "created_at",
            headerName: "Created At",
            flex: 0.6,
            minWidth: 140,
          },
          {
            field: "send_email",
            headerName: "Email",
            flex: 0.3,
            minWidth: 100,
            sortable: false,
            renderCell: (params: any) => (
              <a
                href={`mailto:${params.row.userEmail}`}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  isDark ? "hover:bg-blue-900/20" : "hover:bg-blue-100"
                }`}
              >
                <AiOutlineMail
                  className={`${
                    isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-600"
                  } transition-colors`}
                  size={18}
                />
              </a>
            ),
          },
        ]),
  ]

  const rows: any[] = []

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      })
    })

  if (isLoading) return <Loader />

  return (
    <>
      {isDashboard ? (
        <div className="bg-gradient-to-br from-white via-slate-50 to-gray-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-600/50 h-full flex flex-col">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">📊</span>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent">
                  Recent Transactions
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Latest order transactions</p>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <Box
              sx={{
                height: "100%",
                width: "100%",
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "15px",
                  borderRadius: "12px",
                  overflow: "hidden",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: isDark ? "#1e40af" : "#2563eb",
                  borderBottom: "none",
                  color: "#ffffff !important",
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  minHeight: "56px !important",
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#ffffff !important",
                    fontWeight: "600",
                    lineHeight: "1.2",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    color: "#ffffff !important",
                  },
                  "& .MuiDataGrid-menuIcon": {
                    color: "#ffffff !important",
                  },
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: isDark ? "#1e40af" : "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: isDark ? "#1d4ed8" : "#1d4ed8",
                  },
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                  padding: "16px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  lineHeight: "1.4",
                  color: isDark ? "#f3f4f6" : "#374151",
                  "&:focus": {
                    outline: "none",
                  },
                },
                "& .MuiDataGrid-row": {
                  color: isDark ? "#f3f4f6" : "#374151",
                  borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  fontSize: "14px",
                  fontWeight: "500",
                  minHeight: "60px !important",
                  maxHeight: "60px !important",
                  backgroundColor: isDark ? "#1e293b !important" : "#ffffff !important",
                  "&:hover": {
                    backgroundColor: isDark ? "#334155 !important" : "#f1f5f9 !important",
                    transform: "translateY(-1px)",
                    boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.1)",
                    "& .MuiDataGrid-cell": {
                      color: isDark ? "#ffffff !important" : "#1e293b !important",
                    },
                  },
                  "&:nth-of-type(even)": {
                    backgroundColor: isDark ? "#1e293b !important" : "#f8fafc !important",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: isDark ? "#111827" : "#ffffff",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                  color: isDark ? "#ffffff !important" : "#1f2937 !important",
                  fontWeight: "500",
                  fontSize: "14px",
                  minHeight: "52px !important",
                  padding: "0 16px",
                },
                "& .MuiTablePagination-root": {
                  color: isDark ? "#ffffff !important" : "#1f2937 !important",
                },
                "& .MuiIconButton-root": {
                  color: isDark ? "#ffffff !important" : "#1f2937 !important",
                },
              }}
            >
              <DataGrid
                rows={rows.slice(0, 8)}
                columns={columns}
                hideFooterPagination={true}
                hideFooter={true}
                disableRowSelectionOnClick
                rowHeight={60}
                columnHeaderHeight={56}
              />
            </Box>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {/* Header Section with improved spacing */}
          <div className="space-y-2">
            <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>All Invoices</h1>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Complete list of all course orders and transactions
            </p>
          </div>

          {/* Main Content with improved spacing */}
          <Box
            className={`${isDark ? "bg-gray-900" : "bg-white"} rounded-xl shadow-lg overflow-hidden border ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >
            {/* DataGrid with improved styling */}
            <Box
              height="calc(100vh - 280px)"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: isDark ? "#1e40af" : "#2563eb",
                  borderBottom: "none",
                  color: "#ffffff !important",
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  minHeight: "56px !important",
                  "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#ffffff !important",
                    fontWeight: "600",
                    lineHeight: "1.2",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    color: "#ffffff !important",
                  },
                  "& .MuiDataGrid-menuIcon": {
                    color: "#ffffff !important",
                  },
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: isDark ? "#1e40af" : "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: isDark ? "#1d4ed8" : "#1d4ed8",
                  },
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                  color: isDark ? "#ffffff !important" : "#1f2937 !important",
                  fontWeight: "500",
                  fontSize: "14px",
                  minHeight: "52px !important",
                  padding: "0 16px",
                  "& .MuiTablePagination-root": {
                    color: isDark ? "#ffffff !important" : "#1f2937 !important",
                  },
                  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                    color: isDark ? "#ffffff !important" : "#1f2937 !important",
                  },
                  "& .MuiSelect-select": {
                    color: isDark ? "#ffffff !important" : "#1f2937 !important",
                  },
                  "& .MuiIconButton-root": {
                    color: isDark ? "#ffffff !important" : "#1f2937 !important",
                    "&:hover": {
                      backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                    },
                  },
                },
                "& .MuiDataGrid-row": {
                  color: isDark ? "#f3f4f6" : "#374151",
                  borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  fontSize: "14px",
                  fontWeight: "500",
                  minHeight: "60px !important",
                  maxHeight: "60px !important",
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(59, 130, 246, 0.08) !important"
                      : "rgba(59, 130, 246, 0.04) !important",
                  },
                  "&.Mui-selected": {
                    backgroundColor: isDark
                      ? "rgba(59, 130, 246, 0.12) !important"
                      : "rgba(59, 130, 246, 0.08) !important",
                    "&:hover": {
                      backgroundColor: isDark
                        ? "rgba(59, 130, 246, 0.16) !important"
                        : "rgba(59, 130, 246, 0.12) !important",
                    },
                  },
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                  padding: "16px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  lineHeight: "1.4",
                  "&:focus": {
                    outline: "2px solid #3b82f6",
                    outlineOffset: "-2px",
                  },
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: isDark ? "#111827" : "#ffffff",
                },
                "& .MuiCheckbox-root": {
                  color: isDark ? "#60a5fa !important" : "#3b82f6 !important",
                  padding: "8px",
                  "&.Mui-checked": {
                    color: isDark ? "#3b82f6 !important" : "#2563eb !important",
                  },
                  "&:hover": {
                    backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.1)",
                  },
                },
                "& .MuiDataGrid-toolbarContainer": {
                  padding: "20px",
                  backgroundColor: isDark ? "#1e40af" : "#2563eb",
                  borderBottom: "none",
                  minHeight: "64px",
                  "& .MuiButton-root": {
                    color: "#ffffff !important",
                    fontSize: "14px !important",
                    fontWeight: "500",
                  },
                  "& .MuiInputBase-root": {
                    color: "#ffffff !important",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    "& .MuiInputBase-input": {
                      color: "#ffffff !important",
                      "&::placeholder": {
                        color: "rgba(255, 255, 255, 0.7) !important",
                      },
                    },
                  },
                },
                "& .MuiDataGrid-columnSeparator": {
                  color: "rgba(255, 255, 255, 0.2)",
                },
                "& .MuiDataGrid-iconSeparator": {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <DataGrid
                checkboxSelection
                rows={rows}
                columns={columns}
                slots={{
                  toolbar: GridToolbar,
                }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                disableRowSelectionOnClick
                rowHeight={60}
                columnHeaderHeight={56}
                sx={{
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-row:focus": {
                    outline: "none",
                  },
                }}
              />
            </Box>
          </Box>
        </div>
      )}
    </>
  )
}

export default AllInvoices
