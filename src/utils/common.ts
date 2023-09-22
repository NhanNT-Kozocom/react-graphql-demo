export const addQueryToUrl = (url: string, params: object) => {
  const separator = url.includes("?") ? "&" : "?";
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return `${url}${separator}${queryString}`;
};
