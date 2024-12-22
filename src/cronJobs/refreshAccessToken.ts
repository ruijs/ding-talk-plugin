import type { ActionHandlerContext, CronJobConfiguration } from "@ruiapp/rapid-core";
import DingTalkService from "~/services/DingTalkService";

export default {
  code: "dingTalk.refreshAccessToken",

  cronTime: "0 0 */1 * * *",

  async handler(ctx: ActionHandlerContext) {
    const { server, logger } = ctx;
    logger.info("Executing dingTalk.refreshAccessToken job...");

    const dingTalkService = server.getService<DingTalkService>("dingTalkService");
    await dingTalkService.refreshAccessTokens();

    logger.info("Finished dingTalk.refreshAccessToken job...");
  },
} satisfies CronJobConfiguration;
