module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testMatch: ["<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)"],
  transformIgnorePatterns: ["/node_modules/(?!(vuetify|axios)/)"],
  verbose: true,
};
