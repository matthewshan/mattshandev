import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

export type PostMetadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  imageFit?: string;
  images: string[];
  tags?: string[];
  team: TeamMember[];
  link?: string;
};

export type PostEntry = {
  metadata: PostMetadata;
  slug: string;
  content: string;
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((value): value is string => typeof value === "string")
    : typeof data.tag === "string"
      ? [data.tag]
      : [];

  const metadata: PostMetadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    imageFit: data.imageFit || "",
    images: data.images || [],
    tags,
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string): PostEntry[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
