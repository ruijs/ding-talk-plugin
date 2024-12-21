import DingTalkServerApi from "../dingTalkServerApi";
import {
  GetAccessTokenOfInternalAppOptions,
  GetAccessTokenOfInternalAppResult,
  GetAccessTokenOptions,
  GetAccessTokenResult,
  GetUserInfoByAuthCodeResult,
} from "../types/auth-types";
import { ApiResponseBody } from "../types/common-types";

export default class AuthApi {
  #manager: DingTalkServerApi;

  constructor(manager: DingTalkServerApi) {
    this.#manager = manager;
  }

  /**
   * https://open.dingtalk.com/document/orgapp/api-gettoken
   * @param options
   * @returns
   */
  async getAccessToken(options: GetAccessTokenOptions) {
    const response = await this.#manager.newApiRequest.post<GetAccessTokenResult>(`/v1.0/oauth2/${options.corpId}/token`, {
      client_id: options.appKey,
      client_secret: options.appSecret,
      grant_type: "client_credentials",
    });
    return response.data;
  }

  /**
   * https://open.dingtalk.com/document/orgapp/obtain-the-access_token-of-an-internal-app
   * @param options
   * @returns
   */
  async getAccessTokenOfInternalApp(options: GetAccessTokenOfInternalAppOptions) {
    const response = await this.#manager.newApiRequest.post<GetAccessTokenOfInternalAppResult>("/v1.0/oauth2/accessToken", options);
    return response.data;
  }

  /**
   * https://open.dingtalk.com/document/orgapp/obtain-the-userid-of-a-user-by-using-the-log-free
   * @param authCode
   * @returns
   */
  async getUserInfoByAuthCode(authCode: string) {
    const accessToken = await this.#manager.getAccessToken();
    const response = await this.#manager.oldApiRequest.post<ApiResponseBody<GetUserInfoByAuthCodeResult>>(
      `topapi/v2/user/getuserinfo?access_token=${accessToken}`,
      {
        code: authCode,
      },
    );

    return response.data;
  }
}
