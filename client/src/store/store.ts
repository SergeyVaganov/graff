import { configureStore } from '@reduxjs/toolkit'
import adminChatSlice from './slices/adminChatSlice'
import userChatSlice from './slices/userChatSlice'
import caruselReduser from './slices/caruselSlice'

const store = configureStore({
  reducer: {
    adminChat: adminChatSlice,
    userChat: userChatSlice,
    caruselSt: caruselReduser,
  },
});

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch