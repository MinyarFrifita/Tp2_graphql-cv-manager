import { Context, Cv, User, Skill } from "../types.ts";

export const CvResolver = {
  //retourne le user (objet) propriétaire d'un cv parent
  owner: (parent: Cv, _ , { db }: Context): User | undefined =>
    db.users.find((u) => u.id === parent.ownerId),
  //retourne les skills (objet) d'un cv parent
  skills: (parent: Cv, _ , { db }: Context): Skill[] =>
    db.skills.filter((s) => parent.skillIds.includes(s.id)),
};

export const UserResolver = {
  //retourne les cvs (objet) d'un user parent
  cvs: (parent: User, _ , { db }: Context): Cv[] =>
    db.cvs.filter((cv) => cv.ownerId === parent.id),
};

export const SkillResolver = {
  //retourne les cvs (objet) d'une skill parent
  cvs: (parent: Skill, _ , { db }: Context): Cv[] =>
    db.cvs.filter((cv) => cv.skillIds.includes(parent.id)),
};