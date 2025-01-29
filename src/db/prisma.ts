// src/db/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'],
})

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export { prisma }


// import { PrismaClient } from '@prisma/client';

// class PrismaInstance {
//   private static instance: PrismaClient | undefined;

//   private constructor() { }

//   public static getInstance(): PrismaClient {
//     if (!PrismaInstance.instance) {
//       PrismaInstance.instance = new PrismaClient();
//     }
//     return PrismaInstance.instance;
//   }
// }

// // 导出 Prisma 实例获取方法
// export const prisma = PrismaInstance.getInstance();

// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as {
//     prisma: PrismaClient | undefined;
// }
// export const prisma =
//   globalForPrisma.prisma ?? new PrismaClient({
//     log: ['query'],
//   })

// // const globalForPrisma = globalThis as unknown as { 
// //     prisma: PrismaClient }

// // export const prisma =
// //   globalForPrisma.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


