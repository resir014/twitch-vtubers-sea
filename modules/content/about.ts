import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { renderMarkdown } from '~/utils/markdown-to-html';

export interface AboutPageContents {
  data: {
    title: string;
    description: string;
  };
  content: string;
}

export async function getAboutPage() {
  const fullPath = path.join(process.cwd(), '_content/about.md');
  const contents = await fs.readFile(fullPath);

  const { data, content } = matter(contents);

  return {
    data,
    content: renderMarkdown(content || ''),
  };
}
