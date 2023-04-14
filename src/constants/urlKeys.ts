const BASE_URL = "https://server-proxy.vercel.app/api";
const ITUNES_URL = "https://itunes.apple.com";

export const urlKeys = {
  baseUrl: `${BASE_URL}`,
  podcastsUrl: `?url=${ITUNES_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`,
  podcastDetailsUrl: (podcastId: string) =>
    `?url=${ITUNES_URL}/lookup?id=${podcastId}`,
  podcastEpisodesUrl: (feedUrl: string) => `${BASE_URL}?url=${feedUrl}`,
};
