import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts, getBlogPost } from "@/data/blog-posts";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: { canonical: `/news/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <main>
        <article className="blog-article">
          <header className="blog-article-hero">
            <Link href="/news" className="text-link">News and blog</Link>
            <p>{post.category}</p>
            <h1>{post.h1}</h1>
            <span>{post.metaDescription}</span>
          </header>

          <section className="blog-planning">
            <h2>Topic Planning</h2>
            <div>
              <strong>Target keyword</strong>
              <p>{post.targetKeyword}</p>
            </div>
            <div>
              <strong>Search intent</strong>
              <p>{post.searchIntent}</p>
            </div>
            <div>
              <strong>Why this topic works as a blog</strong>
              <p>{post.whyThisBlog}</p>
            </div>
          </section>

          <section className="blog-body">
            <h2>Introduction</h2>
            {post.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

            {post.sections.map((section, index) => (
              <section key={section.h2}>
                <h2>{section.h2}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.h3?.map((subsection) => (
                  <div key={subsection.title}>
                    <h3>{subsection.title}</h3>
                    {subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                ))}
                {index === 2 ? (
                  <aside className="article-cta">
                    <strong>Need a practical recommendation?</strong>
                    <p>{post.cta.midArticle}</p>
                    <Link className="button" href="/request-a-quote">
                      Send Your Requirements <ArrowRight size={18} />
                    </Link>
                  </aside>
                ) : null}
              </section>
            ))}

            <h2>FAQ</h2>
            <div className="blog-faq">
              {post.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>

            <h2>Conclusion</h2>
            {post.conclusion.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

            <aside className="article-cta final">
              <strong>Ready to discuss your weighing project?</strong>
              <p>{post.cta.final}</p>
              <Link className="button" href="/request-a-quote">
                Get a Quote <ArrowRight size={18} />
              </Link>
            </aside>
          </section>

        </article>
      </main>
      <SiteFooter />
    </>
  );
}
