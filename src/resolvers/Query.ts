import { GraphQLError } from "graphql";

export const Query = {
  hello: () => "Hello CV Manager",

  users: (_: any, __: any, { db }: any) => db.users,

  skills: (_: any, __: any, { db }: any) => db.skills,

  cvs: (_: any, __: any, { db }: any) => db.cvs,

  cv: (_: any, { id }: any, { db }: any) => {
    const cv = db.cvs.find((c: any) => c.id == id);

    if (!cv) {
      throw new GraphQLError(`CV with id '${id}' not found`, {
        extensions: {
          http: { status: 404 },
        },
      });
    }

    return cv;
  },
};