import type { Reward, RewardPayload } from "../types";

// TODO: get value from environment variable || aws or something
const apiURL = "http://127.0.0.1:3000/api";

export const fetchRewards = async (): Promise<Reward[]> => {
  const response = await fetch(`${apiURL}/rewards`, {
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

export const fetchReward = async (id: string): Promise<Reward> => {
  const response = await fetch(`${apiURL}/rewards/${id}`, {
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export const deleteReward = async (id: string) => {
  const response = await fetch(`${apiURL}/rewards/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (response.status !== 204 && response.status !== 200) {
    throw new Error('Failed to delete reward');
  }
};

export const updateReward = async (reward: Reward): Promise<void> => {
  await fetch(`${apiURL}/rewards/${reward.id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reward),
  });
};

export const createReward = async (reward: RewardPayload): Promise<Reward> => {
  const response = await fetch(`${apiURL}/rewards`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reward),
  });
  if (response.status !== 201) {
    throw new Error('Failed to create reward');
  }
  const data = await response.json();
  return data;
};