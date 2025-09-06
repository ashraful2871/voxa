import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: `/admin/user-management`,
        method: "GET",
      }),
    }),
    totalUser: builder.query({
      query: () => ({
        url: `/admin/total-users`,
        method: "GET",
      }),
    }),
    goldUser: builder.query({
      query: () => ({
        url: `/admin/gold-users`,
        method: "GET",
      }),
    }),
    totalNoteSend: builder.query({
      query: () => ({
        url: `/admin/voice-send-today`,
        method: "GET",
      }),
    }),
    aiFlaged: builder.query({
      query: () => ({
        url: `/admin/ai-flaged`,
        method: "GET",
      }),
    }),
    userReport: builder.query({
      query: () => ({
        url: `/admin/user-reports-last-one-day`,
        method: "GET",
      }),
    }),
    totalRevenue: builder.query({
      query: () => ({
        url: `/admin/total-revenue`,
        method: "GET",
      }),
    }),
    subscriptionUsages: builder.query({
      query: () => ({
        url: `/admin/subscription-usage`,
        method: "GET",
      }),
    }),
    reportedUserReason: builder.query({
      query: () => ({
        url: `/admin/reported-graph`,
        method: "GET",
      }),
    }),
    currentPlan: builder.query({
      query: () => ({
        url: `/admin/all-plans`,
        method: "GET",
      }),
    }),
    userDetails: builder.query({
      query: ({ id }) => ({
        url: `/users/details/${id}`,
        method: "GET",
      }),
    }),

    ////////////////////////////////////
    getSingleComment: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
        method: "GET",
      }),
    }),

    createComment: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/comment/${id}`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useTotalUserQuery,
  useGoldUserQuery,
  useTotalNoteSendQuery,
  useAiFlagedQuery,
  useUserReportQuery,
  useTotalRevenueQuery,
  useSubscriptionUsagesQuery,
  useReportedUserReasonQuery,
  useCurrentPlanQuery,
  useUserDetailsQuery,
  useGetAllUserQuery,
  useGetSingleCommentQuery,
} = commentApi;
