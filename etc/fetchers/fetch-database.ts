import fs from 'fs';
import path from 'path';
import { load } from 'cheerio';
import fetch from 'cross-fetch';
import { VtuberDetail } from '~/modules/database/types';
import { allIsEmptyString } from '../../utils/string-utils';
import { parseDatabase } from './utils';

export async function fetchDatabase() {
  const source = await fetch(
    'https://docs.google.com/spreadsheets/d/1j3IF7d8zmj8Cgy_NljNRjfYMAyZt3M0VJubzJ7Ib3j4/htmlview'
  );
  const $ = load(await source.text());
  const { default: countries } = await import('../../_content/countries.json');

  const colMap: Record<string, string> = {};

  const sheetList = $('#sheet-menu > li')
    .map((_, li) => {
      const sheetId = $(li).attr('id')?.replace('sheet-button-', '');
      const sheetName = $(li).text();
      const slug = countries.find(item => item.name === sheetName)?.id;

      const sheetColumns = $(`#${sheetId} tbody > tr:nth-child(2)`)
        .find('td')
        .map((colIndex, td) => {
          colMap[colIndex] = $(td).text();
          return {
            name: $(td).text(),
            index: colIndex,
          };
        })
        .toArray()
        .filter(col => col.name.trim().length !== 0);

      const sheetRows = $(`#${sheetId} tbody > tr`)
        .map((rowIndex, tr) => {
          // Clear the first two columns
          if (rowIndex === 0 || rowIndex === 1) {
            return [];
          }
          return [
            $(tr)
              .find('td')
              .map((colIndex, td) => {
                if (colMap[colIndex]) {
                  if (colIndex === 5) {
                    // Render entire HTML element for Website URL
                    return ($(td).html() as string).trim();
                  } else {
                    return $(td).text().trim();
                  }
                }
                return '';
              })
              .toArray(),
          ];
        })
        .toArray()
        .filter(row => !allIsEmptyString(row));

      return {
        id: sheetId,
        slug,
        name: sheetName,
        data: sheetRows.map((row, rowIndex) => {
          return sheetColumns.reduce(parseDatabase(row), {
            id: rowIndex.toString(),
          });
        }),
      };
    })
    .toArray()
    .filter(item => !!item.slug);

  for (const country of sheetList) {
    const countryCode = country.slug;

    if (!countryCode) {
      break;
    }

    const content: VtuberDetail[] = country.data.map(item => {
      const nextData: VtuberDetail = {
        type: 'twitch',
        id: String(item.twitch_username),
        name: String(item.name),
        birthday: String(item.birthday),
        persona: String(item.persona),
        affiliation: String(item.affiliation),
        other_platforms: [],
      };

      if (item.website_carrd) {
        nextData.other_platforms.push({
          type: 'website',
          link: String(item.website_carrd),
        });
      }

      if (item.twitter) {
        nextData.other_platforms.push({
          type: 'twitter',
          link: String(item.twitter),
        });
      }

      if (item.youtube_handle) {
        nextData.other_platforms.push({
          type: 'youtube',
          handle: String(item.youtube_handle),
        });
      } else if (item.youtube_vanity_url) {
        nextData.other_platforms.push({
          type: 'youtube',
          vanity_url: String(item.youtube_vanity_url),
        });
      } else if (item.youtube_id) {
        nextData.other_platforms.push({
          type: 'youtube',
          id: String(item.youtube_id),
        });
      }

      return nextData;
    });

    fs.writeFileSync(
      path.resolve(__dirname, `../../_data/vtubers-${countryCode}.json`),
      JSON.stringify(content, null, 2)
    );
  }
}
