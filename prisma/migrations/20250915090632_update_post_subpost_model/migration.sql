/*
  Warnings:

  - You are about to drop the column `categories` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `sentiment` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `subcategories` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - Added the required column `sentiment` to the `Subpost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Subpost` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Post_categories_idx";

-- DropIndex
DROP INDEX "public"."Post_subcategories_idx";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "categories",
DROP COLUMN "content",
DROP COLUMN "createdAt",
DROP COLUMN "sentiment",
DROP COLUMN "source",
DROP COLUMN "subcategories",
DROP COLUMN "updatedAt",
ADD COLUMN     "bearishSummary" TEXT,
ADD COLUMN     "bullishSummary" TEXT,
ADD COLUMN     "neutralSummary" TEXT,
ADD COLUMN     "totalSubposts" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Subpost" ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "link" TEXT,
ADD COLUMN     "sentiment" "public"."Sentiment" NOT NULL,
ADD COLUMN     "source" "public"."Source" NOT NULL,
ADD COLUMN     "subcategories" TEXT[] DEFAULT ARRAY[]::TEXT[];
