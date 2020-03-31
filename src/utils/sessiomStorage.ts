const storage = window.sessionStorage;

const isJson = (value: any) =>
  value &&
  (Object.prototype.toString.call(value) === "[object Object]" ||
    Array.isArray(value));

export const put = (key: string, value: any) => {
  storage.setItem(key, isJson(value) ? JSON.stringify(value) : value);
};

export const get = <T>(key: string, defaultValue?: T): T => {
  const data = storage.getItem(key) || "[]";

  if (data === null && defaultValue !== undefined) {
    return defaultValue;
  }

  return JSON.parse(data);
};

export const remove = (key: string) => {
  return storage.removeItem(key);
};

export const clear = () => {
  storage.clear();
};
