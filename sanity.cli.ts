import { defineCliConfig } from "@sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "8670kl0n",
    dataset: "production",
  },
  /** Studio hosteado en https://orlando-site.sanity.studio (npm run sanity:studio:deploy). */
  studioHost: "orlando-site",
  deployment: {
    appId: "a3mn5awc7w2mnxxrn5d9qvlq",
  },
});
