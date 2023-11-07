import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export function withCookies(handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult & { token?: string }>) {
  return async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const response = await handler(event);

    if (response.token) {
      let cookie = '';
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        cookie = `token=${response.token}; HttpOnly; SameSite=Strict`;
      }
      cookie = `token=${response.token}; HttpOnly; Secure; SameSite=Strict`;
      response.headers = response.headers || {};
      response.headers['Set-Cookie'] = cookie;
      delete response.token;
    }

    return response;
  };
};
