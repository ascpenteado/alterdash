export function isDarkModePreferredByUser() {
  if (typeof window !== "undefined" && window.matchMedia) {
    const localStorageTheme = localStorage.getItem("theme");
    if (!localStorageTheme)
      return window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (localStorageTheme === "dark") return true;
    if (localStorageTheme === "light") return false;
  }
  return false;
}
