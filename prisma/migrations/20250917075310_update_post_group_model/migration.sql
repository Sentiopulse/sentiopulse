/*
  Warnings:

  - You are about to drop the column `totalSubposts` on the `PostGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."PostGroup" DROP COLUMN "totalSubposts",
ADD COLUMN     "totalposts" INTEGER NOT NULL DEFAULT 0;
