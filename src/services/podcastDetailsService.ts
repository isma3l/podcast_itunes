import Parser from "rss-parser";
import { StorageKeys, urlKeys } from "@/constants";
import { get } from "@/lib/api";
import {
  formatDate,
  getLocalDataWithTimeStamp,
  isLocalDataValid,
  storageDataWithTimeStamp,
} from "@/utils";
import {
  PodcastInterface,
  PodcastDetailsInterface,
  EpisodeInterface,
} from "@/models";

type PodcastDetailsResponse = {
  artistId: string;
  trackName: string;
  artistName: string;
  artworkUrl600: string;
  feedUrl: string;
};

type PodcastDetailDataResponse = {
  results: PodcastDetailsResponse[];
};

const parser = new Parser();

const mapperRssToEpisode = (
  item: {
    [key: string]: any;
  } & Parser.Item
): EpisodeInterface => {
  return {
    id: item.guid ?? "",
    title: item.title ?? "",
    date: formatDate(item.pubDate ?? ""),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    duration: item.itunes.duration as string,
    description: item.content ?? "",
    audioUrl: item.enclosure?.url ?? "",
  };
};

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

    const episodes: EpisodeInterface[] = dataRSS.items.map(mapperRssToEpisode);

    const podcastDetails: PodcastDetailsInterface = { podcast, episodes };
    storageDataWithTimeStamp(
      podcastDetails,
      StorageKeys.podcastDetailKey(podcast.id)
    );

    return podcastDetails;
  } catch (error: unknown) {
    console.log(error);
    throw Error("Error");
  }
};

const fetchValidPodCastDetailsFromLocalStorage = (
  podcastId: string
): PodcastDetailsInterface | undefined => {
  const podcastDetailsData = getLocalDataWithTimeStamp<PodcastDetailsInterface>(
    StorageKeys.podcastDetailKey(podcastId)
  );
  const dataValid =
    podcastDetailsData !== undefined && isLocalDataValid(podcastDetailsData);

  return dataValid ? podcastDetailsData.data : undefined;
};

export const fetchPodcastDetails = async (
  podcastId: string
): Promise<PodcastDetailsInterface | undefined> => {
  const podcastDetailsData =
    fetchValidPodCastDetailsFromLocalStorage(podcastId);
  if (podcastDetailsData) return podcastDetailsData;

  const data = await fetchPodcastDetailsFromApi(podcastId);
  return data;
};
