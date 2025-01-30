import { AkoyaAdapter } from "./adapter";
import * as contract from "./contract";
import { createAkoyaProdDataAdapter, createAkoyaSandboxDataAdapter } from "./dataAdapter";
import type { AdapterDependencies } from "./models";

export const getAkoyaAdapterMapObject = (dependencies: AdapterDependencies) => {
  return {
    akoya: {
      testInstitutionAdapterName: "akoya_sandbox",
      dataAdapter: createAkoyaProdDataAdapter(dependencies),
      createWidgetAdapter: () => new AkoyaAdapter({
        sandbox: false,
        // sessionId: 'test-session',
        dependencies
      })
    },
    akoya_sandbox: {
      dataAdapter: createAkoyaSandboxDataAdapter(dependencies),
      createWidgetAdapter: () => new AkoyaAdapter({
        sandbox: true,
        // sessionId: 'test-session',
        dependencies
      })
    }
  };
};

export * from "./models";
export { contract };
