import { PrismaContext } from "../types.ts";
import { CreateCvArgs , UpdateCvArgs , DeleteCvArgs  } from "../types.ts";
import { pubsub, EVENTS } from "../pubsub.ts";

export const mutationResolvers = {
  Mutation: {
    createCv: async (_: unknown , { input }: CreateCvArgs , { prisma }: PrismaContext) => {
      const owner = await prisma.user.findUnique({ where: { id: input.ownerId } });
      if (!owner) throw new Error(`User ${input.ownerId} not found`);
      
      const newCv = await prisma.cv.create({
        data: {
          name: input.name,
          age: input.age,
          job: input.job,
          ownerId: input.ownerId,
          skills: { connect: input.skillIds.map((id) => ({ id })) },
        },
      });
      pubsub.publish(EVENTS.CV_ADDED, { cvAdded: newCv });
      return newCv;
    },

    updateCv: async (_: unknown, { id, input }: UpdateCvArgs, { prisma }: PrismaContext) => {
      const updated = await prisma.cv.update({
        where: { id },
        data: {
          ...(input.name && { name: input.name }),
          ...(input.age && { age: input.age }),
          ...(input.job && { job: input.job }),
          ...(input.ownerId && { ownerId: input.ownerId }),
          ...(input.skillIds && {
            skills: { set: input.skillIds.map((sid: number) => ({ id: sid })) },
          }),
        },
      });
      pubsub.publish(EVENTS.CV_UPDATED, { cvUpdated: updated });
      return updated;
    },

    deleteCv: async (_: unknown, { id }: DeleteCvArgs, { prisma }: PrismaContext) => {
      await prisma.cv.delete({ where: { id } });
      pubsub.publish(EVENTS.CV_DELETED, { cvDeleted: id });
      return true;
    },
  },
};
