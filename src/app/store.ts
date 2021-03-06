import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import flashReducer from '../features/flash/flashSlice'

export const store = configureStore({
  reducer: {
    flash: flashReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
