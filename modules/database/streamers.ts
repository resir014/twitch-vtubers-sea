import { VtuberDetail } from '~/modules/database/types';

export async function getDatabase(country?: string): Promise<VtuberDetail[]> {
  switch (country) {
    case 'id': {
      const { default: vtubersId } = await import('~/_data/vtubers-id.json');
      return vtubersId;
    }
    case 'my': {
      const { default: vtubersMy } = await import('~/_data/vtubers-my.json');
      return vtubersMy;
    }
    case 'th': {
      const { default: vtubersTh } = await import('~/_data/vtubers-my.json');
      return vtubersTh;
    }
    case 'kh': {
      const { default: vtubersTh } = await import('~/_data/vtubers-kh.json');
      return vtubersTh;
    }
    default: {
      return [];
    }
  }
}
