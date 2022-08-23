-- CreateEnum
CREATE TYPE "Social" AS ENUM ('facebook', 'google');

-- CreateTable
CREATE TABLE "socials_auths" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "social_type" "Social" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "socials_auths_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "socials_auths_user_id_social_type_key" ON "socials_auths"("user_id", "social_type");

-- AddForeignKey
ALTER TABLE "socials_auths" ADD CONSTRAINT "socials_auths_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
