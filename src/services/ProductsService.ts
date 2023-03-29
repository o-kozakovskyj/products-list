import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type Product from '../entitles/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => '',
    }),
    addProduct: builder.mutation<Product, Product>({
      query: (body) => ({
        url: '/add',
        method: 'POST',
        body,
      }),
    }),
    deleteProduct: builder.mutation<number, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});