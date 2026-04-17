import { createYoga, createPubSub} from "graphql-yoga";
import { createServer } from "node:http";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { resolvers } from "./resolvers/index.ts";
import { DB } from "./db.js";

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = readFileSync(
  join(__dirname, "./schema/schema.graphql"),
  "utf-8"
);

// PubSub pour les subscriptions
export const pubSub = createPubSub();

// construire le schema executable à partir des typeDefs et resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  context: async () => ({
    db: DB,
    pubSub, // ← injecté dans le context
  }),
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Serveur GraphQL Yoga prêt sur http://localhost:4000/graphql");
});