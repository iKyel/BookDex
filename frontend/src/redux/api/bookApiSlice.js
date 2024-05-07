import { apiSlice } from "./apiSlice";
import { BOOK_URL, UPLOAD_URL } from "../constants";

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ keyword }) => ({
        url: `${BOOK_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Books"],
    }),

    getBookById: builder.query({
      query: (bookId) => `${BOOK_URL}/${bookId}`,
      providesTags: (result, error, bookId) => [{ type: "Book", id: bookId }],
    }),

    getBookByAuthorId: builder.query({
      query: (authorId) => `${BOOK_URL}/author/${authorId}`,
      providesTags: (result, error, authorId) => [{ type: "Book", id: authorId }],
    }),

    allBooks: builder.query({
      query: () => `${BOOK_URL}`,
    }),

    allBooksAdmin: builder.query({
      query: () => `${BOOK_URL}/admin`,
    }),

    createBook: builder.mutation({
      query: (bookData) => ({
        url: `${BOOK_URL}`,
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query: ({ bookId, updatedBook }) => ({
        url: `${BOOK_URL}/update/${bookId}`,
        method: "PUT",
        body: updatedBook,
      }),
    }),

    uploadBookCover: builder.mutation({
        query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: "POST",
            body: data,
        }),
    }),

    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `${BOOK_URL}/${bookId}`,
        method: "DELETE",
      }),
      providesTags: ["Book"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${BOOK_URL}/${data.bookId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),

    getTopBooks: builder.query({
      query: () => `${BOOK_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    getNewBooks: builder.query({
      query: () => `${BOOK_URL}/new`,
      keepUnusedDataFor: 5,
    }),

    getFilteredBooks: builder.query({
      query: ({ author, demographic, price, name, sortOrder }) => ({
        url: `${BOOK_URL}/filter`,
        method: "POST",
        body: { author, demographic, price, name, sortOrder },
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetBookByAuthorIdQuery,
  useAllBooksQuery,
  useAllBooksAdminQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useUploadBookCoverMutation,
  useDeleteBookMutation,
  useCreateReviewMutation,
  useGetTopBooksQuery,
  useGetNewBooksQuery,
  useGetFilteredBooksQuery,
} = bookApiSlice;