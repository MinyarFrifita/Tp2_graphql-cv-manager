export const Cv = {
  owner: (parent: any, _args: any, { db }: any) => {
    return db.users.find((user: any) => user.id === parent.ownerId);
  },
  skills: (parent: any, _args: any, { db }: any) => {
    return db.skills.filter((skill: any) => parent.skillIds.includes(skill.id));
  },
};
