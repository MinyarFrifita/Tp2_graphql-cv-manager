export const cvFieldResolvers = {
  Cv: {
    owner: (cv: any, _: any, { prisma }: any) =>
      prisma.user.findUnique({ where: { id: cv.ownerId } }),

    skills: (cv: any, _: any, { prisma }: any) =>
      prisma.skill.findMany({ where: { cvs: { some: { id: cv.id } } } }),
  },

  User: {
    cvs: (user: any, _: any, { prisma }: any) =>
      prisma.cv.findMany({ where: { ownerId: user.id } }),
  },

  Skill: {
    cvs: (skill: any, _: any, { prisma }: any) =>
      prisma.cv.findMany({ where: { skills: { some: { id: skill.id } } } }),
  },
};
