import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FaRegChartBar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";

// Mock data representing overall sentiment and source aggregation
const MockData = {
  totalSourceCount: 1247, // explicit total source count for display
  sentimentCounts: {
    BULLISH: 812,
    NEUTRAL: 215,
    BEARISH: 220,
  },
  get sentimentPercentages(): {
    BULLISH: number;
    NEUTRAL: number;
    BEARISH: number;
  } {
    const { BULLISH, NEUTRAL, BEARISH } = this.sentimentCounts;
    const total = BULLISH + NEUTRAL + BEARISH;
    return {
      BULLISH: Math.round((BULLISH / total) * 100),
      NEUTRAL: Math.round((NEUTRAL / total) * 100),
      BEARISH: Math.round((BEARISH / total) * 100),
    };
  },
  updatedAt: new Date('2025-09-16T09:55:00Z'), // Fixed date for SSR compatibility
  get minutesAgo() {
    return Math.floor((Date.now() - this.updatedAt.getTime()) / 60000);
  },
};

export default function BullishMarketCard() {
  return (
    <div className="flex justify-center font-sans">
      <Card className="flex w-[500px] h-[240px] md:w-[800px] bg-gradient-to-r from-green-50 to-white border-l-green-500">
        <CardHeader className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full">
            <CardTitle className="font-semibold">Bullish Market</CardTitle>
            <CardAction className="flex flex-row gap-1 bg-muted px-1.5 py-0.5 border rounded-2xl">
              <span>
                <FaRegChartBar size={14} />
              </span>
              <span className="font-bold text-[11px]">
                {MockData.totalSourceCount} Sources
              </span>
            </CardAction>
          </div>
          <CardDescription className="flex flex-row justify-evenly items-center gap-8 w-full mt-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-green-500">
                {MockData.sentimentPercentages.BULLISH}%
              </span>
              <span className="text-xs">Bullish</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                {MockData.sentimentPercentages.NEUTRAL}%
              </span>
              <span className="text-xs">Neutral</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-red-500">
                {MockData.sentimentPercentages.BEARISH}%
              </span>
              <span className="text-xs">Bearish</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-start">
            <div className="flex flex-row items-center gap-6 w-[100px]">
              <span style={{ width: `${MockData.sentimentPercentages.BULLISH}%` }} className="bg-green-500 h-2.5 rounded-2xl"></span>
              <span className="text-muted-foreground text-xs">
                {MockData.sentimentPercentages.BULLISH}%
              </span>
            </div>
            <div className="flex flex-row items-center gap-6 w-[100px]">
              <span style={{ width: `${MockData.sentimentPercentages.NEUTRAL}%` }} className="bg-gray-500 h-2.5 w-10 rounded-2xl"></span>
              <span className="text-muted-foreground text-xs">
                {MockData.sentimentPercentages.NEUTRAL}%
              </span>
            </div>
            <div className="flex flex-row items-center gap-6 w-[100px]">
              <span style={{ width: `${MockData.sentimentPercentages.BEARISH}%` }} className="bg-red-500 h-2.5 w-10 rounded-2xl"></span>
              <span className="text-muted-foreground text-xs">
                {MockData.sentimentPercentages.BEARISH}%
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-row gap-2 items-center">
            <span>
              <CiCalendar size={16} className="text-gray-500" />
            </span>
            <span className="text-muted-foreground text-xs">
              Updated {MockData.minutesAgo} minutes ago
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
