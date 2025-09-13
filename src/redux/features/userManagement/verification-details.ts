import { baseApi } from "../../api/baseApi";

const verificationDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verificationDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/verification-details/${id}`,
        method: "GET",
      }),
    }),

    approvedVerification: builder.mutation({
      query: (params) => {
        return {
          url: `/admin/update-verification-status`,
          method: "PATCH",
          body: params,
        };
      },
    }),
  }),
});

export const { useVerificationDetailsQuery, useApprovedVerificationMutation } =
  verificationDetailsApi;
