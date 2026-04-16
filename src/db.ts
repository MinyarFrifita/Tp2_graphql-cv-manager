export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Skill {
  id: string;
  designation: string;
}

export interface Cv {
  id: string;
  name: string;
  age: number;
  job: string;
  ownerId: string;
  skillIds: string[];
}

export const users: User[] = [
  { id: "1", name: "Alice Martin", email: "alice@gmail.com", role: Role.ADMIN },
  { id: "2", name: "Bob Dupont", email: "bob@gmail.com", role: Role.USER },
  { id: "3", name: "Clara Petit", email: "clara@gmail.com", role: Role.USER },
];

export const skills: Skill[] = [
  { id: "s1", designation: "TypeScript" },
  { id: "s2", designation: "GraphQL" },
  { id: "s3", designation: "React" },
  { id: "s4", designation: "Node.js" },
  { id: "s5", designation: "Docker" },
];

export const cvs: Cv[] = [
  { id: "cv1", name: "FullStack Dev", age: 28, job: "Freelancer", ownerId: "1", skillIds: ["s1", "s2", "s3"] },
  { id: "cv2", name: "Backend Expert", age: 35, job: "Engineer", ownerId: "2", skillIds: ["s4", "s1"] },
  { id: "cv3", name: "DevOps Pro", age: 30, job: "Consultant", ownerId: "3", skillIds: ["s5", "s4"] },
];
