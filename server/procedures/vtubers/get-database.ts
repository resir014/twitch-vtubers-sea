export async function getDatabase(country?: string) {
  switch (country) {
    case 'id': {
      const { default: vtubersId } = await import('~/modules/database/streamers/id');
      return vtubersId;
    }
    case 'my': {
      const { default: vtubersMy } = await import('~/modules/database/streamers/my');
      return vtubersMy;
    }
    case 'th': {
      const { default: vtubersTh } = await import('~/modules/database/streamers/th');
      return vtubersTh;
    }
    default: {
      return [];
    }
  }
}
