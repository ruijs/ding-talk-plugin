/**
 * DingTalk plugin
 */

import type {
  IRpdServer,
  RapidPlugin,
  RpdApplicationConfig,
  RpdConfigurationItemOptions,
  RpdServerPluginConfigurableTargetOptions,
  RpdServerPluginExtendingAbilities,
} from "@ruiapp/rapid-core";
import pluginActionHandlers from "./actionHandlers";
import pluginModels from "./models";
import pluginRoutes from "./routes";
import pluginCronJobs from "./cronJobs";
import DingTalkService from "./services/DingTalkService";
import type SettingService from "@ruiapp/rapid-core/dist/plugins/setting/SettingService";
import { pick } from "lodash";

class DingTalkPlugin implements RapidPlugin {
  #dingTalkService!: DingTalkService;

  get code(): string {
    return "dingTalk";
  }

  get description(): string {
    return "";
  }

  get extendingAbilities(): RpdServerPluginExtendingAbilities[] {
    return [];
  }

  get configurableTargets(): RpdServerPluginConfigurableTargetOptions[] {
    return [];
  }

  get configurations(): RpdConfigurationItemOptions[] {
    return [];
  }

  async registerActionHandlers(server: IRpdServer): Promise<any> {
    for (const actionHandler of pluginActionHandlers) {
      server.registerActionHandler(this, actionHandler);
    }
  }

  async configureModels(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
    server.appendApplicationConfig({ models: pluginModels });
  }

  async configureServices(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
    this.#dingTalkService = new DingTalkService(server);
    server.registerService("dingTalkService", this.#dingTalkService);
  }

  async configureRoutes(server: IRpdServer, applicationConfig: RpdApplicationConfig): Promise<any> {
    server.appendApplicationConfig({ routes: pluginRoutes });
  }

  async registerCronJobs(server: IRpdServer) {
    for (const cronJob of pluginCronJobs) {
      server.registerCronJob(cronJob);
    }
  }

  async onApplicationLoaded(server: IRpdServer, applicationConfig: RpdApplicationConfig) {
    const settingService = server.getService<SettingService>("settingService");
    const settingValues = await settingService.getSystemSettingValues("dingTalk");
    const apiConfig = pick(settingValues, ["corpId", "agentId", "appKey", "appSecret"]);
    this.#dingTalkService.initService(apiConfig);
  }

  get dingTalkService() {
    return this.#dingTalkService;
  }
}

export default DingTalkPlugin;
