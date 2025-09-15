import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { X } from "lucide-react";
import { SortField, SortOrder } from "./PostSortSelect";

interface PostFilterModalProps {
  onClose?: () => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
  sentimentFilter: string;
  onSentimentChange: (value: string) => void;
  sourceFilter: string;
  onSourceChange: (value: string) => void;
  fromDate?: string;
  toDate?: string;
  onFromDateChange?: (date: string) => void;
  onToDateChange?: (date: string) => void;
  onClearAll?: () => void;
  onApplyFilters?: () => void;
}

export default function PostFilterModal({
  onClose,
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
  sentimentFilter,
  onSentimentChange,
  sourceFilter,
  onSourceChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onClearAll,
  onApplyFilters,
}: PostFilterModalProps) {
  return (
    <div className="w-[280px] h-[380px] max-w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-3">
          <CardTitle className="text-sm font-semibold">Filter Posts</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-4 w-4 p-0"
          >
            <X className="h-2 w-2" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-2 px-3 pb-3">
          <p className="text-[10px] text-muted-foreground">
            Refine your search with advanced filters
          </p>

          {/* Sentiment Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-medium">Sentiment</label>
            <Select value={sentimentFilter} onValueChange={onSentimentChange}>
              <SelectTrigger className="h-6 text-[10px]">
                <SelectValue placeholder="Select sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="BULLISH">Bullish</SelectItem>
                <SelectItem value="BEARISH">Bearish</SelectItem>
                <SelectItem value="NEUTRAL">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Source Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-medium">Source</label>
            <Select value={sourceFilter} onValueChange={onSourceChange}>
              <SelectTrigger className="h-6 text-[10px]">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="REDDIT">Reddit</SelectItem>
                <SelectItem value="TWITTER">Twitter</SelectItem>
                <SelectItem value="YOUTUBE">YouTube</SelectItem>
                <SelectItem value="TELEGRAM">Telegram</SelectItem>
                <SelectItem value="FARCASTER">Farcaster</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-medium">Sort By</label>
            <Select value={sortField} onValueChange={onSortFieldChange}>
              <SelectTrigger className="h-6 text-[10px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date Created</SelectItem>
                <SelectItem value="sentiment">Sentiment</SelectItem>
                <SelectItem value="source">Source</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-1">
            <div className="space-y-1">
              <label className="text-[10px] font-medium">From Date</label>
              <div className="relative">
                <Input
                  type="date"
                  value={fromDate || ""}
                  onChange={(e) => onFromDateChange?.(e.target.value)}
                  placeholder="Pick date"
                  className="h-6 text-[10px] pl-1 pr-5"
                />
                <Calendar className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium">To Date</label>
              <div className="relative">
                <Input
                  type="date"
                  value={toDate || ""}
                  onChange={(e) => onToDateChange?.(e.target.value)}
                  placeholder="Pick date"
                  className="h-6 text-[10px] pl-1 pr-5"
                />
                <Calendar className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-1">
            <Button
              variant="ghost"
              className="text-[10px] h-6 px-2"
              onClick={onClearAll}
            >
              Clear All
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-[10px] h-6 px-2"
              onClick={onApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
