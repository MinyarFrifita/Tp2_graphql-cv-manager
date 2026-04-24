import { pubsub, EVENTS } from "../pubsub.ts";

export const mutationResolvers = {
  Mutation: {
    createCv: async (_ , { input } , { prisma } ) => {
      const owner = await prisma.user.findUnique({ where: { id: input.ownerId } });
      if (!owner) throw new Error(`User ${input.ownerId} not found`);

      const newCv = await prisma.cv.create({
        data: {
          name: input.name,
          age: input.age,
          job: input.job,
          ownerId: input.ownerId,
          skills: { connect: input.skillIds.map((id: string) => ({ id })) },
        },
      });
      pubsub.publish(EVENTS.CV_ADDED, { cvAdded: newCv });
      return newCv;
    },

    updateCv: async (_ , { id, input } , { prisma } ) => {
      const updated = await prisma.cv.update({
        where: { id },
        data: {
          ...(input.name && { name: input.name }),
          ...(input.age && { age: input.age }),
          ...(input.job && { job: input.job }),
          ...(input.ownerId && { ownerId: input.ownerId }),
          ...(input.skillIds && {
            skills: { set: input.skillIds.map((sid: string) => ({ id: sid })) },
          }),
        },
      });
      pubsub.publish(EVENTS.CV_UPDATED, { cvUpdated: updated });
      return updated;
    },

    deleteCv: async (_ , { id } , { prisma } ) => {
      await prisma.cv.delete({ where: { id } });
      pubsub.publish(EVENTS.CV_DELETED, { cvDeleted: id });
      return true;
    },
  },
};
