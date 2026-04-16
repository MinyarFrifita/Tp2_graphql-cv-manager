export const Query = {
  hello: (_parent: any, { name }: { name: string }) => `Hello ${name || "World"}`,
  cvs: (_parent: any, _args: any, { db }: any) => {
    return db.cvs;
  },
  cvById: (_parent: any, { id }: { id: string }, { db }: any) => {
    return db.cvs.find((cv: any) => cv.id === id);
  },
};
