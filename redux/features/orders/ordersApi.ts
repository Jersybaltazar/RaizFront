import { apiSlice } from "../api/apiSlice";
export const OrdersApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createVisit:builder.mutation({
            query:(orderData)=>({
                url:"save-visit",
                method:"POST",
                body:orderData,
                credentials: 'include' as const,
            })
        })
    })
})
export const {
    useCreateVisitMutation
} = OrdersApi;