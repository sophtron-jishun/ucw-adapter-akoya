import type { AdapterMap } from "@repo/utils";
import { getTemplateAdapterMapObject } from "@ucp-npm/template-adapter";
import { getAkoyaAdapterMapObject } from "@ucp-npm/akoya-adapter";
import { adapterMapObject as testAdapterMapObject } from "./test-adapter";

import config from "./config";
import { get, set } from "./services/storageClient/redis";
import * as logger from "./infra/logger";
import aggregatorCredentials from './aggregatorCredentials'
const templateAdapterMapObject = getTemplateAdapterMapObject();
const akoyaAdapterMapyObject = getAkoyaAdapterMapObject({
  cacheClient: {
    set: set,
    get: get,
  },
  logClient: logger,
  aggregatorCredentials,
  envConfig: {
    HostUrl: config.HOST_URL,
    WebhookHostUrl: config.WebhookHostUrl
  },
});

// This is where you add adapters
export const adapterMap: Record<string, AdapterMap> = {
  ...akoyaAdapterMapyObject,
  ...templateAdapterMapObject,
  ...testAdapterMapObject,
};
export type Aggregator = keyof typeof adapterMap;
export const aggregators = Object.keys(adapterMap);
