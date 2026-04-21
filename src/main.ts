import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { resolvers } from "./resolvers/index.ts";
import { createContext } from "./context.ts";

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = readFileSync(
  join(__dirname, "./schema/schema.graphql"),
  "utf-8"
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  context: createContext,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Serveur GraphQL Yoga prêt sur http://localhost:4000/graphql");
});
