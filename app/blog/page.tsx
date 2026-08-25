import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Blog</h1>

      <div className="grid gap-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="border rounded-xl p-4 hover:bg-black/5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="font-medium">{p.title}</div>
              <div className="text-sm opacity-70">{p.date}</div>
            </div>
            <p className="text-sm opacity-80 mt-2">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
