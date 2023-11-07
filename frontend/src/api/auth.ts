import type { User } from "../types";
// TODO: get value from environment variable || aws or something
const apiURL = "http://127.0.0.1:3000/api";

export const authenticate = async (username: User['username'], password: string): Promise<User> => {
  const response = await fetch(`${apiURL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.status !== 200) {
    throw new Error('Failed to authenticate');
  }
  const data = await response.json();
  console.log("data", data);
  return data.user;
};

export const deauthenticate = async (): Promise<void> => {
  const response = await fetch(`${apiURL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (response.status !== 200) {
    document.cookie = 'token=; Max-Age=0;';
  }
};