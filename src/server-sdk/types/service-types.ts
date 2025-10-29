import { DingTalkUserRobotGroupMessage } from "./im-types";

export type SendGroupMessageOptions = {
  accessToken: string;
  secret?: string;
  message: DingTalkUserRobotGroupMessage;
};
