import { baseApi } from './baseApi';
import type {
  MyCourseListItem,
  CourseDetail,
  CreateCourseDto,
  UpdateCourseDto,
  CreateCourseResponse,
  Paginated,
  CourseListItem,
  RejectCourseDto,
  Lesson,
  CreateLessonDto,
  UpdateLessonDto,
  ReorderLessonDto,
} from '@/types/api';

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // --- Course Queries ---
    getMyCourses: b.query<MyCourseListItem[], void>({
      query: () => '/courses/academy/mine',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ courseId }) => ({ type: 'Course' as const, id: courseId })),
              { type: 'Course', id: 'LIST' },
            ]
          : [{ type: 'Course', id: 'LIST' }],
    }),

    getCourses: b.query<Paginated<CourseListItem>, Record<string, unknown>>({
      query: (params) => ({ url: '/courses', params }),
      providesTags: ['Course'],
    }),

    getCourseBySlug: b.query<CourseDetail, string>({
      query: (slug) => `/courses/${slug}`,
      providesTags: (_, __, slug) => [{ type: 'Course', id: slug }],
    }),

    // --- Course Mutations (Lifecycle) ---
    createCourse: b.mutation<CreateCourseResponse, CreateCourseDto>({
      query: (body) => ({ url: '/courses', method: 'POST', body }),
      invalidatesTags: [{ type: 'Course', id: 'LIST' }],
    }),

    updateCourse: b.mutation<void, { id: number; body: UpdateCourseDto }>({
      query: ({ id, body }) => ({ url: `/courses/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Course', id }, { type: 'Course', id: 'LIST' }],
    }),
    
    submitCourse: b.mutation<void, number>({
      query: (id) => ({ url: `/courses/${id}/submit`, method: 'PATCH' }),
      invalidatesTags: (_, __, id) => [{ type: 'Course', id }, { type: 'Course', id: 'LIST' }],
    }),

    approveCourse: b.mutation<void, number>({
      query: (id) => ({ url: `/courses/${id}/approve`, method: 'PATCH' }),
      invalidatesTags: (_, __, id) => [{ type: 'Course', id }, { type: 'Course', id: 'LIST' }],
    }),

    rejectCourse: b.mutation<void, { id: number; body: RejectCourseDto }>({
      query: ({ id, body }) => ({ url: `/courses/${id}/reject`, method: 'PATCH', body }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Course', id }, { type: 'Course', id: 'LIST' }],
    }),

    archiveCourse: b.mutation<void, number>({
      query: (id) => ({ url: `/courses/${id}/archive`, method: 'PATCH' }),
      invalidatesTags: (_, __, id) => [{ type: 'Course', id }, { type: 'Course', id: 'LIST' }],
    }),

    // --- Lesson Queries & Mutations ---
    getLessons: b.query<Lesson[], string>({
      query: (courseSlug) => `/courses/${courseSlug}/lessons`,
      providesTags: (_, __, slug) => ['Lesson'],
    }),

        getLessonById: b.query<Lesson, number>({
      query: (id) => `/lessons/${id}`,
      providesTags: (_, __, id) => [{ type: 'Lesson', id }],
    }),

     createLesson: b.mutation<void, { courseId: number; body: CreateLessonDto }>({
      query: ({ courseId, body }) => ({
        url: `/courses/${courseId}/lessons`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Lesson', 'Course'], 
    }),

    updateLesson: b.mutation<void, { id: number; body: UpdateLessonDto }>({
      query: ({ id, body }) => ({
        url: `/lessons/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Lesson', 'Course'],
    }),

    deleteLesson: b.mutation<void, number>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lesson', 'Course'],
    }),

    reorderLesson: b.mutation<void, { id: number; body: ReorderLessonDto }>({
      query: ({ id, body }) => ({
        url: `/lessons/${id}/reorder`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Lesson'],
    }),
  }),
});

export const {
  useGetMyCoursesQuery,
  useGetCoursesQuery,
  useGetCourseBySlugQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useSubmitCourseMutation,
  useApproveCourseMutation,
  useRejectCourseMutation,
  useArchiveCourseMutation,
  useGetLessonsQuery,
   useGetLessonByIdQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useReorderLessonMutation,
} = coursesApi;[]