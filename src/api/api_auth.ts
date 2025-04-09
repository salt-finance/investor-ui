import { get } from 'utils/http_client';

export const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');

  window.location.replace(window.location.origin + window.location.pathname);
};

export const loginWithToken = (token: string) => {
  localStorage.setItem('token', token);
  localStorage.removeItem('expiry');
};

export const expiry = 60;

export const tokenTest = async () => {
  const token = localStorage.getItem('token');

  const secondsLeft = expiryTimeout()?.secondsLeft;

  if (token === null) {
    return { data: null, error: 'No token found' };
  }

  // No expiry data, attempt refresh;
  if (secondsLeft === undefined) {
    return refreshToken();
  }

  // Expired
  if (secondsLeft <= 0) {
    return { data: null, error: 'Expired' };
  }

  // 30 seconds to expiry, ask for refresh
  if (secondsLeft <= expiry) {
    return refreshToken();
  }

  return { data: token, error: null };
};

export const startWithEmail = async (email: string) => {
  localStorage.setItem('token', email);
  return get<any>(`/auth/email`);
};

const refreshToken = async () => {
  const result = await get<any>('/token-test');

  if (result.data) {
    const token = result.data.response['token'];
    const expiry = result.data.response['expiresAt'];

    if (expiry) {
      localStorage.setItem('expiry', expiry);
    }
    localStorage.setItem('token', token);
  }else{
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
  }

  return result;
};

export const expiryTimeout = () => {
  const expiry = localStorage.getItem('expiry');
  const now = Date.now();

  if (!expiry) {
    return;
  }
  const expiryMs = parseInt(expiry) - now;

  if (expiryMs < 0) {
    return { date: new Date(now), secondsLeft: -1 };
  }

  const date = new Date(expiryMs);

  return {
    date: date,
    secondsLeft:
      date.getUTCHours() * 3600 +
      date.getUTCMinutes() * 60 +
      date.getUTCSeconds()
  };
};
