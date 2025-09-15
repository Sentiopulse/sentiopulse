import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PostSearchbar from "./PostSearchbar";
import { PostSortSelect, SortField, SortOrder } from "./PostSortSelect";

interface PostFiltersProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
  sentimentFilter: string;
  onSentimentChange: (value: string) => void;
  sourceFilter: string;
  onSourceChange: (value: string) => void;
}

export default function PostFilters({
  search,
  onSearchChange,
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
  sentimentFilter,
  onSentimentChange,
  sourceFilter,
  onSourceChange,
}: PostFiltersProps) {
  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <PostSearchbar search={search} onSearchChange={onSearchChange} />

      {/* Filters & Sorters Card */}
      <div className="flex flex-wrap justify-between items-center gap-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Sorters */}
        <div className="flex flex-col items-center justify-center pl-6 pr-8">
          <label className="text-base font-semibold text-blue-700 mb-2 self-center tracking-wide">
            Sort
          </label>
          <div className="w-40">
            <PostSortSelect
              sortField={sortField}
              sortOrder={sortOrder}
              onSortFieldChange={onSortFieldChange}
              onSortOrderChange={onSortOrderChange}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-6">
          <div className="flex flex-col min-w-[170px]">
            <label className="text-base font-semibold text-purple-500 mb-2">
              Sentiment
            </label>
            <Select value={sentimentFilter} onValueChange={onSentimentChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="BULLISH">Bullish</SelectItem>
                <SelectItem value="NEUTRAL">Neutral</SelectItem>
                <SelectItem value="BEARISH">Bearish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col min-w-[170px]">
            <label className="text-base font-semibold text-purple-500 mb-2">
              Source
            </label>
            <Select value={sourceFilter} onValueChange={onSourceChange}>
              <SelectTrigger>
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
        </div>
      </div>
    </div>
  );
}
