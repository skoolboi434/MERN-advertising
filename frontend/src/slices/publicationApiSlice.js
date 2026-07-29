import { Publications_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const publicationApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPublications: builder.query({
      query: () => ({
        url: Publications_URL
      }),
      keepUnusedDataFor: 5
    }),

    getSinglePublication: builder.query({
      query: publicationId => ({
        url: `${Publications_URL}/${publicationId}`
      }),
      keepUnusedDataFor: 5
    }),

    createPublication: builder.mutation({
      query: data => ({
        url: Publications_URL,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Publication']
    }),
    updatePublication: builder.mutation({
      query: data => ({
        url: `${Publications_URL}/${data._id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Publication']
    }),

    addPublicationNote: builder.mutation({
      query: ({ publicationId, ...noteData }) => ({
        url: `${Publications_URL}/${publicationId}/notes`,
        method: 'POST',
        body: noteData
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Publication']
    })
  })
});

export const { useGetPublicationsQuery, useGetSinglePublicationQuery, useCreatePublicationMutation, useUpdatePublicationMutation, useAddPublicationNoteMutation } = publicationApiSlice;
