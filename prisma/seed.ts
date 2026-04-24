import { PrismaClient, Role } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("Seeding database...");

  // USERS
  const users = await Promise.all([
    prisma.user.create({
      data: { name: "Alice Martin", email: "alice@gmail.com", role: Role.ADMIN },
    }),
    prisma.user.create({
      data: { name: "Bob Smith", email: "bob@gmail.com", role: Role.USER },
    }),
    prisma.user.create({
      data: { name: "Emma Johnson", email: "emma@gmail.com", role: Role.USER },
    }),
    prisma.user.create({
      data: { name: "Youssef Ben Ali", email: "youssef@gmail.com", role: Role.USER },
    }),
  ]);

  // SKILLS
  const skills = await Promise.all([
    prisma.skill.create({ data: { designation: "TypeScript" } }),
    prisma.skill.create({ data: { designation: "GraphQL" } }),
    prisma.skill.create({ data: { designation: "Node.js" } }),
    prisma.skill.create({ data: { designation: "React" } }),
    prisma.skill.create({ data: { designation: "Prisma ORM" } }),
    prisma.skill.create({ data: { designation: "Docker" } }),
    prisma.skill.create({ data: { designation: "PostgreSQL" } }),
  ]);

  // CVS
  await prisma.cv.createMany({
    data: [
      {
        name: "FullStack Developer CV",
        age: 28,
        job: "Freelancer",
        ownerId: users[0].id,
      },
      {
        name: "Backend Engineer CV",
        age: 32,
        job: "Software Engineer",
        ownerId: users[1].id,
      },
      {
        name: "Frontend Developer CV",
        age: 25,
        job: "UI Engineer",
        ownerId: users[2].id,
      },
      {
        name: "DevOps Engineer CV",
        age: 30,
        job: "DevOps Specialist",
        ownerId: users[3].id,
      },
    ],
  });

  const cvs = await prisma.cv.findMany();

  // RELATIONS CV <-> SKILLS
  await prisma.cv.update({
    where: { id: cvs[0].id },
    data: {
      skills: {
        connect: [
          { id: skills[0].id },
          { id: skills[1].id },
          { id: skills[2].id },
          { id: skills[3].id },
        ],
      },
    },
  });

  await prisma.cv.update({
    where: { id: cvs[1].id },
    data: {
      skills: {
        connect: [
          { id: skills[2].id },
          { id: skills[4].id },
          { id: skills[6].id },
        ],
      },
    },
  });

  await prisma.cv.update({
    where: { id: cvs[2].id },
    data: {
      skills: {
        connect: [
          { id: skills[0].id },
          { id: skills[3].id },
        ],
      },
    },
  });

  await prisma.cv.update({
    where: { id: cvs[3].id },
    data: {
      skills: {
        connect: [
          { id: skills[5].id },
          { id: skills[6].id },
        ],
      },
    },
  });

  console.log("Seed completed successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());