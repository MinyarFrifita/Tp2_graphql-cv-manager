import { Context, Cv, CreateCvInput, UpdateCvInput } from "../types.ts";
import { CHANNELS } from "../channels.ts";

export const Mutation = {
  createCv: (
    _: unknown,
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
    console.log("DB STATE:", db);

    db.cvs.push(newCv);

    pubSub.publish(CHANNELS.CV_CHANGED, {
      action: "ADDED",
      cv: newCv,
      cvId: newCv.id,
    });
    console.log("DB STATE:", db);

    return newCv;
  },

  updateCv: (
    _: unknown,
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
    console.log("DB STATE:", db);

    db.cvs[index] = updatedCv;
    console.log("DB STATE:", db);

    pubSub.publish(CHANNELS.CV_CHANGED, {
        action: "UPDATED",
        cv: updatedCv,
        cvId: updatedCv.id,
    });

    return updatedCv;
  },

  deleteCv: (
    _: unknown,
    { id }: { id: number },
    { db, pubSub }: Context
  ): boolean => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      return false;
    }
    console.log("DB STATE:", db);

    db.cvs.splice(index, 1);//supprimer un elt en commençant par l'indice index 

    pubSub.publish(CHANNELS.CV_CHANGED, {
        action: "DELETED",
        cv: null,
        cvId: id,
    });
    console.log("DB STATE:", db);

    return true;
  },/*
    deleteCv: (
    _: unknown,
    { id }: { id: number },
    { db, pubSub }: Context
  ): boolean => {
    const index = db.cvs.findIndex((cv) => cv.id === id);

    if (index === -1) {
      return false;
    }

    const cv = db.cvs[index];

    // 1. dissocier les skills
    db.skills.forEach((skill) => {
      skill.cvIds = skill.cvIds.filter((cvId) => cvId !== id);
    });

    // 2. dissocier le CV du user
    const user = db.users.find((u) =>
      u.cvs.some((c) => c.id === id)
    );

    if (user) {
      user.cvs = user.cvs.filter((c) => c.id !== id);
    }

    // 3. supprimer le CV
    db.cvs.splice(index, 1);

    // 4. event pubsub
    pubSub.publish(CHANNELS.CV_CHANGED, {
      action: "DELETED",
      cv: null,
      cvId: id,
    });

    return true;
  },*/
};