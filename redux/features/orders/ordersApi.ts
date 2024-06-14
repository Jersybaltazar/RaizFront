import { apiSlice } from "../api/apiSlice";
export const OrdersApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createVisit:builder.mutation({
            query:(visitData)=>({
                url:"create-order",
                method:"POST",
                body:visitData, 
                credentials: 'include' as const,
            })
        })
    })
})
export const {
    useCreateVisitMutation
} = OrdersApi;