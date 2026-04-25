import { PrismaContext } from "../types.ts";
import { CreateCvArgs, UpdateCvArgs, DeleteCvArgs } from "../types.ts";
import { pubsub, EVENTS } from "../pubsub.ts";
import { Prisma } from "@prisma/client";

export const mutationResolvers = {
  Mutation: {
    // CREATE
    createCv: async (
      _: unknown,
      { input }: CreateCvArgs,
      { prisma }: PrismaContext
    ) => {
      const owner = await prisma.user.findUnique({
        where: { id: input.ownerId },
      });

      if (!owner) {
        throw new Error(`User ${input.ownerId} not found`);
      }

      const newCv = await prisma.cv.create({
        data: {
          name: input.name,
          age: input.age,
          job: input.job,
          ownerId: input.ownerId,
          skills: {
            connect: input.skillIds.map((id) => ({ id })),
          },
        },
      });

      pubsub.publish(EVENTS.CV_ADDED, { cvAdded: newCv });

      return newCv;
    },
    // UPDATE
    updateCv: async (
      _: unknown,
      { id, input }: UpdateCvArgs,
      { prisma }: PrismaContext
    ) => {
      const data: Prisma.CvUpdateInput = {};

      if (input.name !== undefined) data.name = input.name;
      if (input.age !== undefined) data.age = input.age;
      if (input.job !== undefined) data.job = input.job;

      if (input.ownerId !== undefined) {
        data.owner = {
          connect: { id: input.ownerId },
        };
      }

      if (input.skillIds !== undefined) {
        data.skills = {
          set: input.skillIds.map((sid) => ({ id: sid })),
        };
      }

      const updated = await prisma.cv.update({
        where: { id },
        data,
      });

      pubsub.publish(EVENTS.CV_UPDATED, { cvUpdated: updated });

      return updated;
    },

    // DELETE
    deleteCv: async (
      _: unknown,
      { id }: DeleteCvArgs,
      { prisma }: PrismaContext
    ) => {
      await prisma.cv.delete({
        where: { id },
      });

      pubsub.publish(EVENTS.CV_DELETED, { cvDeleted: id });

      return true;
    },
  },
};