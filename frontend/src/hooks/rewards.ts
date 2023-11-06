import { useAppSelector, useAppDispatch } from ".";
import { addReward, removeReward } from "../redux/slices/rewards";
import { Reward } from "../types";
import { toast } from 'sonner';

export const useRewards = () => {
  const { rewards, loading } = useAppSelector((state) => state.rewards);

  return { rewards, loading };
}

export const useMutableRewards = () => {
  const { rewards, loading } = useRewards();
  const dispatch = useAppDispatch();

  const add = (reward: Reward) => {
    // TODO: Add reward to backend
    dispatch(addReward(reward));
  }

  const remove = ({id, name}: Reward) => {
    toast.success(`'${name}' removed.`);
    // TODO: Remove reward from backend
    dispatch(removeReward(id));
  };

  return { add, remove, rewards, loading };
};