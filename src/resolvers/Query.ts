import { Context, Cv } from "../types.ts";

export const Query = {
  cvs: (_: any, __: any, { db }: Context): Cv[] => db.cvs,

  cv: (_: any, { id }: { id: number }, { db }: Context): Cv | null =>//null si le cv n'existe pas
    db.cvs.find((cv) => cv.id === id) ?? null,
};
//typescript regroupe float et int dans number ( number<=> int en graphql).
