module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy",
      "\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/src/tests/__mocks__/fileMock.js"
    },
    testEnvironment: "jsdom"
  };
  