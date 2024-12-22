import axios, { AxiosInstance } from "axios";
import AuthApi from "./apis/auth";
import ImApi from "./apis/im";
import UserApi from "./apis/user";
import { CacheProvider, Cache, IRpdServer } from "@ruiapp/rapid-core";
import UserCustomizedRobotApi from "./apis/userCustomizedRobot";

export type DingTalkServerApiConfig = {
  /**
   * 组织ID，应用运行在哪个组织就填写哪个组织的 corpId。
   * - 企业内部应用：填写本企业 corpId。
   * - 第三方企业应用：填写开通应用的授权企业的 corpId。
   */
  corpId?: string;

  /**
   * 钉钉应用的AgentID。
   * 企业内部应用可在开发者后台的应用详情页面查看；第三方企业应用可调用获取企业授权信息接口获取。
   */
  agentId?: string;

  /**
   * 钉钉应用的AppKey
   */
  appKey?: string;

  /**
   * 钉钉应用的AppSecret
   */
  appSecret?: string;

  /**
   * 调用接口的应用凭证。
   */
  accessToken?: string;
};

export default class DingTalkServerApi {
  readonly oldApiRequest: AxiosInstance;
  readonly newApiRequest: AxiosInstance;
  readonly auth: AuthApi;
  readonly im: ImApi;
  readonly user: UserApi;
  readonly userCustomizedRobot: UserCustomizedRobotApi;

  #server: IRpdServer;
  #config: DingTalkServerApiConfig;
  #accessToken?: string;

  constructor(server: IRpdServer, config: DingTalkServerApiConfig) {
    this.#server = server;
    this.#config = config;
    this.#accessToken = config.accessToken;

    this.oldApiRequest = axios.create({
      baseURL: "https://oapi.dingtalk.com",
      validateStatus: null,
    });

    this.newApiRequest = axios.create({
      baseURL: "https://api.dingtalk.com",
      validateStatus: null,
    });

    this.auth = new AuthApi(this);
    this.im = new ImApi(this);
    this.user = new UserApi(this);
  }

  async getAccessToken() {
    const cache = await this.#server.getFacility<Cache>("cache");
    const cacheKey = `dingTalk.suite-${this.#config.appKey}.agent-${this.#config.agentId}.accessToken`;
    let accessToken: string | null = await cache.get(cacheKey);

    if (accessToken) {
      return accessToken;
    }

    if (!this.#config.corpId) {
      throw new Error("Failed to get access token, corpId was not set.");
    }

    if (!this.#config.appKey) {
      throw new Error("Failed to get access token, appKey was not set.");
    }

    if (!this.#config.appSecret) {
      throw new Error("Failed to get access token, appSecret was not set.");
    }

    const result = await this.auth.getAccessToken({
      corpId: this.#config.corpId,
      appKey: this.#config.appKey,
      appSecret: this.#config.appSecret,
    });

    accessToken = result.access_token;
    await cache.set(cacheKey, accessToken, {
      ttl: result.expires_in * 1000,
    });

    return accessToken;
  }

  async getAccessTokenOfInternalApp() {
    const cache = await this.#server.getFacility<Cache>("cache");
    const cacheKey = `dingTalk.app-${this.#config.appKey}.agent-${this.#config.agentId}.accessToken`;
    let accessToken: string | null = await cache.get(cacheKey);

    if (accessToken) {
      return accessToken;
    }

    if (!this.#config.appKey) {
      throw new Error("Failed to get access token, appKey was not set.");
    }

    if (!this.#config.appSecret) {
      throw new Error("Failed to get access token, appSecret was not set.");
    }

    const result = await this.auth.getAccessTokenOfInternalApp({
      appKey: this.#config.appKey,
      appSecret: this.#config.appSecret,
    });

    accessToken = result.accessToken;
    await cache.set(cacheKey, accessToken, {
      ttl: result.expireIn * 1000,
    });
    return accessToken;
  }
}
