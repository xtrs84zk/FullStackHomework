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
    typeof test.name === 'string' && test.name.length > 0 &&
    typeof test.description === 'string' && test.description.length > 0 &&
    typeof test.price === 'number' && test.price > 0 &&
    typeof test.category === 'string' && test.category.length > 0 &&
    typeof test.image === 'string' && test.image.length > 0
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