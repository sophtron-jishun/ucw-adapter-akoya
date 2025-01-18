import 'dotenv/config'
import type { VCDependencies } from "./models";
import { logClient } from "./test/utils/logClient";
import { aggregatorCredentials } from "./adapter.test";
import { VCDataTypes } from "./contract";
import { createAkoyaSandboxGetVC, createAkoyaProdGetVC } from "./createVc";

const dependencies: VCDependencies = {
  logClient,
  aggregatorCredentials,
  envConfig: process.env
};

describe("getVc", () => {
  const institutionId = "mikomo";
  const userId = "userId";
  const accountId = "839502593";

  it("gets accounts VC from Sandbox environment", async () => {
    const vc = await createAkoyaSandboxGetVC(dependencies)({
      connectionId: institutionId,
      type: VCDataTypes.ACCOUNTS,
      userId
    });
    expect(vc).toEqual({
      credentialSubject: {
        "accounts": [
          {
            "investmentAccount": {
              "accountId": "839502593",
              "accountType": "College Savings",
              "balanceType": "ASSET",
              "currency": {
                "currencyCode": "USD"
              },
              "nickname": "529 for Kid"
            }
          },
          {
            "depositAccount": {
              "accountId": "33fbd9e5-9cc3-3d7d-15b3-70d97d87ca1d",
              "accountType": "SAVINGS",
              "balanceType": "ASSET",
              "currency": {
                "currencyCode": "USD",
                "originalCurrencyCode": "USD"
              },
              "description": "Savings",
              "fiAttributes": [
                {
                  "name": "eStatements",
                  "value": "True"
                }
              ],
              "interestRate": 0.01,
              "lineOfBusiness": "CONSUMER",
              "nickname": "Savings - 8537",
              "parentAccountId": "33fbd9e5-9cc3-3d7d-15b3-70d97d87ca1d",
              "status": "OPEN",
              "transactionsIncluded": false
            }
          }
        ]
      }
    });
  });

  it("gets identity VC from Sandbox environment", async () => {
    const vc = await createAkoyaSandboxGetVC(dependencies)({
      connectionId: institutionId,
      accountId,
      type: VCDataTypes.IDENTITY,
      userId
    });
    expect(vc).toEqual({
        "credentialSubject": {
          customers: [
            {
              "customerId": "string",
              "name": {
                "first": "string",
                "middle": "string",
                "last": "string",
                "prefix": "string",
                "suffix": "string",
                "company": "string"
              },
              "businessCustomer": {
                "name": "string",
                "registeredAgents": [
                  {
                    "first": "string",
                    "middle": "string",
                    "last": "string",
                    "prefix": "string",
                    "suffix": "string",
                    "company": "string"
                  }
                ],
                "registeredId": "string",
                "industryCode": {
                  "type": "string",
                  "code": "string"
                },
                "domicile": {
                  "region": "string",
                  "country": "string"
                }
              },
              "addresses": [
                {
                  "line1": "string",
                  "line2": "string",
                  "line3": "string",
                  "city": "string",
                  "state": "string",
                  "region": "string",
                  "postalCode": "string",
                  "country": "string",
                  "type": "string"
                }
              ],
              "telephones": [
                {
                  "number": "string",
                  "type": "HOME",
                  "country": "string"
                }
              ],
              "email": [
                "string"
              ],
              "accounts": [
                {
                  "accountId": "string",
                  "relationship": "AUTHORIZED_USER"
                }
              ]
            }
          ]
        },
    });
  });

  it("gets transactions VC from Prod environment", async () => {
    const vc = await createAkoyaProdGetVC(dependencies)({
      connectionId: institutionId,
      type: VCDataTypes.TRANSACTIONS,
      userId,
      accountId
    });
    expect(vc).toEqual({
      "credentialSubject":{
        "transactions": [
          {
            "depositTransaction": {
              "accountId": "33fbd9e5-9cc3-3d7d-15b3-70d97d87ca1d",
              "amount": 0.29,
              "debitCreditMemo": "CREDIT",
              "description": "Interest Paid This Period",
              "postedTimestamp": "2021-01-27T00:00:00Z",
              "status": "POSTED",
              "transactionId": "22ef95ee-6127-382d-a28c-5b8b7a15d2eb",
              "transactionTimestamp": "2021-01-27T00:00:00Z",
              "transactionType": "INTEREST"
            }
          },
          {
            "depositTransaction": {
              "accountId": "33fbd9e5-9cc3-3d7d-15b3-70d97d87ca1d",
              "amount": 0.13,
              "debitCreditMemo": "CREDIT",
              "description": "Interest Paid This Period",
              "postedTimestamp": "2021-02-24T00:00:00Z",
              "status": "POSTED",
              "transactionId": "f3fced9d-a7a2-4194-5a17-a2a9b09ff64a",
              "transactionTimestamp": "2021-02-24T00:00:00Z",
              "transactionType": "INTEREST"
            }
          }
        ],
      },
    });
  });
});
