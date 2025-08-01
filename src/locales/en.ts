import scClient from "./../lib/sitecore-client";
import { sites } from "../../sites";

async function getMessages() {
  const messages: Record<string, object> = {};

  await Promise.all(
    sites.map(async (site) => {
      messages[site.id] = await scClient.getDictionary({
        locale: "en",
        site: site.id,
      });
      console.log("Fetching dictionary for site: ", site.id, " locale: ", "en");
    })
  );

  return messages;
}

export default (await getMessages()) as unknown;

// export default {
//   hello: "Hello",
//   "hello.world": "Hello world!",
//   welcome: "Hello {name}!",
// } as const;
