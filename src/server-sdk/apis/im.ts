import type { DingTalkMessage } from "../dingTalkSdkTypes";
import type DingTalkServerApi from "../dingTalkServerApi";
import type { ApiResponseBody } from "../types/common-types";

export type SendWorkMessageOptions = {
  agent_id: string;
  userid_list?: string;
  dept_id_list?: string;
  to_all_user?: boolean;
  msg: DingTalkMessage;
};

export type SendWorkMessageResult = {
  /**
   * accessToken的过期时间，单位秒。
   */
  expireIn: number;
  /**
   * 生成的accessToken。
   */
  accessToken: string;
};

export default class ImApi {
  #manager: DingTalkServerApi;

  constructor(manager: DingTalkServerApi) {
    this.#manager = manager;
  }

  async sendWorkMessage(options: SendWorkMessageOptions) {
    const accessToken = await this.#manager.getAccessToken();
    const response = await this.#manager.oldApiRequest.post<ApiResponseBody<SendWorkMessageResult>>(
      `/topapi/message/corpconversation/asyncsend_v2?access_token=${accessToken}`,
      options,
    );
    return response.data;
  }
}
