import 'source-map-support/register';
import { connectDatabase, getReward } from '../database';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await connectDatabase();
  const { id } = event.pathParameters!;
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
