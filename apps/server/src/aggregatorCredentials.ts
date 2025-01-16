import config from "./config";

const aggregatorCredentials = {
  akoyaSandbox: {
    clientId: config.AKOYA_CLIENT_ID,
    secret: config.AKOYA_SECRET,
    basePath: "sandbox-idp.ddp.akoya.com",
    productPath: "sandbox-products.ddp.akoya.com",
    aggregator: "akoya_sandbox",
    apiVersion: 'v2',
    available: true,
  },
  akoyaProd: {
    clientId: config.AKOYA_CLIENT_ID_PROD,
    secret: config.AKOYA_SECRET_PROD,
    basePath: "idp.ddp.akoya.com",
    productPath: "products.ddp.akoya.com",
    aggregator: "akoya",
    apiVersion: 'v2',
    available: true,
  },
};

export default aggregatorCredentials;
