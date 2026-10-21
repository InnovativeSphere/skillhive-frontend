import { baseApi } from './baseApi';
import type {
  EnrollDto,
  MyEnrollment,
  AcademyEnrollment,
  MarkLessonCompleteDto,
  EnrollResponse,
  LessonCompleteResponse,
} from '@/types/api';

export const enrollmentsApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    enrollInCourse: b.mutation<EnrollResponse, EnrollDto>({
      query: (body) => ({ url: '/enrollments', method: 'POST', body }),
      invalidatesTags: ['Enrollment'],
    }),

    getMyEnrollments: b.query<MyEnrollment[], void>({
      query: () => '/enrollments/me',
      providesTags: ['Enrollment'],
    }),

    getAcademyEnrollments: b.query<AcademyEnrollment[], { courseId?: number }>({
      query: (params) => ({ url: '/enrollments/academy', params }),
      providesTags: ['Enrollment'],
    }),

    markLessonComplete: b.mutation<LessonCompleteResponse, MarkLessonCompleteDto>({
      query: (body) => ({
        url: '/enrollments/lessons/complete',
        method: 'POST',
        body,
      }),
      // Invalidate the enrollment to update the progress bar
      invalidatesTags: ['Enrollment'],
    }),
  }),
});

export const {
  useEnrollInCourseMutation,
  useGetMyEnrollmentsQuery,
  useGetAcademyEnrollmentsQuery,
  useMarkLessonCompleteMutation,
} = enrollmentsApi;