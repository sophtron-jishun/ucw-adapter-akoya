import config from "./config";

const aggregatorCredentials = {
  akoyaSandbox: {
    clientId: config.AKOYA_CLIENT_ID || 'test-appKey',
    secret: config.AKOYA_SECRET || 'test-app-secret',
    basePath: "https://sandbox-idp.ddp.akoya.com",
    productPath: "https://sandbox-idp.ddp.akoya.com",
    aggregator: "akoya_sandbox",
    apiVersion: 'v2',
    available: true
  },
  akoyaProd: {
    clientId: config.AKOYA_CLIENT_ID_PROD || 'test-appKey',
    secret: config.AKOYA_SECRET_PROD || 'test-app-secret',
    basePath: "https://idp.ddp.akoya.com",
    productPath: "https://idp.ddp.akoya.com",
    aggregator: "akoya",
    apiVersion: 'v2',
    available: true
  }
};

export default aggregatorCredentials;
