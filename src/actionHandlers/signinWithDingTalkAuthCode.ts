import type { ActionHandlerContext } from "@ruiapp/rapid-core";
import { setCookie } from "@ruiapp/rapid-core";
import type DingTalkPlugin from "../DingTalkPlugin";
import AuthService from "@ruiapp/rapid-core/dist/plugins/auth/services/AuthService";
import { OcUser } from "../types/entity-types";

export const code = "signinWithDingTalkAuthCode";

export type SigninWithAuthCodeActionHandlerConfig = {};

export type SigninWithAuthCodeInput = {
  authCode: string;
};

export async function handler(
  plugin: DingTalkPlugin,
  ctx: ActionHandlerContext,
  config: SigninWithAuthCodeActionHandlerConfig,
) {
  const { routerContext: routeContext, server } = ctx;
  const input: SigninWithAuthCodeInput = ctx.input;

  const getDingTalkUserInfoResult = await plugin.dingTalkService.getDingTalkUserInfoByAuthCode(
    routeContext,
    input.authCode,
  );
  const dingTalkUserId = getDingTalkUserInfoResult?.userid;
  if (!dingTalkUserId) {
    throw new Error("无效的Auth Code。无法获取钉钉用户信息。");
  }

  const userEntityManager = server.getEntityManager<OcUser>("oc_user");
  const user = await userEntityManager.findEntity({
    properties: ["id", "login"],
    filters: [
      {
        operator: "exists",
        field: "accounts",
        filters: [
          {
            operator: "eq",
            field: "providerCode",
            value: "dingTalk",
          },
          {
            operator: "eq",
            field: "externalAccountId",
            value: dingTalkUserId,
          },
        ],
      },
    ],
  });

  if (!user) {
    throw new Error("登录失败。您不是本系统用户。");
  }

  const authService = server.getService<AuthService>("authService");
  const token = authService.createUserAccessToken({
    issuer: "dingTalk",
    userId: user.id,
    userLogin: user.login,
  });

  setCookie(routeContext.response.headers, {
    name: ctx.server.config.sessionCookieName,
    value: token,
    path: "/",
  });

  ctx.output = {
    token,
  };
}
