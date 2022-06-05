import { PluginDefinition } from "apollo-server-core";
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from "apollo-server-plugin-base";
import config from "../config";
import appInsights from "applicationinsights";

class Logger {
  public appInsightsPlugin: PluginDefinition;
  private appInsightsClient: any;
  private static instance: Logger;

  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    appInsights.setup(config.APPINSIGHTS_INSTRUMENTATIONKEY).start();
    appInsights.defaultClient.commonProperties = {
      environment: config.WEBSITE_HOSTNAME,
      functionArea: "graphql",
    };
    const appInsightsClients = appInsights.defaultClient;
    this.appInsightsPlugin = <ApolloServerPlugin & GraphQLRequestListener>{
      requestDidStart(requestContext: GraphQLRequestContext): void {
        appInsightsClients.trackMetric({ name: "apollo-query", value: 1 });
      },
      didEncounterErrors: function (requestContext: GraphQLRequestContext) {
        appInsightsClients.trackMetric({ name: "apollo-error", value: 1 });
        appInsightsClients.trackException({
          exception: new Error("Apollo Error"),
        });
        appInsightsClients.trackException({
          exception: { name: "Apollo Error", message: "requestContext.errors" },
        });
      },
    };
    this.appInsightsClient = appInsightsClients;
    Logger.instance = this;
  }

  logTrace = (message: String) => {
    console.log(message);
    this.appInsightsClient.trackTrace({
      message,
      properties: { Environment: process.env.ENVIRONMENT },
    });
  };

  logException = (error: string) => {
    console.log(error);
    this.appInsightsClient.trackException({
      exception: new Error(error),
      properties: { Environment: process.env.ENVIRONMENT },
    });
  };
}

export { Logger };
