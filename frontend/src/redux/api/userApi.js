import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated,setUser,setLoading } from "../features/userSlice";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes:["User"],
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
        })
    }),
});

export const { useGetMeQuery, 
    useUpdateProfileMutation,
    useUploadAvatarMutation, 
    useUpdatePasswordMutation,
    useForgotPasswordMutation,
} = userApi;