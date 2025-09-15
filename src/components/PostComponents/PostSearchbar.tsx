import { Input } from "@/components/ui/input";
import React from "react";
import { CiSearch } from "react-icons/ci";

interface PostSearchbarProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PostSearchbar({
  search,
  onSearchChange,
}: PostSearchbarProps) {
  return (
    <div className="flex justify-center">
        <div className="relative flex-1 w-full max-w-md">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <CiSearch size={20} />
      </span>
      <Input
        value={search}
        onChange={onSearchChange}
        placeholder="Search posts by keyword..."
        className="w-full pl-10 max-w-md shadow-md rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
      />
        </div>
    </div>
  );
}
