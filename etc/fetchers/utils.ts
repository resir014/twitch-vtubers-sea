import { load } from 'cheerio';
import { toSnakeCase } from '../../utils/string-utils';

export interface SheetColumn {
  name: string;
  index: number;
}

export function parseString(value: string | number | null): string | null {
  if (!value) {
    return null;
  }

  return String(value);
}

export function extractURL(value: string): string {
  const $ = load(value);
  const links = $('a');
  links.each((_, link): void => {
    const el = $(link);
    const href = el.attr('href');
    const url = new URL(href as string);
    const usp = new URLSearchParams(url.search);
    el.attr('href', usp.get('q'));
  });
  const href = $('a').attr('href');
  const linkText = $('body').text();

  return href ? href : linkText ? linkText : '';
}

export function parseDatabase(row: string[]) {
  return (prev: Record<string, number | string | null>, col: SheetColumn) => {
    const colName = toSnakeCase(col.name);
    let cellValue = row[col.index];

    if (colName === 'website_carrd') {
      cellValue = extractURL(cellValue);
    }

    prev[colName] = cellValue;

    return prev;
  };
}
