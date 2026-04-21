import { Context } from "../types.ts";
import { CHANNELS } from "../channels.ts";

export const Subscription = {
  cvChanged: {
    subscribe: (_: unknown, __: unknown, { pubSub }: Context) =>
      pubSub.subscribe(CHANNELS.CV_CHANGED),
    resolve: (payload: unknown) => payload,
  },
};