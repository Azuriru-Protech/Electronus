export const debugPrint = (...args: any) => {
  if (isDebug()) {
    console.log(...args);
  }
};

export const isDebug = () => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getSessionId = () => {
  return sessionStorage.getItem("sessionId");
};
