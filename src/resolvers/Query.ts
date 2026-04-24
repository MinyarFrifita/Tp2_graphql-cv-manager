import { Context, Cv } from "../types.ts";

export const Query = {
  cvs: (_: any, __: any, { db }: Context): Cv[] => db.cvs,

  cv: (_: any, { id }: { id: number }, { db }: Context): Cv | null =>
    db.cvs.find((cv) => cv.id === id) ?? null,
};