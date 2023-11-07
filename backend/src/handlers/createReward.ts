import 'source-map-support/register';
import { connectDatabase, createReward } from '../database';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isValidRewardPayload } from '../types/database';
import { verifyEventToken } from '../utils/token';

export const createRewardController = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    verifyEventToken(event);
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' }),
    };
  }
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing reward payload' }),
    };
  }
  try {
    await connectDatabase();
    const { name, category, price, description, image } = JSON.parse(event.body!);
    const payload = { name, category, price, description, image };
    if (!isValidRewardPayload(payload)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid reward payload' }),
      };
    }
    const reward = await createReward(payload);
    return {
      statusCode: 201,
      body: JSON.stringify(reward),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};