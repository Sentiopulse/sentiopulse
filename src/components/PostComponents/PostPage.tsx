"use client";
import PostSearchbar from "./PostSearchbar";
import PostFilterButton from "./PostFilterButton";
import { useState } from "react";

export default function PostPage() {
  const [search, setSearch] = useState("");
  return (
    <div>
        <div className="flex flex-row justify-center items-center gap-4">
      <PostSearchbar
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      />
      <PostFilterButton />
        </div>
    </div>
  );
}
