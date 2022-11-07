import { stringifyUrl } from 'query-string';
import {
  HelixFollowsResponse,
  HelixStreamsResponse,
  HelixUsersResponse,
  TwitchOAuthResponse,
} from '~/utils/twitch/types';

export async function getTwitchStreams(token: string, user: string | string[] = 'resir014') {
  console.log('Fetching broadcast info...');

  const apiUrl = stringifyUrl({
    url: 'https://api.twitch.tv/helix/streams',
    query: {
      user_login: Array.isArray(user) ? user.join(',') : user,
    },
  });

  try {
    const data = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
      },
    }).then<HelixStreamsResponse>(res => res.json());

    return data;
  } catch (err: unknown) {
    throw new Error('Unable to authenticate with Twitch API');
  }
}

export async function getTwitchUsers(token: string, user: string | string[] = 'resir014') {
  console.log('Fetching user info...');

  const apiUrl = stringifyUrl({
    url: 'https://api.twitch.tv/helix/users',
    query: {
      login: user,
    },
  });

  try {
    const data = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
      },
    }).then<HelixUsersResponse>(res => res.json());

    return data;
  } catch (err: unknown) {
    throw new Error('Unable to authenticate with Twitch API');
  }
}

export async function getTwitchFollowers(token: string, user: string) {
  console.log('Fetching followers info...');

  const apiUrl = stringifyUrl({
    url: 'https://api.twitch.tv/helix/users/follows',
    query: {
      to_id: user,
      first: 1,
    },
  });

  try {
    const data = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
      },
    }).then<HelixFollowsResponse>(res => res.json());

    return data;
  } catch (err: unknown) {
    throw new Error('Unable to authenticate with Twitch API');
  }
}

export async function getTwitchToken() {
  console.log('Requesting token from Twitch API...');

  const tokenUrl = stringifyUrl({
    url: 'https://id.twitch.tv/oauth2/token',
    query: {
      grant_type: 'client_credentials',
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
    },
  });

  const data = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
    },
  }).then<TwitchOAuthResponse>(res => res.json());

  if (!data.access_token) {
    throw new Error('Cannot retrieve access_token from Twitch API');
  }

  return data;
}
