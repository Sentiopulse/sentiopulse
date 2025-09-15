import React from "react";

type Tag = {
  type: "category" | "subcategory";
  value: string;
};

type TagRendererProps = {
  categories: string[];
  subcategories?: string[];
};

export default function TagRenderer({
  categories,
  subcategories,
}: TagRendererProps) {
  const allTags: Tag[] = [
    ...categories.map((cat) => ({ type: "category" as const, value: cat })),
    ...(subcategories || []).map((subcat) => ({
      type: "subcategory" as const,
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
}
