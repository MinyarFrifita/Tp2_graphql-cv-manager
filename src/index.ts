import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers/index.js";
import * as db from "./db.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lecture du schéma depuis le fichier .graphql (Bonne pratique Slide 48/49)
const typeDefs = readFileSync(
  join(__dirname, "./schema/schema.graphql"),
  "utf-8"
);

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    // Utilisation du context pour partager la db (Bonne pratique Slide 71/72)
    context: async () => ({ db }),
    listen: { port: 4000 },
  });

  console.log(`🚀 Serveur prêt sur : ${url}`);
}

main().catch((err) => {
  console.error("Erreur au démarrage du serveur :", err);
});
