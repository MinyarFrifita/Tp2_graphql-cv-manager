import { prisma } from "./prismaClient.ts";

export const createContext = async () => ({ prisma });
//à chaque requete, on crée un nouveau contexte qui contient une instance de PrismaClient. Cela permet d'avoir une connexion à la base de données pour chaque requete, et d'éviter les problèmes de concurrence.