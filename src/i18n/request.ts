import { getRequestConfig, GetRequestConfigParams } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import scClient from "./../lib/sitecore-client";
import scConfig from "./../../sitecore.config";

import { cookies, headers } from "next/headers";
// import { SiteResolver } from "@sitecore-content-sdk/nextjs";

export default getRequestConfig(
  async ({ requestLocale }: GetRequestConfigParams) => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.

    // Since this function is executed during the Server Components render pass, you can call functions like cookies() and headers() to return configuration that is request-specific. https://next-intl.dev/docs/usage/configuration

    const site = scConfig.defaultSite;

    // resolve site by host in multisite solution
    const headersList = await headers();
    console.log("host header: ", headersList.get("host"));

    const cookiesResult = await cookies();
    // const siteResolver = new SiteResolver(sites);
    // const site = siteResolver.getByHost(headersList.get("host"));

    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    console.log("Fetching dictionary ....");

    // function dataFetcher(url: string | URL | Request, data?: RequestInit) {
    //   console.log("custom data fetcher used for url: ", url);
    //   return fetch(url, { next: { revalidate: 60 }, ...data });
    // }

    const dictionary = await scClient.getDictionary({
      locale,
      site,
    });

    return {
      locale,
      messages: dictionary,
    };
  }
);
