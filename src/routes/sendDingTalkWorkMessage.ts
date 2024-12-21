import type { RpdRoute } from "@ruiapp/rapid-core";

export default {
  namespace: "svc",
  name: "svc.dingTalk.sendWorkMessage",
  code: "svc.dingTalk.sendWorkMessage",
  type: "RESTful",
  method: "POST",
  endpoint: "/svc/dingTalk/sendWorkMessage",
  actions: [
    {
      code: "sendDingTalkWorkMessage",
    },
  ],
} satisfies RpdRoute;
