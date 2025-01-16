import { AkoyaAdapter } from "./adapter";
import * as contract from "./contract";
import { createAkoyaSandboxGetVC, createAkoyaProdGetVC } from "./createVc";
import type { AdapterDependencies } from "./models";

export const getAkoyaAdapterMapObject = (dependencies: AdapterDependencies) => {
  return {
    akoya: {
      testInstitutionAdapterName: "akoya_sandbox",
      vcAdapter: createAkoyaProdGetVC(dependencies),
      createWidgetAdapter: () => new AkoyaAdapter({
        sandbox: false,
        // sessionId: 'test-session',
        dependencies
      })
    },
    akoya_sandbox: {
      vcAdapter: createAkoyaSandboxGetVC(dependencies),
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
