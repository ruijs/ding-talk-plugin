import type DingTalkServerApi from "../dingTalkServerApi";
import type { ApiResponseBody } from "../types/common-types";
import { DingTalkUserRobotGroupMessage } from "../types/im-types";

/**
 * 用户自定义机器人
 */
export default class UserCustomizedRobotApi {
  #manager: DingTalkServerApi;

  constructor(manager: DingTalkServerApi) {
    this.#manager = manager;
  }

  /**
   *
   * @param accessToken 自定义机器人调用接口的凭证。自定义机器人安装后webhook地址中的access_token值。详情参考[获取自定义机器人 Webhook 地址](https://open.dingtalk.com/document/orgapp/obtain-the-webhook-address-of-a-custom-robot)。
   * @param options
   * @returns
   */
  async sendGroupMessage(accessToken: string, message: DingTalkUserRobotGroupMessage) {
    const response = await this.#manager.oldApiRequest.post<ApiResponseBody<void>>(
      `/robot/send?access_token=${accessToken}`,
      message,
    );
    return response.data;
  }
}
