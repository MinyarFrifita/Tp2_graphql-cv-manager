import { Context, Cv, CreateCvInput, UpdateCvInput } from "../types.ts";

export const Mutation = {
  createCv: (
    _: any,
    { input }: { input: CreateCvInput },
    { db, pubSub }: Context
  ): Cv => {
    const newCv: Cv = {
      id: db.cvs.length + 1,
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