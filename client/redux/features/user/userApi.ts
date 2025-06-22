import { string } from "yup";
import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    editPassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query<any,void>({
      query: () => ({
        url: "get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRole:builder.mutation({
      query:({id,role}:{id:string,role:string})=>({
        url:"update-user-role",
        method:"PUT",
        body:{id,role},
        credentials:"include" as const,
      })
    }),
    deleteUser:builder.mutation({
      query:(id:string)=>({
        url:`delete-user/${id}`,
        method:"DELETE",
        credentials:"include" as const,
      })
    })

  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useEditPasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation
} = userApi;
