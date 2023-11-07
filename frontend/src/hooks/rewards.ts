import { useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch } from ".";
import { addReward, removeReward, setError, setLoading, setRewards } from "../redux/slices/rewards";
import type { Reward, RewardPayload } from "../types";
import { createReward, fetchRewards, deleteReward } from "../api/rewards";
import { toast } from "sonner";

export const useRewards = () => {
  const dispatch = useAppDispatch();
  const { rewards, loading, firstLoad, error } = useAppSelector((state) => state.rewards);

  // TODO : consider thunk or sagas
  const loadRewards = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const rewards = await fetchRewards();
      dispatch(setRewards(rewards));
    } catch (err) {
      toast.error("Failed to load rewards");
      dispatch(setError("Failed to load rewards"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!error && !firstLoad && !loading) {
      loadRewards();
    }
  }, [firstLoad, loading, error, loadRewards]);

  return { rewards, loading, loadRewards };
}

export const useMutableRewards = () => {
  const { rewards, loading } = useRewards();
  const dispatch = useAppDispatch();

  const add = useCallback(async (reward: RewardPayload) => {
    const result = await createReward(reward);
    dispatch(addReward(result));
  }, [dispatch]);

  const remove = useCallback(async ({ id }: Reward) => {
    await deleteReward(id);
    dispatch(removeReward(id));
  }, [dispatch]);

  return { add, remove, rewards, loading };
};