import { baseApi } from "../../api/baseApi";

const voiceModerationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    voiceModerationDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/all-voice-moderation/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useVoiceModerationDetailsQuery } = voiceModerationApi;
