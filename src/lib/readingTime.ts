/**
 * Calculates estimated reading time from markdown/text content.
 * Average reading speed: 200 words per minute (English / Vietnamese).
 */
export function getReadingTime(content: string): { minutes: number; text: string } {
  if (!content) {
    return { minutes: 1, text: "1 phút đọc" };
  }

  // Strip code blocks and HTML/markdown tags to estimate prose words
  const clean = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#*`~_\[\]()]/g, " ")
    .trim();

  const words = clean.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return {
    minutes,
    text: `${minutes} phút đọc`,
  };
}
