import { baseApi } from "../../api/baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reportDetails: builder.query({
      query: ({ id }) => ({
        url: `/admin/all-reports/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useReportDetailsQuery } = reportApi;
