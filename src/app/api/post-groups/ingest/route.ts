import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Set this env variable in your deployment environment
const INGEST_SECRET = process.env.INGEST_SECRET;

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

    // Zod validation schema
    const postSchema = z.object({
        content: z.string(),
        sentiment: z.enum(["BULLISH", "NEUTRAL", "BEARISH"]),
        source: z.enum(["REDDIT", "TWITTER", "YOUTUBE", "TELEGRAM", "FARCASTER"]),
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
        posts: z.array(postSchema).optional(),
    });

    const postGroupsSchema = z.array(postGroupSchema);

    const parseResult = postGroupsSchema.safeParse(data);
    if (!parseResult.success) {
        return NextResponse.json({ error: "Validation failed", details: parseResult.error.flatten() }, { status: 400 });
    }
    data = parseResult.data;


    const results = [];
    try {
        for (const group of data) {
            // Create the post group
            const createdGroup = await prisma.postGroup.create({
                data: {
                    title: group.title,
                    totalposts: Array.isArray(group.posts) ? group.posts.length : 0,
                    bullishSummary: group.bullishSummary,
                    bearishSummary: group.bearishSummary,
                    neutralSummary: group.neutralSummary,
                },
            });

            // Create posts for this group using createMany
            if (Array.isArray(group.posts) && group.posts.length > 0) {
                await prisma.post.createMany({
                    data: group.posts.map((post: {
                        content: string;
                        sentiment: "BULLISH" | "NEUTRAL" | "BEARISH";
                        source: "REDDIT" | "TWITTER" | "YOUTUBE" | "TELEGRAM" | "FARCASTER";
                        categories: string[];
                        subcategories: string[];
                        link?: string;
                        createdAt?: string;
                        updatedAt?: string;
                    }) => ({
                        content: post.content,
                        sentiment: post.sentiment,
                        source: post.source,
                        categories: post.categories,
                        subcategories: post.subcategories,
                        link: post.link,
                        postGroupId: createdGroup.id,
                        createdAt: post.createdAt ? new Date(post.createdAt) : undefined,
                        updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined,
                    })),
                });
            }

            // Fetch the group with its posts
            const groupWithPosts = await prisma.postGroup.findUnique({
                where: { id: createdGroup.id },
                include: { posts: true },
            });

            results.push({ success: true, postGroup: groupWithPosts });
        }
        return NextResponse.json(results);
    } catch (e) {
        console.error("Database error during post-group ingest", e);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}