export type DingTalkWorkMessage = DingTalkMessage;

export type DingTalkUserRobotGroupMessage =
  | DingTalkUserRobotGroupTextMessage
  | DingTalkUserRobotGroupLinkMessage
  | DingTalkUserRobotGroupMarkdownMessage
  | DingTalkUserRobotGroupActionCardMessage
  | DingTalkUserRobotGroupFeedCardMessage;

export type DingTalkUserRobotGroupTextMessage = DingTalkTextMessage & DingTalkMessageAtOptions;
export type DingTalkUserRobotGroupLinkMessage = DingTalkLinkMessage;
export type DingTalkUserRobotGroupMarkdownMessage = DingTalkMarkdownMessage & DingTalkMessageAtOptions;
export type DingTalkUserRobotGroupActionCardMessage = DingTalkActionCardMessage & DingTalkMessageAtOptions;
export type DingTalkUserRobotGroupFeedCardMessage = DingTalkFeedCardMessage;

export type DingTalkMessageAtOptions = {
  /**
   * 是否@所有人。
   */
  isAtAll?: boolean;

  /**
   * 被@的群成员手机号。
   */
  atMobiles?: string[];

  /**
   * 被@的群成员userId。
   */
  atUserIds?: string[];
};

export type DingTalkMessage =
  | DingTalkTextMessage
  | DingTalkImageMessage
  | DingTalkVoiceMessage
  | DingTalkFileMessage
  | DingTalkLinkMessage
  | DingTalkOaMessage
  | DingTalkMarkdownMessage
  | DingTalkActionCardMessage;

export type DingTalkTextMessage = {
  msgtype: "text";
  text: {
    content: string;
  };
};

export type DingTalkImageMessage = {
  msgtype: "image";
  image: {
    media_id: string;
  };
};

export type DingTalkVoiceMessage = {
  msgtype: "voice";
  voice: {
    media_id: string;
    duration: string;
  };
};

export type DingTalkFileMessage = {
  msgtype: "file";
  file: {
    media_id: string;
  };
};

export type DingTalkLinkMessage = {
  msgtype: "link";
  link: {
    messageUrl: string;
    picUrl: string;
    title: string;
    text: string;
  };
};

export type DingTalkOaMessage = {
  msgtype: "oa";
  oa: {
    message_url: string;
    head: {
      bgcolor: string;
      text: string;
    };
    body: {
      title: string;
      form: {
        key: string;
        value: string;
      }[];
    };
    rich: {
      num: string;
      unit: string;
    };
    content: string;
    image: string;
    file_count: string;
    author: string;
  };
};

export type DingTalkMarkdownMessage = {
  msgtype: "markdown";
  markdown: {
    title: string;
    text: string;
  };
};

export type DingTalkActionCardMessage =
  | DingTalkActionCardMessageWithSingleAction
  | DingTalkActionCardMessageWithMultipleAction;

export type DingTalkActionCardMessageWithSingleAction = {
  msgtype: "action_card";
  action_card: {
    title: string;
    markdown: string;
    /**
     * 使用整体跳转ActionCard样式时的标题。必须与single_url同时设置，最长20个字符。
     */
    single_title: string;
    /**
     * 消息点击链接地址，当发送消息为小程序时支持小程序跳转链接，最长500个字符。
     */
    single_url: string;
  };
};

export type DingTalkActionCardMessageWithMultipleAction = {
  msgtype: "action_card";
  action_card: {
    title: string;
    markdown: string;
    /**
     * 使用独立跳转ActionCard样式时的按钮排列方式：
     * 0：竖直排列
     * 1：横向排列
     * 必须与btn_json_list同时设置。
     */
    btn_orientation: "0" | "1";
    /**
     * 使用独立跳转ActionCard样式时的按钮列表；必须与btn_orientation同时设置，且长度不超过1000字符。
     */
    btn_json_list: {
      /**
       * 使用独立跳转ActionCard样式时的按钮的标题，最长20个字符。
       */
      title: string;
      /**
       * 使用独立跳转ActionCard样式时的跳转链接，最长700个字符。
       */
      action_url: string;
    }[];
  };
};

export type DingTalkFeedCardMessage = {
  msgtype: "feedCard";
  feedCard: {
    /**
     * feedCard消息的内容列表。
     */
    links: DingTalkFeedCardMessageLink[];
  };
};

export type DingTalkFeedCardMessageLink = {
  /**
   * feedCard消息内每条内容的标题。
   */
  title?: string;
  /**
   * feedCard消息内每条内容的图片URL，建议使用[上传媒体文件](https://open.dingtalk.com/document/orgapp/upload-media-files)接口获取。
   */
  picURL?: string;
  /**
   * feedCard消息内每条内容的跳转链接。
   */
  messageURL?: string;
};
