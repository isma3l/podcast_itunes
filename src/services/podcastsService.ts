import { get } from "@/lib/api";
import { PodcastInterface } from "@/models";
import {
  getLocalDataWithTimeStamp,
  storageDataWithTimeStamp,
  isLocalDataValid,
} from "@/utils";

type PodcastsResponse = {
  id: { attributes: { "im:id": string } };
  "im:artist": { label: string };
  "im:name": { label: string };
  "im:image": { label: string }[];
};

type PodcastDataResponse = {
  feed: { entry: PodcastsResponse[] };
};

const PODCASTS_URL = "/us/rss/toppodcasts/limit=100/genre=1310/json";
const LOCAL_KEY_PODCASTS = "podcasts_local";

const fetchPodCastFromApi = async (): Promise<
  PodcastInterface[] | undefined
> => {
  try {
    const data = await get<PodcastDataResponse>(PODCASTS_URL);

    const podcasts: PodcastInterface[] = data.feed.entry.map((podcast) => ({
      id: podcast.id.attributes["im:id"],
      title: podcast["im:name"].label,
      author: podcast["im:artist"].label,
      urlImage: podcast["im:image"][2].label,
    }));

    storageDataWithTimeStamp(podcasts, LOCAL_KEY_PODCASTS);

    return podcasts;
  } catch (error: unknown) {
    console.log(error);
    throw Error("Error");
  }
};

/**
 * If the required local data exists and has not expired it is returned,
 * otherwise it is returned undefined
 */
const fetchValidPodCastFromLocalStorage = ():
  | PodcastInterface[]
  | undefined => {
  const podcastsData =
    getLocalDataWithTimeStamp<PodcastInterface[]>(LOCAL_KEY_PODCASTS);
  const dataValid =
    podcastsData !== undefined && isLocalDataValid(podcastsData);

  return dataValid ? podcastsData.data : undefined;
};

export const fetchPodcasts = async (): Promise<
  PodcastInterface[] | undefined
> => {
  const podcastsData = fetchValidPodCastFromLocalStorage();
  if (podcastsData) return podcastsData;

  const data = await fetchPodCastFromApi();
  return data;
};
