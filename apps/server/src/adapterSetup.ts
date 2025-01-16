import type { AdapterMap } from "@repo/utils";
import { getTemplateAdapterMapObject } from "@ucp-npm/template-adapter";
import { getAkoyaAdapterMapObject } from "@ucp-npm/akoya-adapter";

import config from "./config";
import { get, set } from "./services/storageClient/redis";
import * as logger from "./infra/logger";
const templateAdapterMapObject = getTemplateAdapterMapObject();
const akoyaAdapterMapyObject = getAkoyaAdapterMapObject({
  cacheClient: {
    set: set,
    get: get,
  },
  logClient: logger,
  aggregatorCredentials: {
    akoyaSandbox: {
      clientId: config.AKOYA_CLIENT_ID,
      secret: config.AKOYA_SECRET,
      basePath: "https://sandbox-idp.ddp.akoya.com",
      productPath: "https://sandbox-products.ddp.akoya.com",
      aggregator: "akoya_sandbox",
      available: true
    },
    akoyaProd: {
      clientId: config.AKOYA_CLIENT_ID_PROD,
      secret: config.AKOYA_SECRET_PROD,
      basePath: "https://idp.ddp.akoya.com",
      productPath: "https://products.ddp.akoya.com",
      aggregator: "akoya",
      available: true
    }
  },
  envConfig: {
    HostUrl: config.HOST_URL,
    WebhookHostUrl: config.WebhookHostUrl
  },
});

// This is where you add adapters
export const adapterMap: Record<string, AdapterMap> = {
  ...akoyaAdapterMapyObject,
  ...templateAdapterMapObject,
};
export type Aggregator = keyof typeof adapterMap;
export const aggregators = Object.keys(adapterMap);
