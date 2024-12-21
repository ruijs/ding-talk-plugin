import type { IRpdServer, RouteContext } from "@ruiapp/rapid-core";
import type { DingTalkMessage } from "../server-sdk/dingTalkSdkTypes";
import type { DingTalkServerApiConfig } from "../server-sdk/dingTalkServerApi";
import DingTalkServerApi from "../server-sdk/dingTalkServerApi";
import type { AuthAccount, OcUser } from "../types/entity-types";
import { first, trim } from "lodash";

function newDingTalkServerApiNotInitializedError() {
  return new Error(
    "DingTalk server api was not initialized. Please check if the settings of ding talk intergration were set properly."
  );
}

const AUTH_PROVIDER_CODE = "dingTalk";

export default class DingTalkService {
  #server: IRpdServer;
  #apiConfig: DingTalkServerApiConfig;
  #serverApi?: DingTalkServerApi;

  constructor(server: IRpdServer) {
    this.#server = server;
    this.#apiConfig = {};
  }

  initService(apiConfig: DingTalkServerApiConfig) {
    this.#apiConfig = apiConfig;

    if (apiConfig.appKey && apiConfig.appSecret && apiConfig.agentId) {
      this.#serverApi = new DingTalkServerApi(this.#server, apiConfig);
    }
  }

  async getDingTalkUserInfoByAuthCode(
    routeContext: RouteContext,
    authCode: string
  ) {
    if (!this.#serverApi) {
      throw newDingTalkServerApiNotInitializedError();
    }

    if (!authCode) {
      throw new Error("DingTalk auth code is required.");
    }

    const getUserInfoByAuthCodeResult =
      await this.#serverApi.auth.getUserInfoByAuthCode(authCode);
    if (getUserInfoByAuthCodeResult.errcode != 0) {
      throw new Error(getUserInfoByAuthCodeResult.errmsg);
    }

    const getUserByUnionIdResult = await this.#serverApi.user.getUserByUnionId(
      getUserInfoByAuthCodeResult.result.unionid
    );
    if (getUserByUnionIdResult.errcode != 0) {
      throw new Error(getUserByUnionIdResult.errmsg);
    }
    return getUserByUnionIdResult.result;
  }

  async sendWorkMessage(
    routeContext: RouteContext,
    userIds: number[],
    message: DingTalkMessage
  ) {
    if (!this.#serverApi) {
      throw newDingTalkServerApiNotInitializedError();
    }

    if (!userIds || !userIds.length) {
      return;
    }

    const userManager = this.#server.getEntityManager<OcUser>("oc_user");
    const users = await userManager.findEntities({
      routeContext,
      filters: [
        {
          operator: "in",
          field: "id",
          value: userIds,
        },
      ],
      relations: {
        accounts: {
          properties: ["externalAccountId"],
          filters: [
            {
              operator: "eq",
              field: "providerCode",
              value: AUTH_PROVIDER_CODE,
            },
          ],
        },
      },
    });

    const dingTalkUserIds: string[] = [];
    for (const user of users) {
      const dingTalkAccount: AuthAccount | undefined = first(user.accounts);
      if (dingTalkAccount && dingTalkAccount.externalAccountId) {
        dingTalkUserIds.push(dingTalkAccount.externalAccountId);
      }
    }

    if (dingTalkUserIds.length) {
      return await this.#serverApi.im.sendWorkMessage({
        agent_id: this.#apiConfig.agentId!,
        userid_list: dingTalkUserIds.join(","),
        msg: message,
      });
    }

    return {};
  }

  async bindDingTalkAccountForUsersWithMobile(routeContext: RouteContext) {
    if (!this.#serverApi) {
      throw newDingTalkServerApiNotInitializedError();
    }

    const bindResult = {
      userWithMobileCount: 0,
      totalBindedCount: 0,
      newBindedCount: 0,
    };

    const userManager = this.#server.getEntityManager<OcUser>("oc_user");
    const usersWithMobile = await userManager.findEntities({
      routeContext,
      filters: [
        {
          operator: "notNull",
          field: "mobile",
        },
      ],
      relations: {
        accounts: {
          filters: [
            {
              operator: "eq",
              field: "providerCode",
              value: AUTH_PROVIDER_CODE,
            },
          ],
        },
      },
    });
    bindResult.userWithMobileCount = usersWithMobile.length;

    const accountManager =
      this.#server.getEntityManager<AuthAccount>("auth_account");
    for (const user of usersWithMobile) {
      const dingTalkAccount = first(user.accounts);

      if (dingTalkAccount) {
        bindResult.totalBindedCount += 1;
        continue;
      }

      const mobile = trim(user.mobile);
      if (!mobile) {
        bindResult.userWithMobileCount -= 1;
        continue;
      }
      const getDingTalkUserByMobileResult =
        await this.#serverApi.user.getUserByMobile(mobile);
      const dingTalkUserId = getDingTalkUserByMobileResult.result?.userid;
      if (dingTalkUserId) {
        await accountManager.createEntity({
          entity: {
            user,
            providerCode: AUTH_PROVIDER_CODE,
            externalAccountId: dingTalkUserId,
          } satisfies Partial<AuthAccount>,
        });
        bindResult.totalBindedCount += 1;
        bindResult.newBindedCount += 1;
      }
    }

    return bindResult;
  }
}
