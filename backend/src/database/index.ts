import { Schema, model, connect } from 'mongoose';
import type { RewardPayload, Reward as RewardType, UserPayload, User as UserType } from '../types/database'
import { createRandomString } from '../utils/token';
import { extractReward } from '../utils/parsing';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

let isConnected = false;

const rewardSchema = new Schema<RewardType>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const Reward = model<RewardType>('Reward', rewardSchema);

const userSchema = new Schema<UserType>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
});

userSchema.pre('save', async function (next) {
  const user = this satisfies UserType;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

const User = model<UserType>('User', userSchema);

const sessionSchema = new Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  // session will expire at the time specified by expiresAt
  expiresAt: { type: Date, required: true, expires: 0 },
});

const Session = model('Session', sessionSchema);

export const connectDatabase = async () => {
  if (isConnected) {
    return;
  }

  // prepend mongodb+srv://
  await connect(process.env.MONGODB_URI!, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
    dbName: 'rewards',
    autoCreate: true,
  });

  console.log('Connected to database');

  const userCount = await User.countDocuments({});
  if (userCount === 0) {
    const password = createRandomString();
    const username = createRandomString();

    const user = await createUser({
      name: 'Default Admin',
      username,
      password,
    });

    console.log('Created admin user', {
      username: user.username,
      password: password,
    });
  }
};

export const createUser = async (user: UserPayload) => {
  const id = uuid();
  const newUser = new User({ id, ...user });
  await newUser.save();
  const { name, username } = newUser.toObject();
  return { id, name, username };
};

export const verifyUserByUsernameAndPassword = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }
  const result = await bcrypt.compare(password, user.password);
  console.log(result);
  if (!result) {
    throw new Error('Invalid password');
  }
  const { id, name } = user.toObject();
  return { id, name, username };
}

export const createReward = async (reward: RewardPayload) => {
  const id = uuid();
  const newReward = new Reward({ id, ...reward });
  await newReward.save();
  return extractReward(newReward.toObject());
};

export const getRewards = async () => {
  const rewards = await Reward.find();
  return rewards.map(reward => extractReward(reward.toObject()));
};

export const getReward = async (id: string) => {
  const reward = await Reward.findOne({ id });
  if (!reward) {
    return null;
  }
  return extractReward(reward.toObject());
};

export const removeReward = async (id: string) => {
  return await Reward.deleteOne({ id });
};

export const createSession = async (userId: string) => {
  const id = uuid();
  const expiresAt = new Date();
  // session is valid for 1 hour
  expiresAt.setHours(expiresAt.getHours() + 1);
  const session = new Session({ id, userId, expiresAt });
  await session.save();
  return session.toObject();
}

export const getSession = async (id: string) => {
  const session = await Session.findOne({ id });
  if (!session) {
    return null;
  }
  return session.toObject();
}

export const removeSession = async (id: string) => {
  await Session.deleteOne({ id });
}