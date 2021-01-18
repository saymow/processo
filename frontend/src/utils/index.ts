export const restoreCredentials = () => {
  const token = localStorage.getItem("user:credentials");

  if (!token) throw new Error("Local user credentials not found");

  return token;
};

export const storeCredentials = (token: string) => {
  localStorage.setItem("user:credentials", token);
};

export const removeCredentials = () => {
  localStorage.removeItem("user:credentials");
};
