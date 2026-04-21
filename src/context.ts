import { prisma } from "./prismaClient.ts";

export const createContext = async () => ({ prisma });
