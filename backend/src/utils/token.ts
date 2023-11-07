import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { APIGatewayProxyEvent } from 'aws-lambda';


const secret = process.env.JWT_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;

if (!secret || !refreshSecret) {
  throw new Error('Missing JWT_SECRET or JWT_REFRESH_SECRET environment variable');
}

export const generateToken = (userId: string) => {
  const payload = { userId };
  const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Token expires in 1 hour
  const refreshToken = jwt.sign({ token }, refreshSecret); // Refresh token does not expire
  return { token, refreshToken };
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}


// TODO: explore using a cookie instead of Authorization header
export const verifyEventCookie = (event: APIGatewayProxyEvent) => { 
  const cookie = event.headers.Cookie;
  if (!cookie) {
    throw new Error('UNAUTHORIZED');
  }
  const token = cookie.split('=')[1];
  return verifyToken(token);
};

export const verifyEventToken = (event: APIGatewayProxyEvent) => {
  // TODO: remove temporary workaround for local testing
  return;
  const token = event.headers.Authorization;
  if (!token) {
    throw new Error('UNAUTHORIZED');
  }
  return verifyToken(token);

}

export const refreshToken = (refreshToken: string) => {
  try {
    jwt.verify(refreshToken, refreshSecret);
    const { userId } = jwt.decode(refreshToken) as jwt.JwtPayload;
    return generateToken(userId);
  } catch (err) {
    return null;
  }
}

export const createRandomString = () => {
  return crypto.randomBytes(8).toString('hex');
};