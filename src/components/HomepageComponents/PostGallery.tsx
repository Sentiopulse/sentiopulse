"use client";

import { CiChat1 } from "react-icons/ci";
import { FaTwitter, FaLinkedin, FaReddit } from "react-icons/fa";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "../ui/card";
import TagRenderer from "../PostComponents/TagRenderer";
import type { Sentiment, Source } from "@prisma/client";

type PostGroup = {
  id: string;
  title: string;
  posts: Post[];
  totalposts: number;
  bullishSummary?: string | null;
  bearishSummary?: string | null;
  neutralSummary?: string | null;
};

type Post = {
  id: string;
  content: string;
  sentiment: Sentiment;
  source: Source;
  categories: string[];
  subcategories: string[];
  link?: string | null;
  createdAt: string;
  updatedAt: string;
};

// Mock data array
const mockPostGroup: PostGroup[] = [
  {
    id: "group1",
    title: "Bitcoin Historical Milestones & Market Impact",
    totalposts: 3,
    bullishSummary:
      "Bitcoin's journey from pizza transactions to trillion-dollar adoption shows incredible growth potential",
    bearishSummary:
      "Historical volatility and speculative nature raise concerns about sustainable growth",
    neutralSummary:
      "Bitcoin's evolution reflects both opportunities and challenges in the cryptocurrency space",
    posts: [
      {
        id: "post1",
        content:
          "Empery Digital\n@EMPD_BTC\n·\n11m\nBitcoin Firsts that changed everything:\n- $4B Pizza\n- A nation bets on BTC\n- Wall Street embraces it\n- The Trillion-Dollar Club\nFrom a pizza order to reshaping global finance.\n#Bitcoin #BTC #Blockchain #EmperyDigital",
        sentiment: "BULLISH",
        source: "TWITTER",
        categories: ["Cryptocurrency", "Market Analysis"],
        subcategories: ["Bitcoin", "Milestones", "Adoption"],
        link: null,
        createdAt: "2025-09-16T12:00:00.000Z",
        updatedAt: "2025-09-16T12:00:00.000Z",
      },
      {
        id: "post2",
        content:
          "Empery Digital\n@EMPD_BTC\n·\n11m\nSome notable events in Bitcoin's history include:\n- The purchase of pizza with Bitcoin\n- A country adopting BTC\n- Increased interest from Wall Street\n- Joining the Trillion-Dollar Club\nThese milestones reflect Bitcoin's evolving role in finance.\n#Bitcoin #BTC #Blockchain #EmperyDigital",
        sentiment: "NEUTRAL",
        source: "TWITTER",
        categories: ["Cryptocurrency", "Market Analysis"],
        subcategories: ["Bitcoin", "Milestones", "Adoption"],
        link: null,
        createdAt: "2025-09-16T12:00:00.000Z",
        updatedAt: "2025-09-16T12:00:00.000Z",
      },
      {
        id: "post3",
        content:
          "Empery Digital\n@EMPD_BTC\n·\n11m\nRecent events in Bitcoin's history have raised concerns:\n- The infamous $4B pizza purchase\n- A nation risking its economy on BTC\n- Wall Street's speculative involvement\n- Entering the Trillion-Dollar Club amid volatility\nFrom a simple transaction to ongoing financial uncertainty.\n#Bitcoin #BTC #Blockchain #EmperyDigital",
        sentiment: "BEARISH",
        source: "TWITTER",
        categories: ["Cryptocurrency", "Market Analysis"],
        subcategories: ["Bitcoin", "Milestones", "Risks"],
        link: null,
        createdAt: "2025-09-16T12:00:00.000Z",
        updatedAt: "2025-09-16T12:00:00.000Z",
      },
    ],
  },
  {
    id: "group2",
    title: "Ethereum DeFi Ecosystem Updates",
    totalposts: 2,
    bullishSummary:
      "DeFi protocols showing strong innovation and growth in the Ethereum ecosystem",
    bearishSummary:
      "Regulatory concerns and high gas fees continue to challenge DeFi adoption",
    neutralSummary:
      "DeFi development continues with mixed signals from market and regulatory fronts",
    posts: [
      {
        id: "post4",
        content:
          "Major DeFi protocol announces new lending features with improved yield opportunities for users",
        sentiment: "BULLISH",
        source: "REDDIT",
        categories: ["Ethereum", "DeFi"],
        subcategories: ["Lending", "Yield", "Innovation"],
        link: "https://reddit.com/r/ethereum/defi-update",
        createdAt: "2025-09-16T14:00:00.000Z",
        updatedAt: "2025-09-16T14:00:00.000Z",
      },
      {
        id: "post5",
        content:
          "Gas fees on Ethereum network surge to new highs, affecting DeFi transaction costs",
        sentiment: "BEARISH",
        source: "TWITTER",
        categories: ["Ethereum", "DeFi"],
        subcategories: ["Gas Fees", "Network Congestion"],
        link: null,
        createdAt: "2025-09-16T15:00:00.000Z",
        updatedAt: "2025-09-16T15:00:00.000Z",
      },
    ],
  },
];

type PostsGalleryProps = {
  postGroups: PostGroup[];
};

