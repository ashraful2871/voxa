import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: `/admin/user-management`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    totalUser: builder.query({
      query: () => ({
        url: `/admin/total-users`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    goldUser: builder.query({
      query: () => ({
        url: `/admin/gold-users`,
        method: "GET",
      }),
      providesTags: ["User"],
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
        url: `/admin/user-management/${id}/details`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    moderationQueue: builder.query({
      query: () => ({
        url: `/admin/all-voice-moderation`,
        method: "GET",
      }),
      providesTags: ["VoiceModeration"],
    }),

    verificationQueue: builder.query({
      query: () => ({
        url: `/admin/all-verifications`,
        method: "GET",
      }),
      providesTags: ["Verification"],
    }),

    reports: builder.query({
      query: () => ({
        url: `/admin/all-reports`,
        method: "GET",
      }),
      providesTags: ["Report"],
    }),

    subscriptionManagement: builder.query({
      query: () => ({
        url: `/admin/subscription-users-management`,
        method: "GET",
      }),
      providesTags: ["Subscription"],
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
  useModerationQueueQuery,
  useVerificationQueueQuery,
  useReportsQuery,
  useSubscriptionManagementQuery,
  useGetAllUserQuery,
  useGetSingleCommentQuery,
} = commentApi;
