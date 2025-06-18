"use client";

import type React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";

const AllCourse: React.FC = () => {
  const { theme } = useTheme();

  const { data, isLoading, error } = useGetAllCoursesQuery();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.5,
      minWidth: 120,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
      minWidth: 120,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.3,
      minWidth: 100,
      sortable: false,
      renderCell: () => (
        <Button
          sx={{
            minWidth: "auto",
            padding: "6px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor:
                theme === "dark"
                  ? "rgba(239, 68, 68, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
            },
          }}
        >
          <FiEdit2
            className={`${
              theme === "dark"
                ? "text-red-400 hover:text-red-300"
                : "text-red-500 hover:text-red-600"
            } transition-colors`}
            size={18}
          />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.3,
      minWidth: 100,
      sortable: false,
      renderCell: () => (
        <Button
          sx={{
            minWidth: "auto",
            padding: "6px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor:
                theme === "dark"
                  ? "rgba(239, 68, 68, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
            },
          }}
        >
          <AiOutlineDelete
            className={`${
              theme === "dark"
                ? "text-red-400 hover:text-red-300"
                : "text-red-500 hover:text-red-600"
            } transition-colors`}
            size={18}
          />
        </Button>
      ),
    },
  ];
  const rows: any = [];

  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt),
        });
      });
  }
  return (
    <div className="p-4">
      <div className="mb-4">
        <h1
          className={`text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          All Courses
        </h1>
        <p
          className={`text-sm mt-1 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Manage and monitor your course catalog
        </p>
      </div>

      <Box className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <Box
          height="calc(100vh - 200px)"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#3b82f6" : "#2563eb",
              borderBottom: "1px solid transparent",
              color: "#ffffff !important",
              fontWeight: "600",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.025em",
              minHeight: "48px !important",
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
              backgroundColor: theme === "dark" ? "#2563eb" : "#3b82f6",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#1d4ed8" : "#2563eb",
              },
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid transparent",
              backgroundColor: theme === "dark" ? "#1f2937" : "#f8fafc",
              color:
                theme === "dark" ? "#ffffff !important" : "#1f2937 !important",
              fontWeight: "500",
              fontSize: "13px",
              minHeight: "44px !important",
              "& .MuiTablePagination-root": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#1f2937 !important",
              },
              "& .MuiTablePagination-selectLabel": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#1f2937 !important",
              },
              "& .MuiTablePagination-displayedRows": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#1f2937 !important",
              },
              "& .MuiSelect-select": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#1f2937 !important",
              },
              "& .MuiIconButton-root": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#1f2937 !important",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                },
              },
            },
            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "#f3f4f6" : "#374151",
              borderBottom:
                theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
              fontSize: "14px",
              fontWeight: "500",
              minHeight: "50px !important",
              maxHeight: "50px !important",
              "&:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.08) !important"
                    : "rgba(59, 130, 246, 0.04) !important",
              },
              "&.Mui-selected": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.12) !important"
                    : "rgba(59, 130, 246, 0.08) !important",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(59, 130, 246, 0.16) !important"
                      : "rgba(59, 130, 246, 0.12) !important",
                },
              },
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              padding: "12px 16px",
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
              backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
            },
            "& .MuiCheckbox-root": {
              color:
                theme === "dark" ? "#60a5fa !important" : "#3b82f6 !important",
              padding: "6px",
              "&.Mui-checked": {
                color:
                  theme === "dark"
                    ? "#3b82f6 !important"
                    : "#2563eb !important",
              },
              "&:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(59, 130, 246, 0.1)",
              },
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color:
                theme === "dark" ? "#f9fafb !important" : "#1f2937 !important",
              fontWeight: "500",
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
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            rowHeight={50}
            columnHeaderHeight={48}
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
  );
};

export default AllCourse;
