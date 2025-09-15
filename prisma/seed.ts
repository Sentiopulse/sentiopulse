
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
    const post = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        bullishSummary: faker.lorem.paragraph(),
        bearishSummary: faker.lorem.paragraph(),
        neutralSummary: faker.lorem.paragraph(),
        totalSubposts: 0, // will update after subposts
      },
    });

    // Calculate remaining subposts allowed
    const remainingSubposts = maxSubposts - subpostsCreated;
    if (remainingSubposts <= 0) break;
    // Each post gets at least 1 subpost, max 6, but not exceeding maxSubposts
    const subpostCount = Math.min(faker.number.int({ min: 1, max: 6 }), remainingSubposts);
    const subposts = [];
    for (let j = 0; j < subpostCount; j++) {
      subposts.push({
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
      });
    }
    await prisma.subpost.createMany({ data: subposts });
    await prisma.post.update({
      where: { id: post.id },
      data: { totalSubposts: subpostCount },
    });
    subpostsCreated += subpostCount;
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
