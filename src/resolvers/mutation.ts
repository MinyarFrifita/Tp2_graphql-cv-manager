import { Context, Cv, CreateCvInput, UpdateCvInput } from "../types.ts";


export const Mutation = {
  createCv: (
    _: any,
    { input }: { input: CreateCvInput },
    { db, pubSub }: Context
  ): Cv => {
    // ajout des verifications de user et skill avant de créer le cv
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
    const newCv: Cv = {
       id: db.cvs.length + 1 ,
      ...input,
    };
    db.cvs.push(newCv);
    pubSub.publish("cvAdded", { cvAdded: newCv });
    return newCv;
  },

  updateCv: (
    _: any,
    { id, input }: { id: number; input: UpdateCvInput },
    { db, pubSub }: Context
  ): Cv | null => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) return null;
    // ajout des verifications des mutations avant de mettre à jour le cv
    if (input.ownerId !== undefined) {
      const owner = db.users.find((u) => u.id === input.ownerId);
      if (!owner) {
        throw new Error(`User avec l'id ${input.ownerId} n'existe pas`);
      }
    }
    // verfication des skillIds si ils sont présents dans l'input de mise à jour
    if (input.skillIds !== undefined) {
      for (const skillId of input.skillIds) {
        const skill = db.skills.find((s) => s.id === skillId);
        if (!skill) {
          throw new Error(`Skill avec l'id ${skillId} n'existe pas`);
        }
      }
    }

    db.cvs[index] = { ...db.cvs[index], ...input };//les champs dans input ecrasent les champs existants dans db.cvs[index]
    pubSub.publish("cvUpdated", { cvUpdated: db.cvs[index] });
    return db.cvs[index];
  },

  deleteCv: (
    _: any,
    { id }: { id: number },
    { db, pubSub }: Context
  ): boolean => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) return false;

    db.cvs.splice(index, 1);//supprimer 1 élément à l'index trouvé (reellement c'est à partir de cet index)
    pubSub.publish("cvDeleted", { cvDeleted: id });
    return true;
  },
};