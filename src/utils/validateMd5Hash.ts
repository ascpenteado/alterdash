export function validateMD5Hash(str: string) {
  // Regular expression to check if string is a MD5 hash
  const regexExp = /^[a-f0-9]{32}$/gi;
  const test = regexExp.test(str);
  return test;
}
