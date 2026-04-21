import { PrismaClient, Role } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  const alice = await prisma.user.create({
    data: { name: "Alice Martin", email: "alice@gmail.com", role: Role.ADMIN },
  });

  const ts = await prisma.skill.create({ data: { designation: "TypeScript" } });
  const gql = await prisma.skill.create({ data: { designation: "GraphQL" } });

  await prisma.cv.create({
    data: {
      name: "FullStack Dev",
      age: 28,
      job: "Freelancer",
      ownerId: alice.id,
      skills: { connect: [{ id: ts.id }, { id: gql.id }] },
    },
  });

  console.log("✅ Seed done");
}

main().catch(console.error).finally(() => prisma.$disconnect());
