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
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/payments/plans/${id}`,
        method: "DELETE",
      }),
    }),
    createPlan: builder.mutation({
      query: (params) => ({
        url: `/payments/plans`,
        method: "POST",
        body: params,
      }),
    }),
    editPlan: builder.mutation({
      query: ({ id, ...planData }) => ({
        url: `/payments/plans/${id}`,
        method: "POST",
        body: planData,
      }),
    }),
    cancelSubscription: builder.mutation({
      query: (params) => ({
        url: `/payments/cancel-subscription`,
        method: "POST",
        body: params,
      }),
    }),
    // In your subscriptionApi
    paymentHistory: builder.query({
      query: (params) => ({
        url: `/payments/user/payments`,
        method: "GET", // Keep it as GET
        body: params, // But include the body
      }),
    }),

    processReport: builder.mutation({
      query: (params) => ({
        url: `/admin/process-report`,
        method: "GET",
        body: params,
      }),
    }),
  }),
});

export const {
  useAllSubscriptionPlansQuery,
  useProcessReportMutation,
  useSubscriptionPlanDetailsQuery,
  useDeletePlanMutation,
  useCreatePlanMutation,
  useEditPlanMutation,
  useCancelSubscriptionMutation,
  usePaymentHistoryQuery,
} = subscriptionApi;
