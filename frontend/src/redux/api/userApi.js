import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated,setUser,setLoading } from "../features/userSlice";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ["User", "AdminUsers", "AdminUser"],
    endpoints: (builder) => ({

        getMe: builder.query({
            query:()=>`/me`,
            transformResponse:(result)=>result.user,
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    const {data} =await queryFulfilled;
                    dispatch(setUser(data))
                    dispatch(setIsAuthenticated(true));
                    dispatch(setLoading(false));
                } catch (error) {
                    setLoading(false)
                    console.error(error);
                }
            },
            providesTags:['User'],
        }),
        updateProfile:builder.mutation({
            query(body){
                return {
                    url:'/me/update',
                    method:'PUT',
                    body,
                }
            },
            invalidatesTags:['User']
        }),
        
        uploadAvatar:builder.mutation({
            query(body){
                return {
                    url:'/me/upload_avatar',
                    method:'PUT',
                    body,
                }
            },
            invalidatesTags:['User']
        }),
        updatePassword:builder.mutation({
            query(body){
                return {
                    url:'/password/update',
                    method:'PUT',
                    body,
                }
            },
        }),
        forgotPassword:builder.mutation({
            query(body){
                return {
                    url:'/password/forgot',
                    method:'POST',
                    body,
                }
            },
        }),
        resetPassword:builder.mutation({
            query({token,body}){
                return {
                    url:`/password/reset/${token}`,
                    method:'PUT',
                    body,
                }
            },
        }),
        getAdminUsers: builder.query({
            query: () => `/admin/users`,
            providesTags: ["AdminUsers"],
          }),
        getUserDetails: builder.query({
            query: (id) => `/admin/users/${id}`,
            providesTags: ["AdminUser"],
        }),
    }),
});

export const { 
    useGetMeQuery, 
    useUpdateProfileMutation,
    useUploadAvatarMutation, 
    useUpdatePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetAdminUsersQuery,
    useGetUserDetailsQuery,

} = userApi;