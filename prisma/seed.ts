if (process.env.NODE_ENV === "production") {
  throw new Error("Seeding is disabled in production to prevent data loss.");
}

import { faker } from "@faker-js/faker";
import { PrismaClient, Sentiment, Source } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing data to prevent stacking
  await prisma.post.deleteMany({});
  await prisma.postGroup.deleteMany({});
  await prisma.user.deleteMany({});
  // Seed Users

  const MAX_USERS = 5;
  const MAX_POSTGROUP = 10;
  const MIN_POSTS = 5;
  const MAX_POSTS = 20;

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

  // Seed PostGroups with Posts
  for (let i = 0; i < MAX_POSTGROUP; i++) {
    const postCount = faker.number.int({ min: MIN_POSTS, max: MAX_POSTS });
    await prisma.postGroup.create({
      data: {
        title: faker.lorem.sentence(),
        bullishSummary: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }),
        bearishSummary: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }),
        neutralSummary: faker.helpers.maybe(() => faker.lorem.paragraph(), { probability: 0.7 }),
        totalposts: postCount,
        posts: {
          createMany: {
            data: Array.from({ length: postCount }).map(() => ({
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
