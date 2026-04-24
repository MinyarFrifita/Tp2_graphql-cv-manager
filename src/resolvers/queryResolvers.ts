export const queryResolvers = {
  Query: {
    cvs: (_ , __ , { prisma } ) =>
      prisma.cv.findMany(),

    cv: (_ , { id } , { prisma } ) =>
      prisma.cv.findUnique({ where: { id } }),

    users: (_ , __ , { prisma } ) =>
      prisma.user.findMany(),

    skills: (_ , __ , { prisma } ) =>
      prisma.skill.findMany(),
  },
};
