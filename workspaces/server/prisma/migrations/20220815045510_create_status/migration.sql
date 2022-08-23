-- CreateEnum
CREATE TYPE "Status" AS ENUM ('draft', 'pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "lyrics" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';