// Single card component for PostGroup
export function PostCard({ postGroup }: { postGroup: PostGroup }) {
  // Calculate sentiment distribution from posts
  const sentimentCounts = postGroup.posts.reduce(
    (acc, post) => {
      acc[post.sentiment.toLowerCase() as keyof typeof acc]++;
      return acc;
    },
    { bullish: 0, neutral: 0, bearish: 0 }
  );

  const totalPosts = postGroup.posts.length;
  const sentimentBar =
    totalPosts > 0
      ? {
          bullish: (sentimentCounts.bullish / totalPosts) * 100,
          neutral: (sentimentCounts.neutral / totalPosts) * 100,
          bearish: (sentimentCounts.bearish / totalPosts) * 100,
        }
      : { bullish: 0, neutral: 0, bearish: 0 };

  // Determine dominant sentiment and description
  const getDominantSentiment = () => {
    const max = Math.max(
      sentimentCounts.bullish,
      sentimentCounts.neutral,
      sentimentCounts.bearish
    );

    if (
      sentimentCounts.bullish === sentimentCounts.neutral &&
      sentimentCounts.neutral === sentimentCounts.bearish
    ) {
      return { sentiment: "NEUTRAL", description: postGroup.neutralSummary };
    }

    if (sentimentCounts.bullish === max) {
      return { sentiment: "BULLISH", description: postGroup.bullishSummary };
    } else if (sentimentCounts.bearish === max) {
      return { sentiment: "BEARISH", description: postGroup.bearishSummary };
    } else {
      return { sentiment: "NEUTRAL", description: postGroup.neutralSummary };
    }
  };

  const dominantSentiment = getDominantSentiment();

  const sentimentColor =
    dominantSentiment.sentiment === "BULLISH"
      ? "text-green-700 bg-green-100"
      : dominantSentiment.sentiment === "BEARISH"
      ? "text-red-700 bg-red-100"
      : "text-gray-700 bg-gray-100";

  // Get source counts
  const sourceCounts = postGroup.posts.reduce((acc, post) => {
    acc[post.source] = (acc[post.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get all categories and subcategories
  const allCategories = [
    ...new Set(postGroup.posts.flatMap((post) => post.categories)),
  ];
  const allSubcategories = [
    ...new Set(postGroup.posts.flatMap((post) => post.subcategories)),
  ];

  return (
    <Card className="w-80 h-80 font-sans transition-transform duration-200 hover:-translate-y-2 group cursor-pointer">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-semibold leading-tight mb-2">
          <div className="flex flex-row justify-between">
            <div className="group-hover:text-blue-500">
          {postGroup.title}
            </div>
            <div className="text-muted-foreground group-hover:text-blue-500">
              <FaArrowRight/>
            </div>
          </div>
        </CardTitle>
        <CardDescription className="text-xs text-gray-600 mb-3 line-clamp-3">
          {dominantSentiment.description}
        </CardDescription>

        {/* Sentiment tag and post count */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${sentimentColor}`}
          >
            {dominantSentiment.sentiment === "BULLISH" && (
              <IoIosTrendingUp className="text-green-600 w-4 h-4" />
            )}
            {dominantSentiment.sentiment === "BEARISH" && (
              <IoIosTrendingDown className="text-red-600 w-4 h-4" />
            )}
            {dominantSentiment.sentiment === "NEUTRAL" && (
              <FiMinus className="text-gray-600 w-4 h-4" />
            )}
            {dominantSentiment.sentiment.charAt(0) +
              dominantSentiment.sentiment.slice(1).toLowerCase()}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <CiChat1 className="w-3 h-3" />
            {postGroup.totalposts} posts
          </div>
        </div>

        {/* Sentiment Bar */}
        <div className="mb-3">
          <div className="flex h-2 w-28 rounded overflow-hidden">
            <div
              className="bg-green-500"
              style={{ flex: sentimentBar.bullish }}
            ></div>
            <div
              className="bg-gray-300"
              style={{ flex: sentimentBar.neutral }}
            ></div>
            <div
              className="bg-red-500"
              style={{ flex: sentimentBar.bearish }}
            ></div>
          </div>
        </div>

        {/* Source Tags */}
        <div className="flex flex-wrap gap-1 mb-3 text-xs">
          {Object.entries(sourceCounts).map(([source, count]) => {
            let pillClass =
              "px-2 py-1 rounded-full flex items-center gap-1 border text-xs font-medium";
            let icon = null;
            if (source === "TWITTER") {
              pillClass += " bg-blue-50 text-blue-600 border-blue-200";
              icon = <FaTwitter className="w-3 h-3" />;
            } else if (source === "LINKEDIN") {
              pillClass += " bg-blue-50 text-blue-600 border-blue-200";
              icon = <FaLinkedin className="w-3 h-3" />;
            } else if (source === "REDDIT") {
              pillClass += " bg-orange-50 text-orange-600 border-orange-200";
              icon = <FaReddit className="w-3 h-3" />;
            } else {
              pillClass += " bg-gray-50 text-gray-600 border-gray-200";
            }
            return (
              <span key={source} className={pillClass}>
                {icon}
                {source} <span className="font-semibold">({count})</span>
              </span>
            );
          })}
        </div>

        {/* Category/Subcategory Tags */}
        <div className="flex flex-wrap gap-1">
          <TagRenderer
            categories={allCategories}
            subcategories={allSubcategories}
          />
        </div>
      </CardHeader>
    </Card>
  );
}

export default function PostsGallery({
  postGroups = mockPostGroup,
}: PostsGalleryProps) {
  return (
    <div className="flex md:flex-row justify-start md:ml-20 gap-6 p-2">
      {postGroups.map((postGroup, index) => (
        <PostCard key={index} postGroup={postGroup} />
      ))}
    </div>
  );
}
