import Cookies from 'js-cookie';

export const SESSION = 'session';

export function logOut() {
  Cookies.remove(SESSION);
}

export function setSession(data: any) {
  try {
      Cookies.set(SESSION, JSON.stringify(data), { expires: data?.rememberMe ? 30 : null });
  } catch (error) {
      console.error("Failed to set session:", error);
  }
}


export function getSessionData() {
  try {
    const data = Cookies.get(SESSION);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to get session data:", error);
    return {};
  }
}

export function deleteSessionData() {
 Cookies.remove(SESSION);
}