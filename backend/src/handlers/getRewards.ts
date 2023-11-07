import 'source-map-support/register';
import { connectDatabase, getRewards } from '../database';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await connectDatabase();
  const rewards = await getRewards();

  return {
    statusCode: 200,
    body: JSON.stringify(rewards),
  };
};