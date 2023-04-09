import { get } from "@/lib/api";
import { PodcastInterface, PodcastDetailsInterface } from "@/models";

type PodcastDetailsResponse = {
  artistId: string;
  trackName: string; // title
  artistName: string; // author
  artworkUrl600: string;
  feedUrl: string;
};

type PodcastDetailDataResponse = {
  results: PodcastDetailsResponse[];
};

const PODCAST_DETAIL_URL = "https://itunes.apple.com/lookup?id=";

const fetchPodcastDetailsFromApi = async (
  podcastId: string
): Promise<PodcastDetailsInterface | undefined> => {
  try {
    const data = await get<PodcastDetailDataResponse>(
      `${PODCAST_DETAIL_URL}${podcastId}`
    );

    const podcastDetailsResponse = data.results[0];
    const podcast: PodcastInterface = {
      id: podcastDetailsResponse.artistId,
      title: podcastDetailsResponse.trackName,
      author: podcastDetailsResponse.artistName,
      urlImage: podcastDetailsResponse.artworkUrl600,
    };

    return { podcast, episodes: [] };
  } catch (error: unknown) {
    console.log(error);
    throw Error("Error");
  }
};

export const fetchPodcastDetails = async (
  podcastId: string
): Promise<PodcastDetailsInterface | undefined> => {
  const data = await fetchPodcastDetailsFromApi(podcastId);
  return data;
};
