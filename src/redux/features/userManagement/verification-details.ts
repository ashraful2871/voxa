import { baseApi } from "../../api/baseApi";

const verificationDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verificationDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/verification-details/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useVerificationDetailsQuery } = verificationDetailsApi;
