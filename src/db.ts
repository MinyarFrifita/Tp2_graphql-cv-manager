export const DB = {
  users: [
    {
      id: 1,
      name: "Alice Martin",
      email: "alice@gmail.com",
      role: "ADMIN",
    },
    {
      id: 2,
      name: "Bob Dupont",
      email: "bob@gmail.com",
      role: "USER",
    },
    {
      id: 3,
      name: "Clara Petit",
      email: "clara@gmail.com",
      role: "USER",
    },
  ],

  skills: [
    { id: 1, designation: "TypeScript" },
    { id: 2, designation: "GraphQL" },
    { id: 3, designation: "React" },
    { id: 4, designation: "Node.js" },
    { id: 5, designation: "Docker" },
  ],

  cvs: [
    {
      id: 1,
      name: "FullStack Dev",
      age: 28,
      job: "Freelancer",
      ownerId: 1,
      skillIds: [1, 2, 3],
    },
    {
      id: 2,
      name: "Backend Expert",
      age: 35,
      job: "Engineer",
      ownerId: 2,
      skillIds: [4, 1],
    },
    {
      id: 3,
      name: "DevOps Pro",
      age: 30,
      job: "Consultant",
      ownerId: 3,
      skillIds: [5, 4],
    },
  ],
};