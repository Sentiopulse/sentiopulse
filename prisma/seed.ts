
import { faker } from "@faker-js/faker";
import { PrismaClient, Sentiment, Source } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing data to prevent stacking
  await prisma.subpost.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  // Seed Users
  for (let i = 0; i < 5; i++) {
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
  const maxPosts = 10;
  const maxSubposts = 20;
  let subpostsCreated = 0;
  for (let i = 0; i < maxPosts; i++) {
    const remainingSubposts = maxSubposts - subpostsCreated;
    if (remainingSubposts <= 0) break;
    const subpostCount = faker.number.int({ min: 1, max: Math.min(6, remainingSubposts) });

    const createdCount = await prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          title: faker.lorem.sentence(),
          bullishSummary: faker.lorem.paragraph(),
          bearishSummary: faker.lorem.paragraph(),
          neutralSummary: faker.lorem.paragraph(),
          totalSubposts: 0,
        },
      });

      const subposts = Array.from({ length: subpostCount }).map(() => ({
        content: faker.lorem.paragraph(),
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
        categories: [faker.lorem.word(), faker.lorem.word()],
        subcategories: [faker.lorem.word(), faker.lorem.word()],
        link: faker.internet.url(),
        postId: post.id,
      }));

      await tx.subpost.createMany({ data: subposts });
      await tx.post.update({ where: { id: post.id }, data: { totalSubposts: subpostCount } });
      return subpostCount;
    });

    subpostsCreated += createdCount;
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
