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
    case 'sg': {
      const { default: vtubersSg } = await import('~/_data/vtubers-sg.json');
      return vtubersSg;
    }
    case 'bn': {
      const { default: vtubersBn } = await import('~/_data/vtubers-bn.json');
      return vtubersBn;
    }
    case 'ph': {
      const { default: vtubersPh } = await import('~/_data/vtubers-ph.json');
      return vtubersPh;
    }
    case 'th': {
      const { default: vtubersTh } = await import('~/_data/vtubers-th.json');
      return vtubersTh;
    }
    case 'vn': {
      const { default: vtubersVn } = await import('~/_data/vtubers-vn.json');
      return vtubersVn;
    }
    case 'la': {
      const { default: vtubersLa } = await import('~/_data/vtubers-la.json');
      return vtubersLa;
    }
    case 'kh': {
      const { default: vtubersTh } = await import('~/_data/vtubers-kh.json');
      return vtubersTh;
    }
    case 'mm': {
      const { default: vtubersMm } = await import('~/_data/vtubers-mm.json');
      return vtubersMm;
    }
    case 'tl': {
      const { default: vtubersTl } = await import('~/_data/vtubers-tl.json');
      return vtubersTl;
    }
    default: {
      return [];
    }
  }
}
