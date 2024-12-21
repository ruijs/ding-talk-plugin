export type GetAccessTokenOptions = {
  corpId: string;
  appKey: string;
  appSecret: string;
};

export type GetAccessTokenResult = {
  /**
   * 访问凭证。
   */
  access_token: string;
  /**
   * 访问凭证有效的时长，单位秒。
   */
  expires_in: number;
};

export type GetAccessTokenOfInternalAppOptions = {
  appKey: string;
  appSecret: string;
};

export type GetAccessTokenOfInternalAppResult = {
  /**
   * accessToken的过期时间，单位秒。
   */
  expireIn: number;
  /**
   * 生成的accessToken。
   */
  accessToken: string;
};

export type GetUserInfoByAuthCodeResult = {
  /**
   * 用户的userId。
   */
  userid: string;

  /**
   * 设备ID。
   */
  device_id: string;

  /**
   * 是否是管理员。
   */
  sys: boolean;
  /**
   * 级别。
   *
   * - 1：主管理员
   * - 2：子管理员
   * - 100：老板
   * - 0：其他（如普通员工）
   */
  sys_level: number;

  /**
   * 用户关联的unionId。
   */
  associated_unionid: string;

  /**
   * 用户unionId。
   */
  unionid: string;

  /**
   * 用户名字。
   */
  name: string;
};
