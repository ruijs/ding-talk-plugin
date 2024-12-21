import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.dingTalk.bindDingTalkAccountForUsersWithMobile",
  code: "svc.dingTalk.bindDingTalkAccountForUsersWithMobile",
  type: "RESTful",
  method: "POST",
  endpoint: "/svc/dingTalk/bindDingTalkAccountForUsersWithMobile",
  actions: [
    {
      code: "bindDingTalkAccountForUsersWithMobile",
    },
  ],
} satisfies RpdRoute;
