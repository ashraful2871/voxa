import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscriptionDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/subscription-users-management/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Subscription", id }],
    }),
    allSubscriptionPlans: builder.query({
      query: () => ({
        url: `/payments/plans`,
        method: "GET",
      }),
      providesTags: ["Plan"],
    }),
    SubscriptionPlanDetails: builder.query({
      query: ({ id }) => ({
        url: `/payments/plans/${id}/details`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Plan", id }],
    }),
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/payments/plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Plan"],
    }),
    createPlan: builder.mutation({
      query: (params) => ({
        url: `/payments/plans`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["Plan"],
    }),
    editPlan: builder.mutation({
      query: ({ id, ...planData }) => ({
        url: `/payments/plans/${id}`,
        method: "POST",
        body: planData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Plan", id }],
    }),
    cancelSubscription: builder.mutation({
      query: (params) => ({
        url: `/payments/cancel-subscription`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "Subscription", id: params.email }, // Assuming email is used as ID
        "Subscription",
      ],
    }),
    paymentHistory: builder.query({
      query: (params) => ({
        url: `/payments/user/payments`,
        method: "POST", // Changed to POST since GET with body is problematic
        body: params,
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
