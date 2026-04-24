export const cvFieldResolvers = {
  Cv: {
    owner: (cv , _ , { prisma } ) =>
      prisma.user.findUnique({ where: { id: cv.ownerId } }),

    skills: (cv , _ , { prisma } ) =>
      prisma.skill.findMany({ where: { cvs: { some: { id: cv.id } } } }),
  },

  User: {
    cvs: (user , _ , { prisma } ) =>
      prisma.cv.findMany({ where: { ownerId: user.id } }),
  },

  Skill: {
    cvs: (skill , _ , { prisma } ) =>
      prisma.cv.findMany({ where: { skills: { some: { id: skill.id } } } }),
  },
};
