import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { verifyEventToken } from "./token";

export function withCookies(handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult & { token?: string }>) {
  return async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const response = await handler(event);

    if (response.token) {
      let cookie = '';
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        cookie = `token=${response.token};`;
      } else {
        cookie = `token=${response.token}; HttpOnly; Secure; SameSite=Strict`;
      }
      response.headers = response.headers || {};
      response.headers['Set-Cookie'] = cookie;
      delete response.token;
    }

    return response;
  };
};

export function withAuth(handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>) {
  return async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      await verifyEventToken(event);
    } catch (err) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }
    return await handler(event);
  }
};

export function withLogout(handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>) {
  return async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const response = await handler(event);

    let cookie = '';
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      cookie = `token=; Max-Age=0;`;
    } else {
      cookie = `token=; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
    }
    response.headers = response.headers || {};
    response.headers['Set-Cookie'] = cookie;

    return response;
  };
};