"use client";

import type React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";

const AllCourse: React.FC = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string>("");
  const { data, isLoading, refetch } = useGetAllCoursesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course deleted successfully");
    }
    if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data.message || "Error deleting course");
    }
  }, [isSuccess, error,refetch]);

  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCourse(courseToDelete);
      setOpen(false);
      setCourseToDelete("");
    } catch (error: any) {
      console.log(error.data.message);
    }
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setCourseToDelete("");
  };

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
      renderCell: (params: any) => (
        <Link
          href={`/admin/edit-course/${params.row.id}`}
          underline="none"
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
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.3,
      minWidth: 100,
      sortable: false,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setCourseToDelete(params.row.id);
            setOpen(true);
          }}
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
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#000000",
            borderRadius: "12px",
          },
        }}
      >
        <DialogContent
          sx={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            padding: "32px 24px 24px 24px",
            textAlign: "center",
          }}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Are you sure you want to delete this course?
          </h2>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            padding: "0 24px 32px 24px",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <Button
            onClick={handleDeleteCancel}
            sx={{
              backgroundColor: "#10b981",
              color: "#ffffff",
              padding: "8px 24px",
              borderRadius: "8px",
              fontWeight: "500",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#059669",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              padding: "8px 24px",
              borderRadius: "8px",
              fontWeight: "500",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#dc2626",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllCourse;
