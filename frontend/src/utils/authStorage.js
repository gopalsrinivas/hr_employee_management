const STORAGE_KEY = "hr_auth_session";

const isBrowser = () => typeof window !== "undefined";

export const getAuthSession = () => {
  if (!isBrowser()) {
    return null;
  }

  const rawSession = window.localStorage.getItem(STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch (_error) {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const saveAuthSession = (session) => {
  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }
};

export const clearAuthSession = () => {
  if (isBrowser()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
};
