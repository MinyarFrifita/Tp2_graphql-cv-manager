import { pubsub, EVENTS } from "../pubsub.ts";

export const Subscription = {
  cvChanged: {
    subscribe: () => pubsub.subscribe(EVENTS.CV_ADDED),
    resolve: (payload: any) => ({
      action: "ADDED",
      cv: payload.cvAdded,
      cvId: payload.cvAdded?.id,
    }),
  },
};
