import * as jwt from 'jose'
import { addSeconds, getTime } from 'date-fns'

const secret_key_string = import.meta.env.VITE_APP_JWT_KEY_SECRET ?? ""; 
const secret_key_bytes = new TextEncoder().encode(secret_key_string);

type TokenData = {
  email: string,
  [key: string]: string,
}

export async function createToken(tokenData: TokenData): Promise<string> {
  const expDate = getTime(addSeconds(new Date(), 24 * 60 * 60)) / 1000;
  const tokenClass = new jwt.SignJWT({ ...tokenData, exp: expDate });
  tokenClass.setProtectedHeader({ alg: 'HS256' });
  const token = await tokenClass.sign(secret_key_bytes);
  return token
}

export function getPayloadToken (token: string): TokenData | null {
  const tokenData = jwt.decodeJwt(token);

  if (typeof tokenData === "string") return null

  return tokenData as TokenData ?? null
}

export async function decodeExpToken (token: string): Promise<number | null> {
  const tokenData = await jwt.jwtVerify(token, secret_key_bytes);
  const data = tokenData.payload 

  if (typeof data === "string") return null

  return data?.exp ?? null
}

export const isValidToken = async (accessToken: string | null) => {
  if (!accessToken) {
    return false;
  }

  const exp = await decodeExpToken(accessToken) || 0;

  const currentTime = Date.now() / 1000;

  return exp > currentTime;
};

export const tokenExpired = (exp: number) => {
  let expiredTimer;
  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  expiredTimer = setTimeout(() => {
    sessionStorage.removeItem('accessToken');
  }, timeLeft);

  clearTimeout(expiredTimer);
};

// ----------------------------------------------------------------------

export const setSession = async (accessToken: string | undefined) => {
  if (accessToken) {
    sessionStorage.setItem('accessToken', accessToken);

    const exp = await decodeExpToken(accessToken);
    tokenExpired(exp || 0);
  } else {
    sessionStorage.removeItem('accessToken');
  }
};
