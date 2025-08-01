import { getRequestConfig, GetRequestConfigParams } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import scClient from "./../lib/sitecore-client";
import scConfig from "./../../sitecore.config";
import { sites } from "../../sites";

// import { cookies, headers } from "next/headers";
// import { SiteResolver } from "@sitecore-content-sdk/nextjs";

export default getRequestConfig(
  async ({ requestLocale }: GetRequestConfigParams) => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.

    // Since this function is executed during the Server Components render pass, you can call functions like cookies() and headers() to return configuration that is request-specific. https://next-intl.dev/docs/usage/configuration

    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    console.log("Fetching dictionary ....");

    const messages: Record<string, object> = {};

    await Promise.all(
      sites.map(async (site) => {
        messages[site.id] = await scClient.getDictionary({
          locale,
          site: site.id,
        });
        console.log(
          "Fetching dictionary for site: ",
          site.id,
          " locale: ",
          locale
        );
      })
    );

    console.log(messages);

    return {
      locale,
      messages,
    };
  }
);
