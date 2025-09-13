import { baseApi } from "../../api/baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reportDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/all-reports/${id}`,
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

export const { useReportDetailsQuery, useProcessReportMutation } = reportApi;
