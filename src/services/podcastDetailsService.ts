import Parser from "rss-parser";
import { urlKeys } from "@/constants";
import { get } from "@/lib/api";
import {
  PodcastInterface,
  PodcastDetailsInterface,
  EpisodeInterface,
} from "@/models";

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

const parser = new Parser();

const fetchPodcastDetailsFromApi = async (
  podcastId: string
): Promise<PodcastDetailsInterface | undefined> => {
  try {
    const data = await get<PodcastDetailDataResponse>(
      urlKeys.podcastDetailsUrl(podcastId)
    );

    const podcastDetailsResponse = data.results[0];
    const feedUrlWithCors = urlKeys.podcastEpisodesUrl(
      podcastDetailsResponse.feedUrl
    );
    const dataRSS = await parser.parseURL(feedUrlWithCors);

    const podcast: PodcastInterface = {
      id: podcastDetailsResponse.artistId,
      title: podcastDetailsResponse.trackName,
      author: podcastDetailsResponse.artistName,
      urlImage: podcastDetailsResponse.artworkUrl600,
      description: dataRSS.description,
    };

    const episodes: EpisodeInterface[] = dataRSS.items.map((item) => ({
      id: item.guid ?? "",
      title: item.title ?? "",
      date: item.pubDate ?? "",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      duration: item.itunes.duration as string,
      description: item.content ?? "",
      audioUrl: item.enclosure?.url ?? "",
    }));

    return { podcast, episodes };
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
