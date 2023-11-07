import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Reward } from '../../types';

const mockRows = [
  {
    id: "d9634c81-d539-4d81-868a-0eb0700f384b",
    name: 'Example Reward 1',
    category: 'Category 1',
    price: 100,
    description: 'Example Description 1',
    image: 'https://picsum.photos/200/300'
  },
  {
    id: "c89b5425-3d22-468f-8343-820202d7e1ff",
    name: 'Example Reward 2',
    category: 'Category 2',
    price: 200,
    description: 'Example Description 2',
    image: 'https://picsum.photos/200/300'
  },
  {
    id: "7158c483-c626-4d8f-bfb8-0732aa0a33ff",
    name: 'Example Reward 3',
    category: 'Category 3',
    price: 300,
    description: 'Example Description 3',
    image: 'https://picsum.photos/200/300'
  }
] satisfies Reward[];

const initialState = {
  rewards: mockRows as Reward[],
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