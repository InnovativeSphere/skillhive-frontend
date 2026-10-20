import { baseApi } from './baseApi';
import type { Category, Profession } from '@/types/api';

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getCategories: b.query<Category[], void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),
    getProfessions: b.query<Profession[], { categoryId?: number }>({
      query: (params) => ({
        url: '/categories/professions',
        params,
      }),
      providesTags: ['Profession'],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProfessionsQuery } = categoriesApi;