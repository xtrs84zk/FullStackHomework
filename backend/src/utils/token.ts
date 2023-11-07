import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getSecret } from './secrets';

export const generateToken = async (userId: string) => {
  const { JWT_SECRET } = await getSecret();
  const payload = { userId };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
  return { token };
};

export const verifyToken = async (token: string) => {
  try {
    const { JWT_SECRET } = await getSecret();
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}

export const verifyEventToken = async (event: APIGatewayProxyEvent) => {
  const cookieHeader = event.headers['Cookie'] || event.headers['cookie'];
  if (!cookieHeader) {
    throw new Error('UNAUTHORIZED');
  }

  const cookies = cookieHeader.split('; ');
  const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));

  if (!tokenCookie) {
    throw new Error('UNAUTHORIZED');
  }

  const token = tokenCookie.split('=')[1];
  return verifyToken(token);
};

export const createRandomString = () => {
  return crypto.randomBytes(8).toString('hex');
};