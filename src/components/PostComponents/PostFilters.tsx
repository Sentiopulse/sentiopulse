import { Select, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PostSortSelect, SortField, SortOrder } from "./PostSortSelect";

interface PostFiltersProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PostFilters({
  search,
  onSearchChange,
}: PostFiltersProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-center">
        <Input
          value={search}
          onChange={onSearchChange}
          placeholder="Search posts..."
          className="w-full max-w-md shadow-md rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
        />
      </div>
    </div>
  );
}
