import { Input } from "@/components/ui/input";

interface PostFiltersProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PostSearch({
  search,
  onSearchChange,
}: PostFiltersProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-center">
        <Input
          value={search}
          onChange={onSearchChange}
          placeholder="Search posts by keyword..."
          className="md:w-[600px] h-10 shadow-md rounded-lg bg-violet-50 border-2 focus-visible:!border-blue-500 focus:!ring-0 focus-visible:!ring-0"
        />
      </div>
    </div>
  );
}
