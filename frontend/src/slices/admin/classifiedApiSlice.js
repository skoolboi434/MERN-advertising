import { apiSlice } from '../apiSlice';
import { ADMIN_URL } from '../../constants';

export const classifiedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/classifieds`
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Product']
    }),
    createProduct: builder.mutation({
      query: data => ({
        url: `${ADMIN_URL}/classifieds`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Product']
    }),
    getCategories: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/categories`
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Category']
    }),
    createCategory: builder.mutation({
      query: data => ({
        url: `${ADMIN_URL}/categories`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Category']
    })
  })
});

export const { useGetProductsQuery, useCreateProductMutation, useCreateCategoryMutation, useGetCategoriesQuery } = classifiedApiSlice;
