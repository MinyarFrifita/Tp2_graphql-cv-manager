import { Context, Cv, CreateCvInput, UpdateCvInput } from "../types.ts";
import { CHANNELS } from "../channels.ts";

export const Mutation = {
  createCv: (
    _ ,
    { input }: { input: CreateCvInput },
    { db, pubSub }: Context
  ): Cv => {
    const owner = db.users.find((u) => u.id === input.ownerId);
    if (!owner) {
      throw new Error(`User avec l'id ${input.ownerId} n'existe pas`);
    }

    for (const skillId of input.skillIds) {
      const skill = db.skills.find((s) => s.id === skillId);
      if (!skill) {
        throw new Error(`Skill avec l'id ${skillId} n'existe pas`);
      }
    }

    const newId =
      db.cvs.length > 0 ? Math.max(...db.cvs.map((cv) => cv.id)) + 1 : 1;

    const newCv: Cv = {
      id: newId,
      ...input,
    };

    db.cvs.push(newCv);

    pubSub.publish(CHANNELS.CV_CHANGED, {
      action: "ADDED",
      cv: newCv,
      cvId: newCv.id,
    });

    return newCv;
  },

  updateCv: (
    _ ,
    { id, input }: { id: number; input: UpdateCvInput },
    { db, pubSub }: Context
  ): Cv | null => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      return null;
    }

    if (input.ownerId !== undefined) {
      const owner = db.users.find((u) => u.id === input.ownerId);
      if (!owner) {
        throw new Error(`User avec l'id ${input.ownerId} n'existe pas`);
      }
    }

    if (input.skillIds !== undefined) {
      for (const skillId of input.skillIds) {
        const skill = db.skills.find((s) => s.id === skillId);
        if (!skill) {
          throw new Error(`Skill avec l'id ${skillId} n'existe pas`);
        }
      }
    }

    const updatedCv: Cv = {
      ...db.cvs[index],
      ...input,
    };

    db.cvs[index] = updatedCv;

    pubSub.publish(CHANNELS.CV_CHANGED, {
        action: "UPDATED",
        cv: updatedCv,
        cvId: updatedCv.id,
    });

    return updatedCv;
  },

  deleteCv: (
    _ ,
    { id }: { id: number },
    { db, pubSub }: Context
  ): boolean => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      return false;
    }

    db.cvs.splice(index, 1);

    pubSub.publish(CHANNELS.CV_CHANGED, {
        action: "DELETED",
        cv: null,
        cvId: id,
    });

    return true;
  },
};