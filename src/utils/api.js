import { supabase } from "./supabase";
import jwt from "jsonwebtoken";

const getClientId = () => process.env.NEXT_PUBLIC_CLIENT_ID;
const getClientSecret = () => process.env.NEXT_PUBLIC_CLIENT_SECRET;
const getApiAuthUrl = () => process.env.NEXT_PUBLIC_API_URL_AUTH;
export const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

const base64Encode = () => Buffer.from(`${getClientId()}:${getClientSecret()}`, 'utf8').toString('base64');

export const getToken = async () => {
  const tokenDB = await getTokenDB();
  let isExpired = true;

  if (tokenDB.length > 0) {
    const decode = jwt.decode(tokenDB[0].token);
    const now = Math.floor(Date.now() / 1000);

    if (decode.exp > now) {
      isExpired = false;
      return tokenDB[0].token;
    }

    isExpired = true;
  }
  console.log('Buscando token en soundcloud');

  const response = await fetch(`${getApiAuthUrl()}`, {
    method: 'POST',
    headers: {
      accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64Encode()}`,
    },
    body: new URLSearchParams({ 'grant_type': 'client_credentials' }),
  });

  const {access_token: token} = await response.json();
  if (isExpired) {
    console.log('Token expirado');
    await supabase.from('credentials').update({token: token}).eq('id', 1);
    console.log('Actualización de token en db');
  }
  return token;
}

const getTokenDB = async () => {
  let { data, error } = await supabase.from('credentials').select('*');
  return data;
}

export const fetchData = async (query) => {
  try {
    const token = await getToken();

    const response = await fetch(
      `${getApiUrl()}${query}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Hubo un error al obtener la data:', error);
  }
};