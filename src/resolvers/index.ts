import { queryResolvers } from "./queryResolvers.ts";
import { mutationResolvers } from "./mutationResolvers.ts";
import { cvFieldResolvers } from "./cvFieldResolvers.ts";
import { Subscription } from "./subscription.ts";

export const resolvers = {
  ...queryResolvers,
  ...mutationResolvers,
  ...cvFieldResolvers,
  Subscription,
};
