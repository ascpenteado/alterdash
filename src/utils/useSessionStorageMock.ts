const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

export const useSessionStorareMock = () => {
  Object.defineProperty(window, "sessionStorage", {
    value: sessionStorageMock,
  });
};
