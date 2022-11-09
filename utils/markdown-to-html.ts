/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import markdownit from 'markdown-it';

export function renderMarkdown(markdown?: string) {
  const md = markdownit({
    html: true,
  });

  if (markdown) {
    const result = md.render(markdown);
    return result;
  }

  return '';
}
