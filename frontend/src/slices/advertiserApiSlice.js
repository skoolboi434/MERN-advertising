import { Publications_URL, Advertisers_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const advertiserApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAdvertisers: builder.query({
      query: () => ({
        url: Advertisers_URL
      }),
      keepUnusedDataFor: 5
    }),
    getSingleAdvertiser: builder.query({
      query: advertiserId => ({
        url: `${Advertisers_URL}/${advertiserId}`
      }),
      keepUnusedDataFor: 5
    }),
    createAdvertiser: builder.mutation({
      query: data => ({
        url: Advertisers_URL,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Advertiser']
    }),
    updateAdvertiser: builder.mutation({
      query: data => ({
        url: `${Advertisers_URL}/${data._id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Advertiser']
    }),
    deleteAdvertiser: builder.mutation({
      query: advertiserId => ({
        url: `${Advertisers_URL}/${advertiserId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Advertiser']
    })
  })
});

export const { useGetAdvertisersQuery, useGetSingleAdvertiserQuery, useCreateAdvertiserMutation, useUpdateAdvertiserMutation, useDeleteAdvertiserMutation } = advertiserApiSlice;
