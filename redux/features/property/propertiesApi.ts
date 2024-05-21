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
        url: "getProperties",
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
    getUserAllProperties: builder.query({
      query: () => ({
        url: "get-properties",
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
  }),
});

export const {
  useCreatePropertyMutation,
  useGetUserAllPropertiesQuery,
  useGetAllPropertiesQuery,
  useDeletePropertyMutation,
  useGetPropertieDetailsQuery
} = propertyApi;
