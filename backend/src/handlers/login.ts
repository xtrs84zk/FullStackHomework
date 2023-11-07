import 'source-map-support/register';
import { connectDatabase, verifyUserByUsernameAndPassword } from '../database';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { generateToken } from '../utils/token';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing login payload',
      }),
    };
  }
  const { username, password } = JSON.parse(event.body!);
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing username or password',
      }),
    };
  }
  await connectDatabase();
  try {
    const user = await verifyUserByUsernameAndPassword(username, password);
    const { token } = generateToken(user.id);
    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid username or password',
      }),
    };
  }
};
