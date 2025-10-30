const getClientId = () => process.env.NEXT_PUBLIC_CLIENT_ID;
const getClientSecret = () => process.env.NEXT_PUBLIC_CLIENT_SECRET;
const getApiAuthUrl = () => process.env.NEXT_PUBLIC_API_URL_AUTH;
export const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

const base64Encode = () => Buffer.from(`${getClientId()}:${getClientSecret()}`, 'utf8').toString('base64');

export const getToken = async () => {
  const response = await fetch(`${getApiAuthUrl}`, {
    method: 'POST',
    headers: {
      accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64Encode()}`,
    },
    body: new URLSearchParams({ 'grant_type': 'client_credentials' }),
  });

  const {access_token: token} = await response.json();
  return token;
}
