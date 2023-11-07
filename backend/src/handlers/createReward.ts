import 'source-map-support/register';
import { connectDatabase, createReward } from '../database';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { RewardPayload, isValidRewardPayload } from '../types/database';
import { extractRewardPayload } from '../utils/parsing';
import { withAuth } from '../utils/middleware';

export const handler = withAuth(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing reward payload' }),
    };
  }
  let payload: null | RewardPayload = null;
  try {
    payload = extractRewardPayload(JSON.parse(event.body));
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid reward payload' }),
    };
  }
  try {
    if (!isValidRewardPayload(payload)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid reward payload' }),
      };
    }
    await connectDatabase();
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
});