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
    })
  })
});

export const { useGetPublicationsQuery, useGetSinglePublicationQuery } = publicationApiSlice;
