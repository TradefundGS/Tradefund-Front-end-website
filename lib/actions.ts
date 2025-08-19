import Cookies from 'js-cookie';

export const SESSION = 'session';

// Enhanced session management with better error handling
export function logOut(): void {
  try {
    Cookies.remove(SESSION, { path: '/' });
    // Also clear from all possible paths
    Cookies.remove(SESSION);
  } catch (error) {
    console.error("Failed to remove session cookie:", error);
  }
}

export function setSession(data: any): boolean {
  try {
    const sessionData = {
      ...data,
      timestamp: Date.now(), // Add timestamp for session validation
    };
    
    const cookieOptions = {
      expires: data?.rememberMe ? 30 : 1, // Default to 1 day if not remember me
      secure: process.env.NODE_ENV === 'production', // Only use secure in production
      sameSite: 'lax' as const,
      path: '/'
    };
    
    Cookies.set(SESSION, JSON.stringify(sessionData), cookieOptions);
    return true;
  } catch (error) {
    console.error("Failed to set session:", error);
    return false;
  }
}

export function getSessionData(): any {
  try {
    const data = Cookies.get(SESSION);
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    
    // Check if session is expired (optional)
    if (parsed.timestamp && Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000 && !parsed.rememberMe) {
      deleteSessionData();
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error("Failed to get session data:", error);
    deleteSessionData(); // Clear corrupted session
    return null;
  }
}

export function deleteSessionData(): void {
  try {
    Cookies.remove(SESSION, { path: '/' });
    Cookies.remove(SESSION);
  } catch (error) {
    console.error("Failed to delete session data:", error);
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const session = getSessionData();
  return Boolean(session && session.token);
}

// Get user data from session
export function getUserData(): any {
  const session = getSessionData();
  return session?.user || null;
}
