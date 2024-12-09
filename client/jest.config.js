module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)" // axios를 변환 대상으로 추가
    ],
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy",
      "\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/src/tests/__mocks__/fileMock.js"
    },
    testEnvironment: "jsdom"
  };
  