const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://itunes.apple.com";

export const urlKeys = {
  baseUrlWithCors: `${CORS_PROXY}${BASE_URL}`,
  proxyUrl: "https://cors-anywhere.herokuapp.com/",
  podcastsUrl: "/us/rss/toppodcasts/limit=100/genre=1310/json",
  podcastDetailsUrl: (podcastId: string) => `/lookup?id=${podcastId}`,
  podcastEpisodesUrl: (feedUrl: string) => `${CORS_PROXY}${feedUrl}`,
};
