import type { ActionHandlerContext } from "@ruiapp/rapid-core";
import type DingTalkPlugin from "../DingTalkPlugin";
import type { DingTalkMessage } from "../server-sdk/types/im-types";

export const code = "sendDingTalkWorkMessage";

export type SendDingTalkWorkMessageActionHandlerConfig = {};

export type SendDingTalkWorkMessageInput = {
  userIds: number[];
  message: DingTalkMessage;
};

export async function handler(plugin: DingTalkPlugin, ctx: ActionHandlerContext, config: SendDingTalkWorkMessageActionHandlerConfig) {
  const { routerContext: routeContext } = ctx;
  const input: SendDingTalkWorkMessageInput = ctx.input;

  const bindResult = await plugin.dingTalkService.sendWorkMessage(routeContext, input.userIds, input.message);

  ctx.output = bindResult;
}
