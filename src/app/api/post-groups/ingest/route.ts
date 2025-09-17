import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Sentiment, Source } from "@prisma/client";
import { z } from "zod";

// Set this env variable in your deployment environment
const INGEST_SECRET = process.env.INGEST_SECRET;

// Zod validation schema (moved outside handler for efficiency)
const postSchema = z.object({
    content: z.string(),
    sentiment: z.enum([Sentiment.BULLISH, Sentiment.NEUTRAL, Sentiment.BEARISH]),
    source: z.enum([
        Source.REDDIT,
        Source.TWITTER,
        Source.YOUTUBE,
        Source.TELEGRAM,
        Source.FARCASTER,
    ]),
    categories: z.array(z.string()),
    subcategories: z.array(z.string()),
    link: z.string().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

const postGroupSchema = z.object({
    title: z.string(),
    bullishSummary: z.string().optional(),
    bearishSummary: z.string().optional(),
    neutralSummary: z.string().optional(),
    posts: z.array(postSchema),
});

const postGroupsSchema = z.array(postGroupSchema);


export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("x-ingest-secret");

    if (!INGEST_SECRET || authHeader !== INGEST_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let data;
    try {
        data = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }


    const parseResult = postGroupsSchema.safeParse(data);
    if (!parseResult.success) {
        return NextResponse.json({ error: "Validation failed", details: parseResult.error.flatten() }, { status: 400 });
    }
    data = parseResult.data;


    const results = [];
    try {
        for (const group of data) {
            // Create the post group with all its posts atomically
            const createdGroup = await prisma.postGroup.create({
                data: {
                    title: group.title,
                    totalposts: group.posts.length,
                    bullishSummary: group.bullishSummary,
                    bearishSummary: group.bearishSummary,
                    neutralSummary: group.neutralSummary,
                    posts: {
                        createMany: {
                            data: group.posts.map(post => ({
                                content: post.content,
                                sentiment: post.sentiment,
                                source: post.source,
                                categories: post.categories,
                                subcategories: post.subcategories,
                                link: post.link,
                                createdAt: post.createdAt ? new Date(post.createdAt) : undefined,
                                updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined,
                            })),
                        },
                    },
                },
                include: { posts: true },
            });

            results.push({ success: true, postGroup: createdGroup });
        }
        return NextResponse.json(results);
    } catch (e) {
        console.error("Database error during post-group ingest", e);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}