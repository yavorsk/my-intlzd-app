import { getRequestConfig } from "next-intl/server";
import scClient from "./../lib/sitecore-client";
import scConfig from "./../../sitecore.config";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  //   const locale = "en";
  const locale = scConfig.defaultLanguage;
  //   const site = "skateparktest";
  const site = scConfig.defaultSite;
  const dictionary = await scClient.getDictionary({
    locale,
    site,
  });

  console.log(dictionary);

  return {
    locale,
    messages: dictionary,
  };
});
