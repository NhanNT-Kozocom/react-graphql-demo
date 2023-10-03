export const addQueryToUrl = (url: string, params: object) => {
  const separator = url.includes("?") ? "&" : "?";
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return `${url}${separator}${queryString}`;
};

export const getRoutePath = (
  path: string,
  obj: { [key: string]: number }
): string => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      path = path.replace(`:${key}`, String(obj[key]));
    }
  }

  return path;
};
