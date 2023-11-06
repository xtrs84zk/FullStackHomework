import { useAppSelector, useAppDispatch } from ".";
import { addReward, removeReward, setRewards, updateReward } from "../redux/slices/rewards";
import { Reward } from "../types";

export const useRewards = () => {
  const { rewards, loading } = useAppSelector((state) => state.rewards);

  return { rewards, loading };
}

export const useMutableRewards = () => { 
  const dispatch = useAppDispatch();

  const add = (reward: Reward) => {
    // TODO: Add reward to backend
    dispatch(addReward(reward));
  }

  const set = (rewards: Reward[]) => { 
    dispatch(setRewards(rewards));
  };

  const remove = (id: Reward['id']) => { 
    // TODO: Remove reward from backend
    dispatch(removeReward(id));
  };

  const update = (reward: Reward) => { 
    // TODO: Update reward in backend
    dispatch(updateReward(reward));
  };

  return { add, set, remove, update };
};