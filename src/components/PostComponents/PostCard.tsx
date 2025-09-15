"use client";

import { IoIosTrendingUp } from "react-icons/io";
import { CiChat1 } from "react-icons/ci";
import { FaTwitter, FaLinkedin, FaReddit } from "react-icons/fa";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Source = {
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
};

type PostData = {
  title: string;
  description: string;
  sentiment: "Bullish" | "Bearish" | "Neutral";
  sentimentBar: { bullish: number; neutral: number; bearish: number };
  postCount: number;
  sources: Source[];
  categories: string[];
  extraTags?: string;
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
        icon: <FaTwitter className="w-2 h-2" />,
        count: 12,
        color: "text-blue-500",
      },
      {
        name: "LinkedIn",
        icon: <FaLinkedin className="w-2 h-2" />,
        count: 8,
        color: "text-blue-600",
      },
      {
        name: "Reddit",
        icon: <FaReddit className="w-2 h-2" />,
        count: 4,
        color: "text-orange-600",
      },
    ],
    categories: ["Bitcoin", "Institutional", "adoption"],
    extraTags: "+1",
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
        icon: <FaTwitter className="w-2 h-2" />,
        count: 10,
        color: "text-blue-500",
      },
      {
        name: "Reddit",
        icon: <FaReddit className="w-2 h-2" />,
        count: 8,
        color: "text-orange-600",
      },
    ],
    categories: ["Ethereum", "DeFi", "Protocol"],
    extraTags: "+2",
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
        icon: <FaLinkedin className="w-2 h-2" />,
        count: 15,
        color: "text-blue-600",
      },
      {
        name: "Reddit",
        icon: <FaReddit className="w-2 h-2" />,
        count: 17,
        color: "text-orange-600",
      },
    ],
    categories: ["Market", "Volatility", "Analysis"],
    extraTags: "+3",
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
    <Card className="w-54 h-60 font-sans">
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
            if (src.name === "Twitter")
              pillClass += " bg-blue-50 text-blue-600 border-blue-200";
            else if (src.name === "LinkedIn")
              pillClass += " bg-blue-50 text-blue-600 border-blue-200";
            else if (src.name === "Reddit")
              pillClass += " bg-orange-50 text-orange-600 border-orange-200";
            else pillClass += " bg-gray-50 text-gray-600 border-gray-200";
            return (
              <span key={src.name + idx} className={pillClass}>
                {src.icon}
                {src.name} <span className="font-semibold">({src.count})</span>
              </span>
            );
          })}
        </div>

        {/* Category/Subcategory Tags */}
        <div className="flex flex-wrap gap-0.5">
          {post.categories.map((cat, idx) => (
            <span
              key={cat + idx}
              className={`px-1 py-0.5 text-[7px] font-medium ${
                idx === 0
                  ? "text-white bg-blue-500"
                  : "text-blue-700 bg-blue-100"
              } rounded-full`}
            >
              #{cat}
            </span>
          ))}
          {post.extraTags && (
            <span className="text-[7px] text-gray-500 px-1 py-0.5">
              {post.extraTags}
            </span>
          )}
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
