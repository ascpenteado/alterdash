const storageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

const bindMockToWindow = (storage: "sessionStorage" | "localStorage") => {
  Object.defineProperty(window, storage, {
    value: storageMock,
  });
};

export { bindMockToWindow, storageMock };
