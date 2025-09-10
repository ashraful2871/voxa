import { baseApi } from "../../api/baseApi";

const voiceModerationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    voiceModerationDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/all-voice-moderation/${id}`,
        method: "GET",
      }),
    }),

    makeSafe: builder.mutation({
      query: (params) => {
        return {
          url: `/admin/voice-moderation-action`,
          method: "POST",
          body: params,
        };
      },
    }),
    issuesWarning: builder.mutation({
      query: (params) => {
        return {
          url: `/admin/issued-warning`,
          method: "POST",
          body: params,
        };
      },
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
} = voiceModerationApi;
