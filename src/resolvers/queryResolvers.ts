import { PrismaContext } from "../types.ts";
export const queryResolvers = {
  Query: {
    cvs: (_: any, __: any, { prisma }: PrismaContext) =>
      prisma.cv.findMany(),

    cv: (_: any, { id }: any, { prisma }: PrismaContext) =>
      prisma.cv.findUnique({ where: { id } }),

    users: (_: any, __: any, { prisma }: PrismaContext) =>
      prisma.user.findMany(),

    skills: (_: any, __: any, { prisma }: PrismaContext) =>
      prisma.skill.findMany(),
  },
};
