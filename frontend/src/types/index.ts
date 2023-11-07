export type Reward = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export type RewardPayload = Omit<Reward, 'id'>;

export type User = {
  name: string;
  username: string;
};