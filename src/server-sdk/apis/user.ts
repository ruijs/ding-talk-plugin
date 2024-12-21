import type DingTalkServerApi from "../dingTalkServerApi";
import type { ApiResponseBody } from "../types/common-types";
import type {
  GetUserByMobileResult,
  GetUserByUnionIdResult,
  GetUserDetailsOptions,
  GetUserDetailsResult,
} from "../types/user-types";

export default class UserApi {
  #manager: DingTalkServerApi;

  constructor(manager: DingTalkServerApi) {
    this.#manager = manager;
  }

  /**
   * https://open.dingtalk.com/document/orgapp/query-users-by-phone-number
   * @param mobile
   * @returns
   */
  async getUserByMobile(mobile: string) {
    if (!mobile) {
      throw new Error("Mobile is required.");
    }

    const accessToken = await this.#manager.getAccessToken();
    const response = await this.#manager.oldApiRequest.post<ApiResponseBody<GetUserByMobileResult>>(
      `/topapi/v2/user/getbymobile?access_token=${accessToken}`,
      {
        mobile,
      },
    );
    return response.data;
  }

  /**
   * https://open.dingtalk.com/document/orgapp/query-user-details
   * @param options
   * @returns
   */
  async getUserDetails(options: GetUserDetailsOptions) {
    const accessToken = await this.#manager.getAccessToken();
    const response = await this.#manager.oldApiRequest.post<ApiResponseBody<GetUserDetailsResult>>(
      `/topapi/v2/user/getbymobile?access_token=${accessToken}`,
      options,
    );
    return response.data;
  }

  /**
   * https://open.dingtalk.com/document/orgapp/query-a-user-by-the-union-id
   * @param unionid
   * @returns
   */
  async getUserByUnionId(unionid: string) {
    const accessToken = await this.#manager.getAccessToken();
    const response = await this.#manager.oldApiRequest.post<ApiResponseBody<GetUserByUnionIdResult>>(
      `/topapi/user/getbyunionid?access_token=${accessToken}`,
      {
        unionid,
      },
    );
    return response.data;
  }
}
