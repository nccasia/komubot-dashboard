const token = "token";

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(token, accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(token);
};

export const removeAccessToken = () => {
  return localStorage.removeItem(token);
};
