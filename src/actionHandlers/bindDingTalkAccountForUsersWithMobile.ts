import type { ActionHandlerContext } from "@ruiapp/rapid-core";
import type DingTalkPlugin from "../DingTalkPlugin";

export const code = "bindDingTalkAccountForUsersWithMobile";

export type BindDingTalkAccountForUsersWithMobileActionHandlerConfig = {};

export async function handler(
  plugin: DingTalkPlugin,
  ctx: ActionHandlerContext,
  config: BindDingTalkAccountForUsersWithMobileActionHandlerConfig,
) {
  const { routerContext: routeContext } = ctx;

  const bindResult = await plugin.dingTalkService.bindDingTalkAccountForUsersWithMobile(routeContext);

  ctx.output = bindResult;
}
