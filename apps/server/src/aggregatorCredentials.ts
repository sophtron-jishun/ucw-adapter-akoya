import config from "./config";

const aggregatorCredentials = {
  akoyaSandbox: {
    partnerId: process.env.AkoyaPartnerId,
    appKey: process.env.AkoyaAppKey || 'test-appKey',
    secret: process.env.AkoyaSecret || 'test-app-secret',
    basePath: "https://sandbox-idp.ddp.akoya.com",
    productPath: "https://sandbox-idp.ddp.akoya.com",
    aggregator: "akoya_sandbox",
    apiVersion: 'v2',
    available: true
  },
  akoyaProd: {
    partnerId: process.env.AkoyaPartnerIdProd,
    appKey: process.env.AkoyaAppKeyProd || 'test-appKey',
    secret: process.env.AkoyaSecretProd || 'test-app-secret',
    basePath: "https://idp.ddp.akoya.com",
    productPath: "https://idp.ddp.akoya.com",
    aggregator: "akoya",
    apiVersion: 'v2',
    available: true
  }
};

export default aggregatorCredentials;
