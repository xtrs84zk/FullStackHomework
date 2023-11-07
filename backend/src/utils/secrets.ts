import * as AWS from 'aws-sdk';
const secretsManager = new AWS.SecretsManager();

type Secret = {
  'MONGODB_URI': string
  'MONGODB_USER': string
  'MONGODB_PASSWORD': string
  'JWT_SECRET': string
  'JWT_REFRESH_SECRET': string
}

export async function getSecret(): Promise<Secret> {
  const data = await secretsManager.getSecretValue({ SecretId: 'secret' }).promise();
  return JSON.parse(data.SecretString!);
}