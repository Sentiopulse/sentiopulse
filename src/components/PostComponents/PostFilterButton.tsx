"use client";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import PostFilterModal from "./PostFilterModal";
import { SortField, SortOrder } from "./PostSortSelect";

export default function PostFilterButton() {
  const [showModal, setShowModal] = useState(false);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleClearAll = () => {
    setSortField("createdAt");
    setSortOrder("desc");
    setSentimentFilter("all");
    setSourceFilter("all");
    setFromDate("");
    setToDate("");
  };

  const handleApplyFilters = () => {
    // Apply the filters (you can add your filter logic here)
    console.log("Applying filters:", {
      sortField,
      sortOrder,
      sentimentFilter,
      sourceFilter,
      fromDate,
      toDate,
    });
    setShowModal(false);
  };
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
        className="flex flex-row-reverse justify-center items-center gap-1 font-sans h-8 w-16 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition cursor-pointer text-foreground hover:text-background hover:bg-blue-400"
      >
        <span className="text-xs font-semibold">Filter</span>
        <span>
          <CiFilter size={12} />
        </span>
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <PostFilterModal
            onClose={() => setShowModal(false)}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortFieldChange={setSortField}
            onSortOrderChange={setSortOrder}
            sentimentFilter={sentimentFilter}
            onSentimentChange={setSentimentFilter}
            sourceFilter={sourceFilter}
            onSourceChange={setSourceFilter}
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
            onClearAll={handleClearAll}
            onApplyFilters={handleApplyFilters}
          />
        </div>
      )}
    </>
  );
}
