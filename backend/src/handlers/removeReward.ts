import 'source-map-support/register';
import { connectDatabase, removeReward } from '../database';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { withAuth } from '../utils/middleware';

export const handler = withAuth(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing reward ID',
      }),
    };
  }
  
  const { id } = event.pathParameters;
  await connectDatabase();
  const reward = await removeReward(id);

  if (!reward.acknowledged || !reward.deletedCount) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Reward not found',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(reward),
  };
});