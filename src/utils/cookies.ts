import Cookies from 'js-cookie';

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes,
): void => {
  Cookies.set(name, value, options);
};

export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};

export const clearAllCookies = (): void => {
  Object.keys(Cookies.get()).forEach(cookieName => {
    Cookies.remove(cookieName);
  });
};
