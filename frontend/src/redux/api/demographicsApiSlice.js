import { apiSlice } from "./apiSlice";
import { DEMOGRAPHIC_URL } from "../constants";

export const demographicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDemographic: builder.mutation({
      query: (newDemographic) => ({
        url: `${DEMOGRAPHIC_URL}`,
        method: "POST",
        body: newDemographic,
      }),
    }),

    updateDemographic: builder.mutation({
      query: ({ demographicId, updatedDemographic }) => ({
        url: `${DEMOGRAPHIC_URL}/${demographicId}`,
        method: "PUT",
        body: updatedDemographic,
      }),
    }),

    deleteDemographic: builder.mutation({
      query: (demographicId) => ({
        url: `${DEMOGRAPHIC_URL}/${demographicId}`,
        method: "DELETE",
      }),
    }),

    fetchDemographics: builder.query({
      query: () => `${DEMOGRAPHIC_URL}/listdemographics`,
    }),

    fetchDemographicDetails: builder.query({
      query: (demographicId) => `${DEMOGRAPHIC_URL}/${demographicId}`,
    }),
  }),
});

export const {
  useCreateDemographicMutation,
  useUpdateDemographicMutation,
  useDeleteDemographicMutation,
  useFetchDemographicsQuery,
  useFetchDemographicDetailsQuery,
} = demographicApiSlice;
