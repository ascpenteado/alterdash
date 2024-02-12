export const useStorage = (storageType: "local" | "session" = "local") => {
  const storage = storageType === "local" ? localStorage : sessionStorage;
  return {
    get: (key: string) => storage.getItem(key),
    set: (key: string, value: string) => storage.setItem(key, value),
    remove: (key: string) => storage.removeItem(key),
  };
};
