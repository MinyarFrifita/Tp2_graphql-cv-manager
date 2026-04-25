import { PrismaClient } from "@prisma/client";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Skill {
  id: number;
  designation: string;
}

export interface Cv {
  id: number;
  name: string;
  age: number;
  job: string;
  ownerId: number;
  skillIds: number[];
}

export interface CreateCvInput {
  name: string;
  age: number;
  job: string;
  ownerId: number;
  skillIds: number[];
}

export interface UpdateCvInput {
  name?: string;
  age?: number;
  job?: string;
  ownerId?: number;
  skillIds?: number[];
}

export interface Database {
  users: User[];
  skills: Skill[];
  cvs: Cv[];
}

export interface PubSub {
    //publier une donnée payload dans un canal event
  publish: (event: string, payload: unknown) => void;
    //s'abonner à un canal event pour recevoir les données publiées
    //retourne un objet ( qu"on peut ecouter et qui peut envoyer plusieurs valeurs dans le temps)
  subscribe: (event: string) => AsyncIterable<unknown>;
}

export interface Context {
  db: Database;
  pubSub: PubSub;
}

export interface CreateCvArgs {
  input: CreateCvInput;
}

export interface UpdateCvArgs {
  id: number;
  input: UpdateCvInput;
}

export interface DeleteCvArgs {
  id: number;
}

export interface PrismaContext {
  prisma: PrismaClient;
  pubSub: PubSub;
}