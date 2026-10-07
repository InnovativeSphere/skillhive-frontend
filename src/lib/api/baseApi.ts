import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiEnvelope } from './types';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5167',
  credentials: 'include',
  prepareHeaders: (headers) => {
    return headers;
  },
});


const baseQuery: typeof rawBaseQuery = async (args, api, extra) => {
  const result = await rawBaseQuery(args, api, extra);
  if (result.error) return result;

  const envelope = result.data as ApiEnvelope<unknown> | undefined;
  if (!envelope || typeof envelope.success !== 'boolean') return result;

  if (envelope.success === false) {
    return {
      error: { status: envelope.statusCode, data: envelope },
    };
  }

  return { data: envelope.data };
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'Auth', 'User', 'Staff',
    'Academy', 'Category', 'Profession',
    'Course', 'Lesson', 'Material',
    'Enrollment', 'Quiz',
    'Review', 'Comment', 'Certificate',
    'Subscription', 'Plan', 'Invoice', 'Payment',
    'Notification',
    'StudentAnalytics', 'AcademyAnalytics', 'PlatformAnalytics',
    'Audit',
  ],
  endpoints: () => ({}),
});