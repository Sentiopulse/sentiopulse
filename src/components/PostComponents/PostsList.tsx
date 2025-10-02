"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import SentimentBar from "./SentimentBar";
import PostFilters from "../HomepageComponents/PostSearch";
import { SortField, SortOrder } from "./PostSortSelect";
import Spinner from "./Spinner";
import type { Post } from "@prisma/client";
import PostGallery from "../HomepageComponents/PostGallery";
import BullishMarketCard from "../HomepageComponents/BullishMarketCard";
import Posr

export default function PostsList() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [info, setInfo] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Fetch posts (initial and paginated)
  const fetchPosts = useCallback(
    async (cursor?: string, reset = false) => {
      if (cursor) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (sortField) params.append("sort", sortField);
        if (sortOrder) params.append("order", sortOrder);
        if (sentimentFilter && sentimentFilter !== "all")
          params.append("sentiment", sentimentFilter);
        if (sourceFilter && sourceFilter !== "all")
          params.append("source", sourceFilter);
        params.append("limit", "2");
        if (cursor) params.append("cursor", cursor);
        const res = await fetch(`/api/posts?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
          setInfo([]);
          setHasMore(false);
        } else {
          setError(null);
          setHasMore(data.hasMore);
          setNextCursor(data.nextCursor);
          setInfo((prev) => (reset ? data.data : [...prev, ...data.data]));
        }
      } catch {
        setError("An error occurred while fetching posts.");
        setInfo([]);
        setHasMore(false);
      } finally {
        if (cursor) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [search, sortField, sortOrder, sentimentFilter, sourceFilter]
  );

  // Initial fetch or filter change
  useEffect(() => {
    setInfo([]);
    setNextCursor(null);
    setHasMore(true);
    fetchPosts(undefined, true);
  }, [search, sortField, sortOrder, sentimentFilter, sourceFilter, fetchPosts]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading && nextCursor) {
        fetchPosts(nextCursor);
      }
    });
    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }
    return () => observer.current?.disconnect();
  }, [hasMore, loading, nextCursor, fetchPosts]);

  return (
    <div className="mt-8">
      <PostSearch
        search={search}
        onSearchChange={onChangeHandler}
      />
      <BullishMarketCard/>
      <PostGallery/>
    </div>
  );
}
