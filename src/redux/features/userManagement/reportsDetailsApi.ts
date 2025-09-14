import { baseApi } from "../../api/baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reportDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/all-reports/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Report", id }],
    }),
    processReport: builder.mutation({
      query: (params) => ({
        url: `/admin/process-report`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "Report", id: params.reportId },
        "Report", // Invalidate all reports
      ],
    }),
  }),
});

export const { useReportDetailsQuery, useProcessReportMutation } = reportApi;
