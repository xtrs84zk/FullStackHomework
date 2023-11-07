import 'source-map-support/register';
import { connectDatabase, getReward } from '../database';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
  const reward = await getReward(id);

  if (!reward) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Reward not found',
      }),
    };
  };

  return {
    statusCode: 200,
    body: JSON.stringify(reward),
  };
};
