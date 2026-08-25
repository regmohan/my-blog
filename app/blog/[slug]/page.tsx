import { remark } from "remark";
import html from "remark-html";
import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = (await params) as { slug?: string };
  if (!slug) notFound();

  let post;
  try {
    post = getPostBySlug(slug);
  } catch (err) {
    notFound();
  }

  const { meta, content } = post;
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return (
    <div className="max-w-5xl mx-auto px-4">
      <article className="prose lg:prose-lg mx-auto py-8">
        <h1 className="text-2xl font-semibold">{meta.title}</h1>
        <div className="text-sm opacity-70 mb-6">{meta.date}</div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
}
