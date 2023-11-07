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
  await removeReward(id);
  return {
    statusCode: 204,
    body: JSON.stringify({}),
  };
});