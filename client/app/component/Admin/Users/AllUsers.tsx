"use client";

import type React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";

import { styles } from "@/app/styles/style";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUser: React.FC<Props> = ({ isTeam }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const { data, isLoading, error,refetch } = useGetAllUsersQuery(undefined,{refetchOnMountOrArgChange:true});
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [updateUserRole,{isSuccess:updateSuccess,error:updateError}]  = useUpdateUserRoleMutation();
  const [deleteUser,{isSuccess:deleteSuccess,error:deleteError}] = useDeleteUserMutation();


    useEffect(() => {
      if (updateSuccess) {
        refetch();
        toast.success("Role updated successfully");
      }

      if(deleteSuccess){
        refetch();
        toast.success("User Delete successfully")
      }
      if (error) {
        if ("data" in error) {
          const errorMessage = error as any;
          toast.error(errorMessage.data.message);
        }
      }
      if(deleteError){
        if("data" in deleteError){
          const deleteErrorMsg = error as any;
          toast.error(deleteErrorMsg.data.message)
        }
      }
    }, [updateSuccess, updateError, error, refetch, deleteError,deleteSuccess]);
  

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use a consistent theme value with fallback
  const currentTheme = mounted ? resolvedTheme || theme || "light" : "light";
  const isDark = currentTheme === "dark";

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.8,
      minWidth: 200,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
      minWidth: 120,
    },
    {
      field: "courses",
      headerName: "Purchased Courses",
      flex: 0.6,
      minWidth: 150,
    },
    {
      field: "created_at",
      headerName: "Joined At",
      flex: 0.6,
      minWidth: 140,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.3,
      minWidth: 100,
      sortable: false,
      renderCell: (params:any) => (
        <Button
          onClick={()=>handleDelete(params.row.id)}
          sx={{
            minWidth: "auto",
            padding: "8px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.1)",
            },
          }}
        >
          <AiOutlineDelete
            className={`${
              isDark
                ? "text-red-400 hover:text-red-300"
                : "text-red-500 hover:text-red-600"
            } transition-colors`}
            size={18}
          />
        </Button>
      ),
    },
    {
      field: "send_email",
      headerName: "Email",
      flex: 0.3,
      minWidth: 100,
      sortable: false,
      renderCell: (params: any) => (
        <a
          href={`mailto:${params.row.email}`}
          className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
            isDark ? "hover:bg-blue-900/20" : "hover:bg-blue-100"
          }`}
        >
          <AiOutlineMail
            className={`${
              isDark
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-500 hover:text-blue-600"
            } transition-colors`}
            size={18}
          />
        </a>
      ),
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");

    data &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleDelete = async (id:string) => {
    try{
      await deleteUser(id).unwrap();
 

    }catch(error:any){
      toast.error(error?.data?.message || "Failed to delete user");
    }
  }


  const handleSubmit = async () => {
    if(!email || !role) return;

    const user = data?.users.find((user:any)=>user.email === email);

    if(!user){
      toast.error("User is not found");
      return ;
    }
    try{
      await updateUserRole({id:user._id,role}).unwrap();
    }catch(error:any){
      toast.error(error.message);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      {/* Header Section with improved spacing */}
      <div className="space-y-2">
        <h1
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {isTeam ? "Team Members" : "All Users"}
        </h1>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {isTeam
            ? "Manage your team members and their roles"
            : "Manage and monitor all users"}
        </p>
      </div>

      {/* Main Content with improved spacing */}
      <Box
        className={`${
          isDark ? "bg-gray-900" : "bg-white"
        } rounded-xl shadow-lg overflow-hidden border ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        {/* Add Member Button with better spacing */}
        {/* Add Member Button with better spacing - shown only for Team view */}
        {isTeam && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-end">
              <button
                className={`${
                  styles.button
                } !w-[200px] px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </button>
            </div>
          </div>
        )}

        {/* DataGrid with improved styling */}
        <Box
          height="calc(100vh - 280px)"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
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
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  color: isDark ? "#ffffff !important" : "#1f2937 !important",
                },
              "& .MuiSelect-select": {
                color: isDark ? "#ffffff !important" : "#1f2937 !important",
              },
              "& .MuiIconButton-root": {
                color: isDark ? "#ffffff !important" : "#1f2937 !important",
                "&:hover": {
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
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
                backgroundColor: isDark
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(59, 130, 246, 0.1)",
              },
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: isDark ? "#f9fafb !important" : "#1f2937 !important",
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

      {/* Add New Member Dialog - moved outside the main content Box */}
      <Dialog
        open={active}
        onClose={() => setActive(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            color: isDark ? "#ffffff" : "#000000",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            color: isDark ? "#ffffff" : "#000000",
            borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
            fontSize: "1.25rem",
            fontWeight: "600",
          }}
        >
          Add New Member
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            padding: "24px",
          }}
        >
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Enter email..."
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark ? "#374151" : "#ffffff",
                  color: isDark ? "#ffffff" : "#000000",
                  "& fieldset": {
                    borderColor: isDark ? "#4b5563" : "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: isDark ? "#6b7280" : "#9ca3af",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: isDark ? "#9ca3af" : "#6b7280",
                  "&.Mui-focused": {
                    color: "#3b82f6",
                  },
                },
              }}
            />
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: isDark ? "#9ca3af" : "#6b7280",
                  "&.Mui-focused": {
                    color: "#3b82f6",
                  },
                }}
              >
                Role
              </InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
                sx={{
                  backgroundColor: isDark ? "#374151" : "#ffffff",
                  color: isDark ? "#ffffff" : "#000000",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDark ? "#4b5563" : "#d1d5db",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDark ? "#6b7280" : "#9ca3af",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b82f6",
                  },
                  "& .MuiSelect-icon": {
                    color: isDark ? "#9ca3af" : "#6b7280",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: isDark ? "#374151" : "#ffffff",
                      color: isDark ? "#ffffff" : "#000000",
                    },
                  },
                }}
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            padding: "16px 24px",
            borderTop: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
          }}
        >
          <Button
            onClick={() => setActive(false)}
            sx={{
              color: isDark ? "#9ca3af" : "#6b7280",
              "&:hover": {
                backgroundColor: isDark ? "#374151" : "#f3f4f6",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
              minWidth: "120px",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllUser;
