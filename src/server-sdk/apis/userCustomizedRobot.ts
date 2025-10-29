import type DingTalkServerApi from "../dingTalkServerApi";
import type { ApiResponseBody } from "../types/common-types";
import { SendGroupMessageOptions } from "../types/service-types";
import crypto from "crypto";

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
  async sendGroupMessage(options: SendGroupMessageOptions) {
    const { accessToken, secret, message } = options;

    // 获取当前unix时间戳，单位：毫秒
    const timestamp = Date.now();
    // 计算签名
    const sign = computeDingTalkSignature(secret, timestamp);

    // 发送请求
    const params = new URLSearchParams();
    params.append("access_token", accessToken);
    if (secret) {
      params.append("timestamp", timestamp.toString());
      params.append("sign", sign);
    }
    const response = await this.#manager.oldApiRequest.post<ApiResponseBody<void>>(`/robot/send`, message, {
      params,
    });
    return response.data;
  }
}

function computeDingTalkSignature(secret: string | undefined, timestamp: number): string | undefined {
  if (!secret) {
    return undefined;
  }

  const stringToSign = `${timestamp}\n${secret}`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(stringToSign);
  const signData = hmac.digest("base64");
  return signData;
}
