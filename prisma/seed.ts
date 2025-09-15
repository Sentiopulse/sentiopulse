if (process.env.NODE_ENV === "production") {
  throw new Error("Seeding is disabled in production to prevent data loss.");
}

import { faker } from "@faker-js/faker";
import { PrismaClient, Sentiment, Source } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing data to prevent stacking
  await prisma.subpost.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  // Seed Users

  const MAX_USERS = 5;
  const MAX_POSTS = 10;
  const MIN_SUBPOSTS = 5;
  const MAX_SUBPOSTS = 20;

  for (let i = 0; i < MAX_USERS; i++) {
    await prisma.user.create({
      data: {
        walletAddress: faker.finance.ethereumAddress(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
        image: faker.image.avatar(),
      },
    });
  }

  // Seed Posts with Subposts
  for (let i = 0; i < MAX_POSTS; i++) {
    const subpostCount = faker.number.int({ min: MIN_SUBPOSTS, max: MAX_SUBPOSTS });
    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        bullishSummary: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }),
        bearishSummary: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }),
        neutralSummary: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }),
        totalSubposts: subpostCount,
        subposts: {
          createMany: {
            data: Array.from({ length: subpostCount }).map(() => ({
              content: faker.lorem.paragraph({ min: 3, max: 5 }),
              sentiment: faker.helpers.arrayElement([
                Sentiment.BULLISH,
                Sentiment.BEARISH,
                Sentiment.NEUTRAL,
              ]),
              source: faker.helpers.arrayElement([
                Source.REDDIT,
                Source.TWITTER,
                Source.YOUTUBE,
                Source.TELEGRAM,
                Source.FARCASTER,
              ]),
              categories: faker.helpers.arrayElements([faker.lorem.word(), faker.lorem.word()], { min: 1, max: 2 }),
              subcategories: faker.helpers.arrayElements([faker.lorem.word(), faker.lorem.word()], { min: 2, max: 5 }),
              link: faker.internet.url(),
            }))
          }
        }
      }
    });
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
