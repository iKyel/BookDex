import { apiSlice } from "./apiSlice";
import { AUTHOR_URL } from "../constants";

export const authorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAuthor: builder.mutation({
      query: (newAuthor) => ({
        url: `${AUTHOR_URL}`,
        method: "POST",
        body: newAuthor,
      }),
    }),

    updateAuthor: builder.mutation({
      query: ({ authorId, updatedAuthor }) => ({
        url: `${AUTHOR_URL}/${authorId}`,
        method: "PUT",
        body: updatedAuthor,
      }),
    }),

    deleteAuthor: builder.mutation({
      query: (authorId) => ({
        url: `${AUTHOR_URL}/${authorId}`,
        method: "DELETE",
      }),
    }),

    fetchAuthors: builder.query({
      query: () => `${AUTHOR_URL}`,
    }),

    fetchAuthorDetails: builder.query({
      query: (authorId) => `${AUTHOR_URL}/${authorId}`,
    }),
  }),
});

export const {
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
  useFetchAuthorsQuery,
  useFetchAuthorDetailsQuery,
} = authorApiSlice;