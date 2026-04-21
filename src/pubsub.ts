import { createPubSub } from "graphql-yoga";

export const pubsub = createPubSub();

export const EVENTS = {
  CV_ADDED: "CV_ADDED",
  CV_UPDATED: "CV_UPDATED",
  CV_DELETED: "CV_DELETED",
} as const;
