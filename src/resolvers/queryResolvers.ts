export const queryResolvers = {
  Query: {
    cvs: (_: any, __: any, { prisma }: any) =>
      prisma.cv.findMany(),

    cv: (_: any, { id }: any, { prisma }: any) =>
      prisma.cv.findUnique({ where: { id } }),

    users: (_: any, __: any, { prisma }: any) =>
      prisma.user.findMany(),

    skills: (_: any, __: any, { prisma }: any) =>
      prisma.skill.findMany(),
  },
};
