import { cache } from "react";
import { getAllPostSummaries } from "@/lib/posts";
import { toSearchablePost, type SearchablePost } from "@/lib/search";

export const getSearchablePosts = cache((): SearchablePost[] =>
  getAllPostSummaries().map(toSearchablePost)
);
