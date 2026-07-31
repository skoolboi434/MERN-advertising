import { apiSlice } from '../apiSlice';
import { ADMIN_URL } from '../../constants';

export const accountTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAccountTypes: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/accounts`
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['AccountType']
    }),
    createAccountType: builder.mutation({
      query: data => ({
        url: `${ADMIN_URL}/accounts`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['AccountType']
    }),
    importAccountType: builder.mutation({
      query: data => ({
        url: `${ADMIN_URL}/accounts/import`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['AccountType']
    }),
    deleteAccountType: builder.mutation({
      query: accountTypeId => ({
        url: `${ADMIN_URL}/accounts/${accountTypeId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['AccountType']
    })
  })
});

export const { useGetAccountTypesQuery, useCreateAccountTypeMutation, useImportAccountTypeMutation, useDeleteAccountTypeMutation } = accountTypeApiSlice;
