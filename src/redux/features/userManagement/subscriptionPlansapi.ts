import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allSubscriptionPlans: builder.query({
      query: () => ({
        url: `/payments/plans`,
        method: "GET",
      }),
    }),
    SubscriptionPlanDetails: builder.query({
      query: ({ id }) => ({
        url: `/payments/plans/${id}/details`,
        method: "GET",
      }),
    }),
    processReport: builder.mutation({
      query: (params) => ({
        url: `/admin/process-report`,
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useAllSubscriptionPlansQuery,
  useProcessReportMutation,
  useSubscriptionPlanDetailsQuery,
} = subscriptionApi;
