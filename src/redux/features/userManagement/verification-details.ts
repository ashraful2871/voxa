import { baseApi } from "../../api/baseApi";

const verificationDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verificationDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/verification-details/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Verification", id }],
    }),

    approvedVerification: builder.mutation({
      query: (params) => ({
        url: `/admin/update-verification-status`,
        method: "PATCH",
        body: params,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "Verification", id: params.verificationId },
        "Verification",
      ],
    }),
  }),
});

export const { useVerificationDetailsQuery, useApprovedVerificationMutation } =
  verificationDetailsApi;
