import { Context, Cv } from "../types.ts";

export const Query = {
  cvs: (_ , __ , { db }: Context): Cv[] => db.cvs,

  cv: (_ , { id }: { id: number }, { db }: Context): Cv | null =>
    db.cvs.find((cv) => cv.id === id) ?? null,
};