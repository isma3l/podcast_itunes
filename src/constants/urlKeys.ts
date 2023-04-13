const BASE_URL = "https://server-proxy-podcasts.vercel.app";

export const urlKeys = {
  baseUrl: BASE_URL,
  podcastsUrl: "/api/podcasts",
  podcastDetailsUrl: (podcastId: string) => `/api/podcasts/${podcastId}`,
  podcastEpisodesUrl: (feedUrl: string) =>
    `${BASE_URL}/api/episodes?feedurl=${feedUrl}`,
};
