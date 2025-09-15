"use client";

import { IoIosTrendingUp } from "react-icons/io";
import { CiChat1 } from "react-icons/ci";
import { FaTwitter, FaLinkedin, FaReddit } from "react-icons/fa";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Source = {
  name: string;
  count: number;
};

type PostData = {
  title: string;
  description: string;
  sentiment: "Bullish" | "Bearish" | "Neutral";
  sentimentBar: { bullish: number; neutral: number; bearish: number };
  postCount: number;
  sources: Source[];
  categories: string[];
  subcategories?: string[];
};

// Mock data array
const mockPostsData: PostData[] = [
  {
    title: "Bitcoin Institutional Adoption & Market Sentiment",
    description:
      "Major financial institutions showing increased interest in Bitcoin with positive analyst reports...",
    sentiment: "Bullish",
    sentimentBar: { bullish: 60, neutral: 25, bearish: 15 },
    postCount: 24,
    sources: [
      {
        name: "Twitter",
        count: 12,
      },
      {
        name: "LinkedIn",
        count: 8,
      },
      {
        name: "Reddit",
        count: 4,
      },
    ],
    categories: ["Bitcoin", "Institutional"],
    subcategories: ["ETF", "Regulation", "Spot", "Futures"],
  },
  {
    title: "Ethereum DeFi Protocol Updates",
    description:
      "New developments in decentralized finance protocols showing promising growth patterns...",
    sentiment: "Neutral",
    sentimentBar: { bullish: 30, neutral: 50, bearish: 20 },
    postCount: 18,
    sources: [
      {
        name: "Twitter",
        count: 10,
      },
      {
        name: "Reddit",
        count: 8,
      },
    ],
    categories: ["Ethereum"],
    subcategories: ["Lending", "DEX", "Staking", "Yield", "Bridge"],
  },
  {
    title: "Market Volatility Analysis",
    description:
      "Recent market downturn showing concerning trends across major cryptocurrencies...",
    sentiment: "Bearish",
    sentimentBar: { bullish: 15, neutral: 25, bearish: 60 },
    postCount: 32,
    sources: [
      {
        name: "LinkedIn",
        count: 15,
      },
      {
        name: "Reddit",
        count: 17,
      },
    ],
    categories: ["Market", "Volatility"],
    subcategories: ["Crash", "Recovery", "Bear", "Bull"],
  },
];

type PostCardProps = {
  posts?: PostData[];
  showMultiple?: boolean;
};

// Single card component
export function SinglePostCard({ post }: { post: PostData }) {
  const sentimentColor =
    post.sentiment === "Bullish"
      ? "text-green-700 bg-green-100"
      : post.sentiment === "Bearish"
      ? "text-red-700 bg-red-100"
      : "text-gray-700 bg-gray-100";

  return (
    <Card className="w-54 h-66 font-sans">
      <CardHeader className="p-2">
        <CardTitle className="text-[10px] font-semibold leading-tight mb-1">
          {post.title}
        </CardTitle>

        <CardDescription className="text-[8px] text-gray-600 mb-2 line-clamp-2">
          {post.description}
        </CardDescription>

        {/* Sentiment indicators */}
        <div className="flex items-center gap-1 mb-2">
          <span
            className={`inline-flex items-center gap-0.5 px-1 py-0.5 text-[8px] font-medium rounded ${sentimentColor}`}
          >
            <IoIosTrendingUp className="w-2 h-2" />
            {post.sentiment}
          </span>
          <div className="flex items-center gap-0.5 text-[8px] text-gray-600">
            <CiChat1 className="w-2 h-2" />
            {post.postCount}
          </div>
        </div>

        {/* Sentiment Bar */}
        <div className="mb-2">
          <div className="flex h-1 w-20 rounded overflow-hidden">
            <div
              className="bg-green-500"
              style={{ flex: post.sentimentBar.bullish }}
            ></div>
            <div
              className="bg-gray-300"
              style={{ flex: post.sentimentBar.neutral }}
            ></div>
            <div
              className="bg-red-500"
              style={{ flex: post.sentimentBar.bearish }}
            ></div>
          </div>
        </div>

        {/* Source Tags */}
        <div className="flex flex-wrap gap-1 mb-2 text-[8px]">
          {post.sources.map((src, idx) => {
            let pillClass =
              "px-2 py-0.5 rounded-full flex items-center gap-1 border text-[9px] font-medium";
            let icon = null;
            if (src.name === "Twitter") {
              pillClass += " bg-blue-50 text-blue-600 border-blue-200";
              icon = <FaTwitter className="w-2 h-2" />;
            } else if (src.name === "LinkedIn") {
              pillClass += " bg-blue-50 text-blue-600 border-blue-200";
              icon = <FaLinkedin className="w-2 h-2" />;
            } else if (src.name === "Reddit") {
              pillClass += " bg-orange-50 text-orange-600 border-orange-200";
              icon = <FaReddit className="w-2 h-2" />;
            } else {
              pillClass += " bg-gray-50 text-gray-600 border-gray-200";
            }
            return (
              <span key={src.name + idx} className={pillClass}>
                {icon}
                {src.name} <span className="font-semibold">({src.count})</span>
              </span>
            );
          })}
        </div>

        {/* Category/Subcategory Tags */}
        <div className="flex flex-wrap gap-0.5">
          {(() => {
            const allTags = [
              ...post.categories.map((cat) => ({
                type: "category",
                value: cat,
              })),
              ...(post.subcategories || []).map((subcat) => ({
                type: "subcategory",
                value: subcat,
              })),
            ];
            const visibleTags = allTags.slice(0, 5);
            const remainingCount = allTags.length - 5;

            return (
              <>
                {visibleTags.map((tag, idx) => (
                  <span
                    key={tag.value + idx}
                    className={`px-1 py-0.5 text-[7px] font-medium rounded-full ${
                      tag.type === "category"
                        ? "text-white bg-blue-500"
                        : "text-blue-700 border border-blue-500 bg-transparent"
                    }`}
                  >
                    #{tag.value}
                  </span>
                ))}
                {remainingCount > 0 && (
                  <span className="px-1 py-0.5 text-[7px] font-medium text-gray-700 bg-gray-100 rounded-full">
                    +{remainingCount} more
                  </span>
                )}
              </>
            );
          })()}
        </div>
      </CardHeader>
    </Card>
  );
}

export default function PostCard({
  posts = mockPostsData,
  showMultiple = true,
}: PostCardProps) {
  if (showMultiple) {
    return (
      <div className="flex flex-row justify-center gap-6 p-2">
        {posts.map((post, index) => (
          <SinglePostCard key={index} post={post} />
        ))}
      </div>
    );
  }

  // Show only the first card if showMultiple is false
  return <SinglePostCard post={posts[0]} />;
}
