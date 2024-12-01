import { apiSlice } from "../api/apiSlice";

export const propertyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation({
      query: ( data ) => ({
        url: "createProperty",
        method: "POST",
        body:  data ,
        credentials: "include" as const,
      }),
    }),
    getAllProperties: builder.query({
      query: () => ({
        url: "get-properties",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteProperty: builder.mutation({
      query: ( id ) => ({
        url: `delete-property/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editProperty: builder.mutation({
      query: ({id,data}) => ({
        url: `editProperty/${id}`,
        method: "PUT",
        body:data,
        credentials: "include" as const,
      }), 
    }),
    getUsersAllProperties: builder.query({
      query: () => ({
        url: "getProperties",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getPropertieDetails: builder.query({
      query: (id) => ({
        url: `getProperty/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getPropertyContent :builder.query({
      query: (id) => ({
        url: `getPropertyContent/${id}`,
        method: "GET",
        credentials: "include" as const,
      })
    }),
    addNewQuestion:builder.mutation({
      query:({question, propertyId, contentId})=>({
        url:"addQuestion",
        body:{
          question, propertyId,contentId
        },
        method:"PUT",
        credentials: "include" as const,
      })
    }),
    addAnswerInQuestion:builder.mutation({
      query:({answer, propertyId, contentId, questionId})=>({
        url:"addAnswer",
        body:{
          answer, propertyId, contentId, questionId
        },
        method:"PUT",
        credentials: "include" as const
      })
    }),
    addReviewInProperty:builder.mutation({
      query:({review, rating,propertyId} )=>({
        url:`addReview${propertyId}`,
        body:{
          review, rating
        },
        method:"PUT",
        credentials: "include" as const
      })
    })
  }),
});

export const {
  useCreatePropertyMutation,
  useGetAllPropertiesQuery,
  useDeletePropertyMutation,
  useEditPropertyMutation,
  useGetUsersAllPropertiesQuery,
  useGetPropertieDetailsQuery,
  useGetPropertyContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInPropertyMutation
} = propertyApi;
