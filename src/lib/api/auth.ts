import { baseApi } from './baseApi';
import {
  setCredentials,
  setUser,
  clearCredentials,
} from '@/store/slices/authSlice';
import type {
  AuthUser,
  LoginDto,
  LoginResponse,
  RegisterAcademyDto,
  RegisterAcademyResponse,
  RegisterStudentDto,
  RegisterStudentResponse,
  VerifyOtpDto,
  VerifyOtpResponse,
  VerifyEmailDto,
  VerifyEmailResponse,
  ResendVerificationDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  AcceptInviteDto,
  RefreshResponse,
  MessageResponse,
} from '@/types/api';

export const authApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getMe: b.query<AuthUser, void>({
      query: () => '/users/me',
      providesTags: ['User'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          dispatch(clearCredentials());
        }
      },
    }),

    login: b.mutation<LoginResponse, LoginDto>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['Auth', 'User'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.token, user: data.user }));
        } catch {}
      },
    }),

    logout: b.mutation<MessageResponse, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearCredentials());
        }
      },
    }),

    registerAcademy: b.mutation<RegisterAcademyResponse, RegisterAcademyDto>({
      query: (body) => ({
        url: '/auth/register/academy',
        method: 'POST',
        body,
      }),
    }),

    registerStudent: b.mutation<RegisterStudentResponse, RegisterStudentDto>({
      query: (body) => ({
        url: '/auth/register/student',
        method: 'POST',
        body,
      }),
    }),

    verifyOtp: b.mutation<VerifyOtpResponse, VerifyOtpDto>({
      query: (body) => ({ url: '/auth/verify-otp', method: 'POST', body }),
    }),

    verifyEmail: b.mutation<VerifyEmailResponse, VerifyEmailDto>({
      query: (body) => ({ url: '/auth/verify-email', method: 'POST', body }),
    }),

    resendVerification: b.mutation<MessageResponse, ResendVerificationDto>({
      query: (body) => ({
        url: '/auth/resend-verification',
        method: 'POST',
        body,
      }),
    }),

    forgotPassword: b.mutation<MessageResponse, ForgotPasswordDto>({
      query: (body) => ({ url: '/auth/forgot-password', method: 'POST', body }),
    }),

    resetPassword: b.mutation<MessageResponse, ResetPasswordDto>({
      query: (body) => ({ url: '/auth/reset-password', method: 'POST', body }),
    }),

    // TODO: VERIFY — response shape assumed to match LoginResponse.
    acceptInvite: b.mutation<LoginResponse, AcceptInviteDto>({
      query: (body) => ({ url: '/auth/accept-invite', method: 'POST', body }),
      invalidatesTags: ['Auth', 'User'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.token, user: data.user }));
        } catch {}
      },
    }),

    // TODO: VERIFY — response shape assumed to match RefreshResponse.
    refresh: b.mutation<RefreshResponse, void>({
      query: () => ({ url: '/auth/refresh', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.token, user: data.user }));
        } catch {}
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useLazyGetMeQuery,
  useLogoutMutation,
  useRegisterAcademyMutation,
  useRegisterStudentMutation,
  useVerifyOtpMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useAcceptInviteMutation,
  useRefreshMutation,
} = authApi;