import { baseApi } from "../../api/baseApi";

const voiceModerationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    voiceModerationDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/all-voice-moderation/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: "VoiceModeration", id },
      ],
    }),

    makeSafe: builder.mutation({
      query: (params) => ({
        url: `/admin/report-make-safe`,
        method: "PATCH",
        body: params,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "Report", id: params.reportId },
        "Report",
      ],
    }),

    issuesWarning: builder.mutation({
      query: (params) => ({
        url: `/admin/issued-warning`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "User", id: params.userId }, // Assuming you have userId in params
        "User",
      ],
    }),

    voiceModerationAction: builder.mutation({
      query: (params) => ({
        url: `/admin/voice-moderation-action`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "VoiceModeration", id: params.reportId },
        "VoiceModeration",
      ],
    }),

    removeSuspendAndBanned: builder.mutation({
      query: ({ id, action }) => ({
        url: `/admin/remove-restriction/${id}`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),
    temporarySuspend: builder.mutation({
      query: (params) => {
        return {
          url: `/admin/process-report`,
          method: "POST",
          body: params,
        };
      },
    }),
  }),
});

export const {
  useVoiceModerationDetailsQuery,
  useMakeSafeMutation,
  useIssuesWarningMutation,
  useTemporarySuspendMutation,
  useVoiceModerationActionMutation,
  useRemoveSuspendAndBannedMutation,
} = voiceModerationApi;
