import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { renderMarkdown } from '~/utils/markdown-to-html';

export async function getContributePage() {
  const fullPath = path.join(process.cwd(), '_content/contribute.md');
  const contents = await fs.readFile(fullPath);

  const { data, content } = matter(contents);

  return {
    data,
    content: renderMarkdown(content || ''),
  };
}
