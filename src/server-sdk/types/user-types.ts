export type GetUserByMobileResult = {
  userid: string;
};

export type GetUserDetailsOptions = {
  userid: string;
  language: string;
};

export type GetUserDetailsResult = {
  userid: string;
  unionid: string;
  name: string;
  avatar: string;
  state_code: string;
  manager_userid: string;
  mobile: string;
  hide_mobile: boolean;
  telephone: string;
  job_number: string;
  title: string;
  email: string;
  work_place: string;
  remark: string;
  /**
   * 是否为企业账号
   */
  exclusive_account: boolean;

  /**
   * 所属部门id列表。
   */
  dept_id_list: number[];

  /**
   * 员工在对应的部门中的排序。
   */
  dept_order_list: {
    /**
     * 部门id
     */
    dept_id: number;
    /**
     * 员工在部门中的排序
     */
    order: number;

    /**
     * 扩展属性，最大长度2000个字符。例如：{"爱好":"旅游","年龄":"24"}
     */
    extension: string;

    /**
     * 入职时间，Unix时间戳，单位毫秒。
     */
    hired_date: number;

    /**
     * 是否激活了钉钉
     */
    active: boolean;

    /**
     * 是否完成了实名认证
     */
    real_authed: boolean;

    /**
     * 是否为企业的高管
     */
    senior: boolean;

    /**
     * 是否为企业的管理员
     */
    admin: boolean;

    /**
     * 是否为企业的老板
     */
    boss: boolean;

    /**
     * 员工所在部门信息及是否是领导
     */
    leader_in_dept: {
      /**
       * 部门ID
       */
      dept_id: number;

      /**
       * 是否是领导
       */
      leader: boolean;
    }[];

    /**
     * 角色列表
     */
    role_list: {
      /**
       * 角色ID
       */
      id: number;

      /**
       * 角色名称
       */
      name: string;

      /**
       * 角色组名称。职务
       */
      group_name: string;
    }[];

    /**
     * 当用户来自于关联组织时的关联信息
     */
    union_emp_ext: {
      /**
       * 员工id的userId
       */
      userid: string;

      /**
       * 关联映射关系
       */
      union_emp_map_list: {
        /**
         * 关联分支组织中的员工userId
         */
        userid: string;

        /**
         * 关联分支组织的企业corpId
         */
        corp_id: string;
      }[];

      /**
       * 当前用户所属的组织的企业corpId
       */
      corp_id: string;
    };
  }[];
};

export type GetUserByUnionIdResult = {
  /**
   * 联系类型
   * - 0：企业内部员工
   * - 1：企业外部联系人
   */
  contact_type: number;

  /**
   * 用户的userid
   */
  userid: string;
};
