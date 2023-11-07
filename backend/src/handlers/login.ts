import 'source-map-support/register';
import { connectDatabase, verifyUserByUsernameAndPassword } from '../database';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { generateToken } from '../utils/token';
import { withCookies } from '../utils/middleware';

export const handler = withCookies(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult & { token?: string }> => {
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
    const { token } = await generateToken(user.id);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful', user }),
      token,
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid username or password',
      }),
    };
  }
});
