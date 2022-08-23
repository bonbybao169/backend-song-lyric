import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  try {
    await prisma.user.create({
      data: {
        email: 'admin@gmail.com',
        password: await hash('admin', saltRounds),
        role: 'admin',
        firstName: 'Tran',
        lastName: 'Bevis',
        numberOfUploads: 0,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Account existed');
      }
    }
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
