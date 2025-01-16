import type { VCDependencies } from "./models";
import AkoyaClient from './apiClient';

const createAkoyaGetVC = (sandbox: boolean, dependencies: VCDependencies) => {
  return async ({
                  institutionId,
                  type,
                  userId,
                  accountId
                }: {
    institutionId: string
    type: string
    userId: string
    accountId?: string
  }) => {

    const { logClient, envConfig, aggregatorCredentials } = dependencies;
    const configuration = sandbox
      ? aggregatorCredentials.akoyaSandbox
      : aggregatorCredentials.akoyaProd;
    const vcClient =  new AkoyaClient(configuration, logClient, envConfig)
    let token = await vcClient.getIdToken(userId)
    switch(type){
      case 'identity':
        let customer = await vcClient.getCustomerInfo(institutionId, token.id_token);
        return {credentialSubject: {customers: [customer]}};
      case 'accounts':
        let accounts = await vcClient.getAccountInfo(institutionId, [], token.id_token);
        return {credentialSubject: {accounts}};
      case 'transactions':
        let allAccounts = await vcClient.getAccountInfo(institutionId, [], token.id_token);
        let accountId = (Object.values(allAccounts[0])[0] as any).accountId;
        const transactions = await vcClient.getTransactions(institutionId, accountId, token.id_token);
        return {credentialSubject: {transactions}};
    }
  };
};

export const createAkoyaProdGetVC = (dependencies: VCDependencies) => createAkoyaGetVC(false, dependencies);
export const createAkoyaSandboxGetVC = (dependencies: VCDependencies) => createAkoyaGetVC(true, dependencies);
