import { Users_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${Users_URL}/login`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${Users_URL}/logout`,
        method: 'POST'
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
