import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./prisma/dev.db" });

export const prisma = new PrismaClient({ adapter } as any);
//creer un client prisma connexté à dev.db via sqllite
