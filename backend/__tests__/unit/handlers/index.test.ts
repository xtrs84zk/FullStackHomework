import { constructAPIGwEvent } from '../../utils/helpers';

import { handler as createRewardHandler } from '../../../src/handlers/createReward';
import { handler as getRewardsHandler } from '../../../src/handlers/getRewards';
import { handler as getRewardHandler } from '../../../src/handlers/getReward';
import { handler as removeRewardHandler } from '../../../src/handlers/removeReward';
import { Reward, RewardPayload, isValidRewardPayload } from '../../../src/types/database';

import {
  connectDatabase,
  getRewards,
  getReward,
  createReward,
  removeReward,
} from '../../../src/database';

import { getSecret } from '../../../src/utils/secrets';

jest.mock('../../../src/utils/secrets', () => ({
  getSecret: jest.fn().mockImplementation(() => Promise.resolve({
    JWT_SECRET: "691c98a4-b610-4091-9331-441cd1016fa4",
    JWT_REFRESH_SECRET: "3989e95e-8c02-438d-bf5b-e8554fb9756d",
    MONGODB_URI: "example.com",
    MONGODB_USER: "user",
    MONGODB_PASSWORD: "password",
  } satisfies Awaited<ReturnType<typeof getSecret>>))
}));

const initialRewards = [{
  id: "85d32de1-7841-4e8a-8989-e7792da538e6",
  name: "Initial reward",
  description: "Example reward description",
  price: 100,
  category: "category",
  image: "image",
} satisfies Reward];


const rewards: Reward[] = [...initialRewards];

const mockReward = {
  name: 'Reward 1',
  description: 'Reward 1 description',
  price: 100,
  category: 'category 1',
  image: 'image 1',
} satisfies RewardPayload;

const authHeaders = {
  Cookie: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZjAyNTM0Ny04YzM2LTRkZjgtYmJjNy03MTM0N2IyNDNmMGIiLCJpYXQiOjE2OTkzNzIyOTAsImV4cCI6MTY5OTM3NTg5MH0.Ok8hSKtwuROWoAIPdtlfEUuL6XeESaUcxVPtbd6kynY',
};

const resetRewards = () => {
  rewards.splice(0, rewards.length);
  rewards.push(...initialRewards);
}

jest.mock('../../../src/database', () => ({
  connectDatabase: jest.fn() satisfies typeof connectDatabase,
  getRewards: jest.fn().mockImplementation((() => Promise.resolve(rewards)) satisfies typeof getRewards),
  getReward: jest.fn().mockImplementation(((id: string) => {
    const reward = rewards.find(reward => reward.id === id);
    if (reward) {
      return Promise.resolve(reward);
    }
    return Promise.reject(new Error('Reward not found'));
  }) satisfies typeof getReward),
  createReward: jest.fn().mockImplementation(((reward: RewardPayload) => {
    const id = Math.random().toString(36).substring(2, 9);
    rewards.push({ ...reward, id });
    return Promise.resolve({ ...reward, id });
  }) satisfies typeof createReward),
  removeReward: jest.fn().mockImplementation(((id: string) => {
    const index = rewards.findIndex(reward => reward.id === id);
    if (index !== -1) {
      const [removed] = rewards.splice(index, 1);
      return Promise.resolve({ acknowledged: true, deletedCount: 1 });
    }
    return Promise.reject(new Error('Reward not found'));
  }) satisfies typeof removeReward),
}));

describe('a list of rewards should be received', () => {
  let response: Awaited<ReturnType<typeof getRewardsHandler>>;
  let result: Reward[];

  beforeAll(async () => {
    resetRewards();
    const event = constructAPIGwEvent({}, { method: 'GET' });
    response = await getRewardsHandler(event);
    result = JSON.parse(response.body);
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toEqual(200);
  });

  it('should return an array as body', () => {
    expect(Array.isArray(result)).toEqual(true);
  });

  it('should return an array of valid rewards', () => {
    // even if there is no reward, this will evaluate to true
    const isValidArray = result.every((reward: Reward) => isValidRewardPayload(reward));
    expect(isValidArray).toEqual(true);
  });
});

describe('a reward should be received', () => {
  let response: Awaited<ReturnType<typeof getRewardHandler>>;
  let result: Reward;

  beforeAll(async () => {
    resetRewards();
    const event = constructAPIGwEvent({}, {
      method: 'GET',
      pathParameters: {
        id: rewards[0].id,
      }
    });
    response = await getRewardHandler(event);
    result = JSON.parse(response.body);
  });

  it('should return a 200 status code', () => {
    expect(response.statusCode).toEqual(200);
  });

  it('should return the requested reward', () => {
    expect(result).toEqual(expect.objectContaining(rewards[0]));
  });
});


describe('auth should be required to create a reward', () => {
  let response: Awaited<ReturnType<typeof getRewardsHandler>>;

  beforeAll(async () => {
    resetRewards();
    const event = constructAPIGwEvent({}, { method: 'POST' });
    response = await createRewardHandler(event);
  });

  it('should return a 401 status code', () => {
    expect(response.statusCode).toEqual(401);
  });
});

describe('a reward should be created', () => {
  let response: Awaited<ReturnType<typeof getRewardsHandler>>;
  let result: Reward;

  beforeAll(async () => {
    resetRewards();
    const event = constructAPIGwEvent(mockReward, {
      method: 'POST',
      headers: {
        ...authHeaders,
      }
    });
    response = await createRewardHandler(event);
    result = JSON.parse(response.body);
  });

  it('should return a 201 status code', () => {
    expect(response.statusCode).toEqual(201);
  });

  it('response should contain the created reward', () => {
    expect(result).toEqual(expect.objectContaining(mockReward));
  });
});

describe('auth should be required to remove a reward', () => {
  let response: Awaited<ReturnType<typeof getRewardsHandler>>;

  beforeAll(async () => {
    resetRewards();
    const event = constructAPIGwEvent({}, { method: 'DELETE' });
    response = await removeRewardHandler(event);
  });

  it('should return a 401 status code', () => {
    expect(response.statusCode).toEqual(401);
  });
});

describe('a reward should be removed', () => {
  let response: Awaited<ReturnType<typeof getRewardsHandler>>;
  let result: { acknowledged: boolean, deletedCount: number };

  beforeAll(async () => {
    resetRewards();
    const event = constructAPIGwEvent({}, {
      method: 'DELETE',
      pathParameters: {
        id: rewards[0].id,
      },
      headers: {
        ...authHeaders,
      }
    });
    response = await removeRewardHandler(event);
    result = JSON.parse(response.body);
  });

  it('should return a 204 status code', () => {
    expect(response.statusCode).toEqual(204);
  });
});