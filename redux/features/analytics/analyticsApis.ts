import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getPropertiesAnalytics: builder.query({
            query:() =>({
                url:"get-properties-analytics",
                method:"GET",
                credentials: 'include' as const,
            }) 
        }),
        getUsersAnalytics: builder.query({
            query:() =>({
                url:"get-users-analytics",
                method:"GET",
                credentials: 'include' as const,
            }) 
        }),
        getOrdersAnalytics: builder.query({
            query:() =>({
                url:"get-order-analytics",
                method:"GET",
                credentials: 'include' as const,
            }) 
        })
    })
})

export const {useGetPropertiesAnalyticsQuery, useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery}= analyticsApi;