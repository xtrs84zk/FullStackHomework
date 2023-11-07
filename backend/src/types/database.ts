export type Reward = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export type RewardPayload = Omit<Reward, 'id'>;

export const isValidRewardPayload = (payload: unknown): payload is RewardPayload => {
  const test = payload as RewardPayload;
  return (
    !!test &&
    typeof test.name === 'string' &&
    typeof test.description === 'string' &&
    typeof test.price === 'number' &&
    typeof test.category === 'string' &&
    typeof test.image === 'string'
  );
};

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
};

export type UserPayload = Omit<User, 'id'>;

export const isValidUserPayload = (payload: unknown): payload is UserPayload => {
  const test = payload as UserPayload;
  return (
    typeof test.name === 'string' &&
    typeof test.username === 'string' &&
    typeof test.password === 'string'
  );
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};