/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        // const params = new URLSearchParams();
        // if (data) {
        //   data?.forEach((item: any) => {
        //     params.append(item.name, item.value as string);
        //   });
        // }

        url: `/admin/user-management`,
        method: "GET",
        //params: params,
      }),
    }),
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
  useGetAllUserQuery,
  useGetSingleCommentQuery,
} = commentApi;
