import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Reward } from '../../types';

type RewardsState = {
  rewards: Reward[];
  loading: boolean;
  firstLoad: boolean;
  error: null | string;
};

const initialState: RewardsState = {
  rewards: [],
  loading: false,
  firstLoad: false,
  error: null,
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    addReward(state, action: PayloadAction<Reward>) {
      state.rewards.push(action.payload);
    },
    setRewards(state, action: PayloadAction<Reward[]>) {
      state.rewards = action.payload;
      state.firstLoad = true;
    },
    removeReward(state, action: PayloadAction<Reward['id']>) {
      state.rewards = state.rewards.filter(reward => reward.id !== action.payload);
    },
    updateReward(state, action: PayloadAction<Reward>) {
      const { id } = action.payload;
      const index = state.rewards.findIndex(reward => reward.id === id);
      if (index !== -1) {
        state.rewards[index] = action.payload;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) { 
      state.error = action.payload;
    }
  },
});

export const {
  addReward,
  setRewards,
  removeReward,
  updateReward,
  setLoading,
  setError,
} = rewardsSlice.actions;

export default rewardsSlice.reducer;