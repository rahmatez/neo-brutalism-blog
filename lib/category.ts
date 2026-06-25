export function toCategorySlug(category: string): string {
  return category.trim().toLowerCase().replace(/\s+/g, "-");
}
