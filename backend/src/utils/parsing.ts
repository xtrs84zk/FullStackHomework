import type { Reward, RewardPayload } from "../types/database";

export const extractReward = (reward: Reward) => {
  const { id, name, category, price, description, image } = reward;
  return { id, name, category, price, description, image };
}

export const extractRewardPayload = (reward: Reward): RewardPayload => {
  const { id, ...rest } = reward;
  return rest;
}
