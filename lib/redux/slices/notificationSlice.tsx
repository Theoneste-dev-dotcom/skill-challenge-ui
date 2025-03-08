import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface NotificationType {
  id: string;
  isRead: boolean;
  message: string;
  createdAt: string;
}

interface NotificationsState {
  notifications: NotificationType[];
}

const initialState: NotificationsState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<NotificationType[]>) {
      state.notifications = action.payload;
    },
    addNotification(state, action: PayloadAction<NotificationType>) {
      state.notifications.unshift(action.payload); // Add to the beginning (newest first)
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) notification.isRead = true;
    },
    markAllAsRead(state) {
      state.notifications.forEach(n => (n.isRead = true));
    },
  },
});

export const { setNotifications, addNotification, markAsRead, markAllAsRead } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;

// Fetch past notifications from backend
export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://skills-challenge.onrender.com/notifications",
    // baseUrl:"http://localhost:4000/notifications",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationType[], void>({
      query: () => "/",
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApi;
