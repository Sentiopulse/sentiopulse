/*
  Warnings:

  - You are about to drop the column `bearishSummary` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `bullishSummary` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `neutralSummary` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `totalSubposts` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Subpost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postGroupId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentiment` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Subpost" DROP CONSTRAINT "Subpost_postId_fkey";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "bearishSummary",
DROP COLUMN "bullishSummary",
DROP COLUMN "neutralSummary",
DROP COLUMN "title",
DROP COLUMN "totalSubposts",
ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "postGroupId" TEXT NOT NULL,
ADD COLUMN     "sentiment" "public"."Sentiment" NOT NULL,
ADD COLUMN     "source" "public"."Source" NOT NULL,
ADD COLUMN     "subcategories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."Subpost";

-- CreateTable
CREATE TABLE "public"."PostGroup" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "totalSubposts" INTEGER NOT NULL DEFAULT 0,
    "bullishSummary" TEXT,
    "bearishSummary" TEXT,
    "neutralSummary" TEXT,

    CONSTRAINT "PostGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_postGroupId_fkey" FOREIGN KEY ("postGroupId") REFERENCES "public"."PostGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
