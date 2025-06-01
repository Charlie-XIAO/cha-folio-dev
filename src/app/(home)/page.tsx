import { ChaImage } from "@/components/ChaImage";
import { ChaPostCard } from "@/components/ChaPostCard";
import { getPosts } from "@/lib/posts.data";
import { homeSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { notFound } from "next/navigation";
import { LuLink } from "react-icons/lu";
import Link from "fumadocs-core/link";
import { getPublications } from "@/lib/publications.data";
import { ChaPublicationItem } from "@/components/ChaPublicationItem";
import config from "@/cha-folio.config";
import { nodeInnerText } from "@/lib/utils";
import { ChaHomePage } from "@/components/ChaHomePage";
import { ChaSocialLinks } from "@/components/ChaSocialLinks";

const {
  title,
  description,
  image,
  showNews = 3,
  showPosts = 3,
  showPublications = true,
} = config.pages?.home ?? {};

const posts = showPosts ? getPosts({ featuredFirst: false }) : [];
const publications = showPublications
  ? getPublications({ selectedOnly: true })
  : [];

export default function HomePage() {
  const page = homeSource.getPage([]);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <ChaHomePage
      title={page.data.title ?? title ?? config.name}
      description={page.data.description ?? description}
    >
      <div>
        {image && (
          <ChaImage
            image={image}
            width={600}
            height={600}
            className="block w-[60%] max-w-[300px] mx-auto mb-6 rounded-md md:float-right md:w-[30%] md:ml-6 md:mb-4 object-cover"
          />
        )}

        <div className="prose">
          <div></div>
          <MDXContent components={getMDXComponents()} />
          <div></div>
        </div>
      </div>

      {showNews && <News />}
      {showPosts && posts.length > 0 && <Posts />}
      {showPublications && publications.length > 0 && <Publications />}

      <ChaSocialLinks className="mt-12" />
    </ChaHomePage>
  );
}

export function generateMetadata() {
  const page = homeSource.getPage([]);
  if (!page) notFound();

  const finalTitle = page.data.title ?? title ?? config.name;
  const finalDescription = page.data.description ?? description;

  return {
    title: nodeInnerText(finalTitle),
    description: nodeInnerText(finalDescription),
  };
}

function News() {
  return (
    <div>
      <div className="prose">
        <div></div>
        <h2 className="inline-flex items-center gap-3">
          News
          <Link href="/news" title="View all news">
            <LuLink />
          </Link>
        </h2>
        <div></div>
      </div>

      <div>TODO</div>
    </div>
  );
}

function Posts() {
  return (
    <div>
      <div className="prose">
        <div></div>
        <h2 className="inline-flex items-center gap-3">
          Latest Posts
          <Link href="/blog" title="View all posts">
            <LuLink />
          </Link>
        </h2>
        <div></div>
      </div>

      <ul className="flex flex-col gap-4">
        {posts.slice(0, 3).map((post) => (
          <li key={post.url} className="w-full">
            <ChaPostCard {...post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Publications() {
  return (
    <div>
      <div className="prose">
        <div></div>
        <h2 className="inline-flex items-center gap-3">
          Selected Publications
          <Link href="/publications" title="View all publications">
            <LuLink />
          </Link>
        </h2>
        <div></div>
      </div>

      <ul className="border-t">
        {publications.map((pub) => (
          <li key={pub.citationKey} className="w-full py-6 px-2 border-b">
            <ChaPublicationItem {...pub} />
          </li>
        ))}
      </ul>
    </div>
  );
}
