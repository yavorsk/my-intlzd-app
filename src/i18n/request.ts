import { getRequestConfig, GetRequestConfigParams } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import scClient from "./../lib/sitecore-client";
import scConfig from "./../../sitecore.config";
// import { headers } from "next/headers";
// import { SiteResolver } from "@sitecore-content-sdk/nextjs";

export default getRequestConfig(
  async ({ requestLocale }: GetRequestConfigParams) => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.

    // Since this function is executed during the Server Components render pass, you can call functions like cookies() and headers() to return configuration that is request-specific. https://next-intl.dev/docs/usage/configuration
    // resolve site by host

    // const headersList = await headers();
    // console.log("headers", headersList.get("host"));
    // const siteResolver = new SiteResolver(sites);
    // const site = siteResolver.getByHost(headersList.get("host"));

    //   const site = "skateparktest";
    const site = scConfig.defaultSite;

    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    console.log("requesting dictionary ....");

    const dictionary = await scClient.getDictionary({
      locale,
      site,
    });

    console.log("dictionary", dictionary);

    return {
      locale,
      messages: dictionary,
    };
  }
);
