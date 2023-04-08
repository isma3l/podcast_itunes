import { get } from "@/lib/api";
import { PodcastItemInterface } from "@/models";
import {
  getLocalDataWithTimeStamp,
  storageDataWithTimeStamp,
  isLocalDataValid,
} from "@/utils";

type PostcastsResponse = {
  id: { attributes: { "im:id": string } };
  "im:artist": { label: string };
  "im:name": { label: string };
  "im:image": { label: string }[];
};

const PODCASTS_URL = "/us/rss/toppodcasts/limit=100/genre=1310/json";
const LOCAL_KEY_PODCASTS = "podcasts_local";

const fetchPodCastFromApi = async (): Promise<
  PodcastItemInterface[] | undefined
> => {
  try {
    const data = await get<{ feed: { entry: PostcastsResponse[] } }>(
      PODCASTS_URL
    );

    const podcasts: PodcastItemInterface[] = data.feed.entry.map((podcast) => ({
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
  | PodcastItemInterface[]
  | undefined => {
  const podcastsData =
    getLocalDataWithTimeStamp<PodcastItemInterface[]>(LOCAL_KEY_PODCASTS);
  const dataValid =
    podcastsData !== undefined && isLocalDataValid(podcastsData);

  return dataValid ? podcastsData.data : undefined;
};

export const fetchPodcasts = async (): Promise<
  PodcastItemInterface[] | undefined
> => {
  const podcastsData = fetchValidPodCastFromLocalStorage();
  if (podcastsData) return podcastsData;

  const data = await fetchPodCastFromApi();
  return data;
};
