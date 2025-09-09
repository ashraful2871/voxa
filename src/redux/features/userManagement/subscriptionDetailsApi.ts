import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscriptionDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/subscription-users-management/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSubscriptionDetailsQuery } = subscriptionApi;
