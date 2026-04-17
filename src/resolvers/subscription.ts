import { Context } from "../types.ts";

export const Subscription = {
  cvAdded: {
    subscribe: (_: any, __: any, { pubSub }: Context) =>
      pubSub.subscribe("cvAdded"),
    resolve: (payload: { cvAdded: any }) => payload.cvAdded,
  },

  cvUpdated: {
    subscribe: (_: any, __: any, { pubSub }: Context) =>
      pubSub.subscribe("cvUpdated"),
    resolve: (payload: { cvUpdated: any }) => payload.cvUpdated,
  },

  cvDeleted: {
    subscribe: (_: any, __: any, { pubSub }: Context) =>
      pubSub.subscribe("cvDeleted"),
    resolve: (payload: { cvDeleted: string }) => payload.cvDeleted,
  },
};