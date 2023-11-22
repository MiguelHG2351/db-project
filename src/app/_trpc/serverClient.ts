import { httpBatchLink } from "@trpc/client";
import { env } from "@/env.mjs";

import { appRouter } from "@/server";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc`,
    }),
  ]
});
