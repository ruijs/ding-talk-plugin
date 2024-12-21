import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.dingTalk.signinWithDingTalkAuthCode",
  code: "svc.dingTalk.signinWithDingTalkAuthCode",
  type: "RESTful",
  method: "POST",
  endpoint: "/svc/dingTalk/signinWithDingTalkAuthCode",
  actions: [
    {
      code: "signinWithDingTalkAuthCode",
    },
  ],
} satisfies RpdRoute;
