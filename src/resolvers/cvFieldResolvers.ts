import { PrismaContext } from "../types.ts";
import { Cv , Skill , User } from "@prisma/client";

export const cvFieldResolvers = {
  Cv: {
    owner: (cv: Cv, _: any, { prisma }: PrismaContext) =>
      prisma.user.findUnique({ where: { id: cv.ownerId } }),

    skills: (cv: Cv, _: any, { prisma }: PrismaContext) =>
      prisma.skill.findMany({ where: { cvs: { some: { id: cv.id } } } }),
  },

  User: {
    cvs: (user: User, _: any, { prisma }: PrismaContext) =>
      prisma.cv.findMany({ where: { ownerId: user.id } }),
  },

  Skill: {
    cvs: (skill: Skill, _: any, { prisma }: PrismaContext) =>
      prisma.cv.findMany({ where: { skills: { some: { id: skill.id } } } }),
  },
};
