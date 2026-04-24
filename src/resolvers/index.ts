import { Query } from "./query.ts";
import { Mutation } from "./mutation.ts";
import { Subscription } from "./subscription.ts";
import { CvResolver, UserResolver, SkillResolver } from "./cv.ts";

export const resolvers = {
  Query,
  Mutation,
  Subscription,
  Cv: CvResolver,
  User: UserResolver,
  Skill: SkillResolver,
};