import 'source-map-support/register';
import { connectDatabase, removeReward } from '../database';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await connectDatabase();
  if (!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing reward ID',
      }),
    };
  }

  const { id } = event.pathParameters;
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
};