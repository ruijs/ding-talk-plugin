import type { IPluginActionHandler } from "@ruiapp/rapid-core";
import * as bindDingTalkAccountForUsersWithMobile from "./bindDingTalkAccountForUsersWithMobile";
import * as sendDingTalkWorkMessage from "./sendDingTalkWorkMessage";
import * as signinWithDingTalkAuthCode from "./signinWithDingTalkAuthCode";

export default [
  bindDingTalkAccountForUsersWithMobile as any,
  sendDingTalkWorkMessage as any,
  signinWithDingTalkAuthCode as any,
] satisfies IPluginActionHandler[];
