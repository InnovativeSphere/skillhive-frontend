import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/lib/api/baseApi';
import authReducer from '@/store/slices/authSlice';
import '@/lib/api/auth';
import '@/lib/api/courses';
import '@/lib/api/enrollments';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;