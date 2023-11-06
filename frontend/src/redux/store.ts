import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rewardsReducer from './slices/rewards';

export const store = configureStore({
  reducer: {
    rewards: rewardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;