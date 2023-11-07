import 'source-map-support/register';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { withLogout } from '../utils/middleware';

export const handler = withLogout(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Logout successful' }),
  };
});