import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Reward } from '../../types';

const initialState = {
  rewards: [] as Reward[],
  loading: false,
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
  },
});

export const {
  addReward,
  setRewards,
  removeReward,
  updateReward
} = rewardsSlice.actions;

export default rewardsSlice.reducer;