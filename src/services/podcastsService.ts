import { StorageKeys, urlKeys } from "@/constants";
import { get } from "@/lib/api";
import { PodcastInterface } from "@/models";
import {
  getLocalDataWithTimeStamp,
  storageDataWithTimeStamp,
  isLocalDataValid,
} from "@/utils";

enum PodcastKeys {
  id = "im:id",
  author = "im:artist",
  title = "im:name",
  urlImage = "im:image",
}

type PodcastsResponse = {
  id: { attributes: { [PodcastKeys.id]: string } };
  [PodcastKeys.author]: { label: string };
  [PodcastKeys.title]: { label: string };
  [PodcastKeys.urlImage]: { label: string }[];
};

type PodcastDataResponse = {
  feed: { entry: PodcastsResponse[] };
};

const fetchPodCastFromApi = async (): Promise<
  PodcastInterface[] | undefined
> => {
  try {
    const data = await get<PodcastDataResponse>(urlKeys.podcastsUrl);

    const podcasts: PodcastInterface[] = data.feed.entry.map((podcast) => ({
      id: podcast.id.attributes[PodcastKeys.id],
      title: podcast[PodcastKeys.title].label,
      author: podcast[PodcastKeys.author].label,
      urlImage: podcast[PodcastKeys.urlImage][2].label,
    }));

    storageDataWithTimeStamp(podcasts, StorageKeys.podcastsKey);

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
  const podcastsData = getLocalDataWithTimeStamp<PodcastInterface[]>(
    StorageKeys.podcastsKey
  );
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
